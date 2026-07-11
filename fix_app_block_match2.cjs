const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex1 = /t\.block === selectedGeneratorBlock/g;
const replacement1 = `(t.block === selectedGeneratorBlock || String(t.block).includes(\`Bloque \${selectedGeneratorBlock}\`))`;
code = code.replace(regex1, replacement1);

const regex2 = /t\.block === block\.id/g;
const replacement2 = `(t.block === block.id || String(t.block).includes(\`Bloque \${block.id}\`))`;
code = code.replace(regex2, replacement2);

fs.writeFileSync('src/App.tsx', code);
