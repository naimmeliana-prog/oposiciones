const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<select\n                          value=\{caseGeneratorBlock\}\n                          onChange=\{\(e\) => setCaseGeneratorBlock\(e\.target\.value\)\}\n                          className="w-full border border-slate-250 bg-white text-slate-800 rounded-lg p-2 text-xs"\n                        >\n                          <option value="Todos">Todos los Bloques Comunes<\/option>\n                          <option value="I">Bloque I \(Normativa y Marco Legal\)<\/option>\n                          <option value="II">Bloque II \(Práctica y Procedimiento\)<\/option>\n                        <\/select>/;

const replacement = `<select
                          value={caseGeneratorBlock}
                          onChange={(e) => setCaseGeneratorBlock(e.target.value)}
                          className="w-full border border-slate-250 bg-white text-slate-800 rounded-lg p-2 text-xs"
                        >
                          <option value="Todos">Todos los Bloques Comunes</option>
                          {currentSyllabus.blocks.map((block) => (
                            <option key={block.id} value={block.id}>
                              Bloque {block.id}: {block.title.replace(/^Bloque\\s+\\w+:\\s*/i, "")}
                            </option>
                          ))}
                        </select>`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', code);
