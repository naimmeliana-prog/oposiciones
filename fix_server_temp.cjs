const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regexCase = /Incluye al menos 3 preguntas tipo test de alta dificultad basadas en el caso\.\`,\n    \}\);/;

const replacementCase = `Incluye al menos 3 preguntas tipo test de alta dificultad basadas en el caso.\n      Asegúrate de generar un escenario completamente único y diferente a otros casos (Variación aleatoria: \${Math.random()}).\`,\n      config: { temperature: 0.9 }\n    });`;

code = code.replace(regexCase, replacementCase);
fs.writeFileSync('server.ts', code);
