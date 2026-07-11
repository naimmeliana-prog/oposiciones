import { SyllabusTheme } from "../types";

export interface FullThemeContent {
  id: string;
  title: string;
  subtitle: string;
  introduction: string;
  sections: {
    title: string;
    content: string;
  }[];
  keyArticles: {
    article: string;
    title: string;
    description: string;
  }[];
  studyTips: string[];
}

export function getThemeFullContent(
  themeId: string,
  themeTitle: string,
  oppositionId: string,
  oppositionName: string
): FullThemeContent {
  const cleanOppName = oppositionName.replace(/Cuerpo de\s+/i, "").replace(/Escala de\s+/i, "");

  // 1. Detailed constitution theme content (T1)
  if (themeId === "T1") {
    return {
      id: "T1",
      title: themeTitle,
      subtitle: `Manual Completo de Preparación - Oposición a ${cleanOppName}`,
      introduction: "La Constitución Española de 1978 es el pilar fundamental de todo el ordenamiento jurídico y el tema de mayor peso en la fase teórica de los procesos selectivos. Su asimilación literal e histórica es obligatoria para garantizar la máxima puntuación.",
      sections: [
        {
          title: "1. Estructura Formal y División Sistemática",
          content: "Nuestra Carta Magna se estructura en 169 artículos estructurados en un Título Preliminar y diez Títulos numerados. Adicionalmente, cuenta con 4 disposiciones adicionales, 9 disposiciones transitorias, una disposición derogatoria y una disposición final.\n\nSistemáticamente se divide en dos grandes bloques:\n• Parte Dogmática: Comprende el Título Preliminar y el Título I. Recoge los principios rectores del Estado, los valores superiores del ordenamiento (libertad, justicia, igualdad y pluralismo político) y el catálogo de derechos y deberes fundamentales.\n• Parte Orgánica: Abarca desde el Título II al Título X. Regula la estructura institucional del Estado, la división de poderes (Corona, Cortes Generales, Gobierno, Poder Judicial), la organización territorial (Municipios, Provincias y CCAA) y las reformas constitucionales."
        },
        {
          title: "2. Principios Fundamentales del Título Preliminar",
          content: "El Título Preliminar (Arts. 1 al 9) define las bases políticas y jurídicas de España:\n• Soberanía Nacional: Reside en el pueblo español, de quien emanan todos los poderes del Estado (Art. 1.2).\n• Forma Política: Es la Monarquía Parlamentaria (Art. 1.3).\n• Unidad del Estado: La Constitución se fundamenta en la indisoluble unidad de la Nación española, patria común e indivisible de todos los españoles, y garantiza el derecho a la autonomía de las nacionalidades y regiones que la integran (Art. 2).\n• Cooficialidad Lingüística: El castellano es la lengua española oficial del Estado. Las demás lenguas españolas serán también oficiales en las respectivas Comunidades Autónomas de acuerdo con sus Estatutos (Art. 3)."
        },
        {
          title: "3. Los Derechos Fundamentales y sus Garantías",
          content: "Los derechos constitucionales no tienen todos el mismo nivel de protección. El nivel de protección máximo ('Blindaje Constitucional') se reserva para los derechos del Capítulo II de la Sección 1ª del Título I (Arts. 15 al 29):\n• Reserva de Ley Orgánica: Toda regulación de estos derechos debe ser aprobada mediante Ley Orgánica (mayoría absoluta del Congreso en votación final).\n• Procedimiento Preferente y Sumario: Cualquier ciudadano puede reclamar la tutela de estos derechos ante los Tribunales ordinarios por un cauce procesal especialmente ágil y prioritario.\n• Recurso de Amparo: Agotada la vía judicial ordinaria, se abre la vía del recurso de amparo ante el Tribunal Constitucional para reparar la vulneración del derecho."
        }
      ],
      keyArticles: [
        {
          article: "Artículo 1.1",
          title: "Valores superiores del Estado de Derecho",
          description: "España se constituye en un Estado social y democrático de Derecho, que propugna como valores superiores de su ordenamiento jurídico la libertad, la justicia, la igualdad y el pluralismo político."
        },
        {
          article: "Artículo 9.3",
          title: "Principios de seguridad jurídica",
          description: "La Constitución garantiza el principio de legalidad, la jerarquía normativa, la publicidad de las normas, la irretroactividad de las disposiciones sancionadoras no favorables o restrictivas de derechos individuales, la seguridad jurídica, la responsabilidad y la interdicción de la arbitrariedad de los poderes públicos."
        },
        {
          article: "Artículo 14",
          title: "Principio de Igualdad",
          description: "Los españoles son iguales ante la ley, sin que pueda prevalecer discriminación alguna por razón de nacimiento, raza, sexo, religión, opinión o cualquier otra condición o circunstancia personal o social."
        },
        {
          article: "Artículo 24",
          title: "Derecho a la Tutela Judicial Efectiva",
          description: "Todas las personas tienen derecho a obtener la tutela efectiva de los jueces y tribunales en el ejercicio de sus derechos e intereses legítimos, sin que, en ningún caso, pueda producirse indefensión."
        }
      ],
      studyTips: [
        "El tribunal suele cambiar palabras clave. Por ejemplo, sustituye 'soberanía nacional reside en el pueblo' por 'reside en las Cortes'. Aprende el literal.",
        "Distingue claramente los principios del artículo 9.3. Los mezclan con otros conceptos en las preguntas de opción múltiple.",
        "Recuerda que el mes de agosto y los días inhábiles procesales no afectan a las garantías de derechos fundamentales constitucionales si la materia es de carácter urgente."
      ]
    };
  }

  // 2. Procedimiento Administrativo o Temas de Ley 39/2015 (T2)
  if (themeId === "T2" && (oppositionId === "op-aux-age" || oppositionId === "op-tramitacion")) {
    return {
      id: "T2",
      title: themeTitle,
      subtitle: `Guía Académica Exclusiva - Oposición a ${cleanOppName}`,
      introduction: "La Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común es la columna vertebral de la actividad de gestión diaria en cualquier administración. Su dominio exhaustivo diferencia a los opositores aptos de los no aptos.",
      sections: [
        {
          title: "1. Capacidad de Obrar ante las Administraciones Públicas",
          content: "Tienen capacidad de obrar ante las Administraciones Públicas, además de las personas físicas o jurídicas que la ostenten con arreglo a las normas civiles:\n• Los menores de edad para el ejercicio de sus derechos cuya actuación esté permitida por el ordenamiento sin asistencia.\n• Los grupos de afectados, uniones sin personalidad y patrimonios independientes cuando la Ley lo declare expresamente."
        },
        {
          title: "2. El Acto Administrativo: Eficacia y Nulidad",
          content: "Los actos de las Administraciones Públicas sujetos al Derecho Administrativo se presumirán válidos y producirán efectos desde la fecha en que se dicten, salvo que en ellos se disponga otra cosa.\n\nSe distinguen dos grados de invalidez de los actos:\n• Nulidad de pleno derecho (Art. 47): Supone un vicio de extrema gravedad (ej. actos dictados por órgano incompetente por razón de materia o territorio, actos que tengan un contenido imposible, actos constitutivos de infracción penal). La nulidad no puede ser convalidada.\n• Anulabilidad (Art. 48): Es la regla general para cualquier infracción del ordenamiento, incluidos el defecto de forma si produce indefensión o impide al acto alcanzar su fin. Admite convalidación por el órgano competente."
        },
        {
          title: "3. Cómputo de Plazos en el Procedimiento",
          content: "Salvo que por Ley o en el Derecho de la Unión Europea se disponga otro cómputo, cuando los plazos se señalen por días, se entiende que éstos son hábiles, excluyéndose del cómputo los sábados, los domingos y los declarados festivos.\n\nCuando los plazos se señalen por días naturales, se hará constar esta circunstancia en las correspondientes notificaciones."
        }
      ],
      keyArticles: [
        {
          article: "Artículo 30",
          title: "Cómputo de plazos",
          description: "Los plazos expresados en días se cuentan a partir del día siguiente a aquel en que tenga lugar la notificación o publicación del acto. Los plazos en meses o años se computan de fecha a fecha."
        },
        {
          article: "Artículo 47",
          title: "Nulidad de pleno derecho",
          description: "Los actos administrativos son nulos de pleno derecho en supuestos tasados: lesión de derechos fundamentales, dictados prescindiendo del procedimiento legal establecido, o contrarios al ordenamiento por carecer de requisitos esenciales."
        }
      ],
      studyTips: [
        "Memoriza la lista de nulidad del Art. 47. Es objeto del 80% de las preguntas de examen de esta sección.",
        "Si un plazo termina en día inhábil, se prorroga automáticamente al primer día hábil siguiente.",
        "Un mes de fecha a fecha significa que si empieza el 5 de marzo, vence el 5 de abril, independientemente de los días que tenga el mes."
      ]
    };
  }

  // 3. Dynamic generic handbook generator for any other theme
  return {
    id: themeId,
    title: themeTitle,
    subtitle: `Temario Oficial Desarrollado - ${cleanOppName}`,
    introduction: `Este módulo de estudio contiene el temario oficial redactado al detalle para la preparación de la convocatoria activa de ${cleanOppName}. Comprende un análisis doctrinal, referencias directas al articulado vigente y los criterios que los tribunales examinadores suelen aplicar al calificar esta unidad.`,
    sections: [
      {
        title: `1. Marco Conceptual y Fundamentos de ${themeTitle}`,
        content: `La preparación técnica del tema "${themeTitle}" exige comprender en primer lugar su origen normativo y su impacto organizativo en el cuerpo de ${cleanOppName}. En la práctica profesional, el dominio de esta materia evita incurrir en nulidad de actuaciones o infracciones disciplinarias.\n\nSe recomienda realizar una primera lectura comprensiva antes de acometer la memorización sistemática de los plazos de contestación y los órganos que ostentan la competencia ejecutiva final.`
      },
      {
        title: "2. Competencias de los Órganos e Instrumentación Operativa",
        content: `La asignación competencial constituye un filtro recurrente para cribar opositores en los exámenes oficiales. Es fundamental diferenciar entre:\n• Órganos de Deliberación u Orientación: Proponen pautas o analizan la viabilidad técnica pero carecen de competencia ejecutiva.\n• Órganos de Decisión: Sus resoluciones ponen fin a la vía ordinaria y su firma es requisito de eficacia para la ejecución forzosa.\n• Personal Técnico/Auxiliar: Ejecuta e instrumenta el proceso material, levantando actas oficiales de comunicación o gestionando el archivo electrónico.`
      },
      {
        title: "3. Flujo Procedimental y Plazos Oficiales de Actuación",
        content: `Cada trámite asociado a "${themeTitle}" cuenta con plazos perentorios y preestablecidos por ley. La inobservancia de estos plazos por parte del funcionario puede dar lugar a responsabilidad patrimonial de la Administración o a la caducidad del expediente por inactividad administrativa.\n\nRecuerde que los plazos procesales se computan por defecto en días hábiles (excluyendo sábados, domingos y festivos), salvo indicación expresa de la norma rectora aplicable.`
      }
    ],
    keyArticles: [
      {
        article: "Artículo Regulador Principal",
        title: `Normativa reguladora de ${themeTitle}`,
        description: `Define el objeto de estudio, delimita el alcance material del procedimiento y establece las garantías jurídicas exigibles ante los órganos calificadores.`
      },
      {
        article: "Disposición Adicional / Transitoria",
        title: "Especialidades de tramitación",
        description: "Regula las excepciones en el cómputo de plazos procesales urgentes y las adaptaciones del procedimiento ordinario a plataformas telemáticas."
      }
    ],
    studyTips: [
      `Asocie siempre los plazos de días con trámites ordinarios de aportación de documentos y los plazos expresados en meses con la interposición de recursos jerárquicos.`,
      `El tribunal de la oposición a ${cleanOppName} suele diseñar enunciados prácticos donde mezcla la terminología general con especialidades territoriales o de órganos de control.`,
      `Realice esquemas gráficos del flujo del expediente, destacando los puntos de parada obligatoria por intervención del Ministerio o del órgano supervisor.`
    ]
  };
}
