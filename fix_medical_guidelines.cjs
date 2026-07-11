const fs = require('fs');
let code = fs.readFileSync('src/data/cases.ts', 'utf8');

const regex = /  return \{\n    id: `case-dynamic-\$\{Date\.now\(\)\}`,\n    title: caseTitle,\n    convocatorias: \["Simulada 2026"\],\n    blocks: \[blockFilter !== "Todos" \? blockFilter : "I"\],\n    statement: scenario,\n    generalGuidelines: \[\n      "Identifica el ámbito competencial de los órganos implicados en la gestión de este supuesto\.",\n      "Verifica con cautela la cronología de notificaciones y la existencia de plazos de caducidad procesal o desistimiento administrativo\."\n    \],\n    specificGuidelines: \[\n      `En el marco legal de \$\{opLabel\}, los trámites deben ajustarse a la normativa oficial vigente que rige el cuerpo evaluador\. No asumas respuestas de carácter genérico\.`,\n      `El plazo límite otorgado por la administración competente es de obligado cumplimiento\.`\n    \],\n    questions: questions\n  \};\n\};/m;

const replacement = `  let genGuidelines = [
    "Identifica el ámbito competencial de los órganos implicados en la gestión de este supuesto.",
    "Verifica con cautela la cronología de notificaciones y la existencia de plazos de caducidad procesal o desistimiento administrativo."
  ];
  let specGuidelines = [
    \`En el marco legal de \${opLabel}, los trámites deben ajustarse a la normativa oficial vigente que rige el cuerpo evaluador. No asumas respuestas de carácter genérico.\`,
    \`El plazo límite otorgado por la administración competente es de obligado cumplimiento.\`
  ];

  if (opLabel.toLowerCase().includes("médic") || opLabel.toLowerCase().includes("sanidad") || opLabel.toLowerCase().includes("salud")) {
    genGuidelines = [
      "Analiza detenidamente los antecedentes clínicos y comorbilidades del paciente antes de tomar decisiones terapéuticas.",
      "Identifica el diagnóstico más probable basándote en la evidencia clínica, signos vitales y pruebas complementarias iniciales."
    ];
    specGuidelines = [
      "Aplica los protocolos clínicos actualizados y guías de práctica médica vigentes para la especialidad correspondiente.",
      "Considera los principios de la bioética médica (autonomía, beneficencia, no maleficencia y justicia) en todo el abordaje asistencial y legal."
    ];
  }

  return {
    id: \`case-dynamic-\${Date.now()}\`,
    title: caseTitle,
    convocatorias: ["Simulada 2026"],
    blocks: [blockFilter !== "Todos" ? blockFilter : "I"],
    statement: scenario,
    generalGuidelines: genGuidelines,
    specificGuidelines: specGuidelines,
    questions: questions
  };
};`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/data/cases.ts', code);
