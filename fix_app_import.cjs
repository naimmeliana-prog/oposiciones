const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /import \{ /;
const replacement = `import { ExternalLink, `;

code = code.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', code);
