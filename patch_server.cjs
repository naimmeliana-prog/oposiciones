const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const helperFn = `
function getFriendlyErrorMessage(error: any): string {
  if (!error) return "Error desconocido";
  const msg = typeof error === 'string' ? error : (error.message || JSON.stringify(error));
  if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("Quota exceeded") || msg.includes("rate-limits")) {
    return "Has alcanzado el límite de peticiones de la API de Google (versión gratuita). Por favor, espera un minuto y vuelve a intentarlo.";
  }
  return msg;
}
`;

content = content.replace("import dotenv from \"dotenv\";", "import dotenv from \"dotenv\";\n" + helperFn);

// Replace error handling:
content = content.replace(/res\.status\(500\)\.json\(\{ error: error\.message \|\| "Error al realizar la búsqueda" \}\);/g, 'res.status(500).json({ error: getFriendlyErrorMessage(error) || "Error al realizar la búsqueda" });');
content = content.replace(/res\.status\(500\)\.json\(\{ error: error\.message \|\| "Error al sincronizar la oposición" \}\);/g, 'res.status(500).json({ error: getFriendlyErrorMessage(error) || "Error al sincronizar la oposición" });');
content = content.replace(/res\.status\(500\)\.json\(\{ error: error\.message \|\| "Error al generar contenido del tema" \}\);/g, 'res.status(500).json({ error: getFriendlyErrorMessage(error) || "Error al generar contenido del tema" });');
content = content.replace(/res\.status\(500\)\.json\(\{ error: error\.message \|\| "Error al generar el caso práctico" \}\);/g, 'res.status(500).json({ error: getFriendlyErrorMessage(error) || "Error al generar el caso práctico" });');
content = content.replace(/res\.status\(500\)\.json\(\{ error: error\.message \|\| "Error al generar el material completo" \}\);/g, 'res.status(500).json({ error: getFriendlyErrorMessage(error) || "Error al generar el material completo" });');

fs.writeFileSync('server.ts', content);
console.log("Patched server.ts with friendly error message");
