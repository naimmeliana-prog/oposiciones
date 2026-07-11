const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /const dummyConcepts = \[\n          "Aplicación retroactiva restrictiva", \n          "Revisión de oficio", \n          "Infracción muy grave", \n          "Procedimiento ordinario de control", \n          "Suspensión cautelar", \n          "Delegación de competencias",\n          "Intervención de terceros",\n          "Silencio negativo",\n          "Excepciones de fuerza mayor",\n          "Consentimiento informado expreso",\n          "Medidas preventivas estándar"\n        \];/;

const replacement = `const allConcepts = themePool.flatMap(t => t.keyConcepts && t.keyConcepts.length > 0 ? t.keyConcepts : [t.title]);
        const dummyConcepts = allConcepts.length > 3 ? allConcepts : [
          "Elemento principal 1", "Concepto secundario", "Procedimiento extraordinario", "Gestión operativa", "Intervención de terceros", "Medida cautelar", "Disposición general"
        ];`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', code);
