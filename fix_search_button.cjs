const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /                      performExternalSearch\(searchQuery\);\n                      setActiveTab\("dashboard"\);\n                      setSearchQuery\(""\);\n                    \}\}/m;

const replacement = `                      performExternalSearch(searchQuery);
                      setActiveTab("dashboard");
                      setSearchQuery("");
                      setIsSearchOpen(false);
                    }}`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', code);
