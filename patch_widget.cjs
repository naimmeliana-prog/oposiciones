const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /\{\/\* Profile widget \*\/\}([\s\S]*?)<\/div>\n              \) : \([\s\S]*?<\/button>\n              \)\}/;

const patch = `{/* Profile widget */}
            <div className="flex items-center gap-2 bg-slate-800 rounded-full pl-3 pr-2 py-1 border border-slate-700">
              {firebaseUser ? (
                <div className="flex items-center gap-2">
                  <div className="text-left">
                    <p className="text-xs font-bold text-white truncate max-w-[120px]">
                      {firebaseUser.displayName || firebaseUser.email}
                    </p>
                    <p className="text-[10px] text-emerald-400 font-semibold">
                      Progreso Guardado
                    </p>
                  </div>
                  <button
                    onClick={syncToFirebase}
                    disabled={isFirebaseSyncing}
                    title="Sincronizar en la nube"
                    className="w-8 h-8 rounded-full bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-emerald-200 text-xs font-bold cursor-pointer transition border border-emerald-700 disabled:opacity-50"
                  >
                    <Sparkles className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleFirebaseLogout}
                    title="Cerrar Sesión"
                    className="w-8 h-8 rounded-full bg-red-900 hover:bg-red-800 flex items-center justify-center text-red-200 text-xs font-bold cursor-pointer transition border border-red-700"
                  >
                    <User className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleFirebaseLogin}
                  className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-blue-300 cursor-pointer transition py-1 px-2"
                >
                  <User className="h-4 w-4" />
                  <span>Iniciar con Google</span>
                </button>
              )}`;

const replaced = content.replace(regex, patch);
fs.writeFileSync('src/App.tsx', replaced);
console.log('Patched Profile widget');
