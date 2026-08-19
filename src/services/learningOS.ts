import {
  LearningDNA,
  TeacherPersona,
  TeacherPersonaId,
  GoalReversePlan,
  QuickImpactSession,
  MistakeTaxonomy,
  MultiPerspectiveExplanation,
  VirtualExperiment
} from '../types/learningOS';
import { geminiService } from './gemini';

export const TEACHER_PERSONAS: TeacherPersona[] = [
  {
    id: 'socratic',
    name: 'The Socratic Guide',
    avatar: '🧘',
    tagline: 'Never gives away answers; asks guiding questions to build deep intuition.',
    styleDescription: 'Guides you step-by-step through inquiry and thought experiments.',
    tonePrompt: 'Act as a wise Socratic tutor. Never reveal the final answer directly. Ask guiding, thought-provoking questions that help the student deduce the principles themselves.'
  },
  {
    id: 'coach',
    name: 'The High-Performance Coach',
    avatar: '🏆',
    tagline: 'High energy, goal-driven, and celebrates every breakthrough.',
    styleDescription: 'Keeps momentum high with actionable milestones and positive reinforcement.',
    tonePrompt: 'Act as an energetic, inspiring academic coach. Keep answers punchy, motivating, and focused on building confidence and speed.'
  },
  {
    id: 'professor',
    name: 'The Rigorous Professor',
    avatar: '🎓',
    tagline: 'Strict mathematical proof, formal terminology, and conceptual depth.',
    styleDescription: 'Focuses on exact mathematical derivations and academic precision.',
    tonePrompt: 'Act as a distinguished STEM university professor. Emphasize rigorous mathematical definitions, formal derivations, and boundary condition proofs.'
  },
  {
    id: 'exam_trainer',
    name: 'The Exam Strategist',
    avatar: '🎯',
    tagline: 'Focuses on CBSE/Board scoring rubrics, mark distribution, and keywords.',
    styleDescription: 'Teaches you how examiners grade and where students lose silly marks.',
    tonePrompt: 'Act as an elite exam trainer for CBSE and competitive exams. Highlight exact scoring keywords, step-marking rubrics, and common trap questions.'
  },
  {
    id: 'beginner',
    name: 'The Zero-Assumption Tutor',
    avatar: '🐣',
    tagline: 'Assumes zero prior knowledge; uses everyday kitchen & street analogies.',
    styleDescription: 'Breaks every complex equation down into simple, intuitive stories.',
    tonePrompt: 'Act as a super friendly beginner tutor. Assume the student has zero background in physics or math. Use everyday metaphors like tea stalls, bicycles, and water pipes.'
  },
  {
    id: 'challenger',
    name: 'The Grandmaster Challenger',
    avatar: '⚔️',
    tagline: 'Pushes you with Olympiad-level edge cases and tricky conceptual twists.',
    styleDescription: 'Tests whether your understanding breaks under extreme physical conditions.',
    tonePrompt: 'Act as a challenging intellectual sparring partner. Present non-standard edge cases, counter-intuitive paradoxes, and stress-test the student understanding.'
  }
];

export const INITIAL_LEARNING_DNA: LearningDNA = {
  conceptRetention: 82,
  problemSolving: 68,
  recallSpeed: 91,
  applicationScore: 64,
  consistencyRate: 85,
  overallEfficiency: 79,
  bestLearningMode: 'Interactive 3D & Mother-Tongue Analogy',
  optimalSessionMinutes: 22,
  hiddenWeakness: 'Multi-step calculus rate problems under time pressure',
  strongestSkill: 'Qualitative physical intuition & active concept recall'
};

export const INITIAL_GOAL_PLAN: GoalReversePlan = {
  targetSubject: 'Class 12 Physics & Chemistry',
  targetScore: 92,
  examDaysRemaining: 24,
  predictedReadiness: 78,
  highestRiskTopic: 'Electromagnetic Flux & Induced EMF (Faraday/Lenz)',
  dailyMinutesNeeded: 35,
  paceStatus: 'needs_boost',
  milestones: [
    { day: 1, title: 'Vectors & Kinematics Mastery', focus: 'Mechanics Foundation', completed: true },
    { day: 5, title: 'Electromagnetic Induction Bridge', focus: 'Faraday & Lenz Opposition', completed: true },
    { day: 10, title: 'Equilibrium & Thermodynamics', focus: 'Le Chatelier & Gibbs Free Energy', completed: false },
    { day: 18, title: 'Modern Physics & Quantum Optics', focus: 'Photoelectric & De Broglie', completed: false },
    { day: 24, title: 'Full 3-Hour Timed Mock Exam', focus: 'Comprehensive Syllabus', completed: false }
  ]
};

export const INITIAL_MISTAKE_TAXONOMY: MistakeTaxonomy = {
  totalAnalyzed: 48,
  conceptGapsPct: 34,
  calculationErrorsPct: 22,
  misreadingQuestionsPct: 18,
  formulaConfusionPct: 16,
  guessingPct: 10,
  primaryDiagnosticAdvice: 'Your primary failure mode is subtle conceptual confusion around vector signs (+/- EMF) rather than raw calculation.'
};

export const MULTI_PERSPECTIVE_LIBRARY: Record<string, MultiPerspectiveExplanation> = {
  faraday_law: {
    conceptTitle: "Faraday's Law of Induction & Lenz's Opposition",
    simpleExplanation: "Nature is stubborn: whenever you try to change the magnetic field passing through a loop of wire, the wire fights back by creating its own magnetic field in the opposite direction!",
    technicalExplanation: "The electromotive force (EMF, ε) induced in any closed circuit is directly proportional to the time rate of change of magnetic flux (dΦ/dt) through the circuit: ε = -N (dΦ/dt). The negative sign represents Lenz's Law of energy conservation.",
    culturalAnalogy: "Imagine pedaling a bicycle through a crowded bazaar. If you suddenly try to accelerate through a gap, the crowd naturally pushes back against you to resist the sudden change in rhythm.",
    mathematicalProof: "Φ = ∬ B · dA. By Stokes' Theorem, ∮ E · dl = -d/dt ∬ B · dA. Hence ∇ × E = -∂B/∂t (Maxwell-Faraday Equation)."
  },
  le_chatelier: {
    conceptTitle: "Le Chatelier's Dynamic Equilibrium Principle",
    simpleExplanation: "A chemical reaction in equilibrium acts like a spring mattress: if you press down on one side (add heat or pressure), the reaction shifts to the other side to relieve the stress.",
    technicalExplanation: "If a dynamic equilibrium is disturbed by changing conditions (temperature, pressure, or concentration), the position of equilibrium moves to counteract the change: Q ≠ K forces reaction quotient Q back toward equilibrium constant K.",
    culturalAnalogy: "Like a village weighing scale balanced with grains: if someone suddenly pours more rice onto the left pan, you must add counterweights on the right pan to restore balance.",
    mathematicalProof: "ΔG = ΔG° + RT ln(Q). At equilibrium ΔG = 0, so ΔG° = -RT ln(K). Perturbing concentration alters Q, causing ΔG to become non-zero, driving spontaneous shift until Q = K."
  },
  photosynthesis: {
    conceptTitle: "Photosynthesis: Light & Dark Phase Coupling",
    simpleExplanation: "Plants run a solar kitchen: the sun's rays crack open water molecules to charge up tiny biological batteries (ATP & NADPH), which are then used in the kitchen to bake carbon dioxide into sugar.",
    technicalExplanation: "Solar photons excite electrons in Photosystem II (P680), driving water photolysis (2H₂O → 4H⁺ + 4e⁻ + O₂). The resulting proton gradient powers ATP synthase, generating ATP and NADPH for the enzymatic Calvin Cycle.",
    culturalAnalogy: "Like a solar-powered flour mill: the roof panels generate electricity during daylight and charge a backup battery, which runs the grinding machine continuously to turn wheat into flour.",
    mathematicalProof: "6CO₂ + 6H₂O + 48 photons (hν) → C₆H₁₂O₆ + 6O₂ (ΔG° = +2870 kJ/mol, requiring solar energetic uphill coupling)."
  }
};

export const VIRTUAL_EXPERIMENTS: VirtualExperiment[] = [
  {
    id: 'exp-ohm',
    title: "Ohm's Law: Resistance vs Current Flow",
    subject: 'Physics',
    description: 'Adjust circuit resistance at constant 12V supply and predict how current behaves.',
    variableName: 'Resistance (R)',
    variableMin: 1,
    variableMax: 20,
    variableStep: 1,
    variableUnit: 'Ω',
    defaultVal: 4,
    observedFormula: (r: number) => +(12 / r).toFixed(2),
    observedName: 'Induced Current (I)',
    observedUnit: 'Amperes (A)',
    predictionQuestion: 'If you double the resistance from 4Ω to 8Ω, what will happen to the current?',
    predictionOptions: [
      'Current will double to 6.0 A',
      'Current will drop by half to 1.5 A',
      'Current will remain constant at 3.0 A',
      'Current will drop to zero'
    ],
    correctPredictionIndex: 1,
    scientificExplanation: "By Ohm's Law (I = V/R), current is inversely proportional to resistance. Doubling resistance cuts the electron drift velocity in half."
  },
  {
    id: 'exp-faraday',
    title: "Faraday Magnet Speed vs Induced Peak EMF",
    subject: 'Physics',
    description: 'Vary the velocity of a bar magnet entering a 200-turn copper solenoid.',
    variableName: 'Magnet Entry Velocity (v)',
    variableMin: 1,
    variableMax: 10,
    variableStep: 1,
    variableUnit: 'm/s',
    defaultVal: 3,
    observedFormula: (v: number) => +(v * 1.65).toFixed(2),
    observedName: 'Peak Induced EMF (ε)',
    observedUnit: 'Volts (V)',
    predictionQuestion: 'How does doubling the entry velocity impact the peak induced voltage across the coil?',
    predictionOptions: [
      'Voltage increases linearly because rate of flux change dΦ/dt doubles',
      'Voltage decreases because the magnet spends less time in the coil',
      'Voltage remains unchanged because magnetic strength is constant',
      'Voltage oscillates unpredictably'
    ],
    correctPredictionIndex: 0,
    scientificExplanation: "Faraday's Law states ε = -N (dΦ/dt) = -N (dΦ/dx)(dx/dt) = -N (dΦ/dx) · v. Induced EMF scales linearly with insertion speed."
  }
];

class LearningOSService {
  private learningDNA: LearningDNA = INITIAL_LEARNING_DNA;
  private goalPlan: GoalReversePlan = INITIAL_GOAL_PLAN;
  private activePersona: TeacherPersona = TEACHER_PERSONAS[0];

  // --- 1. "I ONLY HAVE X MINUTES" GENERATOR ---
  public generateQuickImpactSession(minutes: number): QuickImpactSession {
    if (minutes <= 10) {
      return {
        totalMinutes: 10,
        breakdown: [
          { phase: 'Concept Repair', minutes: 2, activity: 'Fix 1 targeted prerequisite misconception', actionType: 'concept_repair' },
          { phase: 'Active Recall', minutes: 4, activity: 'Flash recall 3 core scientific equations', actionType: 'active_recall' },
          { phase: 'Problem Solving', minutes: 4, activity: 'Solve 2 adaptive exam practice questions', actionType: 'problem_solving' }
        ]
      };
    } else if (minutes <= 15) {
      return {
        totalMinutes: 15,
        breakdown: [
          { phase: 'Concept Repair', minutes: 3, activity: 'Review Faraday & Lenz opposition rule', actionType: 'concept_repair' },
          { phase: 'Active Recall', minutes: 5, activity: 'Retrieval practice on 4 formula cards', actionType: 'active_recall' },
          { phase: 'Targeted Problems', minutes: 5, activity: 'Attempt 3 medium-difficulty exam problems', actionType: 'problem_solving' },
          { phase: 'Mistake Review', minutes: 2, activity: 'Resolve 1 past error in the Mistake Notebook', actionType: 'mistake_review' }
        ]
      };
    } else if (minutes <= 25) {
      return {
        totalMinutes: 25,
        breakdown: [
          { phase: 'Prerequisite Repair', minutes: 5, activity: 'Review Vector components & rate of change', actionType: 'concept_repair' },
          { phase: 'Concept Derivation', minutes: 8, activity: 'Interactive 3D simulation + LaTeX proof steps', actionType: 'concept_repair' },
          { phase: 'Multi-Step Practice', minutes: 8, activity: 'Solve 4 multi-step numerical derivations', actionType: 'problem_solving' },
          { phase: 'Spaced Recall', minutes: 4, activity: 'Confidence-calibrated spaced repetition deck', actionType: 'active_recall' }
        ]
      };
    } else {
      return {
        totalMinutes: 45,
        breakdown: [
          { phase: 'Deep Concept Bridge', minutes: 10, activity: 'Dual-layer mother tongue analogy + formal theorem', actionType: 'concept_repair' },
          { phase: '3D Simulation Lab', minutes: 10, activity: 'Virtual experiment + parameter prediction', actionType: 'problem_solving' },
          { phase: 'Exam Register Scorer', minutes: 15, activity: 'Assemble complete proof + Academic AI scoring', actionType: 'problem_solving' },
          { phase: 'Feynman Studio & Review', minutes: 10, activity: 'Teach It Back aloud + log remaining mistakes', actionType: 'mistake_review' }
        ]
      };
    }
  }

  // --- GETTERS & SETTERS ---
  public getLearningDNA(): LearningDNA {
    return this.learningDNA;
  }

  public getGoalPlan(): GoalReversePlan {
    return this.goalPlan;
  }

  public getMistakeTaxonomy(): MistakeTaxonomy {
    return INITIAL_MISTAKE_TAXONOMY;
  }

  public getActivePersona(): TeacherPersona {
    return this.activePersona;
  }

  public setActivePersona(id: TeacherPersonaId) {
    const found = TEACHER_PERSONAS.find(p => p.id === id);
    if (found) {
      this.activePersona = found;
    }
  }

  public getMultiPerspectiveExplanation(conceptKey: string): MultiPerspectiveExplanation {
    return MULTI_PERSPECTIVE_LIBRARY[conceptKey] || MULTI_PERSPECTIVE_LIBRARY.faraday_law;
  }

  public getVirtualExperiments(): VirtualExperiment[] {
    return VIRTUAL_EXPERIMENTS;
  }
}

export const learningOS = new LearningOSService();
