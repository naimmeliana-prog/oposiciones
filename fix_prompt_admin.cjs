const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /contents: \`Busca exhaustivamente en internet y encuentra información real, oficial y ACTUALIZADA sobre procesos selectivos, oposiciones o bolsas de empleo en España \(o Europa\) para el término: "\$\{query\}"\.[\s\S]*?Devuelve ESTRICTAMENTE en formato JSON Array sin texto adicional, donde cada objeto tenga estas claves: id, name, totalPlaces \(number\), group, region, status, description, url\.\`,/m;

const replacement = `contents: \`Busca exhaustivamente información real, oficial y ACTUALIZADA sobre procesos selectivos, oposiciones o bolsas de empleo público en España para el término: "\${query}".
      Realiza una búsqueda específica en sitios web oficiales como "administracion.gob.es" (específicamente la sección de ofertas de empleo público), BOE, y portales autonómicos de empleo.
      PRIORIZA ABSOLUTAMENTE las convocatorias que tengan el PLAZO DE INSCRIPCIÓN ABIERTO en este momento, no vencido.
      Devuelve una lista de hasta 15 resultados que coincidan con convocatorias reales de empleo público, con plazo de solicitud abierto, o procesos muy recientes. NO devuelvas ofertas de empleo privado ni de bolsas de trabajo genéricas de clínicas privadas. Solo empleo público u oposiciones.
      Incluye detalles como el nombre oficial, plazas, grupo (A1, A2, C1, C2), ámbito y estado.
      Devuelve ESTRICTAMENTE en formato JSON Array sin texto adicional, donde cada objeto tenga estas claves: id, name, totalPlaces (number), group, region, status, description, url.\`,`;

code = code.replace(regex, replacement);
fs.writeFileSync('server.ts', code);
