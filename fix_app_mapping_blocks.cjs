const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /if \\(data\\.syllabusThemes && Array\\.isArray\\(data\\.syllabusThemes\\)\\) \\{\\n         mappedThemes = data\\.syllabusThemes\\.map\\(\\(t, i\\) => \\(\\{\\n             id: t\\.id \\|\\| \\`T\\$\\{i\\+1\\}\\`,\\n             title: t\\.title \\|\\| "Tema",\\n             block: t\\.block \\|\\| "I",\\n             blockTitle: t\\.blockTitle \\|\\| "Bloque Común",\\n             description: t\\.description \\|\\| "Descripción del tema",\\n             articles: t\\.articles \\|\\| "Normativa",\\n             keyConcepts: Array\\.isArray\\(t\\.keyConcepts\\) \\? t\\.keyConcepts : \\[\\]\\n         \\}\\)\\);\\n      \\}/;

const replacement = `if (data.syllabusThemes && Array.isArray(data.syllabusThemes)) {
         mappedThemes = data.syllabusThemes.map((t, i) => {
             // Try to extract block ID (I, II, III, etc.) from t.block
             let blockId = "I";
             if (t.block) {
                 const match = t.block.match(/Bloque\\s+([IVX]+)/i);
                 if (match) {
                     blockId = match[1].toUpperCase();
                 } else if (["I", "II", "III", "IV", "V", "VI", "VII"].includes(t.block)) {
                     blockId = t.block;
                 }
             }
             return {
                 id: t.id || \`T\${i+1}\`,
                 title: t.title || "Tema",
                 block: blockId,
                 blockTitle: t.blockTitle || t.block || "Bloque Común",
                 description: t.description || "Descripción del tema",
                 articles: t.articles || "Normativa",
                 keyConcepts: Array.isArray(t.keyConcepts) ? t.keyConcepts : []
             };
         });
      }`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', code);
