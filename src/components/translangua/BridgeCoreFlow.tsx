import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle, RotateCcw, Sparkles, BookOpen, Lightbulb, HelpCircle, ArrowLeft } from 'lucide-react';
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

const DEMO_PASSAGE: {
  subject: string;
  curriculumSource: string;
  text: string;
  terms: Record<string, TermItem>;
} = {
  subject: "Physics (Electromagnetic Waves)",
  curriculumSource: "NCERT Class 12 - Chapter 8, Page 270",
  text: "Applying Ampere's circuital law to a surface enclosing one plate of a charging capacitor reveals a missing term. Maxwell resolved this inconsistency by postulating the displacement current, which is directly proportional to the time-varying electric flux between the plates, thereby ensuring the continuity of magnetic field circulation.",
  terms: {
    "missing term": {
      id: "missing_term",
      term: "missing term",
      contextSentence: "...reveals a missing term. Maxwell resolved this inconsistency...",
      familiarLanguage: "Tamil (தமிழ்)",
      familiarMeaning: "சமன்பாட்டில் விடுபட்ட ஒரு கணித உறுப்பு (A missing mathematical term in an equation, NOT a missing vocabulary word in a sentence).",
      concreteExample: "ஒரு கணக்கில் x + y = 10 என்று இருக்க வேண்டிய இடத்தில் x = 10 என்று மட்டுமே இருந்தால், அங்கே y விடுபட்டுள்ளது போல.",
      connectionExplanation: "In colloquial language, 'term' means a vocabulary word. In academic physics, a 'term' is a mathematical entity added to an equation (like Maxwell's Id).",
      quickCheck: {
        question: "In this NCERT textbook excerpt, what does the author mean by 'missing term'?",
        options: [
          "A vocabulary word missing from the English dictionary.",
          "A mathematical current quantity missing from Ampere's original equation.",
          "A physical wire missing between the capacitor plates.",
          "A spelling mistake made by Maxwell in his lab notebook."
        ],
        correctIndex: 1,
        explanation: "Correct! The 'missing term' refers to ε₀(dΦ_E/dt), the mathematical quantity needed to conserve current."
      }
    },
    "displacement current": {
      id: "displacement_current",
      term: "displacement current",
      contextSentence: "...postulating the displacement current, which is directly proportional...",
      familiarLanguage: "Tamil (தமிழ்)",
      familiarMeaning: "மின்சாரக் கோடுகள் மாறும் வேகத்தால் இடைவெளியில் உருவாகும் ஒரு 'கற்பனை மின்னோட்டம்' (Current arising from changing electric fields, not moving electrons).",
      concreteExample: "தண்ணீர் குழாயில் நடுவே அடைப்பு இருந்தாலும், நீர்மட்டம் ஏறும் வேகம் அடுத்த பக்கத்தில் அழுத்தத்தை உருவாக்குவது போன்றது.",
      connectionExplanation: "Conduction current requires moving electrons in a wire. Displacement current exists in empty space wherever electric flux changes with time (Id = ε₀ dΦ/dt).",
      quickCheck: {
        question: "Why did Maxwell introduce the concept of 'displacement current'?",
        options: [
          "To replace all copper wires with capacitors in electrical circuits.",
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
      contextSentence: "...directly proportional to the time-varying electric flux between the plates...",
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
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(2); // Default on interactive lesson viewer
  const [selectedTermKey, setSelectedTermKey] = useState<string>("missing_term");
  const [barrierType, setBarrierType] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCheckSubmitted, setIsCheckSubmitted] = useState<boolean>(false);

  const selectedTerm = DEMO_PASSAGE.terms[selectedTermKey] || DEMO_PASSAGE.terms["missing_term"];

  const handleSelectTerm = (key: string) => {
    setSelectedTermKey(key);
    setCurrentStep(3); // Go to barrier qualification
    audioEngine.speakAnnouncement(`Selected academic term: ${DEMO_PASSAGE.terms[key]?.term}. Qualify your learning barrier.`);
  };

  const handleBarrierSelect = (type: string) => {
    setBarrierType(type);
    setCurrentStep(4); // Open Concept Bridge Card
    audioEngine.speakAnnouncement(`Bridge generated for ${selectedTerm.term}. Reconnecting to original lesson.`);
  };

  const handleQuickCheckAnswer = (index: number) => {
    setSelectedOption(index);
    setIsCheckSubmitted(true);
    if (index === selectedTerm.quickCheck.correctIndex) {
      audioEngine.speakAnnouncement("Correct! You have successfully mastered the academic concept.");
    } else {
      audioEngine.speakAnnouncement("Incorrect. Let us revisit the conceptual bridge.");
    }
  };

  const handleResetCheck = () => {
    setSelectedOption(null);
    setIsCheckSubmitted(false);
    setCurrentStep(4);
  };

  return (
    <div className="card" style={{ border: '1px solid var(--cyan-primary)', boxShadow: '0 0 20px var(--cyan-glow)' }} role="region" aria-label="Project BRIDGE Core Workflow">
      {/* Header Bar */}
      <div className="card-header" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="judge-tag" style={{ backgroundColor: 'var(--cyan-primary)', color: '#000' }}>
            PROJECT BRIDGE MVP
          </span>
          <h3 className="card-title" style={{ fontSize: '16px' }}>
            The 5-Step "Bridge, Don't Replace" Micro-Interaction
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '4px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: currentStep === 2 ? 'var(--cyan-primary)' : 'var(--text-muted)' }}>1. Lesson</span> ➔
          <span style={{ color: currentStep === 3 ? 'var(--cyan-primary)' : 'var(--text-muted)' }}>2. Barrier</span> ➔
          <span style={{ color: currentStep === 4 ? 'var(--cyan-primary)' : 'var(--text-muted)' }}>3. Bridge</span> ➔
          <span style={{ color: currentStep === 5 ? 'var(--cyan-primary)' : 'var(--text-muted)' }}>4. Quick Check</span>
        </div>
      </div>

      {/* ========================================================
          SCREEN 2: LEARNING MATERIAL & INTERACTIVE TERM HIGHLIGHT
          ======================================================== */}
      {currentStep === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '8px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="tab-badge">{DEMO_PASSAGE.subject} • {DEMO_PASSAGE.curriculumSource}</span>
            <span style={{ fontSize: '12px', color: 'var(--amber-primary)', fontWeight: 600 }}>
              👉 Click any highlighted term to bridge:
            </span>
          </div>

          {/* Interactive Source Passage Box */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1.5px solid var(--border-strong)',
            borderRadius: 'var(--radius-md)',
            padding: '18px 20px',
            fontSize: '15px',
            lineHeight: '1.9',
            color: 'var(--text-primary)'
          }}>
            Applying Ampere's circuital law to a surface enclosing one plate of a charging capacitor reveals a{' '}
            <button
              onClick={() => handleSelectTerm('missing_term')}
              style={{
                background: 'hsla(43, 96%, 56%, 0.2)',
                borderBottom: '2px solid var(--amber-primary)',
                color: 'var(--amber-primary)',
                padding: '2px 6px',
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
                background: 'hsla(190, 95%, 45%, 0.2)',
                borderBottom: '2px solid var(--cyan-primary)',
                color: 'var(--cyan-primary)',
                padding: '2px 6px',
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
                background: 'hsla(152, 76%, 45%, 0.2)',
                borderBottom: '2px solid var(--emerald-primary)',
                color: 'var(--emerald-primary)',
                padding: '2px 6px',
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
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={14} color="var(--cyan-primary)" />
            <span>The curriculum text is preserved as the permanent source of truth. We do not replace the textbook.</span>
          </div>
        </div>
      )}

      {/* ========================================================
          SCREEN 3: BARRIER DETECTION / QUALIFICATION MODAL
          ======================================================== */}
      {currentStep === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '10px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={18} color="var(--amber-primary)" />
            <h4 style={{ fontSize: '15px', color: 'var(--text-primary)' }}>
              Selected Academic Term: <span style={{ color: 'var(--amber-primary)', fontWeight: 800 }}>"{selectedTerm.term}"</span>
            </h4>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            What is currently blocking your understanding of this sentence?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '12px 16px', textAlign: 'left', border: '1px solid var(--cyan-primary)' }}
              onClick={() => handleBarrierSelect("concept_known_term_unknown")}
            >
              <div>
                <strong style={{ color: 'var(--cyan-primary)', display: 'block', marginBottom: '2px' }}>
                  🎯 "I understand the physical idea, but not this formal academic term."
                </strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  (Target Use Case: Bridge everyday vernacular intuition directly to the academic English register).
                </span>
              </div>
            </button>

            <button
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '12px 16px', textAlign: 'left' }}
              onClick={() => handleBarrierSelect("concept_unfamiliar")}
            >
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                  💡 "I don't understand the underlying physical concept at all."
                </strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  (System will provide an intuitive physical grounding analogy first).
                </span>
              </div>
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '6px' }}>
            <button className="btn btn-outline" onClick={() => setCurrentStep(2)}>
              <ArrowLeft size={14} /> Back to Lesson
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          SCREEN 4: THE CONCEPT BRIDGE CARD
          ======================================================== */}
      {currentStep === 4 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '8px 0' }}>
          {/* Top Identifier */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                Formal Academic Term
              </span>
              <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--cyan-primary)' }}>
                "{selectedTerm.term}"
              </div>
            </div>
            <span className="tab-badge" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              Language: {selectedTerm.familiarLanguage}
            </span>
          </div>

          {/* 1. Familiar Language Explanation */}
          <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--emerald-primary)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--emerald-primary)', textTransform: 'uppercase', marginBottom: '4px' }}>
              1. What It Means in Familiar Language (தாய்மொழி விளக்கம்)
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.6' }}>
              {selectedTerm.familiarMeaning}
            </p>
          </div>

          {/* 2. Concrete Example */}
          <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--amber-primary)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--amber-primary)', textTransform: 'uppercase', marginBottom: '4px' }}>
              2. Think of It As (உதாரணம்)
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {selectedTerm.concreteExample}
            </p>
          </div>

          {/* 3. The Academic Connection */}
          <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--purple-primary)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--purple-primary)', textTransform: 'uppercase', marginBottom: '4px' }}>
              3. The Connection to the Textbook Term (கல்வி இணைப்பு)
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {selectedTerm.connectionExplanation}
            </p>
          </div>

          {/* Original Context Recall */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Original Textbook Context: "{selectedTerm.contextSentence}"
          </div>

          {/* Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
            <button className="btn btn-outline" onClick={() => setCurrentStep(2)}>
              <ArrowLeft size={14} /> Back to Full Lesson
            </button>
            <button className="btn btn-primary" onClick={() => { setCurrentStep(5); setSelectedOption(null); setIsCheckSubmitted(false); }}>
              <span>Try Quick Check</span> <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          SCREEN 5: QUICK CHECK / MEASURABLE TASK VERIFICATION
          ======================================================== */}
      {currentStep === 5 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '8px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="tab-badge">Quick Learning Task Verification</span>
            <span style={{ fontSize: '12px', color: 'var(--cyan-primary)' }}>Term: "{selectedTerm.term}"</span>
          </div>

          {/* Question Box */}
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px', lineHeight: '1.5' }}>
              {selectedTerm.quickCheck.question}
            </h4>

            {/* Options List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedTerm.quickCheck.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === selectedTerm.quickCheck.correctIndex;

                let borderCol = 'var(--border-subtle)';
                let bgCol = 'var(--bg-tertiary)';

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
                    onClick={() => handleQuickCheckAnswer(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '10px 14px',
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
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'var(--bg-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Result Message */}
          {isCheckSubmitted && (
            <div style={{
              background: selectedOption === selectedTerm.quickCheck.correctIndex ? 'hsla(152, 76%, 45%, 0.15)' : 'hsla(348, 83%, 60%, 0.15)',
              border: `1px solid ${selectedOption === selectedTerm.quickCheck.correctIndex ? 'var(--emerald-primary)' : 'var(--rose-primary)'}`,
              padding: '14px',
              borderRadius: 'var(--radius-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: selectedOption === selectedTerm.quickCheck.correctIndex ? 'var(--emerald-primary)' : 'var(--rose-primary)', marginBottom: '4px' }}>
                {selectedOption === selectedTerm.quickCheck.correctIndex ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                <span>{selectedOption === selectedTerm.quickCheck.correctIndex ? "Task Access Restored! (5/5)" : "Concept-to-Term Disconnect Detected"}</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                {selectedTerm.quickCheck.explanation}
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
            <button className="btn btn-outline" onClick={handleResetCheck}>
              <RotateCcw size={14} /> Revisit Bridge
            </button>
            <button className="btn btn-primary" onClick={() => setCurrentStep(2)}>
              <span>Return to Lesson Material</span> <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
