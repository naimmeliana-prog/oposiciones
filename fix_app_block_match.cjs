const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace all strict exact matches for blocks to also check if it contains the block string (for legacy data)
// e.g. t.block === selectedGeneratorBlock -> (t.block === selectedGeneratorBlock || t.block.includes(\` \${selectedGeneratorBlock}:\`) || t.block === \`Bloque \${selectedGeneratorBlock}\`)

const regex1 = /t\\.block === selectedGeneratorBlock/g;
const replacement1 = `(t.block === selectedGeneratorBlock || t.block.includes(\`Bloque \${selectedGeneratorBlock}\`))`;

code = code.replace(regex1, replacement1);

// Also fix in block filtering for stats
const regex2 = /const blockThemes = SYLLABUS_THEMES\\.filter\\(t => t\\.block === block\\.id\\);/g;
const replacement2 = `const blockThemes = SYLLABUS_THEMES.filter(t => t.block === block.id || t.block.includes(\`Bloque \${block.id}\`));`;

code = code.replace(regex2, replacement2);

fs.writeFileSync('src/App.tsx', code);
