import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle, RotateCcw, Sparkles, BookOpen, Lightbulb, HelpCircle, ArrowLeft, Play, FileText, Check } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

interface TermItem {
  id: string;
  term: string;
  contextSentence: string;
  familiarLanguage: string;
  familiarMeaning: string;
  concreteExample: string;
  connectionExplanation: string;
  quickCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const PRELOADED_LESSON: {
  subject: string;
  learningGoal: string;
  curriculumSource: string;
  languagePair: string;
  text: string;
  terms: Record<string, TermItem>;
} = {
  subject: "Science (Physics)",
  learningGoal: "Understand the concept and use it in the original lesson.",
  curriculumSource: "NCERT Class 12 - Chapter 8: Electromagnetic Waves",
  languagePair: "English → Tamil (தமிழ்)",
  text: "Applying Ampere's circuital law to a surface enclosing one plate of a charging capacitor reveals a missing term. Maxwell resolved this inconsistency by postulating the displacement current, which is directly proportional to the time-varying electric flux between the plates, thereby ensuring the continuity of magnetic field circulation.",
  terms: {
    "missing term": {
      id: "missing_term",
      term: "missing term",
      contextSentence: "Applying Ampere's circuital law to a surface enclosing one plate of a charging capacitor reveals a missing term.",
      familiarLanguage: "Tamil (தமிழ்)",
      familiarMeaning: "சமன்பாட்டில் விடுபட்ட ஒரு கணித உறுப்பு (A mathematical quantity missing from an equation, NOT a missing word in a sentence).",
      concreteExample: "ஒரு கணக்கில் x + y = 10 என்று இருக்க வேண்டிய இடத்தில் x = 10 என்று மட்டுமே இருந்தால், அங்கே y விடுபட்டுள்ளது போல.",
      connectionExplanation: "In everyday language, 'term' means a vocabulary word. In academic physics, a 'term' is a mathematical entity (like Maxwell's Id = ε₀ dΦ/dt) needed to balance the equation.",
      quickCheck: {
        question: "In this NCERT textbook sentence, what does the author mean by 'missing term'?",
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
      connectionExplanation: "Conduction current requires moving electrons in a wire. Displacement current exists in empty space wherever electric flux changes with time (Id = ε₀ dΦ/dt).",
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
};

export const BridgeCoreFlow: React.FC = () => {
  // 6-Screen State Machine matching Stage 16 Spec
  const [currentScreen, setCurrentScreen] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [selectedTermKey, setSelectedTermKey] = useState<string>("missing_term");
  const [barrierOption, setBarrierOption] = useState<string>("idea_known_term_unknown");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isCheckSubmitted, setIsCheckSubmitted] = useState<boolean>(false);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>("");

  const selectedTerm = PRELOADED_LESSON.terms[selectedTermKey] || PRELOADED_LESSON.terms["missing_term"];

  const handleStartDemo = () => {
    setIsCustomMode(false);
    setCurrentScreen(2);
    audioEngine.speakAnnouncement("Loaded demo lesson. Select an academic term to build a conceptual bridge.");
  };

  const handleStartCustom = () => {
    setIsCustomMode(true);
    setCurrentScreen(2);
    audioEngine.speakAnnouncement("Custom lesson input mode active. Paste your curriculum passage.");
  };

  const handleSelectTerm = (key: string) => {
    setSelectedTermKey(key);
    setCurrentScreen(3);
    audioEngine.speakAnnouncement(`Selected term: ${PRELOADED_LESSON.terms[key]?.term}. What is difficult here?`);
  };

  const handleConfirmBarrier = () => {
    setCurrentScreen(4);
    audioEngine.speakAnnouncement(`Concept bridge generated for ${selectedTerm.term}. Reconnecting to original lesson.`);
  };

  const handleAnswerQuestion = (idx: number) => {
    setSelectedAnswerIndex(idx);
    setIsCheckSubmitted(true);
    if (idx === selectedTerm.quickCheck.correctIndex) {
      audioEngine.speakAnnouncement("Correct! You connected the concept to the original lesson.");
    } else {
      audioEngine.speakAnnouncement("Incorrect. Let us revisit the bridge.");
    }
  };

  const handleProceedToResult = () => {
    setCurrentScreen(6);
    audioEngine.speakAnnouncement("Connected. You used the concept in the original academic context.");
  };

  const handleRevisitBridge = () => {
    setSelectedAnswerIndex(null);
    setIsCheckSubmitted(false);
    setCurrentScreen(4);
  };

  return (
    <div className="card" style={{ border: '1px solid var(--cyan-primary)', boxShadow: '0 0 24px var(--cyan-glow)' }} role="region" aria-label="BRIDGE Core Interactive Application">
      {/* Top Breadcrumb Header */}
      <div className="card-header" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="brand-badge" style={{ backgroundColor: 'var(--cyan-primary)', color: '#000' }}>
            BRIDGE MVP
          </span>
          <h3 className="card-title" style={{ fontSize: '16px' }}>
            {currentScreen === 1 && "Home"}
            {currentScreen === 2 && "Screen 2 — Your Lesson"}
            {currentScreen === 3 && "Screen 3 — Term Confirmation"}
            {currentScreen === 4 && "Screen 4 — The Concept Bridge"}
            {currentScreen === 5 && "Screen 5 — Original Task (Quick Check)"}
            {currentScreen === 6 && "Screen 6 — Learning Access Verified"}
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: currentScreen === 1 ? 'var(--cyan-primary)' : 'var(--text-muted)' }}>Home</span> ➔
          <span style={{ color: currentScreen === 2 ? 'var(--cyan-primary)' : 'var(--text-muted)' }}>Lesson</span> ➔
          <span style={{ color: currentScreen === 3 ? 'var(--cyan-primary)' : 'var(--text-muted)' }}>Barrier</span> ➔
          <span style={{ color: currentScreen === 4 ? 'var(--cyan-primary)' : 'var(--text-muted)' }}>Bridge</span> ➔
          <span style={{ color: currentScreen === 5 ? 'var(--cyan-primary)' : 'var(--text-muted)' }}>Task</span> ➔
          <span style={{ color: currentScreen === 6 ? 'var(--emerald-primary)' : 'var(--text-muted)' }}>Result</span>
        </div>
      </div>

      {/* ========================================================
          SCREEN 1 — HOME / LANDING
          ======================================================== */}
      {currentScreen === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '16px 8px', textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
          <div>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--cyan-primary)', fontWeight: 800, letterSpacing: '1px' }}>
              A learning-access tool for multilingual learners
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px', lineHeight: '1.3' }}>
              Understand the idea.<br />Connect it to the language of your lesson.
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '12px', lineHeight: '1.6' }}>
              Select a difficult academic term and build a bridge between the concept you understand in your familiar language and the formal terminology your curriculum uses.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '10px' }}>
            <button className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }} onClick={handleStartDemo}>
              <Play size={16} /> Try the Demo
            </button>
            <button className="btn btn-secondary" style={{ padding: '12px 20px', fontSize: '14px' }} onClick={handleStartCustom}>
              <FileText size={16} /> Use My Own Lesson
            </button>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', marginTop: '8px' }}>
            🛡️ <strong>"Don't replace the lesson. Bridge the learner into it."</strong> No login or setup required.
          </div>
        </div>
      )}

      {/* ========================================================
          SCREEN 2 — LESSON VIEWER
          ======================================================== */}
      {currentScreen === 2 && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', padding: '4px 0' }}>
          {/* Main Area: Learning Passage */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--cyan-primary)', textTransform: 'uppercase' }}>
                Your Lesson
              </span>
              <span style={{ fontSize: '12px', color: 'var(--amber-primary)' }}>
                Select a term that feels difficult to connect to the concept:
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
                  <Sparkles size={15} /> Analyze Custom Passage
                </button>
              </div>
            ) : (
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1.5px solid var(--border-strong)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                fontSize: '15px',
                lineHeight: '2.0',
                color: 'var(--text-primary)'
              }}>
                Applying Ampere's circuital law to a surface enclosing one plate of a charging capacitor reveals a{' '}
                <button
                  onClick={() => handleSelectTerm('missing_term')}
                  style={{
                    background: 'hsla(43, 96%, 56%, 0.2)',
                    borderBottom: '2.5px solid var(--amber-primary)',
                    color: 'var(--amber-primary)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 'inherit'
                  }}
                  title="Click to select: 'missing term'"
                >
                  missing term
                </button>
                . Maxwell resolved this inconsistency by postulating the{' '}
                <button
                  onClick={() => handleSelectTerm('displacement_current')}
                  style={{
                    background: 'hsla(190, 95%, 45%, 0.2)',
                    borderBottom: '2.5px solid var(--cyan-primary)',
                    color: 'var(--cyan-primary)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 'inherit'
                  }}
                  title="Click to select: 'displacement current'"
                >
                  displacement current
                </button>
                , which is directly proportional to the{' '}
                <button
                  onClick={() => handleSelectTerm('time_varying_flux')}
                  style={{
                    background: 'hsla(152, 76%, 45%, 0.2)',
                    borderBottom: '2.5px solid var(--emerald-primary)',
                    color: 'var(--emerald-primary)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 'inherit'
                  }}
                  title="Click to select: 'time-varying electric flux'"
                >
                  time-varying electric flux
                </button>{' '}
                between the plates, thereby ensuring the continuity of magnetic field circulation.
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <button className="btn btn-outline" onClick={() => setCurrentScreen(1)}>
                <ArrowLeft size={14} /> Back to Home
              </button>
            </div>
          </div>

          {/* Right-Side Information Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '13px' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Subject
              </div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '12px' }}>
                {PRELOADED_LESSON.subject}
              </div>

              <div style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Learning Goal
              </div>
              <div style={{ color: 'var(--text-primary)', fontSize: '12px', lineHeight: '1.5', marginBottom: '12px' }}>
                {PRELOADED_LESSON.learningGoal}
              </div>

              <div style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Language Pair
              </div>
              <div style={{ color: 'var(--cyan-primary)', fontWeight: 600 }}>
                {PRELOADED_LESSON.languagePair}
              </div>
            </div>

            <div style={{ background: 'hsla(190, 95%, 45%, 0.08)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '12px', color: 'var(--text-secondary)' }}>
              💡 <strong>Source of Truth:</strong> The original textbook wording is preserved. We never replace the curriculum with a permanent AI summary.
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
              You selected
            </span>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--amber-primary)', marginTop: '4px' }}>
              "{selectedTerm.term}"
            </h3>
          </div>

          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
            What is difficult here?
          </div>

          {/* Radio Barrier Choices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { id: "idea_known_term_unknown", label: "I understand the idea, but not the term", desc: "You have physical intuition, but the academic English wording creates a barrier." },
              { id: "words_known_concept_unknown", label: "I understand the words, but not the concept", desc: "You can read the English, but the underlying physical phenomenon is unfamiliar." },
              { id: "not_sure", label: "I'm not sure", desc: "Let the system build a complete concept-to-terminology bridge." }
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
              <Sparkles size={15} /> Build the Bridge
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          SCREEN 4 — THE HERO CONCEPT BRIDGE CARD
          ======================================================== */}
      {currentScreen === 4 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '6px 0' }}>
          {/* Section 1: Academic Term */}
          <div style={{ background: 'var(--bg-secondary)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                Academic Term
              </span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--cyan-primary)' }}>
                "{selectedTerm.term}"
              </div>
            </div>
            <span className="tab-badge">{selectedTerm.familiarLanguage}</span>
          </div>

          {/* Section 2: The Concept in Familiar Language */}
          <div style={{ background: 'var(--bg-secondary)', padding: '14px 16px', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--emerald-primary)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--emerald-primary)', textTransform: 'uppercase', marginBottom: '4px' }}>
              The Concept (தாய்மொழி விளக்கம்)
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.6' }}>
              {selectedTerm.familiarMeaning}
            </p>
          </div>

          {/* Section 3: Think of It As (Concrete Example) */}
          <div style={{ background: 'var(--bg-secondary)', padding: '14px 16px', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--amber-primary)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--amber-primary)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Think of It As (உதாரணம்)
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {selectedTerm.concreteExample}
            </p>
          </div>

          {/* Section 4: The Connection */}
          <div style={{ background: 'var(--bg-secondary)', padding: '14px 16px', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--purple-primary)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--purple-primary)', textTransform: 'uppercase', marginBottom: '4px' }}>
              The Connection (கல்வி இணைப்பு)
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {selectedTerm.connectionExplanation}
            </p>
          </div>

          {/* Section 5: In Your Lesson (Source Sentence Exactly Preserved) */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              In Your Lesson
            </span>
            "{selectedTerm.contextSentence}"
          </div>

          {/* Action Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
            <button className="btn btn-outline" onClick={() => setCurrentScreen(2)}>
              <ArrowLeft size={14} /> Back to Full Lesson
            </button>
            <button className="btn btn-primary" onClick={() => { setCurrentScreen(5); setSelectedAnswerIndex(null); setIsCheckSubmitted(false); }}>
              <span>Try the Original Question</span> <ArrowRight size={14} />
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
              Now Return to Your Lesson
            </span>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px', lineHeight: '1.5' }}>
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
                  <span>{selectedAnswerIndex === selectedTerm.quickCheck.correctIndex ? "You connected the concept to the original lesson." : "Let's revisit the bridge."}</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                  {selectedTerm.quickCheck.explanation}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn btn-outline" onClick={handleRevisitBridge}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '16px 8px', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: 'hsla(152, 76%, 45%, 0.2)', border: '2px solid var(--emerald-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <CheckCircle2 size={32} color="var(--emerald-primary)" />
          </div>

          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--emerald-primary)' }}>
              Connected.
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '6px' }}>
              You used the concept in the original academic context.
            </p>
          </div>

          {/* Before vs After Contrast Evidence Box */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'left' }}>
            <div style={{ borderRight: '1px solid var(--border-subtle)', paddingRight: '12px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--rose-primary)', fontWeight: 700 }}>
                Before Bridge
              </span>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Unable / uncertain about academic phrasing and derivation entities.
              </div>
            </div>
            <div style={{ paddingLeft: '4px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--emerald-primary)', fontWeight: 700 }}>
                After Bridge
              </span>
              <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 600, marginTop: '4px' }}>
                Completed original task in authentic curriculum register (5/5).
              </div>
            </div>
          </div>

          {/* Next Steps Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '6px' }}>
            <button className="btn btn-primary" onClick={() => { setCurrentScreen(2); setSelectedAnswerIndex(null); setIsCheckSubmitted(false); }}>
              <span>Try Another Term</span> <ArrowRight size={14} />
            </button>
            <button className="btn btn-secondary" onClick={() => { setIsCustomMode(true); setCurrentScreen(2); }}>
              Use My Own Lesson
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
