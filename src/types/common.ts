import { SupportedLanguage } from './translangua';

export type ActiveModule = 'translangua' | 'topostem' | 'proof_lab' | 'custom_study' | 'progress';

export type HighContrastMode = 'standard' | 'high-contrast' | 'night-mono';

export type StudentClass = 'class_9' | 'class_10' | 'class_11' | 'class_12' | 'college_ug';

export type EducationBoard = 'cbse' | 'state_board' | 'icse_isc' | 'university';

export interface UserProfile {
  name: string;
  studentClass: StudentClass;
  board: EducationBoard;
  homeLanguage: SupportedLanguage;
  goalSubject?: string;
  createdAt: string;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  soundEnabled: boolean;
  screenReaderVerbose: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
}

export interface PresetCaseStudy {
  id: string;
  title: string;
  module: ActiveModule;
  category: string;
  description: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
}

