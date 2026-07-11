const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `                        {/* Title & Organism */}
                        <div>
                          {o.url ? (
                            <a href={o.url} target="_blank" rel="noopener noreferrer" className="font-extrabold text-sm text-indigo-700 hover:underline leading-tight block">
                              {o.name}
                            </a>
                          ) : (
                            <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                              {o.name}
                            </h3>
                          )}
                          <p className="text-[11px] text-slate-400 font-bold mt-1">
                            🏛️ {o.organism} ({o.organismType})
                          </p>
                        </div>`;

const replaceStr = `                        {/* Title & Organism */}
                        <div>
                            <button 
                              onClick={() => {
                                setActiveOppositionId(o.id);
                                localStorage.setItem("active_opposition_id", o.id);
                                setActiveTab("temario");
                              }}
                              className="font-extrabold text-sm text-indigo-700 hover:underline leading-tight text-left cursor-pointer transition block"
                            >
                              {o.name}
                            </button>
                          <p className="text-[11px] text-slate-400 font-bold mt-1 flex gap-2 items-center">
                            <span>🏛️ {o.organism} ({o.organismType})</span>
                            {o.url && <a href={o.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Ver Oficial</a>}
                          </p>
                        </div>`;

code = code.replace(targetStr, replaceStr);
fs.writeFileSync('src/App.tsx', code);
