export type SupportedLanguage = 
  | 'ta' // Tamil
  | 'hi' // Hindi
  | 'te' // Telugu
  | 'mr' // Marathi
  | 'bn' // Bengali
  | 'kn'; // Kannada

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  script: string;
}

export interface VocabularyAnchor {
  id: string;
  formalEnglishTerm: string;
  vernacularTerm: string;
  phoneticPronunciation: string;
  colloquialAnalogy: string;
  pedagogicalRole: 'definition' | 'operator' | 'constraint' | 'physical_quantity';
  exampleUsage: string;
}

export interface ProofStepClause {
  id: string;
  clauseIndex: number;
  englishClause: string;
  vernacularIntuition: string;
  mathematicalOperator: string;
  scientificIdiomAnchor?: string;
  whyLiteralTranslationFails: string;
}

export interface ProofAssemblerPiece {
  id: string;
  correctOrder: number;
  englishFragment: string;
  vernacularHint: string;
  isPlaced: boolean;
}

export interface RegisterScoreEvaluation {
  overallScore: number; // 0 - 100
  rating: 'Colloquial' | 'Emerging Academic' | 'Formal Academic' | 'Exemplary Scientific';
  strengths: string[];
  syntaxImprovements: {
    originalPhrase: string;
    recommendedFormalAcademicPhrase: string;
    explanation: string;
  }[];
  mathematicalPrecisionFeedback: string;
}

export interface TranslanguaStudySet {
  id: string;
  title: string;
  topic: string;
  domain: 'Physics' | 'Chemistry' | 'Mathematics' | 'Computer Science' | 'Biology' | 'General STEM';
  sourceCurriculum: string;
  originalDenseEnglishText: string;
  brokenLiteralTranslation: {
    language: SupportedLanguage;
    text: string;
    identifiedErrors: string[];
  };
  vernacularConceptualAnalogy: {
    language: SupportedLanguage;
    analogyTitle: string;
    narrative: string;
    culturalContextualAnchor: string;
  };
  clauseMap: ProofStepClause[];
  vocabularyAnchors: VocabularyAnchor[];
  proofAssemblerPieces: ProofAssemblerPiece[];
  formalEnglishSummary: string;
}
