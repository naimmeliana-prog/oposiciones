const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `    // Search in traps/patterns
    const trapMatches = activeOppositionTraps.filter(tr => 
      tr.title.toLowerCase().includes(query) ||
      tr.description.toLowerCase().includes(query)
    ).map(tr => ({
      id: tr.id,
      title: tr.title,
      type: 'trampa',
      snippet: tr.description.substring(0, 80) + '...'
    }));

    return [...themeMatches, ...trapMatches].slice(0, 8); 
  }, [searchQuery, SYLLABUS_THEMES, activeOppositionTraps]);`;

const replaceStr = `    // Search in traps/patterns
    const trapMatches = activeOppositionTraps.filter(tr => 
      tr.title.toLowerCase().includes(query) ||
      tr.description.toLowerCase().includes(query)
    ).map(tr => ({
      id: tr.id,
      title: tr.title,
      type: 'trampa',
      snippet: tr.description.substring(0, 80) + '...'
    }));

    // Search in Oppositions
    const oppMatches = [...OPPOSITIONS_LIST, ...customOppositions].filter(o => !deletedOppositions.includes(o.id)).filter(o => 
      o.name.toLowerCase().includes(query) ||
      o.description.toLowerCase().includes(query) ||
      o.organism.toLowerCase().includes(query)
    ).map(o => ({
      id: o.id,
      title: o.name,
      type: 'oposición',
      snippet: \`\${o.organism} - \${o.totalPlaces} plazas\`
    }));

    return [...oppMatches, ...themeMatches, ...trapMatches].slice(0, 8); 
  }, [searchQuery, SYLLABUS_THEMES, activeOppositionTraps, customOppositions, deletedOppositions]);`;

code = code.replace(targetStr, replaceStr);

const targetClickStr = `                          onClick={() => {
                            if (r.type === 'tema') {
                              openFullTheme(r.id, r.title);
                            }
                            setSearchQuery("");
                          }}`;
                          
const replaceClickStr = `                          onClick={() => {
                            if (r.type === 'oposición') {
                              setActiveOppositionId(r.id);
                              localStorage.setItem("active_opposition_id", r.id);
                              setActiveTab("temario");
                            } else if (r.type === 'tema') {
                              openFullTheme(r.id, r.title);
                            }
                            setSearchQuery("");
                          }}`;
                          
code = code.replace(targetClickStr, replaceClickStr);
fs.writeFileSync('src/App.tsx', code);
