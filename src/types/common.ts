export type ActiveModule = 'topostem' | 'translangua' | 'pathweaver';

export type HighContrastMode = 'standard' | 'high-contrast' | 'night-mono';

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
