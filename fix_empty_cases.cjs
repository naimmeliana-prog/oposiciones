const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `                  <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1">
                    {activeOppositionStaticCases.map((scase) => {`;

const replaceStr = `                  <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1">
                    {activeOppositionStaticCases.length === 0 && (
                      <div className="text-xs text-slate-500 bg-white p-3 border border-slate-200 rounded-xl">
                        No hay casos prácticos almacenados localmente para esta oposición. Usa la herramienta de <b>"Sincronizar Oficial"</b> (Buscador Global) para extraer contenido oficial mediante Inteligencia Artificial.
                      </div>
                    )}
                    {activeOppositionStaticCases.map((scase) => {`;

code = code.replace(targetStr, replaceStr);
fs.writeFileSync('src/App.tsx', code);
