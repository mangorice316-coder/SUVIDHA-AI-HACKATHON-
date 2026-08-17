import React, { useState } from 'react';
import { 
  ArrowRight, CheckCircle2, XCircle, RotateCcw, Sparkles, BookOpen, 
  Lightbulb, HelpCircle, ArrowLeft, Play, FileText, Check, Volume2, 
  Copy, SplitSquareVertical, ArrowLeftRight, CheckCheck, RefreshCw,
  Atom, FlaskConical, Dna, Calculator
} from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';
import { Hero3DCanvas } from '../common/Hero3DCanvas';

interface TermItem {
  id: string;
  term: string;
  contextSentence: string;
  familiarLanguage: string;
  familiarMeaning: string;
  concreteExample: string;
  connectionExplanation: string;
  translationWorkaroundError: string; // Shows why Google Translate fails
  examEnglishFormula: string; // 1-click exam-ready answer
  quickCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

interface PresetLesson {
  id: string;
  subject: string;
  icon: string;
  learningGoal: string;
  curriculumSource: string;
  languagePair: string;
  text: string;
  terms: Record<string, TermItem>;
}

const PRESET_LESSONS: Record<string, PresetLesson> = {
  physics_maxwell: {
    id: "physics_maxwell",
    subject: "Physics (Electrodynamics)",
    icon: "atom",
    learningGoal: "Understand Ampere-Maxwell field continuity across capacitor gaps.",
    curriculumSource: "NCERT Class 12 - Chapter 8, Page 270",
    languagePair: "English → Tamil (தமிழ்)",
    text: "Applying Ampere's circuital law to a surface enclosing one plate of a charging capacitor reveals a missing term. Maxwell resolved this inconsistency by postulating the displacement current, which is directly proportional to the time-varying electric flux between the plates, thereby ensuring the continuity of magnetic field circulation.",
    terms: {
      "missing term": {
        id: "missing_term",
        term: "missing term",
        contextSentence: "Applying Ampere's circuital law to a surface enclosing one plate of a charging capacitor reveals a missing term.",
        familiarLanguage: "Tamil (தமிழ்)",
        familiarMeaning: "சமன்பாட்டில் விடுபட்ட ஒரு கணித உறுப்பு (A missing mathematical entity in a calculus equation, NOT a missing vocabulary word).",
        concreteExample: "ஒரு கணக்கில் x + y = 10 என்று இருக்க வேண்டிய இடத்தில் x = 10 என்று மட்டுமே இருந்தால், அங்கே y விடுபட்டுள்ளது போல.",
        connectionExplanation: "In everyday English, 'term' means a vocabulary word. In academic physics, a 'term' is a mathematical entity (Id = ε₀ dΦ/dt) added to Ampere's law.",
        translationWorkaroundError: "Google Translate renders this as 'விடுபட்ட சொல்' (missing word), leading students to think a spelling/vocabulary word was omitted!",
        examEnglishFormula: "∮ B · dl = μ₀(Ic + Id) = μ₀Ic + μ₀ε₀(dΦ_E / dt)",
        quickCheck: {
          question: "In this NCERT textbook excerpt, what does the author mean by 'missing term'?",
          options: [
            "A vocabulary word missing from the English dictionary.",
            "A mathematical current quantity missing from Ampere's original equation.",
            "A physical copper wire missing between the capacitor plates.",
            "A spelling mistake made by Maxwell in his notes."
          ],
          correctIndex: 1,
          explanation: "Correct! The 'missing term' is ε₀(dΦ_E/dt), the mathematical quantity required to ensure total current continuity."
        }
      },
      "displacement current": {
        id: "displacement_current",
        term: "displacement current",
        contextSentence: "Maxwell resolved this inconsistency by postulating the displacement current, which is directly proportional to the time-varying electric flux...",
        familiarLanguage: "Tamil (தமிழ்)",
        familiarMeaning: "மின்சாரக் கோடுகள் மாறும் வேகத்தால் இடைவெளியில் உருவாகும் ஒரு 'கற்பனை மின்னோட்டம்' (Current arising from changing electric fields, not moving electrons).",
        concreteExample: "தண்ணீர் குழாயில் நடுவே அடைப்பு இருந்தாலும், நீர்மட்டம் ஏறும் வேகம் அடுத்த பக்கத்தில் அழுத்தத்தை உருவாக்குவது போன்றது.",
        connectionExplanation: "Conduction current requires physical electrons in a wire. Displacement current exists in empty space wherever electric flux changes with time (Id = ε₀ dΦ/dt).",
        translationWorkaroundError: "Translation calls it 'இடப்பெயர்ச்சி மின்னோட்டம்' without explaining that no physical charges are actually displaced in empty space.",
        examEnglishFormula: "I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}",
        quickCheck: {
          question: "Why did Maxwell introduce the concept of 'displacement current'?",
          options: [
            "To replace all copper wires with capacitors in circuits.",
            "To explain how magnetic fields exist between capacitor plates where no physical electrons flow.",
            "To show that electric charge can be destroyed inside capacitors.",
            "To translate Ampere's Law into different regional languages."
          ],
          correctIndex: 1,
          explanation: "Exemplary! Displacement current ensures continuity of the magnetic field even across empty dielectric gaps."
        }
      },
      "time-varying electric flux": {
        id: "time_varying_flux",
        term: "time-varying electric flux",
        contextSentence: "...which is directly proportional to the time-varying electric flux between the plates...",
        familiarLanguage: "Tamil (தமிழ்)",
        familiarMeaning: "நேரம் செல்லச் செல்ல தகடுகளுக்கு இடையே மாறும் மின்சாரக் கோடுகளின் அடர்த்தி (The rate at which electric field lines change over time, dΦ_E/dt).",
        concreteExample: "ஒரு குழாயில் நீர் அழுத்தம் தொடர்ந்து ஏறிக்கொண்டே அல்லது இறங்கிக்கொண்டே இருப்பது போன்ற நிலை.",
        connectionExplanation: "'Time-varying' is formal academic English for 'changing as time passes' (d/dt). 'Flux' represents total field lines crossing an area.",
        translationWorkaroundError: "Machine translation translates 'flux' as 'பாய்ச்சல்' (flow of liquid), confusing students into thinking physical liquid is flowing.",
        examEnglishFormula: "\\frac{d\\Phi_E}{dt} = A \\frac{dE}{dt} = \\frac{1}{\\varepsilon_0} I_d",
        quickCheck: {
          question: "If a capacitor is fully charged and connected to a steady DC battery (so the electric field is constant), what happens to the displacement current?",
          options: [
            "It becomes infinite.",
            "It is zero, because the electric flux is no longer 'time-varying' (dΦ/dt = 0).",
            "It turns into heat inside the battery.",
            "It doubles in strength."
          ],
          correctIndex: 1,
          explanation: "Outstanding! Since the field is constant, dΦ/dt = 0, so displacement current is strictly zero."
        }
      }
    }
  },
  chem_equilibrium: {
    id: "chem_equilibrium",
    subject: "Chemistry (Thermodynamics)",
    icon: "flask",
    learningGoal: "Understand Le Chatelier's dynamic equilibrium and response to stressors.",
    curriculumSource: "NCERT Class 11 - Chapter 7: Chemical Equilibrium",
    languagePair: "English → Hindi (हिन्दी)",
    text: "When a chemical system at dynamic equilibrium is subjected to an external perturbation in temperature, pressure, or concentration, the equilibrium composition undergoes a spontaneous shift in the direction that counteracts the imposed disturbance.",
    terms: {
      "external perturbation": {
        id: "external_perturbation",
        term: "external perturbation",
        contextSentence: "...subjected to an external perturbation in temperature, pressure, or concentration...",
        familiarLanguage: "Hindi (हिन्दी)",
        familiarMeaning: "संतुलन पर बाहर से डाला गया दबाव या बदलाव (An applied change in system conditions like temperature or pressure).",
        concreteExample: "एक सी-सॉ (seesaw) झूले पर एक तरफ अचानक अतिरिक्त वजन रख देने जैसा।",
        connectionExplanation: "'Perturbation' sounds like an emotional disturbance or error in everyday English, but in thermodynamics it is simply an applied stressor (ΔT, ΔP, or ΔC).",
        translationWorkaroundError: "Google Translate renders perturbation as 'गड़बड़ी' or 'परेशानी' (trouble/mistake), obscuring the thermodynamic stress concept.",
        examEnglishFormula: "\\Delta G = \\Delta G^\\circ + RT \\ln Q \\implies Q \\neq K_{eq}",
        quickCheck: {
          question: "In Le Chatelier's Principle, what constitutes an 'external perturbation'?",
          options: [
            "A mistake in the lab notebook calculations.",
            "An intentional change applied to the system's temperature, pressure, or volume.",
            "The chemical reaction stopping completely forever.",
            "Translating the chemical formula into another language."
          ],
          correctIndex: 1,
          explanation: "Correct! Perturbation refers to changing temperature, pressure, or concentration to shift the reaction quotient Q."
        }
      }
    }
  },
  bio_osmosis: {
    id: "bio_osmosis",
    subject: "Biology (Cellular Transport)",
    icon: "dna",
    learningGoal: "Master passive osmosis across semipermeable membranes.",
    curriculumSource: "NCERT Class 11 - Chapter 11: Transport in Plants",
    languagePair: "English → Telugu (తెలుగు)",
    text: "Water moves down its chemical potential gradient across a selectively permeable membrane via passive osmosis until the hydrostatic pressure counters the osmotic potential.",
    terms: {
      "chemical potential gradient": {
        id: "chemical_potential_gradient",
        term: "chemical potential gradient",
        contextSentence: "Water moves down its chemical potential gradient across a selectively permeable membrane...",
        familiarLanguage: "Telugu (తెలుగు)",
        familiarMeaning: "నీటి అణువుల సాంద్రత ఎక్కువగా ఉన్న చోటు నుండి తక్కువగా ఉన్న చోటుకు సహజ ప్రవాహం (Difference in free energy of water molecules).",
        concreteExample: "ఎత్తైన కొండ పైనుండి నీరు సహజంగా కిందకు ప్రవహించడం లాంటిది.",
        connectionExplanation: "'Gradient' means a physical slope or difference. 'Chemical potential' is the energy per mole driving spontaneous molecular diffusion.",
        translationWorkaroundError: "Translation outputs 'రసాయన సంభావ్య వాలు', which confuses students into searching for an actual physical mechanical slope.",
        examEnglishFormula: "\\Psi_w = \\Psi_s + \\Psi_p \\quad (\\text{Net Water Potential})",
        quickCheck: {
          question: "What does 'moving down the chemical potential gradient' mean for water molecules?",
          options: [
            "Water molecules rolling down a wooden staircase.",
            "Water naturally flowing from a region of higher free energy to lower free energy without ATP energy input.",
            "Water molecules turning into steam inside the cell.",
            "Water reacting with chlorine gas."
          ],
          correctIndex: 1,
          explanation: "Exemplary! Passive osmosis occurs spontaneously down the water potential gradient until equilibrium Ψ_w = 0."
        }
      }
    }
  }
};

export const BridgeCoreFlow: React.FC = () => {
  // 6-Screen State Machine matching Stage 16 & 18 Spec
  const [currentScreen, setCurrentScreen] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [activeLessonKey, setActiveLessonKey] = useState<string>("physics_maxwell");
  const [selectedTermKey, setSelectedTermKey] = useState<string>("missing_term");
  const [barrierOption, setBarrierOption] = useState<string>("idea_known_term_unknown");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isCheckSubmitted, setIsCheckSubmitted] = useState<boolean>(false);
  const [showWorkaroundCompare, setShowWorkaroundCompare] = useState<boolean>(false);
  const [copiedFormula, setCopiedFormula] = useState<boolean>(false);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>("");

  const currentLesson = PRESET_LESSONS[activeLessonKey] || PRESET_LESSONS.physics_maxwell;
  const selectedTerm = currentLesson.terms[selectedTermKey] || Object.values(currentLesson.terms)[0];

  const handleStartDemo = (lessonKey: string = "physics_maxwell") => {
    setActiveLessonKey(lessonKey);
    setIsCustomMode(false);
    const firstTerm = Object.keys(PRESET_LESSONS[lessonKey].terms)[0];
    setSelectedTermKey(firstTerm);
    setCurrentScreen(2);
    audioEngine.speakAnnouncement(`Loaded ${PRESET_LESSONS[lessonKey].subject}. Select an academic term to bridge.`);
  };

  const handleSelectTerm = (key: string) => {
    setSelectedTermKey(key);
    setCurrentScreen(3);
    audioEngine.speakAnnouncement(`Selected term: ${currentLesson.terms[key]?.term || key}. What is blocking your understanding?`);
  };

  const handleConfirmBarrier = () => {
    setCurrentScreen(4);
    audioEngine.speakAnnouncement(`Concept bridge generated for ${selectedTerm.term}. Reconnecting to original lesson.`);
  };

  const handleAnswerQuestion = (idx: number) => {
    setSelectedAnswerIndex(idx);
    setIsCheckSubmitted(true);
    if (idx === selectedTerm.quickCheck.correctIndex) {
      audioEngine.speakAnnouncement("Correct! You successfully connected the concept to the original lesson.");
    } else {
      audioEngine.speakAnnouncement("Incorrect. Let us revisit the bridge.");
    }
  };

  const handleProceedToResult = () => {
    setCurrentScreen(6);
    audioEngine.speakAnnouncement("Connected. You used the concept in the original academic context.");
  };

  const handleCopyExamFormula = () => {
    navigator.clipboard.writeText(selectedTerm.examEnglishFormula);
    setCopiedFormula(true);
    setTimeout(() => setCopiedFormula(false), 2000);
    audioEngine.speakAnnouncement("Copied formal English exam derivation formula to clipboard.");
  };

  const handleVoiceReadAloud = (text: string) => {
    audioEngine.speakAnnouncement(text);
  };

  return (
    <div className="card" style={{ border: '1px solid var(--cyan-primary)', boxShadow: '0 0 28px var(--cyan-glow)' }} role="region" aria-label="BRIDGE Core Interactive Application">
      
      {/* ========================================================
          FAST 1-CLICK TOP LAUNCHER & BREADCRUMB
          ======================================================== */}
      <div className="card-header" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="brand-badge" style={{ backgroundColor: 'var(--cyan-primary)', color: '#000', fontWeight: 800 }}>
            PROJECT BRIDGE
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button 
              className={`btn ${activeLessonKey === 'physics_maxwell' && currentScreen !== 1 ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '11px', padding: '4px 8px' }}
              onClick={() => handleStartDemo('physics_maxwell')}
            >
              <Atom size={12} /> Physics (Tamil)
            </button>
            <button 
              className={`btn ${activeLessonKey === 'chem_equilibrium' && currentScreen !== 1 ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '11px', padding: '4px 8px' }}
              onClick={() => handleStartDemo('chem_equilibrium')}
            >
              <FlaskConical size={12} /> Chem (Hindi)
            </button>
            <button 
              className={`btn ${activeLessonKey === 'bio_osmosis' && currentScreen !== 1 ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '11px', padding: '4px 8px' }}
              onClick={() => handleStartDemo('bio_osmosis')}
            >
              <Dna size={12} /> Biology (Telugu)
            </button>
          </div>
        </div>

        {/* Breadcrumb Steps */}
        <div style={{ display: 'flex', gap: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: currentScreen === 1 ? 'var(--cyan-primary)' : 'var(--text-muted)' }}>1.Home</span> ➔
          <span style={{ color: currentScreen === 2 ? 'var(--cyan-primary)' : 'var(--text-muted)' }}>2.Lesson</span> ➔
          <span style={{ color: currentScreen === 3 ? 'var(--cyan-primary)' : 'var(--text-muted)' }}>3.Barrier</span> ➔
          <span style={{ color: currentScreen === 4 ? 'var(--cyan-primary)' : 'var(--text-muted)' }}>4.Bridge</span> ➔
          <span style={{ color: currentScreen === 5 ? 'var(--cyan-primary)' : 'var(--text-muted)' }}>5.Task</span> ➔
          <span style={{ color: currentScreen === 6 ? 'var(--emerald-primary)' : 'var(--text-muted)' }}>6.Result</span>
        </div>
      </div>

      {/* ========================================================
          SCREEN 1 — HOME / LANDING
          ======================================================== */}
      {currentScreen === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', padding: '16px 8px', textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          {/* Interactive 3D WebGL Core */}
          <Hero3DCanvas />

          <div>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--cyan-primary)', fontWeight: 800, letterSpacing: '1px' }}>
              Universal Learning Access Engine
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px', lineHeight: '1.3' }}>
              Understand the idea.<br />
              <span style={{ color: 'var(--cyan-primary)' }}>Connect it to the language of your lesson.</span>
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '12px', lineHeight: '1.6' }}>
              Multilingual students often understand the physical concept in their mother tongue, but get locked out by dense academic English phrasing. BRIDGE restores that connection without dumbing down the curriculum.
            </p>
          </div>

          {/* Quick Preset Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'left' }}>
            <div 
              className="card" 
              style={{ cursor: 'pointer', border: '1px solid var(--cyan-primary)', background: 'var(--bg-secondary)', padding: '14px', transition: 'transform 0.2s' }}
              onClick={() => handleStartDemo('physics_maxwell')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--cyan-primary)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                <Atom size={16} /> Physics (NCERT 12)
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>
                Displacement Current
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                English ➔ Tamil (தமிழ்)
              </div>
            </div>

            <div 
              className="card" 
              style={{ cursor: 'pointer', border: '1px solid var(--amber-primary)', background: 'var(--bg-secondary)', padding: '14px', transition: 'transform 0.2s' }}
              onClick={() => handleStartDemo('chem_equilibrium')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--amber-primary)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                <FlaskConical size={16} /> Chemistry (NCERT 11)
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>
                Le Chatelier Equilibrium
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                English ➔ Hindi (हिन्दी)
              </div>
            </div>

            <div 
              className="card" 
              style={{ cursor: 'pointer', border: '1px solid var(--emerald-primary)', background: 'var(--bg-secondary)', padding: '14px', transition: 'transform 0.2s' }}
              onClick={() => handleStartDemo('bio_osmosis')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--emerald-primary)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                <Dna size={16} /> Biology (NCERT 11)
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>
                Cellular Osmosis
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                English ➔ Telugu (తెలుగు)
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
            <button className="btn btn-primary" style={{ padding: '12px 26px', fontSize: '15px' }} onClick={() => handleStartDemo('physics_maxwell')}>
              <Play size={16} /> Launch Instant 2-Minute Demo
            </button>
            <button className="btn btn-secondary" style={{ padding: '12px 20px', fontSize: '14px' }} onClick={() => { setIsCustomMode(true); setCurrentScreen(2); }}>
              <FileText size={16} /> Paste Custom Lesson
            </button>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
            🛡️ <strong>"Don't replace the lesson. Bridge the learner into it."</strong> Zero login, 0ms offline latency, 100% public.
          </div>
        </div>
      )}

      {/* ========================================================
          SCREEN 2 — LESSON VIEWER
          ======================================================== */}
      {currentScreen === 2 && (
        <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: '20px', padding: '4px 0' }}>
          {/* Main Area: Learning Passage */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--cyan-primary)', textTransform: 'uppercase' }}>
                Your Lesson Material
              </span>
              <span style={{ fontSize: '12px', color: 'var(--amber-primary)', fontWeight: 600 }}>
                👉 Click any highlighted term to bridge:
              </span>
            </div>

            {isCustomMode ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <textarea
                  rows={6}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Paste your curriculum passage here..."
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    lineHeight: '1.7',
                    resize: 'none'
                  }}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (!customText.trim()) return;
                    handleSelectTerm('missing_term');
                  }}
                >
                  <Sparkles size={15} /> Extract Academic Terms & Bridge
                </button>
              </div>
            ) : (
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1.5px solid var(--border-strong)',
                borderRadius: 'var(--radius-md)',
                padding: '22px',
                fontSize: '16px',
                lineHeight: '2.1',
                color: 'var(--text-primary)'
              }}>
                {activeLessonKey === 'physics_maxwell' && (
                  <>
                    Applying Ampere's circuital law to a surface enclosing one plate of a charging capacitor reveals a{' '}
                    <button
                      onClick={() => handleSelectTerm('missing_term')}
                      style={{
                        background: 'hsla(43, 96%, 56%, 0.25)',
                        borderBottom: '2.5px solid var(--amber-primary)',
                        color: 'var(--amber-primary)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: 'inherit'
                      }}
                      title="Click to Bridge: 'missing term'"
                    >
                      missing term
                    </button>
                    . Maxwell resolved this inconsistency by postulating the{' '}
                    <button
                      onClick={() => handleSelectTerm('displacement_current')}
                      style={{
                        background: 'hsla(190, 95%, 45%, 0.25)',
                        borderBottom: '2.5px solid var(--cyan-primary)',
                        color: 'var(--cyan-primary)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: 'inherit'
                      }}
                      title="Click to Bridge: 'displacement current'"
                    >
                      displacement current
                    </button>
                    , which is directly proportional to the{' '}
                    <button
                      onClick={() => handleSelectTerm('time_varying_flux')}
                      style={{
                        background: 'hsla(152, 76%, 45%, 0.25)',
                        borderBottom: '2.5px solid var(--emerald-primary)',
                        color: 'var(--emerald-primary)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: 'inherit'
                      }}
                      title="Click to Bridge: 'time-varying electric flux'"
                    >
                      time-varying electric flux
                    </button>{' '}
                    between the plates, thereby ensuring the continuity of magnetic field circulation.
                  </>
                )}

                {activeLessonKey === 'chem_equilibrium' && (
                  <>
                    When a chemical system at dynamic equilibrium is subjected to an{' '}
                    <button
                      onClick={() => handleSelectTerm('external_perturbation')}
                      style={{
                        background: 'hsla(43, 96%, 56%, 0.25)',
                        borderBottom: '2.5px solid var(--amber-primary)',
                        color: 'var(--amber-primary)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: 'inherit'
                      }}
                    >
                      external perturbation
                    </button>{' '}
                    in temperature, pressure, or concentration, the equilibrium composition undergoes a spontaneous shift in the direction that counteracts the imposed disturbance.
                  </>
                )}

                {activeLessonKey === 'bio_osmosis' && (
                  <>
                    Water moves down its{' '}
                    <button
                      onClick={() => handleSelectTerm('chemical_potential_gradient')}
                      style={{
                        background: 'hsla(152, 76%, 45%, 0.25)',
                        borderBottom: '2.5px solid var(--emerald-primary)',
                        color: 'var(--emerald-primary)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: 'inherit'
                      }}
                    >
                      chemical potential gradient
                    </button>{' '}
                    across a selectively permeable membrane via passive osmosis until the hydrostatic pressure counters the osmotic potential.
                  </>
                )}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn btn-outline" onClick={() => setCurrentScreen(1)}>
                <ArrowLeft size={14} /> Back to Home
              </button>
              <button className="btn btn-secondary" onClick={() => handleVoiceReadAloud(currentLesson.text)}>
                <Volume2 size={15} color="var(--cyan-primary)" /> Listen to Lesson
              </button>
            </div>
          </div>

          {/* Right-Side Information Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '13px' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Curriculum Source
              </div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '12px' }}>
                {currentLesson.curriculumSource}
              </div>

              <div style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Subject Domain
              </div>
              <div style={{ color: 'var(--cyan-primary)', fontWeight: 600, marginBottom: '12px' }}>
                {currentLesson.subject}
              </div>

              <div style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Target Bridge Language
              </div>
              <div style={{ color: 'var(--emerald-primary)', fontWeight: 700 }}>
                {currentLesson.languagePair}
              </div>
            </div>

            <div style={{ background: 'hsla(190, 95%, 45%, 0.08)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '12px', color: 'var(--text-secondary)' }}>
              💡 <strong>Core Invariant:</strong> The textbook text is never replaced or dumbed down. We bridge the student into the real curriculum.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SCREEN 3 — TERM CONFIRMATION / BARRIER QUALIFICATION
          ======================================================== */}
      {currentScreen === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: '10px 0', maxWidth: '640px', margin: '0 auto' }}>
          <div>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
              You selected academic term
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--amber-primary)', marginTop: '4px' }}>
              "{selectedTerm.term}"
            </h3>
          </div>

          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
            What is difficult here? (Helps prevent assuming every difficulty is linguistic):
          </div>

          {/* Radio Barrier Choices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { id: "idea_known_term_unknown", label: "I understand the idea, but not this academic term", desc: "Target Use Case: Bridge everyday vernacular intuition directly to the academic English register." },
              { id: "words_known_concept_unknown", label: "I understand the individual words, but not the physical concept", desc: "System will provide an intuitive physical grounding analogy first." },
              { id: "not_sure", label: "I'm not sure — guide me through the whole bridge", desc: "Builds a full 3-layer conceptual, phonetic, and derivation scaffold." }
            ].map(opt => (
              <label
                key={opt.id}
                onClick={() => setBarrierOption(opt.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: barrierOption === opt.id ? 'var(--bg-card-hover)' : 'var(--bg-secondary)',
                  border: `1.5px solid ${barrierOption === opt.id ? 'var(--cyan-primary)' : 'var(--border-subtle)'}`,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <input
                  type="radio"
                  name="barrier"
                  checked={barrierOption === opt.id}
                  onChange={() => setBarrierOption(opt.id)}
                  style={{ marginTop: '3px' }}
                />
                <div>
                  <strong style={{ color: barrierOption === opt.id ? 'var(--cyan-primary)' : 'var(--text-primary)', display: 'block' }}>
                    {opt.label}
                  </strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {opt.desc}
                  </span>
                </div>
              </label>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <button className="btn btn-outline" onClick={() => setCurrentScreen(2)}>
              <ArrowLeft size={14} /> Back to Lesson
            </button>
            <button className="btn btn-primary" onClick={handleConfirmBarrier}>
              <Sparkles size={15} /> Build Concept Bridge
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          SCREEN 4 — THE HERO CONCEPT BRIDGE CARD
          ======================================================== */}
      {currentScreen === 4 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '6px 0' }}>
          
          {/* Top Header with Voice & Comparison Toggle */}
          <div style={{ background: 'var(--bg-secondary)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                Formal Academic Term
              </span>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--cyan-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>"{selectedTerm.term}"</span>
                <button 
                  className="btn btn-outline" 
                  style={{ padding: '4px 8px', fontSize: '11px' }}
                  onClick={() => handleVoiceReadAloud(selectedTerm.term)}
                  title="Listen to English Pronunciation"
                >
                  <Volume2 size={13} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className={`btn ${showWorkaroundCompare ? 'btn-primary' : 'btn-outline'}`}
                style={{ fontSize: '11px', padding: '6px 10px' }}
                onClick={() => setShowWorkaroundCompare(!showWorkaroundCompare)}
              >
                <ArrowLeftRight size={13} /> {showWorkaroundCompare ? "Hide Translation Failure" : "Why Machine Translation Fails"}
              </button>
              <span className="tab-badge">{selectedTerm.familiarLanguage}</span>
            </div>
          </div>

          {/* Interactive Translation Workaround Contrast Box (if toggled) */}
          {showWorkaroundCompare && (
            <div style={{ background: 'hsla(348, 83%, 60%, 0.12)', border: '1.5px solid var(--rose-primary)', borderRadius: 'var(--radius-sm)', padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--rose-primary)', fontWeight: 700, fontSize: '13px' }}>
                <XCircle size={16} />
                <span>Conventional Workaround Failure (Google Translate / Dictionary):</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                {selectedTerm.translationWorkaroundError}
              </p>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Result: The student gets confused by literal translation errors and cannot write the English physics derivation on exam papers.
              </div>
            </div>
          )}

          {/* 1. Familiar Language Conceptual Explanation */}
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--emerald-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--emerald-primary)', textTransform: 'uppercase' }}>
                1. What It Means in Familiar Language (தாய்மொழி விளக்கம்)
              </div>
              <button 
                className="btn btn-outline" 
                style={{ padding: '2px 8px', fontSize: '11px' }}
                onClick={() => handleVoiceReadAloud(selectedTerm.familiarMeaning)}
              >
                <Volume2 size={12} /> Read Aloud
              </button>
            </div>
            <p style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: '1.6' }}>
              {selectedTerm.familiarMeaning}
            </p>
          </div>

          {/* 2. Concrete Example */}
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--amber-primary)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--amber-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
              2. Think of It As (உதாரணம்)
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {selectedTerm.concreteExample}
            </p>
          </div>

          {/* 3. The Connection & Formal Exam Derivation */}
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--purple-primary)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--purple-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
              3. The Connection to Academic Register & Formula (கல்வி இணைப்பு)
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '10px' }}>
              {selectedTerm.connectionExplanation}
            </p>

            {/* 1-Click Copy Exam Formula Box */}
            <div style={{ background: 'var(--bg-primary)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--cyan-primary)' }}>
                {selectedTerm.examEnglishFormula}
              </div>
              <button 
                className="btn btn-outline" 
                style={{ fontSize: '11px', padding: '4px 8px' }}
                onClick={handleCopyExamFormula}
              >
                {copiedFormula ? <CheckCheck size={13} color="var(--emerald-primary)" /> : <Copy size={13} />}
                <span>{copiedFormula ? "Copied!" : "Copy Formula"}</span>
              </button>
            </div>
          </div>

          {/* 4. In Your Lesson (Source Context Exactly Preserved) */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '14px 16px', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              Original Lesson Context
            </span>
            "{selectedTerm.contextSentence}"
          </div>

          {/* Action Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
            <button className="btn btn-outline" onClick={() => setCurrentScreen(2)}>
              <ArrowLeft size={14} /> Back to Full Lesson
            </button>
            <button className="btn btn-primary" onClick={() => { setCurrentScreen(5); setSelectedAnswerIndex(null); setIsCheckSubmitted(false); }}>
              <span>Try Original Question Task</span> <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          SCREEN 5 — ORIGINAL TASK (QUICK CHECK)
          ======================================================== */}
      {currentScreen === 5 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '6px 0' }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--cyan-primary)', fontWeight: 700 }}>
              Now Return to Your Lesson Task
            </span>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px', lineHeight: '1.5' }}>
              {selectedTerm.quickCheck.question}
            </h4>
          </div>

          {/* 4 MCQ Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {selectedTerm.quickCheck.options.map((opt, idx) => {
              const isSelected = selectedAnswerIndex === idx;
              const isCorrect = idx === selectedTerm.quickCheck.correctIndex;

              let borderCol = 'var(--border-subtle)';
              let bgCol = 'var(--bg-secondary)';

              if (isCheckSubmitted) {
                if (isCorrect) {
                  borderCol = 'var(--emerald-primary)';
                  bgCol = 'hsla(152, 76%, 45%, 0.15)';
                } else if (isSelected) {
                  borderCol = 'var(--rose-primary)';
                  bgCol = 'hsla(348, 83%, 60%, 0.15)';
                }
              } else if (isSelected) {
                borderCol = 'var(--cyan-primary)';
                bgCol = 'var(--bg-card-hover)';
              }

              return (
                <button
                  key={idx}
                  disabled={isCheckSubmitted}
                  onClick={() => setSelectedAnswerIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: bgCol,
                    border: `1.5px solid ${borderCol}`,
                    color: 'var(--text-primary)',
                    textAlign: 'left',
                    fontSize: '13px',
                    cursor: isCheckSubmitted ? 'default' : 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span style={{ flex: 1 }}>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Action / Check Button */}
          {!isCheckSubmitted ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <button className="btn btn-outline" onClick={() => setCurrentScreen(4)}>
                <ArrowLeft size={14} /> Review Bridge
              </button>
              <button
                className="btn btn-primary"
                disabled={selectedAnswerIndex === null}
                onClick={() => handleAnswerQuestion(selectedAnswerIndex!)}
              >
                <Check size={15} /> Check Answer
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '6px' }}>
              <div style={{
                background: selectedAnswerIndex === selectedTerm.quickCheck.correctIndex ? 'hsla(152, 76%, 45%, 0.15)' : 'hsla(348, 83%, 60%, 0.15)',
                border: `1px solid ${selectedAnswerIndex === selectedTerm.quickCheck.correctIndex ? 'var(--emerald-primary)' : 'var(--rose-primary)'}`,
                padding: '14px',
                borderRadius: 'var(--radius-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: selectedAnswerIndex === selectedTerm.quickCheck.correctIndex ? 'var(--emerald-primary)' : 'var(--rose-primary)', marginBottom: '4px' }}>
                  {selectedAnswerIndex === selectedTerm.quickCheck.correctIndex ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                  <span>{selectedAnswerIndex === selectedTerm.quickCheck.correctIndex ? "You connected the concept to the original lesson! (5/5)" : "Let's revisit the bridge."}</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                  {selectedTerm.quickCheck.explanation}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn btn-outline" onClick={() => { setSelectedAnswerIndex(null); setIsCheckSubmitted(false); setCurrentScreen(4); }}>
                  <RotateCcw size={14} /> Review Bridge
                </button>
                {selectedAnswerIndex === selectedTerm.quickCheck.correctIndex && (
                  <button className="btn btn-primary" onClick={handleProceedToResult}>
                    <span>View Access Result</span> <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SCREEN 6 — RESULT / ACCESS VERIFIED
          ======================================================== */}
      {currentScreen === 6 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', padding: '16px 8px', textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'hsla(152, 76%, 45%, 0.2)', border: '2px solid var(--emerald-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <CheckCircle2 size={36} color="var(--emerald-primary)" />
          </div>

          <div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--emerald-primary)' }}>
              Connected.
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--text-primary)', marginTop: '6px' }}>
              You used the concept in the original academic curriculum context.
            </p>
          </div>

          {/* Before vs After Contrast Evidence Box */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'left' }}>
            <div style={{ borderRight: '1px solid var(--border-subtle)', paddingRight: '14px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--rose-primary)', fontWeight: 700 }}>
                Before Bridge (Condition A / B)
              </span>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.5' }}>
                Stalled by academic English phrasing or confused by literal translation errors (0/5).
              </div>
            </div>
            <div style={{ paddingLeft: '6px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--emerald-primary)', fontWeight: 700 }}>
                After Bridge (Condition C)
              </span>
              <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 600, marginTop: '4px', lineHeight: '1.5' }}>
                Completed original task in authentic curriculum register with formula mastery (5/5).
              </div>
            </div>
          </div>

          {/* Next Steps Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '6px' }}>
            <button className="btn btn-primary" onClick={() => { setCurrentScreen(2); setSelectedAnswerIndex(null); setIsCheckSubmitted(false); }}>
              <span>Try Another Academic Term</span> <ArrowRight size={14} />
            </button>
            <button className="btn btn-secondary" onClick={() => handleStartDemo('chem_equilibrium')}>
              Try Chemistry Module (Hindi)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
