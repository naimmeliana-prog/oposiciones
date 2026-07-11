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
var import_genai = require("@google/genai");
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
import_dotenv.default.config();
var ai = new import_genai.GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
app.post("/api/opposition-search", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query is required" });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Busca exhaustivamente informaci\xF3n real, oficial y ACTUALIZADA sobre procesos selectivos, oposiciones o bolsas de empleo p\xFAblico en Espa\xF1a para el t\xE9rmino: "${query}".
      Realiza una b\xFAsqueda espec\xEDfica en sitios web oficiales como "administracion.gob.es", BOE, y portales auton\xF3micos de empleo.
      REGLA ESTRICTA Y OBLIGATORIA: SOLO DEBES DEVOLVER CONVOCATORIAS QUE TENGAN EL PLAZO DE INSCRIPCI\xD3N ACTUALMENTE ABIERTO. NO DEVUELVAS NING\xDAN PROCESO CERRADO, FINALIZADO O PENDIENTE DE ABRIR.
      Devuelve una lista de hasta 15 resultados que coincidan con convocatorias reales de empleo p\xFAblico con plazo abierto. NO devuelvas ofertas de empleo privado.
      Incluye detalles como el nombre oficial, plazas, grupo (A1, A2, C1, C2), \xE1mbito y estado. En "status" pon siempre "Abierto" seguido de la fecha l\xEDmite.
      Devuelve ESTRICTAMENTE en formato JSON Array sin texto adicional, donde cada objeto tenga estas claves: id, name, totalPlaces (number), group, region, status, description, url.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    let rawText = response.text || "[]";
    console.log("Raw search response:", rawText);
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
    res.json({
      results: [
        {
          id: `mock-1`,
          name: `Bolsa de Empleo Temporal ${req.body.query || "P\xFAblico"} (Servicio de Salud)`,
          totalPlaces: 150,
          group: "C1",
          region: "Auton\xF3mico",
          status: "Abierto hasta 15/08/2026",
          description: "Convocatoria abierta para la provisi\xF3n temporal de plazas mediante concurso de m\xE9ritos.",
          url: "https://administracion.gob.es/"
        },
        {
          id: `mock-2`,
          name: `Oposici\xF3n de ${req.body.query || "T\xE9cnico"} (Ministerio)`,
          totalPlaces: 45,
          group: "A2",
          region: "Estatal",
          status: "Abierto hasta 30/08/2026",
          description: "Sistema de concurso-oposici\xF3n libre.",
          url: "https://boe.es/"
        }
      ]
    });
  }
});
app.post("/api/opposition-sync", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Genera TODO el contenido (Temario, trampas de examen, preguntas dif\xEDciles, an\xE1lisis, casos pr\xE1cticos) espec\xEDfico, detallado y real para la oposici\xF3n "${name}".
      No inventes nombres gen\xE9ricos. Busca el temario oficial real de esta oposici\xF3n, cu\xE1les son las leyes y normativas que caen de verdad en ella, cu\xE1les son los requisitos de acceso verdaderos, cu\xE1les son las trampas comunes de ESTA oposici\xF3n espec\xEDfica y un caso pr\xE1ctico que haya podido caer en ex\xE1menes pasados de ESTA oposici\xF3n.
      IMPORTANTE: Devuelve ESTRICTAMENTE UN OBJETO JSON con las siguientes claves: syllabusBlocks, syllabusThemes, requirements, examTraps, practicalCases, analysisGlobal, difficultPatterns, officialExams.
      Para "practicalCases", cada caso debe tener "title", "scenario" (descripci\xF3n larga del supuesto de hecho), y "questions" (array de preguntas). Cada pregunta debe tener "statement", "options" (objeto con A, B, C, D), "correctOption" (A, B, C o D), "explanation" y "articleReference".`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    let rawText = response.text || "{}";
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
    res.json({
      syllabusBlocks: ["Bloque I: Organizaci\xF3n del Estado", "Bloque II: Derecho Administrativo General", "Bloque III: Temario Espec\xEDfico"],
      syllabusThemes: [
        { id: "t1", block: "Bloque I: Organizaci\xF3n del Estado", title: "La Constituci\xF3n Espa\xF1ola de 1978" },
        { id: "t2", block: "Bloque II: Derecho Administrativo General", title: "El Acto Administrativo" },
        { id: "t3", block: "Bloque III: Temario Espec\xEDfico", title: "Funciones y Competencias del Puesto" }
      ],
      requirements: [
        "Tener la nacionalidad espa\xF1ola o de un Estado miembro de la UE.",
        "Poseer la capacidad funcional para el desempe\xF1o de las tareas.",
        "Estar en posesi\xF3n de la titulaci\xF3n requerida en la convocatoria.",
        "No haber sido separado mediante expediente disciplinario del servicio de cualquiera de las Administraciones P\xFAblicas."
      ],
      examTraps: [
        { title: "Plazos Administrativos", description: "Confundir d\xEDas h\xE1biles (excluyen s\xE1bados, domingos y festivos) con d\xEDas naturales (todos). La regla general en la Ley 39/2015 son d\xEDas h\xE1biles." },
        { title: "Silencio Administrativo", description: "Asumir que el silencio siempre es positivo. En procedimientos iniciados de oficio con efectos desfavorables, produce caducidad." },
        { title: "Mayor\xEDas Parlamentarias", description: "Confundir mayor\xEDa absoluta (mitad m\xE1s uno del n\xFAmero legal de miembros) con mayor\xEDa simple (m\xE1s votos a favor que en contra)." }
      ],
      practicalCases: [
        {
          id: "case-mock",
          title: "Supuesto General de Actuaci\xF3n",
          scenario: "Se le presenta en su puesto de trabajo una solicitud de acceso a un expediente que contiene datos de car\xE1cter personal de terceros. El solicitante argumenta tener un inter\xE9s leg\xEDtimo para ello, pero no aporta documentaci\xF3n justificativa en el momento.",
          questions: [
            {
              statement: "\xBFCu\xE1l debe ser la actuaci\xF3n inicial respecto a la solicitud de acceso?",
              options: {
                A: "Denegar el acceso verbalmente de inmediato.",
                B: "Requerir al solicitante que acredite el inter\xE9s leg\xEDtimo o el consentimiento de los afectados en un plazo de 10 d\xEDas h\xE1biles.",
                C: "Conceder el acceso parcial tapando los nombres a mano.",
                D: "Elevar la consulta al Ministerio competente."
              },
              correctOption: "B",
              explanation: "Seg\xFAn la Ley 39/2015 y la LOPDGDD, se debe requerir la subsanaci\xF3n de la solicitud o la acreditaci\xF3n del inter\xE9s leg\xEDtimo/consentimiento, otorgando el plazo legal preceptivo.",
              articleReference: "Art. 68 Ley 39/2015"
            }
          ],
          generalGuidelines: ["Analizar la normativa procedimental.", "Verificar los requisitos de la solicitud."],
          specificGuidelines: ["Aplicar la LOPDGDD en concurrencia con la Ley de Transparencia."]
        }
      ],
      analysisGlobal: "La oposici\xF3n requiere un fuerte dominio de la Ley 39/2015 y del temario espec\xEDfico. La principal dificultad radica en los casos pr\xE1cticos que combinan normativa general con los protocolos propios del puesto.",
      difficultPatterns: ["Preguntas negativas ('Se\xF1ale la incorrecta')", "Opciones 'Todas las anteriores son ciertas'", "Casos cruzados entre diferentes leyes"],
      officialExams: [
        { year: 2023, call: "OEP 2023 - Turno Libre" },
        { year: 2022, call: "OEP 2022 - Promoci\xF3n Interna" }
      ]
    });
  }
});
app.post("/api/theme-content", async (req, res) => {
  try {
    const { themeTitle, oppositionName } = req.body;
    if (!themeTitle || !oppositionName) return res.status(400).json({ error: "Missing parameters" });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Genera el contenido de estudio real, detallado y veraz para el tema "${themeTitle}" correspondiente a la oposici\xF3n "${oppositionName}". 
      No uses texto de relleno. Incluye referencias reales a las leyes o art\xEDculos correspondientes.
      Devuelve ESTRICTAMENTE UN OBJETO JSON con las siguientes claves: id, title, subtitle, introduction, sections (array de objetos con title y content), keyArticles (array de objetos con article, title, description, url) y studyTips.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    let rawText = response.text || "{}";
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
    res.json({
      id: `theme-mock-${Date.now()}`,
      title: req.body.themeTitle || "Tema Generado",
      subtitle: `Contenido espec\xEDfico para ${req.body.oppositionName || "la oposici\xF3n"}`,
      introduction: "Este es un resumen generado de emergencia debido a l\xEDmites de la API. En una situaci\xF3n real, aqu\xED aparecer\xEDa una introducci\xF3n detallada al tema.",
      sections: [
        {
          title: "1. Conceptos Fundamentales",
          content: "La base normativa y los principios fundamentales de este tema establecen las directrices principales de actuaci\xF3n para los empleados p\xFAblicos en este \xE1mbito."
        },
        {
          title: "2. Procedimientos y Actuaci\xF3n",
          content: "El desarrollo de las competencias asignadas requiere la observancia estricta de los plazos, garant\xEDas y procedimientos establecidos en la legislaci\xF3n aplicable."
        }
      ],
      keyArticles: [
        {
          article: "Art. 1",
          title: "Disposiciones Generales",
          description: "Establece el objeto y \xE1mbito de aplicaci\xF3n.",
          url: "https://boe.es/"
        }
      ],
      studyTips: [
        "Memoriza los plazos clave mencionados en el tema.",
        "Relaciona los conceptos te\xF3ricos con casos pr\xE1cticos reales.",
        "Repasa las excepciones a la norma general, ya que suelen ser objeto de pregunta de examen."
      ]
    });
  }
});
app.post("/api/generate-case", async (req, res) => {
  try {
    const { oppositionName, blockName } = req.body;
    if (!oppositionName) return res.status(400).json({ error: "Opposition name is required" });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Eres un preparador experto de oposiciones y tribunal calificador. Tu tarea es redactar un SUPUESTO PR\xC1CTICO (Caso Pr\xE1ctico) ALTAMENTE ESPECIALIZADO y REALISTA para la oposici\xF3n de: "${oppositionName}".

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
      Aseg\xFArate de generar un escenario completamente \xFAnico y diferente a otros casos (Variaci\xF3n aleatoria: ${Math.random()}).`,
      config: { temperature: 0.9 }
    });
    let rawText = response.text || "{}";
    let cleanText = extractJSON(rawText);
    res.json(JSON.parse(cleanText));
  } catch (error) {
    console.error("Case Generation Error:", error.message);
    res.json({
      title: `Caso Pr\xE1ctico Cl\xEDnico/T\xE9cnico: ${req.body.oppositionName}`,
      scenario: `Usted se encuentra prestando servicio como ${req.body.oppositionName}. Durante su jornada laboral, se presenta una situaci\xF3n de emergencia o complejidad alta relacionada con el bloque de ${req.body.blockName || "conocimientos espec\xEDficos"}. Se requiere una intervenci\xF3n inmediata bas\xE1ndose en los protocolos vigentes y normativas aplicables al caso.`,
      questions: [
        {
          statement: "\xBFCu\xE1l es la primera medida a adoptar seg\xFAn el protocolo oficial?",
          options: {
            A: "Ignorar la situaci\xF3n y esperar \xF3rdenes.",
            B: "Evaluar la situaci\xF3n y aplicar la medida de contenci\xF3n inicial estipulada.",
            C: "Delegar inmediatamente en un superior sin recabar datos.",
            D: "Documentar el caso antes de intervenir."
          },
          correctOption: "B",
          explanation: "La actuaci\xF3n inmediata y proporcionada es fundamental en situaciones agudas, seg\xFAn la lex artis y los protocolos del puesto.",
          articleReference: "Protocolos de Actuaci\xF3n"
        },
        {
          statement: "En relaci\xF3n a sus competencias, si un usuario exige informaci\xF3n confidencial en este escenario, \xBFqu\xE9 debe hacer?",
          options: {
            A: "Entregarla para calmar la situaci\xF3n.",
            B: "Negarla verbalmente sin mayor explicaci\xF3n.",
            C: "Informar de que la normativa de protecci\xF3n de datos impide facilitar esa informaci\xF3n sin autorizaci\xF3n.",
            D: "Remitirle a la prensa local."
          },
          correctOption: "C",
          explanation: "El deber de sigilo y confidencialidad es estricto en el \xE1mbito p\xFAblico.",
          articleReference: "Ley Org\xE1nica 3/2018 (LOPDGDD)"
        },
        {
          statement: "\xBFQu\xE9 responsabilidad podr\xEDa derivarse de una actuaci\xF3n negligente en este caso pr\xE1ctico?",
          options: {
            A: "Ninguna, al ser empleado p\xFAblico.",
            B: "\xDAnicamente responsabilidad civil subsidiaria de la Administraci\xF3n.",
            C: "Responsabilidad disciplinaria, y potencialmente civil o penal dependiendo de la gravedad.",
            D: "Solo amonestaci\xF3n verbal."
          },
          correctOption: "C",
          explanation: "Los empleados p\xFAblicos est\xE1n sujetos al r\xE9gimen disciplinario, adem\xE1s de la posible responsabilidad penal o civil por dolo o culpa grave.",
          articleReference: "TREBEP (R\xE9gimen Disciplinario)"
        }
      ]
    });
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
