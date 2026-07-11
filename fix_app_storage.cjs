const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fix combinedStats NaN errors
const regex1 = /const avgScore = selectedExams\.reduce\(\(sum, e\) => sum \+ e\.averageScore, 0\) \/ selectedExams\.length;/;
const replacement1 = `const avgScore = selectedExams.length > 0 ? selectedExams.reduce((sum, e) => sum + (e.averageScore || 0), 0) / selectedExams.length : 0;`;
code = code.replace(regex1, replacement1);

const regex2 = /const maxCutOff = Math\.max\(\.\.\.selectedExams\.map\(\(e\) => e\.cutOffScore\)\);/;
const replacement2 = `const maxCutOff = selectedExams.length > 0 ? Math.max(...selectedExams.map((e) => e.cutOffScore || 0)) : 0;`;
code = code.replace(regex2, replacement2);

// Fix totalPassed / totalApplicants
const regex3 = /\{Math\.round\(\(combinedStats\.totalPassed \/ combinedStats\.totalApplicants\) \* 100\)\}%/g;
const replacement3 = `{combinedStats.totalApplicants > 0 ? Math.round((combinedStats.totalPassed / combinedStats.totalApplicants) * 100) : 0}%`;
code = code.replace(regex3, replacement3);

// Fix totalApplicants / totalPassed
const regex4 = /\{\(combinedStats\.totalApplicants \/ combinedStats\.totalPassed\)\.toFixed\(0\)\} a 1/g;
const replacement4 = `{combinedStats.totalPassed > 0 ? (combinedStats.totalApplicants / combinedStats.totalPassed).toFixed(0) : "N/A"} a 1`;
code = code.replace(regex4, replacement4);

// Fix average cutOffScore
const regex5 = /\{\(selectedExams\.reduce\(\(sum, e\) => sum \+ e\.cutOffScore, 0\) \/ selectedExams\.length\)\.toFixed\(1\)\} \/ 100/g;
const replacement5 = `{selectedExams.length > 0 ? (selectedExams.reduce((sum, e) => sum + (e.cutOffScore || 0), 0) / selectedExams.length).toFixed(1) : "0"} / 100`;
code = code.replace(regex5, replacement5);

// Fix avgCutOff
const regex6 = /const avgCutOff = selectedExams\.reduce\(\(sum, e\) => sum \+ e\.cutOffScore, 0\) \/ selectedExams\.length;/g;
const replacement6 = `const avgCutOff = selectedExams.length > 0 ? selectedExams.reduce((sum, e) => sum + (e.cutOffScore || 0), 0) / selectedExams.length : 0;`;
code = code.replace(regex6, replacement6);

// Fix custom_oppositions loader to normalize data
const regexLoader = /const saved = localStorage\.getItem\("custom_oppositions"\);\n      return saved \? JSON\.parse\(saved\) : \[\];/;
const replacementLoader = `const saved = localStorage.getItem("custom_oppositions");
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return parsed.map((opp: any) => {
        // Fix string elements in examTraps
        if (opp.examTraps && Array.isArray(opp.examTraps)) {
          opp.examTraps = opp.examTraps.map((t: any, i: number) => {
            if (typeof t === 'string') return { id: \`trap-migrated-\${i}\`, title: "Trampa", description: t, pattern: "Patrón general", technique: "Repasar", relevance: "Media", convocatorias: [] };
            if (!t.id) t.id = \`trap-migrated-\${i}\`;
            return t;
          });
        }
        // Fix string elements in difficultPatterns
        if (opp.difficultPatterns && Array.isArray(opp.difficultPatterns)) {
          opp.difficultPatterns = opp.difficultPatterns.map((p: any, i: number) => {
            if (typeof p === 'string') return { id: \`dp-migrated-\${i}\`, title: "Patrón de Dificultad", article: "Varios", difficultyExplanation: "Patrón general detectado.", patternDescription: p, memorizationTechnique: "Práctica con simulacros.", realQuestionSample: "N/A", correctAnswer: "N/A", convocatorias: [] };
            if (!p.id) p.id = \`dp-migrated-\${i}\`;
            return p;
          });
        }
        return opp;
      });`;
code = code.replace(regexLoader, replacementLoader);

fs.writeFileSync('src/App.tsx', code);
