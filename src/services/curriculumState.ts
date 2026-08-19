import { SupportedLanguage } from '../types/translangua';
import { StudentClass, EducationBoard } from '../types/common';

export type SubjectIconType = 'maths' | 'physics' | 'chemistry' | 'biology' | 'cs' | 'custom';

export interface LessonItem {
  id: string;
  subjectId: string;
  chapterNumber: number;
  chapterName: string;
  title: string;
  summary: string;
  domain: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  studyKey: string;
  estimatedMinutes: number;
  defaultLanguage: SupportedLanguage;
  formulaAnchor?: string;
}

export interface SubjectCategory {
  id: string;
  name: string;
  domain: string;
  icon: SubjectIconType;
  color: string;
  badge: string;
  description: string;
  curriculum: string;
  lessons: LessonItem[];
}

export interface LessonProgressRecord {
  lessonId: string;
  subjectId: string;
  lastActiveTab: string;
  lastTabName: string;
  lastVisitedTimestamp: number;
  masteryScore: number;
  isCompleted: boolean;
}

const STORAGE_KEY_PROGRESS = 'suvidha_lesson_progress_records';
const STORAGE_KEY_LAST_SESSION = 'suvidha_last_learning_session';

class CurriculumManager {
  private progressMap: Record<string, LessonProgressRecord> = {};

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (raw) {
        this.progressMap = JSON.parse(raw);
      } else {
        // Initialize rich default seed progress for seamless demo experience
        this.progressMap = {
          physics_12: {
            lessonId: 'physics_12',
            subjectId: 'physics',
            lastActiveTab: 'experiment',
            lastTabName: 'Virtual Experiment Lab',
            lastVisitedTimestamp: Date.now() - 1000 * 60 * 45, // 45 mins ago
            masteryScore: 84,
            isCompleted: false
          },
          physics_ac: {
            lessonId: 'physics_ac',
            subjectId: 'physics',
            lastActiveTab: 'bridge',
            lastTabName: 'Concept Bridge',
            lastVisitedTimestamp: Date.now() - 1000 * 60 * 60 * 3, // 3 hrs ago
            masteryScore: 68,
            isCompleted: false
          },
          chem_equilibrium: {
            lessonId: 'chem_equilibrium',
            subjectId: 'chemistry',
            lastActiveTab: 'three_ways',
            lastTabName: 'Explain 3 Ways',
            lastVisitedTimestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
            masteryScore: 78,
            isCompleted: true
          },
          math_calc: {
            lessonId: 'math_calc',
            subjectId: 'maths',
            lastActiveTab: 'derivation',
            lastTabName: 'Exam Derivation Lab',
            lastVisitedTimestamp: Date.now() - 1000 * 60 * 60 * 5, // 5 hrs ago
            masteryScore: 92,
            isCompleted: true
          },
          bio_photo: {
            lessonId: 'bio_photo',
            subjectId: 'biology',
            lastActiveTab: 'feynman',
            lastTabName: 'Teach It Back (Feynman)',
            lastVisitedTimestamp: Date.now() - 1000 * 60 * 60 * 12,
            masteryScore: 72,
            isCompleted: false
          }
        };
        this.saveToStorage();
      }
    } catch {
      this.progressMap = {};
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(this.progressMap));
    } catch {}
  }

  public getLessonProgress(lessonId: string): LessonProgressRecord | undefined {
    return this.progressMap[lessonId];
  }

  public saveProgress(
    lessonId: string,
    subjectId: string,
    tab: string,
    tabName: string,
    masteryIncrement?: number
  ) {
    const existing = this.progressMap[lessonId] || {
      lessonId,
      subjectId,
      lastActiveTab: 'coach_hub',
      lastTabName: 'AI Coach Hub',
      lastVisitedTimestamp: Date.now(),
      masteryScore: 50,
      isCompleted: false
    };

    const newScore = masteryIncrement !== undefined
      ? Math.min(100, Math.max(0, existing.masteryScore + masteryIncrement))
      : existing.masteryScore;

    this.progressMap[lessonId] = {
      ...existing,
      subjectId,
      lastActiveTab: tab,
      lastTabName: tabName,
      lastVisitedTimestamp: Date.now(),
      masteryScore: newScore,
      isCompleted: newScore >= 80
    };

    this.saveToStorage();

    // Save global last session anchor
    try {
      localStorage.setItem(
        STORAGE_KEY_LAST_SESSION,
        JSON.stringify({ lessonId, subjectId, tab, timestamp: Date.now() })
      );
    } catch {}
  }

  public getSubjectStats(subject: SubjectCategory): {
    totalLessons: number;
    completedLessons: number;
    startedLessons: number;
    averageMastery: number;
    mostRecentRecord: LessonProgressRecord | null;
    mostRecentLesson: LessonItem | null;
  } {
    let totalScore = 0;
    let completedCount = 0;
    let startedCount = 0;
    let mostRecentRecord: LessonProgressRecord | null = null;
    let mostRecentLesson: LessonItem | null = null;

    subject.lessons.forEach(l => {
      const prog = this.progressMap[l.id];
      if (prog) {
        startedCount++;
        totalScore += prog.masteryScore;
        if (prog.isCompleted) completedCount++;
        if (!mostRecentRecord || prog.lastVisitedTimestamp > mostRecentRecord.lastVisitedTimestamp) {
          mostRecentRecord = prog;
          mostRecentLesson = l;
        }
      }
    });

    const averageMastery = startedCount > 0 ? Math.round(totalScore / subject.lessons.length) : 0;

    return {
      totalLessons: subject.lessons.length,
      completedLessons: completedCount,
      startedLessons: startedCount,
      averageMastery,
      mostRecentRecord,
      mostRecentLesson
    };
  }

  public getCurriculumForProfile(
    studentClass: StudentClass,
    board: EducationBoard,
    lang: SupportedLanguage
  ): SubjectCategory[] {
    const boardLabel = board === 'cbse' ? 'CBSE / NCERT' : board === 'state_board' ? 'State Board' : 'ICSE / ISC';
    const classLabel = studentClass === 'class_12' ? 'Class 12' : studentClass === 'class_11' ? 'Class 11' : 'Class 10';

    return [
      // ==========================
      // BOX 1: MATHEMATICS
      // ==========================
      {
        id: 'maths',
        name: 'Mathematics',
        domain: 'Calculus, Vectors, Matrices & Probability',
        icon: 'maths',
        color: '#00e5ff',
        badge: `${classLabel} (${boardLabel})`,
        description: 'First-principles mathematical reasoning, differential calculus derivations, and geometric proofs.',
        curriculum: `${boardLabel} ${classLabel} Mathematics Standard`,
        lessons: [
          {
            id: 'math_calc',
            subjectId: 'maths',
            chapterNumber: 5,
            chapterName: 'Continuity & Differentiability',
            title: 'Derivatives from First Principles & Chain Rule',
            summary: 'Understand limit of difference quotients, instantaneous rate of change, and geometrical tangent slopes.',
            domain: 'Differential Calculus',
            difficulty: 'Foundation',
            studyKey: 'math_derivatives',
            estimatedMinutes: 20,
            defaultLanguage: lang,
            formulaAnchor: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}"
          },
          {
            id: 'math_integrals',
            subjectId: 'maths',
            chapterNumber: 7,
            chapterName: 'Integrals',
            title: 'Definite Integrals & Fundamental Theorem of Calculus',
            summary: 'Riemann sum limits, accumulation functions, and geometric area under algebraic curves.',
            domain: 'Integral Calculus',
            difficulty: 'Intermediate',
            studyKey: 'math_derivatives',
            estimatedMinutes: 25,
            defaultLanguage: lang,
            formulaAnchor: "\\int_a^b f(x)dx = F(b) - F(a)"
          },
          {
            id: 'math_matrices',
            subjectId: 'maths',
            chapterNumber: 3,
            chapterName: 'Matrices & Determinants',
            title: 'Linear Transformations & Invertibility',
            summary: 'Matrix multiplication geometry, determinant expansion, and solving linear simultaneous systems.',
            domain: 'Linear Algebra',
            difficulty: 'Foundation',
            studyKey: 'math_derivatives',
            estimatedMinutes: 18,
            defaultLanguage: lang,
            formulaAnchor: "A \\cdot A^{-1} = I, \\quad \\det(A) \\neq 0"
          },
          {
            id: 'math_vectors',
            subjectId: 'maths',
            chapterNumber: 10,
            chapterName: 'Vector Algebra & 3D Geometry',
            title: 'Dot Products, Cross Products & Spatial Planes',
            summary: 'Orthogonality invariants, torque vector cross products, and 3D plane normal equations.',
            domain: 'Spatial Geometry',
            difficulty: 'Intermediate',
            studyKey: 'math_derivatives',
            estimatedMinutes: 22,
            defaultLanguage: lang,
            formulaAnchor: "\\vec{A} \\times \\vec{B} = |A||B|\\sin\\theta \\,\\hat{n}"
          },
          {
            id: 'math_diff_eq',
            subjectId: 'maths',
            chapterNumber: 9,
            chapterName: 'Differential Equations',
            title: 'First-Order Separable & Linear Differential Equations',
            summary: 'Modelling physical growth, radioactive decay, and cooling curves with integrating factors.',
            domain: 'Applied Analysis',
            difficulty: 'Advanced',
            studyKey: 'math_derivatives',
            estimatedMinutes: 24,
            defaultLanguage: lang,
            formulaAnchor: "\\frac{dy}{dx} + P(x)y = Q(x)"
          },
          {
            id: 'math_prob',
            subjectId: 'maths',
            chapterNumber: 13,
            chapterName: 'Probability',
            title: "Conditional Probability & Bayes' Theorem",
            summary: 'Prior and posterior likelihood updates, partitioned sample spaces, and hypothesis inference.',
            domain: 'Stochastics',
            difficulty: 'Advanced',
            studyKey: 'math_derivatives',
            estimatedMinutes: 20,
            defaultLanguage: lang,
            formulaAnchor: "P(A|B) = \\frac{P(B|A)P(A)}{P(B)}"
          }
        ]
      },

      // ==========================
      // BOX 2: PHYSICS
      // ==========================
      {
        id: 'physics',
        name: 'Physics',
        domain: 'Electrodynamics, Waves, Optics & Modern Physics',
        icon: 'physics',
        color: '#38bdf8',
        badge: `${classLabel} (${boardLabel})`,
        description: 'Explore vector field continuity, AC circuit resonance, wave optics, and electromagnetic induction.',
        curriculum: `${boardLabel} ${classLabel} Physics Part I & II`,
        lessons: [
          {
            id: 'physics_12',
            subjectId: 'physics',
            chapterNumber: 8,
            chapterName: 'Electromagnetic Waves',
            title: "Maxwell's Displacement Current & EM Propagation",
            summary: 'Understand magnetic field continuity across capacitor gaps and derive the modified Ampere-Maxwell Law.',
            domain: 'Electrodynamics',
            difficulty: 'Advanced',
            studyKey: 'maxwell_displacement',
            estimatedMinutes: 25,
            defaultLanguage: lang,
            formulaAnchor: "\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 (I_c + \\epsilon_0 \\frac{d\\Phi_E}{dt})"
          },
          {
            id: 'physics_ac',
            subjectId: 'physics',
            chapterNumber: 7,
            chapterName: 'Alternating Currents',
            title: 'AC Bridge Network & R-L / R-C Resonance',
            summary: 'Explore parallel inductive and capacitive branches with spatial frequency and phase shift audio.',
            domain: 'Circuits & Signals',
            difficulty: 'Intermediate',
            studyKey: 'ac_bridge',
            estimatedMinutes: 20,
            defaultLanguage: lang,
            formulaAnchor: "Z = \\sqrt{R^2 + (\\omega L - \\frac{1}{\\omega C})^2}"
          },
          {
            id: 'physics_gauss',
            subjectId: 'physics',
            chapterNumber: 1,
            chapterName: 'Electric Charges & Fields',
            title: "Gauss's Law & Electrostatic Field Symmetry",
            summary: 'Calculate electric flux through Gaussian surfaces for infinite line wires and spherical shells.',
            domain: 'Electrostatics',
            difficulty: 'Foundation',
            studyKey: 'maxwell_displacement',
            estimatedMinutes: 18,
            defaultLanguage: lang,
            formulaAnchor: "\\Phi_E = \\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{\\text{enclosed}}}{\\epsilon_0}"
          },
          {
            id: 'physics_potential',
            subjectId: 'physics',
            chapterNumber: 2,
            chapterName: 'Electrostatic Potential & Capacitance',
            title: 'Equipotential Surfaces & Dielectric Polarization',
            summary: 'Understand conservative electrostatic work, potential gradients, and capacitance energy storage.',
            domain: 'Electrostatics',
            difficulty: 'Intermediate',
            studyKey: 'maxwell_displacement',
            estimatedMinutes: 22,
            defaultLanguage: lang,
            formulaAnchor: "V = -\\int \\vec{E} \\cdot d\\vec{r}, \\quad U = \\frac{1}{2} C V^2"
          },
          {
            id: 'physics_optics',
            subjectId: 'physics',
            chapterNumber: 10,
            chapterName: 'Wave Optics',
            title: "Huygens' Principle & Young's Double Slit Interference",
            summary: 'Wavefront propagation, path difference condition, and fringe width calculation in monochromatic light.',
            domain: 'Optics',
            difficulty: 'Advanced',
            studyKey: 'maxwell_displacement',
            estimatedMinutes: 24,
            defaultLanguage: lang,
            formulaAnchor: "\\beta = \\frac{\\lambda D}{d}, \\quad \\Delta x = n\\lambda"
          },
          {
            id: 'physics_photoelectric',
            subjectId: 'physics',
            chapterNumber: 11,
            chapterName: 'Dual Nature of Radiation & Matter',
            title: "Einstein's Photoelectric Equation & De Broglie Waves",
            summary: 'Photon energy threshold frequency, stopping potential, and matter wave wavelength relation.',
            domain: 'Modern Physics',
            difficulty: 'Foundation',
            studyKey: 'maxwell_displacement',
            estimatedMinutes: 16,
            defaultLanguage: lang,
            formulaAnchor: "h\\nu = \\Phi_0 + K_{\\text{max}} = h\\nu_0 + e V_0"
          }
        ]
      },

      // ==========================
      // BOX 3: CHEMISTRY
      // ==========================
      {
        id: 'chemistry',
        name: 'Chemistry',
        domain: 'Thermodynamics, Kinetics, Equilibrium & Coordination',
        icon: 'chemistry',
        color: '#10b981',
        badge: `${classLabel} (${boardLabel})`,
        description: 'Master chemical dynamic equilibrium shifts, rate law mechanics, and electrochemistry equations.',
        curriculum: `${boardLabel} ${classLabel} Chemistry Part I & II`,
        lessons: [
          {
            id: 'chem_equilibrium',
            subjectId: 'chemistry',
            chapterNumber: 7,
            chapterName: 'Equilibrium',
            title: "Le Chatelier's Dynamic Equilibrium Shifts",
            summary: 'Master spontaneous equilibrium responses when temperature, pressure, or reactant concentrations perturb.',
            domain: 'Thermodynamics',
            difficulty: 'Foundation',
            studyKey: 'chemical_equilibrium',
            estimatedMinutes: 20,
            defaultLanguage: lang,
            formulaAnchor: "K_{\\text{eq}} = \\frac{[C]^c [D]^d}{[A]^a [B]^b}, \\quad \\Delta G = -RT \\ln K"
          },
          {
            id: 'chem_kinetics',
            subjectId: 'chemistry',
            chapterNumber: 4,
            chapterName: 'Chemical Kinetics',
            title: 'Integrated Rate Laws & Arrhenius Activation Energy',
            summary: 'First-order decay kinetics, collision theory frequency factors, and temperature-dependent rate constants.',
            domain: 'Kinetics',
            difficulty: 'Intermediate',
            studyKey: 'chemical_equilibrium',
            estimatedMinutes: 22,
            defaultLanguage: lang,
            formulaAnchor: "k = A \\, e^{-\\frac{E_a}{RT}}, \\quad t_{1/2} = \\frac{0.693}{k}"
          },
          {
            id: 'chem_electro',
            subjectId: 'chemistry',
            chapterNumber: 3,
            chapterName: 'Electrochemistry',
            title: 'Nernst Equation & Galvanic Cell Potentials',
            summary: 'Standard electrode reduction potentials, non-standard cell EMF calculation, and Gibbs free energy link.',
            domain: 'Physical Chemistry',
            difficulty: 'Advanced',
            studyKey: 'chemical_equilibrium',
            estimatedMinutes: 25,
            defaultLanguage: lang,
            formulaAnchor: "E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n} \\log Q"
          },
          {
            id: 'chem_coordination',
            subjectId: 'chemistry',
            chapterNumber: 9,
            chapterName: 'Coordination Compounds',
            title: 'Crystal Field Theory & d-Orbital Splitting',
            summary: 'Octahedral and tetrahedral ligand field splitting, spectrochemical series, and magnetic moments.',
            domain: 'Inorganic Chemistry',
            difficulty: 'Intermediate',
            studyKey: 'chemical_equilibrium',
            estimatedMinutes: 20,
            defaultLanguage: lang,
            formulaAnchor: "\\Delta_o, \\quad \\mu_{\\text{eff}} = \\sqrt{n(n+2)} \\,\\text{BM}"
          },
          {
            id: 'chem_organic',
            subjectId: 'chemistry',
            chapterNumber: 10,
            chapterName: 'Haloalkanes & Haloarenes',
            title: 'SN1 vs SN2 Nucleophilic Substitution Mechanisms',
            summary: 'Steric hindrance, carbocation stability, Walden inversion, and polar protic vs aprotic solvent effects.',
            domain: 'Organic Chemistry',
            difficulty: 'Advanced',
            studyKey: 'chemical_equilibrium',
            estimatedMinutes: 26,
            defaultLanguage: lang,
            formulaAnchor: "\\text{Rate}_{SN2} = k[\\text{Substrate}][\\text{Nu}^-]"
          }
        ]
      },

      // ==========================
      // BOX 4: BIOLOGY
      // ==========================
      {
        id: 'biology',
        name: 'Biology',
        domain: 'Cellular Bioenergetics, Genetics & Physiology',
        icon: 'biology',
        color: '#a855f7',
        badge: `${classLabel} (${boardLabel})`,
        description: 'Understand photon energy conversion, neural axon action potential, and DNA replication mechanisms.',
        curriculum: `${boardLabel} ${classLabel} Biology Standard`,
        lessons: [
          {
            id: 'bio_photo',
            subjectId: 'biology',
            chapterNumber: 13,
            chapterName: 'Photosynthesis in Higher Plants',
            title: 'Light Reactions & Photophosphorylation Z-Scheme',
            summary: 'Water photolysis at PS II, cytochrome redox electron transport gradient, and ATP synthesis rotary coupling.',
            domain: 'Plant Physiology',
            difficulty: 'Foundation',
            studyKey: 'bio_photosynthesis',
            estimatedMinutes: 20,
            defaultLanguage: lang,
            formulaAnchor: "2H_2O \\xrightarrow{h\\nu} 4H^+ + 4e^- + O_2"
          },
          {
            id: 'bio_axon',
            subjectId: 'biology',
            chapterNumber: 21,
            chapterName: 'Neural Control & Coordination',
            title: 'Axon Action Potential & Voltage-Gated Depolarization',
            summary: 'Resting membrane potential, Na+/K+ ATPase pump, threshold all-or-none spike, and saltatory conduction.',
            domain: 'Human Physiology',
            difficulty: 'Intermediate',
            studyKey: 'bio_photosynthesis',
            estimatedMinutes: 22,
            defaultLanguage: lang,
            formulaAnchor: "\\text{Resting: } -70\\text{mV} \\to \\text{Spike: } +30\\text{mV}"
          },
          {
            id: 'bio_dna',
            subjectId: 'biology',
            chapterNumber: 6,
            chapterName: 'Molecular Basis of Inheritance',
            title: 'Semi-Conservative DNA Replication & Okazaki Fragments',
            summary: 'Helicase unwinding, leading vs lagging strand synthesis by DNA Polymerase III, and RNA primer removal.',
            domain: 'Molecular Genetics',
            difficulty: 'Advanced',
            studyKey: 'bio_photosynthesis',
            estimatedMinutes: 25,
            defaultLanguage: lang,
            formulaAnchor: "5' \\to 3' \\text{ Polymerization, } \\text{Meselson-Stahl } ^{15}N/^{14}N"
          },
          {
            id: 'bio_respiration',
            subjectId: 'biology',
            chapterNumber: 14,
            chapterName: 'Respiration in Plants',
            title: 'Glycolysis, Krebs Cycle & Oxidative Phosphorylation',
            summary: 'Stepwise glucose oxidation, NADH/FADH2 proton pumping across inner mitochondrial cristae.',
            domain: 'Cellular Bioenergetics',
            difficulty: 'Advanced',
            studyKey: 'bio_photosynthesis',
            estimatedMinutes: 24,
            defaultLanguage: lang,
            formulaAnchor: "\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\to 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + 36\\text{-}38\\text{ ATP}"
          }
        ]
      },

      // ==========================
      // BOX 5: COMPUTER SCIENCE
      // ==========================
      {
        id: 'cs',
        name: 'Computer Science',
        domain: 'Data Structures, Algorithms & Computational Logic',
        icon: 'cs',
        color: '#f59e0b',
        badge: `${classLabel} (${boardLabel})`,
        description: 'Explore recursive search trees, memoized dynamic programming tables, and asymptotic Big-O runtime.',
        curriculum: `${boardLabel} Computer Science & Informatics`,
        lessons: [
          {
            id: 'cs_bst',
            subjectId: 'cs',
            chapterNumber: 1,
            chapterName: 'Binary Trees & Hierarchy',
            title: 'Binary Search Tree (BST) & Invariant Traversal',
            summary: 'Explore recursive branch hierarchy, search invariants, In-order sorted property, and tree balancing.',
            domain: 'Data Structures',
            difficulty: 'Foundation',
            studyKey: 'bst_tree',
            estimatedMinutes: 20,
            defaultLanguage: lang,
            formulaAnchor: "T(n) = O(\\log n) \\text{ balanced}, \\quad O(n) \\text{ degenerate}"
          },
          {
            id: 'cs_dp',
            subjectId: 'cs',
            chapterNumber: 2,
            chapterName: 'Dynamic Programming',
            title: 'Memoization vs Tabulation Optimization',
            summary: 'Transform exponential recursion into linear polynomial time with overlapping subproblem cache tables.',
            domain: 'Algorithm Design',
            difficulty: 'Advanced',
            studyKey: 'bst_tree',
            estimatedMinutes: 25,
            defaultLanguage: lang,
            formulaAnchor: "T(n) = O(n), \\quad \\text{Space} = O(n)"
          },
          {
            id: 'cs_graphs',
            subjectId: 'cs',
            chapterNumber: 3,
            chapterName: 'Graph Theory',
            title: "Breadth-First Search (BFS) & Dijkstra's Algorithm",
            summary: 'Adjacency list representations, priority queue exploration, and single-source shortest path finding.',
            domain: 'Networks & Graphs',
            difficulty: 'Advanced',
            studyKey: 'bst_tree',
            estimatedMinutes: 26,
            defaultLanguage: lang,
            formulaAnchor: "O((V + E) \\log V)"
          }
        ]
      },

      // ==========================
      // BOX 6: CUSTOM AI SCANNER
      // ==========================
      {
        id: 'custom',
        name: 'Custom Notes & Textbook Scanner',
        domain: 'AI-Powered OCR, Notes & Problem Solving',
        icon: 'custom',
        color: '#ec4899',
        badge: 'AI Multilingual Engine',
        description: 'Upload or paste any paragraph, question, or handwritten notes from your textbook for an instant mother-tongue bridge.',
        curriculum: `Any ${boardLabel} Textbook / Notes`,
        lessons: [
          {
            id: 'custom_scanner',
            subjectId: 'custom',
            chapterNumber: 0,
            chapterName: 'Any Chapter / Subject',
            title: 'Paste or Scan Your Own Textbook Paragraph',
            summary: 'Instantly generates mother tongue intuition, real-world analogies, and formal exam derivation breakdown.',
            domain: 'Multi-Disciplinary AI',
            difficulty: 'Foundation',
            studyKey: 'custom',
            estimatedMinutes: 10,
            defaultLanguage: lang
          }
        ]
      }
    ];
  }
}

export const curriculumManager = new CurriculumManager();
