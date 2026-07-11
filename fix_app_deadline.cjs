const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /const \[oppSearchDeadline, setOppSearchDeadline\] = useState\("Todos"\);/m;
const replacement = `const [oppSearchDeadline, setOppSearchDeadline] = useState("Abierto");`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', code);
