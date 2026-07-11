import { PracticalCase } from "../types";

export const GENERAL_GUIDELINES: string[] = [
  "Lee el supuesto de hecho con extrema atención, anotando en sucio la cronología exacta (fechas, días hábiles, plazos transcurridos).",
  "Identifica de inmediato el orden jurisdiccional (Civil, Penal, Contencioso, Laboral) y el tipo de procedimiento aplicable (Ordinario, Verbal, Sumario, Abreviado).",
  "Distingue claramente los roles de cada sujeto: quién es el demandante/querellante, quién el demandado/imputado, y si interviene el Letrado de la Administración de Justicia (LAJ), el Juez o el Ministerio Fiscal.",
  "Comprueba la procedencia o improcedencia de acumulación de acciones, incompetencias o declinatorias antes de entrar al fondo del asunto.",
  "Fíjate en las especialidades de notificación: LexNET para profesionales, entrega en papel para ciudadanos no obligados, edictos como último recurso."
];

export const SPECIFIC_GUIDELINES: string[] = [
  "En Civil (LEC), recuerda que los plazos de días son siempre hábiles (se excluyen sábados, domingos, festivos nacionales/locales y el mes de agosto completo salvo actuaciones urgentes).",
  "En Penal (LECrim), para la instrucción todos los días y horas del año son hábiles. El plazo máximo de detención policial es de 72 horas.",
  "En Contencioso (LJCA), el plazo general para interponer el recurso contencioso-administrativo ordinario es de dos meses, contados desde el día siguiente a la publicación de la disposición o notificación del acto administrativo.",
  "En Laboral (LJS), la presentación de la papeleta de conciliación ante el SMAC suspende el plazo de caducidad de la acción de despido durante 15 días hábiles.",
  "En Registro Civil, toda persona tiene un código individual de registro digital. Los asientos se firman electrónicamente por el Encargado."
];

export const TRIBUNAL_EXPECTATIONS = {
  title: "Cualidades y habilidades que el tribunal o junta examinadora espera del opositor",
  skills: [
    {
      name: "Rigor Literal Legal",
      description: "El tribunal valora de forma primordial la capacidad de aplicar el tenor literal de la ley. Los opositores de éxito memorizan la estructura formal de los artículos sin añadir suposiciones de sentido común que desvíen la solución legal exacta."
    },
    {
      name: "Dominio Cronométrico de Plazos",
      description: "Es fundamental diferenciar de inmediato el cómputo de plazos procesales. El tribunal diseña preguntas trampa con desfases de 24 horas o mezclando días hábiles con naturales para cribar la precisión técnica."
    },
    {
      name: "Capacidad de Subsanación Procesal",
      description: "El tribunal busca funcionarios que sepan reconducir errores formales. Conocer qué defectos son insubsanables (ej. plazos de caducidad) y cuáles admiten plazo de subsanación (ej. falta de poder de representación) es clave."
    },
    {
      name: "Celeridad y Diligencia de Oficina",
      description: "En los casos prácticos, se asume el rol de un tramitador. Se exige saber impulsar el proceso con rapidez, confeccionar actas veraces y tramitar notificaciones urgentes con precisión."
    },
    {
      name: "Uso de Herramientas Tecnológicas Oficiales",
      description: "En la administración moderna, se evalúa el dominio de LexNET, del expediente judicial electrónico y de la firma electrónica de resoluciones."
    }
  ]
};

export const STATIC_PRACTICAL_CASES: PracticalCase[] = [
  {
    id: "case-1",
    title: "Caso Práctico 1: Diligencias de Embargo en Juicio Ordinario Civil",
    convocatorias: ["conv-2024", "conv-2023"],
    blocks: ["II"],
    statement: "La mercantil 'Suministros Industriales S.A.' interpone demanda de Juicio Ordinario Civil contra Don Pedro Martínez en reclamación de 120.000 € por impago de material de construcción. Tras celebrarse la Audiencia Previa y el Juicio, se dicta sentencia condenando al demandado al pago íntegro de la deuda más intereses. Transcurrido el plazo legal de cortesía de 20 días sin que Don Pedro satisfaga la condena voluntariamente, la mercantil presenta demanda ejecutiva. El Letrado de la Administración de Justicia despacha ejecución y decreta el embargo de cuentas corrientes, devoluciones de la AEAT y del sueldo de Don Pedro, el cual asciende a 3.000 € líquidos mensuales (siendo el Salario Mínimo Interprofesional aplicable de 1.000 €).",
    generalGuidelines: [
      "Verifica que la demanda ejecutiva no se presente antes del transcurso de los 20 días hábiles de cortesía desde la notificación de la sentencia firme de condena (Art. 548 LEC).",
      "Aplica la escala de inembargabilidad de sueldos contenida en el artículo 607 de la LEC."
    ],
    specificGuidelines: [
      "El primer Salario Mínimo Interprofesional (1.000 €) es totalmente inembargable.",
      "Para los siguientes tramos de ingresos equivalentes al SMI, se aplican los porcentajes progresivos: 30%, 50%, 60%, 75% o 90%."
    ],
    questions: [
      {
        id: "case-1-q1",
        statement: "¿Cuál es el plazo de espera o 'cortesía' mínimo que debe transcurrir para interponer la demanda ejecutiva civil tras la notificación de la sentencia de condena firme?",
        options: {
          A: "10 días hábiles desde la firmeza.",
          B: "20 días hábiles siguientes a aquel en que la resolución de condena sea notificada al ejecutado.",
          C: "20 días naturales sin admitirse excepciones de días inhábiles.",
          D: "Un mes natural computado de fecha a fecha."
        },
        correctOption: "B",
        explanation: "De conformidad con el artículo 548 de la Ley de Enjuiciamiento Civil, no se despachará ejecución de resoluciones procesales o arbitrales, dentro de los veinte días hábiles siguientes a aquel en que la resolución de condena sea notificada al ejecutado.",
        articleReference: "Art. 548 LEC"
      },
      {
        id: "case-1-q2",
        statement: "Calcule la cantidad embargable mensual aplicable sobre el sueldo de Don Pedro de 3.000 €, sabiendo que el SMI de referencia es de 1.000 € mensuales líquidos, y que no tiene cargas familiares acreditadas.",
        options: {
          A: "Se embarga el sueldo completo que supere el SMI, es decir, 2.000 €.",
          B: "El sueldo es totalmente inembargable por ser de naturaleza alimentaria.",
          C: "Se embargan 800 € (30% del segundo SMI + 50% del tercer SMI).",
          D: "Se embarga la mitad de los ingresos líquidos totales, esto es, 1.500 €."
        },
        correctOption: "C",
        explanation: "Aplicando el Art. 607 LEC: El primer SMI (1.000 €) es inembargable. Del segundo SMI (de 1.000 a 2.000 €, diferencia de 1.000 €) se embarga el 30%, que son 300 €. Del tercer SMI (de 2.000 a 3.000 €, diferencia de 1.000 €) se embarga el 50%, que son 500 €. Total embargable: 300 € + 500 € = 800 €.",
        articleReference: "Art. 607.2 LEC"
      },
      {
        id: "case-1-q3",
        statement: "¿Mediante qué resolución despacha la ejecución el Letrado de la Administración de Justicia en el procedimiento ejecutivo?",
        options: {
          A: "Mediante Auto judicial dictado por el Juez titular.",
          B: "Mediante Decreto del LAJ, recurrible directamente en revisión.",
          C: "Mediante Diligencia de Ordenación simple de tramitación.",
          D: "El Juez dicta Auto autorizando y despachando ejecución, y el Letrado de la Administración de Justicia dicta simultáneamente un Decreto de medidas concretas de localización de bienes."
        },
        correctOption: "D",
        explanation: "Presentada la demanda de ejecución, el Tribunal dictará Auto que contenga la orden general de ejecución y despachándola, y seguidamente el LAJ dictará un Decreto que contendrá las medidas de localización y embargo de bienes concretas.",
        articleReference: "Art. 545 y 551 LEC"
      }
    ]
  },
  {
    id: "case-2",
    title: "Caso Práctico 2: Defecto de Notificación Telemática en Instrucción Penal",
    convocatorias: ["conv-2023", "conv-2022"],
    blocks: ["I", "III"],
    statement: "En el Juzgado de Instrucción Nº 3 de Sevilla se tramitan Diligencias Previas por un presunto delito de estafa informática. El investigado, Don Carlos Ruiz, es asistido por el Letrado Don Francisco López, quien consta personado en las actuaciones a través de la plataforma de comunicaciones telemáticas LexNET. El juzgado emite una cédula de citación para que Carlos Ruiz acuda a declarar en concepto de investigado el día 15 de julio de 2026. La notificación telemática es remitida al Letrado el día 10 de julio, pero debido a un fallo acreditado en los servidores del sistema LexNET nacional de Justicia, la transmisión de datos queda incompleta y el letrado no puede descargar el documento adjunto. El investigado no comparece a la citación judicial, y el Juez dicta providencia apercibiéndole con ordenar su detención policial si no justifica su ausencia en 48 horas.",
    generalGuidelines: [
      "Determina si la indefensión formal causada por un fallo de los sistemas telemáticos oficiales es subsanable.",
      "Verifica las garantías que asisten al ciudadano en materia de citación personal penal."
    ],
    specificGuidelines: [
      "De conformidad con la LOPJ, los fallos técnicos que impidan recibir las comunicaciones suspenden el plazo procesal y obligan al juzgado a subsanar el defecto repitiendo la práctica del acto procesal de forma válida."
    ],
    questions: [
      {
        id: "case-2-q1",
        statement: "A la vista de un fallo técnico acreditado en LexNET que impide descargar una cédula de notificación, ¿cuál es el proceder correcto exigible a la Oficina Judicial?",
        options: {
          A: "Dar por efectuada la notificación a todos los efectos, debiendo el Letrado buscarse medios alternativos de acceso.",
          B: "El Letrado debe ser sancionado por no subsanar el archivo en las 24 horas siguientes.",
          C: "El Letrado deberá justificarlo técnicamente, procediéndose por el Letrado de la Administración de Justicia a realizar una nueva notificación, prorrogándose o reanudándose los plazos por el tiempo de la avería.",
          D: "Declarar la nulidad absoluta de todo el proceso de instrucción penal de oficio."
        },
        correctOption: "C",
        explanation: "Cuando los sistemas de comunicación telemática no funcionen por avería técnica, el emisor podrá realizar la comunicación de manera ordinaria, y si se trata de plazos, se prorrogarán o reanudarán al subsanarse la incidencia, previa justificación.",
        articleReference: "Art. 135 y 162 LEC y Art. 230 LOPJ"
      },
      {
        id: "case-2-q2",
        statement: "¿Cuál es el plazo ordinario de prórroga para justificar la inasistencia a una citación de declaración judicial penal de un investigado antes de que se proceda a adoptar una medida cautelar de detención?",
        options: {
          A: "No existe plazo; la detención se acuerda de forma automática y obligatoria de inmediato.",
          B: "El Juez debe citar de nuevo de forma personal con apercibimiento explícito de detención si no comparece sin causa legítima (Citación en forma).",
          C: "72 horas naturales mediante providencia ejecutiva.",
          D: "Debe convocarse previamente una vista de medidas provisionales según el Art. 505 LECrim."
        },
        correctOption: "B",
        explanation: "Ninguna persona puede ser detenida por mera incomparecencia a una citación penal a menos que haya sido previamente citada en forma de manera personal y bajo apercibimiento expreso, y de que persista su desobediencia injustificada.",
        articleReference: "Art. 486 y 487 LECrim"
      }
    ]
  }
];

export const generateDynamicPracticalCase = (
  oppositionName: string,
  blockFilter: string,
  themeIdFilter?: string
): PracticalCase => {
  const opLabel = oppositionName || "Tu Oposición";
  const blockLabel = blockFilter !== "Todos" ? `Bloque ${blockFilter}` : "Bloque General";
  
  // Custom interactive scenarios depending on the selected opposition type!
  let scenario = "";
  let caseTitle = `Caso Práctico Simulado: ${opLabel}`;
  let questions: PracticalCase["questions"] = [];

  if (opLabel.includes("Unión Europea") || opLabel.includes("EPSO")) {
    caseTitle = `Caso Práctico EPSO: Adjudicación de Contratos y Conflicto de Intereses en la UE`;
    scenario = `Un comité de evaluación en la Comisión Europea (DG CONNECT) se encuentra analizando las ofertas presentadas para un proyecto de infraestructura digital valorado en 15.000.000 €. Uno de los asesores técnicos externos que evalúa la oferta técnica es cónyuge de una directiva con acciones significativas en una de las empresas licitadoras más fuertes. El Reglamento Financiero de la Unión Europea y el Código de Conducta prohíben taxativamente la participación de cualquier miembro con conflicto de interés directo o indirecto. Tras ser alertado un funcionario del panel, se debe resolver con urgencia sobre la recusación del asesor y la validez de los informes técnicos ya emitidos.`;
    questions = [
      {
        id: "dynamic-case-q1",
        statement: "¿De acuerdo con los principios del Reglamento Financiero de la UE, qué medidas cautelares inmediatas deben adoptarse ante la sospecha razonable de un conflicto de intereses en un procedimiento de licitación?",
        options: {
          A: "Excluir inmediatamente a todas las empresas del concurso sin emitir informe técnico.",
          B: "Apartar de manera cautelar al miembro afectado del comité evaluador de inmediato y auditar todos los informes técnicos en los que haya intervenido.",
          C: "Dar traslado a la Fiscalía del país de origen de la directiva y paralizar el presupuesto europeo de la dirección general.",
          D: "Permitirle finalizar la evaluación técnica pero restando un 20% a la puntuación de la empresa vinculada."
        },
        correctOption: "B",
        explanation: "En virtud del principio de imparcialidad y transparencia del Reglamento Financiero, ante un conflicto de intereses se debe apartar preventivamente a la persona en conflicto y revisar su aportación para salvaguardar la concurrencia objetiva.",
        articleReference: "Art. 61 Reglamento Financiero de la UE"
      },
      {
        id: "dynamic-case-q2",
        statement: "¿Qué órgano de control de la UE tiene competencia directa para auditar de oficio la regularidad financiera de este proceso de licitación europea?",
        options: {
          A: "El Defensor del Pueblo Europeo en exclusividad.",
          B: "El Tribunal de Justicia de la Unión Europea mediante recurso de apelación ordinario.",
          C: "El Tribunal de Cuentas de la Unión Europea (misión de fiscalización externa).",
          D: "La Oficina Europea de Lucha contra el Fraude (OLAF) en exclusiva sin permitir auditorías internas."
        },
        correctOption: "C",
        explanation: "El Tribunal de Cuentas de la UE tiene encomendada la fiscalización externa de las cuentas y presupuestos de la Unión Europea, auditando la legalidad, regularidad e idoneidad financiera de los ingresos y gastos.",
        articleReference: "Art. 287 Tratado de Funcionamiento de la UE"
      }
    ];
  } else if (opLabel.toLowerCase().includes("médic") || opLabel.toLowerCase().includes("sanidad") || opLabel.toLowerCase().includes("salud")) {
    caseTitle = `Caso Práctico Clínico: ${opLabel}`;
    scenario = `Acude a Urgencias un paciente varón de 65 años, hipertenso y diabético tipo 2 mal controlado. Refiere dolor torácico opresivo irradiado a brazo izquierdo y mandíbula, acompañado de sudoración profusa y náuseas, de 45 minutos de evolución. A su llegada, presenta una tensión arterial de 160/95 mmHg, frecuencia cardíaca de 110 lpm y saturación de oxígeno del 94% al aire ambiente. Se le realiza un ECG de 12 derivaciones de forma inmediata que muestra una elevación del segmento ST en las derivaciones V1 a V4.`;
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
  } else if (opLabel.includes("Auxiliar") || opLabel.includes("AGE") || opLabel.includes("Administración")) {
    caseTitle = `Caso Práctico General: Procedimiento de Inadmisión de Solicitud en la AGE`;
    scenario = `La ciudadana Doña María Gómez presenta una solicitud telemática para la concesión de una ayuda para el alquiler de vivienda convocada por el Ministerio de Vivienda. La convocatoria establece un plazo de presentación improrrogable de 15 días hábiles que expira el 12 de junio. María Gómez adjunta un certificado de rentas del año 2024 en lugar del año 2025 exigido explícitamente en las bases. El órgano instructor del procedimiento administrativo advierte el defecto formal del documento el 18 de junio y emite un requerimiento de subsanación que es notificado en la sede electrónica ministerial el 20 de junio de 2026.`;
    questions = [
      {
        id: "dynamic-case-q1",
        statement: "¿De qué plazo dispone Doña María Gómez para presentar el documento de rentas correcto tras ser notificado legalmente el requerimiento de subsanación?",
        options: {
          A: "3 días naturales con posibilidad de prórroga urgente.",
          B: "10 días hábiles obligatorios, ampliables hasta en 5 días adicionales en circunstancias tasadas.",
          C: "15 días naturales improrrogables por ser ayudas estatales.",
          D: "No hay plazo formal, el expediente queda abierto hasta la resolución de inadmisión definitiva."
        },
        correctOption: "B",
        explanation: "El artículo 68 de la Ley 39/2015 del Procedimiento Administrativo Común de las Administraciones Públicas establece el plazo general de 10 días hábiles para la subsanación de solicitudes.",
        articleReference: "Art. 68.1 Ley 39/2015 LPACAP"
      },
      {
        id: "dynamic-case-q2",
        statement: "Si Doña María Gómez no subsanara el certificado de rentas exigido en el plazo otorgado, ¿cuál será la resolución administrativa correspondiente?",
        options: {
          A: "Se le impondrá una sanción económica por retraso injustificado de trámite.",
          B: "El órgano instructor continuará de oficio el expediente dictando resolución de denegación sobre el fondo.",
          C: "Se la tendrá por desistida de su petición, previa resolución que deberá ser dictada en los términos previstos por la Ley.",
          D: "Se remitirá el caso al Ministerio Fiscal por falsedad documental pasiva."
        },
        correctOption: "C",
        explanation: "Si el interesado no subsana el requerimiento formal de la administración en los 10 días otorgados, la administración dictará resolución expresa teniéndole por desistido de su solicitud.",
        articleReference: "Art. 68 y 21 Ley 39/2015"
      }
    ];
  } else {
    // Standard judicial case tailored dynamically!
    caseTitle = `Caso Práctico Simulado: Impulso Judicial de Oficio y Recursos`;
    scenario = `En el marco de la oposición de ${opLabel}, se plantea un conflicto en la tramitación de un recurso. Durante un procedimiento de reclamación, la parte demandante alega que ha existido una dilación indebida de 4 meses porque el juzgado no impulsó el procedimiento tras presentarse la contestación. La parte demandada se opone aduciendo que el impulso procesal era de exclusiva responsabilidad de las partes y no de la Oficina Judicial. Adicionalmente, se plantea la impugnación de una diligencia de ordenación dictada por el tramitador en relación con los plazos de aportación de pruebas documentales complementarias.`;
    questions = [
      {
        id: "dynamic-case-q1",
        statement: "¿A quién corresponde la responsabilidad del impulso formal de los procedimientos en la oficina judicial de manera exclusiva según las leyes reguladoras?",
        options: {
          A: "Al Juez titular mediante providencias semanales de control ordinario.",
          B: "Al Letrado de la Administración de Justicia (LAJ), de oficio, dictando las resoluciones necesarias.",
          C: "Es exclusiva responsabilidad de los procuradores personados y abogados defensores.",
          D: "Al Ministerio Fiscal como garante del interés público procesal."
        },
        correctOption: "B",
        explanation: "El impulso del procedimiento es de naturaleza pública y corresponde de oficio al Letrado de la Administración de Justicia, salvo las excepciones legales de detención por voluntad de las partes.",
        articleReference: "Art. 179 de la LOPJ y Art. 237 LEC"
      },
      {
        id: "dynamic-case-q2",
        statement: "¿Qué recurso ordinario cabe interponer frente a una Diligencia de Ordenación o Decreto no definitivo del Letrado de la Administración de Justicia que decida un trámite procesal?",
        options: {
          A: "Recurso de queja directa ante la Sala de Gobierno.",
          B: "Recurso de casación excepcional ante el Tribunal Supremo.",
          C: "Recurso de reposición ante el propio Letrado que dictó la resolución.",
          D: "No cabe ningún recurso ordinario, debiendo acudirse directamente al recurso de amparo constitucional."
        },
        correctOption: "C",
        explanation: "Contra las diligencias de ordenación y decretos no definitivos cabe recurso de reposición ante el Letrado de la Administración de Justicia que las dictó, excepto en los casos en que proceda recurso directo de revisión.",
        articleReference: "Art. 451.1 LEC y Art. 454 bis LOPJ"
      }
    ];
  }

  let genGuidelines = [
    "Identifica el ámbito competencial de los órganos implicados en la gestión de este supuesto.",
    "Verifica con cautela la cronología de notificaciones y la existencia de plazos de caducidad procesal o desistimiento administrativo."
  ];
  let specGuidelines = [
    `En el marco legal de ${opLabel}, los trámites deben ajustarse a la normativa oficial vigente que rige el cuerpo evaluador. No asumas respuestas de carácter genérico.`,
    `El plazo límite otorgado por la administración competente es de obligado cumplimiento.`
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
    id: `case-dynamic-${Date.now()}`,
    title: caseTitle,
    convocatorias: ["Simulada 2026"],
    blocks: [blockFilter !== "Todos" ? blockFilter : "I"],
    statement: scenario,
    generalGuidelines: genGuidelines,
    specificGuidelines: specGuidelines,
    questions: questions
  };
};
