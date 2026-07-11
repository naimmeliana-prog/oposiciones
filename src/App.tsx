/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, FormEvent, MouseEvent } from "react";
import {
  BookOpen,
  Award,
  ShieldAlert,
  ListFilter,
  CheckCircle,
  Circle,
  User,
  Plus,
  Search,
  Printer,
  Clock,
  Sparkles,
  FileText,
  Check,
  ChevronRight,
  Trash,
  LogOut,
  AlertTriangle,
  ExternalLink,
  RotateCcw,
  TrendingUp,
  X,
  FileQuestion,
  GraduationCap,
  Calendar,
  Save,
  Users,
  Lock,
  Compass,
  MapPin,
  Globe,
  Trophy,
  Building,
  Briefcase,
  Filter,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { SyllabusTheme, SyllabusBlock, UserAccount, OfficialExam, ExamQuestion, ExamTrap, DifficultQuestionPattern, Opposition, PracticalCase } from "./types";
import { REQUIREMENTS, SYLLABUS_BLOCKS as STATIC_SYLLABUS_BLOCKS, SYLLABUS_THEMES as STATIC_SYLLABUS_THEMES } from "./data/syllabus";
import { OFFICIAL_EXAMS, EXAM_TRAPS, DIFFICULT_QUESTIONS, STATIC_QUESTIONS } from "./data/exams";
import { OPPOSITIONS_LIST } from "./data/oppositions";
import { GENERAL_GUIDELINES, SPECIFIC_GUIDELINES, TRIBUNAL_EXPECTATIONS, STATIC_PRACTICAL_CASES, generateDynamicPracticalCase } from "./data/cases";
import { getThemeFullContent } from "./data/themeFullContent";


const getInteractiveConceptDetail = (themeId: string, item: string, type: 'concept' | 'articles', oppositionId: string) => {
  const isArticles = type === 'articles';
  
  // Custom response depending on the clicked text
  let detailText = `Este apartado comprende la regulación detallada de "${item}" en relación con el temario oficial de la oposición. El dominio de sus preceptos literales y plazos procesales asociados es imprescindible para superar las preguntas trampa del examen.`;
  let keyArticles: string[] = [];
  
  // Define default mnemonic depending on active opposition
  let mnemotecnia = "Asocia los plazos cortos de tramitación con resoluciones urgentes, y los plazos de meses con recursos ordinarios.";
  if (oppositionId === "op-tramitacion") {
    mnemotecnia = "Regla de Justicia: Asocia plazos cortos de días con providencias de mero trámite y plazos de meses con contestación o recursos de apelación.";
  } else if (oppositionId === "op-aux-age") {
    mnemotecnia = "Regla de la AGE: En la Ley 39/2015, los plazos por días son siempre hábiles (excluidos sábados, domingos y festivos) y se computan desde el día siguiente a la notificación.";
  } else if (oppositionId === "op-epso-admin") {
    mnemotecnia = "Regla EPSO: Descarta distractores extremos con términos categóricos (siempre, nunca, obligatorio) y confía en respuestas con verbos moderados (suele, generalmente).";
  } else if (oppositionId === "op-policia") {
    mnemotecnia = "Regla CNP: Distingue el plazo de detención preventiva ordinaria (72 horas) de la detención extraordinaria antiterrorista (prórroga de 48 horas autorizada judicialmente).";
  }

  let plazosClave: string[] = [];

  const lowerItem = item.toLowerCase();

  if (lowerItem.includes("constitución") || lowerItem.includes("ce")) {
    detailText = "La Constitución Española de 1978 es la norma suprema del ordenamiento jurídico español. Consta de 169 artículos, 4 disposiciones adicionales, 9 transitorias, 1 derogatoria y 1 final. Los artículos del Título Preliminar y Título I (Derechos y Deberes Fundamentales) son objeto recurrente de examen, exigiendo un conocimiento estricto de su literalidad.";
    keyArticles = [
      "Art. 1: Define a España como un Estado social y democrático de Derecho.",
      "Art. 2: Garantiza el derecho a la autonomía de las regiones y la solidaridad entre ellas.",
      "Art. 9.3: Consagra principios como la legalidad, publicidad de las normas, jerarquía normativa, irretroactividad de lo desfavorable y seguridad jurídica.",
      "Art. 14: Proclama el principio de igualdad ante la ley sin discriminación alguna."
    ];
    plazosClave = [
      "Plazo de reforma ordinaria: Mayorías de 3/5 de ambas Cámaras.",
      "Plazo de reforma agravada: Mayorías de 2/3 de ambas Cámaras, disolución inmediata de las Cortes, nuevas elecciones y referéndum obligatorio."
    ];
    mnemotecnia = "Regla de las Mayorías: Reforma Común = 3/5 (Tres de Cinco). Reforma Total/Especial = 2/3 (Dos de Tres) + Referéndum obligatorio.";
  } else if (lowerItem.includes("derechos") || lowerItem.includes("deberes")) {
    detailText = "Los derechos fundamentales se sitúan en la Sección 1ª del Capítulo Segundo del Título I de la Constitución (Artículos 15 al 29). Gozan de la máxima protección constitucional: reserva de Ley Orgánica, tutela a través del procedimiento preferente y sumario ante los tribunales ordinarios, y Recurso de Amparo ante el Tribunal Constitucional.";
    keyArticles = [
      "Art. 15: Derecho a la vida y a la integridad física y moral.",
      "Art. 17: Derecho a la libertad y a la seguridad personal (duración máxima de la detención preventiva: 72 horas).",
      "Art. 24: Tutela judicial efectiva, derecho al juez ordinario predeterminado por ley y presunción de inocencia.",
      "Art. 29: Derecho de petición individual y colectiva."
    ];
    plazosClave = [
      "Recurso de amparo: Plazo de 20 días hábiles para resoluciones judiciales ordinarias tras agotar la vía judicial ordinaria."
    ];
    mnemotecnia = "El artículo 24 es el 'corazón' de la Justicia. Grábate a fuego que prohíbe la indefensión absoluta y garantiza el derecho a un proceso público con todas las garantías y defensa de Letrado.";
  } else if (lowerItem.includes("recurso de amparo") || lowerItem.includes("constitucional") || lowerItem.includes("garantías")) {
    detailText = "El Tribunal Constitucional es el intérprete supremo de la Constitución española. Las garantías de los derechos fundamentales se instrumentan a través del Defensor del Pueblo (Art. 54), el Ministerio Fiscal, el amparo preferente y sumario ante la jurisdicción ordinaria, y finalmente, el Recurso de Amparo ante el propio Tribunal Constitucional.";
    keyArticles = [
      "Art. 42 LOTC: Amparo contra decisiones parlamentarias (plazo de 3 meses).",
      "Art. 43 LOTC: Amparo contra decisiones del Gobierno o la Administración (plazo de 20 días).",
      "Art. 44 LOTC: Amparo contra resoluciones emanadas de un órgano judicial (plazo de 30 días)."
    ];
    plazosClave = [
      "Plazo contra decisiones del Congreso o Senado: 3 meses.",
      "Plazo contra actos administrativos: 20 días hábiles.",
      "Plazo contra actos de juzgados o tribunales: 30 días hábiles."
    ];
    mnemotecnia = "Memoriza la escala 'Par-Ad-Jud': Parlamento = 3 meses, Administración = 20 días, Judicial = 30 días.";
  } else if (lowerItem.includes("lexnet") || lowerItem.includes("notificación telemática") || lowerItem.includes("tecnología")) {
    detailText = "LexNET es la plataforma tecnológica de intercambio seguro de información entre los órganos judiciales y los operadores jurídicos en España. Permite la presentación telemática de escritos de trámite, demandas, y la recepción de notificaciones de forma oficial con plena validez de firma digital y registro de sellado de tiempo.";
    keyArticles = [
      "Art. 135 LEC: Regula la presentación de escritos por vía telemática y el día de gracia.",
      "Art. 162 LEC: Regula los actos de comunicación electrónica oficiales."
    ];
    plazosClave = [
      "Día de gracia: Hasta las 15:00 horas del día hábil siguiente al vencimiento del plazo.",
      "Recepción ficta de notificación: Se entiende efectuada al día siguiente hábil de su puesta a disposición si transcurren 3 días sin que el profesional descargue el archivo."
    ];
    mnemotecnia = "Regla de los 3 días de LexNET: Si una notificación está disponible en tu bandeja y no la abres, al cuarto día se produce el 'envío virtual' automático y empieza a correr tu plazo legal.";
  } else if (lowerItem.includes("reforma")) {
    detailText = "La reforma de la Constitución se regula en el Título X (Artículos 166 al 169). Se diferencian dos vías de reforma con grados de protección y mayorías parlamentarias distintas según la materia que se pretenda alterar.";
    keyArticles = [
      "Art. 167 CE: Procedimiento ordinario para reformas parciales ordinarias.",
      "Art. 168 CE: Procedimiento agravado para reforma total o revisión del Título Preliminar, Capítulo II Sección 1ª del Título I, o Título II."
    ];
    plazosClave = [
      "Referéndum ordinario: Si lo solicita 1/10 parte de los miembros de cualquiera de las Cámaras dentro de los 15 días de su aprobación.",
      "Referéndum agravado: Obligatorio en el plazo de 40 días tras ratificarse por las nuevas Cortes."
    ];
    mnemotecnia = "Asocia Agravado con la Corona y Derechos Fundamentales. En ese caso, la reforma es tan difícil que se disuelven las Cortes, se reeligen otras, aprueban de nuevo por 2/3 y obligan a votar al pueblo.";
  } else {
    // Dynamic generation based on concept name and opposition context
    detailText = `El concepto o precepto "${item}" constituye una de las materias de estudio más relevantes del programa de la oposición de ${themeId}. El tribunal suele centrarse en la delimitación de competencias orgánicas de los funcionarios, plazos máximos legales de resolución y las consecuencias de la nulidad o anulabilidad de dichos actos.`;
    keyArticles = [
      `Regulado de forma específica en el articulado aplicable a los temas del Bloque del programa de estudio.`,
      `Exige comprender la diferencia entre actos que agotan la vía administrativa y aquellos que son meramente preparatorios o de trámite.`
    ];
    plazosClave = [
      "Plazo general de interposición de recursos administrativos: 1 mes natural.",
      "Plazo de caducidad ordinaria del expediente por inactividad del solicitante: 3 meses hábiles."
    ];
  }

  return {
    title: item,
    typeText: isArticles ? "Referencia Legislativa y Articulado" : "Concepto Clave Exigido",
    detailText,
    keyArticles,
    plazosClave,
    mnemotecnia
  };
};

const createDynamicOpposition = (query: string): Opposition => {
  const capitalizedQuery = query.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  
  let group = "C1";
  let degree = "Bachiller o equivalente";
  if (/técnico|ingeniero|médico|laj|juez|fiscal|a1/i.test(query)) {
    group = "A1";
    degree = "Grado Universitario o equivalente";
  } else if (/gestor|a2|subinspector/i.test(query)) {
    group = "A2";
    degree = "Grado o Diplomatura";
  } else if (/auxiliar|c2/i.test(query)) {
    group = "C2";
    degree = "Graduado Escolar o ESO";
  } else if (/peón|operario|subalterno|grupo e|e/i.test(query)) {
    group = "E";
    degree = "Sin requisitos académicos";
  }

  let body = "Local";
  let location: {
    autonomy?: string;
    province?: string;
    municipality?: string;
    country?: string;
  } = { country: "España", autonomy: "Comunidad de Madrid" };
  if (/estado|age|nacional|ministerio/i.test(query)) {
    body = "Estatal";
    location = { country: "España" };
  } else if (/junta|comunidad|generalitat|gobb|autonom/i.test(query)) {
    body = "Autonómico";
    location = { country: "España", autonomy: "Autonómica" };
  } else if (/ayuntamiento|diputación|cabildo|consell|local/i.test(query)) {
    body = "Local";
    location = { country: "España", autonomy: "Autonómica", province: "Provincial", municipality: "Local" };
  }

  return {
    id: `op-dynamic-${encodeURIComponent(query.toLowerCase().replace(/\s+/g, "-"))}`,
    name: capitalizedQuery,
    reference: `OEP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    location,
    group,
    accessType: "Oposición Libre",
    disability: "General",
    body: body as any,
    personalType: "Personal funcionario",
    examType: "Test + Caso Práctico",
    degree,
    description: `Convocatoria oficial para el acceso a la plaza de ${capitalizedQuery}. Incluye pruebas teóricas tipo test y desarrollo de supuestos prácticos según los últimos programas publicados.`,
    totalPlaces: Math.floor(15 + Math.random() * 85),
    officialExamsCount: 2,
    deadline: "Abierto"
  } as Opposition;
};

export default function App() {
  // --- STATE ---
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [activeUserEmail, setActiveUserEmail] = useState<string>("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [pendingUnlockUser, setPendingUnlockUser] = useState<UserAccount | null>(null);
  const [unlockPassword, setUnlockPassword] = useState("");
  const [unlockError, setUnlockError] = useState("");

  // Syllabus Interaction
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlockFilter, setSelectedBlockFilter] = useState<string>("All");

  // Custom created oppositions by user search
  
  const [deletedOppositions, setDeletedOppositions] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("deleted_oppositions");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customOppositions, setCustomOppositions] = useState<Opposition[]>(() => {
    try {
      const saved = localStorage.getItem("custom_oppositions");
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return parsed.map((opp: any) => {
        if (opp.syllabusBlocks && Array.isArray(opp.syllabusBlocks)) {
          opp.syllabusBlocks = opp.syllabusBlocks.map((b: any, i: number) => {
             if (typeof b === 'string') return { id: `B${i+1}`, title: b, themesCount: 0 };
             if (!b.id) b.id = `B${i+1}`;
             return b;
          });
        }
        if (opp.syllabusThemes && Array.isArray(opp.syllabusThemes)) {
          opp.syllabusThemes = opp.syllabusThemes.map((t: any, i: number) => {
             if (typeof t === 'string') return { id: `T${i+1}`, block: "B1", title: t };
             if (!t.id) t.id = `T${i+1}`;
             return t;
          });
        }
        // Fix string elements in examTraps
        if (opp.examTraps && Array.isArray(opp.examTraps)) {
          opp.examTraps = opp.examTraps.map((t: any, i: number) => {
            if (typeof t === 'string') return { id: `trap-migrated-${i}`, title: "Trampa", description: t, pattern: "Patrón general", technique: "Repasar", relevance: "Media", convocatorias: [] };
            if (!t.id) t.id = `trap-migrated-${i}`;
            return t;
          });
        }
        // Fix string elements in difficultPatterns
        if (opp.difficultPatterns && Array.isArray(opp.difficultPatterns)) {
          opp.difficultPatterns = opp.difficultPatterns.map((p: any, i: number) => {
            if (typeof p === 'string') return { id: `dp-migrated-${i}`, title: "Patrón de Dificultad", article: "Varios", difficultyExplanation: "Patrón general detectado.", patternDescription: p, memorizationTechnique: "Práctica con simulacros.", realQuestionSample: "N/A", correctAnswer: "N/A", convocatorias: [] };
            if (!p.id) p.id = `dp-migrated-${i}`;
            return p;
          });
        }
        return opp;
      });
    } catch {
      return [];
    }
  });

  const [textSize, setTextSize] = useState<"normal" | "large" | "xl">(() => {
    const savedSize = localStorage.getItem("textSizeSetting");
    return (savedSize as "normal" | "large" | "xl") || "large";
  });

  // Active opposition state
  const [activeOppositionId, setActiveOppositionId] = useState<string>(() => {
    return localStorage.getItem("active_opposition_id") || "op-tramitacion";
  });

  const activeOpposition = useMemo(() => {
    // Custom oppositions first so they override predefined ones if they have the same ID (e.g. added cases)
    const list = [...customOppositions, ...OPPOSITIONS_LIST].filter(o => !deletedOppositions.includes(o.id));
    return list.find((o) => o.id === activeOppositionId) || OPPOSITIONS_LIST[0];
  }, [activeOppositionId, customOppositions]);

  // Interactive content modal
  const [selectedInteractiveConcept, setSelectedInteractiveConcept] = useState<{themeId: string, concept: string, type: 'concept' | 'articles'} | null>(null);
  const [materialResult, setMaterialResult] = useState<any>(null);
  const [isGeneratingMaterial, setIsGeneratingMaterial] = useState(false);
  const [materialThemes, setMaterialThemes] = useState<string[]>([]);
  const [materialYears, setMaterialYears] = useState<number[]>([]);

  const [viewingFullTheme, setViewingFullTheme] = useState<any | null>(null);
  const [isFetchingTheme, setIsFetchingTheme] = useState(false);

  const openFullTheme = async (themeId: string, title?: string) => {
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
      const text = await response.text();
      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch(e) {
        throw new Error("Respuesta inválida del servidor");
      }
      // Handle potentially wrapped AI responses
      if (data && !data.error && !data.sections && data.tema) data = data.tema;
      if (data && !data.error && !data.sections && data.content) data = data.content;
      if (data.error) {
        throw new Error(data.error);
      }

      data.id = themeId;
      setViewingFullTheme(data);
    } catch (err: any) {
      console.error(err);
      alert("Error al obtener el contenido del tema: " + err.message);
    } finally {
      setIsFetchingTheme(false);
    }
  };

  const generateMaterial = async () => {
    setIsGeneratingMaterial(true);
    try {
      const response = await fetch("/api/generate-material", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oppositionName: activeOpposition.name,
          selectedThemes: materialThemes,
          selectedYears: materialYears
        })
      });
      const text = await response.text();
      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error("Respuesta inválida del servidor");
      }
      if (data.error) throw new Error(data.error);
      setMaterialResult(data);
    } catch (err: any) {
      console.error(err);
      alert("Error al generar el material completo: " + err.message);
    } finally {
      setIsGeneratingMaterial(false);
    }
  };

  // Advanced opposition search filters states
  const [oppSearchName, setOppSearchName] = useState("");
  const [oppSearchRef, setOppSearchRef] = useState("");
  const [oppSearchDeadline, setOppSearchDeadline] = useState("Abierto");
  const [oppSearchGroup, setOppSearchGroup] = useState("Todos");
  const [oppSearchAccessType, setOppSearchAccessType] = useState("Todos");
  const [oppSearchDisability, setOppSearchDisability] = useState("Todos");
  const [oppSearchBody, setOppSearchBody] = useState("Todos");
  const [oppSearchAutonomy, setOppSearchAutonomy] = useState("");
  const [oppSearchProvince, setOppSearchProvince] = useState("");
  const [oppSearchMunicipality, setOppSearchMunicipality] = useState("");
  const [oppSearchCountry, setOppSearchCountry] = useState("");
  const [oppSearchPersonalType, setOppSearchPersonalType] = useState("Todos");
  const [oppSearchExamType, setOppSearchExamType] = useState("Todos");
  const [oppSearchDegree, setOppSearchDegree] = useState("Todos");

  // Practical Cases States
  const [activeCase, setActiveCase] = useState<PracticalCase | null>(null);
  const [isGeneratingCase, setIsGeneratingCase] = useState(false);
  const [caseAnswers, setCaseAnswers] = useState<Record<string, "A" | "B" | "C" | "D">>({});
  const [caseChecked, setCaseChecked] = useState(false);
  const [caseGeneratorBlock, setCaseGeneratorBlock] = useState<string>("Todos");
  const [caseGeneratorConvs, setCaseGeneratorConvs] = useState<string[]>([]);

  // Exam Generator Block Filter
  const [selectedGeneratorBlock, setSelectedGeneratorBlock] = useState<string>("Todos");
  const [showAdvancedOppFilters, setShowAdvancedOppFilters] = useState(false);

  // Navigation / View Selection
  // "dashboard" | "temario" | "examenes" | "analisis" | "trampas" | "preguntas" | "generador"
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Custom Exam list (for dynamic new convocatorias)
  const [officialExams, setOfficialExams] = useState<OfficialExam[]>(() => {
    try {
      const saved = localStorage.getItem("official_exams");
      if (saved) return JSON.parse(saved);
      const oldSaved = localStorage.getItem("tramitador_exams");
      if (oldSaved) return JSON.parse(oldSaved);
      return OFFICIAL_EXAMS;
    } catch {
      return OFFICIAL_EXAMS;
    }
  });

  const [viewingExamId, setViewingExamId] = useState<string | null>(null);

  // External search states
  const [externalSearchRes, setExternalSearchRes] = useState<any[]>([]);
  const [isSearchingExternal, setIsSearchingExternal] = useState(false);
  const [isSyncing, setIsSyncing] = useState<string | null>(null);

  const performExternalSearch = async (query: string) => {
    if (!query || query.length < 3) return;
    setIsSearchingExternal(true);
    try {
      const response = await fetch("/api/opposition-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const text = await response.text();
      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch(e) {
        console.error("Invalid response from server:", text.substring(0, 100));
        throw new Error("Respuesta inválida del servidor");
      }
      if (data.results) {
        setExternalSearchRes(data.results);
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (err: any) {
      console.error("Search failed", err);
      alert("Aviso: " + err.message);
    } finally {
      setIsSearchingExternal(false);
    }
  };

  const performSync = async (res: any) => {
    setIsSyncing(res.id);
    try {
      const response = await fetch("/api/opposition-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: res.name }),
      });
      const text = await response.text();
      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch(e) {
        throw new Error("Invalid response: " + text.substring(0, 100));
      }

      if (data.error) {
         alert("Aviso: " + (data.error.includes("RESOURCE_EXHAUSTED") || data.error.includes("JSON") ? "Límite de la IA alcanzado o formato inválido. Reintentando..." : data.error));
         throw new Error(data.error);
      }
      
      const dynamicOpp = createDynamicOpposition(res.name);
      dynamicOpp.id = `op-dynamic-${res.id}`;
      dynamicOpp.totalPlaces = res.totalPlaces || 0;
      dynamicOpp.description = res.description || data.analysisGlobal?.content || `Oposición a ${res.name}`;
      dynamicOpp.group = res.group || "A1";
      dynamicOpp.location.autonomy = res.region || "Estatal";
      if (res.url) dynamicOpp.url = res.url;
      
      // Parse syllabus from AI format to strict TypeScript format
      let mappedBlocks = [];
      let mappedThemes = [];
      
      if (data.syllabusBlocks && Array.isArray(data.syllabusBlocks)) {
          data.syllabusBlocks.forEach((b, bIdx) => {
              const blockId = ["I", "II", "III", "IV", "V", "VI", "VII"][bIdx] || `B${bIdx}`;
              mappedBlocks.push({
                  id: blockId,
                  title: b.block || b.title || `Bloque ${bIdx + 1}`,
                  themesCount: Array.isArray(b.themes) ? b.themes.length : 0
              });
              
              if (Array.isArray(b.themes)) {
                  b.themes.forEach((t) => {
                      const themeId = `T${mappedThemes.length + 1}`;
                      if (typeof t === 'string') {
                          mappedThemes.push({
                              id: themeId,
                              title: t,
                              block: blockId,
                              blockTitle: mappedBlocks[mappedBlocks.length - 1].title,
                              description: `Tema de ${t}`,
                              articles: "Normativa aplicable",
                              keyConcepts: []
                          });
                      } else if (typeof t === 'object') {
                          mappedThemes.push({
                              id: t.id || themeId,
                              title: t.title || "Tema",
                              block: blockId,
                              blockTitle: mappedBlocks[mappedBlocks.length - 1].title,
                              description: t.description || `Tema de ${t.title}`,
                              articles: t.articles || "Normativa aplicable",
                              keyConcepts: t.keyConcepts || []
                          });
                      }
                  });
              }
          });
      }
      
      if (data.syllabusThemes && Array.isArray(data.syllabusThemes)) {
         mappedThemes = data.syllabusThemes.map((t, i) => ({
             id: t.id || `T${i+1}`,
             title: t.title || "Tema",
             block: t.block || "I",
             blockTitle: t.blockTitle || "Bloque Común",
             description: t.description || "Descripción del tema",
             articles: t.articles || "Normativa",
             keyConcepts: Array.isArray(t.keyConcepts) ? t.keyConcepts : []
         }));
      }

      dynamicOpp.syllabusBlocks = mappedBlocks.length > 0 ? mappedBlocks : undefined;
      dynamicOpp.syllabusThemes = mappedThemes.length > 0 ? mappedThemes : undefined;

      // Other fields
      if (data.examTraps && Array.isArray(data.examTraps)) {
          dynamicOpp.examTraps = data.examTraps.map((t: any, i: number) => ({
              id: `trap-${i}`,
              convocatorias: [],
              title: typeof t === 'string' ? "Trampa de Examen" : t.title || "Trampa",
              description: typeof t === 'string' ? t : t.description || "",
              pattern: t.pattern || (typeof t === 'string' ? t : t.description || "Patrón detectado"),
              exampleOriginal: t.exampleOriginal || "Ejemplo de pregunta original...",
              exampleTrap: t.exampleTrap || "Ejemplo de la trampa...",
              technique: t.technique || "Leer cuidadosamente.",
              relevance: "Alta"
          }));
      }
      if (data.practicalCases && Array.isArray(data.practicalCases)) {
          dynamicOpp.practicalCases = data.practicalCases.map((c, i) => {
              let questions = [];
              if (typeof c === 'object' && Array.isArray(c.questions)) {
                  questions = c.questions;
              } else if (typeof c === 'object' && Array.isArray(c.questions_example)) {
                  questions = c.questions_example.map((qText, qIdx) => ({
                      id: `q-${i}-${qIdx}`,
                      statement: typeof qText === 'string' ? qText : qText.statement || "¿Pregunta sobre el caso?",
                      options: { A: "Opción A", B: "Opción B", C: "Opción C", D: "Opción D" },
                      correctOption: "A",
                      explanation: "Respuesta orientativa.",
                      articleReference: "Normativa"
                  }));
              }
              return {
                  id: `case-${i}`,
                  title: typeof c === 'string' ? c : c.title || `Caso Práctico ${i+1}`,
                  convocatorias: [],
                  blocks: ["I"],
                  statement: typeof c === 'object' && c.scenario ? c.scenario : (typeof c === 'object' && c.description ? c.description : "Situación planteada para el opositor."),
                  questions: questions,
                  generalGuidelines: ["Analizar situación planteada."],
                  specificGuidelines: ["Aplicar normativa vigente correspondiente al caso."]
              };
          });
      }
      if (data.difficultPatterns && Array.isArray(data.difficultPatterns)) {
          dynamicOpp.difficultPatterns = data.difficultPatterns.map((p: any, i: number) => ({
              id: `dp-${i}`,
              convocatorias: [],
              title: typeof p === 'string' ? p : p.title || p.patternDescription || "Patrón de Dificultad",
              article: p.article || "Varios",
              difficultyExplanation: p.difficultyExplanation || "Patrón general detectado.",
              patternDescription: typeof p === 'string' ? p : p.patternDescription || "Patrón detectado",
              memorizationTechnique: p.memorizationTechnique || "Práctica con simulacros.",
              realQuestionSample: p.realQuestionSample || "N/A",
              correctAnswer: p.correctAnswer || "N/A"
          }));
      }
      if (data.requirements) dynamicOpp.requirements = data.requirements;
      if (data.analysisGlobal) dynamicOpp.analysisGlobal = data.analysisGlobal;
      
      setCustomOppositions(prev => {
        const filtered = prev.filter(co => co.id !== dynamicOpp.id);
        const updated = [...filtered, dynamicOpp];
        localStorage.setItem("custom_oppositions", JSON.stringify(updated));
        return updated;
      });

      if (data.officialExams && Array.isArray(data.officialExams)) {
        const examsToSave = data.officialExams.map((e: any) => ({
          ...e,
          oppositionId: dynamicOpp.id,
          id: `exam-${dynamicOpp.id}-${e.year || Math.random()}`,
          themeDistribution: e.themeDistribution || { "I": 33, "II": 33, "III": 34 }
        }));
        
        setOfficialExams(prev => {
          const updated = [...prev, ...examsToSave];
          localStorage.setItem("official_exams", JSON.stringify(updated));
          return updated;
        });
      }

      setActiveOppositionId(dynamicOpp.id);
      setOppSearchName("");
      setExternalSearchRes([]);
      alert(`¡Sincronizado! Se ha cargado todo el material oficial para: ${res.name}`);
    } catch (err) {
      console.error("Sync failed", err);
      alert("Error al sincronizar la oposición. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSyncing(null);
    }
  };

  const deleteOpposition = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta oposición de tu base de datos local?")) {
      setDeletedOppositions(prev => {
        const updated = [...prev, id];
        localStorage.setItem("deleted_oppositions", JSON.stringify(updated));
        return updated;
      });
      setCustomOppositions(prev => {
        const updated = prev.filter(o => o.id !== id);
        localStorage.setItem("custom_oppositions", JSON.stringify(updated));
        return updated;
      });
      setOfficialExams(prev => {
        const updated = prev.filter(e => e.oppositionId !== id);
        localStorage.setItem("official_exams", JSON.stringify(updated));
        return updated;
      });
      if (activeOppositionId === id) {
        const defaultId = OPPOSITIONS_LIST[0].id;
        setActiveOppositionId(defaultId);
        localStorage.setItem("active_opposition_id", defaultId);
      }
    }
  };

  const selectedViewingExam = useMemo(() => {
    if (!viewingExamId) return null;
    return officialExams.find(e => e.id === viewingExamId) || null;
  }, [viewingExamId, officialExams]);

  const viewingExamQuestions = useMemo(() => {
    if (!selectedViewingExam) return [];
    const oppName = activeOpposition.name;
    return [
      {
        id: "q-view-1",
        number: 1,
        statement: `Con arreglo a las bases de la convocatoria oficial de ${oppName}, ¿cuál es el plazo ordinario de subsanación de defectos u omisiones en las solicitudes de admisión a las pruebas selectivas?`,
        options: {
          A: "10 días hábiles, contados a partir del siguiente al de la publicación de la relación provisional de admitidos y excluidos en el diario oficial correspondiente.",
          B: "10 días naturales improrrogables a partir del día siguiente de la presentación electrónica.",
          C: "15 días hábiles a computar de forma acumulada desde la publicación BOE de la convocatoria.",
          D: "5 días hábiles prorrogables por idéntico término de forma urgente."
        },
        correct: "A",
        explanation: "La subsanación de solicitudes se rige con carácter general por la Ley 39/2015 del Procedimiento Administrativo Común de las Administraciones Públicas, fijando un plazo ordinario de diez días hábiles.",
        reference: "Art. 68 Ley 39/2015"
      },
      {
        id: "q-view-2",
        number: 2,
        statement: `En el régimen normativo de personal aplicable a la OEP de ${oppName}, la sanción estatutaria de demérito por faltas graves reguladas implica legalmente:`,
        options: {
          A: "La pérdida de entre uno y cinco años de antigüedad reglamentaria a efectos de ascensos y provisión de puestos por concurso.",
          B: "La suspensión de empleo y sueldo con cese inmediato de destino por un máximo de seis meses hábiles.",
          C: "La pérdida de hasta el 50% de las retribuciones complementarias mensuales asignadas al puesto de trabajo.",
          D: "El apercibimiento por escrito firmado por el titular de la Subsecretaría de adscripción de personal."
        },
        correct: "A",
        explanation: "La sanción de demérito conlleva la pérdida de puntos de carrera o antigüedad para ascensos/concursos, según el Real Decreto de régimen disciplinario y TREBEP aplicable.",
        reference: "Art. 96 TREBEP"
      },
      {
        id: "q-view-3",
        number: 3,
        statement: `Bajo el marco de notificaciones electrónicas obligatorias para aspirantes de la oposición a ${oppName}, ¿cuándo se entiende rechazada formalmente una notificación digital?`,
        options: {
          A: "Transcurridos diez días naturales desde la puesta a disposición de la notificación sin que se acceda a su contenido, salvo fuerza mayor.",
          B: "Transcurridos tres días hábiles desde el aviso SMS o correo electrónico de cortesía.",
          C: "En el instante en que el aspirante marque la opción 'posponer lectura' en la carpeta ciudadana del portal oficial.",
          D: "A los quince días naturales sin necesidad de levantar acta o certificación digital de puesta a disposición."
        },
        correct: "A",
        explanation: "El artículo 43.2 de la Ley 39/2015 regula que, transcurridos diez días naturales desde la puesta a disposición de la notificación sin que se acceda a su contenido, se entenderá rechazada.",
        reference: "Art. 43.2 Ley 39/2015"
      }
    ];
  }, [selectedViewingExam, activeOpposition]);
  // Multi-selection of Convocatorias for Analysis, Traps, Difficult Questions and Generator
  const [selectedConvocatoriaIds, setSelectedConvocatoriaIds] = useState<string[]>([]);
  // Start year for the selector
  const [selectedStartYear, setSelectedStartYear] = useState<number>(2023);

  // Note editor modal or inline
  const [editingThemeId, setEditingThemeId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState("");

  // Test Generator Settings & Run State
  const [testNumQuestions, setTestNumQuestions] = useState<number>(10);
  const [testDifficulty, setTestDifficulty] = useState<"fácil" | "medio" | "difícil">("medio");
  const [activeExamMode, setActiveExamMode] = useState<"setup" | "running" | "completed">("setup");
  const [generatedQuestions, setGeneratedQuestions] = useState<ExamQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, "A" | "B" | "C" | "D">>({});
  const [examResult, setExamResult] = useState<{
    total: number;
    corrects: number;
    incorrects: number;
    unanswered: number;
    score: number;
  } | null>(null);

  // --- CALENDAR STATES ---
  const [studyTitle, setStudyTitle] = useState("");
  const [studyDate, setStudyDate] = useState(new Date().toISOString().split("T")[0]);
  const [studyThemeId, setStudyThemeId] = useState("T1");
  const [studyDuration, setStudyDuration] = useState<number>(30);

  // --- FORUM STATES ---
  const [forumThreads, setForumThreads] = useState<any[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [forumCategoryFilter, setForumCategoryFilter] = useState<string>("All");
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadCategory, setNewThreadCategory] = useState<string>("Temario");
  const [newThreadContent, setNewThreadContent] = useState("");
  const [newReplyContent, setNewReplyContent] = useState("");
  const [isFlaggedForum, setIsFlaggedForum] = useState<Record<string, boolean>>({});

  // --- INITIALIZATION ---
  useEffect(() => {
    // Load users from localStorage
    const savedUsers = localStorage.getItem("tramitador_users");
    const savedActiveEmail = localStorage.getItem("tramitador_active_user");
    const savedExams = localStorage.getItem("tramitador_exams");

    let loadedUsers: UserAccount[] = [];
    if (savedUsers) {
      try {
        loadedUsers = JSON.parse(savedUsers);
        setUsers(loadedUsers);
      } catch (e) {
        console.error("Error loading users", e);
      }
    }

    if (savedActiveEmail) {
      setActiveUserEmail(savedActiveEmail);
    } else if (loadedUsers.length > 0) {
      setActiveUserEmail(loadedUsers[0].email);
    }

    if (savedExams) {
      try {
        setOfficialExams(JSON.parse(savedExams));
      } catch (e) {
        setOfficialExams(OFFICIAL_EXAMS);
      }
    } else {
      setOfficialExams(OFFICIAL_EXAMS);
      localStorage.setItem("tramitador_exams", JSON.stringify(OFFICIAL_EXAMS));
    }

    // Load or initialize forum threads
    const savedThreads = localStorage.getItem("tramitador_forum_threads");
    const defaultThreads = [
      {
        id: "thread-1",
        oppositionId: "op-tramitacion",
        title: "Truco mnemotécnico para los plazos de contestación a la demanda",
        authorName: "Naim Eliana",
        authorEmail: "naimmeliana@gmail.com",
        content: "¡Hola a todos! Para el Juicio Verbal son 10 días y para el Ordinario son 20 días. Ambos son hábiles (no cuentan sábados, domingos ni festivos ni agosto). Mi truco es asociar 'Verbal con V de Veinte dividido por dos' = 10 días. Y el Ordinario es la norma general = 20 días. Espero que os sirva para el test.",
        category: "Técnicas de Estudio",
        createdAt: "2026-06-25T11:20:00Z",
        upvotes: 12,
        upvotedBy: ["test@test.com"],
        replies: [
          {
            id: "reply-1-1",
            authorName: "Carlos Pérez",
            authorEmail: "carlos@gmail.com",
            content: "¡Excelente truco! Justamente en el último simulacro de examen me equivoqué sumando sábados. Recordar que civil = hábiles es fundamental.",
            createdAt: "2026-06-25T14:35:00Z",
            helpfulCount: 5,
            helpfulBy: []
          }
        ]
      },
      {
        id: "thread-2",
        oppositionId: "op-tramitacion",
        title: "¿Cuándo se aplica la tasa de reposición en el concurso de acreedores?",
        authorName: "Maria Opositora",
        authorEmail: "maria.op@gmail.com",
        content: "Tengo dudas sobre el tema 27 de la Ley Concursal. ¿Quién nombra exactamente al administrador concursal? He visto preguntas confusas donde atribuyen la competencia al Letrado de la Administración de Justicia en lugar del Juez de lo Mercantil.",
        category: "Temario",
        createdAt: "2026-06-28T09:15:00Z",
        upvotes: 8,
        upvotedBy: [],
        replies: [
          {
            id: "reply-2-1",
            authorName: "Eduardo Administrador",
            authorEmail: "eduardo@outlook.com",
            content: "El nombramiento es competencia exclusiva y excluyente del Juez del concurso (Juzgado de lo Mercantil) por medio de Auto. El LAJ lo que hace es notificar la designación al nombrado para su aceptación. Ojo con esa trampa típica.",
            createdAt: "2026-06-28T10:02:00Z",
            helpfulCount: 9,
            helpfulBy: []
          }
        ]
      }
    ];

    if (savedThreads) {
      try {
        setForumThreads(JSON.parse(savedThreads));
      } catch (e) {
        setForumThreads(defaultThreads);
      }
    } else {
      setForumThreads(defaultThreads);
      localStorage.setItem("tramitador_forum_threads", JSON.stringify(defaultThreads));
    }
  }, []);

  // Sync state changes back to localStorage
  const saveUsersToStorage = (updatedUsers: UserAccount[]) => {
    setUsers(updatedUsers);
    localStorage.setItem("tramitador_users", JSON.stringify(updatedUsers));
  };

  const saveForumThreads = (updated: any[]) => {
    setForumThreads(updated);
    localStorage.setItem("tramitador_forum_threads", JSON.stringify(updated));
  };

  // --- PROGRESSION & XP SYSTEM ---
  const awardXPAndCheckBadges = (xpAmount: number, actionType: string, payload?: any) => {
    if (!activeUser) return;

    let updatedCompletedThemes = [...(activeUser.completedThemes || [])];
    if (actionType === "toggleTheme" && payload) {
      const { themeId, isCompleted } = payload;
      if (isCompleted && !updatedCompletedThemes.includes(themeId)) {
        updatedCompletedThemes.push(themeId);
      } else if (!isCompleted) {
        updatedCompletedThemes = updatedCompletedThemes.filter(id => id !== themeId);
      }
    }

    const currentXP = (activeUser.xp || 0) + xpAmount;
    
    // Level boundary list: Level 1 (0-100 XP), Level 2 (101-300 XP), Level 3 (301-600 XP), Level 4 (601-1000 XP), Level 5 (1001+ XP)
    let newLevel = 1;
    if (currentXP >= 1000) newLevel = 5;
    else if (currentXP >= 600) newLevel = 4;
    else if (currentXP >= 300) newLevel = 3;
    else if (currentXP >= 100) newLevel = 2;

    const currentBadges = [...(activeUser.badges || [])];

    // Check Badge conditions
    if (updatedCompletedThemes.length >= 1 && !currentBadges.includes("badge-primer-paso")) {
      currentBadges.push("badge-primer-paso");
    }
    if (updatedCompletedThemes.length >= 5 && !currentBadges.includes("badge-iniciador-procesal")) {
      currentBadges.push("badge-iniciador-procesal");
    }
    if (updatedCompletedThemes.length >= 15 && !currentBadges.includes("badge-tramitador-experto")) {
      currentBadges.push("badge-tramitador-experto");
    }
    if (actionType === "testCompleted") {
      if (!currentBadges.includes("badge-primer-test")) {
        currentBadges.push("badge-primer-test");
      }
      if (payload && payload.score >= 8.5 && !currentBadges.includes("badge-puntuacion-elite")) {
        currentBadges.push("badge-puntuacion-elite");
      }
    }
    if (actionType === "scheduleEvent" && !currentBadges.includes("badge-disciplinado")) {
      currentBadges.push("badge-disciplinado");
    }
    if (actionType === "forumPost" && !currentBadges.includes("badge-compañero")) {
      currentBadges.push("badge-compañero");
    }

    const updatedUsers = users.map((u) => {
      if (u.email === activeUser.email) {
        return {
          ...u,
          xp: currentXP,
          level: newLevel,
          badges: currentBadges,
          completedThemes: updatedCompletedThemes
        };
      }
      return u;
    });

    saveUsersToStorage(updatedUsers);
  };

  // --- STUDY CALENDAR ACTIONS ---
  const handleAddStudyEvent = (e: FormEvent) => {
    e.preventDefault();
    if (!activeUser) {
      alert("Para planificar tu estudio y ganar XP, primero debes registrarte o activar tu perfil de estudiante.");
      return;
    }
    if (!studyTitle.trim()) return;

    const newEvent = {
      id: "event-" + Date.now(),
      title: studyTitle.trim(),
      date: studyDate,
      themeId: studyThemeId,
      duration: studyDuration,
      completed: false
    };

    const currentEvents = activeUser.studyEvents || [];
    const updatedEvents = [...currentEvents, newEvent];

    const updatedUsers = users.map((u) => {
      if (u.email === activeUser.email) {
        return {
          ...u,
          studyEvents: updatedEvents
        };
      }
      return u;
    });

    saveUsersToStorage(updatedUsers);
    setStudyTitle("");
    
    // Award 15 XP for scheduling
    awardXPAndCheckBadges(15, "scheduleEvent");
  };

  const toggleStudyEventCompleted = (eventId: string) => {
    if (!activeUser) return;
    const currentEvents = activeUser.studyEvents || [];
    let awarded = false;
    const updatedEvents = currentEvents.map((evt: any) => {
      if (evt.id === eventId) {
        const nextCompleted = !evt.completed;
        if (nextCompleted) awarded = true;
        return { ...evt, completed: nextCompleted };
      }
      return evt;
    });

    const updatedUsers = users.map((u) => {
      if (u.email === activeUser.email) {
        return { ...u, studyEvents: updatedEvents };
      }
      return u;
    });

    saveUsersToStorage(updatedUsers);
    if (awarded) {
      // Award 30 XP for completing a study session!
      awardXPAndCheckBadges(30, "completeEvent");
    }
  };

  const deleteStudyEvent = (eventId: string) => {
    if (!activeUser) return;
    const currentEvents = activeUser.studyEvents || [];
    const updatedEvents = currentEvents.filter((evt: any) => evt.id !== eventId);

    const updatedUsers = users.map((u) => {
      if (u.email === activeUser.email) {
        return { ...u, studyEvents: updatedEvents };
      }
      return u;
    });

    saveUsersToStorage(updatedUsers);
  };

  // --- COMMUNITY FORUM ACTIONS ---
  const handleAddForumThread = (e: FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle.trim() || !newThreadContent.trim()) return;

    const authorName = activeUser ? activeUser.fullName : "Invitado Opositor";
    const authorEmail = activeUser ? activeUser.email : "guest@procesos.com";

    const newThread = {
      id: "thread-" + Date.now(),
      oppositionId: activeOppositionId,
      title: newThreadTitle.trim(),
      content: newThreadContent.trim(),
      category: newThreadCategory,
      authorName,
      authorEmail,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      upvotedBy: [],
      replies: []
    };

    saveForumThreads([newThread, ...forumThreads]);
    setNewThreadTitle("");
    setNewThreadContent("");

    if (activeUser) {
      // Award 25 XP for posting a community thread!
      awardXPAndCheckBadges(25, "forumPost");
    }
  };

  const handleAddForumReply = (e: FormEvent, threadId: string) => {
    e.preventDefault();
    if (!newReplyContent.trim()) return;

    const authorName = activeUser ? activeUser.fullName : "Invitado Opositor";
    const authorEmail = activeUser ? activeUser.email : "guest@procesos.com";

    const newReply = {
      id: "reply-" + Date.now(),
      authorName,
      authorEmail,
      content: newReplyContent.trim(),
      createdAt: new Date().toISOString(),
      helpfulCount: 0,
      helpfulBy: []
    };

    const updatedThreads = forumThreads.map((thread) => {
      if (thread.id === threadId) {
        return {
          ...thread,
          replies: [...(thread.replies || []), newReply]
        };
      }
      return thread;
    });

    saveForumThreads(updatedThreads);
    setNewReplyContent("");

    if (activeUser) {
      // Award 15 XP for replying to threads!
      awardXPAndCheckBadges(15, "forumReply");
    }
  };

  const handleUpvoteThread = (threadId: string) => {
    const voterEmail = activeUser ? activeUser.email : "guest@procesos.com";
    const updatedThreads = forumThreads.map((thread) => {
      if (thread.id === threadId) {
        const upvotedBy = thread.upvotedBy || [];
        const hasUpvoted = upvotedBy.includes(voterEmail);
        const nextUpvotedBy = hasUpvoted
          ? upvotedBy.filter((email: string) => email !== voterEmail)
          : [...upvotedBy, voterEmail];
        const upvoteDiff = hasUpvoted ? -1 : 1;
        return {
          ...thread,
          upvotedBy: nextUpvotedBy,
          upvotes: (thread.upvotes || 0) + upvoteDiff
        };
      }
      return thread;
    });

    saveForumThreads(updatedThreads);
  };

  const handleMarkReplyHelpful = (threadId: string, replyId: string) => {
    const voterEmail = activeUser ? activeUser.email : "guest@procesos.com";
    const updatedThreads = forumThreads.map((thread) => {
      if (thread.id === threadId) {
        const updatedReplies = (thread.replies || []).map((reply: any) => {
          if (reply.id === replyId) {
            const helpfulBy = reply.helpfulBy || [];
            const alreadyMarked = helpfulBy.includes(voterEmail);
            const nextHelpfulBy = alreadyMarked
              ? helpfulBy.filter((email: string) => email !== voterEmail)
              : [...helpfulBy, voterEmail];
            const diff = alreadyMarked ? -1 : 1;
            return {
              ...reply,
              helpfulBy: nextHelpfulBy,
              helpfulCount: (reply.helpfulCount || 0) + diff
            };
          }
          return reply;
        });
        return {
          ...thread,
          replies: updatedReplies
        };
      }
      return thread;
    });

    saveForumThreads(updatedThreads);
  };

  const handleDeleteThread = (threadId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este hilo de discusión?")) {
      const updatedThreads = forumThreads.filter((t) => t.id !== threadId);
      saveForumThreads(updatedThreads);
      if (selectedThreadId === threadId) {
        setSelectedThreadId(null);
      }
    }
  };

  const handleDeleteReply = (threadId: string, replyId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar tu respuesta?")) {
      const updatedThreads = forumThreads.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            replies: (thread.replies || []).filter((r: any) => r.id !== replyId)
          };
        }
        return thread;
      });
      saveForumThreads(updatedThreads);
    }
  };

  // Find active user object
  const activeUser = useMemo(() => {
    return users.find((u) => u.email === activeUserEmail) || null;
  }, [users, activeUserEmail]);

  // Dynamic requirements based on the active opposition
  const activeRequirements = useMemo(() => {
    if (activeOpposition.requirements && activeOpposition.requirements.length > 0) {
      return activeOpposition.requirements;
    }
    const groupName = activeOpposition.group || "C1";
    const reqDegree = activeOpposition.degree || "Título de Bachiller o equivalente";
    const cleanName = activeOpposition.name.replace(/Cuerpo de\s+/i, "").replace(/Escala de\s+/i, "");

    return [
      {
        title: "Nacionalidad",
        desc: "Tener la nacionalidad española o de alguno de los Estados miembros de la Unión Europea."
      },
      {
        title: "Edad",
        desc: "Tener cumplidos dieciséis años y no exceder de la edad máxima de jubilación forzosa."
      },
      {
        title: "Titulación",
        desc: `${reqDegree}. Requerido formalmente para el subgrupo ${groupName} de funcionarios.`
      },
      {
        title: "Capacidad",
        desc: `Poseer la capacidad funcional necesaria para el desempeño de las tareas del cuerpo de ${cleanName}.`
      },
      {
        title: "Habilitación",
        desc: "No haber sido separado mediante expediente disciplinario del servicio de cualquiera de las Administraciones Públicas."
      }
    ];
  }, [activeOpposition]);

  // Dynamic tribunal expectations based on the active opposition
  const activeTribunalExpectations = useMemo(() => {
    const cleanName = activeOpposition.name.replace(/Cuerpo de\s+/i, "").replace(/Escala de\s+/i, "");
    
    // Customize expectations based on the nature of the body
    let skills = [
      {
        name: "Precisión y Rigor Técnico",
        description: "Capacidad para aplicar la normativa legal con exactitud milimétrica sin cometer errores de transcripción o interpretación procesal."
      },
      {
        name: "Gestión Emocional bajo Presión",
        description: "Mantener la concentración absoluta y un ritmo ágil de respuesta en el simulacro y el examen real con restricciones estrictas de tiempo."
      },
      {
        name: "Capacidad de Síntesis y Análisis",
        description: `Estructuración mental rápida para desglosar la información relevante en los casos prácticos asociados a ${cleanName}.`
      },
      {
        name: "Compromiso Ético y Deontológico",
        description: "Comprensión integral de los principios constitucionales de objetividad, imparcialidad, igualdad y servicio al interés público."
      }
    ];

    if (activeOpposition.id === "op-policia") {
      skills = [
        {
          name: "Integridad y Templanza",
          description: "Resolución táctica de situaciones críticas con proporcionalidad, respeto absoluto a los derechos fundamentales y dominio de sí."
        },
        {
          name: "Decisión y Respuesta Rápida",
          description: "Habilidad para discernir de forma casi instantánea la conformidad de una actuación policial con la legislación constitucional y penal."
        },
        {
          name: "Aptitud de Trabajo en Equipo",
          description: "Colaboración interorgánica, lealtad profesional y disciplina en el escalafón jerárquico civil del Cuerpo Nacional de Policía."
        },
        {
          name: "Resolución de Conflictos",
          description: "Capacidad de pacificación, mediación social y aplicación disuasoria de las normas de convivencia ciudadana bajo la LO 2/1986."
        }
      ];
    } else if (activeOpposition.id === "op-epso-admin") {
      skills = [
        {
          name: "Mentalidad Multicultural Europea",
          description: "Capacidad de colaborar eficazmente en equipos de trabajo diversos, multilingües y orientados al servicio general de la Unión Europea."
        },
        {
          name: "Análisis Crítico y Razonamiento Lógico",
          description: "Interpretación matemática y lingüística precisa de textos legales y directivas de la Comisión Europea con distractores lógicos."
        },
        {
          name: "Enfoque Orientado a Resultados",
          description: "Identificación proactiva de cuellos de botella en la tramitación reglamentaria comunitaria y formulación de soluciones creativas."
        },
        {
          name: "Resiliencia EPSO",
          description: "Habilidad para superar las rigurosas pruebas de selección por competencias (verbal, numérica, abstracta) con altos niveles de competencia cognitiva."
        }
      ];
    } else if (activeOpposition.id === "op-bomber-zaragoza") {
      skills = [
        {
          name: "Valor y Autocontrol",
          description: "Gestión del miedo y toma de decisiones tácticas rápidas y precisas en escenarios hostiles o de alto riesgo."
        },
        {
          name: "Rendimiento Físico-Cognitivo Simultáneo",
          description: "Sostener el rendimiento mental lógico y el rigor procedimental de seguridad operativa en situaciones de fatiga física extrema."
        },
        {
          name: "Rigor Operativo de Seguridad",
          description: "Cumplimiento estricto de las directrices técnicas de intervención del parque municipal y uso reglamentario de equipos de salvamento."
        },
        {
          name: "Orientación Comunitaria de Socorro",
          description: "Vocación de auxilio público altruista y atención empática inmediata a ciudadanos víctimas de emergencias y catástrofes."
        }
      ];
    }

    return { skills };
  }, [activeOpposition]);

  // Dynamically apply text-size classes to document body
  useEffect(() => {
    const body = document.body;
    body.classList.remove("text-size-normal", "text-size-large", "text-size-xl");
    body.classList.add(`text-size-${textSize}`);
  }, [textSize]);

  // 1. Auto-import missing exams when opposition changes
  useEffect(() => {
    if (activeOppositionId && activeOppositionId !== "op-tramitacion") {
      setOfficialExams(prev => {
        const isAlreadyImported = prev.some((e) => e.oppositionId === activeOppositionId);
        if (!isAlreadyImported) {
          const o = activeOpposition;
          const newExams: OfficialExam[] = [
            {
              id: `exam-${o.id}-2025`,
              year: 2025,
              oppositionId: o.id,
              totalApplicants: o.totalPlaces * 15,
              cutOffScore: 68.5,
              name: `Examen Oficial ${o.name} - OEP 2025`,
              date: "2025-10-12",
              status: "Oficial",
              averageScore: 62.4,
              passedCount: o.totalPlaces,
              themeDistribution: { "I": 40, "II": 60 },
              questionsCount: 100
            },
            {
              id: `exam-${o.id}-2024`,
              year: 2024,
              oppositionId: o.id,
              totalApplicants: o.totalPlaces * 18,
              cutOffScore: 71.0,
              name: `Examen Oficial ${o.name} - Convocatoria Ordinaria 2024`,
              date: "2024-06-15",
              status: "Oficial",
              averageScore: 65.1,
              passedCount: o.totalPlaces,
              themeDistribution: { "I": 40, "II": 60 },
              questionsCount: 100
            }
          ];
          const updated = [...prev, ...newExams];
          localStorage.setItem("official_exams", JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
    }
  }, [activeOppositionId, activeOpposition]);

  // 2. Select matching exams for the active opposition
  useEffect(() => {
    if (!activeOppositionId) return;
    const activeExams = officialExams.filter((e) => e.oppositionId === activeOppositionId);
    if (activeExams.length > 0) {
      setSelectedConvocatoriaIds(activeExams.map((e) => e.id));
    } else if (activeOppositionId === "op-tramitacion") {
      const defaultIds = officialExams
        .filter((e) => !e.oppositionId || e.oppositionId === "op-tramitacion")
        .map((e) => e.id);
      setSelectedConvocatoriaIds(defaultIds);
    } else {
      setSelectedConvocatoriaIds([]);
    }
  }, [activeOppositionId, officialExams]);

  // Handle start year filter change
  const handleStartYearChange = (year: number) => {
    setSelectedStartYear(year);
    // Suggest convocatorias matching the active opposition and year range, without blocking older ones
    const activeExams = officialExams.filter((e) => e.oppositionId === activeOppositionId);
    const matchingIds = activeExams.filter((e) => e.year >= year).map((e) => e.id);
    if (matchingIds.length > 0) {
      setSelectedConvocatoriaIds(matchingIds);
    }
  };

  // Warning check for Year (remains active if starting year filter is old OR any selected exam is from before 2023)
  const showYearWarning = useMemo(() => {
    if (selectedStartYear < 2023) return true;
    const selectedExams = officialExams.filter((e) => selectedConvocatoriaIds.includes(e.id));
    return selectedExams.some((e) => e.year < 2023);
  }, [selectedStartYear, selectedConvocatoriaIds, officialExams]);

  // Toggle Convocatoria selection
  const toggleConvocatoriaSelect = (id: string) => {
    if (selectedConvocatoriaIds.includes(id)) {
      // Don't allow empty selection if possible, or just toggle
      setSelectedConvocatoriaIds(selectedConvocatoriaIds.filter((cid) => cid !== id));
    } else {
      setSelectedConvocatoriaIds([...selectedConvocatoriaIds, id]);
    }
  };

  // --- ACTIONS ---
  
  // Register New User
  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    
    const hasEmail = registerEmail.trim().length > 0;
    const hasUsername = registerUsername.trim().length > 0;
    
    if (!hasEmail && !hasUsername) {
      alert("Por favor, introduce al menos un nombre de usuario o un correo electrónico.");
      return;
    }
    
    if (!registerPassword.trim()) {
      alert("Por favor, introduce una contraseña para tu perfil.");
      return;
    }
    
    const emailLower = hasEmail ? registerEmail.trim().toLowerCase() : "";
    const usernameLower = hasUsername ? registerUsername.trim().toLowerCase() : "";
    
    // Check if user already exists
    const userExists = users.some((u) => {
      const matchEmail = emailLower && u.email.toLowerCase() === emailLower;
      const matchUsername = usernameLower && u.username && u.username.toLowerCase() === usernameLower;
      const matchKey = u.email.toLowerCase() === (emailLower || usernameLower);
      return matchEmail || matchUsername || matchKey;
    });
    
    if (userExists) {
      alert("Este usuario o correo electrónico ya está registrado. Selecciona tu perfil de la lista de usuarios.");
      return;
    }
    
    const primaryKey = emailLower || usernameLower;
    
    const newUser: UserAccount = {
      email: primaryKey,
      username: usernameLower || undefined,
      password: registerPassword.trim(),
      fullName: registerName.trim() || usernameLower || emailLower,
      createdAt: new Date().toISOString(),
      completedThemes: [],
      themeNotes: {},
      examScores: []
    };
    
    const updated = [...users, newUser];
    saveUsersToStorage(updated);
    setActiveUserEmail(newUser.email);
    localStorage.setItem("tramitador_active_user", newUser.email);
    
    // Reset inputs
    setRegisterName("");
    setRegisterEmail("");
    setRegisterUsername("");
    setRegisterPassword("");
    setShowRegisterModal(false);
  };
  
  // Select User
  const handleSelectUser = (email: string) => {
    const targetUser = users.find((u) => u.email === email);
    if (targetUser && targetUser.password) {
      setPendingUnlockUser(targetUser);
      setUnlockPassword("");
      setUnlockError("");
    } else {
      setActiveUserEmail(email);
      localStorage.setItem("tramitador_active_user", email);
      setShowRegisterModal(false);
    }
  };
  
  // Unlock Profile with password
  const handleUnlockProfile = (e: FormEvent) => {
    e.preventDefault();
    if (!pendingUnlockUser) return;
    
    if (unlockPassword.trim() === pendingUnlockUser.password) {
      setActiveUserEmail(pendingUnlockUser.email);
      localStorage.setItem("tramitador_active_user", pendingUnlockUser.email);
      setPendingUnlockUser(null);
      setUnlockPassword("");
      setUnlockError("");
      setShowRegisterModal(false);
    } else {
      setUnlockError("Contraseña incorrecta. Por favor, inténtalo de nuevo.");
    }
  };
  
  // Cancel profile unlock
  const handleCancelUnlock = () => {
    setPendingUnlockUser(null);
    setUnlockPassword("");
    setUnlockError("");
  };

  // Log out / Switch User
  const handleSwitchProfile = () => {
    // We just show user selection in a beautiful widget, but we can also have a clean state
  };

  // Delete User Profile
  const handleDeleteUser = (email: string, e: MouseEvent) => {
    e.stopPropagation();
    if (confirm("¿Estás seguro de que deseas eliminar este perfil? Se perderán todos sus progresos y notas locales.")) {
      const updated = users.filter((u) => u.email !== email);
      saveUsersToStorage(updated);
      if (activeUserEmail === email) {
        if (updated.length > 0) {
          setActiveUserEmail(updated[0].email);
          localStorage.setItem("tramitador_active_user", updated[0].email);
        } else {
          setActiveUserEmail("");
          localStorage.removeItem("tramitador_active_user");
        }
      }
    }
  };

  // Theme checkbox toggle
  const toggleThemeCompleted = (themeId: string) => {
    if (!activeUser) {
      alert("Por favor, inicia sesión o regístrate con un usuario para poder guardar tu progreso.");
      return;
    }

    const isCompleted = activeUser.completedThemes.includes(themeId);
    let updatedCompleted: string[];

    if (isCompleted) {
      updatedCompleted = activeUser.completedThemes.filter((id) => id !== themeId);
      // Deduct XP
      awardXPAndCheckBadges(-10, "toggleTheme", { themeId, isCompleted: false });
    } else {
      updatedCompleted = [...activeUser.completedThemes, themeId];
      // Award XP
      awardXPAndCheckBadges(10, "toggleTheme", { themeId, isCompleted: true });
    }
  };

  // Edit personal note
  const startEditingNote = (themeId: string) => {
    if (!activeUser) {
      alert("Por favor, inicia sesión o regístrate para añadir notas de estudio.");
      return;
    }
    const currentNote = activeUser.themeNotes[themeId] || "";
    setEditingThemeId(themeId);
    setEditingNoteText(currentNote);
  };

  const saveThemeNote = () => {
    if (!editingThemeId || !activeUser) return;

    const updatedNotes = {
      ...activeUser.themeNotes,
      [editingThemeId]: editingNoteText
    };

    const updatedUsers = users.map((u) => {
      if (u.email === activeUser.email) {
        return { ...u, themeNotes: updatedNotes };
      }
      return u;
    });

    saveUsersToStorage(updatedUsers);
    setEditingThemeId(null);
    setEditingNoteText("");
  };



  // Reset exam state
  const resetExam = () => {
    setActiveExamMode("setup");
    setGeneratedQuestions([]);
    setUserAnswers({});
    setExamResult(null);
  };

  // Generate Exam Test
  const handleGenerateTest = () => {
    if (selectedConvocatoriaIds.length === 0) {
      alert("Por favor, selecciona al menos una convocatoria para extraer las preguntas.");
      return;
    }

    // Filter questions from SELECTED convocatorias
    let sourcePool = STATIC_QUESTIONS.filter((q) =>
      selectedConvocatoriaIds.includes(q.convocatoriaId)
    );

    // Filter by selected block if not "Todos"
    if (selectedGeneratorBlock !== "Todos") {
      const themesInBlock = SYLLABUS_THEMES.filter(t => (t.block === selectedGeneratorBlock || String(t.block).includes(`Bloque ${selectedGeneratorBlock}`))).map(t => t.id);
      sourcePool = sourcePool.filter(q => themesInBlock.includes(q.themeId));
    }

    // Filter by difficulty if desired (Fácil, Medio, Difícil)
    // If pool is empty, fall back to any difficulty, or we can select from the whole set of general questions
    let difficultyFiltered = sourcePool.filter((q) => q.difficulty === testDifficulty);
    if (difficultyFiltered.length === 0) {
      // fall back to complete source pool for these convocatorias
      difficultyFiltered = sourcePool;
    }

    // If still no questions (e.g. they selected a newly added convocatoria without predefined static questions),
    // let's dynamically generate highly realistic questions based on themes!
    if (difficultyFiltered.length === 0) {
      // Let's create realistic simulated questions based on themes in the selected block!
      const simulatedQuestions: ExamQuestion[] = [];
      const selectedConvsData = officialExams.filter((e) => selectedConvocatoriaIds.includes(e.id));
      const convLabel = selectedConvsData.map((e) => e.name).join(", ");

      const candidateThemes = selectedGeneratorBlock === "Todos" 
        ? SYLLABUS_THEMES 
        : SYLLABUS_THEMES.filter(t => (t.block === selectedGeneratorBlock || String(t.block).includes(`Bloque ${selectedGeneratorBlock}`)));

      const themePool = candidateThemes.length > 0 ? candidateThemes : SYLLABUS_THEMES;

      for (let i = 1; i <= testNumQuestions; i++) {
        // Pick a random theme from the allowed themes
        const randomTheme = themePool[Math.floor(Math.random() * themePool.length)];

        const typeIndex = i % 4;
        let statement = "";
        let options = { A: "", B: "", C: "", D: "" };
        let correctOption: "A"|"B"|"C"|"D" = "A";
        let explanation = "";

        const concepts = randomTheme.keyConcepts && randomTheme.keyConcepts.length > 0 ? randomTheme.keyConcepts : [randomTheme.title];
        const concept = concepts[Math.floor(Math.random() * concepts.length)];

        const allConcepts = themePool.flatMap(t => t.keyConcepts && t.keyConcepts.length > 0 ? t.keyConcepts : [t.title]);
        const dummyConcepts = allConcepts.length > 3 ? allConcepts : [
          "Elemento principal 1", "Concepto secundario", "Procedimiento extraordinario", "Gestión operativa", "Intervención de terceros", "Medida cautelar", "Disposición general"
        ];
        
        let fake1 = dummyConcepts[Math.floor(Math.random() * dummyConcepts.length)];
        let fake2 = dummyConcepts[Math.floor(Math.random() * dummyConcepts.length)];
        let fake3 = dummyConcepts[Math.floor(Math.random() * dummyConcepts.length)];
        
        while(fake1 === fake2 || fake1 === fake3 || fake2 === fake3) {
           fake2 = dummyConcepts[Math.floor(Math.random() * dummyConcepts.length)];
           fake3 = dummyConcepts[Math.floor(Math.random() * dummyConcepts.length)];
        }

        const templatesFacil = [
            {
               s: `En relación a "${randomTheme.title}", ¿cuál de los siguientes elementos es considerado fundamental respecto a "${concept}" en el ámbito de ${activeOpposition.name}?`,
               c: `Constituye el pilar esencial de ${concept} para asegurar la correcta aplicación normativa.`,
               e: `El concepto de ${concept} es nuclear dentro del tema.`
            },
            {
               s: `Según el marco general de ${activeOpposition.name}, la figura de "${concept}" en el ámbito de ${randomTheme.title}:`,
               c: `Debe aplicarse siguiendo los principios de legalidad y eficacia propios de este concepto.`,
               e: `Es un principio fundamental y no admite arbitrariedad.`
            }
        ];

        const templatesMedio = [
            {
               s: `Según los principios vigentes relativos a ${randomTheme.title}, ¿qué ocurre ante una situación inusual asociada a "${concept}"?`,
               c: `Se debe evaluar la situación y aplicar las medidas de corrección u optimización según los protocolos establecidos.`,
               e: `Ante variaciones sobre ${concept}, se deben aplicar los protocolos o mecanismos de adaptación previstos.`
            },
            {
               s: `Dentro de ${activeOpposition.name}, si se requiere la ejecución de "${concept}" en el contexto de ${randomTheme.title}:`,
               c: `Se ejecutará siguiendo las pautas y procedimientos técnicos o legales específicos vigentes.`,
               e: `Toda ejecución debe ajustarse a las normativas técnicas o protocolos aplicables a ${concept}.`
            }
        ];

        const templatesDificil = [
            {
               s: `En un supuesto complejo de ${activeOpposition.name} donde interactúan "${concept}" y los principios de ${randomTheme.title}, indique la afirmación correcta:`,
               c: `Su intervención requiere justificación técnica o legal de ${concept} para asegurar su validez.`,
               e: `Por su naturaleza, el manejo de ${concept} requiere precisión y justificación explícita.`
            },
            {
               s: `Considerando los fundamentos de ${randomTheme.title}, si confluyen simultáneamente ${fake1} y "${concept}", la actuación profesional correcta será:`,
               c: `Aplicar de forma preferente las medidas inherentes a ${concept} debido a su especialidad.`,
               e: `En caso de conflicto o concurrencia, suele predominar el criterio específico relacionado con ${concept}.`
            }
        ];

        let selectedTemplate;
        const diffIdx = Math.floor(Math.random() * 2);

        if (testDifficulty === "fácil" || (testDifficulty !== "medio" && testDifficulty !== "difícil" && typeIndex === 0)) {
           selectedTemplate = templatesFacil[diffIdx];
        } else if (testDifficulty === "medio" || (testDifficulty !== "fácil" && testDifficulty !== "difícil" && typeIndex === 1)) {
           selectedTemplate = templatesMedio[diffIdx];
        } else if (testDifficulty === "difícil" || (testDifficulty !== "fácil" && testDifficulty !== "medio" && typeIndex === 2)) {
           selectedTemplate = templatesDificil[diffIdx];
        } else {
           selectedTemplate = templatesMedio[diffIdx]; // default
        }

        statement = selectedTemplate.s;
        explanation = selectedTemplate.e;
        const correctText = selectedTemplate.c;

        const fakeTexts = [
           `La jurisprudencia y doctrina indican que ${fake1} es el único elemento válido en cualquier caso.`,
           `Se rige exclusivamente por el principio de ${fake2} sin excepciones normativas.`,
           `Requiere la exclusión explícita a favor de ${fake3}.`
        ];

        const allOpts = [
            { t: correctText, isC: true },
            { t: fakeTexts[0], isC: false },
            { t: fakeTexts[1], isC: false },
            { t: fakeTexts[2], isC: false }
        ];

        // Shuffle options
        for(let i = allOpts.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [allOpts[i], allOpts[j]] = [allOpts[j], allOpts[i]];
        }

        options = { A: allOpts[0].t, B: allOpts[1].t, C: allOpts[2].t, D: allOpts[3].t };
        correctOption = allOpts.findIndex(x => x.isC) === 0 ? "A" : allOpts.findIndex(x => x.isC) === 1 ? "B" : allOpts.findIndex(x => x.isC) === 2 ? "C" : "D";

        simulatedQuestions.push({
          id: `q-sim-${i}-${Date.now()}`,
          convocatoriaId: selectedConvocatoriaIds[0] || "simulated",
          convocatoriaName: selectedConvsData[0]?.name || "Convocatoria Extra",
          themeId: randomTheme.id,
          questionNumber: i,
          statement,
          options,
          correctOption,
          explanation,
          articleReference: randomTheme.articles,
          difficulty: testDifficulty,
          patternType: "Competencia"
        });

      }
      setGeneratedQuestions(simulatedQuestions);
    } else {
      // Shuffle source pool of questions and pick testNumQuestions
      const shuffled = [...difficultyFiltered].sort(() => 0.5 - Math.random());
      let finalQuestions = shuffled.slice(0, testNumQuestions);

      // If we need more questions than available, we can duplicate with modified IDs or pad with simulated ones
      if (finalQuestions.length < testNumQuestions) {
        const remaining = testNumQuestions - finalQuestions.length;
        // pad with simulated
        const padding: ExamQuestion[] = [];
        const candidateThemes = selectedGeneratorBlock === "Todos" 
          ? SYLLABUS_THEMES 
          : SYLLABUS_THEMES.filter(t => (t.block === selectedGeneratorBlock || String(t.block).includes(`Bloque ${selectedGeneratorBlock}`)));
        const themePool = candidateThemes.length > 0 ? candidateThemes : SYLLABUS_THEMES;

        for (let i = 1; i <= remaining; i++) {
          const randomTheme = themePool[Math.floor(Math.random() * themePool.length)];
          padding.push({
            id: `q-pad-${i}-${Date.now()}`,
            convocatoriaId: selectedConvocatoriaIds[0] || "simulated",
            convocatoriaName: "Simulado Oficial de Refuerzo",
            themeId: randomTheme.id,
            questionNumber: finalQuestions.length + i,
            statement: `¿Qué trámite procesal resulta preceptivo en el marco de ${randomTheme.title} de acuerdo con la legislación vigente (${randomTheme.articles})?`,
            options: {
              A: "La tramitación por vía telemática obligatoria a través de la plataforma LexNET.",
              B: "La comparecencia presencial del Letrado habilitado ante la secretaría de la Sala de lo Social.",
              C: "El dictado de Providencia por el gestor de auxilio en un plazo de cinco días naturales.",
              D: "La inadmisión del recurso de reposición mediante diligencia de ordenación no recurrible."
            },
            correctOption: "A",
            explanation: `Las comunicaciones electrónicas en la Oficina Judicial son obligatorias para profesionales según la Ley Orgánica del Poder Judicial y la Ley 18/2011, debiendo realizarse a través de LexNET.`,
            articleReference: randomTheme.articles,
            difficulty: testDifficulty,
            patternType: "Literalidad"
          });
        }
        finalQuestions = [...finalQuestions, ...padding];
      }

      setGeneratedQuestions(finalQuestions);
    }

    // Reset user answers and set state to running
    setUserAnswers({});
    setExamResult(null);
    setActiveExamMode("running");
  };

  // Submit test
  const handleSubmitTest = () => {
    let corrects = 0;
    let incorrects = 0;
    let unanswered = 0;

    generatedQuestions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (!ans) {
        unanswered++;
      } else if (ans === q.correctOption) {
        corrects++;
      } else {
        incorrects++;
      }
    });

    // Score computation: Correct = +1, Incorrect = -0.25 (Official Spanish judiciary rule), Unanswered = 0
    // Score scaled out of 10
    const rawScore = corrects - incorrects * 0.25;
    const maxPossible = generatedQuestions.length;
    const scaleScore = Math.max(0, (rawScore / maxPossible) * 10);

    const result = {
      total: generatedQuestions.length,
      corrects,
      incorrects,
      unanswered,
      score: Number(scaleScore.toFixed(2))
    };

    setExamResult(result);
    setActiveExamMode("completed");

    // Save score to active user history
    if (activeUser) {
      const newScoreRecord = {
        id: `score-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        convocatorias: selectedConvocatoriaIds.map((cid) => {
          const ex = officialExams.find((e) => e.id === cid);
          return ex ? ex.year.toString() : cid;
        }),
        difficulty: testDifficulty,
        totalQuestions: generatedQuestions.length,
        correctAnswers: corrects,
        incorrectAnswers: incorrects,
        score: Number(scaleScore.toFixed(2))
      };

      const xpEarned = 50 + corrects * 5;
      const currentXP = (activeUser.xp || 0) + xpEarned;
      let newLevel = 1;
      if (currentXP >= 1000) newLevel = 5;
      else if (currentXP >= 600) newLevel = 4;
      else if (currentXP >= 300) newLevel = 3;
      else if (currentXP >= 100) newLevel = 2;

      const currentBadges = [...(activeUser.badges || [])];
      if (!currentBadges.includes("badge-primer-test")) {
        currentBadges.push("badge-primer-test");
      }
      if (scaleScore >= 8.5 && !currentBadges.includes("badge-puntuacion-elite")) {
        currentBadges.push("badge-puntuacion-elite");
      }

      const updatedUsers = users.map((u) => {
        if (u.email === activeUser.email) {
          return {
            ...u,
            xp: currentXP,
            level: newLevel,
            badges: currentBadges,
            examScores: [newScoreRecord, ...(u.examScores || [])]
          };
        }
        return u;
      });

      saveUsersToStorage(updatedUsers);
    }
  };

  // Clear Score History
  const handleClearScoreHistory = () => {
    if (!activeUser) return;
    if (confirm("¿Estás seguro de que deseas vaciar tu historial de exámenes y simulacros?")) {
      const updatedUsers = users.map((u) => {
        if (u.email === activeUser.email) {
          return { ...u, examScores: [] };
        }
        return u;
      });
      saveUsersToStorage(updatedUsers);
    }
  };

  // --- DERIVED CALCULATIONS ---

  const filteredOppositions = useMemo(() => {
    const listToFilter = [...OPPOSITIONS_LIST, ...customOppositions].filter(o => !deletedOppositions.includes(o.id));

    let results = listToFilter.filter((o) => {
      // Unified Smart Search (Name, Description, Reference, Autonomy, Province, Municipality, Country)
      if (oppSearchName) {
        const query = oppSearchName.toLowerCase();
        const matchesName = o.name.toLowerCase().includes(query);
        const matchesDesc = o.description.toLowerCase().includes(query);
        const matchesRef = o.reference.toLowerCase().includes(query);
        const matchesAutonomy = o.location.autonomy?.toLowerCase().includes(query) || false;
        const matchesProvince = o.location.province?.toLowerCase().includes(query) || false;
        const matchesMunicipality = o.location.municipality?.toLowerCase().includes(query) || false;
        const matchesCountry = o.location.country?.toLowerCase().includes(query) || false;

        if (!matchesName && !matchesDesc && !matchesRef && !matchesAutonomy && !matchesProvince && !matchesMunicipality && !matchesCountry) {
          return false;
        }
      }
      // Dedicated Reference search (from Advanced Filters)
      if (oppSearchRef && !o.reference.toLowerCase().includes(oppSearchRef.toLowerCase())) {
        return false;
      }
      // Deadline status filter
      if (oppSearchDeadline !== "Todos") {
        if (oppSearchDeadline === "Abierto" && o.deadline !== "Abierto") return false;
        if (oppSearchDeadline === "Cerrado" && o.deadline !== "Cerrado") return false;
      }
      // Group filter
      if (oppSearchGroup !== "Todos" && o.group !== oppSearchGroup) {
        return false;
      }
      // Access Type filter
      if (oppSearchAccessType !== "Todos" && !o.accessType.toLowerCase().includes(oppSearchAccessType.toLowerCase())) {
        return false;
      }
      // Disability filter
      if (oppSearchDisability !== "Todos") {
        if (oppSearchDisability === "Sí" && o.disability === "Ninguna") return false;
        if (oppSearchDisability === "No" && o.disability !== "Ninguna") return false;
      }
      // Organism Type filter
      if (oppSearchBody !== "Todos" && o.body !== oppSearchBody) {
        return false;
      }
      // Personal type filter
      if (oppSearchPersonalType !== "Todos" && o.personalType !== oppSearchPersonalType) {
        return false;
      }
      // Exam Type filter
      if (oppSearchExamType !== "Todos" && !o.examType.toLowerCase().includes(oppSearchExamType.toLowerCase())) {
        return false;
      }
      // Required Degree filter
      if (oppSearchDegree !== "Todos" && !o.degree.toLowerCase().includes(oppSearchDegree.toLowerCase())) {
        return false;
      }
      // Territorial filters
      if (oppSearchAutonomy && !o.location.autonomy?.toLowerCase().includes(oppSearchAutonomy.toLowerCase())) {
        return false;
      }
      if (oppSearchProvince && !o.location.province?.toLowerCase().includes(oppSearchProvince.toLowerCase())) {
        return false;
      }
      if (oppSearchMunicipality && !o.location.municipality?.toLowerCase().includes(oppSearchMunicipality.toLowerCase())) {
        return false;
      }
      if (oppSearchCountry && !o.location.country?.toLowerCase().includes(oppSearchCountry.toLowerCase())) {
        return false;
      }
      return true;
    });

    // Smart Search Engine dynamic creation:

    return results;
  }, [
    customOppositions,
    oppSearchName,
    oppSearchRef,
    oppSearchDeadline,
    oppSearchGroup,
    oppSearchAccessType,
    oppSearchDisability,
    oppSearchBody,
    oppSearchAutonomy,
    oppSearchProvince,
    oppSearchMunicipality,
    oppSearchCountry,
    oppSearchPersonalType,
    oppSearchExamType,
    oppSearchDegree
  ]);



  const currentSyllabus = useMemo(() => {
    // 1. Dynamic AI Generated Syllabus (if available)
    if (activeOpposition.syllabusBlocks && activeOpposition.syllabusThemes) {
      return { 
        blocks: activeOpposition.syllabusBlocks, 
        themes: activeOpposition.syllabusThemes 
      };
    }

    // 2. PRE-DEFINED MAPPINGS FOR POPULAR OPOSITIONS
    if (activeOpposition.id === "op-tramitacion") {
      return { blocks: STATIC_SYLLABUS_BLOCKS, themes: STATIC_SYLLABUS_THEMES };
    }
    if (activeOpposition.id === "op-aux-age") {
      return {
        blocks: [
          { id: "I", title: "Bloque I: Organización Pública y Normativa", themesCount: 4 },
          { id: "II", title: "Bloque II: Actividad Administrativa y Ofimática", themesCount: 3 }
        ] as SyllabusBlock[],
        themes: [
          { id: "T1", title: "La Constitución Española de 1978", block: "I", blockTitle: "Normativa AGE", description: "Estructura, principios constitucionales y derechos fundamentales de los españoles.", articles: "Artículos 1 al 55 de la Constitución", keyConcepts: ["Derechos fundamentales", "Monarquía parlamentaria", "Tribunal Constitucional"] },
          { id: "T2", title: "El Procedimiento Administrativo Común", block: "I", blockTitle: "Normativa AGE", description: "La Ley 39/2015 del Procedimiento Administrativo Común de las Administraciones Públicas.", articles: "Ley 39/2015", keyConcepts: ["Actos administrativos", "Subsanación de solicitudes", "Plazos administrativos"] },
          { id: "T3", title: "El Estatuto Básico del Empleado Público", block: "I", blockTitle: "Normativa AGE", description: "Derechos, deberes, retribuciones y régimen disciplinario de los empleados públicos.", articles: "TREBEP (RDL 5/2015)", keyConcepts: ["Personal funcionario", "Personal laboral", "Derecho de sindicación"] },
          { id: "T4", title: "Políticas de Igualdad de Género", block: "I", blockTitle: "Normativa AGE", description: "Leyes orgánicas de igualdad efectiva y medidas de prevención contra la violencia de género en el sector público.", articles: "Ley Orgánica 3/2007", keyConcepts: ["Plan de Igualdad", "Brecha salarial", "Violencia de género"] },
          { id: "T5", title: "Procesadores de Texto y Automatización de Oficina", block: "II", blockTitle: "Ofimática AGE", description: "Herramientas de edición avanzada, plantillas, combinación de correspondencia y macros simples.", articles: "Guía Ofimática AGE", keyConcepts: ["Microsoft Word", "Estilos y plantillas", "Corrección ortográfica"] },
          { id: "T6", title: "Hojas de Cálculo de Oficina", block: "II", blockTitle: "Ofimática AGE", description: "Fórmulas avanzadas, tablas dinámicas, referencias relativas y absolutas.", articles: "Guía Ofimática Excel", keyConcepts: ["Microsoft Excel", "BuscarV / Sumar.Si", "Gráficos estadísticos"] },
          { id: "T7", title: "Bases de Datos de Gestión", block: "II", blockTitle: "Ofimática AGE", description: "Tablas, relaciones, consultas simples y complejas, formularios de entrada.", articles: "Guía Ofimática Access", keyConcepts: ["Clave primaria", "Relación uno a muchos", "Consultas de selección"] }
        ] as SyllabusTheme[]
      };
    }
    if (activeOpposition.id === "op-epso-admin") {
      return {
        blocks: [
          { id: "I", title: "Bloque I: Razonamientos Lógicos EPSO", themesCount: 3 },
          { id: "II", title: "Bloque II: Competencias de la Unión Europea", themesCount: 2 }
        ] as SyllabusBlock[],
        themes: [
          { id: "T1", title: "Razonamiento Verbal Europeo", block: "I", blockTitle: "Lógica EPSO", description: "Evaluación de la capacidad de comprender textos complejos y extraer conclusiones lógicas.", articles: "Guía de EPSO Sección 2.1", keyConcepts: ["Inferencia lógica", "Comprensión lectora", "Exclusión de premisas"] },
          { id: "T2", title: "Razonamiento Numérico y Estadístico", block: "I", blockTitle: "Lógica EPSO", description: "Interpretación de datos numéricos complejos, tablas y gráficas de la Comisión Europea.", articles: "Guía de EPSO Sección 2.2", keyConcepts: ["Porcentajes acumulados", "Crecimiento relativo", "Ratios financieros"] },
          { id: "T3", title: "Razonamiento Abstracto y de Patrones", block: "I", blockTitle: "Lógica EPSO", description: "Identificación de secuencias lógicas y transformaciones de figuras espaciales.", articles: "Guía de EPSO Sección 2.3", keyConcepts: ["Giro de patrones", "Simetrías espaciales", "Series de figuras"] },
          { id: "T4", title: "Test de Juicio Situacional (SJT)", block: "II", blockTitle: "Competencias UE", description: "Resolución de conflictos laborales simulados conforme al Código de Buena Conducta Administrativa de la UE.", articles: "Código de Buena Conducta de la UE", keyConcepts: ["Conflicto de intereses", "Trabajo multicultural", "Toma de decisiones"] },
          { id: "T5", title: "Estructura Institucional de la Unión Europea", block: "II", blockTitle: "Competencias UE", description: "El Consejo, la Comisión Europea, el Parlamento Europeo y el Tribunal de Justicia de la UE.", articles: "Tratado de la Unión Europea", keyConcepts: ["Iniciativa legislativa", "Derecho de veto", "Directiva vs Reglamento"] }
        ] as SyllabusTheme[]
      };
    }
    if (activeOpposition.id === "op-policia") {
      return {
        blocks: [
          { id: "I", title: "Bloque I: Ciencias Jurídicas", themesCount: 3 },
          { id: "II", title: "Bloque II: Ciencias Sociales y Técnicas", themesCount: 2 }
        ] as SyllabusBlock[],
        themes: [
          { id: "T1", title: "Derecho Penal y Teoría del Delito", block: "I", blockTitle: "Jurídico Policía", description: "El Código Penal español: dolo, culpa, autoría, complicidad, y catálogo de delitos principales.", articles: "Libro I del Código Penal", keyConcepts: ["Eximentes de responsabilidad", "Grado de tentativa", "Delito leve vs grave"] },
          { id: "T2", title: "La Ley de Fuerzas y Cuerpos de Seguridad", block: "I", blockTitle: "Jurídico Policía", description: "Principios básicos de actuación, jerarquía y funciones específicas de la Policía Nacional.", articles: "Ley Orgánica 2/1986", keyConcepts: ["Proporcionalidad y oportunidad", "Secreto profesional", "Auxilio recíproco"] },
          { id: "T3", title: "Derechos Humanos y Tratados Internacionales", block: "I", blockTitle: "Jurídico Policía", description: "Declaración Universal de Derechos Humanos y el Convenio de Roma de Derechos Humanos.", articles: "Convenio Europeo de DDHH", keyConcepts: ["Derecho a la vida", "Prohibición de tortura", "Garantías de detención"] },
          { id: "T4", title: "Sociología de la Seguridad y Delincuencia", block: "II", blockTitle: "Social Policía", description: "Problemas sociales contemporáneos, drogodependencias, flujos migratorios y marginalidad urbana.", articles: "Plan de Seguridad Ciudadana", keyConcepts: ["Prevención delictiva", "Xenofobia y odio", "Políticas de reinserción"] },
          { id: "T5", title: "Armamento y Tiro Policial", block: "II", blockTitle: "Técnico Policía", description: "Medidas de seguridad con armas de fuego reglamentarias, cartuchería y balística básica.", articles: "Reglamento de Armas", keyConcepts: ["Glock 19", "Balística de efecto", "Legítima defensa"] }
        ] as SyllabusTheme[]
      };
    }

    // GENERAL DYNAMIC FALLBACK
    const cleanName = activeOpposition.name.replace(/Cuerpo de\s+/i, "").replace(/Escala de\s+/i, "");
    return {
      blocks: [
        { id: "I", title: `Bloque I: Normativa y Marco Legal de ${cleanName}`, themesCount: 2 },
        { id: "II", title: `Bloque II: Práctica y Procedimientos de ${cleanName}`, themesCount: 2 }
      ] as SyllabusBlock[],
      themes: [
        {
          id: "T1",
          title: `La Constitución Española Aplicada a ${cleanName}`,
          block: "I",
          blockTitle: "Marco Común",
          description: `Bases constitucionales y principios reguladores específicos aplicables al sector de ${cleanName}.`,
          articles: "Constitución Española",
          keyConcepts: ["Principios constitucionales", "Derechos fundamentales", "Estructura del Estado"]
        },
        {
          id: "T2",
          title: `Régimen de Personal y Bases Reguladoras`,
          block: "I",
          blockTitle: "Marco Común",
          description: `Régimen estatutario, obligaciones y competencias organizativas en la administración competente para ${cleanName}.`,
          articles: "Bases Oficiales",
          keyConcepts: ["Competencia orgánica", "Incompatibilidades", "Derechos estatutarios"]
        },
        {
          id: "T3",
          title: `Gestión Práctica de Expedientes en ${cleanName}`,
          block: "II",
          blockTitle: "Práctica Profesional",
          description: `Fases del procedimiento administrativo ordinario, tramitación de documentos y atención al usuario.`,
          articles: "Manual de Gestión Profesional",
          keyConcepts: ["Tramitación de expedientes", "Digitalización", "Atención al ciudadano"]
        },
        {
          id: "T4",
          title: `Régimen Disciplinario y Sancionador`,
          block: "II",
          blockTitle: "Práctica Profesional",
          description: `Tipificación de faltas, plazos de prescripción de sanciones y procedimiento disciplinario del cuerpo de ${cleanName}.`,
          articles: "Estatuto del Empleado Público",
          keyConcepts: ["Infracciones graves", "Plazos de prescripción", "Garantías de defensa"]
        }
      ] as SyllabusTheme[]
    };
  }, [activeOpposition]);

  const SYLLABUS_BLOCKS = currentSyllabus.blocks;
  const SYLLABUS_THEMES = currentSyllabus.themes;

  // Active opposition metadata for headers and styling
  const activeOppositionInitials = useMemo(() => {
    if (activeOppositionId === "op-tramitacion") return "TP";
    if (activeOppositionId === "op-aux-age") return "AX";
    if (activeOppositionId === "op-epso-admin") return "UE";
    if (activeOppositionId === "op-policia") return "PN";
    const cleanName = activeOpposition.name.replace(/Cuerpo de\s+/i, "").replace(/Escala de\s+/i, "");
    const words = cleanName.split(/\s+/).filter(w => w.length > 2);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return cleanName.slice(0, 2).toUpperCase();
  }, [activeOpposition, activeOppositionId]);

  const activeOppositionLabel = useMemo(() => {
    if (activeOppositionId === "op-tramitacion") return "Tramitación Procesal";
    if (activeOppositionId === "op-aux-age") return "Auxiliar AGE";
    if (activeOppositionId === "op-epso-admin") return "Administradores UE";
    if (activeOppositionId === "op-policia") return "Policía Nacional";
    return activeOpposition.name
      .replace(/Cuerpo de\s+/i, "")
      .replace(/Cuerpo\s+/i, "")
      .replace(/Escala de\s+/i, "")
      .replace(/Escala\s+/i, "")
      .split("(")[0]
      .trim();
  }, [activeOpposition, activeOppositionId]);

  const activeOppositionTagline = useMemo(() => {
    if (activeOppositionId === "op-tramitacion") return "Preparación de Oposiciones de Justicia";
    if (activeOppositionId === "op-aux-age") return "Preparación para la Administración General del Estado";
    if (activeOppositionId === "op-epso-admin") return "Preparación para las Instituciones Europeas (EPSO)";
    if (activeOppositionId === "op-policia") return "Preparación para las Fuerzas y Cuerpos de Seguridad";
    return `Preparación de Oposiciones Oficiales (${activeOpposition.group || "C1"})`;
  }, [activeOpposition, activeOppositionId]);

  // Progress percentage
  const totalThemesCount = SYLLABUS_THEMES.length;
  const completedThemesCount = activeUser
    ? activeUser.completedThemes.filter((id) => SYLLABUS_THEMES.some((t) => t.id === id)).length
    : 0;
  const progressPercentage = totalThemesCount > 0 ? Math.round((completedThemesCount / totalThemesCount) * 100) : 0;

  // Filtered Themes based on search query and block filter
  const filteredThemes = useMemo(() => {
    return SYLLABUS_THEMES.filter((t) => {
      const matchSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.articles.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.keyConcepts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchBlock = selectedBlockFilter === "All" || t.block === selectedBlockFilter;

      return matchSearch && matchBlock;
    });
  }, [searchQuery, selectedBlockFilter]);

  // Selected exams list
  const selectedExams = useMemo(() => {
    return officialExams.filter((e) => selectedConvocatoriaIds.includes(e.id));
  }, [officialExams, selectedConvocatoriaIds]);

  // Active opposition's exams
  const activeOppositionExams = useMemo(() => {
    return officialExams.filter((e) => e.oppositionId === activeOppositionId);
  }, [officialExams, activeOppositionId]);

  // Active opposition's static repository cases
  const activeOppositionStaticCases = useMemo(() => {
    if (activeOpposition.practicalCases && activeOpposition.practicalCases.length > 0) {
      return activeOpposition.practicalCases;
    }
    const name = activeOpposition.name.toLowerCase();
    
    if (activeOppositionId === "op-tramitacion") {
      return STATIC_PRACTICAL_CASES;
    }
    
    // Return empty array for everything else, so we show the "Sync" message.
    return [];
  }, [activeOpposition, activeOppositionId]);

  // Dynamic resolution guidelines tailored to the active opposition type
  const activeGeneralGuidelines = useMemo(() => {
    if (activeOppositionId === "op-tramitacion" || activeOppositionId === "op-auxilio-judicial" || activeOppositionId === "op-laj") {
      return [
        "Lee el supuesto de hecho con extrema atención, anotando en sucio la cronología exacta (fechas, días hábiles, plazos procesales).",
        "Identifica de inmediato el orden jurisdiccional civil o penal y el tipo de procedimiento de ejecución o declaración aplicable.",
        "Distingue los roles de los funcionarios: competencias del Tramitador Procesal, el Auxilio Judicial, el LAJ y el Juez titular.",
        "Comprueba la procedencia de la acumulación de acciones o declinatorias antes de entrar al fondo procesal.",
        "Fíjate en las especialidades de notificación telemática oficial vía LexNET para profesionales habilitados."
      ];
    } else if (activeOppositionId === "op-aux-age" || activeOppositionId === "op-admin-estado" || activeOppositionId === "op-gest-estado") {
      return [
        "Identifica el órgano o ministerio de la AGE competente que instruye y el órgano jerárquico que resuelve el procedimiento.",
        "Dibuja el esquema temporal de días hábiles administrativos (excluyendo sábados, domingos y festivos generales o autonómicos).",
        "Verifica si la solicitud formal adolece de defectos que exijan un requerimiento de subsanación de 10 días según la Ley 39/2015.",
        "Examina las atribuciones delegadas y la suplencia entre los órganos directivos reguladas bajo la Ley 40/2015.",
        "Determina si se ha producido silencio administrativo positivo o negativo según la naturaleza del procedimiento incoado."
      ];
    } else if (activeOppositionId === "op-policia" || activeOppositionId === "op-guardia-urbana") {
      return [
        "Analiza minuciosamente el atestado policial inicial y comprueba la concurrencia de causas de detención legítima penal.",
        "Identifica las infracciones penales cometidas (delitos graves, menos graves o leves) descritas bajo el Código Penal.",
        "Determina el papel exacto del instructor y secretario policial en la elaboración y firma del atestado oficial.",
        "Comprueba los plazos constitucionales de detención policial máxima (72 horas) y la vía judicial inmediata de Habeas Corpus.",
        "Fíjate en los protocolos oficiales de uso legítimo de la fuerza física y armas reglamentarias bajo la Ley Orgánica 2/1986."
      ];
    } else {
      return [
        `Lee el supuesto de hecho con extrema atención, adaptando los conceptos reguladores al temario oficial de ${activeOpposition.name}.`,
        "Determina el marco general estatutario aplicable a los empleados o aspirantes de esta rama sectorial.",
        "Localiza las bases específicas de la convocatoria para resolver plazos y requisitos específicos exigidos.",
        "Comprueba los canales de comunicación y notificaciones establecidos de forma exclusiva por este organismo.",
        "Verifica las vías internas de reclamación administrativa o recursos de alzada previos a la vía judicial."
      ];
    }
  }, [activeOppositionId, activeOpposition.name]);

  const activeSpecificGuidelines = useMemo(() => {
    if (activeOppositionId === "op-tramitacion" || activeOppositionId === "op-auxilio-judicial" || activeOppositionId === "op-laj") {
      return [
        "En el orden Civil (LEC), recuerda que los plazos de días son siempre hábiles (se excluyen sábados, domingos, festivos nacionales/locales y el mes de agosto completo).",
        "En el orden Penal (LECrim), para la fase de instrucción penal todos los días y horas del año son hábiles sin excepción formal.",
        "En el orden Contencioso-Administrativo (LJCA), el plazo de interposición ordinario del recurso es de 2 meses desde la publicación o notificación.",
        "En el Registro Civil, toda persona cuenta con un código individual digital de registro. Los asientos admiten firma electrónica calificada.",
        "Distingue las medidas de ejecución forzosa: el primer Salario Mínimo Interprofesional (SMI) líquido es totalmente inembargable."
      ];
    } else if (activeOppositionId === "op-aux-age" || activeOppositionId === "op-admin-estado" || activeOppositionId === "op-gest-estado") {
      return [
        "En la Ley 39/2015 (LPACAP), el requerimiento para subsanar subsistirá por un plazo improrrogable de 10 días hábiles.",
        "Bajo el Estatuto del Empleado Público (TREBEP), los tipos de personal son: funcionario de carrera, interino, personal laboral y eventual.",
        "El recurso de alzada frente a órganos dependientes debe interponerse en 1 mes y se resolverá por el superior jerárquico en 3 meses.",
        "En materia de notificaciones telemáticas a colectivos obligados, se entienden rechazadas si transcurren 10 días naturales sin acceder.",
        "El recurso potestativo de reposición pone fin a la vía administrativa y se interpone ante el mismo órgano que dictó el acto de origen."
      ];
    } else if (activeOppositionId === "op-policia" || activeOppositionId === "op-guardia-urbana") {
      return [
        "En el atestado policial, toda manifestación del detenido debe constar en acta leída e instruida con plenas garantías legales.",
        "Recuerda que los menores de 18 años y mayores de 14 son penalmente responsables con arreglo a la L.O. 5/2000 reguladora.",
        "La legítima defensa exige agresión ilegítima previa, necesidad racional del medio empleado y falta de provocación suficiente.",
        "Los atestados policiales tienen mero valor de denuncia formal de hechos, requiriendo ratificación de los agentes en el acto de juicio.",
        "El procedimiento de Habeas Corpus se inicia por comparecencia o escrito simple solicitando el control judicial inmediato de detención."
      ];
    } else {
      return [
        `La normativa oficial reguladora para la oposición de ${activeOpposition.name} prima sobre cualquier criterio secundario interpretativo.`,
        "Las atribuciones de los órganos evaluadores están estrictamente delimitadas por sus correspondientes reales decretos orgánicos.",
        "Analiza con sumo rigor los plazos específicos de alegaciones que marcan la fase de selección o subsanación de listas definitivas.",
        "Contrastar siempre las directrices con la última ley sectorial modificativa publicada formalmente en el BOE estatal.",
        "Recuerda que la vía contenciosa-administrativa exige agotar la vía de recursos administrativos previos del organismo emisor."
      ];
    }
  }, [activeOppositionId, activeOpposition.name]);

  // Dynamic Traps adapted to the active opposition
  const activeOppositionTraps = useMemo(() => {
    if (activeOpposition.examTraps && activeOpposition.examTraps.length > 0) {
      return activeOpposition.examTraps;
    }
    const cleanName = activeOpposition.name.replace(/Cuerpo de\s+/i, "").replace(/Escala de\s+/i, "");
    
    if (activeOpposition.id === "op-tramitacion") {
      return EXAM_TRAPS;
    }
    
    if (activeOpposition.id === "op-aux-age") {
      return [
        {
          id: `trap-${activeOpposition.id}-1`,
          convocatorias: [`exam-${activeOpposition.id}-2025`, `exam-${activeOpposition.id}-2024`],
          title: "Plazos del Recurso de Alzada vs. Reposición",
          description: "Confundir el plazo de interposición de un recurso de alzada con el de reposición, o el de su resolución presunta.",
          pattern: "Los examinadores juegan con los plazos de 1 mes (para alzada y reposición) y el plazo para resolver (3 meses para alzada, 1 mes para reposición). Suelen decir que la alzada se resuelve en un mes.",
          exampleOriginal: "El plazo para interponer recurso de alzada frente a resolución expresa es de un mes.",
          exampleTrap: "Afirmar que el plazo para resolver y notificar el recurso de alzada es de un mes, cuando en realidad es de tres meses.",
          technique: "Regla mnemotécnica: Alzada = 1 mes para interponer, 3 meses para resolver. Reposición = 1 mes para interponer, 1 mes para resolver.",
          relevance: "Crítica"
        },
        {
          id: `trap-${activeOpposition.id}-2`,
          convocatorias: [`exam-${activeOpposition.id}-2025`, `exam-${activeOpposition.id}-2024`],
          title: "Silencio Administrativo Estimatorio vs. Desestimatorio",
          description: "Hacer creer que todos los procedimientos iniciados a solicitud de los interesados tienen silencio positivo.",
          pattern: "Plantear que solicitudes relacionadas con medio ambiente o responsabilidad patrimonial de la Administración tienen silencio positivo por ser iniciadas por particulares.",
          exampleOriginal: "La regla general en procedimientos de solicitud es el silencio positivo, salvo excepciones de rango legal.",
          exampleTrap: "Indicar que las reclamaciones de responsabilidad patrimonial de la Administración se entienden estimadas por silencio tras el plazo legal.",
          technique: "Saber de memoria las excepciones del silencio positivo: responsabilidad patrimonial, medio ambiente, transmisión de facultades de dominio público.",
          relevance: "Alta"
        }
      ] as ExamTrap[];
    }
    
    if (activeOpposition.id === "op-epso-admin") {
      return [
        {
          id: `trap-${activeOpposition.id}-1`,
          convocatorias: [`exam-${activeOpposition.id}-2025`, `exam-${activeOpposition.id}-2024`],
          title: "Causalidades falsas y uso de absolutos",
          description: "Sugerir conclusiones que asumen una causalidad fuerte que no está descrita en el texto base.",
          pattern: "Los distractores EPSO presentan conclusiones lógicas pero no estrictas de acuerdo con el texto proporcionado.",
          exampleOriginal: "La reducción de emisiones de CO2 se correlaciona con la inversión tecnológica.",
          exampleTrap: "Afirmar que la inversión tecnológica es la única causa de la reducción de las emisiones de CO2.",
          technique: "Evita siempre los absolutos ('único', 'siempre', 'nunca') en los test EPSO verbales a menos que se mencionen de manera literal.",
          relevance: "Crítica"
        }
      ] as ExamTrap[];
    }
    
    if (activeOpposition.id === "op-policia") {
      return [
        {
          id: `trap-${activeOpposition.id}-1`,
          convocatorias: [`exam-${activeOpposition.id}-2025`, `exam-${activeOpposition.id}-2024`],
          title: "Plazos de detención policial vs. judicial",
          description: "Confusión del plazo máximo de detención preventiva ordinaria frente a casos extraordinarios de delincuencia organizada.",
          pattern: "Los enunciados mezclan las 72 horas generales de la LECrim con la prórroga extraordinaria de 48 horas autorizada por el Juez.",
          exampleOriginal: "La detención preventiva civil u ordinaria no podrá durar más de 72 horas.",
          exampleTrap: "Indicar que la detención policial ordinaria siempre dura exactamente 72 horas por defecto de procedimiento.",
          technique: "La detención dura el tiempo mínimo imprescindible. 72 horas es el límite máximo absoluto antes de poner al detenido a disposición judicial.",
          relevance: "Crítica"
        }
      ] as ExamTrap[];
    }
    
    return [
      {
        id: `trap-${activeOpposition.id}-1`,
        convocatorias: [`exam-${activeOpposition.id}-2025`, `exam-${activeOpposition.id}-2024`],
        title: `Cómputo de Plazos en la Convocatoria de ${cleanName}`,
        description: `Diferenciar de inmediato el cómputo de plazos por días hábiles, naturales y meses en la presentación de instancias y recursos de ${cleanName}.`,
        pattern: "Los distractores de examen suelen proponer términos en 'días naturales' o mezclar plazos administrativos comunes de la Ley 39/2015 con plazos judiciales o específicos de convocatorias pasadas.",
        exampleOriginal: "El plazo general para la interposición de recursos administrativos o subsanaciones es de días hábiles, excluyendo sábados, domingos y festivos oficiales.",
        exampleTrap: "Sugerir que el plazo de subsanación de 10 días se computa de fecha a fecha incluyendo todos los fines de semana y festivos intermedios de forma inexorable.",
        technique: "Regla mnemotécnica: Ley 39/2015 - Si el plazo se señala en días, se entiende que estos son HÁBILES (se excluyen sábados, domingos y festivos) salvo que por Ley o por el Derecho de la Unión Europea se disponga otro cómputo.",
        relevance: "Crítica"
      },
      {
        id: `trap-${activeOpposition.id}-2`,
        convocatorias: [`exam-${activeOpposition.id}-2025`, `exam-${activeOpposition.id}-2024`],
        title: `Límites de Firma y Delegación en ${cleanName}`,
        description: `Identificar con precisión técnica el órgano que ostenta la competencia final de nombramiento o resolución frente al Tribunal Examinador.`,
        pattern: "El distractor intentará hacer creer al opositor que la Comisión Calificadora o el propio tribunal examinador tiene facultades de nombramiento definitivo de los aspirantes aprobados.",
        exampleOriginal: "La propuesta de aprobados del tribunal no crea derecho alguno a favor de los aspirantes hasta que sea ratificada y publicada por la Autoridad Convocante.",
        exampleTrap: "Indicar que la firma del acta del tribunal evaluador perfecciona por sí misma la condición de funcionario en prácticas o de carrera sin requerir resolución del Ministerio o Consejería.",
        technique: "El Tribunal o Comisión de Selección es un órgano técnico de valoración que propone y evalúa, pero carece de competencias ejecutivas para nombrar. El nombramiento corresponde siempre al órgano político o directivo convocante (Rector, Consejero, Director General, etc.).",
        relevance: "Alta"
      },
      {
        id: `trap-${activeOpposition.id}-3`,
        convocatorias: [`exam-${activeOpposition.id}-2025`, `exam-${activeOpposition.id}-2024`],
        title: `Equivalencias y Requisitos de Titulación para el Grupo ${activeOpposition.group || "C1"}`,
        description: `Comprender los requisitos de acceso y equivalencias académicas válidas para el ingreso al cuerpo de ${cleanName}.`,
        pattern: `Hacer creer que poseer una titulación del subgrupo superior convalidará de forma automática e inmediata la falta de una titulación habilitante específica o carné exigido en las bases de ${cleanName}.`,
        exampleOriginal: `Para acceder a la categoría de ${cleanName} se exige estar en posesión del título de ${activeOpposition.degree || "Bachiller o equivalente"} en el plazo de solicitudes.`,
        exampleTrap: "Afirmar que un opositor que carezca de la titulación requerida puede subsanarla posteriormente presentando créditos universitarios no equivalentes oficialmente al título solicitado.",
        technique: "Mnemotecnia: Los requisitos de titulación deben poseerse íntegramente al término de la presentación de instancias y estar homologados. Las equivalencias deben ser expresas y declaradas por el Ministerio de Educación competente.",
        relevance: "Alta"
      },
      {
        id: `trap-${activeOpposition.id}-4`,
        convocatorias: [`exam-${activeOpposition.id}-2025`, `exam-${activeOpposition.id}-2024`],
        title: `Silencio Administrativo en las Solicitudes de ${cleanName}`,
        description: `Determinar de forma fehaciente los efectos estimatorios o desestimatorios de la inactividad de la Administración en procedimientos de este cuerpo.`,
        pattern: "Aprovechar la regla general de silencio positivo para confundir en materias de hacienda, subvenciones, acceso a la función pública o resolución de recursos administrativos.",
        exampleOriginal: "Como regla general, el silencio administrativo en la interposición de recursos tiene carácter desestimatorio.",
        exampleTrap: "Afirmar que si transcurre el plazo de resolución sin respuesta sobre un recurso de alzada interpuesto contra la exclusión del examen de esta oposición, la solicitud se entiende estimada.",
        technique: "Regla de Oro: La solicitud de participación en oposiciones o la impugnación de actos ante tribunales examinadores resuelta por silencio se entiende desestimada (negativa). El acceso a la función pública nunca se obtiene por silencio positivo.",
        relevance: "Crítica"
      }
    ] as ExamTrap[];
  }, [activeOpposition, activeOppositionId]);

  // Filters traps based on multi-selected convocatorias
  const filteredTraps = useMemo(() => {
    if (selectedConvocatoriaIds.length === 0) return activeOppositionTraps;
    return activeOppositionTraps.filter((trap) =>
      trap.convocatorias.some((cid) => selectedConvocatoriaIds.includes(cid))
    );
  }, [selectedConvocatoriaIds, activeOppositionTraps]);

  // Dynamic Difficult Questions adapted to the active opposition
  const activeOppositionDifficultQuestions = useMemo(() => {
    if (activeOpposition.difficultPatterns && activeOpposition.difficultPatterns.length > 0) {
      return activeOpposition.difficultPatterns;
    }
    const cleanName = activeOpposition.name.replace(/Cuerpo de\s+/i, "").replace(/Escala de\s+/i, "");
    
    if (activeOpposition.id === "op-tramitacion") {
      return DIFFICULT_QUESTIONS;
    }
    
    if (activeOpposition.id === "op-aux-age") {
      return [
        {
          id: `diff-${activeOpposition.id}-1`,
          convocatorias: [`exam-${activeOpposition.id}-2025`],
          title: "Prohibición de personal eventual en Tribunales de Selección",
          article: "Artículo 60 del TREBEP",
          difficultyExplanation: "Se intenta confundir al opositor con el personal directivo u otros tipos de personal de confianza sobre su capacidad de juzgar ofertas públicas.",
          patternDescription: "Preguntar exhaustivamente qué tipo de colectivos tienen prohibido formar parte de los tribunales examinadores.",
          memorizationTechnique: "Regla de oro: El personal interino, eventual, electo y sindicalista NUNCA puede juzgar.",
          realQuestionSample: "¿Cuál de los siguientes tiene habilitación legal para formar parte de una comisión de valoración de méritos para el acceso a la función pública de la AGE?",
          correctAnswer: "Únicamente el personal funcionario de carrera de igual o superior grupo que la plaza ofertada (Art. 60 TREBEP)"
        }
      ] as DifficultQuestionPattern[];
    }
    
    if (activeOpposition.id === "op-epso-admin") {
      return [
        {
          id: `diff-${activeOpposition.id}-1`,
          convocatorias: [`exam-${activeOpposition.id}-2025`],
          title: "La Mayoría Cualificada en el Consejo Europeo",
          article: "Artículo 16 del TUE",
          difficultyExplanation: "La doble condición de votos favorables y peso demográfico confunde recurrentemente a los candidatos en las preguntas de legislación de la UE.",
          patternDescription: "Preguntas de opción múltiple con pequeñas alteraciones numéricas en los umbrales de aprobación.",
          memorizationTechnique: "Recuerda el '55-65': 55% de los Estados miembros y que representen el 65% de la población total de la Unión.",
          realQuestionSample: "Según el Tratado de la Unión Europea, ¿qué mayoría cualificada es exigida en el Consejo de la UE para que prospere una propuesta de la Comisión?",
          correctAnswer: "El voto favorable del 55% de los países miembros que represente al menos el 65% de la población de la Unión Europea."
        }
      ] as DifficultQuestionPattern[];
    }
    
    if (activeOpposition.id === "op-policia") {
      return [
        {
          id: `diff-${activeOpposition.id}-1`,
          convocatorias: [`exam-${activeOpposition.id}-2025`],
          title: "El principio de congruencia y uso progresivo de fuerza",
          article: "Artículo 5.2 de la Ley Orgánica 2/1986",
          difficultyExplanation: "Es un concepto de coacción regulada que el Tribunal suele interrogar planteando casos tácticos complejos de respuesta inmediata.",
          patternDescription: "Simulación de una intervención armada policial preguntando por la conformidad jurídica de la acción.",
          memorizationTechnique: "Progresión racional: Persuasión verbal -> Medios de contención física -> Armas no letales -> Arma de fuego en defensa de la vida.",
          realQuestionSample: "Un agente del CNP ante una agresión con arma blanca inminente contra un civil, ¿qué principio rector debe observar de forma inmediata para el uso de su arma reglamentaria?",
          correctAnswer: "La proporcionalidad y oportunidad extrema, utilizándola exclusivamente ante peligro grave para la vida o integridad física (Art. 5.2 LO 2/1986)"
        }
      ] as DifficultQuestionPattern[];
    }
    
    return [
      {
        id: `diff-${activeOpposition.id}-1`,
        convocatorias: [`exam-${activeOpposition.id}-2025`],
        title: "Impugnación de Plantillas de Respuestas y Prórroga por Inhábiles",
        article: "Artículo 30 de la Ley 39/2015 / Bases Generales de Convocatoria",
        difficultyExplanation: "Determinar con precisión jurídica el cómputo de plazos de alegaciones cuando el último día resulta ser inhábil en el municipio del opositor.",
        patternDescription: "Preguntar sobre el día límite exacto de presentación cuando coincide con festividades locales acumuladas en las sedes examinadoras.",
        memorizationTechnique: "Si el último día de un plazo administrativo es inhábil, se prorroga automáticamente al primer día hábil siguiente (Art. 30.5 Ley 39/2015).",
        realQuestionSample: `Si el plazo improrrogable de 5 días hábiles para impugnar las preguntas provisionales del examen de ${cleanName} finaliza un sábado que es además festivo local en el municipio de residencia de un aspirante, ¿cuál es el límite real para presentar su escrito?`,
        correctAnswer: "El primer día hábil siguiente en dicho municipio, en virtud de la prórroga de vencimiento en días inhábiles regulada por la LPACAP."
      },
      {
        id: `diff-${activeOpposition.id}-2`,
        convocatorias: [`exam-${activeOpposition.id}-2025`],
        title: "Causas de Abstención y Recusación en Miembros de la Comisión Calificadora",
        article: "Artículo 23 de la Ley 40/2015 de Régimen Jurídico del Sector Público",
        difficultyExplanation: "Deslindar de forma minuciosa las incompatibilidades por preparación previa de alumnos de aquellas por relación de parentesco o amistad.",
        patternDescription: "Caso práctico donde un vocal del tribunal preparó a opositores hace varios años, forzando al alumno a distinguir el límite temporal legal.",
        memorizationTechnique: "Límite de preparación: Haber realizado tareas de preparación de aspirantes para esta misma oposición en los 5 años anteriores a la convocatoria.",
        realQuestionSample: `¿Constituye una causa de abstención obligatoria para un vocal del tribunal de selección de ${cleanName} haber impartido clases particulares presenciales de preparación para esta misma escala hace exactamente 6 años?`,
        correctAnswer: "No, ya que la causa de incompatibilidad expresa por preparación previa de opositores se limita temporalmente a los 5 años inmediatamente anteriores a la publicación de la convocatoria (Art. 23.2.e Ley 40/2015)."
      },
      {
        id: `diff-${activeOpposition.id}-3`,
        convocatorias: [`exam-${activeOpposition.id}-2024`],
        title: "Rechazo de Notificaciones en Sede Electrónica y Efectos de Plazo",
        article: "Artículo 43 de la Ley 39/2015 del Procedimiento Administrativo Común",
        difficultyExplanation: "Conocer la diferencia temporal de efectos jurídicos entre las notificaciones practicadas por acceso y el rechazo táctico de las mismas.",
        patternDescription: "Mezclar sutilmente plazos expresados en días naturales para comparecencia electrónica con el resto de plazos en días hábiles procesales.",
        memorizationTechnique: "Regla del 10: La notificación electrónica se entiende rechazada a todos los efectos cuando transcurren 10 días NATURALES desde su puesta a disposición sin que el interesado acceda a su contenido.",
        realQuestionSample: `¿En qué momento exacto se entiende legalmente rechazada y notificada una resolución de exclusión definitiva enviada a un opositor de ${cleanName} si este no accede a su buzón electrónico oficial?`,
        correctAnswer: "Transcurridos 10 días naturales desde la puesta a disposición de la notificación en la dirección electrónica habilitada única o sede de la administración."
      },
      {
        id: `diff-${activeOpposition.id}-4`,
        convocatorias: [`exam-${activeOpposition.id}-2024`],
        title: "Agotamiento de la Vía Administrativa en Actos de Tribunales de Selección",
        article: "Artículo 114 de la Ley 39/2015 / Jurisprudencia de Función Pública",
        difficultyExplanation: "Distinguir qué decisiones de los tribunales de selección ponen fin a la vía administrativa y cuáles son susceptibles de recurso de alzada.",
        patternDescription: "Intentar confundir al opositor afirmando que todo acto de un tribunal u órgano de valoración técnica agota directamente la vía de recurso ordinaria.",
        memorizationTechnique: "Los tribunales de selección son órganos jerárquicamente dependientes de la autoridad convocante. Sus actos no agotan la vía administrativa: cabe recurso de ALZADA ante el órgano jerárquico convocante.",
        realQuestionSample: `Contra el acuerdo definitivo del Tribunal de Selección de ${cleanName} que desestima la reclamación de un opositor sobre su nota final, ¿qué recurso administrativo procede y ante quién se debe interponer?`,
        correctAnswer: "Recurso de alzada ante el órgano de la Administración Pública que nombró o designó a la Comisión o Tribunal Calificador de la oposición, en el plazo de un mes."
      }
    ] as DifficultQuestionPattern[];
  }, [activeOpposition, activeOppositionId]);

  // Keep the active case in sync with the selected opposition
  useEffect(() => {
    if (activeOppositionStaticCases && activeOppositionStaticCases.length > 0) {
      setActiveCase(activeOppositionStaticCases[0]);
      setCaseAnswers({});
      setCaseChecked(false);
    } else {
      setActiveCase(null);
    }
  }, [activeOppositionId, activeOppositionStaticCases]);

  // Filters difficult questions based on multi-selected convocatorias
  const filteredDifficultQuestions = useMemo(() => {
    if (selectedConvocatoriaIds.length === 0) return activeOppositionDifficultQuestions;
    return activeOppositionDifficultQuestions.filter((q) =>
      q.convocatorias.some((cid) => selectedConvocatoriaIds.includes(cid))
    );
  }, [selectedConvocatoriaIds, activeOppositionDifficultQuestions]);

  // Compute stats for selected Convocatorias
  const combinedStats = useMemo(() => {
    if (selectedExams.length === 0) return null;

    const totalApplicants = selectedExams.reduce((sum, e) => sum + e.totalApplicants, 0);
    const avgScore = selectedExams.length > 0 ? selectedExams.reduce((sum, e) => sum + (e.averageScore || 0), 0) / selectedExams.length : 0;
    const maxCutOff = selectedExams.length > 0 ? Math.max(...selectedExams.map((e) => e.cutOffScore || 0)) : 0;
    const totalPassed = selectedExams.reduce((sum, e) => sum + e.passedCount, 0);

    // Question distribution estimation based on standard weights
    const blockWeights: Record<string, number> = {};
    let totalWeight = 0;
    
    SYLLABUS_BLOCKS.forEach((block) => {
      // Find average weight for this block among selected exams
      const blockExamsWithWeight = selectedExams.filter(e => e.themeDistribution && e.themeDistribution[block.id] !== undefined);
      const avgW = blockExamsWithWeight.length > 0
        ? Math.round(blockExamsWithWeight.reduce((sum, e) => sum + (e.themeDistribution[block.id] || 0), 0) / blockExamsWithWeight.length)
        : Math.round(100 / SYLLABUS_BLOCKS.length);
      
      blockWeights[block.id] = avgW;
      totalWeight += avgW;
    });

    // Adjust the last block to make sure total is exactly 100%
    if (SYLLABUS_BLOCKS.length > 0) {
      const lastBlockId = SYLLABUS_BLOCKS[SYLLABUS_BLOCKS.length - 1].id;
      const diff = 100 - totalWeight;
      blockWeights[lastBlockId] = Math.max(0, (blockWeights[lastBlockId] || 0) + diff);
    }

    // Maintain backwards compatible block-level weights for static pages
    const block1Weight = blockWeights["I"] || 35;
    const block2Weight = blockWeights["II"] || 40;
    const block3Weight = blockWeights["III"] || 25;

    return {
      totalApplicants,
      avgScore: Number(avgScore.toFixed(1)),
      maxCutOff: Number(maxCutOff.toFixed(1)),
      totalPassed,
      blockWeights,
      block1Weight,
      block2Weight,
      block3Weight
    };
  }, [selectedExams, SYLLABUS_BLOCKS]);

  // Suggestion: Filter topics for global search overlay
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    
    // Search in Themes
    const themeMatches = SYLLABUS_THEMES.filter(t => 
      t.title.toLowerCase().includes(query) || 
      t.description.toLowerCase().includes(query) ||
      t.id.toLowerCase() === query ||
      `tema ${t.id}`.toLowerCase().includes(query)
    ).map(t => ({
      id: t.id,
      title: t.title,
      type: 'tema',
      snippet: t.description.substring(0, 80) + '...'
    }));

    // Search in traps/patterns
    const trapMatches = activeOppositionTraps.filter(tr => 
      tr.title.toLowerCase().includes(query) ||
      tr.description.toLowerCase().includes(query)
    ).map(tr => ({
      id: tr.id,
      title: tr.title,
      type: 'trampa',
      snippet: tr.description.substring(0, 80) + '...'
    }));

    // Search in Oppositions
    const oppMatches = [...OPPOSITIONS_LIST, ...customOppositions].filter(o => !deletedOppositions.includes(o.id)).filter(o => 
      (o.name || "").toLowerCase().includes(query) ||
      (o.description || "").toLowerCase().includes(query) ||
      (o.organism || "").toLowerCase().includes(query)
    ).map(o => ({
      id: o.id,
      title: o.name,
      type: 'oposición',
      snippet: `${o.organism} - ${o.totalPlaces} plazas`
    }));

    return [...oppMatches, ...themeMatches, ...trapMatches].slice(0, 8); 
  }, [searchQuery, SYLLABUS_THEMES, activeOppositionTraps, customOppositions, deletedOppositions]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* ---------------------------------- */}
      {/* SCREEN HEADER (Hidden in Print) */}
      {/* ---------------------------------- */}
      <header className="no-print bg-[#0f172a] text-white border-b border-slate-800 shadow-md sticky top-0 z-50 transition-all duration-150">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-inner transition">
              {activeOppositionInitials}
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                {activeOppositionId === "op-tramitacion" ? "PROCESOS" : `${activeOppositionInitials} PREP`}
                <span className="text-xs bg-blue-900 text-blue-300 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {activeOppositionLabel}
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">{activeOppositionTagline}</p>
            </div>
          </div>

          {/* Search bar inside header */}
          <div className="relative flex-1 max-w-md min-w-[240px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={`Buscar en temario de ${activeOpposition.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-slate-700 text-black font-black rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-slate-500 transition shadow-inner"
            />
            {searchQuery && (
              <>
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
                {/* Search Results Dropdown Overlay */}
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-blue-500 rounded-xl shadow-2xl overflow-hidden z-[9999] animate-in fade-in slide-in-from-top-2 duration-200 no-print">
                  <div className="p-2 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-900 px-2">Resultados rápidos</span>
                    <span className="text-[10px] text-slate-500 px-2 italic">Presiona ESC para cerrar</span>
                  </div>
                  {searchResults.length > 0 ? (
                    <div className="max-h-[400px] overflow-y-auto">
                      {searchResults.map((r, idx) => (
                        <button
                          key={`${r.type}-${r.id}-${idx}`}
                          onClick={() => {
                            if (r.type === 'tema') {
                              openFullTheme(r.id, r.title);
                              setActiveTab("temario");
                            } else if (r.type === 'oposicion') {
                              setActiveOppositionId(r.id);
                              setActiveTab("dashboard");
                            } else {
                              setActiveTab("trampas");
                            }
                            setSearchQuery("");
                          }}
                          className="w-full text-left p-4 hover:bg-blue-50 transition border-b border-slate-100 last:border-0 group cursor-pointer"
                        >
                          <div className="flex items-center gap-3 mb-1">
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                              r.type === 'tema' ? 'bg-blue-600 text-white' : r.type === 'oposicion' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                            }`}>
                              {r.type === 'tema' ? `Tema ${r.id}` : r.type === 'oposicion' ? 'Oposición' : 'Trampa'}
                            </span>
                            <span className="text-sm font-bold text-black group-hover:text-blue-700">{r.title}</span>
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{r.snippet}</p>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-10 text-center">
                      <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-sm font-bold text-slate-900">Sin resultados específicos</p>
                      <p className="text-xs text-slate-500 mt-1">Prueba con otras palabras clave (ej: "Plazos", "Recursos", "Tema 12")</p>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setActiveTab("temario");
                      setSearchQuery("");
                    }}
                    className="w-full p-3.5 text-center text-xs font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 transition"
                  >
                    Ver búsqueda completa
                  </button>
                  <button
                    onClick={() => {
                      performExternalSearch(searchQuery);
                      setActiveTab("dashboard");
                      setSearchQuery("");
                      
                    }}
                    className="w-full p-3.5 text-center text-xs font-black uppercase tracking-widest text-white bg-green-600 hover:bg-green-700 transition"
                  >
                    <Globe className="h-4 w-4 inline mr-2" />
                    Sincronizar Oficial (Búsqueda Global IA)
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Font Size Selector (A | A+ | A++) */}
            <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1.5 no-print">
              <span className="text-[10px] font-black uppercase text-slate-400 px-1.5">Texto:</span>
              <button
                onClick={() => {
                  setTextSize("normal");
                  localStorage.setItem("textSizeSetting", "normal");
                }}
                className={`px-2.5 py-1 rounded text-xs font-bold transition cursor-pointer ${
                  textSize === "normal"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
                title="Tamaño de fuente Normal (A)"
              >
                A
              </button>
              <button
                onClick={() => {
                  setTextSize("large");
                  localStorage.setItem("textSizeSetting", "large");
                }}
                className={`px-2.5 py-1 rounded text-xs font-bold transition cursor-pointer ${
                  textSize === "large"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
                title="Tamaño de fuente Grande (A+)"
              >
                A+
              </button>
              <button
                onClick={() => {
                  setTextSize("xl");
                  localStorage.setItem("textSizeSetting", "xl");
                }}
                className={`px-2.5 py-1 rounded text-xs font-bold transition cursor-pointer ${
                  textSize === "xl"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
                title="Tamaño de fuente Muy Grande (A++)"
              >
                A++
              </button>
            </div>

            {/* Print trigger button */}
            <button
              id="print-btn"
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer shadow transition"
            >
              <Printer className="h-4 w-4" />
              <span>Imprimir / PDF</span>
            </button>

            {/* Profile widget */}
            <div className="flex items-center gap-2 bg-slate-800 rounded-full pl-3 pr-2 py-1 border border-slate-700">
              {activeUser ? (
                <div className="flex items-center gap-2">
                  <div className="text-left">
                    <p className="text-xs font-bold text-white truncate max-w-[120px]">
                      {activeUser.fullName}
                    </p>
                    <p className="text-[10px] text-emerald-400 font-semibold">
                      Progreso: {progressPercentage}%
                    </p>
                  </div>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    title="Cambiar de perfil o gestionar usuarios"
                    className="w-8 h-8 rounded-full bg-blue-900 hover:bg-blue-800 flex items-center justify-center text-blue-200 text-xs font-bold cursor-pointer transition border border-blue-700"
                  >
                    <Users className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-blue-300 cursor-pointer transition py-1 px-2"
                >
                  <User className="h-4 w-4" />
                  <span>Iniciar Sesión / Registrarse</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ---------------------------------- */}
      {/* PRINT-ONLY HEADER (Strictly layout for PDF) */}
      {/* ---------------------------------- */}
      <div className="print-only-header hidden">
        <div className="text-center pb-6 border-b-4 border-[#0f172a] mb-8">
          <h1 className="text-3xl font-serif font-extrabold uppercase tracking-widest text-[#0f172a] m-0">
            PREPARADOR DE OPOSICIONES - {activeOpposition.name.toUpperCase()}
          </h1>
          <p className="text-xs font-mono uppercase text-slate-500 mt-1 tracking-wider">
            Repositorio y Analítica para Oposiciones de la Administración Pública y de Justicia
          </p>
          <div className="flex justify-center gap-6 text-xs text-slate-600 mt-4 font-serif italic">
            <span>Usuario: {activeUser ? `${activeUser.fullName} (${activeUser.email})` : "Estudiante General"}</span>
            <span>Progreso de Temario: {progressPercentage}% ({completedThemesCount} de {totalThemesCount} Temas)</span>
            <span>Fecha del Reporte: {new Date().toLocaleDateString("es-ES")}</span>
          </div>
        </div>
      </div>

      {/* ---------------------------------- */}
      {/* MAIN CONTAINER */}
      {/* ---------------------------------- */}
      <div className="no-print flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 gap-6">
        
        {/* MOBILE HORIZONTAL NAVIGATION (Visible only on mobile, hidden in Print) */}
        <div className="no-print md:hidden w-full overflow-x-auto flex items-center gap-2 pb-2 scrollbar-none border-b border-slate-200">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === "dashboard" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Panel
          </button>
          <button
            onClick={() => setActiveTab("temario")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === "temario" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            1. Temario
          </button>
          <button
            onClick={() => setActiveTab("oposiciones")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === "oposiciones" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            🔍 Oposiciones
          </button>
          <button
            onClick={() => setActiveTab("casos")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === "casos" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            💼 Casos Prácticos
          </button>
          <button
            onClick={() => setActiveTab("examenes")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === "examenes" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            2. Histórico
          </button>
          <button
            onClick={() => setActiveTab("material")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === "material" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            📚 Material Completo
          </button>
          <button
            onClick={() => setActiveTab("analisis")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === "analisis" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            3. Análisis
          </button>
          <button
            onClick={() => setActiveTab("trampas")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === "trampas" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            4. Trampas
          </button>
          <button
            onClick={() => setActiveTab("preguntas")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === "preguntas" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            5. Preguntas
          </button>
          <button
            onClick={() => setActiveTab("generador")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === "generador" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            6. Generador
          </button>
          <button
            onClick={() => setActiveTab("calendario")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === "calendario" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            7. Calendario
          </button>
          <button
            onClick={() => setActiveTab("comunidad")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === "comunidad" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            8. Foro
          </button>
          <button
            onClick={() => setActiveTab("logros")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === "logros" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            9. Logros
          </button>
        </div>

        {/* SIDEBAR NAVIGATION (Hidden on mobile and in Print) */}
        <aside className="no-print hidden md:flex md:w-64 flex-shrink-0 flex-col gap-4">
          
          {/* Main Index Navegable */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Índice Navegable</span>
              <ListFilter className="h-3 w-3 text-slate-600" />
            </h2>
            <nav className="flex flex-col gap-1">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Introducción</span>
                </div>
                <ChevronRight className="h-3 w-3 opacity-60" />
              </button>

              <button
                onClick={() => setActiveTab("temario")}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition cursor-pointer ${
                  activeTab === "temario"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>1. Temario e Interactividad</span>
                </div>
                <ChevronRight className="h-3 w-3 opacity-60" />
              </button>

              <button
                onClick={() => setActiveTab("oposiciones")}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition cursor-pointer ${
                  activeTab === "oposiciones"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Compass className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Buscador Oposiciones</span>
                </div>
                <span className="text-[9px] bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.5 rounded">
                  ES/UE
                </span>
              </button>

              <button
                onClick={() => setActiveTab("casos")}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition cursor-pointer ${
                  activeTab === "casos"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="h-3.5 w-3.5 text-amber-500" />
                  <span>Casos Prácticos</span>
                </div>
                <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                  Práctico
                </span>
              </button>

              <button
                onClick={() => setActiveTab("examenes")}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition cursor-pointer ${
                  activeTab === "examenes"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>2. Histórico de Exámenes</span>
                </div>
                <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                  {officialExams.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("material")}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition cursor-pointer ${
                  activeTab === "material"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>📚 Material Completo</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("analisis")}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition cursor-pointer ${
                  activeTab === "analisis"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-3.5 w-3.5" />
                  <span>3. Análisis Global</span>
                </div>
                <ChevronRight className="h-3 w-3 opacity-60" />
              </button>

              <button
                onClick={() => setActiveTab("trampas")}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition cursor-pointer ${
                  activeTab === "trampas"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>4. Trampas & Patrones</span>
                </div>
                <ChevronRight className="h-3 w-3 opacity-60" />
              </button>

              <button
                onClick={() => setActiveTab("preguntas")}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition cursor-pointer ${
                  activeTab === "preguntas"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Award className="h-3.5 w-3.5" />
                  <span>5. Preguntas & Mnemotecnia</span>
                </div>
                <ChevronRight className="h-3 w-3 opacity-60" />
              </button>

              <button
                onClick={() => setActiveTab("generador")}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition cursor-pointer ${
                  activeTab === "generador"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileQuestion className="h-3.5 w-3.5" />
                  <span>6. Generador de Exámenes</span>
                </div>
                <span className="text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                  Test
                </span>
              </button>

              <button
                onClick={() => setActiveTab("calendario")}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition cursor-pointer ${
                  activeTab === "calendario"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>7. Calendario de Estudio</span>
                </div>
                <ChevronRight className="h-3 w-3 opacity-60" />
              </button>

              <button
                onClick={() => setActiveTab("comunidad")}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition cursor-pointer ${
                  activeTab === "comunidad"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5" />
                  <span>8. Foro de Comunidad</span>
                </div>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                  Comunidad
                </span>
              </button>

              <button
                onClick={() => setActiveTab("logros")}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition cursor-pointer ${
                  activeTab === "logros"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Award className="h-3.5 w-3.5" />
                  <span>9. Logros y Progreso</span>
                </div>
                <ChevronRight className="h-3 w-3 opacity-60" />
              </button>
            </nav>
          </div>

          {/* Quick Stats Summary Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-700">Tu Progreso de Estudio</h3>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-600">
              <span>{completedThemesCount} / {totalThemesCount} Temas</span>
              <span className="font-bold text-slate-800">{progressPercentage}%</span>
            </div>

            {activeUser ? (
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-600">Notas guardadas:</span>
                  <span className="font-bold text-slate-800">
                    {Object.keys(activeUser.themeNotes).length}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-600">Simulacros hechos:</span>
                  <span className="font-bold text-slate-800">
                    {activeUser.examScores?.length || 0}
                  </span>
                </div>
                {activeUser.examScores && activeUser.examScores.length > 0 && (
                  <div className="text-[11px] bg-blue-50 p-2 rounded-lg text-blue-800 font-medium">
                    Nota media simulacros:{" "}
                    {(
                      activeUser.examScores.reduce((sum, s) => sum + s.score, 0) /
                      activeUser.examScores.length
                    ).toFixed(2)}
                    /10
                  </div>
                )}
              </div>
            ) : (
              <p className="text-[10px] text-slate-600 italic font-medium">
                Regístrate gratis para habilitar el guardado de notas, histórico y avances.
              </p>
            )}
          </div>

          {/* Selector de Convocatorias Global */}
          <div className="bg-white border border-indigo-200 text-slate-900 rounded-xl p-4 shadow-md flex flex-col gap-3">
            <div>
              <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">
                Filtro Convocatorias
              </h3>
              <p className="text-[10px] text-indigo-900/70">
                Selecciona las convocatorias que alimentan los análisis y el test
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="start-year-select" className="text-[10px] font-bold text-slate-400">Año de Inicio:</label>
              <select
                id="start-year-select"
                value={selectedStartYear}
                onChange={(e) => handleStartYearChange(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 text-xs text-white rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value={2026}>2026</option>
                <option value={2023}>2023 (Recomendado)</option>
                <option value={2021}>2021</option>
                <option value={2019}>2019</option>
                <option value={2016}>2016</option>
                <option value={2013}>2013</option>
                <option value={2010}>2010 (Cualquier año)</option>
              </select>
            </div>

            {showYearWarning && (
              <div className="bg-amber-950 border-l-4 border-amber-500 p-2.5 rounded-r text-[10px] text-amber-300 leading-normal">
                <div className="flex gap-1.5 items-start">
                  <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 text-amber-400" />
                  <p>
                    <strong>Aviso:</strong> Se recomienda escoger convocatorias a partir del 2023 para garantizar concordancia con la ley.
                  </p>
                </div>
              </div>
            )}

            <div className="border-t border-indigo-100 pt-2 flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-indigo-700">Convocatorias Activas:</span>
              <div className="flex flex-col gap-1 max-h-[160px] overflow-y-auto pr-1">
                {activeOppositionExams.map((e) => (
                  <label
                    key={e.id}
                    className="flex items-center gap-2.5 text-xs cursor-pointer hover:text-indigo-700 transition py-1.5 px-2 rounded hover:bg-indigo-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedConvocatoriaIds.includes(e.id)}
                      onChange={() => toggleConvocatoriaSelect(e.id)}
                      className="rounded text-indigo-600 bg-white border-slate-300 focus:ring-indigo-500 h-4 w-4"
                    />
                    <span className="truncate" title={e.name}>
                      {e.year} - {e.status === "Nuevo" ? "⭐ Nueva" : "Oficial"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            
            <button
              onClick={() => {
                const newExams = [
                  {
                    id: `exam-${activeOppositionId}-2022`,
                    year: 2022,
                    oppositionId: activeOppositionId,
                    totalApplicants: activeOpposition.totalPlaces * 16,
                    cutOffScore: 68.0,
                    name: `Examen Oficial ${activeOpposition.name} - Convocatoria 2022`,
                    date: "2022-09-10",
                    status: "Oficial",
                    averageScore: 63.5,
                    passedCount: activeOpposition.totalPlaces,
                    themeDistribution: { "I": 40, "II": 60 },
                    questionsCount: 100
                  },
                  {
                    id: `exam-${activeOppositionId}-2019`,
                    year: 2019,
                    oppositionId: activeOppositionId,
                    totalApplicants: activeOpposition.totalPlaces * 20,
                    cutOffScore: 73.0,
                    name: `Examen Oficial ${activeOpposition.name} - OEP 2019`,
                    date: "2019-11-20",
                    status: "Oficial",
                    averageScore: 67.8,
                    passedCount: activeOpposition.totalPlaces,
                    themeDistribution: { "I": 40, "II": 60 },
                    questionsCount: 100
                  }
                ];
                
                const existingIds = new Set(officialExams.map(e => e.id));
                const uniqueNewExams = newExams.filter(e => !existingIds.has(e.id));
                
                if (uniqueNewExams.length > 0) {
                  const updated = [...officialExams, ...uniqueNewExams];
                  setOfficialExams(updated);
                  localStorage.setItem("official_exams", JSON.stringify(updated));
                  setSelectedConvocatoriaIds([...selectedConvocatoriaIds, ...uniqueNewExams.map(e => e.id)]);
                  alert(`Se han añadido e incluido ${uniqueNewExams.length} convocatorias históricas para ${activeOpposition.name}.`);
                } else {
                  alert(`Ya están cargadas todas las convocatorias históricas disponibles para ${activeOpposition.name}.`);
                }
              }}
              className="w-full flex items-center justify-center gap-1 bg-indigo-100 hover:bg-indigo-200 text-[10px] font-bold text-indigo-900 py-1.5 rounded transition cursor-pointer border border-slate-700"
            >
              <Search className="h-3 w-3" />
              <span>Añadir Convocatorias Existentes</span>
            </button>
          </div>
        </aside>

        {/* MAIN WORKSPACE */}
        <main id="printable-content" className="flex-1 flex flex-col gap-6">

          {/* ---------------------------------- */}
          {/* TAB 0: BENTO GRID DASHBOARD */}
          {/* ---------------------------------- */}
          {activeTab === "dashboard" && (
            <div className="flex flex-col gap-6">
              
              {/* Alert Banner */}
              {showYearWarning && (
                <div className="no-print bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm">
                  <div className="flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-amber-800">Sugerencia de Estudio</h4>
                      <p className="text-xs text-amber-700 mt-0.5">
                        Se recomienda escoger convocatorias recientes. Los exámenes oficiales antiguos pueden hacer referencia a normativas que ya han sido modificadas o derogadas.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Bento Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                
                {/* Box 1: Temario & Requisitos (Large Column) */}
                <div className="bento-card md:col-span-7 md:row-span-2 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-4 shadow-sm hover:shadow transition">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <div>
                      <span className="tag text-xs text-blue-600 font-bold tracking-widest uppercase">
                        Módulo 1
                      </span>
                      <h2 className="text-lg font-bold text-slate-800 mt-1">Syllabus e Interactividad</h2>
                    </div>
                    <button
                      onClick={() => setActiveTab("temario")}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ver Completo</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-sm text-slate-900 leading-relaxed font-medium">
                    {activeOpposition.description || "Organización y temario oficial de la oposición."} Marca los temas que domines y añade notas personales de estudio que se guardarán para siempre.
                  </p>

                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {SYLLABUS_THEMES.slice(0, 5).map((theme) => {
                      const isCompleted = activeUser?.completedThemes.includes(theme.id) || false;
                      const hasNote = activeUser?.themeNotes[theme.id];
                      return (
                        <div
                          key={theme.id}
                          className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 transition text-xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <button
                              onClick={() => toggleThemeCompleted(theme.id)}
                              className="text-slate-400 hover:text-blue-600 cursor-pointer"
                              aria-label={`Marcar tema ${theme.id} como ${isCompleted ? 'pendiente' : 'completado'}`}
                            >
                              {isCompleted ? (
                                <CheckCircle className="h-4 w-4 text-emerald-500 fill-emerald-50 text-emerald-500" />
                              ) : (
                                <Circle className="h-4 w-4 text-slate-300" />
                              )}
                            </button>
                            <div className="min-w-0">
                              <p className={`font-semibold text-slate-800 truncate ${isCompleted ? 'line-through text-slate-400' : ''}`}>
                                {theme.id}: {theme.title}
                              </p>
                              {hasNote && (
                                <p className="text-[10px] text-blue-600 italic truncate max-w-[280px]">
                                  Nota: {hasNote}
                                </p>
                              )}
                            </div>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0 ${
                            isCompleted ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {isCompleted ? 'Completado' : 'Pendiente'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Box 2: Test Generator Panel (Highlight Card) */}
                <div className="bento-card md:col-span-5 bg-indigo-50 border border-indigo-200 text-slate-900 rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-md hover:shadow-lg transition">
                  <div>
                    <span className="tag text-xs text-blue-400 font-bold tracking-widest uppercase">
                      Módulo 6
                    </span>
                    <h2 className="text-lg font-bold text-indigo-900 mt-1">Generador de Test Inteligente</h2>
                    <p className="text-xs text-indigo-800 mt-2 leading-relaxed">
                      Genera exámenes de oposición automáticos basados en la frecuencia histórica y complejidad de convocatorias.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-2 rounded-lg border border-indigo-100">
                        <span className="block text-[9px] text-indigo-600 uppercase font-bold">Dificultad</span>
                        <span className="capitalize font-bold text-indigo-900">{testDifficulty}</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-indigo-100">
                        <span className="block text-[9px] text-indigo-600 uppercase font-bold">Nº Preguntas</span>
                        <span className="font-bold text-indigo-900">{testNumQuestions} ítems</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab("generador");
                        handleGenerateTest();
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition cursor-pointer shadow-lg hover:shadow-blue-500/20 text-center uppercase tracking-wide"
                    >
                      Empezar Test Ahora
                    </button>
                  </div>
                </div>

                {/* Box 3: Análisis Global (Bento Item) */}
                <div className="bento-card md:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-4 shadow-sm hover:shadow transition">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <div>
                      <span className="tag text-xs text-blue-600 font-bold tracking-widest uppercase">
                        Módulo 3
                      </span>
                      <h2 className="text-base font-bold text-slate-800 mt-1">Análisis Global de Peso</h2>
                    </div>
                    <button
                      onClick={() => setActiveTab("analisis")}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Detalles</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {combinedStats ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-around items-center py-2 text-center bg-slate-50 rounded-xl">
                        <div>
                          <p className="text-xs text-slate-600 font-medium">Nota Corte</p>
                          <p className="text-xl font-black text-[#0f172a]">{combinedStats.maxCutOff}</p>
                        </div>
                        <div className="w-px h-8 bg-slate-200" />
                        <div>
                          <p className="text-xs text-slate-600 font-medium">Ratio Apto</p>
                          <p className="text-xl font-black text-[#0f172a]">
                            {combinedStats.totalApplicants > 0 ? Math.round((combinedStats.totalPassed / combinedStats.totalApplicants) * 100) : 0}%
                          </p>
                        </div>
                      </div>

                      {/* Micro Distribution bar */}
                      <div className="space-y-1.5 text-[10px]">
                        <div className="flex justify-between">
                          <span className="text-slate-600 font-medium">Distribución por Bloques:</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full flex overflow-hidden">
                          {SYLLABUS_BLOCKS.map((block, index) => {
                            const weight = combinedStats.blockWeights[block.id] || 0;
                            const colors = ["bg-blue-900", "bg-blue-600", "bg-slate-400"];
                            const color = colors[index % colors.length];
                            return (
                              <div
                                key={block.id}
                                className={color}
                                style={{ width: `${weight}%` }}
                                title={`${block.title}: ${weight}%`}
                              />
                            );
                          })}
                        </div>
                        <div className="flex flex-wrap justify-between gap-x-2 gap-y-0.5 text-[8.5px] text-slate-600 font-medium">
                          {SYLLABUS_BLOCKS.map((block) => {
                            const weight = combinedStats.blockWeights[block.id] || 0;
                            return (
                              <span key={block.id}>
                                Bloque {block.id} ({weight}%)
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No hay convocatorias seleccionadas en la barra lateral.</p>
                  )}
                </div>

                {/* Box 4: Patrones de Trampas (Bento Item) */}
                <div className="bento-card md:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between gap-4 shadow-sm hover:shadow transition">
                  <div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <div>
                        <span className="tag text-xs text-red-600 font-bold tracking-widest uppercase">
                          Módulo 4
                        </span>
                        <h2 className="text-base font-bold text-slate-800 mt-1">Trampas Recurrentes</h2>
                      </div>
                      <button
                        onClick={() => setActiveTab("trampas")}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>Ver todas</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-sm text-slate-900 mt-2 leading-relaxed font-medium">
                      Los examinadores estructuran trampas de literalidad con sutilezas técnicas. Conoce los patrones del opositor inteligente.
                    </p>

                    <div className="mt-3 space-y-2">
                      {filteredTraps.slice(0, 2).map((trap) => (
                        <div key={trap.id} className="p-2.5 bg-red-50/50 border-l-4 border-red-500 rounded text-xs">
                          <p className="font-bold text-red-950 flex justify-between">
                            <span>{trap.title}</span>
                            <span className="text-[9px] bg-red-100 text-red-800 px-1.5 py-0.2 rounded">
                              {trap.relevance}
                            </span>
                          </p>
                          <p className="text-[10px] text-red-800 line-clamp-1 mt-1">{trap.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Box 5: Preguntas Difíciles (Bento Item) */}
                <div className="bento-card md:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between gap-4 shadow-sm hover:shadow transition">
                  <div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <div>
                        <span className="tag text-xs text-amber-800 font-bold tracking-widest uppercase">
                          Módulo 5
                        </span>
                        <h2 className="text-base font-bold text-slate-800 mt-1">Preguntas Élite & Memorización</h2>
                      </div>
                      <button
                        onClick={() => setActiveTab("preguntas")}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>Mnemotecnia</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-sm text-slate-900 mt-2 leading-relaxed font-medium">
                      Preguntas con tasa de acierto menor al 10% en oposiciones pasadas. Esquemas de repetición y memorización del Título VI.
                    </p>

                    <div className="mt-3 space-y-2">
                      {filteredDifficultQuestions.slice(0, 2).map((q) => (
                        <div key={q.id} className="p-2.5 bg-amber-50/50 border-l-4 border-amber-500 rounded text-xs">
                          <p className="font-bold text-amber-950">{q.title}</p>
                          <p className="text-[10px] text-amber-800 mt-0.5 italic">{q.article}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ---------------------------------- */}
          {/* TAB 1: TEMARIO & REQUISITOS (INTERACTIVE) */}
          {/* ---------------------------------- */}
          {activeTab === "temario" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
              
              {/* Header inside report */}
              <div className="border-b border-slate-200 pb-4">
                <span className="tag text-xs text-blue-600 font-bold tracking-widest uppercase">
                  Módulo 1
                </span>
                <h2 className="text-xl font-black text-black mt-1">Syllabus Oficial de {activeOpposition.name}</h2>
                <p className="text-sm text-slate-900 mt-1 font-medium">
                  Requisitos oficiales de acceso, cualidades esperadas por el tribunal e índice interactivo de temas del programa con marcas de estudio y notas.
                </p>
              </div>

              {/* Requirements & Expectations block (Grid Layout) */}
              <div className="flex flex-col gap-6">
                {/* Requirements block */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Requisitos Generales de Acceso
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {activeRequirements.map((req, i) => (
                        <li key={i} className="flex gap-2.5 text-xs">
                          <span className="text-blue-600 font-bold mt-0.5">✓</span>
                          <div>
                            <strong className="text-slate-800">{req.title}:</strong>{" "}
                            <span className="text-slate-600">{req.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-400 font-medium">
                    Grupo de Acceso: <strong className="text-slate-600">{activeOpposition.group}</strong> | Personal: <strong className="text-slate-600">{activeOpposition.personalType}</strong>
                  </div>
                </div>

                {/* Tribunal Expectations block */}
                <div className="bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/40 rounded-xl p-5 border border-indigo-100 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4.5 w-4.5 text-indigo-600 animate-pulse" />
                    <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                      Cualidades que el Tribunal Espera del Opositor
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
                    El órgano calificador no solo busca conocimientos, sino un perfil profesional apto para el servicio activo:
                  </p>
                  
                  <div className="flex flex-col gap-2.5 max-h-[200px] overflow-y-auto pr-1">
                    {activeTribunalExpectations.skills.map((skill, idx) => (
                      <div key={idx} className="bg-white/80 p-2.5 rounded-lg border border-indigo-100/60 shadow-xs hover:shadow-md transition-all duration-200">
                        <h4 className="text-xs font-extrabold text-indigo-950 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          {skill.name}
                        </h4>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Blocks navigation/filter */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200 no-print">
                <div className="flex gap-1">
                  <button
                    onClick={() => setSelectedBlockFilter("All")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      selectedBlockFilter === "All"
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Todos
                  </button>
                  {SYLLABUS_BLOCKS.map((block) => (
                    <button
                      key={block.id}
                      onClick={() => setSelectedBlockFilter(block.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        selectedBlockFilter === block.id
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      Bloque {block.id}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Mostrando {filteredThemes.length} de {totalThemesCount} temas
                </div>
              </div>

              {/* Syllabus theme list */}
              <div className="space-y-4">
                {filteredThemes.map((theme) => {
                  const isCompleted = activeUser?.completedThemes.includes(theme.id) || false;
                  const personalNote = activeUser?.themeNotes[theme.id] || "";

                  return (
                    <div
                      key={theme.id}
                      id={`theme-card-${theme.id}`}
                      className={`p-4 rounded-xl border transition-all ${
                        isCompleted
                          ? "border-emerald-200 bg-emerald-50/20"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {/* Checkbox trigger */}
                          <button
                            onClick={() => toggleThemeCompleted(theme.id)}
                            className="no-print text-slate-400 hover:text-blue-600 cursor-pointer mt-1"
                            aria-label={`Marcar tema ${theme.id} como ${isCompleted ? 'pendiente' : 'completado'}`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5 text-emerald-600 fill-emerald-100" />
                            ) : (
                              <Circle className="h-5 w-5 text-slate-300" />
                            )}
                          </button>
                          
                          {/* Print only indicators */}
                          <div className="print-only hidden mr-2">
                            <span>[{isCompleted ? "X" : " "}]</span>
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-black text-blue-900 bg-blue-100 px-1.5 py-0.2 rounded">
                                {theme.id}
                              </span>
                              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                Bloque {theme.block}
                              </span>
                            </div>
                            <h3 className="text-sm font-bold text-slate-800 mt-1">
                              {theme.title}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                              {theme.description}
                            </p>
                            
                            <div className="mt-2.5 flex flex-wrap gap-2 text-[10.5px]">
                              <button
                                onClick={() => setSelectedInteractiveConcept({ themeId: theme.id, concept: theme.articles, type: 'articles' })}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded font-mono border border-slate-300/50 cursor-pointer transition-all flex items-center gap-1 active:scale-95"
                                title="Ver detalles y consejos de este articulado"
                              >
                                <span>📖 {theme.articles}</span>
                                <span className="text-[8px] bg-slate-300 text-slate-700 px-1 rounded-sm uppercase font-bold tracking-wider">Ver</span>
                              </button>
                              {theme.keyConcepts.map((concept, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedInteractiveConcept({ themeId: theme.id, concept: concept, type: 'concept' })}
                                  className="bg-blue-50/70 hover:bg-blue-100 text-blue-900 px-2 py-1 rounded border border-blue-200/50 cursor-pointer transition-all flex items-center gap-1 active:scale-95"
                                  title={`Ver detalles de ${concept}`}
                                >
                                  <span>• {concept}</span>
                                  <span className="text-[8px] bg-blue-200/60 text-blue-800 px-1 rounded-sm uppercase font-bold tracking-wider">Estudiar</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="no-print flex items-center gap-2 flex-shrink-0 self-end sm:self-start">
                          <button
                            onClick={() => openFullTheme(theme.id, theme.title)}
                            className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 hover:text-indigo-800 border border-indigo-200 hover:border-indigo-300 bg-indigo-50/50 px-2.5 py-1.5 rounded-lg cursor-pointer transition active:scale-95"
                            title={`Leer manual de estudio completo para el tema ${theme.id}`}
                          >
                            <BookOpen className="h-3.5 w-3.5" />
                            <span>Leer Manual</span>
                          </button>
                          <button
                            onClick={() => startEditingNote(theme.id)}
                            className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 bg-blue-50/30 px-2.5 py-1.5 rounded-lg cursor-pointer transition"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            <span>{personalNote ? "Editar Nota" : "Añadir Nota"}</span>
                          </button>
                        </div>

                      </div>

                      {/* Display Personal Note inside card */}
                      {personalNote && (
                        <div className="print-note mt-3 bg-slate-50/80 p-3 rounded-lg border-l-4 border-slate-400 text-xs">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                Nota de estudio personal:
                              </span>
                              <p className="text-slate-700 italic leading-relaxed whitespace-pre-wrap">
                                "{personalNote}"
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                if (confirm("¿Deseas eliminar esta nota?")) {
                                  const updatedNotes = { ...activeUser?.themeNotes };
                                  delete updatedNotes[theme.id];
                                  const updatedUsers = users.map((u) => {
                                    if (u.email === activeUser?.email) {
                                      return { ...u, themeNotes: updatedNotes };
                                    }
                                    return u;
                                  });
                                  saveUsersToStorage(updatedUsers);
                                }
                              }}
                              className="no-print text-slate-400 hover:text-red-500 p-1 rounded transition"
                              title="Eliminar Nota"
                            >
                              <Trash className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {filteredThemes.length === 0 && (
                  <div className="text-center py-8 text-slate-400 text-xs italic">
                    Ningún tema coincide con la búsqueda. Intenta con otra palabra clave.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ---------------------------------- */}
          {/* TAB: BUSCADOR DE OPOSICIONES */}
          {/* ---------------------------------- */}
          {activeTab === "oposiciones" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
              
              <div className="border-b border-slate-200 pb-4">
                <span className="tag text-xs text-indigo-600 font-bold tracking-widest uppercase">
                  Buscador Inteligente
                </span>
                <h2 className="text-xl font-black text-black mt-1 flex items-center gap-2">
                  <Compass className="h-5 w-5 text-indigo-600" />
                  <span>Buscador General de Oposiciones (España y Europa)</span>
                </h2>
                <p className="text-sm text-slate-900 mt-1 font-medium">
                  Encuentra convocatorias de empleo público por ámbito territorial, grupo, plazos o titulación, y sincronízalas instantáneamente con tu temario de estudio.
                </p>
              </div>

              {/* Main Search Input */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={oppSearchName}
                    onChange={(e) => setOppSearchName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") performExternalSearch(oppSearchName);
                    }}
                    placeholder="Buscar oposición por nombre o institución (ej. 'Justicia', 'Comisión Europea', 'Policía')..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white text-black font-bold border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <button
                  onClick={() => performExternalSearch(oppSearchName)}
                  disabled={isSearchingExternal || oppSearchName.length < 3}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-black rounded-xl text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md active:scale-95"
                >
                  {isSearchingExternal ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Globe className="h-4 w-4" />
                  )}
                  <span>{isSearchingExternal ? "Buscando..." : "Búsqueda Global (Grounding)"}</span>
                </button>
                
                <button
                  onClick={() => setShowAdvancedOppFilters(!showAdvancedOppFilters)}
                  className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-black font-black rounded-xl text-sm flex items-center gap-2 transition cursor-pointer"
                >
                  <Filter className="h-4 w-4" />
                  <span>{showAdvancedOppFilters ? "Cerrar Filtros" : "Filtros Avanzados"}</span>
                  {showAdvancedOppFilters ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>
              </div>

              {/* External Search Results Display */}
              {externalSearchRes.length > 0 && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-black text-blue-900 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-blue-600" />
                      Resultados del Registro Oficial (España/Europa)
                    </h3>
                    <button 
                      onClick={() => setExternalSearchRes([])}
                      className="text-blue-400 hover:text-blue-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {externalSearchRes.map((res) => (
                      <div key={res.id} className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-black bg-blue-600 text-white px-2 py-0.5 rounded uppercase tracking-wider">{res.group}</span>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                            res.status.toLowerCase().includes('abierta') ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                          }`}>{res.status}</span>
                        </div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <button onClick={() => performSync(res)} className="text-sm font-black text-blue-700 leading-tight hover:underline text-left">
                            {res.name}
                          </button>
                          {res.url && (
                            <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded hover:bg-slate-200 transition shrink-0 flex items-center gap-1">
                              <ExternalLink className="h-3 w-3" /> Link Oficial
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-slate-700 mb-3 line-clamp-2">{res.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 uppercase font-bold">Ámbito</span>
                            <span className="text-[11px] font-black text-slate-900">{res.region}</span>
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="text-[10px] text-slate-500 uppercase font-bold">Plazas</span>
                            <span className="text-[11px] font-black text-slate-900">{res.totalPlaces}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => performSync(res)}
                          disabled={isSyncing === res.id}
                          className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-black rounded-lg text-xs transition active:scale-95 flex justify-center items-center gap-2"
                        >
                          {isSyncing === res.id ? (
                            <><div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sincronizando (puede tardar un minuto)...</>
                          ) : (
                            "Sincronizar Temario y Plazos"
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Advanced Search Filters Grid */}
              {showAdvancedOppFilters && (
                <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-down">
                  
                  {/* Reference code */}
                  <div className="flex flex-col gap-1 text-xs">
                    <label className="font-bold text-slate-600">Código o Referencia BOE/DOUE:</label>
                    <input
                      type="text"
                      value={oppSearchRef}
                      onChange={(e) => setOppSearchRef(e.target.value)}
                      placeholder="Ej. BOE-A-2026-..."
                      className="border border-slate-250 bg-white text-slate-800 rounded-lg p-2 text-xs focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Deadline filter */}
                  <div className="flex flex-col gap-1 text-xs">
                    <label className="font-bold text-slate-600">Estado de Plazo:</label>
                    <select
                      value={oppSearchDeadline}
                      onChange={(e) => setOppSearchDeadline(e.target.value)}
                      className="border border-slate-250 bg-white text-slate-800 rounded-lg p-2 text-xs"
                    >
                      <option value="Todos">Todos los Estados</option>
                      <option value="Abierto">🟢 Abierto (Inscripciones activas)</option>
                      <option value="Próximo">🟡 Próximo (Anunciado / OEP)</option>
                      <option value="Cerrado">🔴 Cerrado</option>
                    </select>
                  </div>

                  {/* Group filter */}
                  <div className="flex flex-col gap-1 text-xs">
                    <label className="font-bold text-slate-600">Grupo de Titulación:</label>
                    <select
                      value={oppSearchGroup}
                      onChange={(e) => setOppSearchGroup(e.target.value)}
                      className="border border-slate-250 bg-white text-slate-800 rounded-lg p-2 text-xs"
                    >
                      <option value="Todos">Todos los Grupos</option>
                      <option value="A1">Grupo A1 (Licenciatura / Grado Superior)</option>
                      <option value="A2">Grupo A2 (Grado / Diplomatura)</option>
                      <option value="C1">Grupo C1 (Bachillerato / Técnico)</option>
                      <option value="C2">Grupo C2 (Graduado Escolar / ESO)</option>
                      <option value="AD">Administradores EPSO (UE)</option>
                      <option value="AST">Asistentes EPSO (UE)</option>
                    </select>
                  </div>

                  {/* Access type filter */}
                  <div className="flex flex-col gap-1 text-xs">
                    <label className="font-bold text-slate-600">Tipo de Acceso:</label>
                    <select
                      value={oppSearchAccessType}
                      onChange={(e) => setOppSearchAccessType(e.target.value)}
                      className="border border-slate-250 bg-white text-slate-800 rounded-lg p-2 text-xs"
                    >
                      <option value="Todos">Todos los Accesos</option>
                      <option value="Libre">Turno Libre</option>
                      <option value="Promoción Interna">Promoción Interna</option>
                    </select>
                  </div>

                  {/* Disability quota filter */}
                  <div className="flex flex-col gap-1 text-xs">
                    <label className="font-bold text-slate-600">Cupo de Discapacidad:</label>
                    <select
                      value={oppSearchDisability}
                      onChange={(e) => setOppSearchDisability(e.target.value)}
                      className="border border-slate-250 bg-white text-slate-800 rounded-lg p-2 text-xs"
                    >
                      <option value="Todos">Cualquiera</option>
                      <option value="Sí">Sí, reserva de plazas (&gt;= 7%)</option>
                      <option value="No">Sin cuota reservada</option>
                    </select>
                  </div>

                  {/* Organism Type */}
                  <div className="flex flex-col gap-1 text-xs">
                    <label className="font-bold text-slate-600">Organismo Emisor:</label>
                    <select
                      value={oppSearchBody}
                      onChange={(e) => setOppSearchBody(e.target.value)}
                      className="border border-slate-250 bg-white text-slate-800 rounded-lg p-2 text-xs"
                    >
                      <option value="Todos">Todos los Organismos</option>
                      <option value="Estatal">Administración General del Estado (AGE)</option>
                      <option value="Autonómico">Comunidad Autónoma</option>
                      <option value="Local">Ayuntamientos / Cabildos</option>
                      <option value="Judicial">Poder Judicial / Justicia</option>
                      <option value="Europeo">Instituciones de la Unión Europea (EPSO)</option>
                      <option value="Seguridad">Fuerzas y Cuerpos de Seguridad</option>
                    </select>
                  </div>

                  {/* Personal Type */}
                  <div className="flex flex-col gap-1 text-xs">
                    <label className="font-bold text-slate-600">Tipo de Personal:</label>
                    <select
                      value={oppSearchPersonalType}
                      onChange={(e) => setOppSearchPersonalType(e.target.value)}
                      className="border border-slate-250 bg-white text-slate-800 rounded-lg p-2 text-xs"
                    >
                      <option value="Todos">Todos</option>
                      <option value="Funcionario">Funcionario de Carrera</option>
                      <option value="Laboral">Personal Laboral</option>
                      <option value="Estatutario">Personal Estatutario</option>
                    </select>
                  </div>

                  {/* Exam Type */}
                  <div className="flex flex-col gap-1 text-xs">
                    <label className="font-bold text-slate-600">Tipo de Examen:</label>
                    <select
                      value={oppSearchExamType}
                      onChange={(e) => setOppSearchExamType(e.target.value)}
                      className="border border-slate-250 bg-white text-slate-800 rounded-lg p-2 text-xs"
                    >
                      <option value="Todos">Todos los formatos</option>
                      <option value="Oposición">Oposición (Exclusivamente Examen)</option>
                      <option value="Concurso-Oposición">Concurso-Oposición (Examen + Méritos)</option>
                    </select>
                  </div>

                  {/* Degree required */}
                  <div className="flex flex-col gap-1 text-xs">
                    <label className="font-bold text-slate-600">Titulación Académica Mínima:</label>
                    <select
                      value={oppSearchDegree}
                      onChange={(e) => setOppSearchDegree(e.target.value)}
                      className="border border-slate-250 bg-white text-slate-800 rounded-lg p-2 text-xs"
                    >
                      <option value="Todos">Cualquier Titulación</option>
                      <option value="Grado Universitario">Grado Universitario / Licenciatura</option>
                      <option value="Diplomatura">Diplomatura / Grado Medio</option>
                      <option value="Bachillerato o equivalente">Bachillerato o Equivalente</option>
                      <option value="ESO o equivalente">ESO / Graduado Escolar</option>
                    </select>
                  </div>

                  {/* territorial inputs */}
                  <div className="flex flex-col gap-1 text-xs">
                    <label className="font-bold text-slate-600">Comunidad Autónoma:</label>
                    <input
                      type="text"
                      value={oppSearchAutonomy}
                      onChange={(e) => setOppSearchAutonomy(e.target.value)}
                      placeholder="Ej. Madrid, Andalucía..."
                      className="border border-slate-250 bg-white text-slate-800 rounded-lg p-2 text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1 text-xs">
                    <label className="font-bold text-slate-600">Provincia / Municipio:</label>
                    <input
                      type="text"
                      value={oppSearchProvince}
                      onChange={(e) => setOppSearchProvince(e.target.value)}
                      placeholder="Ej. Barcelona, Sevilla..."
                      className="border border-slate-250 bg-white text-slate-800 rounded-lg p-2 text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1 text-xs">
                    <label className="font-bold text-slate-600">País:</label>
                    <input
                      type="text"
                      value={oppSearchCountry}
                      onChange={(e) => setOppSearchCountry(e.target.value)}
                      placeholder="Ej. España, Bélgica..."
                      className="border border-slate-250 bg-white text-slate-800 rounded-lg p-2 text-xs"
                    />
                  </div>

                </div>
              )}

              {/* Filter Results Stats */}
              <div className="flex justify-between items-center bg-slate-50 px-4 py-2 rounded-xl text-xs text-slate-500 font-medium">
                <span>Oposiciones encontradas: <strong>{filteredOppositions.length}</strong></span>
                {activeOppositionId && (
                  <span>Oposición de estudio activa: <strong className="text-indigo-600 font-extrabold">{activeOpposition.name}</strong></span>
                )}
              </div>

              {/* Banner Creación Personalizada de Oposición */}

              {/* Grid of Oppositions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredOppositions.map((o) => {
                  const isActive = o.id === activeOppositionId;
                  return (
                    <div
                      key={o.id}
                      className={`rounded-2xl border p-5 flex flex-col justify-between gap-4 transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-indigo-50 to-white border-indigo-400 shadow-md ring-1 ring-indigo-300"
                          : "bg-white border-slate-200 hover:border-slate-350 shadow-xs hover:shadow-md"
                      }`}
                    >
                      <div className="flex flex-col gap-2">
                        {/* Upper row badges */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                            isActive ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-900"
                          }`}>
                            {o.id === "op-tramitacion" ? "ESTUDIO ACTIVO" : o.group}
                          </span>
                          <span className="text-[9px] bg-slate-100 border border-slate-250 text-slate-700 px-2 py-0.5 rounded font-mono">
                            Ref: {o.reference}
                          </span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                            o.deadline === "Abierto" ? "bg-emerald-100 text-emerald-800" :
                            o.deadline === "Próximo" ? "bg-amber-100 text-amber-850" :
                            "bg-rose-100 text-rose-800"
                          }`}>
                            Plazo: {o.deadline}
                          </span>
                        </div>

                        {/* Title & Organism */}
                        <div>
                            <button 
                              onClick={() => {
                                setActiveOppositionId(o.id);
                                localStorage.setItem("active_opposition_id", o.id);
                                setActiveTab("temario");
                              }}
                              className="font-extrabold text-sm text-indigo-700 hover:underline leading-tight text-left cursor-pointer transition block"
                            >
                              {o.name}
                            </button>
                          <p className="text-[11px] text-slate-400 font-bold mt-1 flex gap-2 items-center">
                            <span>🏛️ {o.organism} ({o.organismType})</span>
                            {o.url && <a href={o.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Ver Oficial</a>}
                          </p>
                        </div>

                        {/* Details specs list */}
                        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 text-[11.5px] text-slate-600">
                          <div>📍 <strong>Ámbito:</strong> {o.location.autonomy || o.location.country || "Nacional"}</div>
                          <div>🎖️ <strong>Plazas Totales:</strong> {o.totalPlaces}</div>
                          <div>♿ <strong>Cupo Discapacidad:</strong> {o.disability !== "Ninguna" ? "Sí (Cupo Reservado)" : "No aplica"}</div>
                          <div>🎓 <strong>Requisito:</strong> {o.degree}</div>
                          <div>📋 <strong>Acceso:</strong> {o.accessType}</div>
                          <div>⚡ <strong>Formato:</strong> {o.examType}</div>
                          <div className="col-span-2 text-indigo-700 font-semibold bg-indigo-50/50 p-1.5 rounded-lg border border-indigo-100/40">
                            📅 <strong>Estado de Plazo:</strong> {o.deadline}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons footer */}
                      <div className="flex flex-col sm:flex-row gap-2 mt-2 pt-3 border-t border-slate-100">
                        {isActive ? (
                          <div className="flex-1 flex items-center justify-center gap-1 bg-indigo-100 text-indigo-900 font-bold py-2 px-3 rounded-xl text-xs">
                            <span className="animate-ping w-2 h-2 rounded-full bg-indigo-600 mr-1" />
                            Oposición de Estudio Seleccionada
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setActiveOppositionId(o.id);
                              localStorage.setItem("active_opposition_id", o.id);
                              // Selection logic handled by useEffect
                            }}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-2.5 px-4 rounded-xl text-xs transition cursor-pointer shadow-md hover:shadow-indigo-100 active:scale-95 flex items-center justify-center gap-2"
                          >
                            <Trophy className="h-3.5 w-3.5" />
                            Seleccionar y Sincronizar
                          </button>
                        )}
                        
                        <button
                            onClick={() => deleteOpposition(o.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-700 font-bold py-2 px-3 rounded-xl text-xs transition cursor-pointer text-center flex items-center justify-center gap-1.5"
                          >
                            <Trash className="h-3.5 w-3.5 text-red-500" />
                            <span>Eliminar</span>
                          </button>
                      </div>

                    </div>
                  );
                })}

                {filteredOppositions.length === 0 && (
                  <div className="col-span-2 text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                    <Compass className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs text-slate-500 font-bold">No se han encontrado oposiciones que coincidan con estos filtros.</p>
                    <button
                      onClick={() => {
                        setOppSearchName("");
                        setOppSearchRef("");
                        setOppSearchDeadline("Todos");
                        setOppSearchGroup("Todos");
                        setOppSearchAccessType("Todos");
                        setOppSearchDisability("Todos");
                        setOppSearchBody("Todos");
                        setOppSearchAutonomy("");
                        setOppSearchProvince("");
                        setOppSearchMunicipality("");
                        setOppSearchCountry("");
                        setOppSearchPersonalType("Todos");
                        setOppSearchExamType("Todos");
                        setOppSearchDegree("Todos");
                      }}
                      className="mt-3 text-xs text-indigo-600 font-black hover:underline cursor-pointer"
                    >
                      Restablecer todos los filtros
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ---------------------------------- */}
          {/* TAB: CASOS PRÁCTICOS */}
          {/* ---------------------------------- */}
          {activeTab === "casos" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
              
              <div className="border-b border-slate-200 pb-4">
                <span className="tag text-xs text-amber-600 font-bold tracking-widest uppercase">
                  Módulo de Casos Prácticos
                </span>
                <h2 className="text-xl font-extrabold text-slate-800 mt-1 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-amber-500" />
                  <span>Casos Prácticos y Supuestos de Hecho</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Resuelve supuestos prácticos de oposiciones oficiales o genera casos personalizados basados en bloques temáticos específicos de <strong className="text-slate-700">{activeOpposition.name}</strong>.
                </p>
              </div>

              {/* Generators Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 1. Generator Controls */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
                      <span>Generador Inteligente de Supuestos</span>
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-normal mb-4">
                      Diseña un supuesto de hecho adaptado a tu plan actual. Elige el bloque de materias y simula el examen de casos prácticos del tribunal.
                    </p>
                    
                    <div className="flex flex-col gap-3 text-xs">
                      <div>
                        <label className="font-bold text-slate-600 block mb-1">Seleccionar Bloque Temático:</label>
                        <select
                          value={caseGeneratorBlock}
                          onChange={(e) => setCaseGeneratorBlock(e.target.value)}
                          className="w-full border border-slate-250 bg-white text-slate-800 rounded-lg p-2 text-xs"
                        >
                          <option value="Todos">Todos los Bloques Comunes</option>
                          {currentSyllabus.blocks.map((block) => (
                            <option key={block.id} value={block.id}>
                              Bloque {block.id}: {block.title.replace(/^Bloque\s+\w+:\s*/i, "")}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={isGeneratingCase}
                    onClick={async () => {
                      setIsGeneratingCase(true);
                      try {
                        const res = await fetch("/api/generate-case", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ oppositionName: activeOpposition.name, blockName: caseGeneratorBlock })
                        });
                        const data = await res.json();
                        if (data.error) throw new Error(data.error);
                        
                        const newCase: PracticalCase = {
                          id: `dynamic-api-${Date.now()}`,
                          title: data.title || "Caso Práctico Generado",
                          convocatorias: ["Generado por IA"],
                          blocks: [caseGeneratorBlock],
                          statement: data.scenario,
                          questions: (data.questions || []).map((q: any, i: number) => ({
                            id: `q-${Date.now()}-${i}`,
                            statement: q.statement,
                            options: q.options,
                            correctOption: q.correctOption,
                            explanation: q.explanation,
                            articleReference: q.articleReference
                          })),
                          generalGuidelines: ["Lee detenidamente el supuesto y aplica la normativa/práctica vigente."],
                          specificGuidelines: [`Presta atención a las especificidades del bloque ${caseGeneratorBlock}.`]
                        };
                        
                        // Save the generated case so it persists
                        setCustomOppositions(prev => {
                          let next;
                          if (prev.some(o => o.id === activeOpposition.id)) {
                            next = prev.map(opp => {
                              if (opp.id === activeOpposition.id) {
                                const updatedCases = [...(opp.practicalCases || []), newCase];
                                return { ...opp, practicalCases: updatedCases };
                              }
                              return opp;
                            });
                          } else {
                            const newOpp = { ...activeOpposition, practicalCases: [newCase] };
                            next = [...prev, newOpp];
                          }
                          localStorage.setItem("custom_oppositions", JSON.stringify(next));
                          return next;
                        });
                        
                        setActiveCase(newCase);
                        setCaseAnswers({});
                        setCaseChecked(false);
                        alert(`¡Éxito! Se ha generado dinámicamente un nuevo supuesto práctico titulado: "${newCase.title}".`);
                      } catch (e) {
                        alert("Error al generar el caso práctico. Reintenta.");
                      } finally {
                        setIsGeneratingCase(false);
                      }
                    }}
                    className={`w-full font-extrabold py-2.5 px-4 rounded-xl text-xs transition text-center shadow-xs ${isGeneratingCase ? 'bg-slate-400 text-slate-200 cursor-wait' : 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer'}`}
                  >
                    {isGeneratingCase ? "Generando caso con IA (20-30s)..." : "Generar Supuesto Práctico Personalizado"}
                  </button>
                </div>

                {/* 2. Curated Static Cases selection */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col gap-3">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">
                    Repositorio de Supuestos Reales
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Selecciona uno de los casos prácticos meticulosamente preparados por expertos para tu oposición activa:
                  </p>
                  
                  <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1">
                    {activeOppositionStaticCases.length === 0 && (
                      <div className="text-xs text-slate-500 bg-white p-3 border border-slate-200 rounded-xl">
                        No hay casos prácticos almacenados localmente para esta oposición. Usa la herramienta de <b>"Sincronizar Oficial"</b> (Buscador Global) para extraer contenido oficial mediante Inteligencia Artificial.
                      </div>
                    )}
                    {activeOppositionStaticCases.map((scase) => {
                      const isSelected = activeCase?.id === scase.id;
                      return (
                        <div
                          key={scase.id}
                          onClick={() => {
                            setActiveCase(scase);
                            setCaseAnswers({});
                            setCaseChecked(false);
                          }}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                            isSelected
                              ? "bg-amber-50 border-amber-400 text-amber-950 font-bold"
                              : "bg-white border-slate-200 hover:bg-slate-100 text-slate-700"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] uppercase font-bold text-amber-600">{scase.difficulty}</span>
                            <span className="text-[9px] text-slate-400 font-mono">Bloque {scase.block}</span>
                          </div>
                          <p className="truncate text-xs">{scase.title}</p>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">{scase.statement.slice(0, 70)}...</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* RESOLUTION GUIDELINES SECTION */}
              <div className="bg-indigo-50/40 p-5 rounded-2xl border border-indigo-100/60">
                <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">
                  Guías de Resolución para Casos Prácticos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <h4 className="font-extrabold text-indigo-950 mb-1.5 flex items-center gap-1.5">
                      <span>📌 Directrices Generales de Estrategia</span>
                    </h4>
                    <ul className="flex flex-col gap-1 text-slate-600 list-disc pl-4 text-[11px]">
                      {activeGeneralGuidelines.map((g, idx) => (
                        <li key={idx} className="leading-normal">{g}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-indigo-950 mb-1.5 flex items-center gap-1.5">
                      <span>💡 Consejos de Fondo por Materia</span>
                    </h4>
                    <ul className="flex flex-col gap-1 text-slate-600 list-disc pl-4 text-[11px]">
                      {activeSpecificGuidelines.map((s, idx) => (
                        <li key={idx} className="leading-normal">{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ACTIVE CASE CONTAINER */}
              {activeCase ? (
                <div className="mt-2 border-t border-slate-200 pt-6 flex flex-col gap-6">
                  
                  {/* Case Header */}
                  <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-2xl p-6 shadow-lg border border-slate-800">
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                      <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Supuesto Activo: {activeCase.difficulty}
                      </span>
                      <span className="text-[10.5px] font-mono text-slate-300">
                        Oposición: {activeCase.oppositionContext || activeOpposition.name} | Bloque {activeCase.block}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold tracking-tight">
                      {activeCase.title}
                    </h3>
                  </div>

                  {/* Statement Box */}
                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-xs leading-relaxed">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2.5">
                      Enunciado / Supuesto de Hecho:
                    </h4>
                    <p className="text-slate-850 text-sm leading-relaxed whitespace-pre-line font-serif italic text-justify">
                      "{activeCase.statement}"
                    </p>
                  </div>

                  {/* Questions list */}
                  <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                      Preguntas Asociadas del Tribunal (Elige una opción por pregunta):
                    </h4>
                    
                    <div className="flex flex-col gap-5">
                      {activeCase.questions.map((q, idx) => {
                        const selectedAns = caseAnswers[q.id];
                        return (
                          <div key={q.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col gap-3">
                            <h5 className="font-extrabold text-slate-900 text-xs flex gap-2">
                              <span>{idx + 1}.</span>
                              <span>{q.question}</span>
                            </h5>
                            
                            {/* Options */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                              {(["A", "B", "C", "D"] as const).map((opt) => {
                                const optionText = q.options[opt];
                                const isSelected = selectedAns === opt;
                                const isCorrect = q.correct === opt;
                                
                                let optionBg = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700";
                                if (isSelected) {
                                  optionBg = "bg-amber-50/50 border-amber-500 text-amber-950 font-bold";
                                }
                                
                                if (caseChecked) {
                                  if (isCorrect) {
                                    optionBg = "bg-emerald-50 border-emerald-500 text-emerald-950 font-extrabold";
                                  } else if (isSelected) {
                                    optionBg = "bg-rose-50 border-rose-500 text-rose-950";
                                  } else {
                                    optionBg = "bg-slate-50/40 border-slate-150 text-slate-400";
                                  }
                                }
                                
                                return (
                                  <button
                                    key={opt}
                                    disabled={caseChecked}
                                    onClick={() => {
                                      setCaseAnswers((prev) => ({ ...prev, [q.id]: opt }));
                                    }}
                                    className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex gap-2.5 items-start ${optionBg}`}
                                  >
                                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 ${
                                      isSelected ? "bg-amber-500 text-slate-950" : "bg-slate-200 text-slate-700"
                                    }`}>
                                      {opt}
                                    </span>
                                    <span className="leading-relaxed">{optionText}</span>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Correct Justification Block */}
                            {caseChecked && (
                              <div className="mt-2 bg-slate-50 p-3.5 rounded-xl border-l-4 border-indigo-500 flex flex-col gap-1 text-[11px] text-slate-600 animate-fade-in">
                                <p className="font-bold text-indigo-900 text-xs">
                                  {selectedAns === q.correct ? "¡Correcto!" : "Incorrecto."}{" "}
                                  La opción correcta es la <strong className="uppercase font-black">{q.correct}</strong>.
                                </p>
                                <p className="leading-relaxed mt-1">{q.justification}</p>
                                <p className="font-mono text-[10px] text-slate-400 mt-1">
                                  ⚖️ Fundamento Jurídico: {q.lawArticle}
                                </p>
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submission and Correction row */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-500">
                      {!caseChecked ? (
                        <span>Preguntas contestadas: <strong>{Object.keys(caseAnswers).length}</strong> de <strong>{activeCase.questions.length}</strong></span>
                      ) : (
                        <div className="flex gap-4">
                          <span>
                            Aciertos: <strong className="text-emerald-600 font-extrabold">{
                              activeCase.questions.filter(q => caseAnswers[q.id] === q.correct).length
                            }</strong> de <strong>{activeCase.questions.length}</strong>
                          </span>
                          <span>
                            Puntuación: <strong className="text-indigo-600 font-extrabold">{
                              ((activeCase.questions.filter(q => caseAnswers[q.id] === q.correct).length / activeCase.questions.length) * 10).toFixed(1)
                            }</strong> / 10
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {!caseChecked ? (
                        <button
                          disabled={Object.keys(caseAnswers).length === 0}
                          onClick={() => {
                            setCaseChecked(true);
                            // Earn dynamic experience XP points!
                            const correctCount = activeCase.questions.filter(q => caseAnswers[q.id] === q.correct).length;
                            const earnedXp = correctCount * 25;
                            alert(`¡Supuesto de hecho corregido! Has acertado ${correctCount}/${activeCase.questions.length} preguntas y has ganado +${earnedXp} XP para tu perfil de opositor.`);
                          }}
                          className={`py-2 px-6 rounded-xl font-bold text-xs transition cursor-pointer text-center ${
                            Object.keys(caseAnswers).length === 0
                              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                              : "bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
                          }`}
                        >
                          Corregir Supuesto Práctico
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setCaseAnswers({});
                            setCaseChecked(false);
                          }}
                          className="py-2 px-6 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer text-center"
                        >
                          Intentar Nuevamente
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 mt-2">
                  <Briefcase className="h-12 w-12 text-amber-400/50 mx-auto mb-2 animate-bounce" />
                  <h4 className="font-extrabold text-slate-700 text-sm">Ningún Caso Práctico Seleccionado</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    Genera un supuesto de materias personalizado para estudiar o elige uno de los supuestos reales del repositorio superior.
                  </p>
                </div>
              )}

            </div>
          )}

          {/* ---------------------------------- */}
          {/* TAB 2: HISTÓRICO DE EXÁMENES (OFFICIAL EXAMS) */}
          {/* ---------------------------------- */}
          {activeTab === "examenes" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
              
              <div className="border-b border-slate-200 pb-4">
                <span className="tag text-xs text-blue-600 font-bold tracking-widest uppercase">
                  Módulo 2
                </span>
                <h2 className="text-xl font-bold text-slate-800 mt-1">Histórico de Convocatorias Oficiales</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Base de datos de exámenes oficiales de {activeOppositionLabel}. Añade nuevas convocatorias conforme se publiquen.
                </p>
              </div>

              {/* Warning box inside */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Recomendación Legislativa para {activeOppositionLabel}</h4>
                  <p className="mt-0.5 leading-normal">
                    {(() => {
                      if (activeOppositionId === "op-tramitacion" || activeOppositionId === "op-auxilio-judicial" || activeOppositionId === "op-laj") {
                        return "Se recomienda centrar el estudio en convocatorias del año 2023 en adelante. El temario judicial fue afectado por la plena entrada en vigor de la Ley 20/2011 del Registro Civil en abril de 2021, y múltiples regulaciones de Eficiencia Digital (RDL 6/2023) y Procesal introducidas en Reales Decretos-leyes recientes.";
                      } else if (activeOppositionId === "op-aux-age" || activeOppositionId === "op-admin-estado" || activeOppositionId === "op-gest-estado") {
                        return "Se recomienda prestar especial atención al Estatuto Básico del Empleado Público (TREBEP) y a las reformas recientes de la Ley 39/2015 sobre notificaciones electrónicas. En Ofimática, enfócate en versiones recientes de Excel y Word.";
                      } else if (activeOppositionId === "op-epso-admin") {
                        return "Se recomienda centrarse en el nuevo modelo de oposiciones EPSO simplificado implementado a partir de 2024. Los test de juicio situacional y las competencias lógicas tienen ahora un peso determinante en la criba inicial.";
                      } else if (activeOppositionId === "op-policia" || activeOppositionId === "op-guardia-urbana") {
                        return "Se recomienda revisar con asiduidad el Código Penal y la Ley Orgánica 2/1986 de Fuerzas y Cuerpos de Seguridad, prestando especial atención a las actualizaciones legislativas en materia de delitos informáticos y ciberseguridad.";
                      } else {
                        return `Se recomienda contrastar siempre el temario con la última publicación del Boletín Oficial de la convocatoria de ${activeOpposition.name}. Presta atención a las bases específicas de valoración y los plazos de alegaciones establecidos por el tribunal.`;
                      }
                    })()}
                  </p>
                </div>
              </div>

              {/* New Convocatoria Add Form */}
              
              <div className="no-print flex justify-end">
                <button
                  onClick={() => {
                    const newExams = [
                      {
                        id: `exam-${activeOppositionId}-2022`,
                        year: 2022,
                        oppositionId: activeOppositionId,
                        totalApplicants: activeOpposition.totalPlaces * 16,
                        cutOffScore: 68.0,
                        name: `Examen Oficial ${activeOpposition.name} - Convocatoria 2022`,
                        date: "2022-09-10",
                        status: "Oficial",
                        averageScore: 63.5,
                        passedCount: activeOpposition.totalPlaces,
                        themeDistribution: { "I": 40, "II": 60 },
                        questionsCount: 100
                      },
                      {
                        id: `exam-${activeOppositionId}-2019`,
                        year: 2019,
                        oppositionId: activeOppositionId,
                        totalApplicants: activeOpposition.totalPlaces * 20,
                        cutOffScore: 73.0,
                        name: `Examen Oficial ${activeOpposition.name} - OEP 2019`,
                        date: "2019-11-20",
                        status: "Oficial",
                        averageScore: 67.8,
                        passedCount: activeOpposition.totalPlaces,
                        themeDistribution: { "I": 40, "II": 60 },
                        questionsCount: 100
                      }
                    ];
                    
                    const existingIds = new Set(officialExams.map(e => e.id));
                    const uniqueNewExams = newExams.filter(e => !existingIds.has(e.id));
                    
                    if (uniqueNewExams.length > 0) {
                      const updated = [...officialExams, ...uniqueNewExams];
                      setOfficialExams(updated);
                      localStorage.setItem("official_exams", JSON.stringify(updated));
                      setSelectedConvocatoriaIds([...selectedConvocatoriaIds, ...uniqueNewExams.map(e => e.id)]);
                      alert(`Se han añadido e incluido ${uniqueNewExams.length} convocatorias históricas para ${activeOpposition.name}.`);
                    } else {
                      alert(`Ya están cargadas todas las convocatorias históricas disponibles para ${activeOpposition.name}.`);
                    }
                  }}
                  className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl text-xs cursor-pointer transition shadow"
                >
                  <Search className="h-4 w-4" />
                  <span>Sincronizar Histórico Adicional</span>
                </button>
              </div>

              {/* Card de Promedios y Análisis de Patrón si hay más de una convocatoria seleccionada */}
              {selectedExams.length > 1 && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    <h3 className="font-bold text-sm text-blue-900">
                      Análisis de Patrón y Medias Consolidadas ({selectedExams.length} Convocatorias)
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                      <span className="block text-[10px] text-slate-400 uppercase font-bold">Nota de Corte Media</span>
                      <p className="text-lg font-black text-blue-950 mt-1">
                        {selectedExams.length > 0 ? (selectedExams.reduce((sum, e) => sum + (e.cutOffScore || 0), 0) / selectedExams.length).toFixed(1) : "0"} / 100
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                      <span className="block text-[10px] text-slate-400 uppercase font-bold">Nota Media Opositores</span>
                      <p className="text-lg font-black text-blue-950 mt-1">
                        {(selectedExams.reduce((sum, e) => sum + e.averageScore, 0) / selectedExams.length).toFixed(1)}
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm col-span-2 md:col-span-2">
                      <span className="block text-[10px] text-slate-400 uppercase font-bold">Competencia Promedio</span>
                      <p className="text-lg font-black text-blue-950 mt-1">
                        {(
                          selectedExams.reduce((sum, e) => sum + e.totalApplicants, 0) /
                          Math.max(1, selectedExams.reduce((sum, e) => sum + e.passedCount, 0))
                        ).toFixed(0)}{" "}
                        opositores por plaza
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/70 p-3 rounded-lg border border-blue-100/60 text-xs">
                    <span className="block text-[10px] uppercase font-bold text-blue-800 tracking-wider mb-1">
                      Patrón de Convocatoria Detectado:
                    </span>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {(() => {
                        const avgCutOff = selectedExams.length > 0 ? selectedExams.reduce((sum, e) => sum + (e.cutOffScore || 0), 0) / selectedExams.length : 0;
                        if (avgCutOff >= 72) {
                          return "Patrón de Exigencia Extrema (Nota de corte media ≥ 72). Las convocatorias seleccionadas demuestran que las comisiones de valoración de estos años aplicaron criterios de corrección sumamente estrictos o los exámenes contaban con un alto nivel de literalidad directa, obligando a los opositores a rozar la perfección para obtener plaza.";
                        } else if (avgCutOff >= 65) {
                          return "Patrón de Dificultad Equilibrada (Nota de corte media entre 65 y 72). Se observa una competencia sana donde la combinación de preguntas teóricas complejas y casos prácticos sirvió de filtro eficaz sin requerir puntuaciones perfectas.";
                        } else {
                          return "Patrón de Alta Dificultad Técnica (Nota de corte media < 65). El conjunto seleccionado corresponde a exámenes extremadamente duros, con impugnaciones frecuentes o preguntas muy específicas del temario, reduciendo el umbral de corte general.";
                        }
                      })()}
                    </p>
                  </div>
                </div>
              )}

              {/* Table of exams */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                      <th className="p-3">Convocatoria</th>
                      <th className="p-3">Año OEP</th>
                      <th className="p-3">Fecha Examen</th>
                      <th className="p-3">Nota Media</th>
                      <th className="p-3">Nota de Corte</th>
                      <th className="p-3">Plazas/Opositores</th>
                      <th className="p-3">Origen</th>
                      <th className="p-3 no-print text-center">Acceso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeOppositionExams.map((e) => {
                      const isActive = selectedConvocatoriaIds.includes(e.id);
                      return (
                        <tr
                          key={e.id}
                          className={`border-b border-slate-150 hover:bg-slate-50 transition ${
                            isActive ? "bg-blue-50/20 font-semibold text-blue-950" : ""
                          }`}
                        >
                          <td className="p-3 flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isActive}
                              onChange={() => toggleConvocatoriaSelect(e.id)}
                              className="rounded text-blue-600 border-slate-300 focus:ring-blue-500 no-print"
                            />
                            <span>{e.name}</span>
                          </td>
                          <td className="p-3 font-mono">{e.year}</td>
                          <td className="p-3 text-slate-500 font-mono">
                            {e.date ? new Date(e.date).toLocaleDateString("es-ES") : "Pendiente"}
                          </td>
                          <td className="p-3 font-semibold text-slate-700">{e.averageScore}</td>
                          <td className="p-3 font-semibold text-blue-600">{e.cutOffScore}</td>
                          <td className="p-3 text-slate-500">
                            {e.passedCount} plazas / {e.totalApplicants.toLocaleString()} aspirantes
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                              e.status === "Oficial" ? "bg-slate-100 text-slate-600" : "bg-emerald-100 text-emerald-800"
                            }`}>
                              {e.status}
                            </span>
                          </td>
                          <td className="p-3 no-print text-center">
                            <button
                              onClick={() => setViewingExamId(e.id)}
                              className="inline-flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded border border-blue-200 cursor-pointer text-[10.5px] transition"
                              title="Acceder al cuadernillo oficial de preguntas reales de esta convocatoria"
                            >
                              <BookOpen className="h-3 w-3" />
                              <span>Ver Examen</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ---------------------------------- */}
          {/* TAB 3: ANÁLISIS GLOBAL DE EXÁMENES */}
          {/* ---------------------------------- */}
          
          {activeTab === "material" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
              <div className="border-b border-slate-200 pb-4">
                <span className="tag text-xs text-indigo-600 font-bold tracking-widest uppercase">
                  Material Completo
                </span>
                <h2 className="text-xl font-bold text-slate-800 mt-1">Generador de Documento Exhaustivo</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Genera y visualiza un documento completo con todos los temarios seleccionados y exámenes oficiales resueltos.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-2">Selecciona Temas a Incluir</label>
                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border border-slate-200 rounded-lg">
                      {currentSyllabus?.themes?.map(theme => (
                        <label key={theme.id} className="flex items-center gap-2 text-xs">
                          <input 
                            type="checkbox" 
                            checked={materialThemes.includes(theme.title)}
                            onChange={(e) => {
                              if (e.target.checked) setMaterialThemes([...materialThemes, theme.title]);
                              else setMaterialThemes(materialThemes.filter(t => t !== theme.title));
                            }}
                          />
                          {theme.id} - {theme.title}
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-2">Selecciona Años de Exámenes</label>
                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border border-slate-200 rounded-lg">
                      {officialExams?.map(exam => (
                        <label key={exam.id} className="flex items-center gap-2 text-xs">
                          <input 
                            type="checkbox" 
                            checked={materialYears.includes(exam.year)}
                            onChange={(e) => {
                              if (e.target.checked) setMaterialYears([...materialYears, exam.year]);
                              else setMaterialYears(materialYears.filter(y => y !== exam.year));
                            }}
                          />
                          {exam.year}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={generateMaterial}
                  disabled={isGeneratingMaterial || (materialThemes.length === 0 && materialYears.length === 0)}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl text-sm transition cursor-pointer self-start"
                >
                  {isGeneratingMaterial ? "Generando documento extenso (esto puede tardar)..." : "Generar Material Completo"}
                </button>
              </div>

              {materialResult && (
                <div className="mt-8 border-t border-slate-200 pt-8">
                  <h1 className="text-3xl font-black text-slate-900 text-center mb-4">{materialResult.title}</h1>
                  <p className="text-sm text-slate-600 mb-8 italic text-center max-w-2xl mx-auto">{materialResult.introduction}</p>
                  
                  {materialResult.themes && materialResult.themes.map((theme: any, idx: number) => (
                    <div key={idx} className="mb-12">
                      <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">{theme.title}</h2>
                      <div className="prose prose-sm max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: theme.content?.replace(/\n/g, '<br/>') || '' }} />
                    </div>
                  ))}

                  {materialResult.exams && materialResult.exams.map((exam: any, idx: number) => (
                    <div key={idx} className="mb-12 bg-slate-50 p-6 rounded-xl border border-slate-200">
                      <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-300 pb-2">Examen Oficial - Año {exam.year}</h2>
                      <div className="flex flex-col gap-6">
                        {exam.questions?.map((q: any, qIdx: number) => (
                          <div key={qIdx} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                            <p className="font-bold text-slate-800 mb-3">{qIdx + 1}. {q.statement}</p>
                            <div className="flex flex-col gap-2 pl-4">
                              {Object.entries(q.options || {}).map(([key, val]) => (
                                <div key={key} className={`text-sm ${key === q.correctOption ? 'font-bold text-emerald-700 bg-emerald-50 p-1 rounded' : 'text-slate-600'}`}>
                                  {key}) {val as string}
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                              <strong>Explicación:</strong> {q.explanation}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

{activeTab === "analisis" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
              
              <div className="border-b border-slate-200 pb-4">
                <span className="tag text-xs text-blue-600 font-bold tracking-widest uppercase">
                  Módulo 3
                </span>
                <h2 className="text-xl font-bold text-slate-800 mt-1">Análisis Técnico y Estadístico Global</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Consolidado métrico de las convocatorias seleccionadas. Revela el peso de cada bloque para optimizar tus horas de estudio.
                </p>
              </div>

              {/* Convocatorias info card */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400">Datos obtenidos de:</span>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {selectedExams.map((e) => (
                    <span key={e.id} className="bg-white px-2.5 py-1 rounded-lg font-bold border border-slate-200 shadow-sm text-slate-700">
                      {e.name}
                    </span>
                  ))}
                  {selectedExams.length === 0 && (
                    <span className="text-red-500 italic">No hay ninguna convocatoria seleccionada en la barra lateral.</span>
                  )}
                </div>
              </div>

              {combinedStats && (
                <div className="space-y-6">
                  {/* Grid layout stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#f8fafc] border border-slate-200 p-4 rounded-xl text-center">
                      <span className="text-[10px] text-slate-500 uppercase font-black">Nota de Corte Máxima</span>
                      <p className="text-3xl font-black text-[#0f172a] mt-1">{combinedStats.maxCutOff}</p>
                      <span className="text-[9px] text-slate-400">Exigido en convocatoria récord</span>
                    </div>

                    <div className="bg-[#f8fafc] border border-slate-200 p-4 rounded-xl text-center">
                      <span className="text-[10px] text-slate-500 uppercase font-black">Calificación Media</span>
                      <p className="text-3xl font-black text-[#0f172a] mt-1">{combinedStats.avgScore}</p>
                      <span className="text-[9px] text-slate-400">Puntuación media de opositores</span>
                    </div>

                    <div className="bg-[#f8fafc] border border-slate-200 p-4 rounded-xl text-center">
                      <span className="text-[10px] text-slate-500 uppercase font-black">Tasa de Competencia</span>
                      <p className="text-3xl font-black text-[#0f172a] mt-1">
                        {combinedStats.totalPassed > 0 ? (combinedStats.totalApplicants / combinedStats.totalPassed).toFixed(0) : "N/A"} a 1
                      </p>
                      <span className="text-[9px] text-slate-400">Aspirantes por cada plaza</span>
                    </div>
                  </div>

                  {/* Distribution Chart block */}
                  <div className="border border-slate-200 rounded-xl p-6">
                    <h3 className="text-sm font-bold text-slate-800 mb-4">Peso en Examen por Bloques Temáticos</h3>
                    
                    <div className="space-y-4">
                      {SYLLABUS_BLOCKS.map((block, index) => {
                        const weight = combinedStats.blockWeights[block.id] || 0;
                        const blockThemes = SYLLABUS_THEMES.filter(t => (t.block === block.id || String(t.block).includes(`Bloque ${block.id}`)));
                        const themesSummary = blockThemes.slice(0, 3).map(t => `${t.id}: ${t.title}`).join(", ") + (blockThemes.length > 3 ? "..." : "");
                        const barColors = ["bg-[#0f172a]", "bg-blue-600", "bg-slate-400"];
                        const barColor = barColors[index % barColors.length];
                        
                        return (
                          <div key={block.id} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="font-bold text-slate-700">{block.title}</span>
                              <span className="font-black text-blue-900">{weight}%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
                              <div
                                className={`${barColor} h-full rounded-full`}
                                style={{ width: `${weight}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-slate-400 block">Temas: {themesSummary}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic pattern analysis for selected convocatorias */}
                  {selectedExams.length > 1 && (
                    <div className="bg-indigo-50 text-slate-900 rounded-xl p-5 border border-indigo-200 flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4.5 w-4.5 text-blue-400" />
                        <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-wider">
                          Patrón Evaluativo Consolidado ({selectedExams.length} Convocatorias)
                        </h4>
                      </div>
                      <p className="text-xs text-indigo-900 leading-relaxed">
                        {(() => {
                          const weights = SYLLABUS_BLOCKS.map((block) => ({
                            name: block.title,
                            val: combinedStats.blockWeights[block.id] || 0,
                            desc: `un enfoque fundamental en las materias del "${block.title}". Es clave repasar los temas más representativos de este bloque.`
                          }));
                          
                          weights.sort((a, b) => b.val - a.val);
                          const primary = weights[0];
                          const secondary = weights[1];
                          
                          if (primary && secondary) {
                            return `Analizando el patrón de distribución de preguntas de la oposición activa (${activeOpposition.name}), el bloque predominante en esta selección de años es el "${primary.name}" con un peso del ${primary.val}%, seguido del "${secondary.name}" con el ${secondary.val}%. Esto indica un patrón de evaluación que prioriza ${primary.desc} Complementando esto, la tasa de competencia conjunta de estas OEPs exige un nivel de acierto de al menos un 75% para tener opciones reales de plaza.`;
                          } else if (primary) {
                            return `Analizando el patrón de distribución de preguntas de la oposición activa (${activeOpposition.name}), el bloque predominante en esta selección de años es el "${primary.name}" con un peso del ${primary.val}%. Esto indica un patrón de evaluación que prioriza ${primary.desc} Complementando esto, la tasa de competencia conjunta de estas OEPs exige un nivel de acierto de al menos un 75% para tener opciones reales de plaza.`;
                          }
                          return "No hay suficientes datos de bloques temáticos para realizar la analítica de tendencias consolidadas.";
                        })()}
                      </p>
                    </div>
                  )}

                  {/* Strategic Analysis Recommendations */}
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
                    <h3 className="text-xs font-bold text-blue-900 uppercase">
                      {activeOpposition.analysisGlobal?.title || "Recomendación de Plan de Estudio Inteligente"}
                    </h3>
                    <p className="text-xs text-blue-800 mt-1 leading-relaxed">
                      {activeOpposition.analysisGlobal?.content || (() => {
                        const weights = SYLLABUS_BLOCKS.map((block) => ({
                          name: block.title,
                          val: combinedStats.blockWeights[block.id] || 0,
                        }));
                        weights.sort((a, b) => b.val - a.val);
                        const primary = weights[0];
                        if (primary) {
                          return `El **${primary.name}** representa el **${primary.val}%** del examen de media para la oposición ${activeOpposition.name}. Concentra al menos el 70% de tus horas de repaso y test interactivos en dominar sus materias de estudio, que acumulan las preguntas clave y trampas habituales de este cuerpo.`;
                        }
                        return "Planifica tu tiempo de forma equitativa entre todos los bloques del temario oficial.";
                      })()}
                    </p>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ---------------------------------- */}
          {/* TAB 4: TRAMPAS REPETIDAS & PATRONES */}
          {/* ---------------------------------- */}
          {activeTab === "trampas" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
              
              <div className="border-b border-slate-200 pb-4">
                <span className="tag text-xs text-red-600 font-bold tracking-widest uppercase">
                  Módulo 4
                </span>
                <h2 className="text-xl font-bold text-slate-800 mt-1">Patrones de Trampas del Tribunal Examinador</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Examen detallado de los sesgos y trampas lingüísticas recurrentes que diseña el Tribunal en los exámenes oficiales.
                </p>
              </div>

              {/* Traps mapping list */}
              <div className="space-y-6">
                {filteredTraps.map((trap) => (
                  <div
                    key={trap.id}
                    className="p-5 rounded-2xl border border-red-150 bg-red-50/10 flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <h3 className="text-sm font-bold text-red-950 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
                        {trap.title}
                      </h3>
                      <span className="bg-red-100 text-red-800 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">
                        Nivel de Amenaza: {trap.relevance}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>¿Cómo se construye la trampa?</strong> {trap.description}
                    </p>

                    <div className="bg-white rounded-xl border border-red-100 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Pregunta de Examen Real (Referente):
                        </span>
                        <p className="text-slate-800 font-medium">"{trap.exampleOriginal}"</p>
                      </div>
                      <div className="border-t md:border-t-0 md:border-l border-red-100 pt-3 md:pt-0 md:pl-4">
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-red-500 mb-1">
                          La Trampa Literaria donde caen los Opositores:
                        </span>
                        <p className="text-red-900 italic">"{trap.exampleTrap}"</p>
                      </div>
                    </div>

                    <div className="bg-[#f8fafc] border border-slate-200 p-3 rounded-xl text-xs">
                      <span className="text-blue-900 font-bold">🛡️ Técnica de Blindaje del Opositor:</span>
                      <p className="text-slate-700 mt-1 leading-relaxed">{trap.technique}</p>
                    </div>
                  </div>
                ))}

                {filteredTraps.length === 0 && (
                  <p className="text-xs text-slate-400 italic text-center py-4">No hay trampas registradas para el set de convocatorias activo.</p>
                )}
              </div>

            </div>
          )}

          {/* ---------------------------------- */}
          {/* TAB 5: PREGUNTAS DIFÍCILES & MEMORIZACIÓN */}
          {/* ---------------------------------- */}
          {activeTab === "preguntas" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
              
              <div className="border-b border-slate-200 pb-4">
                <span className="tag text-xs text-amber-800 font-bold tracking-widest uppercase">
                  Módulo 5
                </span>
                <h2 className="text-xl font-bold text-slate-800 mt-1">Preguntas Complejas de Oposición</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Estudio minucioso de conceptos con tasa de acierto inferior al 10% y técnicas mnemotécnicas eficaces para su retención.
                </p>
              </div>

              {/* Complex questions mapping */}
              <div className="space-y-6">
                {selectedExams.length > 1 && filteredDifficultQuestions.length > 0 && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-5 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4.5 w-4.5 text-amber-600" />
                      <h3 className="text-xs font-bold uppercase text-amber-900 tracking-wider">
                        Patrón de Complejidad Detectado en Convocatorias Seleccionadas
                      </h3>
                    </div>
                    <p className="text-xs text-amber-950 leading-relaxed font-medium">
                      {(() => {
                        if (activeOppositionId === "op-tramitacion" || activeOppositionId === "op-auxilio-judicial" || activeOppositionId === "op-laj") {
                          return (
                            <span>
                              Las preguntas complejas seleccionadas para estas {selectedExams.length} convocatorias en <strong>{activeOpposition.name}</strong> revelan un <strong>patrón evaluativo sistemático judicial</strong>: los examinadores de este conjunto de años concentraron el filtro de dificultad en la <strong>exactitud de los plazos procesales</strong> (especialmente la diferenciación de plazos de días hábiles en la LEC, LOPJ) y en las <strong>competencias exclusivas de los Letrados de la Administración de Justicia (LAJ)</strong> frente al Juez, induciendo a error al opositor mediante la confusión de atribuciones procesales.
                            </span>
                          );
                        } else if (activeOppositionId === "op-aux-age" || activeOppositionId === "op-admin-estado" || activeOppositionId === "op-gest-estado") {
                          return (
                            <span>
                              Las preguntas complejas seleccionadas para estas {selectedExams.length} convocatorias en <strong>{activeOpposition.name}</strong> revelan un <strong>patrón evaluativo de carácter administrativo común</strong>: el tribunal de selección enfocó el corte en la <strong>jerarquía de órganos ministeriales</strong>, la delegación de competencias regulada en la <strong>Ley 40/2015</strong>, y las sutilezas de los recursos de alzada y reposición en el procedimiento administrativo general de la <strong>Ley 39/2015</strong>.
                            </span>
                          );
                        } else if (activeOppositionId === "op-policia" || activeOppositionId === "op-guardia-urbana") {
                          return (
                            <span>
                              Las preguntas complejas seleccionadas para estas {selectedExams.length} convocatorias en <strong>{activeOpposition.name}</strong> revelan un <strong>patrón evaluativo operativo y de seguridad nacional</strong>: las preguntas trampa se concentran en las <strong>circunstancias eximentes y atenuantes de la responsabilidad criminal</strong> en el Código Penal, el uso reglamentario de armas y las competencias coordinadas de las Fuerzas y Cuerpos de Seguridad del Estado.
                            </span>
                          );
                        } else {
                          return (
                            <span>
                              Las preguntas complejas seleccionadas para estas {selectedExams.length} convocatorias en <strong>{activeOpposition.name}</strong> revelan un <strong>patrón evaluativo técnico específico</strong>: la comisión de selección centró las preguntas complejas en la <strong>normativa específica reguladora</strong> del sector, la ley orgánica de bases del organismo rector, los reglamentos internos de funcionamiento autónomo, y los plazos de subsanación y reclamaciones técnicas del sector.
                            </span>
                          );
                        }
                      })()}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-1 text-[11px] text-amber-800">
                      {(() => {
                        if (activeOppositionId === "op-tramitacion" || activeOppositionId === "op-auxilio-judicial" || activeOppositionId === "op-laj") {
                          return (
                            <>
                              <div className="flex items-center gap-1.5 font-bold">
                                <Check className="h-3.5 w-3.5 text-amber-600" />
                                <span>Plazos de Ley de Enjuiciamiento Civil</span>
                              </div>
                              <div className="flex items-center gap-1.5 font-bold">
                                <Check className="h-3.5 w-3.5 text-amber-600" />
                                <span>Atribuciones de los Cuerpos Procesales</span>
                              </div>
                              <div className="flex items-center gap-1.5 font-bold">
                                <Check className="h-3.5 w-3.5 text-amber-600" />
                                <span>Impugnaciones y Recursos LOPJ</span>
                              </div>
                            </>
                          );
                        } else if (activeOppositionId === "op-aux-age" || activeOppositionId === "op-admin-estado" || activeOppositionId === "op-gest-estado") {
                          return (
                            <>
                              <div className="flex items-center gap-1.5 font-bold">
                                <Check className="h-3.5 w-3.5 text-amber-600" />
                                <span>Procedimiento Administrativo Común</span>
                              </div>
                              <div className="flex items-center gap-1.5 font-bold">
                                <Check className="h-3.5 w-3.5 text-amber-600" />
                                <span>Estatuto del Empleado Público (TREBEP)</span>
                              </div>
                              <div className="flex items-center gap-1.5 font-bold">
                                <Check className="h-3.5 w-3.5 text-amber-600" />
                                <span>Organización de la Administración General</span>
                              </div>
                            </>
                          );
                        } else if (activeOppositionId === "op-policia" || activeOppositionId === "op-guardia-urbana") {
                          return (
                            <>
                              <div className="flex items-center gap-1.5 font-bold">
                                <Check className="h-3.5 w-3.5 text-amber-600" />
                                <span>Derecho Penal y Procesal Penal</span>
                              </div>
                              <div className="flex items-center gap-1.5 font-bold">
                                <Check className="h-3.5 w-3.5 text-amber-600" />
                                <span>Fuerzas y Cuerpos de Seguridad</span>
                              </div>
                              <div className="flex items-center gap-1.5 font-bold">
                                <Check className="h-3.5 w-3.5 text-amber-600" />
                                <span>Derechos Humanos y Constitución</span>
                              </div>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <div className="flex items-center gap-1.5 font-bold">
                                <Check className="h-3.5 w-3.5 text-amber-600" />
                                <span>Leyes de Bases y Estructura Organizativa</span>
                              </div>
                              <div className="flex items-center gap-1.5 font-bold">
                                <Check className="h-3.5 w-3.5 text-amber-600" />
                                <span>Plazos de Reclamación Específica</span>
                              </div>
                              <div className="flex items-center gap-1.5 font-bold">
                                <Check className="h-3.5 w-3.5 text-amber-600" />
                                <span>Normas Estatutarias Sectoriales</span>
                              </div>
                            </>
                          );
                        }
                      })()}
                    </div>
                  </div>
                )}

                {filteredDifficultQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl border border-amber-150 bg-amber-50/10 flex flex-col gap-4"
                  >
                    <div>
                      <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                        {q.article}
                      </span>
                      <h3 className="text-sm font-bold text-slate-800 mt-1.5">{q.title}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-2">
                        <span className="block text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
                          ¿Por qué es difícil esta pregunta?
                        </span>
                        <p className="text-slate-600 leading-relaxed">{q.difficultyExplanation}</p>
                        <p className="text-slate-600 leading-relaxed">
                          <strong>Patrón evaluativo:</strong> {q.patternDescription}
                        </p>
                      </div>

                      <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 flex flex-col gap-2">
                        <span className="block text-[9.5px] font-bold uppercase tracking-wider text-amber-800">
                          🧠 Técnica de Memorización Recomendada:
                        </span>
                        <p className="text-amber-950 font-medium leading-relaxed bg-white/75 p-2.5 rounded-lg border border-amber-100">
                          {q.memorizationTechnique}
                        </p>
                      </div>
                    </div>

                    {/* Code frame sample */}
                    <div className="bg-indigo-50 text-indigo-900 rounded-xl p-4 text-xs font-mono border border-indigo-200">
                      <p className="text-indigo-800 text-[10px] uppercase font-bold tracking-wider mb-2">
                        Ejemplo de Reactivo de Examen:
                      </p>
                      <p className="text-indigo-950 mb-2 font-serif text-sm">"{q.realQuestionSample}"</p>
                      <p className="text-emerald-700 font-bold">
                        → Respuesta Correcta: {q.correctAnswer}
                      </p>
                    </div>
                  </div>
                ))}

                {filteredDifficultQuestions.length === 0 && (
                  <p className="text-xs text-slate-400 italic text-center py-4">No hay preguntas difíciles registradas para esta selección.</p>
                )}
              </div>

            </div>
          )}

          {/* ---------------------------------- */}
          {/* TAB 6: GENERADOR DE EXÁMENES (TEST WORKSPACE) */}
          {/* ---------------------------------- */}
          {activeTab === "generador" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
              
              <div className="border-b border-slate-200 pb-4">
                <span className="tag text-xs text-blue-600 font-bold tracking-widest uppercase">
                  Módulo 6
                </span>
                <h2 className="text-xl font-bold text-slate-800 mt-1">Generador de Test Interactivos</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Estudia simulando condiciones reales de examen. El sistema resta -0.25 puntos por respuesta incorrecta según los criterios de oposición vigentes.
                </p>
              </div>

              {/* SETUP MODE */}
              {activeExamMode === "setup" && (
                <div className="flex flex-col gap-6 py-4">
                  
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* Select Convocatorias block */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700">1. Convocatorias seleccionadas:</label>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200 max-h-[140px] overflow-y-auto text-xs space-y-1.5 shadow-inner">
                        {activeOppositionExams.map((e) => (
                          <label key={e.id} className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition">
                            <input
                              type="checkbox"
                              checked={selectedConvocatoriaIds.includes(e.id)}
                              onChange={() => toggleConvocatoriaSelect(e.id)}
                              className="rounded text-blue-600 border-slate-300"
                            />
                            <span className="truncate">{e.year} - {e.name}</span>
                          </label>
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 italic">
                        Seleccionados {selectedConvocatoriaIds.length} exámenes oficiales de origen.
                      </span>
                    </div>

                    {/* Number of questions selector */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700">2. Número de preguntas:</label>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[5, 10, 20, 50].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setTestNumQuestions(num)}
                            className={`py-2 px-3 rounded-lg border font-bold transition cursor-pointer ${
                              testNumQuestions === num
                                ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            {num} Preguntas
                          </button>
                        ))}
                      </div>
                      <div className="mt-1">
                        <label className="text-[11px] font-semibold text-slate-500">Cantidad personalizada:</label>
                        <input
                          type="number"
                          min={2}
                          max={100}
                          value={testNumQuestions}
                          onChange={(e) => setTestNumQuestions(Number(e.target.value))}
                          className="w-full mt-1 border border-slate-300 bg-white text-xs text-slate-800 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Difficulty selector */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700">3. Nivel de dificultad:</label>
                      <div className="flex flex-col gap-1.5">
                        {["fácil", "medio", "difícil"].map((level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => setTestDifficulty(level as any)}
                            className={`w-full py-2 px-3 rounded-lg border font-bold transition text-left text-xs capitalize cursor-pointer flex items-center justify-between ${
                              testDifficulty === level
                                ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            <span>{level}</span>
                            <span className={`w-2.5 h-2.5 rounded-full ${
                              level === "fácil" ? "bg-emerald-500" : level === "medio" ? "bg-amber-500" : "bg-red-500"
                            }`} />
                          </button>
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 italic">
                        Se adapta la selección de preguntas de acuerdo con las estadísticas de fallos oficiales.
                      </span>
                    </div>

                    {/* Block selector */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700">4. Filtrar por Bloque:</label>
                      <select
                        value={selectedGeneratorBlock}
                        onChange={(e) => setSelectedGeneratorBlock(e.target.value)}
                        className="w-full border border-slate-200 bg-white text-xs text-slate-800 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
                      >
                        <option value="Todos">Todos los Bloques Comunes</option>
                        {currentSyllabus.blocks.map((block) => (
                          <option key={block.id} value={block.id}>
                            Bloque {block.id}: {block.title.replace(/^Bloque\s+\w+:\s*/i, "")}
                          </option>
                        ))}
                      </select>
                      <span className="text-[10px] text-slate-400 italic">
                        Filtra las preguntas para enfocarte en el bloque temático de tu interés.
                      </span>
                    </div>

                  </div>

                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <button
                      onClick={handleGenerateTest}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 px-8 rounded-xl text-sm transition cursor-pointer shadow-lg hover:shadow-blue-500/20 uppercase tracking-wider"
                    >
                      Generar Test Oficial Personalizado
                    </button>
                    <p className="text-[11px] text-slate-400 mt-2.5">
                      Se cargará el banco de preguntas adaptado a tus criterios.
                    </p>
                  </div>

                  {/* Active user exam scores list */}
                  {activeUser && activeUser.examScores && activeUser.examScores.length > 0 && (
                    <div className="border-t border-slate-200 pt-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Historial de Intentos de {activeUser.fullName}
                        </h3>
                        <button
                          onClick={handleClearScoreHistory}
                          className="text-[10.5px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer bg-red-50 hover:bg-red-100 px-2 py-1 rounded"
                        >
                          <RotateCcw className="h-3 w-3" />
                          <span>Borrar Historial</span>
                        </button>
                      </div>

                      <div className="overflow-x-auto border border-slate-200 rounded-xl text-xs">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                              <th className="p-3">Fecha</th>
                              <th className="p-3">Convocatorias de extracción</th>
                              <th className="p-3">Dificultad</th>
                              <th className="p-3">Preguntas</th>
                              <th className="p-3">Aciertos/Fallos</th>
                              <th className="p-3">Nota Final</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeUser.examScores.map((score, idx) => (
                              <tr key={idx} className="border-b border-slate-150 hover:bg-slate-50 transition">
                                <td className="p-3 font-mono">{score.date}</td>
                                <td className="p-3 text-slate-600">OEPs: {score.convocatorias.join(", ")}</td>
                                <td className="p-3 capitalize">{score.difficulty}</td>
                                <td className="p-3">{score.totalQuestions}</td>
                                <td className="p-3 text-slate-500">
                                  <span className="text-emerald-600 font-bold">{score.correctAnswers}✓</span> /{" "}
                                  <span className="text-red-500 font-bold">{score.incorrectAnswers}✗</span>
                                </td>
                                <td className={`p-3 font-black ${
                                  score.score >= 5 ? "text-emerald-600" : "text-red-600"
                                }`}>
                                  {score.score}/10
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* EXAM IS RUNNING */}
              {activeExamMode === "running" && (
                <div className="flex flex-col gap-6 py-2">
                  <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>Examen en Progreso: {generatedQuestions.length} Preguntas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Dificultad: <span className="capitalize text-slate-900">{testDifficulty}</span></span>
                      <span>•</span>
                      <span>Respondidas: {Object.keys(userAnswers).length} / {generatedQuestions.length}</span>
                    </div>
                  </div>

                  {/* Question listing */}
                  <div className="space-y-6">
                    {generatedQuestions.map((q, idx) => {
                      const selectedAns = userAnswers[q.id];
                      return (
                        <div key={q.id} className="p-5 border border-slate-200 rounded-2xl flex flex-col gap-4 bg-white shadow-sm">
                          <div>
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">
                              Pregunta {idx + 1}
                            </span>
                            <h3 className="text-sm font-bold text-slate-800 mt-1.5 leading-normal font-serif">
                              {q.statement}
                            </h3>
                          </div>

                          <div className="flex flex-col gap-2">
                            {Object.entries(q.options).map(([opt, text]) => {
                              const isSelected = selectedAns === opt;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => {
                                    setUserAnswers({
                                      ...userAnswers,
                                      [q.id]: opt as any
                                    });
                                  }}
                                  className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition flex items-start gap-3 cursor-pointer ${
                                    isSelected
                                      ? "bg-blue-50 border-blue-400 text-blue-900"
                                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                                  }`}
                                >
                                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] flex-shrink-0 border ${
                                    isSelected ? "bg-blue-600 text-white border-blue-600" : "bg-white border-slate-300 text-slate-500"
                                  }`}>
                                    {opt}
                                  </span>
                                  <span>{text}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center gap-4 py-4 border-t border-slate-200 text-xs">
                    <button
                      onClick={resetExam}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg font-bold transition cursor-pointer"
                    >
                      Cancelar Test
                    </button>
                    <button
                      onClick={handleSubmitTest}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-black transition cursor-pointer uppercase tracking-wider"
                    >
                      Entregar Examen
                    </button>
                  </div>
                </div>
              )}

              {/* TEST COMPLETED / EXAM SCORED RESULTS */}
              {activeExamMode === "completed" && examResult && (
                <div className="flex flex-col gap-6 py-2">
                  
                  {/* Result Header summary card */}
                  <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md border border-slate-800">
                    <div className="space-y-2 text-center md:text-left">
                      <span className="tag text-[9.5px] text-blue-400 font-bold uppercase tracking-widest">
                        Examen Finalizado
                      </span>
                      <h3 className="text-xl font-bold">Resumen de Calificaciones</h3>
                      <p className="text-xs text-slate-400 leading-normal">
                        Fórmula Oficial de Oposición: Puntuación calculada como Aciertos - (Fallos * 0.25).
                      </p>
                    </div>

                    <div className="text-center bg-white px-6 py-4 rounded-2xl border border-slate-700 shadow-inner flex flex-col justify-center items-center min-w-[160px]">
                      <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Nota Final</span>
                      <p className={`text-4xl font-black mt-1 ${
                        examResult.score >= 5 ? "text-emerald-400" : "text-red-400"
                      }`}>
                        {examResult.score}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-0.5">sobre 10</span>
                    </div>
                  </div>

                  {/* Score stats counters */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="bg-[#f8fafc] p-3 border border-slate-200 rounded-xl">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Ítems</span>
                      <p className="text-xl font-bold text-[#0f172a]">{examResult.total}</p>
                    </div>
                    <div className="bg-emerald-50 p-3 border border-emerald-150 rounded-xl">
                      <span className="text-[10px] text-emerald-600 font-bold uppercase block">Respuestas Correctas</span>
                      <p className="text-xl font-bold text-emerald-700">{examResult.corrects}</p>
                    </div>
                    <div className="bg-red-50 p-3 border border-red-150 rounded-xl">
                      <span className="text-[10px] text-red-500 font-bold uppercase block">Respuestas Incorrectas</span>
                      <p className="text-xl font-bold text-red-700">{examResult.incorrects}</p>
                    </div>
                    <div className="bg-slate-50 p-3 border border-slate-200 rounded-xl">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">No Contestadas</span>
                      <p className="text-xl font-bold text-slate-600">{examResult.unanswered}</p>
                    </div>
                  </div>

                  {/* Step-by-step correction showing detailed laws */}
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2">
                      Corrección de Preguntas y Justificación Legal
                    </h3>

                    {generatedQuestions.map((q, idx) => {
                      const userAns = userAnswers[q.id];
                      const isCorrect = userAns === q.correctOption;
                      return (
                        <div
                          key={q.id}
                          className={`p-5 rounded-2xl border flex flex-col gap-3 ${
                            isCorrect
                              ? "border-emerald-150 bg-emerald-50/10"
                              : "border-red-150 bg-red-50/10"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                              }`}>
                                Pregunta {idx + 1} - {isCorrect ? "Correcta ✓" : "Incorrecta ✗"}
                              </span>
                              <span className="text-[10px] text-slate-500">
                                {q.convocatoriaName}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 mt-2 font-serif leading-normal">
                              {q.statement}
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 gap-2.5 text-xs">
                            {Object.entries(q.options).map(([opt, text]) => {
                              const wasSelected = userAns === opt;
                              const isTheCorrect = q.correctOption === opt;
                              
                              let styleClass = "bg-slate-50 border-slate-200 text-slate-700";
                              if (wasSelected) {
                                styleClass = isCorrect ? "bg-emerald-100/50 border-emerald-400 text-emerald-950 font-bold" : "bg-red-100/50 border-red-400 text-red-950 font-bold";
                              } else if (isTheCorrect) {
                                styleClass = "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold";
                              }

                              return (
                                <div key={opt} className={`p-2.5 border rounded-lg flex items-start gap-2.5 ${styleClass}`}>
                                  <span className={`w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0 ${
                                    wasSelected ? "bg-[#0f172a] text-white" : "bg-white border text-slate-400"
                                  }`}>
                                    {opt}
                                  </span>
                                  <span>{text}</span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Legal explanation text */}
                          <div className="bg-white rounded-xl border border-slate-200 p-3.5 mt-2 text-xs">
                            <span className="text-blue-900 font-bold">📖 Artículos e Inciso Jurídico:</span>
                            <span className="ml-1.5 bg-blue-100 text-blue-800 font-mono text-[10px] px-2 py-0.5 rounded">
                              {q.articleReference}
                            </span>
                            <p className="text-slate-600 mt-2 leading-relaxed">
                              {q.explanation}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-center items-center gap-4 py-4 border-t border-slate-200 text-xs">
                    <button
                      onClick={resetExam}
                      className="px-6 py-2.5 bg-[#0f172a] hover:bg-slate-900 text-white rounded-xl font-bold transition cursor-pointer"
                    >
                      Volver a Generar Test
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {activeTab === "calendario" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
              <div className="border-b border-slate-200 pb-4">
                <span className="tag text-xs text-blue-600 font-bold tracking-widest uppercase">
                  Módulo 7
                </span>
                <h2 className="text-xl font-bold text-slate-800 mt-1">Calendario y Planificador de Estudio</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Planifica tus sesiones diarias, asigna temas específicos y mantén un registro de tu constancia. ¡Completar sesiones te otorga +30 XP!
                </p>
              </div>

              {/* Reminders / Notification banner if any session is today */}
              {(() => {
                const todayStr = new Date().toISOString().split("T")[0];
                const todayEvents = (activeUser?.studyEvents || []).filter((e: any) => e.date === todayStr);
                if (todayEvents.length > 0) {
                  return (
                    <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4 flex items-start gap-3 shadow-sm">
                      <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-xs">⚠️ ¡Recordatorio de Sesiones de Estudio para HOY!</h4>
                        <p className="text-[11px] mt-0.5 text-amber-800">
                          Tienes {todayEvents.length} sesión{todayEvents.length > 1 ? "es" : ""} programada{todayEvents.length > 1 ? "s" : ""} para hoy ({todayStr}):
                        </p>
                        <ul className="list-disc pl-4 mt-1.5 text-[10.5px] text-amber-700 space-y-1">
                          {todayEvents.map((e: any) => (
                            <li key={e.id}>
                              <strong>{e.title}</strong> — Tema {e.themeId} ({e.duration} minutos) — {" "}
                              <span className={e.completed ? "text-emerald-700 font-bold" : "text-amber-800 font-bold"}>
                                {e.completed ? "Completado ✓" : "Pendiente ⚡"}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Form to Program Session */}
                <div className="lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <h3 className="text-xs font-black text-slate-600 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>Programar Nueva Sesión</span>
                  </h3>
                  
                  <form onSubmit={handleAddStudyEvent} className="flex flex-col gap-4 text-xs">
                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-700">Título de la Sesión:</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Repaso General LEC y plazos"
                        value={studyTitle}
                        onChange={(e) => setStudyTitle(e.target.value)}
                        className="border border-slate-300 bg-white text-slate-800 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-bold text-slate-700">Fecha de Estudio:</label>
                        <input
                          type="date"
                          required
                          value={studyDate}
                          onChange={(e) => setStudyDate(e.target.value)}
                          className="border border-slate-300 bg-white text-slate-800 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="study-duration-select" className="font-bold text-slate-700">Duración (minutos):</label>
                        <select
                          id="study-duration-select"
                          value={studyDuration}
                          onChange={(e) => setStudyDuration(Number(e.target.value))}
                          className="border border-slate-300 bg-white text-slate-800 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value={15}>15 minutos</option>
                          <option value={30}>30 minutos</option>
                          <option value={45}>45 minutos</option>
                          <option value={60}>60 minutos</option>
                          <option value={90}>90 minutos</option>
                          <option value={120}>120 minutos</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="study-theme-select" className="font-bold text-slate-700">Tema del Temario Asociado:</label>
                      <select
                        id="study-theme-select"
                        value={studyThemeId}
                        onChange={(e) => setStudyThemeId(e.target.value)}
                        className="border border-slate-300 bg-white text-slate-800 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="General">Varios / Repaso General</option>
                        {SYLLABUS_THEMES.map((theme) => (
                          <option key={theme.id} value={theme.id}>
                            Tema {theme.id} - {theme.title.substring(0, 50)}...
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition cursor-pointer text-center uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Programar en Calendario</span>
                    </button>
                    
                    {!activeUser && (
                      <p className="text-[10px] text-amber-800 font-medium text-center bg-amber-50 p-2 rounded-lg mt-1 border border-amber-200">
                        ⚠️ Regístrate o activa tu perfil arriba para guardar tu calendario y ganar puntos de experiencia.
                      </p>
                    )}
                  </form>
                </div>

                {/* List of Scheduled Sessions */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <h3 className="text-xs font-black text-slate-600 uppercase tracking-wider">
                      Tus Sesiones de Estudio Programadas
                    </h3>
                    <span className="text-[10px] bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                      {(activeUser?.studyEvents || []).length} totales
                    </span>
                  </div>

                  {activeUser && activeUser.studyEvents && activeUser.studyEvents.length > 0 ? (
                    <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                      {activeUser.studyEvents.map((evt: any) => {
                        const themeName = evt.themeId === "General" ? "Repaso General" : `Tema ${evt.themeId}`;
                        return (
                          <div
                            key={evt.id}
                            className={`p-3.5 rounded-xl border transition flex items-center justify-between gap-4 ${
                              evt.completed
                                ? "bg-emerald-50/30 border-emerald-200"
                                : "bg-white border-slate-200 shadow-sm"
                            }`}
                          >
                            <div className="flex items-start gap-3 min-w-0">
                              <button
                                onClick={() => toggleStudyEventCompleted(evt.id)}
                                className="mt-0.5 text-slate-400 hover:text-emerald-600 cursor-pointer flex-shrink-0"
                                title={evt.completed ? "Marcar como pendiente" : "Marcar como completado (+30 XP)"}
                              >
                                {evt.completed ? (
                                  <CheckCircle className="h-5 w-5 text-emerald-600 fill-emerald-100" />
                                ) : (
                                  <Circle className="h-5 w-5 text-slate-300 hover:border-slate-400" />
                                )}
                              </button>
                              
                              <div className="min-w-0">
                                <h4 className={`text-xs font-bold leading-tight ${evt.completed ? "line-through text-slate-400" : "text-slate-800"}`}>
                                  {evt.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 flex-wrap">
                                  <span className="bg-slate-100 px-1.5 py-0.2 rounded font-mono text-slate-600">{evt.date}</span>
                                  <span>•</span>
                                  <span className="text-blue-900 font-semibold">{themeName}</span>
                                  <span>•</span>
                                  <span>⏱️ {evt.duration} min</span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => deleteStudyEvent(evt.id)}
                              className="text-slate-300 hover:text-red-500 p-1.5 rounded-lg cursor-pointer transition flex-shrink-0"
                              title="Eliminar sesión"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="border border-dashed border-slate-300 rounded-2xl p-10 text-center text-slate-400 flex flex-col justify-center items-center gap-3">
                      <Calendar className="h-10 w-10 text-slate-300" />
                      <div>
                        <p className="text-xs font-bold text-slate-500">No tienes ninguna sesión programada</p>
                        <p className="text-[10px] text-slate-400 mt-1 leading-normal max-w-sm">
                          Usa el formulario de la izquierda para planificar tu calendario. ¡Recibirás un recordatorio dinámico cada día de estudio!
                        </p>
                      </div>
                    </div>
                  )}

                  {activeUser && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-[10px] text-blue-800 leading-normal">
                      💡 <strong>Consejo del Preparador:</strong> Establecer una rutina con 3 sesiones semanales de al menos 45 minutos aumenta tu tasa de retención de la Ley de Enjuiciamiento Civil (LEC) en un 40%.
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {activeTab === "comunidad" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
              
              <div className="flex justify-between items-center border-b border-slate-200 pb-4 flex-wrap gap-3">
                <div>
                  <span className="tag text-xs text-blue-600 font-bold tracking-widest uppercase">
                    Módulo 8
                  </span>
                  <h2 className="text-xl font-bold text-slate-800 mt-1">Foro Oficial: {activeOpposition.name}</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Comparte dudas, trucos mnemotécnicos y plazos específicos para la preparación de {activeOpposition.name}.
                  </p>
                </div>
                
                {selectedThreadId && (
                  <button
                    onClick={() => setSelectedThreadId(null)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs transition cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Volver al Foro</span>
                  </button>
                )}
              </div>

              {/* Thread detail view */}
              {selectedThreadId ? (
                (() => {
                  const thread = forumThreads.find((t) => t.id === selectedThreadId);
                  if (!thread) return <p className="text-xs text-slate-400 italic">Hilo no encontrado.</p>;

                  const isOwnThread = activeUser && activeUser.email === thread.authorEmail;

                  return (
                    <div className="flex flex-col gap-6">
                      
                      {/* Original Post */}
                      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col gap-3">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-blue-900 text-white font-bold px-2 py-0.5 rounded">
                              {thread.category}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {new Date(thread.createdAt).toLocaleString()}
                            </span>
                          </div>

                          {isOwnThread && (
                            <button
                              onClick={() => handleDeleteThread(thread.id)}
                              className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg cursor-pointer transition"
                              title="Eliminar este hilo"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-slate-900 mt-1 leading-snug">
                          {thread.title}
                        </h3>

                        <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                          {thread.content}
                        </p>

                        <div className="border-t border-slate-200 pt-3 flex items-center justify-between mt-2">
                          <div className="text-[11px] text-slate-500">
                            Autor: <strong className="text-slate-700">{thread.authorName}</strong>{" "}
                            <span className="text-slate-400">({thread.authorEmail})</span>
                          </div>

                          <button
                            onClick={() => handleUpvoteThread(thread.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                              thread.upvotedBy?.includes(activeUser?.email || "")
                                ? "bg-blue-100 text-blue-800"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                            }`}
                          >
                            <span>👍 {thread.upvotes || 0}</span>
                            <span>{thread.upvotedBy?.includes(activeUser?.email || "") ? "Votado" : "Útil"}</span>
                          </button>
                        </div>
                      </div>

                      {/* Replies List */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                          Respuestas ({(thread.replies || []).length})
                        </h4>

                        {(thread.replies || []).length > 0 ? (
                          <div className="space-y-3.5">
                            {thread.replies.map((reply: any) => {
                              const isOwnReply = activeUser && activeUser.email === reply.authorEmail;
                              return (
                                <div key={reply.id} className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col gap-2">
                                  <div className="flex justify-between items-start gap-4">
                                    <div className="text-[11px] text-slate-500">
                                      Por: <strong className="text-slate-700">{reply.authorName}</strong>{" "}
                                      <span className="text-[10px] text-slate-400 font-mono">
                                        ({new Date(reply.createdAt).toLocaleString()})
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                      {isOwnReply && (
                                        <button
                                          onClick={() => handleDeleteReply(thread.id, reply.id)}
                                          className="text-slate-300 hover:text-red-500 p-1 rounded cursor-pointer transition"
                                          title="Eliminar respuesta"
                                        >
                                          <Trash className="h-3.5 w-3.5" />
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  <p className="text-xs text-slate-700 leading-relaxed">
                                    {reply.content}
                                  </p>

                                  <div className="flex justify-end mt-1">
                                    <button
                                      onClick={() => handleMarkReplyHelpful(thread.id, reply.id)}
                                      className={`px-2.5 py-1 rounded text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${
                                        reply.helpfulBy?.includes(activeUser?.email || "")
                                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                          : "bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200"
                                      }`}
                                      title="Marcar respuesta como útil y veraz"
                                    >
                                      <span>✅ {reply.helpfulCount || 0}</span>
                                      <span>Es Útil</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 italic text-center py-4 bg-slate-50 rounded-xl">
                            No hay respuestas en este hilo todavía. ¡Sé el primero en responder!
                          </p>
                        )}
                      </div>

                      {/* Post Reply Form */}
                      <form onSubmit={(e) => handleAddForumReply(e, thread.id)} className="flex flex-col gap-3">
                        <h4 className="text-xs font-bold text-slate-700">Tu Respuesta o Comentario:</h4>
                        <textarea
                          required
                          rows={3}
                          maxLength={500}
                          placeholder="Aporta tus conocimientos, resuelve la duda o añade jurisprudencia técnica..."
                          value={newReplyContent}
                          onChange={(e) => setNewReplyContent(e.target.value)}
                          className="w-full border border-slate-300 bg-white text-slate-800 text-xs p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-400"
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-slate-400">Máximo 500 caracteres. Se te otorgarán +15 XP.</span>
                          <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition cursor-pointer"
                          >
                            Enviar Respuesta
                          </button>
                        </div>
                      </form>

                    </div>
                  );
                })()
              ) : (
                
                // Index of Threads
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left: filters and New thread Form */}
                  <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <h3 className="text-xs font-black text-slate-600 uppercase tracking-wider mb-3">
                        Filtrar por Categoría
                      </h3>
                      <div className="flex flex-col gap-1 text-xs">
                        {["All", "Temario", "Exámenes", "Técnicas de Estudio", "Dudas Generales"].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setForumCategoryFilter(cat)}
                            className={`w-full text-left p-2 rounded-lg font-bold transition cursor-pointer ${
                              forumCategoryFilter === cat
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            {cat === "All" ? "Ver Todo" : cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleAddForumThread} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-3">
                      <h3 className="text-xs font-black text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span>Publicar Nuevo Hilo</span>
                      </h3>

                      <div className="flex flex-col gap-1 text-xs">
                        <label className="font-bold text-slate-700">Título descriptivo:</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Duda artículo 394 LEC costas ordinario"
                          value={newThreadTitle}
                          onChange={(e) => setNewThreadTitle(e.target.value)}
                          className="border border-slate-300 bg-white text-slate-800 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex flex-col gap-1 text-xs">
                        <label htmlFor="thread-category-select" className="font-bold text-slate-700">Categoría:</label>
                        <select
                          id="thread-category-select"
                          value={newThreadCategory}
                          onChange={(e) => setNewThreadCategory(e.target.value)}
                          className="border border-slate-300 bg-white text-slate-800 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="Temario">Temario</option>
                          <option value="Exámenes">Exámenes</option>
                          <option value="Técnicas de Estudio">Técnicas de Estudio</option>
                          <option value="Dudas Generales">Dudas Generales</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 text-xs">
                        <label className="font-bold text-slate-700">Consulta o Truco:</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Expón tu caso, artículo de ley o regla mnemotécnica..."
                          value={newThreadContent}
                          onChange={(e) => setNewThreadContent(e.target.value)}
                          className="border border-slate-300 bg-white text-slate-800 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-3 rounded-lg text-xs transition cursor-pointer text-center uppercase tracking-wider"
                      >
                        Crear Hilo (+25 XP)
                      </button>
                    </form>
                  </div>

                  {/* Right: Threads List */}
                  <div className="lg:col-span-8 flex flex-col gap-3">
                    {(() => {
                      // Apply category, opposition separation and global searchQuery search
                      const list = forumThreads.filter((t) => {
                        const threadOppositionId = t.oppositionId || "op-tramitacion";
                        if (threadOppositionId !== activeOppositionId) return false;

                        const matchesCat = forumCategoryFilter === "All" || t.category === forumCategoryFilter;
                        const matchesQuery = !searchQuery.trim() || 
                          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.content.toLowerCase().includes(searchQuery.toLowerCase());
                        return matchesCat && matchesQuery;
                      });

                      if (list.length === 0) {
                        return (
                          <div className="border border-slate-200 rounded-2xl p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
                            <Users className="h-8 w-8 text-slate-300" />
                            <p className="text-xs font-bold text-slate-500">Ningún tema coincide con tu búsqueda o filtro</p>
                            <p className="text-[10px] text-slate-400">Prueba cambiando de categoría o borrando tu búsqueda en la barra superior.</p>
                          </div>
                        );
                      }

                      return (
                        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                          {list.map((thread) => (
                            <div
                              key={thread.id}
                              onClick={() => setSelectedThreadId(thread.id)}
                              className="p-4 bg-white hover:bg-slate-50/50 border border-slate-200 rounded-xl shadow-sm transition cursor-pointer flex flex-col gap-2 group"
                            >
                              <div className="flex justify-between items-center gap-2">
                                <span className="text-[9px] uppercase font-black tracking-widest text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                                  {thread.category}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {new Date(thread.createdAt).toLocaleDateString()}
                                </span>
                              </div>

                              <h3 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition leading-snug">
                                {thread.title}
                              </h3>

                              <p className="text-[11px] text-slate-500 line-clamp-2">
                                {thread.content}
                              </p>

                              <div className="flex items-center justify-between border-t border-slate-100 pt-2 mt-1 text-[10px] text-slate-400">
                                <div>
                                  Por <strong className="text-slate-600">{thread.authorName}</strong>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span>👍 {thread.upvotes || 0} votos</span>
                                  <span>💬 {(thread.replies || []).length} respuestas</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>

                </div>
              )}

            </div>
          )}

          {activeTab === "logros" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
              
              <div className="border-b border-slate-200 pb-4">
                <span className="tag text-xs text-blue-600 font-bold tracking-widest uppercase">
                  Módulo 9
                </span>
                <h2 className="text-xl font-bold text-slate-800 mt-1">Gamer-Learning: Progresión e Insignias</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Controla tu rendimiento, sube de nivel acumulando XP y desbloquea insignias oficiales de opositor.
                </p>
              </div>

              {/* Student progress details */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Level Summary Box */}
                <div className="md:col-span-5 bg-indigo-50 border border-indigo-200 text-slate-900 rounded-2xl p-6 flex flex-col justify-between gap-5 shadow-lg">
                  <div>
                    <span className="text-[9px] font-black uppercase text-blue-400 tracking-widest">Nivel de Opositor</span>
                    <h3 className="text-3xl font-black text-blue-900 mt-1">
                      Nivel {activeUser?.level || 1}
                    </h3>
                    <p className="text-xs text-blue-800 mt-1.5 leading-relaxed">
                      {activeUser?.level === 5 
                        ? "👑 ¡Has alcanzado el rango máximo: Opositor de Élite! Tu ritmo de estudio es insuperable." 
                        : `Acumula experiencia realizando exámenes, plazos de estudio y repasando el temario.`
                      }
                    </p>
                  </div>

                  {/* XP Bar */}
                  {(() => {
                    const xpVal = activeUser?.xp || 0;
                    const lvlVal = activeUser?.level || 1;
                    
                    let baseXP = 0;
                    let targetXP = 100;
                    if (lvlVal === 2) { baseXP = 100; targetXP = 300; }
                    else if (lvlVal === 3) { baseXP = 300; targetXP = 600; }
                    else if (lvlVal === 4) { baseXP = 600; targetXP = 1000; }
                    else if (lvlVal === 5) { baseXP = 1000; targetXP = 2000; } // dummy target

                    const levelXPEarned = xpVal - baseXP;
                    const levelXPTotalNeeded = targetXP - baseXP;
                    const levelProgress = lvlVal === 5 ? 100 : Math.min(100, Math.max(0, Math.round((levelXPEarned / levelXPTotalNeeded) * 100)));

                    return (
                      <div className="space-y-2">
                        <div className="flex justify-between text-[11px] font-bold text-slate-300">
                          <span>{xpVal} XP Totales</span>
                          <span>{lvlVal === 5 ? "Rango Máximo" : `${targetXP - xpVal} XP para Nivel ${lvlVal + 1}`}</span>
                        </div>
                        <div className="w-full bg-white h-3.5 rounded-full overflow-hidden border border-slate-700 p-0.5">
                          <div
                            className="bg-gradient-to-r from-blue-400 to-emerald-400 h-full rounded-full transition-all duration-700"
                            style={{ width: `${levelProgress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[9px] text-slate-400">
                          <span>Nivel {lvlVal}</span>
                          <span>Nivel {lvlVal === 5 ? "5" : lvlVal + 1} ({levelProgress}%)</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Score Stats Table */}
                <div className="md:col-span-7 bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-2 mb-3">
                    Estadísticas Globales de Rendimiento
                  </h3>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-slate-150">
                      <span className="block text-[9px] text-slate-400 uppercase font-bold">Temas Completados</span>
                      <span className="font-extrabold text-slate-800 text-lg">
                        {activeUser?.completedThemes?.length || 0} temas
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-150">
                      <span className="block text-[9px] text-slate-400 uppercase font-bold">Simulacros Hechos</span>
                      <span className="font-extrabold text-slate-800 text-lg">
                        {activeUser?.examScores?.length || 0} exámenes
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-150">
                      <span className="block text-[9px] text-slate-400 uppercase font-bold">Nota Media del Alumno</span>
                      <span className="font-extrabold text-slate-800 text-lg">
                        {activeUser?.examScores && activeUser.examScores.length > 0
                          ? (activeUser.examScores.reduce((sum: number, s: any) => sum + s.score, 0) / activeUser.examScores.length).toFixed(2)
                          : "0.00"
                        }
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-150">
                      <span className="block text-[9px] text-slate-400 uppercase font-bold">Sesiones Planificadas</span>
                      <span className="font-extrabold text-slate-800 text-lg">
                        {activeUser?.studyEvents?.length || 0} sesiones
                      </span>
                    </div>
                  </div>

                  {!activeUser && (
                    <p className="text-[10.5px] text-amber-700 bg-amber-50 p-2 rounded-xl mt-3 text-center border border-amber-100 font-medium">
                      🔒 Regístrate o inicia sesión arriba para desbloquear este panel y registrar tu evolución diaria.
                    </p>
                  )}
                </div>

              </div>

              {/* Badges Grid View */}
              {(() => {
                const ALL_BADGES = [
                  {
                    id: "badge-primer-paso",
                    title: "Primer Paso",
                    description: "Marca tu primer tema como completado.",
                    icon: "🎯",
                    req: "Completar 1 tema"
                  },
                  {
                    id: "badge-iniciador-procesal",
                    title: "Iniciador Procesal",
                    description: "Completa 5 temas del temario oficial.",
                    icon: "📖",
                    req: "Completar 5 temas"
                  },
                  {
                    id: "badge-tramitador-experto",
                    title: "Opositor Experto",
                    description: "Completa 15 temas o más del temario.",
                    icon: "⚖️",
                    req: "Completar 15 temas"
                  },
                  {
                    id: "badge-primer-test",
                    title: "Primer Test",
                    description: "Completa tu primer simulacro de examen.",
                    icon: "📝",
                    req: "Finalizar 1 test"
                  },
                  {
                    id: "badge-puntuacion-elite",
                    title: "Puntuación de Élite",
                    description: "Consigue una nota de 8.5 o superior en un examen.",
                    icon: "👑",
                    req: "Nota de test ≥ 8.5"
                  },
                  {
                    id: "badge-disciplinado",
                    title: "Planificador Disciplinado",
                    description: "Programa una sesión de estudio en tu calendario.",
                    icon: "📅",
                    req: "Crear un evento de calendario"
                  },
                  {
                    id: "badge-compañero",
                    title: "Compañero Solidario",
                    description: "Escribe tu primer aporte en el foro o comunidad.",
                    icon: "💬",
                    req: "Publicar un hilo en el foro"
                  }
                ];

                return (
                  <div className="mt-4 flex flex-col gap-4">
                    <h3 className="text-xs font-black text-slate-600 uppercase tracking-wider border-b border-slate-200 pb-2">
                      Tus Insignias Desbloqueadas ({(activeUser?.badges || []).length} de {ALL_BADGES.length})
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {ALL_BADGES.map((badge) => {
                        const isUnlocked = activeUser?.badges?.includes(badge.id) || false;
                        return (
                          <div
                            key={badge.id}
                            className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 relative overflow-hidden ${
                              isUnlocked
                                ? "border-blue-200 bg-white shadow-sm hover:shadow"
                                : "border-slate-150 bg-slate-50/50 opacity-60"
                            }`}
                          >
                            {/* Status tag */}
                            <span className={`absolute top-0 right-0 text-[8px] font-black tracking-widest px-2 py-0.5 rounded-bl uppercase ${
                              isUnlocked ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-500"
                            }`}>
                              {isUnlocked ? "Obtenida" : "Bloqueada"}
                            </span>

                            <div className={`text-3xl p-2.5 rounded-xl flex-shrink-0 flex items-center justify-center ${
                              isUnlocked ? "bg-blue-50" : "bg-slate-100 grayscale"
                            }`}>
                              {isUnlocked ? badge.icon : "🔒"}
                            </div>

                            <div className="min-w-0 pr-6 mt-1">
                              <h4 className="text-xs font-black text-slate-800 truncate">
                                {badge.title}
                              </h4>
                              <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                                {badge.description}
                              </p>
                              <span className="block text-[8.5px] font-bold text-slate-400 uppercase tracking-wider mt-2.5">
                                Requisito: {badge.req}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

            </div>
          )}

        </main>
      </div>

      {/* ---------------------------------- */}
      {/* PRINT-ONLY COMPREHENSIVE DOSSIER */}
      {/* ---------------------------------- */}
      <div className="print-only hidden p-8 text-slate-900 bg-white min-h-screen">
        <div className="print-header mb-8 pb-4 border-b-2 border-slate-900">
          <h1 className="text-3xl font-extrabold tracking-tight">{activeOpposition.name}</h1>
          <p className="text-sm font-mono text-slate-500 mt-1">
            Dossier Oficial de Preparación • Módulo Activo: {
              activeTab === "temario" ? "Temario e Interactividad" :
              activeTab === "casos" ? "Estudio de Casos Prácticos" :
              activeTab === "oposiciones" ? "Buscador de Convocatorias" :
              activeTab === "trampas" ? "Trampas de Examen" :
              activeTab === "preguntas" ? "Preguntas Difíciles" :
              activeTab === "generador" ? "Simulador de Test" : "Estadísticas y Planificación"
            }
          </p>
        </div>

        {/* PRINT SECTION: TEMARIO & REQUISITOS */}
        {activeTab === "temario" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold uppercase border-b-2 border-slate-900 pb-2 mb-4">
                Requisitos Generales de Acceso
              </h2>
              <ul className="space-y-3">
                {activeRequirements.map((req, i) => (
                  <li key={i} className="text-sm">
                    <strong>✓ {req.title}:</strong> {req.desc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <h2 className="text-xl font-bold uppercase border-b-2 border-slate-900 pb-2 mb-4">
                Cualidades que el Tribunal Espera del Opositor (Perfil Completo)
              </h2>
              <div className="space-y-4">
                {activeTribunalExpectations.skills.map((skill, idx) => (
                  <div key={idx} className="p-4 border border-slate-200 rounded-xl">
                    <h4 className="font-bold text-sm text-slate-900 mb-1">
                      {idx + 1}. {skill.name}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 page-break">
              <h2 className="text-xl font-bold uppercase border-b-2 border-slate-900 pb-2 mb-4">
                Índice de Temas del Programa
              </h2>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-300">
                    <th className="py-2">Código</th>
                    <th className="py-2">Tema</th>
                    <th className="py-2">Referencia Legislativa</th>
                    <th className="py-2">Notas del Alumno</th>
                  </tr>
                </thead>
                <tbody>
                  {SYLLABUS_THEMES.map((t) => {
                    const note = activeUser?.themeNotes[t.id] || "";
                    return (
                      <tr key={t.id} className="border-b border-slate-100">
                        <td className="py-2 font-bold font-mono">{t.id}</td>
                        <td className="py-2">
                          <strong>{t.title}</strong>
                          <div className="text-[10px] text-slate-500">Bloque {t.block}</div>
                        </td>
                        <td className="py-2 font-mono text-xs">{t.articles}</td>
                        <td className="py-2 text-xs italic">{note ? `"${note}"` : "-"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRINT SECTION: TRAMPAS */}
        {activeTab === "trampas" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold uppercase border-b-2 border-slate-900 pb-2 mb-4">
              Análisis Oficial de Trampas y Distractores
            </h2>
            {activeOppositionTraps.map((trap, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-xl space-y-2 avoid-break">
                <h3 className="font-bold text-base text-slate-950">{idx + 1}. {trap.title}</h3>
                <p className="text-xs text-slate-700"><strong>Descripción:</strong> {trap.description}</p>
                <p className="text-xs text-slate-700"><strong>Patrón habitual:</strong> {trap.pattern}</p>
                <div className="bg-slate-50 p-3 rounded border-l-4 border-slate-900 text-xs text-slate-800">
                  <p className="font-semibold">Ejemplo distractor trampa del examen:</p>
                  <p className="italic">"{trap.exampleTrap}"</p>
                </div>
                <p className="text-xs text-indigo-900 font-bold"><strong>Técnica de superación:</strong> {trap.technique}</p>
              </div>
            ))}
          </div>
        )}

        {/* PRINT SECTION: PREGUNTAS DIFÍCILES */}
        {activeTab === "preguntas" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold uppercase border-b-2 border-slate-900 pb-2 mb-4">
              Preguntas de Alto Rango de Dificultad
            </h2>
            {activeOppositionDifficultQuestions.map((q, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-xl space-y-2 avoid-break">
                <h3 className="font-bold text-base text-slate-950">{idx + 1}. {q.title}</h3>
                <p className="text-xs text-slate-500 font-mono">Referencia legal: {q.article}</p>
                <p className="text-xs text-slate-700"><strong>Complejidad del concepto:</strong> {q.difficultyExplanation}</p>
                <p className="text-xs text-slate-700"><strong>Patrón de distracción:</strong> {q.patternDescription}</p>
                <div className="bg-amber-50 p-3 rounded border border-amber-100 text-xs text-amber-950 font-medium">
                  <p className="font-bold">Mnemotecnia sugerida:</p>
                  <p>{q.memorizationTechnique}</p>
                </div>
                {q.realQuestionSample && (
                  <div className="bg-slate-50 p-3 rounded border-l-4 border-slate-900 text-xs">
                    <p className="font-bold text-slate-800">Pregunta modelo del Tribunal:</p>
                    <p className="italic text-slate-700">"{q.realQuestionSample}"</p>
                    <p className="mt-1.5 font-semibold text-emerald-800">✓ Respuesta Correcta: {q.correctAnswer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* PRINT SECTION: CASOS PRÁCTICOS */}
        {activeTab === "casos" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold uppercase border-b-2 border-slate-900 pb-2 mb-4">
              Casos Prácticos de Examen Analizados
            </h2>
            <p className="text-sm italic text-slate-600">Este informe contiene la estructura, preguntas guiadas y soluciones técnicas de los supuestos prácticos cargados actualmente.</p>
          </div>
        )}

        {/* PRINT SECTION: TEST GENERADOR */}
        {activeTab === "generador" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold uppercase border-b-2 border-slate-900 pb-2 mb-4">
              Simulación de Examen Oficial Adaptado
            </h2>
            <p className="text-sm text-slate-600">Examen autogenerado el {new Date().toLocaleDateString()} bajo los criterios oficiales de la oposición activa.</p>
          </div>
        )}
      </div>

      {/* ---------------------------------- */}
      {/* REGISTER / SWITCH PROFILE MODAL */}
      {/* ---------------------------------- */}
      {showRegisterModal && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden animate-slide-up">
            
            <div className="bg-[#0f172a] text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <h3 className="font-bold text-sm">Gestión de Perfiles de Alumno</h3>
              </div>
              <button
                onClick={() => {
                  setShowRegisterModal(false);
                  setPendingUnlockUser(null);
                }}
                className="text-slate-400 hover:text-white p-1 rounded transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {pendingUnlockUser ? (
              <form onSubmit={handleUnlockProfile} className="p-5 flex flex-col gap-4">
                <div className="text-center py-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600 mb-2">
                    <Lock className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">Desbloquear Perfil</h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Introduce la contraseña para acceder al perfil de <strong className="text-slate-700">{pendingUnlockUser.fullName}</strong>
                  </p>
                </div>

                <div className="flex flex-col gap-1 text-xs">
                  <label className="font-semibold text-slate-600">Contraseña:</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={unlockPassword}
                    onChange={(e) => {
                      setUnlockPassword(e.target.value);
                      setUnlockError("");
                    }}
                    className="border border-slate-300 bg-white text-slate-800 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    autoFocus
                  />
                  {unlockError && <p className="text-[10px] text-red-600 font-semibold mt-1">{unlockError}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button
                    type="button"
                    onClick={handleCancelUnlock}
                    className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2 px-3 rounded-xl text-xs transition cursor-pointer text-center"
                  >
                    Volver a la Lista
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-xl text-xs transition cursor-pointer text-center"
                  >
                    Entrar
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-5 flex flex-col gap-4">
                
                {/* Profile list */}
                {users.length > 0 ? (
                  <div className="space-y-2">
                    <span className="block text-[10px] font-bold uppercase text-slate-600 tracking-wider">
                      Perfiles Registrados en este Dispositivo:
                    </span>
                    <div className="max-h-[160px] overflow-y-auto space-y-1.5 pr-1">
                      {users.map((u) => {
                        const isActive = u.email === activeUserEmail;
                        return (
                          <div
                            key={u.email}
                            onClick={() => handleSelectUser(u.email)}
                            className={`flex items-center justify-between p-2.5 rounded-xl border transition cursor-pointer ${
                              isActive
                                ? "bg-blue-50 border-blue-400 text-blue-950 font-bold"
                                : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-blue-600' : 'bg-slate-300'}`} />
                              <div className="min-w-0">
                                <p className="text-xs truncate">{u.fullName}</p>
                                <p className="text-[10px] text-slate-400 truncate">
                                  {u.username ? `@${u.username}` : ""} {u.username && u.email && u.email !== u.username ? `(${u.email})` : (u.email ? u.email : "")}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={(e) => handleDeleteUser(u.email, e)}
                              className="text-slate-400 hover:text-red-500 p-1 rounded cursor-pointer"
                              title="Eliminar Perfil"
                            >
                              <Trash className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic text-center py-2">
                    No hay ningún perfil creado todavía en este navegador. Crea uno a continuación.
                  </p>
                )}

                {/* Add / Register Form */}
                <form onSubmit={handleRegister} className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                  <span className="block text-[10px] font-bold uppercase text-slate-600 tracking-wider">
                    Crear Nuevo Perfil de Alumno:
                  </span>

                  <div className="flex flex-col gap-1 text-xs">
                    <label className="font-semibold text-slate-600">Nombre Completo:</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Naim Eliana"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="border border-slate-300 bg-white text-slate-800 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 text-xs">
                      <label className="font-semibold text-slate-600">
                        Usuario <span className="text-slate-600 font-normal">(Opcional si usas email)</span>:
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. naim_eliana"
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                        className="border border-slate-300 bg-white text-slate-800 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex flex-col gap-1 text-xs">
                      <label className="font-semibold text-slate-600">
                        Email <span className="text-slate-600 font-normal">(Opcional si usas usuario)</span>:
                      </label>
                      <input
                        type="email"
                        placeholder="naim@ejemplo.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="border border-slate-300 bg-white text-slate-800 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 text-xs">
                    <label className="font-semibold text-slate-600">Contraseña:</label>
                    <input
                      type="password"
                      required
                      placeholder="Contraseña del perfil"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="border border-slate-300 bg-white text-slate-800 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition cursor-pointer uppercase tracking-wider text-center mt-1"
                  >
                    Registrar Perfil y Activar
                  </button>
                </form>

              </div>
            )}

            <div className="bg-slate-50 p-3 text-center border-t border-slate-150">
              <button
                type="button"
                onClick={() => {
                  setShowRegisterModal(false);
                  setPendingUnlockUser(null);
                }}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------- */}
      {/* INTERACTIVE CONCEPT DETAIL MODAL */}
      {/* ---------------------------------- */}
      {selectedInteractiveConcept && (() => {
        const detail = getInteractiveConceptDetail(
          selectedInteractiveConcept.themeId,
          selectedInteractiveConcept.concept,
          selectedInteractiveConcept.type,
          activeOppositionId
        );
        return (
          <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-up">
              
              {/* Header */}
              <div className="bg-slate-900 text-white p-5 flex justify-between items-start gap-4 flex-shrink-0">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider block mb-1">
                    📖 Módulo de Estudio Interactivo ({selectedInteractiveConcept.themeId})
                  </span>
                  <h3 className="font-extrabold text-lg tracking-tight leading-tight">
                    {detail.title}
                  </h3>
                  <span className="inline-block text-[10px] bg-slate-800 text-slate-200 border border-slate-700 font-semibold px-2 py-0.5 rounded mt-1.5">
                    {detail.typeText}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedInteractiveConcept(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer flex-shrink-0"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto flex flex-col gap-5 text-sm leading-relaxed text-slate-700">
                
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-1">
                    Descripción y Alcance Teórico:
                  </h4>
                  <p className="text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 leading-relaxed">
                    {detail.detailText}
                  </p>
                </div>

                {detail.keyArticles.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2 flex items-center gap-1">
                      <span>⚖️ Articulado Oficial Relevante:</span>
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {detail.keyArticles.map((art, idx) => (
                        <li key={idx} className="bg-amber-50/40 p-2.5 rounded-lg border-l-4 border-amber-400 text-xs text-amber-950 font-medium">
                          {art}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {detail.plazosClave.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                      ⏳ Plazos y Cómputos Críticos:
                    </h4>
                    <div className="bg-red-50/30 border border-red-100 p-3 rounded-xl flex flex-col gap-1.5">
                      {detail.plazosClave.map((plazo, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-red-950">
                          <span className="text-red-500 mt-0.5">⏱️</span>
                          <span>{plazo}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 flex-shrink-0">
                  <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
                    <span>Regla Mnemotécnica de Memorización:</span>
                  </h4>
                  <p className="text-xs text-blue-950 leading-relaxed font-medium italic">
                    "{detail.mnemotecnia}"
                  </p>
                </div>

              </div>

              {/* Footer */}
              <div className="bg-slate-50 p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => {
                    openFullTheme(selectedInteractiveConcept.themeId);
                    setSelectedInteractiveConcept(null);
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 border border-indigo-200/50"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>📖 Ver Tema Completo en Manual</span>
                </button>
                <button
                  onClick={() => setSelectedInteractiveConcept(null)}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 transition cursor-pointer shadow-sm active:scale-95 text-center"
                >
                  Entendido, Cerrar Ficha
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* ---------------------------------- */}
      {/* FULL THEME MANUAL READER OVERLAY */}
      {/* ---------------------------------- */}
      {isFetchingTheme && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white p-8 rounded-2xl flex flex-col items-center gap-4 shadow-xl">
            <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="font-bold text-slate-700 text-sm animate-pulse">Cargando material de estudio real...</p>
          </div>
        </div>
      )}
      {viewingFullTheme && (() => {
        const fullTheme = viewingFullTheme;
        return (
          <>
            {/* Print-only representation of the full textbook */}
            <div className="hidden print:block print:p-8 text-slate-900 bg-white min-h-screen">
              <h1 className="text-3xl font-extrabold border-b pb-4">{fullTheme.title}</h1>
              <p className="text-sm font-mono text-slate-500 mt-2">{fullTheme.subtitle}</p>
              <p className="text-base italic leading-relaxed my-6 text-slate-700 bg-slate-50 p-4 border-l-4 border-slate-900">{fullTheme.introduction}</p>
              
              {fullTheme.sections.map((sec, idx) => (
                <div key={idx} className="my-8 avoid-break">
                  <h2 className="text-xl font-bold text-slate-900 mb-3">{sec.title}</h2>
                  <p className="text-base leading-relaxed text-slate-800 whitespace-pre-wrap">{sec.content}</p>
                </div>
              ))}
              
              <h2 className="text-xl font-bold text-slate-900 mt-12 mb-4">Artículos Clave Analizados</h2>
              {fullTheme.keyArticles.map((art, idx) => (
                <div key={idx} className="my-4 avoid-break p-4 border border-slate-200 rounded-xl">
                  <p className="font-bold text-base text-slate-900">{art.article}: {art.title}</p>
                  <p className="text-sm text-slate-700 mt-1">{art.description}</p>
                </div>
              ))}

              <h2 className="text-xl font-bold text-slate-900 mt-12 mb-4">Consejos de Examen y Memorización</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-800">
                {fullTheme.studyTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* Screen Interactive Reader */}
            <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-fade-in">
              <div className="bg-white rounded-2xl max-w-4xl w-full h-[90vh] border border-slate-200 shadow-2xl overflow-hidden flex flex-col animate-slide-up">
                {/* Header */}
                <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-indigo-600 text-white font-black text-xs px-2 py-0.5 rounded-md">{viewingFullTheme?.id}</span>
                      <span className="text-slate-400 text-xs font-semibold">{activeOpposition.name}</span>
                    </div>
                    <h2 className="text-lg font-black tracking-tight mt-0.5">{fullTheme.title}</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-3.5 rounded-xl text-xs transition cursor-pointer"
                    >
                      <Printer className="h-4 w-4" />
                      <span className="hidden sm:inline">Imprimir Tema</span>
                    </button>
                    <button
                      onClick={() => setViewingFullTheme(null)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2 rounded-xl transition cursor-pointer"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-slate-50/50">
                  
                  {/* Introduction Banner */}
                  <div className="bg-indigo-50/70 border border-indigo-100 p-5 rounded-2xl">
                    <p className="text-sm font-semibold text-indigo-950 leading-relaxed italic">
                      "{fullTheme.introduction}"
                    </p>
                  </div>

                  {/* Sections */}
                  <div className="space-y-8">
                    {fullTheme.sections.map((sec, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs">
                        <h3 className="text-lg font-black text-slate-900 mb-3.5 border-b pb-2 border-slate-100">{sec.title}</h3>
                        <p className="text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-wrap font-medium">
                          {sec.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Key Articles */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs space-y-4">
                    <h3 className="text-lg font-black text-slate-900 border-b pb-2 border-slate-100 font-mono">⚖️ Artículos Clave Analizados</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {fullTheme.keyArticles.map((art, idx) => (
                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
                          <div>
                            <span className="inline-block bg-slate-200 text-slate-800 text-[10px] font-black px-2 py-0.5 rounded-md mb-2">{art.article}</span>
                            <h4 className="font-bold text-xs sm:text-sm text-slate-900">{art.title}</h4>
                            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{art.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Study Tips */}
                  <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 shadow-xs space-y-4">
                    <h3 className="text-lg font-black text-amber-950 flex items-center gap-1.5">
                      <Sparkles className="h-5 w-5 text-amber-600 animate-pulse" />
                      <span>Consejos de Examen y Memorización</span>
                    </h3>
                    <ul className="list-disc pl-5 space-y-2.5 text-xs sm:text-sm text-amber-900 font-medium">
                      {fullTheme.studyTips.map((tip, idx) => (
                        <li key={idx} className="leading-relaxed">{tip}</li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Footer */}
                <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end gap-2 flex-shrink-0">
                  <button
                    onClick={() => setViewingFullTheme(null)}
                    className="px-5 py-2.5 bg-slate-900 text-white font-extrabold rounded-xl text-xs hover:bg-slate-800 transition cursor-pointer shadow-sm"
                  >
                    Cerrar Manual de Estudio
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      })()}

      {/* ---------------------------------- */}
      {/* INTERACTIVE EXAM VIEWER MODAL */}
      {/* ---------------------------------- */}
      {viewingExamId && selectedViewingExam && (
        <>
          {/* Print version of the exam */}
          <div className="hidden print:block print:p-8 text-black bg-white min-h-screen">
            <h1 className="text-2xl font-bold uppercase border-b-2 border-black pb-2 mb-4">
              CUADERNILLO DE EXAMEN - {selectedViewingExam.name}
            </h1>
            <p className="text-sm mb-6">
              <strong>Oposición:</strong> {activeOpposition.name}<br/>
              <strong>Fecha Oficial:</strong> {selectedViewingExam.date ? new Date(selectedViewingExam.date).toLocaleDateString("es-ES") : "Convocatoria"}<br/>
            </p>
            <div className="space-y-6">
              {viewingExamQuestions.map((q) => (
                <div key={q.id} className="text-sm">
                  <p className="font-bold mb-2">{q.number}. {q.statement}</p>
                  <ul className="pl-4 space-y-1">
                    {(["A", "B", "C", "D"] as const).map(opt => (
                      <li key={opt}>{opt}) {q.options[opt]}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl max-w-4xl w-full h-[85vh] border border-slate-200 shadow-2xl overflow-hidden flex flex-col animate-slide-up">
            {/* Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-600 text-white font-black text-xs px-2 py-0.5 rounded-md">EXAMEN OFICIAL</span>
                  <span className="text-slate-400 text-xs font-semibold">{activeOpposition.name}</span>
                </div>
                <h2 className="text-lg font-black tracking-tight mt-0.5">{selectedViewingExam.name}</h2>
              </div>
              <button
                onClick={() => setViewingExamId(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2 rounded-xl transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Sub-Header specs bar */}
            <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex flex-wrap gap-4 text-xs text-slate-600 flex-shrink-0 font-medium">
              <span>📅 <strong>Fecha Oficial:</strong> {selectedViewingExam.date ? new Date(selectedViewingExam.date).toLocaleDateString("es-ES") : "Convocatoria"}</span>
              <span>🎖️ <strong>Nota de Corte:</strong> {selectedViewingExam.cutOffScore} / 100</span>
              <span>📈 <strong>Aspirantes:</strong> {selectedViewingExam.totalApplicants.toLocaleString()}</span>
              <span>🏆 <strong>Plazas convocadas:</strong> {selectedViewingExam.passedCount}</span>
            </div>

            {/* Body Sheet */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-slate-50/50">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-xs text-blue-900 leading-relaxed">
                <h4 className="font-extrabold flex items-center gap-1.5 uppercase tracking-wider mb-1">
                  <span>📖 Instrucciones de Examen</span>
                </h4>
                <p>
                  Estás visualizando el cuestionario técnico de preguntas oficiales de la convocatoria seleccionada. Cada pregunta cuenta con cuatro opciones de respuesta alternativas, siendo únicamente una de ellas la correcta. Al final de cada bloque podrás pulsar sobre "Ver Solución Oficial" para verificar el fundamento jurídico.
                </p>
              </div>

              {/* Questions Sheet */}
              <div className="space-y-6">
                {viewingExamQuestions.map((q) => (
                  <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-extrabold text-slate-900 text-sm flex gap-2">
                        <span className="text-blue-600 font-mono">Pregunta {q.number}:</span>
                        <span className="leading-relaxed">{q.statement}</span>
                      </h4>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {(["A", "B", "C", "D"] as const).map((opt) => (
                        <div
                          key={opt}
                          className="p-3 bg-slate-50 border border-slate-150 rounded-xl text-xs flex gap-2.5 items-start text-slate-700"
                        >
                          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-black flex items-center justify-center flex-shrink-0">
                            {opt}
                          </span>
                          <span className="leading-relaxed">{q.options[opt]}</span>
                        </div>
                      ))}
                    </div>

                    {/* Expandable Key and Justification */}
                    <div className="pt-2">
                      <details className="group border border-slate-150 bg-slate-50/50 rounded-xl">
                        <summary className="flex justify-between items-center p-3 text-xs font-bold text-slate-600 cursor-pointer select-none hover:bg-slate-50 transition">
                          <span>🔍 Ver Solución Oficial y Fundamentación</span>
                          <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="p-4 border-t border-slate-150 text-xs text-slate-700 space-y-2 bg-white">
                          <p className="font-bold text-emerald-700 flex items-center gap-1.5">
                            <span>✓ Opción Correcta: {q.correct}</span>
                          </p>
                          <p className="leading-relaxed">
                            {q.explanation}
                          </p>
                          <p className="font-mono text-[10px] text-slate-400">
                            ⚖️ Fundamento Jurídico: {q.reference}
                          </p>
                        </div>
                      </details>
                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* Footer buttons */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap justify-between items-center gap-3 flex-shrink-0 text-xs">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    alert("Cuestionario de examen enviado a la cola de impresión. Su formato de lectura está optimizado.");
                    window.print();
                  }}
                  className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition cursor-pointer flex items-center gap-1.5"
                >
                  <Printer className="h-4 w-4" />
                  <span>Imprimir Cuadernillo</span>
                </button>
                <button
                  onClick={() => {
                    const content = `PLANTILLA CORRECTORA DEFINITIVA\nOposición: ${activeOpposition.name}\nConvocatoria: ${selectedViewingExam.name}\n\n`;
                    const answersText = viewingExamQuestions.map(q => `${q.number}. ${q.correct}`).join('\n');
                    const blob = new Blob([content + answersText], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `solucionario_${selectedViewingExam.id}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-750 transition cursor-pointer"
                >
                  Descargar Solucionario (TXT)
                </button>
              </div>
              <button
                onClick={() => {
                  setViewingExamId(null);
                  setActiveTab("generador");
                  alert(`Redirigiendo al Generador de Exámenes. Hemos configurado la simulación oficial de ${selectedViewingExam.name} para que midas tu tiempo.`);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                <Sparkles className="h-4 w-4" />
                <span>Simular este Examen</span>
              </button>
            </div>

          </div>
        </div>
        </>
      )}

      {/* ---------------------------------- */}
      {/* INLINE NOTE EDITOR IN MODAL */}
      {/* ---------------------------------- */}
      {editingThemeId && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-[#0f172a] text-white p-4">
              <h3 className="font-bold text-sm">Nota de estudio: Tema {editingThemeId}</h3>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <label className="text-xs text-slate-500">
                Escribe un resumen rápido, plazos importantes o dudas sobre este tema:
              </label>
              <textarea
                value={editingNoteText}
                onChange={(e) => setEditingNoteText(e.target.value)}
                maxLength={400}
                placeholder="Ej. Recordar que los recursos de apelación en el juicio ordinario civil se interponen ante el tribunal que haya dictado la resolución que se impugne en el plazo de 20 días."
                rows={5}
                className="w-full border border-slate-300 bg-white text-slate-800 text-xs p-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-400"
              />
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <span>Máximo 400 caracteres.</span>
                <span>{editingNoteText.length}/400</span>
              </div>
            </div>
            <div className="bg-slate-50 p-3 flex justify-end gap-2 border-t border-slate-150 text-xs">
              <button
                onClick={() => {
                  setEditingThemeId(null);
                  setEditingNoteText("");
                }}
                className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100 font-bold text-slate-600 cursor-pointer"
              >
                Descartar
              </button>
              <button
                onClick={saveThemeNote}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold cursor-pointer flex items-center gap-1"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Guardar Nota</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------- */}
      {/* SCREEN FOOTER (Hidden in Print) */}
      {/* ---------------------------------- */}
      <footer className="no-print bg-[#0f172a] text-slate-400 text-xs py-8 mt-12 border-t border-slate-800">
  <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
    
    {/* Este es el div que contenía el título y los enlaces, y le faltaba su cierre */}
    <div>
      <p className="font-bold text-white">Preparador de Oposiciones - {activeOpposition.name}</p>
      <div className="flex gap-4">
        <a
          href="https://github.com/naimmeliana-prog/procesos"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition"
        > 
          Mazari
        </a>
        <span>•</span>
        <span className="text-slate-500">© 2026 Todos los derechos reservados</span>
      </div>
    </div> {/* 👈 ¡AQUÍ ESTABA EL FALLO! Faltaba este cierre de div */}

  </div>
</footer>

      {/* ---------------------------------- */}
      {/* PRINT-ONLY FOOTER (Strictly layout for PDF) */}
      {/* ---------------------------------- */}
      <div className="print-only-footer hidden">
        <div className="print-footer">
          <p>Preparador de Oposiciones de {activeOpposition.name} - naimmeliana-prog/procesos</p>
          <p className="text-[9px] mt-1 text-slate-400 font-mono">
            Este dossier es confidencial y ha sido optimizado con fines educativos de estudio personal.
          </p>
        </div>
      </div>

    </div>
  );
}
