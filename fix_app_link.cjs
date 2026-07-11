const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /                        \{res\.url \? \(\n                          <a href=\{res\.url\} target="_blank" rel="noopener noreferrer" className="text-sm font-black text-blue-700 leading-tight mb-1 hover:underline block">\{res\.name\}<\/a>\n                        \) : \(\n                          <h4 className="text-sm font-black text-black leading-tight mb-1">\{res\.name\}<\/h4>\n                        \)\}/;

const replacement = `                        <div className="flex items-start justify-between gap-2 mb-1">
                          <button onClick={() => performSync(res)} className="text-sm font-black text-blue-700 leading-tight hover:underline text-left">
                            {res.name}
                          </button>
                          {res.url && (
                            <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded hover:bg-slate-200 transition shrink-0 flex items-center gap-1">
                              <ExternalLink className="h-3 w-3" /> Link Oficial
                            </a>
                          )}
                        </div>`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', code);
