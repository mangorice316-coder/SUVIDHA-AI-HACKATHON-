import { CircuitGraphData } from '../types/topostem';
import { TranslanguaStudySet } from '../types/translangua';
import { PathWeaverCaseStudy } from '../types/pathweaver';

// ==========================================
// PILLAR 1: TopoSTEM Multi-Domain Fixtures
// ==========================================
export const TOPOSTEM_PRESET_CIRCUITS: Record<string, CircuitGraphData> = {
  ac_bridge: {
    id: "ac_bridge",
    title: "AC Bridge Network with Parallel R-L and R-C Branches",
    domain: "Electrical Engineering",
    description: "Standard Class 12 / Engineering Physics AC Bridge network excited by a 12V 50Hz source.",
    difficulty: "Advanced",
    totalComponents: 7,
    entryNodeId: "node_v1",
    groundNodeId: "node_gnd",
    inaccessibleLinearAltText: "The image shows a circuit diagram with an AC source V1 of 12V 50Hz connected on the left. From the top terminal of the AC source, a wire goes to junction node A. At junction node A, the current splits into two parallel branches. The top branch contains resistor R1 of 100 ohms in series with inductor L1 of 50mH, which connects to node B. The bottom branch contains resistor R2 of 200 ohms in series with capacitor C1 of 10 microfarads, which connects to node C. Node B and node C are connected to ground via a return path. A detector is placed across B and C.",
    spatialExplanation: "2D Wheatstone-style AC bridge. Current splits at Node A (top-center) into an inductive branch (top-right) and a capacitive branch (bottom-right), reconverging at the ground bus (bottom).",
    simulation: {
      totalEquivalentImpedance: "78.4 Ω ∠ -18.2°",
      totalCurrentRMS: "0.153 A",
      branchCurrents: {
        "Branch 1 (R1-L1)": "0.118 A ∠ -8.9°",
        "Branch 2 (R2-C1)": "0.038 A ∠ +57.9°"
      },
      nodeVoltages: {
        "Node A": "12.0 V ∠ 0°",
        "Node B (R1-L1 Junction)": "11.8 V ∠ -1.2°",
        "Node C (R2-C1 Junction)": "7.6 V ∠ +23.1°"
      }
    },
    nodes: [
      {
        id: "node_v1",
        label: "12V AC Source",
        type: "ac_source",
        value: "12V, 50Hz",
        numericValue: 12,
        position: { x: 0.15, y: 0.50 },
        description: "Main AC excitation supply providing 12V RMS at 50Hz.",
        connectedEdgeIds: ["e1", "e6"]
      },
      {
        id: "node_a",
        label: "Junction Node A (Split Point)",
        type: "junction_node",
        position: { x: 0.35, y: 0.50 },
        description: "Primary distribution node where current divides into parallel branches.",
        connectedEdgeIds: ["e1", "e2", "e3"]
      },
      {
        id: "node_r1",
        label: "Resistor R1 (Upper Branch)",
        type: "resistor",
        value: "100",
        numericValue: 100,
        unit: "Ω",
        position: { x: 0.55, y: 0.25 },
        description: "Upper inductive branch resistor. Value: 100 Ohms.",
        connectedEdgeIds: ["e2", "e4"]
      },
      {
        id: "node_l1",
        label: "Inductor L1 (Upper Branch)",
        type: "inductor",
        value: "50",
        numericValue: 50,
        unit: "mH",
        position: { x: 0.75, y: 0.25 },
        description: "Upper branch series inductor. Value: 50 millihenries.",
        connectedEdgeIds: ["e4", "e7"]
      },
      {
        id: "node_r2",
        label: "Resistor R2 (Lower Branch)",
        type: "resistor",
        value: "200",
        numericValue: 200,
        unit: "Ω",
        position: { x: 0.55, y: 0.75 },
        description: "Lower capacitive branch resistor. Value: 200 Ohms.",
        connectedEdgeIds: ["e3", "e5"]
      },
      {
        id: "node_c1",
        label: "Capacitor C1 (Lower Branch)",
        type: "capacitor",
        value: "10",
        numericValue: 10,
        unit: "µF",
        position: { x: 0.75, y: 0.75 },
        description: "Lower branch series capacitor. Value: 10 microfarads.",
        connectedEdgeIds: ["e5", "e8"]
      },
      {
        id: "node_gnd",
        label: "Ground Return Bus",
        type: "ground",
        position: { x: 0.90, y: 0.50 },
        description: "Common return reference point for both branches.",
        connectedEdgeIds: ["e7", "e8", "e6"]
      }
    ],
    edges: [
      { id: "e1", fromNodeId: "node_v1", toNodeId: "node_a", label: "Source to Node A", branchType: "series" },
      { id: "e2", fromNodeId: "node_a", toNodeId: "node_r1", label: "Node A into R1 (Upper)", branchType: "parallel" },
      { id: "e3", fromNodeId: "node_a", toNodeId: "node_r2", label: "Node A into R2 (Lower)", branchType: "parallel" },
      { id: "e4", fromNodeId: "node_r1", toNodeId: "node_l1", label: "R1 series into L1", branchType: "series" },
      { id: "e5", fromNodeId: "node_r2", toNodeId: "node_c1", label: "R2 series into C1", branchType: "series" },
      { id: "e7", fromNodeId: "node_l1", toNodeId: "node_gnd", label: "L1 into Ground", branchType: "ground_return" },
      { id: "e8", fromNodeId: "node_c1", toNodeId: "node_gnd", label: "C1 into Ground", branchType: "ground_return" },
      { id: "e6", fromNodeId: "node_gnd", toNodeId: "node_v1", label: "Ground return to Source", branchType: "ground_return" }
    ],
    loops: [
      {
        id: "loop_upper",
        name: "Upper Inductive Loop",
        nodeSequence: ["node_v1", "node_a", "node_r1", "node_l1", "node_gnd", "node_v1"],
        description: "Traverses AC Source -> Node A -> Resistor R1 -> Inductor L1 -> Ground -> Source.",
        kirchhoffVoltageFormula: "V_source - I_upper * (R1 + jωL1) = 0"
      },
      {
        id: "loop_lower",
        name: "Lower Capacitive Loop",
        nodeSequence: ["node_v1", "node_a", "node_r2", "node_c1", "node_gnd", "node_v1"],
        description: "Traverses AC Source -> Node A -> Resistor R2 -> Capacitor C1 -> Ground -> Source.",
        kirchhoffVoltageFormula: "V_source - I_lower * (R2 + 1/(jωC1)) = 0"
      }
    ],
    interactiveQuestions: [
      {
        question: "What components are in parallel with Resistor R2?",
        answer: "The entire upper series branch (Resistor R1 in series with Inductor L1) is in parallel with the lower branch containing R2 and C1.",
        calculationHint: "Trace from Node A: Branch 1 leads to R1-L1; Branch 2 leads to R2-C1."
      },
      {
        question: "What is the total inductive impedance of the upper branch at 50Hz?",
        answer: "X_L = 2 * π * 50 * 0.05 = 15.71 Ohms. Total branch impedance Z_upper = 100 + j15.71 Ohms.",
        calculationHint: "Use formula: X_L = 2 * π * f * L"
      }
    ]
  },

  bst_tree: {
    id: "bst_tree",
    title: "Binary Search Tree (BST) Node Pointer Traversal",
    domain: "Computer Science Data Structures",
    description: "Hierarchical binary tree data structure with balanced left and right subtrees.",
    difficulty: "Intermediate",
    totalComponents: 7,
    entryNodeId: "tree_root",
    groundNodeId: "tree_leaf_right",
    inaccessibleLinearAltText: "A tree diagram with root node 50 at the top. From node 50, a left branch goes to node 30 and a right branch goes to node 70. Node 30 has left child 20 and right child 40. Node 70 has left child 60 and right child 80.",
    spatialExplanation: "Hierarchical 2D pointer tree. Root at (0.5, 0.15). Left subtree values are strictly smaller (<50), right subtree values are strictly larger (>50).",
    nodes: [
      { id: "tree_root", label: "Root Node (50)", type: "tree_root", value: "50", position: { x: 0.50, y: 0.15 }, description: "Tree Root key: 50. All left descendants < 50; right descendants > 50.", connectedEdgeIds: ["te1", "te2"] },
      { id: "tree_left", label: "Left Child (30)", type: "tree_node", value: "30", position: { x: 0.28, y: 0.45 }, description: "Left Subtree Root: 30.", connectedEdgeIds: ["te1", "te3", "te4"] },
      { id: "tree_right", label: "Right Child (70)", type: "tree_node", value: "70", position: { x: 0.72, y: 0.45 }, description: "Right Subtree Root: 70.", connectedEdgeIds: ["te2", "te5", "te6"] },
      { id: "tree_l_l", label: "Left Leaf (20)", type: "tree_leaf", value: "20", position: { x: 0.16, y: 0.78 }, description: "Leaf node key: 20 (Left of 30).", connectedEdgeIds: ["te3"] },
      { id: "tree_l_r", label: "Right Leaf (40)", type: "tree_leaf", value: "40", position: { x: 0.40, y: 0.78 }, description: "Leaf node key: 40 (Right of 30).", connectedEdgeIds: ["te4"] },
      { id: "tree_r_l", label: "Left Leaf (60)", type: "tree_leaf", value: "60", position: { x: 0.60, y: 0.78 }, description: "Leaf node key: 60 (Left of 70).", connectedEdgeIds: ["te5"] },
      { id: "tree_leaf_right", label: "Right Leaf (80)", type: "tree_leaf", value: "80", position: { x: 0.84, y: 0.78 }, description: "Leaf node key: 80 (Right of 70).", connectedEdgeIds: ["te6"] }
    ],
    edges: [
      { id: "te1", fromNodeId: "tree_root", toNodeId: "tree_left", label: "Left Child (< 50)", branchType: "tree_left" },
      { id: "te2", fromNodeId: "tree_root", toNodeId: "tree_right", label: "Right Child (> 50)", branchType: "tree_right" },
      { id: "te3", fromNodeId: "tree_left", toNodeId: "tree_l_l", label: "Left Child (< 30)", branchType: "tree_left" },
      { id: "te4", fromNodeId: "tree_left", toNodeId: "tree_l_r", label: "Right Child (> 30)", branchType: "tree_right" },
      { id: "te5", fromNodeId: "tree_right", toNodeId: "tree_r_l", label: "Left Child (< 70)", branchType: "tree_left" },
      { id: "te6", fromNodeId: "tree_right", toNodeId: "tree_leaf_right", label: "Right Child (> 70)", branchType: "tree_right" }
    ],
    loops: [
      { id: "inorder_traversal", name: "In-Order Sorted Traversal", nodeSequence: ["tree_l_l", "tree_left", "tree_l_r", "tree_root", "tree_r_l", "tree_right", "tree_leaf_right"], description: "Sorted Ascending: 20 -> 30 -> 40 -> 50 -> 60 -> 70 -> 80." }
    ],
    interactiveQuestions: [
      { question: "What is the In-Order predecessor of Root (50)?", answer: "The rightmost node in the left subtree: Node 40.", calculationHint: "Go Left once, then Right as far as possible." },
      { question: "Where would a new key '35' be inserted?", answer: "As the left child of Node 40 (since 35 < 50, 35 > 30, and 35 < 40).", calculationHint: "Compare at Root -> Left -> Right." }
    ]
  }
};

// ==========================================
// PILLAR 2: TransLanguaSTEM Multi-Domain Fixtures
// ==========================================
export const TRANSLANGUA_PRESET_STUDIES: Record<string, TranslanguaStudySet> = {
  maxwell_displacement: {
    id: "maxwell_displacement",
    title: "Maxwell's Displacement Current & Ampere-Maxwell Law",
    topic: "Electromagnetic Waves & Field Continuity",
    domain: "Physics",
    sourceCurriculum: "NCERT Physics Class 12 - Chapter 8",
    originalDenseEnglishText: "Applying Ampere's circuital law to a surface enclosing one plate of a charging capacitor reveals a missing term. Maxwell resolved this inconsistency by postulating the displacement current, which is directly proportional to the time-varying electric flux between the plates, thereby ensuring the continuity of magnetic field circulation.",
    brokenLiteralTranslation: {
      language: "ta",
      text: "மின்னேற்றம் பெறும் மின்தேக்கியின் ஒரு தட்டை உள்ளடக்கிய மேற்பரப்பிற்கு ஆம்பியரின் சுற்றுகை விதியைப் பயன்படுத்தினால் விடுபட்ட சொல் வெளிப்படுகிறது. தகடுகளுக்கு இடையே காலத்தைப் பொறுத்து மாறும் மின் பாய்ச்சலுக்கு நேர்விகிதத்தில் இருக்கும் இடப்பெயர்ச்சி மின்னோட்டத்தை முன்மொழிந்து மேக்ஸ்வெல் இந்த முரண்பாட்டைத் தீர்த்தார்.",
      identifiedErrors: [
        "Translates 'missing term' literally as 'விடுபட்ட சொல்' (missing word in a sentence) instead of a mathematical term in an equation.",
        "Completely bypasses English academic syntax, leaving student unable to write 'directly proportional to the time-varying electric flux' in an English exam paper.",
        "Destroys conceptual causality: does not explain why a changing electric field behaves like a current."
      ]
    },
    vernacularConceptualAnalogy: {
      language: "ta",
      analogyTitle: "தண்ணீர் குழாய் & காற்று இடைவெளி ஒப்புமை (Water Pipe & Air Gap Analogy)",
      narrative: "ஒரு குழாயில் தண்ணீர் தொடர்ந்து ஓடும்போதுதான் ஓட்டம் (Current) இருக்கும்னு நினைப்போம். ஆனால் நடுவில் ஒரு இடைவெளி (Capacitor Gap) இருந்து, அங்கே நீர்மட்டம் உயரும் வேகம் (Changing Electric Field) அடுத்த பக்கத்தில் அதே அளவு அழுத்தத்தை உருவாக்கினால், அந்த இடைவெளியிலும் ஒரு 'கற்பனை ஓட்டம்' நடக்கிறது. அதுவே Displacement Current.",
      culturalContextualAnchor: "Grounded in physical fluid storage and hydraulic pressure dynamics intuitive in regional schooling."
    },
    clauseMap: [
      {
        id: "c1",
        clauseIndex: 1,
        englishClause: "Applying Ampere's circuital law to a surface enclosing one plate of a charging capacitor",
        vernacularIntuition: "மின்னேற்றம் பெறும் மின்தேக்கியின் ஒரு தட்டைச் சுற்றியுள்ள பகுதியில் ஆம்பியர் விதியைப் பயன்படுத்தும்போது",
        mathematicalOperator: "\\oint \\mathbf{B} \\cdot d\\mathbf{l} = \\mu_0 I_{\\text{enclosed}}",
        scientificIdiomAnchor: "Applying [Law] to a surface enclosing [Object]",
        whyLiteralTranslationFails: "Loses the boundary-integral calculus meaning."
      },
      {
        id: "c2",
        clauseIndex: 2,
        englishClause: "reveals a missing mathematical term",
        vernacularIntuition: "சமன்பாட்டில் ஒரு கணித உறுப்பு விடுபட்டுள்ளது தெரியவருகிறது",
        mathematicalOperator: "\\text{Inconsistency: } I_c = 0 \\text{ between plates}",
        scientificIdiomAnchor: "reveals a missing term [in the governing equation]",
        whyLiteralTranslationFails: "Literal tools translate 'term' as 'vocabulary word'."
      },
      {
        id: "c3",
        clauseIndex: 3,
        englishClause: "directly proportional to the time-varying electric flux between the plates",
        vernacularIntuition: "தகடுகளுக்கு இடையே காலத்தைப் பொருத்து மாறும் மின்பாயத்திற்கு நேர்விகிதத்தில் இருக்கும்",
        mathematicalOperator: "I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}",
        scientificIdiomAnchor: "directly proportional to the time-varying [Quantity]",
        whyLiteralTranslationFails: "Fails to teach the high-scoring English phrase 'time-varying'."
      },
      {
        id: "c4",
        clauseIndex: 4,
        englishClause: "thereby ensuring the continuity of magnetic field circulation",
        vernacularIntuition: "இதன் மூலம் காந்தப்புலத்தின் தொடர்ச்சியை உறுதி செய்கிறது",
        mathematicalOperator: "\\oint \\mathbf{B} \\cdot d\\mathbf{l} = \\mu_0 \\left( I_c + \\varepsilon_0 \\frac{d\\Phi_E}{dt} \\right)",
        scientificIdiomAnchor: "thereby ensuring the continuity of [Physical Property]",
        whyLiteralTranslationFails: "Translates 'continuity' as 'unbroken duration' instead of mathematical field continuity."
      }
    ],
    vocabularyAnchors: [
      {
        id: "v1",
        formalEnglishTerm: "time-varying electric flux",
        vernacularTerm: "காலத்தைப் பொருத்து மாறும் மின்பாயம்",
        phoneticPronunciation: "taɪm-ˈveəri.ɪŋ ɪˈlɛktrɪk flʌks",
        colloquialAnalogy: "நேரம் செல்லச் செல்ல மின்சாரக் கோடுகளின் எண்ணிக்கை கூடிக்கொண்டே அல்லது குறைந்துகொண்டே இருப்பது.",
        pedagogicalRole: "physical_quantity",
        exampleUsage: "Displacement current exists wherever there is a time-varying electric flux."
      },
      {
        id: "v2",
        formalEnglishTerm: "directly proportional to",
        vernacularTerm: "நேர்விகிதத்தில் அமைந்துள்ளது",
        phoneticPronunciation: "dɪˈrɛktli prəˈpɔːʃənl tuː",
        colloquialAnalogy: "ஒன்று அதிகமானால் மற்றொன்றும் அதே விகிதத்தில் அதிகமாகும் உறவு.",
        pedagogicalRole: "operator",
        exampleUsage: "The induced EMF is directly proportional to the rate of change of magnetic flux."
      },
      {
        id: "v3",
        formalEnglishTerm: "ensuring continuity",
        vernacularTerm: "தொடர்ச்சியை உறுதிப்படுத்துகிறது",
        phoneticPronunciation: "ɪnˈʃʊərɪŋ kɒntɪˈnjuːɪti",
        colloquialAnalogy: "நடுவில் எந்த ஒரு இடைவெளியும் இல்லாமல் ஓட்டம் தொடர்வது.",
        pedagogicalRole: "constraint",
        exampleUsage: "Maxwell added displacement current, thereby ensuring continuity of total current."
      }
    ],
    proofAssemblerPieces: [
      { id: "p1", correctOrder: 1, englishFragment: "Applying Ampere's circuital law", vernacularHint: "ஆம்பியர் விதியை எடுக்க", isPlaced: false },
      { id: "p2", correctOrder: 2, englishFragment: "to a surface enclosing a charging capacitor", vernacularHint: "மின்தேக்கியின் தட்டைச் சுற்றிய பகுதிக்கு", isPlaced: false },
      { id: "p3", correctOrder: 3, englishFragment: "reveals an inconsistency", vernacularHint: "முரண்பாட்டை வெளிப்படுத்துகிறது", isPlaced: false },
      { id: "p4", correctOrder: 4, englishFragment: "which Maxwell resolved by introducing displacement current", vernacularHint: "மேக்ஸ்வெல் இடப்பெயர்ச்சி மின்னோட்டத்தால் தீர்த்தார்", isPlaced: false },
      { id: "p5", correctOrder: 5, englishFragment: "proportional to the time-varying electric flux.", vernacularHint: "மாறும் மின்பாயத்திற்கு நேர்விகிதத்தில்.", isPlaced: false }
    ],
    formalEnglishSummary: "Applying Ampere's circuital law to a surface enclosing a charging capacitor reveals an inconsistency which Maxwell resolved by introducing displacement current proportional to the time-varying electric flux."
  },

  chemical_equilibrium: {
    id: "chemical_equilibrium",
    title: "Le Chatelier's Principle & Dynamic Equilibrium Shifts",
    topic: "Chemical Kinetics & Thermodynamics",
    domain: "Chemistry",
    sourceCurriculum: "NCERT Chemistry Class 11 - Chapter 7",
    originalDenseEnglishText: "When a chemical system at dynamic equilibrium is subjected to an external perturbation in temperature, pressure, or reactant concentration, the equilibrium composition undergoes a spontaneous shift in the direction that counteracts the imposed disturbance, thereby restoring thermodynamic equilibrium.",
    brokenLiteralTranslation: {
      language: "hi",
      text: "जब गतिशील संतुलन पर एक रासायनिक प्रणाली तापमान, दबाव या अभिकारक एकाग्रता में एक बाहरी गड़बड़ी के अधीन होती है, तो संतुलन संरचना उस दिशा में एक सहज बदलाव से गुजरती है जो लगाए गए व्यवधान का प्रतिकार करती है...",
      identifiedErrors: [
        "Translates 'perturbation' as 'गड़बड़ी' (bad mistake/trouble) rather than a controlled thermodynamic change.",
        "Fails to teach how to formulate 'spontaneous shift in the direction that counteracts' in English board exams."
      ]
    },
    vernacularConceptualAnalogy: {
      language: "hi",
      analogyTitle: "तराजू और झूला संतुलन सादृश्य (Seesaw Balance Analogy)",
      narrative: "जब आप झूले के एक तरफ भारी वजन रख देते हैं, तो झूला दूसरी तरफ झुक जाता है ताकि संतुलन बना रहे। रसायन विज्ञान में भी जब आप एक तरफ दबाव बढ़ाते हैं, तो प्रतिक्रिया उस तरफ भागती है जहां दबाव कम हो सके।",
      culturalContextualAnchor: "Grounded in physical lever and seesaw balancing dynamics."
    },
    clauseMap: [
      { id: "cc1", clauseIndex: 1, englishClause: "When a chemical system at dynamic equilibrium", vernacularIntuition: "जब कोई रासायनिक तंत्र गतिशील साम्यावस्था में होता है", mathematicalOperator: "K_{eq} = \\frac{[C]^c [D]^d}{[A]^a [B]^b}", scientificIdiomAnchor: "When a system at [State] is subjected to [Condition]", whyLiteralTranslationFails: "Loses the dynamic reversibility concept." },
      { id: "cc2", clauseIndex: 2, englishClause: "is subjected to an external perturbation in concentration or pressure", vernacularIntuition: "उस पर सांद्रता या दबाव का बाहरी प्रभाव डाला जाता है", mathematicalOperator: "Q_c \\neq K_{eq}", scientificIdiomAnchor: "subjected to an external perturbation", whyLiteralTranslationFails: "Translates perturbation as 'mistake'." },
      { id: "cc3", clauseIndex: 3, englishClause: "the equilibrium undergoes a spontaneous shift", vernacularIntuition: "साम्यावस्था स्वतः उस दिशा में खिसक जाती है", mathematicalOperator: "\\Delta G < 0 \\text{ towards equilibrium}", scientificIdiomAnchor: "undergoes a spontaneous shift in the direction", whyLiteralTranslationFails: "Fails to link 'spontaneous' to negative Gibbs energy." },
      { id: "cc4", clauseIndex: 4, englishClause: "that counteracts the imposed disturbance", vernacularIntuition: "जो लगाए गए बदलाव का विरोध करके प्रभाव को कम करती है", mathematicalOperator: "\\text{Le Chatelier vector counteraction}", scientificIdiomAnchor: "in the direction that counteracts [Disturbance]", whyLiteralTranslationFails: "Literal translation misses the negative feedback loop." }
    ],
    vocabularyAnchors: [
      { id: "vv1", formalEnglishTerm: "dynamic equilibrium", vernacularTerm: "गतिशील साम्यावस्था", phoneticPronunciation: "daɪˈnæmɪk ˌiːkwɪˈlɪbriəm", colloquialAnalogy: "दोनों तरफ गति जारी है पर कुल मात्रा स्थिर रहती है।", pedagogicalRole: "definition", exampleUsage: "The rates of forward and reverse reactions are equal at dynamic equilibrium." },
      { id: "vv2", formalEnglishTerm: "spontaneous shift", vernacularTerm: "स्वतः होने वाला बदलाव", phoneticPronunciation: "spɒnˈteɪniəs ʃɪft", colloquialAnalogy: "बिना किसी बाहरी बल के अपने आप सही दिशा में मुड़ जाना।", pedagogicalRole: "operator", exampleUsage: "The reaction undergoes a spontaneous shift toward products." }
    ],
    proofAssemblerPieces: [
      { id: "pp1", correctOrder: 1, englishFragment: "When a system at dynamic equilibrium", vernacularHint: "जब साम्यावस्था वाला तंत्र", isPlaced: false },
      { id: "pp2", correctOrder: 2, englishFragment: "is subjected to external perturbation,", vernacularHint: "बाहरी प्रभाव के अधीन होता है,", isPlaced: false },
      { id: "pp3", correctOrder: 3, englishFragment: "the equilibrium shifts spontaneously", vernacularHint: "साम्य स्वतः खिसकता है", isPlaced: false },
      { id: "pp4", correctOrder: 4, englishFragment: "in the direction that counteracts the disturbance.", vernacularHint: "जो व्यवधान का विरोध करती है।", isPlaced: false }
    ],
    formalEnglishSummary: "When a system at dynamic equilibrium is subjected to external perturbation, the equilibrium shifts spontaneously in the direction that counteracts the disturbance."
  },

  bio_photosynthesis: {
    id: "bio_photosynthesis",
    title: "Light Reactions & Photophosphorylation Z-Scheme",
    topic: "Cellular Bioenergetics",
    domain: "Biology",
    sourceCurriculum: "NCERT Biology Class 11 - Chapter 13",
    originalDenseEnglishText: "Non-cyclic photophosphorylation is initiated when light photon excitation drives electron extraction from water photolysis at Photosystem II, transferring excited electrons down a redox cytochrome gradient to Photosystem I, establishing a proton motive force across the thylakoid lumen that catalyzes ATP synthesis.",
    brokenLiteralTranslation: {
      language: "ta",
      text: "சுழற்சியற்ற ஒளிபாஸ்பரிகரணம் ஒளி ஃபோட்டான் தூண்டுதலால் தொடங்குகிறது...",
      identifiedErrors: [
        "Fails to explain that proton accumulation in the lumen acts like water stored behind a hydroelectric dam.",
        "Missing high-scoring board terminology: 'down a redox gradient', 'chemiosmotic coupling'."
      ]
    },
    vernacularConceptualAnalogy: {
      language: "ta",
      analogyTitle: "நீர்வீழ்ச்சி மற்றும் அணை மின் உற்பத்தி ஒப்புமை (Hydroelectric Dam Analogy)",
      narrative: "சூரிய ஒளி விழும்போது தண்ணீர் பிரிக்கப்பட்டு எலக்ட்ரான்கள் படிக்கட்டுகளில் இறங்குவது போல இறங்குகின்றன. அந்த ஆற்றல் புரோட்டான்களை ஒரு அணைக்கட்டு போல திலக்காய்டு உள்ளே தேக்குகிறது; அவை வெளியே ஓடும்போது டர்பைன் சுழல்வது போல ATP உருவாகிறது.",
      culturalContextualAnchor: "Grounded in renewable energy and hydroelectric turbine dynamics."
    },
    clauseMap: [
      { id: "b1", clauseIndex: 1, englishClause: "Non-cyclic photophosphorylation is initiated by water photolysis at PS II", vernacularIntuition: "ஒளிச்சேர்க்கை PS II இல் நீர் மூலக்கூறு பிரிக்கப்படுவதன் மூலம் தொடங்குகிறது", mathematicalOperator: "2H_2O \\xrightarrow{h\\nu} 4H^+ + 4e^- + O_2", scientificIdiomAnchor: "initiated by water photolysis at [System]", whyLiteralTranslationFails: "Loses the photo-splitting electrochemical meaning." },
      { id: "b2", clauseIndex: 2, englishClause: "transferring excited electrons down a redox cytochrome gradient", vernacularIntuition: "ஆற்றல் பெற்ற எலக்ட்ரான்கள் சைட்டோக்ரோம் படிக்கட்டுகள் வழியே கடத்தப்படுகின்றன", mathematicalOperator: "\\text{Redox Chain: } Q \\to Cyt_{b6f} \\to PC \\to PS I", scientificIdiomAnchor: "down a redox potential gradient", whyLiteralTranslationFails: "Fails to explain stepwise electron energy descent." },
      { id: "b3", clauseIndex: 3, englishClause: "establishing a proton motive force across the thylakoid lumen", vernacularIntuition: "திலக்காய்டு சுவருக்கு இடையே புரோட்டான் அழுத்தத்தை உருவாக்குகிறது", mathematicalOperator: "\\Delta \\mu_{H^+} = F\\Delta \\psi - 2.3RT \\Delta pH", scientificIdiomAnchor: "establishing a proton motive force", whyLiteralTranslationFails: "Translates force as physical push rather than chemiosmotic electrochemical gradient." },
      { id: "b4", clauseIndex: 4, englishClause: "that catalyzes ATP synthesis via ATP synthase", vernacularIntuition: "இது ATP சிந்தேஸ் நொதி மூலம் ATP மூலக்கூறுகளை உற்பத்தி செய்கிறது", mathematicalOperator: "ADP + P_i + H^+_{lumen} \\to ATP + H^+_{stroma}", scientificIdiomAnchor: "catalyzes ATP synthesis via [Enzyme]", whyLiteralTranslationFails: "Misses the rotary molecular motor coupling mechanism." }
    ],
    vocabularyAnchors: [
      { id: "bv1", formalEnglishTerm: "photolysis of water", vernacularTerm: "நீரின் ஒளிச்சிதைவு", phoneticPronunciation: "fəʊˈtɒlɪsɪs ɒv ˈwɔːtər", colloquialAnalogy: "ஒளியின் ஆற்றலால் நீர் மூலக்கூறு ஆக்சிஜனாகவும் புரோட்டான்களாகவும் உடைவது.", pedagogicalRole: "definition", exampleUsage: "Oxygen is evolved during the photolysis of water at the oxygen-evolving complex." },
      { id: "bv2", formalEnglishTerm: "proton motive force", vernacularTerm: "புரோட்டான் இயக்க விசை", phoneticPronunciation: "ˈprəʊtɒn ˈməʊtɪv fɔːs", colloquialAnalogy: "அணைக்கட்டில் தேங்கிய நீர் வெளியேறத் துடிக்கும் அழுத்த சக்தி.", pedagogicalRole: "operator", exampleUsage: "The proton motive force drives the rotational catalytic head of ATP synthase." }
    ],
    proofAssemblerPieces: [
      { id: "bp1", correctOrder: 1, englishFragment: "Photon absorption at Photosystem II triggers water photolysis,", vernacularHint: "PS II இல் ஒளி உறிஞ்சப்பட்டு நீர் பிரிகிறது,", isPlaced: false },
      { id: "bp2", correctOrder: 2, englishFragment: "transferring high-energy electrons down the cytochrome chain", vernacularHint: "எலக்ட்ரான்கள் சங்கிலி வழியே இறங்கி", isPlaced: false },
      { id: "bp3", correctOrder: 3, englishFragment: "to generate a transmembrane proton gradient", vernacularHint: "புரோட்டான் அழுத்தத்தை உருவாக்கி", isPlaced: false },
      { id: "bp4", correctOrder: 4, englishFragment: "which powers the chemiosmotic synthesis of ATP.", vernacularHint: "ATP மூலக்கூறை உற்பத்தி செய்கிறது.", isPlaced: false }
    ],
    formalEnglishSummary: "Photon absorption at Photosystem II triggers water photolysis, transferring high-energy electrons down the cytochrome chain to generate a transmembrane proton gradient which powers the chemiosmotic synthesis of ATP."
  },

  math_derivatives: {
    id: "math_derivatives",
    title: "Derivatives from First Principles & Chain Rule",
    topic: "Differential Calculus",
    domain: "Mathematics",
    sourceCurriculum: "NCERT Mathematics Class 11 - Chapter 13",
    originalDenseEnglishText: "The derivative of a real-valued function at a point is defined as the limiting value of the difference quotient as the increment approaches zero, representing the instantaneous rate of change and the geometrical slope of the tangent line.",
    brokenLiteralTranslation: {
      language: "te",
      text: "ఒక బిందువు వద్ద ఒక ఫంక్షన్ యొక్క ఉత్పన్నం వ్యత్యాస భాగం యొక్క పరిమితి విలువగా నిర్వచించబడింది...",
      identifiedErrors: [
        "Fails to explain that difference quotient is simply average speed over shrinking time intervals."
      ]
    },
    vernacularConceptualAnalogy: {
      language: "te",
      analogyTitle: "స్పీడోమీటర్ మరియు తక్షణ వేగ సాదృశ్యం (Speedometer Instantaneous Speed Analogy)",
      narrative: "మొత్తం ప్రయాణ సగటు వేగం కాకుండా, మీ బైక్ స్పీడోమీటర్ ఒక నిర్దిష్ట క్షణంలో చూపించే తక్షణ వేగమే డెరివేటివ్ (dy/dx).",
      culturalContextualAnchor: "Grounded in vehicular speedometers and odometer telemetry."
    },
    clauseMap: [
      { id: "m1", clauseIndex: 1, englishClause: "The derivative of a real-valued function", vernacularIntuition: "ఒక ఫంక్షన్ యొక్క అవకలనం (డెరివేటివ్)", mathematicalOperator: "f'(x) = \\frac{df}{dx}", scientificIdiomAnchor: "The derivative of [Function] with respect to [Variable]", whyLiteralTranslationFails: "Loses mathematical operator rigor." },
      { id: "m2", clauseIndex: 2, englishClause: "is defined as the limiting value of the difference quotient", vernacularIntuition: "మార్పుల నిష్పత్తి యొక్క అంతిమ లిమిట్ విలువగా నిర్వచించబడింది", mathematicalOperator: "\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}", scientificIdiomAnchor: "the limiting value of the difference quotient", whyLiteralTranslationFails: "Translates quotient as simple division without limit." },
      { id: "m3", clauseIndex: 3, englishClause: "representing the instantaneous rate of change", vernacularIntuition: "ఇది ఆ క్షణంలో జరిగే తక్షణ మార్పు రేటును సూచిస్తుంది", mathematicalOperator: "\\text{Instantaneous Velocity } v(t) = \\frac{ds}{dt}", scientificIdiomAnchor: "representing the instantaneous rate of change", whyLiteralTranslationFails: "Confuses average change with instantaneous rate." },
      { id: "m4", clauseIndex: 4, englishClause: "and the geometrical slope of the tangent line", vernacularIntuition: "మరియు వక్రరేఖ స్పర్శరేఖ యొక్క వాలు (Slope)", mathematicalOperator: "m = \\tan \\theta = f'(x_0)", scientificIdiomAnchor: "geometrical slope of the tangent line to the curve", whyLiteralTranslationFails: "Loses geometric coordinate geometry connection." }
    ],
    vocabularyAnchors: [
      { id: "mv1", formalEnglishTerm: "difference quotient", vernacularTerm: "తేడాల నిష్పత్తి", phoneticPronunciation: "ˈdɪf.ər.əns ˈkwəʊ.ʃənt", colloquialAnalogy: "రెండు బిందువుల మధ్య సగటు వేగం (Δy / Δx).", pedagogicalRole: "operator", exampleUsage: "The difference quotient converges to the derivative as interval h approaches zero." },
      { id: "mv2", formalEnglishTerm: "instantaneous rate of change", vernacularTerm: "తక్షణ మార్పు రేటు", phoneticPronunciation: "ˌɪn.stənˈteɪ.ni.əs reɪt", colloquialAnalogy: "ఒక కచ్చితమైన క్షణంలో స్పీడోమీటర్ చూపించే వేగం.", pedagogicalRole: "physical_quantity", exampleUsage: "Velocity is the instantaneous rate of change of position." }
    ],
    proofAssemblerPieces: [
      { id: "mp1", correctOrder: 1, englishFragment: "The derivative of function f(x)", vernacularHint: "ఫంక్షన్ f(x) యొక్క డెరివేటివ్,", isPlaced: false },
      { id: "mp2", correctOrder: 2, englishFragment: "is evaluated by taking the limit of the difference quotient", vernacularHint: "తేడాల నిష్పత్తి యొక్క లిమిట్ తీసుకుని,", isPlaced: false },
      { id: "mp3", correctOrder: 3, englishFragment: "as the interval h approaches zero,", vernacularHint: "వ్యవధి h సున్నాకి చేరినప్పుడు,", isPlaced: false },
      { id: "mp4", correctOrder: 4, englishFragment: "yielding the instantaneous slope of the tangent.", vernacularHint: "స్పర్శరేఖ తక్షణ వాలును ఇస్తుంది.", isPlaced: false }
    ],
    formalEnglishSummary: "The derivative of function f(x) is evaluated by taking the limit of the difference quotient as the interval h approaches zero, yielding the instantaneous slope of the tangent."
  }
};

// ==========================================
// PILLAR 3: PathWeaver Multi-Case Fixtures
// ==========================================
export const PATHWEAVER_PRESET_CASES: Record<string, PathWeaverCaseStudy> = {
  robotics_lab_access: {
    id: "robotics_lab_access",
    title: "Autonomous Robotics Lab & Sensory Workstation Accommodations",
    institutionContext: "University College of Engineering & Technology (Dean of Academic Affairs & EHS)",
    studentPersona: "Aravind (2nd Year Autistic Computer Science Major seeking hardware lab access)",
    rawPolicySnippet: "Enrolment in the Advanced Autonomous Robotics Laboratory (CS482R) requires the prerequisite submission of Form B-12 signed by the faculty coordinator prior to the semester census deadline. Students requesting sensory workstation accommodations must independently register with the Accessibility Resources Unit at least 10 business days prior to lab induction, following mandatory safety clearance from the Environmental Health and Safety (EHS) office. Incomplete documentation packages will be summarily rejected without appeal.",
    whyAutisticStudentsGetLockedOut: "Opaque inter-departmental dependencies. The student doesn't know that Form B-12 requires an unwritten informal faculty email first; the deadline calendar is scattered across 3 separate department websites.",
    nodes: [
      {
        id: "n1",
        title: "Send Informal Expression of Interest to Faculty",
        department: "Department of Computer Science",
        targetRole: "Robotics Lab Faculty Coordinator (Prof. K. Rao)",
        daysToDeadline: 14,
        hardDeadlineDate: "October 12, 2026",
        status: "available",
        isImplicitSocialPrerequisite: true,
        explicitPolicyCitation: "Unwritten social norm: Faculty rarely sign Form B-12 without prior informal email contact.",
        plainLanguageDirective: "Send a concise, 3-sentence introduction email to Prof. Rao expressing your interest and attaching your CS201 grade.",
        whatHappensIfOmitted: "Submitting Form B-12 cold results in silent administrative rejection 70% of the time.",
        requiredInputIds: [],
        scriptTemplateId: "script_prof_eoi",
        estimatedMinutes: 5,
        position: { x: 60, y: 80 }
      },
      {
        id: "n2",
        title: "Complete Online EHS Hazardous Equipment Induction",
        department: "Environmental Health & Safety",
        targetRole: "EHS Safety Officer",
        daysToDeadline: 10,
        hardDeadlineDate: "October 16, 2026",
        status: "locked",
        isImplicitSocialPrerequisite: false,
        explicitPolicyCitation: "Policy §4.2: 'Mandatory safety clearance from the EHS office.'",
        plainLanguageDirective: "Log into the university safety portal, watch the 15-minute robotics hazard module, and download the Safety Clearance PDF.",
        whatHappensIfOmitted: "Form B-12 cannot be uploaded without the Safety Certificate serial number.",
        requiredInputIds: ["n1"],
        estimatedMinutes: 20,
        position: { x: 60, y: 190 }
      },
      {
        id: "n3",
        title: "Submit Sensory Workstation Accommodation Form A-3",
        department: "Office of Accessibility Resources",
        targetRole: "Disability Resource Coordinator",
        daysToDeadline: 8,
        hardDeadlineDate: "October 18, 2026",
        status: "locked",
        isImplicitSocialPrerequisite: false,
        explicitPolicyCitation: "Policy §7.1: 'Register with Accessibility Unit at least 10 business days prior.'",
        plainLanguageDirective: "Submit Form A-3 specifying low-flicker LED bench lighting and noise-cancelling headphone permission in the hardware bay.",
        whatHappensIfOmitted: "Student faces severe sensory overload during mandatory 3-hour lab sessions.",
        requiredInputIds: ["n1"],
        scriptTemplateId: "script_accessibility_waiver",
        estimatedMinutes: 10,
        position: { x: 380, y: 140 }
      },
      {
        id: "n4",
        title: "Submit Unified Form B-12 Lab Enrollment Package",
        department: "Academic Registrar",
        targetRole: "Academic Dean / Registrar Desk",
        daysToDeadline: 4,
        hardDeadlineDate: "October 22, 2026",
        status: "locked",
        isImplicitSocialPrerequisite: false,
        explicitPolicyCitation: "Policy §1.1: 'Prerequisite submission of Form B-12 prior to semester census.'",
        plainLanguageDirective: "Upload Faculty Endorsement + Safety Certificate + Accommodation Slip into the Registrar portal in a single submission.",
        whatHappensIfOmitted: "Automatic drop from the course roster.",
        requiredInputIds: ["n2", "n3"],
        estimatedMinutes: 5,
        position: { x: 220, y: 300 }
      }
    ],
    edges: [
      { id: "e1_2", fromNodeId: "n1", toNodeId: "n2", isStrictDependency: true, label: "Faculty approval triggers EHS portal access" },
      { id: "e1_3", fromNodeId: "n1", toNodeId: "n3", isStrictDependency: true, label: "Course confirmation needed for workstation allocation" },
      { id: "e2_4", fromNodeId: "n2", toNodeId: "n4", isStrictDependency: true, label: "Safety Certificate attached to Form B-12" },
      { id: "e3_4", fromNodeId: "n3", toNodeId: "n4", isStrictDependency: true, label: "Sensory Waiver attached to Form B-12" }
    ],
    scripts: {
      script_prof_eoi: {
        id: "script_prof_eoi",
        title: "Informal Faculty Research EOI Email",
        recipientType: "Faculty Coordinator",
        recipientEmailPlaceholder: "k.rao@university.edu",
        subjectLine: "Undergraduate Research Enrollment Inquiry - Autonomous Robotics Lab (Fall 2026)",
        bodyText: "Dear Professor Rao,\n\nI am writing to express my strong enthusiasm for enrolling in the Advanced Autonomous Robotics Laboratory (CS482R) for the upcoming semester. I have completed CS201 with an A grade and have reviewed the lab safety syllabus.\n\nI would be very grateful for your endorsement on Form B-12 so I may finalize my enrollment package.\n\nSincerely,\n[Student Name]\nRoll No: [Student ID]\nDepartment of Computer Science",
        variables: [
          { key: "Student Name", label: "Your Full Name", defaultValue: "Aravind Raman" },
          { key: "Student ID", label: "Roll / Student Number", defaultValue: "CS24B042" }
        ],
        neurodivergentCommunicationTips: [
          "Faculty prefer concise 3-sentence emails without lengthy pleasantries.",
          "Sending this on Tuesday between 10 AM and 2 PM has the highest on-time response rate."
        ]
      },
      script_accessibility_waiver: {
        id: "script_accessibility_waiver",
        title: "Sensory Lab Bench Accommodation Request",
        recipientType: "Accessibility Coordinator",
        recipientEmailPlaceholder: "access@university.edu",
        subjectLine: "Sensory Accommodation Request - Robotics Hardware Lab Station (CS482R)",
        bodyText: "Dear Accessibility Services Team,\n\nI am registered for CS482R (Robotics Lab) in Hall 3B. Pursuant to my registered neurodivergent accommodation profile, I am requesting:\n1. Placement at a perimeter bench with reduced acoustic reflection.\n2. Permission to wear noise-dampening headphones during unscheduled bench testing.\n\nPlease find my medical documentation on file under ID: [Student ID].\n\nWarm regards,\n[Student Name]",
        variables: [
          { key: "Student Name", label: "Your Full Name", defaultValue: "Aravind Raman" },
          { key: "Student ID", label: "Roll / Student Number", defaultValue: "CS24B042" }
        ],
        neurodivergentCommunicationTips: [
          "Be direct about physical environment needs; accommodation officers appreciate bullet points over narrative paragraphs."
        ]
      }
    }
  }
};
