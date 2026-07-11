/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserAccount {
  email: string; // Used as the primary key/ID, can contain email or username
  username?: string;
  password?: string;
  fullName: string;
  createdAt: string;
  completedThemes: string[]; // List of theme IDs
  themeNotes: Record<string, string>; // themeId -> personal note
  examScores: {
    id: string;
    date: string;
    convocatorias: string[];
    difficulty: string;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    score: number;
    xpEarned?: number;
  }[];
  xp?: number;
  level?: number;
  badges?: string[]; // list of badge IDs
  studyEvents?: StudyEvent[];
}

export interface StudyEvent {
  id: string;
  date: string; // YYYY-MM-DD
  themeId?: string; // Associated theme if any
  examId?: string; // Associated exam if any
  title: string;
  durationMinutes: number;
  completed: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  url?: string;
  icon: string;
  xpThreshold?: number;
  completedThemesCount?: number;
  examsCompletedCount?: number;
  color: string;
}

export interface ForumThread {
  id: string;
  title: string;
  authorName: string;
  authorEmail: string;
  content: string;
  category: "Temario" | "Exámenes" | "Técnicas de Estudio" | "Dudas Generales";
  createdAt: string;
  upvotes: number;
  upvotedBy: string[]; // emails
  replies: ForumReply[];
  isLocked?: boolean;
}

export interface ForumReply {
  id: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
  isHelpful?: boolean;
  helpfulCount: number;
  helpfulBy: string[]; // emails
}

export interface SyllabusTheme {
  id: string; // e.g., "T1"
  title: string;
  block: "I" | "II" | "III";
  blockTitle: string;
  description: string;
  url?: string;
  articles: string; // Relevant laws/articles (e.g., "Art. 1-9 CE")
  keyConcepts: string[];
}

export interface SyllabusBlock {
  id: "I" | "II" | "III";
  title: string;
  themesCount: number;
}

export interface OfficialExam {
  id: string; // e.g., "conv-2023"
  year: number;
  name: string; // e.g., "Convocatoria OEP 2023 (Examen marzo 2024)"
  date: string;
  status: "Oficial" | "Nuevo" | "Simulacro";
  averageScore: number;
  cutOffScore: number; // Nota de corte
  totalApplicants: number;
  passedCount: number;
  themeDistribution: Record<string, number>; // blockId or themeId -> percentage
  questionsCount: number;
  oppositionId?: string;
}

export interface ExamQuestion {
  id: string;
  convocatoriaId: string;
  convocatoriaName: string;
  themeId: string; // Associated theme
  questionNumber: number;
  statement: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctOption: "A" | "B" | "C" | "D";
  explanation: string;
  articleReference: string; // e.g., "Art. 438.1 LEC"
  difficulty: "fácil" | "medio" | "difícil";
  patternType?: string; // e.g., "Trampa de Plazo", "Competencia", "Literalidad"
}

export interface ExamTrap {
  id: string;
  convocatorias: string[];
  title: string;
  description: string;
  url?: string;
  pattern: string; // The pattern used by examiners
  exampleOriginal: string; // Real exam example text
  exampleTrap: string; // How the trap was set up
  technique: string; // How to detect and avoid it
  relevance: "Alta" | "Media" | "Crítica";
}

export interface DifficultQuestionPattern {
  id: string;
  convocatorias: string[];
  title: string;
  article: string;
  difficultyExplanation: string;
  patternDescription: string;
  memorizationTechnique: string;
  realQuestionSample: string;
  correctAnswer: string;
}

export interface Opposition {
  id: string;
  name: string;
  reference: string;
  deadline: "Abierto" | "Cerrado";
  group: string; // e.g., "A1", "A2", "C1", "C2", "B", "APF"
  accessType: string; // e.g., "Turno libre", "Promoción interna", "Bolsa de trabajo"
  disability: "General" | "Intelectual" | "Ninguna";
  body: "Estatal" | "Autonómico" | "Local" | "Internacional" | "Universidades" | "Otros";
  location: {
    autonomy?: string;
    province?: string;
    municipality?: string;
    country?: string;
  };
  personalType: "Personal funcionario" | "Personal Laboral" | "Personal Estatutario" | "Militar" | "Otro";
  examType: string; // e.g., "Oposición", "Concurso-oposición", "Prueba de aptitud"
  degree: string;
  description: string;
  url?: string;
  totalPlaces: number;
  officialExamsCount: number;
  syllabusBlocks?: SyllabusBlock[];
  syllabusThemes?: SyllabusTheme[];
  examTraps?: ExamTrap[];
  difficultPatterns?: DifficultQuestionPattern[];
  practicalCases?: PracticalCase[];
  requirements?: any[];
  analysisGlobal?: any;
}

export interface PracticalCase {
  id: string;
  title: string;
  convocatorias: string[];
  blocks: string[]; // e.g. ["I", "II"]
  statement: string; // Case scenario
  generalGuidelines: string[];
  specificGuidelines: string[];
  questions: {
    id: string;
    statement: string;
    options: {
      A: string;
      B: string;
      C: string;
      D: string;
    };
    correctOption: "A" | "B" | "C" | "D";
    explanation: string;
    articleReference: string;
  }[];
  difficulty?: string;
  block?: string;
  oppositionContext?: string;
}

