const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');

const tabContent = `
          {activeTab === "material" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
              <div className="border-b border-slate-200 pb-4">
                <span className="tag text-xs text-indigo-600 font-bold tracking-widest uppercase">
                  Material Completo
                </span>
                <h2 className="text-xl font-bold text-slate-800 mt-1">Generador de Documento Exhaustivo</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Genera y visualiza un documento completo con todos los temarios seleccionados y exámenes oficiales resueltos.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-2">Selecciona Temas a Incluir</label>
                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border border-slate-200 rounded-lg">
                      {currentSyllabus?.themes?.map(theme => (
                        <label key={theme.id} className="flex items-center gap-2 text-xs">
                          <input 
                            type="checkbox" 
                            checked={materialThemes.includes(theme.title)}
                            onChange={(e) => {
                              if (e.target.checked) setMaterialThemes([...materialThemes, theme.title]);
                              else setMaterialThemes(materialThemes.filter(t => t !== theme.title));
                            }}
                          />
                          {theme.id} - {theme.title}
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-2">Selecciona Años de Exámenes</label>
                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border border-slate-200 rounded-lg">
                      {officialExams?.map(exam => (
                        <label key={exam.id} className="flex items-center gap-2 text-xs">
                          <input 
                            type="checkbox" 
                            checked={materialYears.includes(exam.year)}
                            onChange={(e) => {
                              if (e.target.checked) setMaterialYears([...materialYears, exam.year]);
                              else setMaterialYears(materialYears.filter(y => y !== exam.year));
                            }}
                          />
                          {exam.year}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={generateMaterial}
                  disabled={isGeneratingMaterial || (materialThemes.length === 0 && materialYears.length === 0)}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl text-sm transition cursor-pointer self-start"
                >
                  {isGeneratingMaterial ? "Generando documento extenso (esto puede tardar)..." : "Generar Material Completo"}
                </button>
              </div>

              {materialResult && (
                <div className="mt-8 border-t border-slate-200 pt-8">
                  <h1 className="text-3xl font-black text-slate-900 text-center mb-4">{materialResult.title}</h1>
                  <p className="text-sm text-slate-600 mb-8 italic text-center max-w-2xl mx-auto">{materialResult.introduction}</p>
                  
                  {materialResult.themes && materialResult.themes.map((theme: any, idx: number) => (
                    <div key={idx} className="mb-12">
                      <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">{theme.title}</h2>
                      <div className="prose prose-sm max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: theme.content?.replace(/\\n/g, '<br/>') || '' }} />
                    </div>
                  ))}

                  {materialResult.exams && materialResult.exams.map((exam: any, idx: number) => (
                    <div key={idx} className="mb-12 bg-slate-50 p-6 rounded-xl border border-slate-200">
                      <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-300 pb-2">Examen Oficial - Año {exam.year}</h2>
                      <div className="flex flex-col gap-6">
                        {exam.questions?.map((q: any, qIdx: number) => (
                          <div key={qIdx} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                            <p className="font-bold text-slate-800 mb-3">{qIdx + 1}. {q.statement}</p>
                            <div className="flex flex-col gap-2 pl-4">
                              {Object.entries(q.options || {}).map(([key, val]) => (
                                <div key={key} className={\`text-sm \${key === q.correctOption ? 'font-bold text-emerald-700 bg-emerald-50 p-1 rounded' : 'text-slate-600'}\`}>
                                  {key}) {val as string}
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                              <strong>Explicación:</strong> {q.explanation}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
`;

const index = content.indexOf('{activeTab === "analisis" && (');
if (index === -1) {
  console.log("Could not find anchor.");
} else {
  const newContent = content.slice(0, index) + tabContent + '\n' + content.slice(index);
  fs.writeFileSync('src/App.tsx', newContent);
  console.log("Injected material tab content");
}
