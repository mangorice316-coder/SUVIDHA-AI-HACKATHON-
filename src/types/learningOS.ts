export type TeacherPersonaId = 
  | 'socratic' 
  | 'coach' 
  | 'professor' 
  | 'exam_trainer' 
  | 'beginner' 
  | 'challenger';

export interface TeacherPersona {
  id: TeacherPersonaId;
  name: string;
  avatar: string;
  tagline: string;
  styleDescription: string;
  tonePrompt: string;
}

export interface LearningDNA {
  conceptRetention: number;    // 0-100
  problemSolving: number;      // 0-100
  recallSpeed: number;         // 0-100
  applicationScore: number;    // 0-100
  consistencyRate: number;     // 0-100
  overallEfficiency: number;   // 0-100
  bestLearningMode: string;
  optimalSessionMinutes: number;
  hiddenWeakness: string;
  strongestSkill: string;
}

export interface GoalReversePlan {
  targetSubject: string;
  targetScore: number;         // e.g. 90
  examDaysRemaining: number;   // e.g. 24
  predictedReadiness: number;  // e.g. 78
  highestRiskTopic: string;
  dailyMinutesNeeded: number;
  paceStatus: 'on_track' | 'needs_boost' | 'at_risk';
  milestones: {
    day: number;
    title: string;
    focus: string;
    completed: boolean;
  }[];
}

export interface QuickImpactSession {
  totalMinutes: number;
  breakdown: {
    phase: string;
    minutes: number;
    activity: string;
    actionType: 'concept_repair' | 'active_recall' | 'problem_solving' | 'mistake_review';
  }[];
}

export interface MistakeTaxonomy {
  totalAnalyzed: number;
  conceptGapsPct: number;
  calculationErrorsPct: number;
  misreadingQuestionsPct: number;
  formulaConfusionPct: number;
  guessingPct: number;
  primaryDiagnosticAdvice: string;
}

export interface MultiPerspectiveExplanation {
  conceptTitle: string;
  simpleExplanation: string;
  technicalExplanation: string;
  culturalAnalogy: string;
  mathematicalProof: string;
}

export interface VirtualExperiment {
  id: string;
  title: string;
  subject: string;
  description: string;
  variableName: string;
  variableMin: number;
  variableMax: number;
  variableStep: number;
  variableUnit: string;
  defaultVal: number;
  observedFormula: (val: number) => number;
  observedName: string;
  observedUnit: string;
  predictionQuestion: string;
  predictionOptions: string[];
  correctPredictionIndex: number;
  scientificExplanation: string;
}
