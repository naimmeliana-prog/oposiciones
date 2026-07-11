const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Módulo 6 in Intro (Dashboard tab)
code = code.replace(/bg-gradient-to-br from-slate-900 to-blue-950 text-white/g, "bg-indigo-50 border border-indigo-200 text-slate-900");
code = code.replace(/text-white mt-1">Generador/g, "text-indigo-900 mt-1\">Generador");
code = code.replace(/text-slate-300 mt-2 leading-relaxed">\s*Genera exámenes/g, "text-indigo-800 mt-2 leading-relaxed\">\n                      Genera exámenes");
code = code.replace(/bg-slate-800\/80/g, "bg-white");
code = code.replace(/border-slate-700\/50/g, "border-indigo-100");
code = code.replace(/text-slate-400 uppercase font-bold">Dificultad/g, "text-indigo-600 uppercase font-bold\">Dificultad");
code = code.replace(/capitalize font-bold text-white">\{testDifficulty\}/g, "capitalize font-bold text-indigo-900\">{testDifficulty}");
code = code.replace(/text-slate-400 uppercase font-bold">Nº Preguntas/g, "text-indigo-600 uppercase font-bold\">Nº Preguntas");
code = code.replace(/font-bold text-white">\{testNumQuestions\}/g, "font-bold text-indigo-900\">{testNumQuestions}");

// 2. Filtro Convocatorias
code = code.replace(/bg-slate-900 text-white rounded-xl p-4 shadow-md flex flex-col gap-3/g, "bg-white border border-indigo-200 text-slate-900 rounded-xl p-4 shadow-md flex flex-col gap-3");
code = code.replace(/text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">\s*Filtro Convocatorias/g, 'text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">\n                Filtro Convocatorias');
code = code.replace(/text-\[10px\] text-slate-400">\s*Selecciona las/g, 'text-[10px] text-indigo-900/70">\n                Selecciona las');
code = code.replace(/border-t border-slate-800 pt-2/g, "border-t border-indigo-100 pt-2");
code = code.replace(/text-\[10px\] font-bold text-slate-400">Convocatorias Activas/g, 'text-[10px] font-bold text-indigo-700">Convocatorias Activas');
code = code.replace(/hover:text-blue-300 transition py-1\.5 px-2 rounded hover:bg-slate-800\/40/g, "hover:text-indigo-700 transition py-1.5 px-2 rounded hover:bg-indigo-50");
code = code.replace(/className="rounded text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 h-4 w-4"/g, 'className="rounded text-indigo-600 bg-white border-slate-300 focus:ring-indigo-500 h-4 w-4"');
code = code.replace(/bg-slate-800 hover:bg-slate-700 text-\[10px\] font-bold text-white/g, "bg-indigo-100 hover:bg-indigo-200 text-[10px] font-bold text-indigo-900");

// 3. Patrón Evaluativo Consolidado
code = code.replace(/bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-800/g, "bg-indigo-50 text-slate-900 rounded-xl p-5 border border-indigo-200");
code = code.replace(/text-xs font-bold text-slate-300 uppercase tracking-wider">\s*Patrón Evaluativo/g, 'text-xs font-bold text-indigo-800 uppercase tracking-wider">\n                          Patrón Evaluativo');
code = code.replace(/text-xs text-slate-300 leading-relaxed">\s*\{\(\(\) => \{/g, 'text-xs text-indigo-900 leading-relaxed">\n                        {(() => {');

// 4. Preguntas & Mnemotecnia 
code = code.replace(/bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono/g, "bg-indigo-50 text-indigo-900 rounded-xl p-4 text-xs font-mono border border-indigo-200");
code = code.replace(/text-slate-400 text-\[10px\] uppercase font-bold tracking-wider mb-2">\s*Ejemplo de Reactivo/g, 'text-indigo-800 text-[10px] uppercase font-bold tracking-wider mb-2">\n                        Ejemplo de Reactivo');
code = code.replace(/text-white mb-2 font-serif text-sm">"\{q\.realQuestionSample\}"/g, 'text-indigo-950 mb-2 font-serif text-sm">"{q.realQuestionSample}"');
code = code.replace(/text-emerald-400 font-bold">\s*→ Respuesta/g, 'text-emerald-700 font-bold">\n                        → Respuesta');

// Also replacing Level Summary Box
code = code.replace(/bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6/g, "bg-blue-50 border border-blue-200 text-slate-900 rounded-2xl p-6");
code = code.replace(/text-3xl font-black text-white mt-1/g, "text-3xl font-black text-blue-900 mt-1");
code = code.replace(/text-xs text-slate-300 mt-1\.5 leading-relaxed/g, "text-xs text-blue-800 mt-1.5 leading-relaxed");

fs.writeFileSync('src/App.tsx', code);
