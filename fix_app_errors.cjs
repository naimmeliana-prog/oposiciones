const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/switchOpposition\(r\.id\);/g, 'setActiveOppositionId(r.id);');
code = code.replace(/setIsSearchOpen\(false\);/g, '');

fs.writeFileSync('src/App.tsx', code);
