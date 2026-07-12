async function list() {
  const r = await fetch('https://openrouter.ai/api/v1/models');
  const d = await r.json();
  const gemini = d.data.filter(m => m.id.includes('google/gemini-2.5'));
  gemini.forEach(m => console.log(m.id, m.pricing));
}
list();
