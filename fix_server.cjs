const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/res\.json\(\{ results: JSON\.parse\(response\.text\.replace[^;]+\}\);/g, `
    let rawText = response.text || "[]";
    console.log("Raw search response:", rawText);
    let cleanText = rawText.replace(/^\\s*\`\`\`json\\s*/gi, '').replace(/\\s*\`\`\`\\s*$/g, '');
    try {
      res.json({ results: JSON.parse(cleanText) });
    } catch (e) {
      console.error("JSON Parse error:", e);
      res.status(500).json({ error: "Invalid JSON from AI" });
    }
`);

code = code.replace(/res\.json\(JSON\.parse\(response\.text\.replace[^;]+\);/g, `
    let rawText = response.text || "{}";
    console.log("Raw content response:", rawText);
    let cleanText = rawText.replace(/^\\s*\`\`\`json\\s*/gi, '').replace(/\\s*\`\`\`\\s*$/g, '');
    try {
      res.json(JSON.parse(cleanText));
    } catch (e) {
      console.error("JSON Parse error:", e);
      res.status(500).json({ error: "Invalid JSON from AI" });
    }
`);

fs.writeFileSync('server.ts', code);
