const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regexTraps = /if \(data\.examTraps && Array\.isArray\(data\.examTraps\)\) \{\n          dynamicOpp\.examTraps = data\.examTraps\.map\(\(t, i\) => \(\{\n              id: \`trap-\$\{i\}\`,\n              type: "Redacción Confusa",\n              description: typeof t === 'string' \? t : t\.description \|\| "",\n              impactLevel: "Alta",\n              conceptId: "General",\n              example: "N\/A",\n              explanation: "Identificado en análisis de convocatorias",\n              convocatorias: \[\]\n          \}\)\);\n      \}/;

const replacementTraps = `if (data.examTraps && Array.isArray(data.examTraps)) {
          dynamicOpp.examTraps = data.examTraps.map((t: any, i: number) => ({
              id: \`trap-\${i}\`,
              convocatorias: [],
              title: typeof t === 'string' ? "Trampa de Examen" : t.title || "Trampa",
              description: typeof t === 'string' ? t : t.description || "",
              pattern: t.pattern || (typeof t === 'string' ? t : t.description || "Patrón detectado"),
              exampleOriginal: t.exampleOriginal || "Ejemplo de pregunta original...",
              exampleTrap: t.exampleTrap || "Ejemplo de la trampa...",
              technique: t.technique || "Leer cuidadosamente.",
              relevance: "Alta"
          }));
      }`;

const regexPatterns = /if \(data\.difficultPatterns\) dynamicOpp\.difficultPatterns = data\.difficultPatterns;/;

const replacementPatterns = `if (data.difficultPatterns && Array.isArray(data.difficultPatterns)) {
          dynamicOpp.difficultPatterns = data.difficultPatterns.map((p: any, i: number) => ({
              id: \`dp-\${i}\`,
              convocatorias: [],
              title: typeof p === 'string' ? p : p.title || p.patternDescription || "Patrón de Dificultad",
              article: p.article || "Varios",
              difficultyExplanation: p.difficultyExplanation || "Patrón general detectado.",
              patternDescription: typeof p === 'string' ? p : p.patternDescription || "Patrón detectado",
              memorizationTechnique: p.memorizationTechnique || "Práctica con simulacros.",
              realQuestionSample: p.realQuestionSample || "N/A",
              correctAnswer: p.correctAnswer || "N/A"
          }));
      }`;

code = code.replace(regexTraps, replacementTraps);
code = code.replace(regexPatterns, replacementPatterns);
fs.writeFileSync('src/App.tsx', code);
