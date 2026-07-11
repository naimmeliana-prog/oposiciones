const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/Plazo: \{o\.deadlineStatus\}/g, "Plazo: {o.deadline}");

const targetDateStr = `                          <div className="col-span-2 text-indigo-700 font-semibold bg-indigo-50/50 p-1.5 rounded-lg border border-indigo-100/40">
                            📅 <strong>Fin de Plazo:</strong> {
                              o.id === "op-tramitacion" ? "30/11/2026" :
                              o.deadline === "Abierto" ? "15/12/2026" :
                              o.deadline === "Próximo" ? "10/01/2027" :
                              "Plazo Expirado"
                            }
                          </div>`;

const replaceDateStr = `                          <div className="col-span-2 text-indigo-700 font-semibold bg-indigo-50/50 p-1.5 rounded-lg border border-indigo-100/40">
                            📅 <strong>Estado de Plazo:</strong> {o.deadline}
                          </div>`;

code = code.replace(targetDateStr, replaceDateStr);
fs.writeFileSync('src/App.tsx', code);
