const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/res\.json\(\{\s*results:\s*JSON\.parse\(response\.text\.replace\(\/\\\^\\\`\\\`\\\`json\/g, ''\)\.replace\(\/\\\`\\\`\\\`\\\$\/g, ''\)\)\s*\}\);/g, `
    let rawText = response.text || "[]";
    console.log("Raw search response:", rawText);
    let cleanText = rawText.replace(/^\\s*\`\`\`json\\s*/gi, '').replace(/\\s*\`\`\`\\s*$/g, '');
    res.json({ results: JSON.parse(cleanText) });
`);

code = code.replace(/res\.json\(JSON\.parse\(response\.text\.replace\(\/\\\^\\\`\\\`\\\`json\/g, ''\)\.replace\(\/\\\`\\\`\\\`\\\$\/g, ''\)\)\);/g, `
    let rawText = response.text || "{}";
    console.log("Raw content response:", rawText);
    let cleanText = rawText.replace(/^\\s*\`\`\`json\\s*/gi, '').replace(/\\s*\`\`\`\\s*$/g, '');
    res.json(JSON.parse(cleanText));
`);

fs.writeFileSync('server.ts', code);
