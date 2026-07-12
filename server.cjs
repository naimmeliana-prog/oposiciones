var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_dotenv = __toESM(require("dotenv"), 1);
function extractJSON(text) {
  let firstBrace = text.indexOf("{");
  let firstBracket = text.indexOf("[");
  let start = -1;
  let isArray = false;
  if (firstBrace !== -1 && firstBracket !== -1) {
    if (firstBrace < firstBracket) {
      start = firstBrace;
    } else {
      start = firstBracket;
      isArray = true;
    }
  } else if (firstBrace !== -1) {
    start = firstBrace;
  } else if (firstBracket !== -1) {
    start = firstBracket;
    isArray = true;
  }
  if (start === -1) return text;
  let end = isArray ? text.lastIndexOf("]") : text.lastIndexOf("}");
  if (end === -1 || end < start) return text;
  return text.substring(start, end + 1);
}
function getFriendlyErrorMessage(error) {
  if (!error) return "Error desconocido";
  const msg = typeof error === "string" ? error : error.message || JSON.stringify(error);
  if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("Quota exceeded") || msg.includes("rate-limits")) {
    return "Has alcanzado el l\xEDmite de peticiones. Por favor, espera un minuto y vuelve a intentarlo.";
  }
  return msg;
}
async function callOpenRouter(prompt, jsonMode = true) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://ai.studio/build",
      "X-Title": "Preparador de Oposiciones"
    },
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-lite-preview-02-05:free",
      // Use a free model
      messages: [{ role: "user", content: prompt }],
      response_format: jsonMode ? { type: "json_object" } : void 0
    })
  });
  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.statusText}`);
  }
  const data = await response.json();
  return data.choices[0].message.content;
}
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
app.post("/api/opposition-search", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query is required" });
    const rawText = await callOpenRouter(`Busca exhaustivamente informaci\xF3n real, oficial y ACTUALIZADA sobre procesos selectivos, oposiciones o bolsas de empleo p\xFAblico EXCLUSIVAMENTE EN ESPA\xD1A (Estado, Comunidades Aut\xF3nomas o Ayuntamientos) para el t\xE9rmino: "${query}".
      REGLA ESTRICTA Y OBLIGATORIA: SOLO DEBES DEVOLVER CONVOCATORIAS QUE TENGAN EL PLAZO DE INSCRIPCI\xD3N ACTUALMENTE ABIERTO. NO DEVUELVAS NING\xDAN PROCESO CERRADO, FINALIZADO O PENDIENTE DE ABRIR.
      EXCLUYE cualquier oposici\xF3n de instituciones europeas (EPSO) o internacionales, a menos que el usuario lo pida expresamente.
      Devuelve una lista de hasta 15 resultados que coincidan con convocatorias reales de empleo p\xFAblico con plazo abierto. NO devuelvas ofertas de empleo privado.
      Incluye detalles como el nombre oficial, plazas, grupo (A1, A2, C1, C2), \xE1mbito y estado. En "status" pon siempre "Abierto" seguido de la fecha l\xEDmite.
      Devuelve ESTRICTAMENTE en formato JSON Array sin texto adicional, donde cada objeto tenga estas claves: id, name, totalPlaces (number), group, region, status, description, url.`);
    let cleanText = extractJSON(rawText);
    try {
      let parsed = JSON.parse(cleanText);
      let results = [];
      if (Array.isArray(parsed)) {
        results = parsed;
      } else if (parsed && typeof parsed === "object") {
        results = parsed.convocatorias_recientes_destacadas || parsed.resultados || parsed.results || parsed.convocatorias || Object.values(parsed).find((v) => Array.isArray(v)) || [];
      }
      results = results.map((r, i) => ({
        id: r.id || r.puesto || `opp-${i}`,
        name: r.name || r.puesto || r.titulo || "Convocatoria",
        totalPlaces: parseInt(r.totalPlaces || r.numero_plazas || r.plazas) || 0,
        group: r.group || r.grupo || "A1",
        region: r.region || r.organismo_convocante || r.organismo || "Espa\xF1a",
        status: r.status || r.estado || "Abierta",
        description: r.description || r.requisitos_generales_destacados || r.especialidad || "",
        url: r.url || r.enlace_informacion || r.enlace || "#"
      })).slice(0, 15);
      res.json({ results });
    } catch (e) {
      console.error("JSON Parse error:", e);
      res.status(500).json({ error: "Invalid JSON from AI" });
    }
  } catch (error) {
    console.error("Search API Error:", error.message);
    res.status(500).json({ error: getFriendlyErrorMessage(error) || "Error al realizar la b\xFAsqueda" });
  }
});
app.post("/api/opposition-sync", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    const rawText = await callOpenRouter(`Genera TODO el contenido (Temario, trampas de examen, preguntas dif\xEDciles, an\xE1lisis, casos pr\xE1cticos) espec\xEDfico, detallado y real para la oposici\xF3n "${name}".
      IMPORTANTE: Esta oposici\xF3n es de ESPA\xD1A. Basa el temario en la Constituci\xF3n Espa\xF1ola, Ley 39/2015, Ley 40/2015, TREBEP, y la normativa auton\xF3mica o local aplicable. EXCLUYE el temario de la Uni\xF3n Europea a menos que la oposici\xF3n sea expl\xEDcitamente europea.
      No inventes nombres gen\xE9ricos. Busca el temario oficial real de esta oposici\xF3n, cu\xE1les son las leyes y normativas que caen de verdad en ella, cu\xE1les son los requisitos de acceso verdaderos, cu\xE1les son las trampas comunes de ESTA oposici\xF3n espec\xEDfica y un caso pr\xE1ctico que haya podido caer en ex\xE1menes pasados de ESTA oposici\xF3n.
      IMPORTANTE: Devuelve ESTRICTAMENTE UN OBJETO JSON con las siguientes claves: syllabusBlocks, syllabusThemes, requirements, examTraps, practicalCases, analysisGlobal, difficultPatterns, officialExams.
      Para "practicalCases", cada caso debe tener "title", "scenario" (descripci\xF3n larga del supuesto de hecho), y "questions" (array de preguntas). Cada pregunta debe tener "statement", "options" (objeto con A, B, C, D), "correctOption" (A, B, C o D), "explanation" y "articleReference".`);
    console.log("Raw content response:", rawText);
    let cleanText = extractJSON(rawText);
    try {
      res.json(JSON.parse(cleanText));
    } catch (e) {
      console.error("JSON Parse error:", e);
      res.status(500).json({ error: "Invalid JSON from AI" });
    }
  } catch (error) {
    console.error("Sync API Error:", error.message);
    res.status(500).json({ error: getFriendlyErrorMessage(error) || "Error al sincronizar la oposici\xF3n" });
  }
});
app.post("/api/theme-content", async (req, res) => {
  try {
    const { themeTitle, oppositionName } = req.body;
    if (!themeTitle || !oppositionName) return res.status(400).json({ error: "Missing parameters" });
    const rawText = await callOpenRouter(`Genera el contenido de estudio real, detallado y veraz para el tema "${themeTitle}" correspondiente a la oposici\xF3n "${oppositionName}". 
      No uses texto de relleno. Incluye referencias reales a las leyes o art\xEDculos correspondientes.
      Devuelve ESTRICTAMENTE UN OBJETO JSON con las siguientes claves: id, title, subtitle, introduction, sections (array de objetos con title y content), keyArticles (array de objetos con article, title, description, url) y studyTips.`);
    console.log("Raw content response:", rawText);
    let cleanText = extractJSON(rawText);
    try {
      res.json(JSON.parse(cleanText));
    } catch (e) {
      console.error("JSON Parse error:", e);
      res.status(500).json({ error: "Invalid JSON from AI" });
    }
  } catch (error) {
    console.error("Theme Content Generation Error:", error.message);
    res.status(500).json({ error: getFriendlyErrorMessage(error) || "Error al generar contenido del tema" });
  }
});
app.post("/api/generate-case", async (req, res) => {
  try {
    const { oppositionName, blockName } = req.body;
    if (!oppositionName) return res.status(400).json({ error: "Opposition name is required" });
    const rawText = await callOpenRouter(`Eres un preparador experto de oposiciones y tribunal calificador. Tu tarea es redactar un SUPUESTO PR\xC1CTICO (Caso Pr\xE1ctico) ALTAMENTE ESPECIALIZADO y REALISTA para la oposici\xF3n de: "${oppositionName}".

      REGLA CR\xCDTICA DE ROL Y CONTEXTO:
      - Si "${oppositionName}" es del \xE1mbito SANITARIO (ej. M\xE9dico, Enfermer\xEDa, Celador), el escenario DEBE desarrollarse obligatoriamente en un Centro de Salud, Hospital o entorno asistencial. Debe involucrar pacientes, protocolos sanitarios, historias cl\xEDnicas, traslados de pacientes o triaje cl\xEDnico. \xA1PROHIBIDO mencionar juzgados, letrados, tr\xE1mites procesales o demandas civiles!
      - Si "${oppositionName}" es Administrativo, el caso debe ser sobre procedimiento administrativo, registro o atenci\xF3n ciudadana.
      - Si "${oppositionName}" es de Justicia, el caso ser\xE1 estrictamente procesal (civil, penal, etc.).
      
      El caso NO puede ser gen\xE9rico. Usa vocabulario, herramientas y situaciones diarias propias de la profesi\xF3n de "${oppositionName}".
      
      El caso debe incorporar elementos del bloque de estudio: "${blockName}". (Si el bloque es "Organizaci\xF3n del Estado" o "Leyes Generales", aplica esas leyes al contexto diario de la profesi\xF3n, por ejemplo, derechos del paciente para un m\xE9dico, o secreto profesional).
      
      Devuelve ESTRICTAMENTE un objeto JSON con la siguiente estructura y NADA M\xC1S:
      {
        "title": "T\xEDtulo del caso",
        "scenario": "Descripci\xF3n detallada del supuesto de hecho...",
        "questions": [
          {
            "statement": "Pregunta 1...",
            "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
            "correctOption": "A",
            "explanation": "Explicaci\xF3n detallada...",
            "articleReference": "Referencia legislativa o cl\xEDnica"
          }
        ]
      }
      Incluye al menos 3 preguntas tipo test de alta dificultad basadas en el caso.
      Aseg\xFArate de generar un escenario completamente \xFAnico y diferente a otros casos (Variaci\xF3n aleatoria: ${Math.random()}).`);
    let cleanText = extractJSON(rawText);
    res.json(JSON.parse(cleanText));
  } catch (error) {
    console.error("Case Generation Error:", error.message);
    res.status(500).json({ error: getFriendlyErrorMessage(error) || "Error al generar el caso pr\xE1ctico" });
  }
});
app.post("/api/generate-material", async (req, res) => {
  try {
    const { oppositionName, selectedThemes, selectedYears } = req.body;
    if (!oppositionName) return res.status(400).json({ error: "Missing parameters" });
    const rawText = await callOpenRouter(`Genera un documento completo de estudio para la oposici\xF3n "${oppositionName}".
      Incluye el desarrollo completo de los siguientes temas: ${selectedThemes?.join(", ") || "Temario general"}.
      Y genera un resumen exhaustivo de las preguntas y casos de los ex\xE1menes oficiales de los a\xF1os: ${selectedYears?.join(", ") || "\xDAltimos a\xF1os"}.
      Basa TODO en normativa real y vigente en Espa\xF1a. NO inventes datos.
      Devuelve ESTRICTAMENTE UN OBJETO JSON con las claves: "title", "introduction", "themes" (array con title y content), "exams" (array con year y questions (array con statement, options, correctOption, explanation)).`);
    let cleanText = extractJSON(rawText);
    res.json(JSON.parse(cleanText));
  } catch (error) {
    console.error("Material Generation Error:", error.message);
    res.status(500).json({ error: getFriendlyErrorMessage(error) || "Error al generar el material completo" });
  }
});
if (process.env.NODE_ENV !== "production") {
  (0, import_vite.createServer)({
    server: { middlewareMode: true },
    appType: "spa"
  }).then((vite) => {
    app.use(vite.middlewares);
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
} else {
  const distPath = import_path.default.join(process.cwd(), "dist");
  app.use(import_express.default.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(import_path.default.join(distPath, "index.html"));
  });
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
//# sourceMappingURL=server.cjs.map
