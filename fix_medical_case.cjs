const fs = require('fs');
let code = fs.readFileSync('src/data/cases.ts', 'utf8');

const regex = /  \} else if \(opLabel\.includes\("Auxiliar"\) \|\| opLabel\.includes\("AGE"\) \|\| opLabel\.includes\("Administración"\)\) \{/m;

const replacement = `  } else if (opLabel.toLowerCase().includes("médic") || opLabel.toLowerCase().includes("sanidad") || opLabel.toLowerCase().includes("salud")) {
    caseTitle = \`Caso Práctico Clínico: \${opLabel}\`;
    scenario = \`Acude a Urgencias un paciente varón de 65 años, hipertenso y diabético tipo 2 mal controlado. Refiere dolor torácico opresivo irradiado a brazo izquierdo y mandíbula, acompañado de sudoración profusa y náuseas, de 45 minutos de evolución. A su llegada, presenta una tensión arterial de 160/95 mmHg, frecuencia cardíaca de 110 lpm y saturación de oxígeno del 94% al aire ambiente. Se le realiza un ECG de 12 derivaciones de forma inmediata que muestra una elevación del segmento ST en las derivaciones V1 a V4.\`;
    questions = [
      {
        id: "dynamic-case-q1",
        statement: "¿Cuál es la medida inicial más urgente y prioritaria en el manejo de este paciente según las guías clínicas de actuación?",
        options: {
          A: "Administrar paracetamol intravenoso y esperar resultados de troponinas.",
          B: "Realizar una radiografía de tórax portátil antes de administrar cualquier tratamiento.",
          C: "Activación del código infarto, administrar doble antiagregación, heparina y trasladar para reperfusión urgente (angioplastia primaria o fibrinólisis).",
          D: "Dar de alta con antiácidos sospechando un reflujo gastroesofágico severo."
        },
        correctOption: "C",
        explanation: "El cuadro clínico y los hallazgos del ECG son compatibles con un Síndrome Coronario Agudo con Elevación del ST (IAMCEST). La prioridad absoluta es la reperfusión miocárdica urgente, preferiblemente mediante Intervención Coronaria Percutánea (ICP) primaria.",
        articleReference: "Protocolo de Actuación en Síndrome Coronario Agudo"
      },
      {
        id: "dynamic-case-q2",
        statement: "En relación al consentimiento informado para la realización del cateterismo urgente, ¿cuál de las siguientes afirmaciones es correcta según la legislación vigente (Ley 41/2002)?",
        options: {
          A: "En situaciones de riesgo vital inmediato, se puede prescindir del consentimiento informado escrito si la demora supone un riesgo grave para la salud del paciente.",
          B: "Debe obtenerse siempre el consentimiento escrito firmado por el paciente o un familiar, aunque esto retrase la intervención vital.",
          C: "El consentimiento verbal es suficiente en todos los casos, independientemente de la gravedad.",
          D: "El médico de urgencias no está autorizado a tomar la decisión de intervenir bajo ninguna circunstancia sin orden judicial."
        },
        correctOption: "A",
        explanation: "La Ley 41/2002 prevé excepciones a la exigencia de consentimiento informado previo en casos de riesgo inmediato y grave para la integridad física o psíquica del enfermo, cuando no sea posible conseguir su autorización.",
        articleReference: "Art. 9 Ley 41/2002 de Autonomía del Paciente"
      }
    ];
  } else if (opLabel.includes("Auxiliar") || opLabel.includes("AGE") || opLabel.includes("Administración")) {`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/data/cases.ts', code);
