const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /contents: \`Eres un preparador experto de oposiciones\. Escribe un Caso Práctico \(Supuesto de Hecho\) realista y a nivel de examen oficial para la oposición de "\$\{oppositionName\}"\.\n      El caso debe estar estrictamente relacionado con la temática específica del candidato\. Los casos prácticos no pueden ser genéricos, no pueden ser los mismos para un celador que para un médico o para un administrativo\. Adapta el contenido, vocabulario y situaciones exactamente al puesto de "\$\{oppositionName\}"\.\n      El caso debe centrarse o incorporar elementos del bloque temático: "\$\{blockName\}"\.\n      Devuelve ESTRICTAMENTE un objeto JSON/;

const replacement = `contents: \`Eres un preparador experto de oposiciones y tribunal calificador. Tu tarea es redactar un SUPUESTO PRÁCTICO (Caso Práctico) ALTAMENTE ESPECIALIZADO y REALISTA para la oposición de: "\${oppositionName}".

      REGLA CRÍTICA DE ROL Y CONTEXTO:
      - Si "\${oppositionName}" es del ámbito SANITARIO (ej. Médico, Enfermería, Celador), el escenario DEBE desarrollarse obligatoriamente en un Centro de Salud, Hospital o entorno asistencial. Debe involucrar pacientes, protocolos sanitarios, historias clínicas, traslados de pacientes o triaje clínico. ¡PROHIBIDO mencionar juzgados, letrados, trámites procesales o demandas civiles!
      - Si "\${oppositionName}" es Administrativo, el caso debe ser sobre procedimiento administrativo, registro o atención ciudadana.
      - Si "\${oppositionName}" es de Justicia, el caso será estrictamente procesal (civil, penal, etc.).
      
      El caso NO puede ser genérico. Usa vocabulario, herramientas y situaciones diarias propias de la profesión de "\${oppositionName}".
      
      El caso debe incorporar elementos del bloque de estudio: "\${blockName}". (Si el bloque es "Organización del Estado" o "Leyes Generales", aplica esas leyes al contexto diario de la profesión, por ejemplo, derechos del paciente para un médico, o secreto profesional).
      
      Devuelve ESTRICTAMENTE un objeto JSON`;

code = code.replace(regex, replacement);
fs.writeFileSync('server.ts', code);
