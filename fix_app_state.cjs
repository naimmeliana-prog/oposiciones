const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex1 = /  const \[activeCase, setActiveCase\] = useState<PracticalCase \| null>\(null\);/m;
const replacement1 = `  const [activeCase, setActiveCase] = useState<PracticalCase | null>(null);
  const [isGeneratingCase, setIsGeneratingCase] = useState(false);`;

code = code.replace(regex1, replacement1);

const regex2 = /                  <button\n                    onClick=\{\(\) => \{\n                      \/\/ Generate dynamic practical case using our cases\.ts helper!\n                      const dCase = generateDynamicPracticalCase\(activeOpposition\.name, caseGeneratorBlock\);\n                      setActiveCase\(dCase\);\n                      setCaseAnswers\(\{\}\);\n                      setCaseChecked\(false\);\n                      \/\/ Scroll beautifully to the case area\n                      alert\(`¡Éxito! Se ha generado dinámicamente un nuevo supuesto práctico de nivel oficial titulado: "\$\{dCase\.title\}"\. Desplázate hacia abajo para resolverlo\.`\);\n                    \}\}\n                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold py-2\.5 px-4 rounded-xl text-xs transition cursor-pointer text-center shadow-xs"\n                  >\n                    Generar Supuesto Práctico Personalizado\n                  <\/button>/m;

const replacement2 = `                  <button
                    disabled={isGeneratingCase}
                    onClick={async () => {
                      setIsGeneratingCase(true);
                      try {
                        const res = await fetch("/api/generate-case", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ oppositionName: activeOpposition.name, blockName: caseGeneratorBlock })
                        });
                        const data = await res.json();
                        if (data.error) throw new Error(data.error);
                        
                        const newCase: PracticalCase = {
                          id: \`dynamic-api-\${Date.now()}\`,
                          title: data.title || "Caso Práctico Generado",
                          convocatorias: ["Generado por IA"],
                          blocks: [caseGeneratorBlock],
                          difficulty: "Alta",
                          description: "Caso generado dinámicamente",
                          scenario: data.scenario,
                          questions: (data.questions || []).map((q: any, i: number) => ({
                            id: \`q-\${Date.now()}-\${i}\`,
                            statement: q.statement,
                            options: q.options,
                            correctOption: q.correctOption,
                            explanation: q.explanation,
                            articleReference: q.articleReference
                          })),
                          generalGuidelines: ["Lee detenidamente el supuesto y aplica la normativa/práctica vigente."],
                          specificGuidelines: [\`Presta atención a las especificidades del bloque \${caseGeneratorBlock}.\`]
                        };
                        
                        setActiveCase(newCase);
                        setCaseAnswers({});
                        setCaseChecked(false);
                        alert(\`¡Éxito! Se ha generado dinámicamente un nuevo supuesto práctico titulado: "\${newCase.title}".\`);
                      } catch (e) {
                        alert("Error al generar el caso práctico. Reintenta.");
                      } finally {
                        setIsGeneratingCase(false);
                      }
                    }}
                    className={\`w-full font-extrabold py-2.5 px-4 rounded-xl text-xs transition text-center shadow-xs \${isGeneratingCase ? 'bg-slate-400 text-slate-200 cursor-wait' : 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer'}\`}
                  >
                    {isGeneratingCase ? "Generando caso con IA (20-30s)..." : "Generar Supuesto Práctico Personalizado"}
                  </button>`;

code = code.replace(regex2, replacement2);
fs.writeFileSync('src/App.tsx', code);
