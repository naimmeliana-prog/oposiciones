const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/<button\s*onClick=\{\(\) => \{\s*setShowAddConvForm\(true\);\s*setActiveTab\("examenes"\);\s*\}\}\s*className="w-full flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-700 text-\[10px\] font-bold text-white py-1\.5 rounded transition cursor-pointer border border-slate-700"\s*>\s*<Plus className="h-3 w-3" \/>\s*<span>Añadir Convocatoria Nueva<\/span>\s*<\/button>/g, `
            <button
              onClick={() => {
                const newExams = [
                  {
                    id: \`exam-\${activeOppositionId}-2022\`,
                    year: 2022,
                    oppositionId: activeOppositionId,
                    totalApplicants: activeOpposition.totalPlaces * 16,
                    cutOffScore: 68.0,
                    name: \`Examen Oficial \${activeOpposition.name} - Convocatoria 2022\`,
                    date: "2022-09-10",
                    status: "Oficial",
                    averageScore: 63.5,
                    passedCount: activeOpposition.totalPlaces,
                    themeDistribution: { "I": 40, "II": 60 },
                    questionsCount: 100
                  },
                  {
                    id: \`exam-\${activeOppositionId}-2019\`,
                    year: 2019,
                    oppositionId: activeOppositionId,
                    totalApplicants: activeOpposition.totalPlaces * 20,
                    cutOffScore: 73.0,
                    name: \`Examen Oficial \${activeOpposition.name} - OEP 2019\`,
                    date: "2019-11-20",
                    status: "Oficial",
                    averageScore: 67.8,
                    passedCount: activeOpposition.totalPlaces,
                    themeDistribution: { "I": 40, "II": 60 },
                    questionsCount: 100
                  }
                ];
                
                const existingIds = new Set(officialExams.map(e => e.id));
                const uniqueNewExams = newExams.filter(e => !existingIds.has(e.id));
                
                if (uniqueNewExams.length > 0) {
                  const updated = [...officialExams, ...uniqueNewExams];
                  setOfficialExams(updated);
                  localStorage.setItem("official_exams", JSON.stringify(updated));
                  setSelectedConvocatoriaIds([...selectedConvocatoriaIds, ...uniqueNewExams.map(e => e.id)]);
                  alert(\`Se han añadido e incluido \${uniqueNewExams.length} convocatorias históricas para \${activeOpposition.name}.\`);
                } else {
                  alert(\`Ya están cargadas todas las convocatorias históricas disponibles para \${activeOpposition.name}.\`);
                }
              }}
              className="w-full flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-white py-1.5 rounded transition cursor-pointer border border-slate-700"
            >
              <Search className="h-3 w-3" />
              <span>Añadir Convocatorias Existentes</span>
            </button>`);

fs.writeFileSync('src/App.tsx', code);
