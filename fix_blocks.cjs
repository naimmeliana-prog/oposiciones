const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regexLoader = /const saved = localStorage\.getItem\("custom_oppositions"\);\n      if \(!saved\) return \[\];\n      const parsed = JSON\.parse\(saved\);\n      return parsed\.map\(\(opp: any\) => \{/;

const replacementLoader = `const saved = localStorage.getItem("custom_oppositions");
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return parsed.map((opp: any) => {
        if (opp.syllabusBlocks && Array.isArray(opp.syllabusBlocks)) {
          opp.syllabusBlocks = opp.syllabusBlocks.map((b: any, i: number) => {
             if (typeof b === 'string') return { id: \`B\${i+1}\`, title: b, themesCount: 0 };
             if (!b.id) b.id = \`B\${i+1}\`;
             return b;
          });
        }
        if (opp.syllabusThemes && Array.isArray(opp.syllabusThemes)) {
          opp.syllabusThemes = opp.syllabusThemes.map((t: any, i: number) => {
             if (typeof t === 'string') return { id: \`T\${i+1}\`, block: "B1", title: t };
             if (!t.id) t.id = \`T\${i+1}\`;
             return t;
          });
        }`;
code = code.replace(regexLoader, replacementLoader);

fs.writeFileSync('src/App.tsx', code);
