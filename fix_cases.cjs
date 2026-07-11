const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/const activeOppositionStaticCases = useMemo\(\(\) => \{[\s\S]*?return \[[\s\S]*?\] as any\[\];\s*\}\s*return \[[\s\S]*?\] as any\[\];\s*\}, \[activeOpposition, activeOppositionId\]\);/, 
`const activeOppositionStaticCases = useMemo(() => {
    if (activeOpposition.practicalCases && activeOpposition.practicalCases.length > 0) {
      return activeOpposition.practicalCases;
    }
    const name = activeOpposition.name.toLowerCase();
    
    if (activeOppositionId === "op-tramitacion") {
      return STATIC_PRACTICAL_CASES;
    }
    
    // Return empty array for everything else, so we show the "Sync" message.
    return [];
  }, [activeOpposition, activeOppositionId]);`);

fs.writeFileSync('src/App.tsx', code);
