const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /                        \/\/ Save the generated case so it persists\n                        setCustomOppositions\(prev => \{\n                          const next = prev\.map\(opp => \{\n                            if \(opp\.id === activeOpposition\.id\) \{\n                              const updatedCases = \[\.\.\.\(opp\.practicalCases \|\| \[\]\), newCase\];\n                              return \{ \.\.\.opp, practicalCases: updatedCases \};\n                            \}\n                            return opp;\n                          \}\);\n                          localStorage\.setItem\("custom_oppositions", JSON\.stringify\(next\)\);\n                          return next;\n                        \}\);/;

const replacement = `                        // Save the generated case so it persists
                        setCustomOppositions(prev => {
                          let next;
                          if (prev.some(o => o.id === activeOpposition.id)) {
                            next = prev.map(opp => {
                              if (opp.id === activeOpposition.id) {
                                const updatedCases = [...(opp.practicalCases || []), newCase];
                                return { ...opp, practicalCases: updatedCases };
                              }
                              return opp;
                            });
                          } else {
                            const newOpp = { ...activeOpposition, practicalCases: [newCase] };
                            next = [...prev, newOpp];
                          }
                          localStorage.setItem("custom_oppositions", JSON.stringify(next));
                          return next;
                        });`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', code);
