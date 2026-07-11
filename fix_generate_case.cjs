const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /if \(process\.env\.NODE_ENV !== "production"\) \{/m;

const replacement = `app.post("/api/generate-case", async (req, res) => {
  try {
    const { oppositionName, blockName } = req.body;
    if (!oppositionName) return res.status(400).json({ error: "Opposition name is required" });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: \`Eres un preparador experto de oposiciones. Escribe un Caso Práctico (Supuesto de Hecho) realista y a nivel de examen oficial para la oposición de "\${oppositionName}".
      El caso debe estar estrictamente relacionado con la temática específica del candidato. Los casos prácticos no pueden ser genéricos, no pueden ser los mismos para un celador que para un médico o para un administrativo. Adapta el contenido, vocabulario y situaciones exactamente al puesto de "\${oppositionName}".
      El caso debe centrarse o incorporar elementos del bloque temático: "\${blockName}".
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
      Incluye al menos 3 preguntas tipo test de alta dificultad basadas en el caso.\`,
    });
    
    let rawText = response.text || "{}";
    let cleanText = extractJSON(rawText);
    res.json(JSON.parse(cleanText));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Failed to generate case" });
  }
});

if (process.env.NODE_ENV !== "production") {`;

code = code.replace(regex, replacement);
fs.writeFileSync('server.ts', code);
