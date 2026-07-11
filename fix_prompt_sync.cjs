const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /Para `practicalCases`, cada caso debe tener `title`, `scenario` \(descripción larga del supuesto de hecho\), y `questions` \(array de preguntas\)\. Cada pregunta debe tener `statement`, `options` \(objeto con A, B, C, D\), `correctOption` \(A, B, C o D\), `explanation` y `articleReference`\./m;

const replacement = `Para "practicalCases", cada caso debe tener "title", "scenario" (descripción larga del supuesto de hecho), y "questions" (array de preguntas). Cada pregunta debe tener "statement", "options" (objeto con A, B, C, D), "correctOption" (A, B, C o D), "explanation" y "articleReference".`;

code = code.replace(regex, replacement);
fs.writeFileSync('server.ts', code);
