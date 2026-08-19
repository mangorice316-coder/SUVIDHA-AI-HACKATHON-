import { SupportedLanguage } from './translangua';

export type MasteryLevel = 'locked' | 'learning' | 'mastered' | 'gap_detected';

export interface SkillNode {
  id: string;
  subject: 'Physics' | 'Chemistry' | 'Biology' | 'Mathematics';
  title: string;
  vernacularTitle: Record<SupportedLanguage, string>;
  description: string;
  level: MasteryLevel;
  prerequisites: string[]; // IDs of prerequisite skill nodes
  xpReward: number;
  studyKey?: string;
  chapter: string;
}

export interface KnowledgeGap {
  targetConcept: string;
  missingPrerequisite: string;
  severity: 'high' | 'medium' | 'low';
  diagnosticReason: string;
  recommendedAction: string;
  quickStudyKey: string;
}

export interface MistakeRecord {
  id: string;
  subject: string;
  conceptTitle: string;
  question: string;
  studentAnswer: string;
  correctAnswer: string;
  rootMisconception: string; // The "Why Am I Wrong" analysis
  conceptRule: string;
  confidenceScore: 'guessing' | 'somewhat' | 'confident' | 'very_confident';
  timestamp: string;
  resolved: boolean;
}

export interface SpacedRevisionItem {
  id: string;
  conceptId: string;
  conceptTitle: string;
  subject: string;
  dueDate: string; // e.g. "Today" | "Tomorrow" | "In 3 Days"
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
  promptQuestion: string;
  answerExplanation: string;
}

export interface FeynmanEvaluation {
  accuracyScore: number; // 0 - 100
  clarityScore: number;  // 0 - 100
  depthScore: number;    // 0 - 100
  masteryVerdict: 'Mastered' | 'Nearly There' | 'Needs Review';
  keyStrengths: string[];
  missingCrucialConcepts: string[];
  misconceptionsIdentified: string[];
  improvedSummary: string;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress: number;
  total: number;
  xpReward: number;
}
