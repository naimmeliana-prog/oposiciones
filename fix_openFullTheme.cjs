const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `  const openFullTheme = async (themeId: string, title?: string) => {
    // If it is Tramitacion or Aux AGE, we can still use static
    if (activeOpposition.id === "op-tramitacion" || activeOpposition.id === "op-aux-age") {
      setViewingFullTheme(getThemeFullContent(themeId, title || "Tema de Estudio", activeOpposition.id, activeOpposition.name));
      return;
    }

    setIsFetchingTheme(true);
    try {
      const response = await fetch("/api/theme-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ themeTitle: title || "Tema de Estudio", oppositionName: activeOpposition.name }),
      });
      const data = await response.json();
      data.id = themeId;
      setViewingFullTheme(data);
    } catch (err) {
      console.error(err);
      // Fallback
      setViewingFullTheme(getThemeFullContent(themeId, title || "Tema de Estudio", activeOpposition.id, activeOpposition.name));
    } finally {
      setIsFetchingTheme(false);
    }
  };`;

const replaceStr = `  const openFullTheme = async (themeId: string, title?: string) => {
    // If it is Tramitacion or Aux AGE, we can still use static
    if (activeOpposition.id === "op-tramitacion" || activeOpposition.id === "op-aux-age") {
      setViewingFullTheme(getThemeFullContent(themeId, title || "Tema de Estudio", activeOpposition.id, activeOpposition.name));
      return;
    }

    setIsFetchingTheme(true);
    try {
      const response = await fetch("/api/theme-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ themeTitle: title || "Tema de Estudio", oppositionName: activeOpposition.name }),
      });
      const data = await response.json();
      if (data.error) {
        alert("Aviso: " + (data.error.includes("RESOURCE_EXHAUSTED") || data.error.includes("JSON") ? "Límite de uso de la IA de Google alcanzado. Se mostrará un tema por defecto. Inténtalo de nuevo más tarde." : data.error));
        setViewingFullTheme(getThemeFullContent(themeId, title || "Tema de Estudio", activeOpposition.id, activeOpposition.name));
        return;
      }
      data.id = themeId;
      setViewingFullTheme(data);
    } catch (err) {
      console.error(err);
      // Fallback
      setViewingFullTheme(getThemeFullContent(themeId, title || "Tema de Estudio", activeOpposition.id, activeOpposition.name));
    } finally {
      setIsFetchingTheme(false);
    }
  };`;

code = code.replace(targetStr, replaceStr);
fs.writeFileSync('src/App.tsx', code);
