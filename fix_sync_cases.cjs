const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /      if \(data\.practicalCases && Array\.isArray\(data\.practicalCases\)\) \{\n          dynamicOpp\.practicalCases = data\.practicalCases\.map\(\(c, i\) => \(\{\n              id: `case-\$\{i\}`,\n              title: typeof c === 'string' \? c : c\.title \|\| `Caso Práctico \$\{i\+1\}`,\n              convocatorias: \[\],\n              blocks: \["I"\],\n              difficulty: "Alta",\n              description: typeof c === 'string' \? c : c\.description \|\| "",\n              scenario: "Situación planteada para el opositor\.",\n              questions: \[\]\n          \}\)\);\n      \}/m;

const replacement = `      if (data.practicalCases && Array.isArray(data.practicalCases)) {
          dynamicOpp.practicalCases = data.practicalCases.map((c, i) => {
              let questions = [];
              if (typeof c === 'object' && Array.isArray(c.questions)) {
                  questions = c.questions;
              } else if (typeof c === 'object' && Array.isArray(c.questions_example)) {
                  questions = c.questions_example.map((qText, qIdx) => ({
                      id: \`q-\${i}-\${qIdx}\`,
                      statement: typeof qText === 'string' ? qText : qText.statement || "¿Pregunta sobre el caso?",
                      options: { A: "Opción A", B: "Opción B", C: "Opción C", D: "Opción D" },
                      correctOption: "A",
                      explanation: "Respuesta orientativa.",
                      articleReference: "Normativa"
                  }));
              }
              return {
                  id: \`case-\${i}\`,
                  title: typeof c === 'string' ? c : c.title || \`Caso Práctico \${i+1}\`,
                  convocatorias: [],
                  blocks: ["I"],
                  difficulty: "Alta",
                  description: typeof c === 'string' ? c : c.description || "",
                  scenario: typeof c === 'object' && c.scenario ? c.scenario : (typeof c === 'object' && c.description ? c.description : "Situación planteada para el opositor."),
                  questions: questions,
                  generalGuidelines: ["Analizar situación planteada."],
                  specificGuidelines: ["Aplicar normativa vigente correspondiente al caso."]
              };
          });
      }`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', code);
