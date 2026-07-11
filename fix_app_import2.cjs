const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// revert the first replacement
code = code.replace(/import \{ ExternalLink, useState, useEffect/, 'import { useState, useEffect');

// add ExternalLink to lucide-react
code = code.replace(/AlertTriangle,\n/, 'AlertTriangle,\n  ExternalLink,\n');

fs.writeFileSync('src/App.tsx', code);
