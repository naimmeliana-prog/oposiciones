async function list() {
  const r = await fetch('https://openrouter.ai/api/v1/models');
  const d = await r.json();
  const free = d.data.filter(m => m.pricing.prompt == '0' || m.id.endsWith(':free'));
  console.log(free.map(m => m.id).join('\n'));
}
list();
