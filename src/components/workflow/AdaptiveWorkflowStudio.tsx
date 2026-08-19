import React, { useState } from 'react';
import {
  Brain, Target, FileText, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft,
  Sparkles, Layers, Activity, Zap, Flame, Clock, Play, HelpCircle, ShieldAlert,
  ChevronRight, RefreshCw, Upload, BookOpen
} from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';
import { SupportedLanguage } from '../../types/translangua';

interface AdaptiveWorkflowStudioProps {
  onCompleteWorkflow: (goalData: { subject: string; targetScore: number; days: number; dailyMins: number }) => void;
  onCancel: () => void;
}

export const AdaptiveWorkflowStudio: React.FC<AdaptiveWorkflowStudioProps> = ({
  onCompleteWorkflow,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Goal Type
  const [goalType, setGoalType] = useState<string>('exam');

  // Step 2: Goal Configuration
  const [subjectName, setSubjectName] = useState<string>('Physics (Class 12)');
  const [examName, setExamName] = useState<string>('CBSE Board Examination');
  const [targetScore, setTargetScore] = useState<number>(92);
  const [daysRemaining, setDaysRemaining] = useState<number>(22);
  const [dailyMins, setDailyMins] = useState<number>(35);

  // Step 3: Uploaded Materials
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([
    'Class_12_Physics_Syllabus.pdf',
    'NCERT_Electromagnetism_Notes.pdf',
    'CBSE_2024_Board_Question_Paper.pdf'
  ]);
  const [isProcessingContent, setIsProcessingContent] = useState<boolean>(false);
  const [contentProcessed, setContentProcessed] = useState<boolean>(false);

  // Step 4: Diagnostic Questions State
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<{ [qId: number]: number }>({});
  const [diagnosticConfidences, setDiagnosticConfidences] = useState<{ [qId: number]: number }>({});
  const [isDiagnosticSubmitted, setIsDiagnosticSubmitted] = useState<boolean>(false);

  const diagnosticQuestions = [
    {
      id: 1,
      topic: 'Mechanics (Kinematics)',
      difficulty: 'Easy',
      question: 'Which equation correctly expresses the velocity of a particle with constant acceleration a?',
      options: [
        'v = u + a · t',
        'v = u + (1/2) a · t²',
        'v² = u² + a · t',
        'v = (u + a) / t'
      ],
      correctIndex: 0,
      rationale: 'v = u + at is the fundamental first equation of motion.'
    },
    {
      id: 2,
      topic: 'Electricity (Electric Field)',
      difficulty: 'Medium',
      question: 'What is the net electrostatic field inside a hollow spherical charged conductor in equilibrium?',
      options: [
        'Proportional to charge Q',
        'Zero everywhere inside the cavity',
        'Infinite at the center',
        'Inversely proportional to radius r'
      ],
      correctIndex: 1,
      rationale: 'By Gauss’s Law (∮ E · dA = Q_enclosed / ε₀), enclosed charge is zero, hence E = 0 everywhere inside.'
    },
    {
      id: 3,
      topic: 'Electromagnetism (Faraday/Lenz)',
      difficulty: 'Hard',
      question: 'A north pole of a bar magnet is pushed rapidly into a copper ring. What is the direction of the induced current when viewed from the magnet side?',
      options: [
        'Clockwise to attract the magnet',
        'Counter-clockwise to create a North pole repelling the magnet',
        'No current because copper is not magnetic',
        'Alternating uncontrollably'
      ],
      correctIndex: 1,
      rationale: 'By Lenz’s Law, induced current opposes the incoming North pole by establishing an opposing North pole (Counter-Clockwise).'
    }
  ];

  const handleProcessMaterials = () => {
    setIsProcessingContent(true);
    audioEngine.playChime(600, 0.15);
    setTimeout(() => {
      setIsProcessingContent(false);
      setContentProcessed(true);
      audioEngine.playChime(800, 0.25);
      audioEngine.speakAnnouncement("AI successfully extracted syllabus structure and concept dependencies.");
    }, 1200);
  };

  const handleNextStep = () => {
    const next = currentStep + 1;
    setCurrentStep(next);
    audioEngine.playChime(600 + next * 35, 0.15);
  };

  const handlePrevStep = () => {
    const prev = Math.max(1, currentStep - 1);
    setCurrentStep(prev);
    audioEngine.playChime(500, 0.1);
  };

  const handleFinalLaunch = () => {
    audioEngine.playChime(880, 0.3);
    audioEngine.speakAnnouncement("Launching your personalized daily mission!");
    onCompleteWorkflow({
      subject: subjectName,
      targetScore,
      days: daysRemaining,
      dailyMins
    });
  };

  return (
    <div style={{
      maxWidth: '1080px',
      margin: '0 auto',
      padding: '24px 16px',
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* Top Header & Breadcrumb Tracker */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 229, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cyan-primary)'
            }}>
              <Brain size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
                LearnCraft Adaptive Onboarding & Diagnostic Studio
              </h2>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Closed-Loop Learning Architecture • Step {currentStep} of 6
              </div>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="btn btn-outline"
            style={{ fontSize: '12px', padding: '6px 14px' }}
          >
            Exit to Subject Studios
          </button>
        </div>

        {/* Step Progress Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
          {[
            '1. Goal Type',
            '2. Parameters',
            '3. Syllabus',
            '4. Diagnostic',
            '5. Knowledge Map',
            '6. Daily Mission'
          ].map((label, idx) => {
            const stepNum = idx + 1;
            const isCompleted = currentStep > stepNum;
            const isCurrent = currentStep === stepNum;

            return (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{
                  height: '4px',
                  borderRadius: '2px',
                  backgroundColor: isCompleted ? 'var(--emerald-primary)' : isCurrent ? 'var(--cyan-primary)' : 'rgba(255, 255, 255, 0.1)',
                  marginBottom: '6px',
                  transition: 'background-color 0.3s ease'
                }} />
                <div style={{
                  fontSize: '11px',
                  fontWeight: isCurrent ? 800 : 600,
                  color: isCurrent ? 'var(--cyan-primary)' : isCompleted ? 'var(--emerald-primary)' : 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          STEP 1: WELCOME & GOAL TYPE
          ======================================================== */}
      {currentStep === 1 && (
        <div className="card" style={{ padding: '32px', border: '1px solid var(--border-subtle)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 32px auto' }}>
            <span className="hero-pill-badge" style={{ fontSize: '11px', marginBottom: '12px' }}>
              STEP 1: DEFINE PURPOSE
            </span>
            <h3 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 10px 0' }}>
              Welcome to LearnCraft
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Don't just study. <strong>Understand.</strong> What would you like to achieve?
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', maxWidth: '820px', margin: '0 auto 32px auto', width: '100%' }}>
            {[
              { id: 'exam', title: '🎓 Prepare for an Exam', desc: 'CBSE, State Board, JEE/NEET, College Finals', badge: 'Recommended' },
              { id: 'grades', title: '📈 Improve My Grades', desc: 'Target weak subjects and repair conceptual gaps' },
              { id: 'skill', title: '💻 Learn a New Skill', desc: 'Data Science, Python, Calculus from scratch' },
              { id: 'project', title: '🚀 Build a STEM Project', desc: 'Electronics, Circuit Lab, Physics Simulation' },
              { id: 'master', title: '🧠 Master a Subject', desc: 'Deep first-principles conceptual mastery' },
              { id: 'custom', title: '🎯 Custom Goal', desc: 'Tailor pace, syllabus, and specific chapters' }
            ].map(g => (
              <div
                key={g.id}
                onClick={() => {
                  setGoalType(g.id);
                  audioEngine.playChime(600, 0.1);
                }}
                style={{
                  padding: '18px',
                  borderRadius: 'var(--radius-md)',
                  border: goalType === g.id ? '2px solid var(--cyan-primary)' : '1px solid var(--border-subtle)',
                  backgroundColor: goalType === g.id ? 'rgba(0, 229, 255, 0.08)' : 'rgba(15, 23, 42, 0.6)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                {g.badge && (
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    fontSize: '10px',
                    fontWeight: 800,
                    color: 'var(--cyan-primary)',
                    backgroundColor: 'rgba(0, 229, 255, 0.15)',
                    padding: '2px 8px',
                    borderRadius: '999px'
                  }}>
                    {g.badge}
                  </span>
                )}
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                  {g.title}
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                  {g.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleNextStep}
              className="btn btn-primary"
              style={{ padding: '14px 36px', fontSize: '15px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Continue to Goal Configuration</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 2: GOAL CONFIGURATION & HORIZON
          ======================================================== */}
      {currentStep === 2 && (
        <div className="card" style={{ padding: '32px', border: '1px solid var(--border-subtle)', flex: 1 }}>
          <div style={{ maxWidth: '640px', margin: '0 auto 24px auto', textAlign: 'center' }}>
            <span className="hero-pill-badge" style={{ fontSize: '11px', marginBottom: '10px' }}>
              STEP 2: GOAL PARAMETERS
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
              Configure Target Horizon
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
              LearnCraft reverse-engineers your daily syllabus based on your available time and score target:
            </p>
          </div>

          <div style={{ maxWidth: '580px', margin: '0 auto 32px auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            <div>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Primary Subject / Domain
              </label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: 'rgba(2, 6, 23, 0.7)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '14px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Target Examination Name
              </label>
              <input
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: 'rgba(2, 6, 23, 0.7)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '14px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  Target Score: <strong style={{ color: 'var(--cyan-primary)' }}>{targetScore}%</strong>
                </label>
                <input
                  type="range"
                  min={60}
                  max={99}
                  value={targetScore}
                  onChange={(e) => setTargetScore(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--cyan-primary)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  Days Remaining: <strong style={{ color: 'var(--amber-primary)' }}>{daysRemaining} Days</strong>
                </label>
                <input
                  type="range"
                  min={7}
                  max={90}
                  value={daysRemaining}
                  onChange={(e) => setDaysRemaining(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--amber-primary)' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Daily Available Study Time: <strong style={{ color: 'var(--emerald-primary)' }}>{dailyMins} min/day</strong>
              </label>
              <input
                type="range"
                min={15}
                max={120}
                step={5}
                value={dailyMins}
                onChange={(e) => setDailyMins(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--emerald-primary)' }}
              />
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '580px', margin: '0 auto' }}>
            <button onClick={handlePrevStep} className="btn btn-outline" style={{ padding: '12px 24px' }}>
              Back
            </button>
            <button onClick={handleNextStep} className="btn btn-primary" style={{ padding: '12px 28px' }}>
              Save & Ingest Syllabus
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 3: SYLLABUS & MATERIAL INGESTION
          ======================================================== */}
      {currentStep === 3 && (
        <div className="card" style={{ padding: '32px', border: '1px solid var(--border-subtle)', flex: 1 }}>
          <div style={{ maxWidth: '640px', margin: '0 auto 24px auto', textAlign: 'center' }}>
            <span className="hero-pill-badge" style={{ fontSize: '11px', marginBottom: '10px' }}>
              STEP 3: CONTENT COLLECTION & SYLLABUS OCR
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
              AI Content Understanding Pipeline
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
              LearnCraft reads your textbooks, syllabus PDFs, and previous-year exam papers to build your internal knowledge graph:
            </p>
          </div>

          <div style={{ maxWidth: '640px', margin: '0 auto 28px auto' }}>
            
            {/* Uploaded Documents List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {selectedMaterials.map((doc, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(15, 23, 42, 0.7)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={16} color="var(--cyan-primary)" />
                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>{doc}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--emerald-primary)', fontWeight: 800 }}>✓ Attached</span>
                </div>
              ))}
            </div>

            {/* Ingestion & Processing Status */}
            {!contentProcessed ? (
              <button
                onClick={handleProcessMaterials}
                disabled={isProcessingContent}
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '14px', fontWeight: 800, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
              >
                {isProcessingContent ? (
                  <>
                    <RefreshCw size={16} className="spinning" />
                    <span>Extracting Topic DAG & Concept Weightage...</span>
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    <span>Process Materials & Generate Concept Graph</span>
                  </>
                )}
              </button>
            ) : (
              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid var(--emerald-primary)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
                fontSize: '13px',
                color: 'var(--text-primary)'
              }}>
                <div style={{ fontWeight: 800, color: 'var(--emerald-primary)', marginBottom: '4px' }}>
                  ✓ Syllabus Extraction Complete (14 Units • 48 Concept Nodes Detected)
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Topics detected: Kinematics (28%), Electromagnetism (34%), Optics (22%), Thermodynamics (16%).
                </div>
              </div>
            )}

          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '640px', margin: '0 auto' }}>
            <button onClick={handlePrevStep} className="btn btn-outline" style={{ padding: '12px 24px' }}>
              Back
            </button>
            <button
              onClick={handleNextStep}
              disabled={!contentProcessed}
              className="btn btn-primary"
              style={{ padding: '12px 28px' }}
            >
              Start Diagnostic Assessment
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 4: LIVE DIAGNOSTIC ASSESSMENT
          ======================================================== */}
      {currentStep === 4 && (
        <div className="card" style={{ padding: '32px', border: '1px solid var(--border-subtle)', flex: 1 }}>
          <div style={{ maxWidth: '680px', margin: '0 auto 20px auto', textAlign: 'center' }}>
            <span className="hero-pill-badge" style={{ fontSize: '11px', marginBottom: '10px' }}>
              STEP 4: DIAGNOSTIC PROBING
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
              Let's Discover What You Already Know
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
              Answer these 3 syllabus questions. Be honest — this establishes your baseline knowledge map:
            </p>
          </div>

          <div style={{ maxWidth: '680px', margin: '0 auto 28px auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {diagnosticQuestions.map((q) => (
              <div
                key={q.id}
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)', marginBottom: '8px' }}>
                  <span>QUESTION {q.id} • {q.topic.toUpperCase()}</span>
                  <span style={{ color: q.difficulty === 'Hard' ? '#f43f5e' : q.difficulty === 'Medium' ? 'var(--amber-primary)' : 'var(--emerald-primary)' }}>
                    {q.difficulty}
                  </span>
                </div>

                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                  {q.question}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                  {q.options.map((opt, oIdx) => {
                    const isSelected = diagnosticAnswers[q.id] === oIdx;
                    return (
                      <div
                        key={oIdx}
                        onClick={() => {
                          setDiagnosticAnswers(prev => ({ ...prev, [q.id]: oIdx }));
                          audioEngine.playChime(500 + oIdx * 40, 0.1);
                        }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-sm)',
                          border: isSelected ? '2px solid var(--cyan-primary)' : '1px solid var(--border-subtle)',
                          backgroundColor: isSelected ? 'rgba(0, 229, 255, 0.12)' : 'rgba(2, 6, 23, 0.6)',
                          cursor: 'pointer',
                          fontSize: '13px',
                          color: 'var(--text-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          border: '2px solid var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          fontWeight: 800
                        }}>
                          {String.fromCharCode(65 + oIdx)}
                        </div>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Confidence Check */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <span>Confidence:</span>
                  {[
                    { val: 1, label: '😕 Guessing' },
                    { val: 2, label: '😐 Unsure' },
                    { val: 3, label: '🙂 Confident' },
                    { val: 4, label: '🔥 Very Confident' }
                  ].map(c => (
                    <button
                      key={c.val}
                      onClick={() => setDiagnosticConfidences(prev => ({ ...prev, [q.id]: c.val }))}
                      className={`btn ${diagnosticConfidences[q.id] === c.val ? 'btn-primary' : 'btn-outline'}`}
                      style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '999px' }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '680px', margin: '0 auto' }}>
            <button onClick={handlePrevStep} className="btn btn-outline" style={{ padding: '12px 24px' }}>
              Back
            </button>
            <button
              onClick={() => {
                setIsDiagnosticSubmitted(true);
                handleNextStep();
              }}
              disabled={Object.keys(diagnosticAnswers).length < 3}
              className="btn btn-primary"
              style={{ padding: '12px 28px' }}
            >
              Analyze & Generate Knowledge Map
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 5: DYNAMIC KNOWLEDGE MAP & PREREQUISITE DETECTIVE
          ======================================================== */}
      {currentStep === 5 && (
        <div className="card" style={{ padding: '32px', border: '1px solid var(--border-subtle)', flex: 1 }}>
          <div style={{ maxWidth: '680px', margin: '0 auto 20px auto', textAlign: 'center' }}>
            <span className="hero-pill-badge" style={{ fontSize: '11px', marginBottom: '10px' }}>
              STEP 5: KNOWLEDGE MAP GENERATED
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
              Your Diagnostic Knowledge Topology
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
              LearnCraft identified strong foundations in Mechanics, but flagged critical prerequisite gaps in Electricity:
            </p>
          </div>

          <div style={{ maxWidth: '680px', margin: '0 auto 28px auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Prerequisite Alert Banner */}
            <div style={{
              backgroundColor: 'rgba(244, 63, 94, 0.08)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <ShieldAlert size={20} color="#f43f5e" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                <strong style={{ color: '#f43f5e' }}>Prerequisite Detective Alert: </strong>
                Capacitance requires Electric Potential, which requires Electric Field. You scored low on Electric Field. LearnCraft will <strong>repair Electric Field first</strong> before advancing.
              </div>
            </div>

            {/* Knowledge Map Matrix */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              
              {/* Mechanics Unit */}
              <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--emerald-primary)', marginBottom: '10px' }}>
                  UNIT 1: MECHANICS (82% Mastery)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Kinematics & Motion</span>
                    <strong style={{ color: 'var(--emerald-primary)' }}>🟢 88% Mastered</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Newton's Laws & Friction</span>
                    <strong style={{ color: 'var(--emerald-primary)' }}>🟢 84% Mastered</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Work, Power & Energy</span>
                    <strong style={{ color: 'var(--amber-primary)' }}>🟡 68% Developing</strong>
                  </div>
                </div>
              </div>

              {/* Electricity Unit */}
              <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#f43f5e', marginBottom: '10px' }}>
                  UNIT 2: ELECTRICITY (41% Mastery)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Electric Charge</span>
                    <strong style={{ color: 'var(--emerald-primary)' }}>🟢 90% Mastered</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Electric Field (Prerequisite Gap)</span>
                    <strong style={{ color: 'var(--amber-primary)' }}>🟡 52% Weak</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Electric Potential</span>
                    <strong style={{ color: '#f43f5e' }}>🔴 38% Gap Detected</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Capacitance & Dielectrics</span>
                    <strong style={{ color: 'var(--text-muted)' }}>🔒 Locked (Needs Field)</strong>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '680px', margin: '0 auto' }}>
            <button onClick={handlePrevStep} className="btn btn-outline" style={{ padding: '12px 24px' }}>
              Back
            </button>
            <button onClick={handleNextStep} className="btn btn-primary" style={{ padding: '12px 28px' }}>
              Build 22-Day Roadmap & Daily Mission
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 6: PERSONALIZED ROADMAP & TODAY'S 35-MIN MISSION
          ======================================================== */}
      {currentStep === 6 && (
        <div className="card" style={{ padding: '32px', border: '1px solid var(--border-subtle)', flex: 1 }}>
          <div style={{ maxWidth: '680px', margin: '0 auto 20px auto', textAlign: 'center' }}>
            <span className="hero-pill-badge" style={{ fontSize: '11px', marginBottom: '10px' }}>
              STEP 6: PERSONALIZED ROADMAP READY
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
              Your 22-Day Adaptive Plan is Live
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
              Because you excelled in Mechanics, LearnCraft reallocated time toward Electricity repair.
            </p>
          </div>

          {/* Today's Mission Action Box */}
          <div style={{
            maxWidth: '640px',
            margin: '0 auto 28px auto',
            backgroundColor: 'rgba(2, 6, 23, 0.8)',
            border: '2px solid var(--cyan-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            boxShadow: '0 0 30px rgba(0, 229, 255, 0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="var(--cyan-primary)" />
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  TODAY'S MISSION ({dailyMins} MINUTES)
                </h4>
              </div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--amber-primary)', fontWeight: 800 }}>
                Day 1 of 22
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {[
                { phase: '01 — Recall', time: '5 min', detail: 'Retrieve 3 electrostatic Gauss equations' },
                { phase: '02 — Learn', time: '10 min', detail: 'TransLangua Concept Bridge on Electric Potential' },
                { phase: '03 — Practice', time: '10 min', detail: 'Adaptive Socratic practice + progressive hints' },
                { phase: '04 — Application', time: '5 min', detail: 'Virtual Experiment Lab simulation' },
                { phase: '05 — Review Mistakes', time: '5 min', detail: 'Root-Cause analysis in Mistake Notebook' }
              ].map((step, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', padding: '6px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <strong style={{ color: 'var(--cyan-primary)' }}>{step.phase}:</strong>
                    <span style={{ color: 'var(--text-primary)' }}>{step.detail}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{step.time}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleFinalLaunch}
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '15px', fontWeight: 800, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
            >
              <Play size={16} fill="currentColor" />
              <span>START TODAY'S MISSION</span>
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={handlePrevStep} className="btn btn-outline" style={{ padding: '10px 24px', fontSize: '12px' }}>
              Back to Knowledge Map
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
