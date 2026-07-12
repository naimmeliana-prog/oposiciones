function extractJSON(text) {
  let firstBrace = text.indexOf('{');
  let firstBracket = text.indexOf('[');
  let start = -1;
  let isArray = false;
  
  if (firstBrace !== -1 && firstBracket !== -1) {
    if (firstBrace < firstBracket) { start = firstBrace; }
    else { start = firstBracket; isArray = true; }
  } else if (firstBrace !== -1) {
    start = firstBrace;
  } else if (firstBracket !== -1) {
    start = firstBracket;
    isArray = true;
  }
  
  if (start === -1) return text;
  
  let end = isArray ? text.lastIndexOf(']') : text.lastIndexOf('}');
  if (end === -1 || end < start) return text;
  
  return text.substring(start, end + 1);
}
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

function getFriendlyErrorMessage(error: any): string {
  if (!error) return "Error desconocido";
  const msg = typeof error === 'string' ? error : (error.message || JSON.stringify(error));
  if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("Quota exceeded") || msg.includes("rate-limits")) {
    return "Has alcanzado el límite de peticiones. Por favor, espera un minuto y vuelve a intentarlo.";
  }
  return msg;
}

async function callOpenRouter(prompt: string, jsonMode = true): Promise<string> {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not defined");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://ai.studio/build",
      "X-Title": "Preparador de Oposiciones",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      max_tokens: 8192,
      messages: [{ role: "user", content: prompt }],
      response_format: jsonMode ? { type: "json_object" } : undefined,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`OpenRouter API error (${response.status}):`, errorText);
    throw new Error(`OpenRouter API error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    console.error("Unexpected OpenRouter response structure:", JSON.stringify(data));
    throw new Error("Invalid response structure from OpenRouter");
  }
  return data.choices[0].message.content;
}

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Re-add search route
app.post("/api/opposition-search", async (req, res) => {
  
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query is required" });

    const rawText = await callOpenRouter(`Busca exhaustivamente información real, oficial y ACTUALIZADA sobre procesos selectivos, oposiciones o bolsas de empleo público EXCLUSIVAMENTE EN ESPAÑA (Estado, Comunidades Autónomas o Ayuntamientos) para el término: "${query}".
      REGLA ESTRICTA Y OBLIGATORIA: SOLO DEBES DEVOLVER CONVOCATORIAS QUE TENGAN EL PLAZO DE INSCRIPCIÓN ACTUALMENTE ABIERTO. NO DEVUELVAS NINGÚN PROCESO CERRADO, FINALIZADO O PENDIENTE DE ABRIR.
      EXCLUYE cualquier oposición de instituciones europeas (EPSO) o internacionales, a menos que el usuario lo pida expresamente.
      Devuelve una lista de hasta 15 resultados que coincidan con convocatorias reales de empleo público con plazo abierto. NO devuelvas ofertas de empleo privado.
      Incluye detalles como el nombre oficial, plazas, grupo (A1, A2, C1, C2), ámbito y estado. En "status" pon siempre "Abierto" seguido de la fecha límite.
      Devuelve ESTRICTAMENTE en formato JSON Array sin texto adicional, donde cada objeto tenga estas claves: id, name, totalPlaces (number), group, region, status, description, url.`);
    
    let cleanText = extractJSON(rawText);

    try {
      let parsed = JSON.parse(cleanText);
      let results = [];
      if (Array.isArray(parsed)) {
        results = parsed;
      } else if (parsed && typeof parsed === 'object') {
        results = parsed.convocatorias_recientes_destacadas || parsed.resultados || parsed.results || parsed.convocatorias || Object.values(parsed).find(v => Array.isArray(v)) || [];
      }
      
      // Map to expected schema
      results = results.map((r, i) => ({
        id: r.id || r.puesto || `opp-${i}`,
        name: r.name || r.puesto || r.titulo || "Convocatoria",
        totalPlaces: parseInt(r.totalPlaces || r.numero_plazas || r.plazas) || 0,
        group: r.group || r.grupo || "A1",
        region: r.region || r.organismo_convocante || r.organismo || "España",
        status: r.status || r.estado || "Abierta",
        description: r.description || r.requisitos_generales_destacados || r.especialidad || "",
        url: r.url || r.enlace_informacion || r.enlace || "#"
      })).slice(0, 15);
      
      res.json({ results });
    } catch (e) {
      console.error("JSON Parse error:", e);
      res.status(500).json({ error: "Invalid JSON from AI" });
    }

  } catch (error: any) {
    console.error("Search API Error:", error.message);
    res.status(500).json({ error: getFriendlyErrorMessage(error) || "Error al realizar la búsqueda" });
  }
});

// Re-add sync route
app.post("/api/opposition-sync", async (req, res) => {
  
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const rawText = await callOpenRouter(`Genera TODO el contenido (Temario, trampas de examen, preguntas difíciles, análisis, casos prácticos) específico, detallado y real para la oposición "${name}".
      IMPORTANTE: Esta oposición es de ESPAÑA. Basa el temario en la Constitución Española, Ley 39/2015, Ley 40/2015, TREBEP, y la normativa autonómica o local aplicable. EXCLUYE el temario de la Unión Europea a menos que la oposición sea explícitamente europea.
      No inventes nombres genéricos. Busca el temario oficial real de esta oposición, cuáles son las leyes y normativas que caen de verdad en ella, cuáles son los requisitos de acceso verdaderos, cuáles son las trampas comunes de ESTA oposición específica y un caso práctico que haya podido caer en exámenes pasados de ESTA oposición.
      IMPORTANTE: Devuelve ESTRICTAMENTE UN OBJETO JSON con las siguientes claves: syllabusBlocks, syllabusThemes, requirements, examTraps, practicalCases, analysisGlobal, difficultPatterns, officialExams.
      Para "practicalCases", cada caso debe tener "title", "scenario" (descripción larga del supuesto de hecho), y "questions" (array de preguntas). Cada pregunta debe tener "statement", "options" (objeto con A, B, C, D), "correctOption" (A, B, C o D), "explanation" y "articleReference".`);
    
    console.log("Raw content response:", rawText);
    let cleanText = extractJSON(rawText);
    try {
      res.json(JSON.parse(cleanText));
    } catch (e) {
      console.error("JSON Parse error:", e);
      res.status(500).json({ error: "Invalid JSON from AI" });
    }

  } catch (error: any) {
    console.error("Sync API Error:", error.message);
    res.status(500).json({ error: getFriendlyErrorMessage(error) || "Error al sincronizar la oposición" });
  }
});

// New theme content route
app.post("/api/theme-content", async (req, res) => {
  try {
    const { themeTitle, oppositionName } = req.body;
    if (!themeTitle || !oppositionName) return res.status(400).json({ error: "Missing parameters" });
    const rawText = await callOpenRouter(`Genera el contenido de estudio real, detallado y veraz para el tema "${themeTitle}" correspondiente a la oposición "${oppositionName}". 
      No uses texto de relleno. Incluye referencias reales a las leyes o artículos correspondientes.
      Devuelve ESTRICTAMENTE UN OBJETO JSON con las siguientes claves: id, title, subtitle, introduction, sections (array de objetos con title y content), keyArticles (array de objetos con article, title, description, url) y studyTips.`);
    
    console.log("Raw content response:", rawText);
    let cleanText = extractJSON(rawText);
    try {
      res.json(JSON.parse(cleanText));
    } catch (e) {
      console.error("JSON Parse error:", e);
      res.status(500).json({ error: "Invalid JSON from AI" });
    }

  } catch (error: any) {
    console.error("Theme Content Generation Error:", error.message);
    res.status(500).json({ error: getFriendlyErrorMessage(error) || "Error al generar contenido del tema" });
  }
});

app.post("/api/generate-case", async (req, res) => {
  try {
    const { oppositionName, blockName } = req.body;
    if (!oppositionName) return res.status(400).json({ error: "Opposition name is required" });
    const rawText = await callOpenRouter(`Eres un preparador experto de oposiciones y tribunal calificador. Tu tarea es redactar un SUPUESTO PRÁCTICO (Caso Práctico) ALTAMENTE ESPECIALIZADO y REALISTA para la oposición de: "${oppositionName}".

      REGLA CRÍTICA DE ROL Y CONTEXTO:
      - Si "${oppositionName}" es del ámbito SANITARIO (ej. Médico, Enfermería, Celador), el escenario DEBE desarrollarse obligatoriamente en un Centro de Salud, Hospital o entorno asistencial. Debe involucrar pacientes, protocolos sanitarios, historias clínicas, traslados de pacientes o triaje clínico. ¡PROHIBIDO mencionar juzgados, letrados, trámites procesales o demandas civiles!
      - Si "${oppositionName}" es Administrativo, el caso debe ser sobre procedimiento administrativo, registro o atención ciudadana.
      - Si "${oppositionName}" es de Justicia, el caso será estrictamente procesal (civil, penal, etc.).
      
      El caso NO puede ser genérico. Usa vocabulario, herramientas y situaciones diarias propias de la profesión de "${oppositionName}".
      
      El caso debe incorporar elementos del bloque de estudio: "${blockName}". (Si el bloque es "Organización del Estado" o "Leyes Generales", aplica esas leyes al contexto diario de la profesión, por ejemplo, derechos del paciente para un médico, o secreto profesional).
      
      Devuelve ESTRICTAMENTE un objeto JSON con la siguiente estructura y NADA MÁS:
      {
        "title": "Título del caso",
        "scenario": "Descripción detallada del supuesto de hecho...",
        "questions": [
          {
            "statement": "Pregunta 1...",
            "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
            "correctOption": "A",
            "explanation": "Explicación detallada...",
            "articleReference": "Referencia legislativa o clínica"
          }
        ]
      }
      Incluye al menos 3 preguntas tipo test de alta dificultad basadas en el caso.
      Asegúrate de generar un escenario completamente único y diferente a otros casos (Variación aleatoria: ${Math.random()}).`);
    
    let cleanText = extractJSON(rawText);
    res.json(JSON.parse(cleanText));
  } catch (error: any) {
    console.error("Case Generation Error:", error.message);
    res.status(500).json({ error: getFriendlyErrorMessage(error) || "Error al generar el caso práctico" });
  }
});

app.post("/api/generate-material", async (req, res) => {
  try {
    const { oppositionName, selectedThemes, selectedYears } = req.body;
    if (!oppositionName) return res.status(400).json({ error: "Missing parameters" });

    const rawText = await callOpenRouter(`Genera un documento completo de estudio para la oposición "${oppositionName}".
      Incluye el desarrollo completo de los siguientes temas: ${selectedThemes?.join(", ") || "Temario general"}.
      Y genera un resumen exhaustivo de las preguntas y casos de los exámenes oficiales de los años: ${selectedYears?.join(", ") || "Últimos años"}.
      Basa TODO en normativa real y vigente en España. NO inventes datos.
      Devuelve ESTRICTAMENTE UN OBJETO JSON con las claves: "title", "introduction", "themes" (array con title y content), "exams" (array con year y questions (array con statement, options, correctOption, explanation)).`);
    
    let cleanText = extractJSON(rawText);
    res.json(JSON.parse(cleanText));
  } catch (error: any) {
    console.error("Material Generation Error:", error.message);
    res.status(500).json({ error: getFriendlyErrorMessage(error) || "Error al generar el material completo" });
  }
});

if (process.env.NODE_ENV !== "production") {
  createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  }).then(vite => {
    app.use(vite.middlewares);
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
} else {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
