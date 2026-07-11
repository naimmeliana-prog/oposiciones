const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fix 1: remove difficulty, description, scenario in sync mapped object and replace with statement
let regex1 = /                  difficulty: "Alta",\n                  description: typeof c === 'string' \? c : c\.description \|\| "",\n                  scenario: typeof c === 'object' && c\.scenario \? c\.scenario : \(typeof c === 'object' && c\.description \? c\.description : "Situación planteada para el opositor\."\),\n                  questions: questions,\n                  generalGuidelines: \["Analizar situación planteada\."\],\n                  specificGuidelines: \["Aplicar normativa vigente correspondiente al caso\."\]/g;
code = code.replace(regex1, `                  statement: typeof c === 'object' && c.scenario ? c.scenario : (typeof c === 'object' && c.description ? c.description : "Situación planteada para el opositor."),
                  questions: questions,
                  generalGuidelines: ["Analizar situación planteada."],
                  specificGuidelines: ["Aplicar normativa vigente correspondiente al caso."]`);

// Fix 2: same for dynamic case mapping
let regex2 = /                          difficulty: "Alta",\n                          description: "Caso generado dinámicamente",\n                          scenario: data\.scenario,/g;
code = code.replace(regex2, `                          statement: data.scenario,`);

// Also fix `let data = {}` issues with TS `any` type
let regex3 = /let data = \{\};/g;
code = code.replace(regex3, `let data: any = {};`);

let regex4 = /let parsed = JSON\.parse\(cleanText\);/g;
code = code.replace(regex4, `let parsed: any = JSON.parse(cleanText);`);

fs.writeFileSync('src/App.tsx', code);
