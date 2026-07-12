async function callOpenRouter(prompt, jsonMode = true) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://ai.studio/build",
      "X-Title": "Preparador de Oposiciones",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      max_tokens: 8192,
      messages: [{ role: "user", content: prompt }],
      response_format: jsonMode ? { type: "json_object" } : undefined,
    }),
  });
  if (!response.ok) {
    console.log(await response.text());
  } else {
    console.log(await response.json());
  }
}

callOpenRouter('{"test":"true"}', true);
