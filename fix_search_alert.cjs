const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `  const performExternalSearch = async (query: string) => {
    if (!query || query.length < 3) return;
    setIsSearchingExternal(true);
    try {
      const response = await fetch("/api/opposition-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      if (data.results) {
        setExternalSearchRes(data.results);
      }
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setIsSearchingExternal(false);
    }
  };`;

const replaceStr = `  const performExternalSearch = async (query: string) => {
    if (!query || query.length < 3) return;
    setIsSearchingExternal(true);
    try {
      const response = await fetch("/api/opposition-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      if (data.results) {
        setExternalSearchRes(data.results);
      } else if (data.error) {
        alert("Aviso: " + (data.error.includes("RESOURCE_EXHAUSTED") || data.error.includes("JSON") ? "Se ha alcanzado el límite de uso de la IA de Google. Inténtalo de nuevo en unos minutos." : "No se pudo realizar la búsqueda en vivo."));
      }
    } catch (err) {
      console.error("Search failed", err);
      alert("Aviso: Error de conexión con el servicio de búsqueda.");
    } finally {
      setIsSearchingExternal(false);
    }
  };`;

code = code.replace(targetStr, replaceStr);

const targetSync = `  const performSync = async (res: any) => {
    setIsSyncing(res.id);
    try {
      const response = await fetch("/api/opposition-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: res.name }),
      });
      const data = await response.json();
      
      const dynamicOpp: Opposition = {`;

const replaceSync = `  const performSync = async (res: any) => {
    setIsSyncing(res.id);
    try {
      const response = await fetch("/api/opposition-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: res.name }),
      });
      const data = await response.json();
      
      if (data.error) {
         alert("Aviso al Sincronizar: " + (data.error.includes("RESOURCE_EXHAUSTED") || data.error.includes("JSON") ? "Se ha alcanzado el límite de uso de la IA. Inténtalo de nuevo en unos minutos." : data.error));
         return;
      }
      
      const dynamicOpp: Opposition = {`;
code = code.replace(targetSync, replaceSync);
fs.writeFileSync('src/App.tsx', code);
