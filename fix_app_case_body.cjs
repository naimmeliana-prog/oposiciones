const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /body: JSON\\.stringify\\(\\{ oppositionName: activeOpposition\\.name, blockName: caseGeneratorBlock \\}\\)/;

const replacement = `body: JSON.stringify({ 
                            oppositionName: activeOpposition.name, 
                            blockName: caseGeneratorBlock === "Todos" 
                                ? "Todos los bloques" 
                                : currentSyllabus.blocks.find(b => b.id === caseGeneratorBlock)?.title || caseGeneratorBlock 
                          })`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', code);
