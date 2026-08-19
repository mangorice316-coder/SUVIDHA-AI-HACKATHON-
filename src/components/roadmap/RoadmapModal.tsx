import React, { useState } from 'react';
import {
  Brain, Layers, Zap, Target, CheckCircle2, ArrowRight, ShieldCheck,
  X, Play, Compass, Sparkles, Activity, Award, Flame, Cpu, FileText
} from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoadmapModal: React.FC<RoadmapModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'loop' | 'phases' | 'demo' | 'engines'>('loop');
  const [selectedLoopStep, setSelectedLoopStep] = useState<number>(0);

  if (!isOpen) return null;

  const coreLoopSteps = [
    {
      step: 1,
      title: "Set Goal & Horizon",
      desc: "Student inputs exam target (e.g. 92% in 24 days) and daily available minutes (e.g. 25m/day).",
      icon: "🎯",
      engine: "Goal Reverse Engineer"
    },
    {
      step: 2,
      title: "Diagnostic Assessment",
      desc: "10 targeted micro-questions probe boundary intuition without overwhelming the learner.",
      icon: "🩺",
      engine: "Diagnostic Engine"
    },
    {
      step: 3,
      title: "Knowledge Map & Prerequisite DAG",
      desc: "Builds a living dependency graph across Physics/Chem/Bio/Math and flags upstream gaps.",
      icon: "🗺️",
      engine: "Prerequisite Detective"
    },
    {
      step: 4,
      title: "Dynamic Daily Mission",
      desc: "Optimizes learning yield per minute (e.g., 'I Only Have 15 Minutes' high-impact sprint).",
      icon: "⚡",
      engine: "Session Optimizer"
    },
    {
      step: 5,
      title: "Multi-Perspective Learning",
      desc: "TransLangua mother-tongue bridge + 3D spatial lab + 'Explain It 3 Ways' (ELI10, Rigor, Analogy).",
      icon: "📖",
      engine: "Cognitive Synthesizer"
    },
    {
      step: 6,
      title: "Adaptive Socratic Practice",
      desc: "AI Tutor adapts question difficulty dynamically and provides progressive scaffolding hints.",
      icon: "🤖",
      engine: "Socratic AI Tutor"
    },
    {
      step: 7,
      title: "Root-Cause Mistake Taxonomy",
      desc: "Analyzes 'Why Am I Wrong?' (Concept gap vs calculation vs formula vs misreading).",
      icon: "📓",
      engine: "Mistake Intelligence"
    },
    {
      step: 8,
      title: "Feynman 'Teach It Back' Studio",
      desc: "Student explains the theorem aloud or in text. AI scores Accuracy, Clarity, and Depth.",
      icon: "🎤",
      engine: "Feynman Evaluator"
    },
    {
      step: 9,
      title: "Smart Spaced Revision",
      desc: "Predicts forgetting curves and schedules micro-recall before memory decay occurs.",
      icon: "🧠",
      engine: "Retention Engine"
    },
    {
      step: 10,
      title: "Next Best Action Generator",
      desc: "Eliminates decision fatigue: evaluates current state and immediately prompts the next highest-ROI action.",
      icon: "🚀",
      engine: "Recommendation Engine"
    }
  ];

  const architecturalPhases = [
    {
      phase: 1,
      name: "Platform Foundation",
      status: "🟢 Live & Deployed",
      features: ["React 18 + TypeScript + Vite 6", "Local State Engine Persistence", "Dark-Tech Neon Design System", "Web Audio Synthesizer"]
    },
    {
      phase: 2,
      name: "Learning Intelligence Core",
      status: "🟢 Live & Deployed",
      features: ["Interactive Knowledge DAG", "Prerequisite Detective Engine", "AI Learning DNA (5-Axis Tensor)", "Root-Cause Mistake Taxonomy"]
    },
    {
      phase: 3,
      name: "AI Cognitive Engines",
      status: "🟢 Live & Deployed",
      features: ["24/7 Socratic AI Tutor", "6 Dynamic Teacher Personas", "'Explain It Three Ways' Studio", "Bilingual Mother-Tongue Code-Switching"]
    },
    {
      phase: 4,
      name: "Retention & Comprehension",
      status: "🟢 Live & Deployed",
      features: ["Smart Spaced Revision Deck", "'Teach It Back' Feynman Studio", "Personalized Mistake Notebook", "Confidence-Accuracy Calibration"]
    },
    {
      phase: 5,
      name: "Exam & Syllabus Intelligence",
      status: "🟢 Live & Deployed",
      features: ["Goal Reverse Engineer Roadmap", "Exam Readiness Simulator", "Academic Proof Assembler", "Exam Register Scoring Rubrics"]
    },
    {
      phase: 6,
      name: "3D Spatial & Sensory Labs",
      status: "🟢 Live & Deployed",
      features: ["60 FPS WebGL Quantum 3D Canvas", "Upright Fluid Sloshing Chemistry Flask", "Living DNA Sinuous Wave", "Connected Optics Prism & Rainbow Fan"]
    },
    {
      phase: 7,
      name: "Gamification & Motivation",
      status: "🟢 Live & Deployed",
      features: ["Daily Mission Modal", "Streak Flame Counter", "XP & Level 3 Polymath Progression", "Real-Time Audio Sonic Chimes"]
    }
  ];

  const demoScriptSteps = [
    { num: 1, action: "Landing 3D Canvas", detail: "Show 60 FPS Three.js quantum orb reacting to mouse, upright chemistry flask, and connected prism." },
    { num: 2, action: "Set Exam Goal", detail: "Enter target: 'Class 12 Physics & Chemistry • Target 92% in 24 Days'." },
    { num: 3, action: "AI Learning DNA", detail: "Show 5-axis cognitive fingerprint (Retention 82%, Recall 91%, Hidden Weakness detected)." },
    { num: 4, action: "Prerequisite Detective", detail: "Show Skill Tree DAG identifying 'Magnetic Flux' as the root gap blocking Modern Physics." },
    { num: 5, action: "'I Only Have 15 Minutes'", detail: "Click 15 Min button -> AI dynamically plans the 4-phase micro-sprint." },
    { num: 6, action: "Concept Bridge", detail: "Display Dual-Layer TransLangua card with Tamil/Hindi/Telugu cultural analogy + LaTeX." },
    { num: 7, action: "'Explain 3 Ways'", detail: "Switch in 1-click between ELI10 (everyday grass metaphor) and formal exam rigor." },
    { num: 8, action: "Virtual Experiment Lab", detail: "Make hypothesis prediction -> slide resistance slider -> watch live current meter respond." },
    { num: 9, action: "Socratic AI Tutor", detail: "Switch persona to 'The Socratic Guide' 🧘 -> AI responds with guiding questions without spoiling answers." },
    { num: 10, action: "Exam Proof Assembler", detail: "Assemble derivation steps -> AI Academic Register Scorer awards 85/100." },
    { num: 11, action: "'Teach It Back' Feynman", detail: "Student speaks/types explanation -> AI scores Accuracy (91%) and flags missing boundary terms." },
    { num: 12, action: "The Winning Punchline", detail: "'LearnCraft doesn't give every student the same course. It builds the course around the student.'" }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(2, 6, 23, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px'
    }}>
      
      <div className="card" style={{
        width: '100%',
        maxWidth: '960px',
        height: '88vh',
        maxHeight: '780px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
        overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'rgba(15, 23, 42, 0.9)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 229, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cyan-primary)'
            }}>
              <Compass size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
                LearnCraft Master System Blueprint & Roadmap
              </h2>
              <div style={{ fontSize: '12px', color: 'var(--cyan-primary)', fontFamily: 'var(--font-mono)' }}>
                The AI Learning Operating System • Hackathon Architectural Blueprint
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Tab Selector Ribbon */}
        <div style={{
          padding: '10px 24px',
          backgroundColor: 'rgba(2, 6, 23, 0.7)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
          {[
            { id: 'loop', label: '🔄 1. The Core Learning Loop' },
            { id: 'phases', label: '🏗️ 2. The 7 Architectural Layers' },
            { id: 'demo', label: '🎬 3. The 12-Step Winning Demo Flow' },
            { id: 'engines', label: '⚙️ 4. AI Engine Specifications' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                audioEngine.playChime(600, 0.1);
              }}
              className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '12px', padding: '6px 14px', borderRadius: '999px' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Core Learning Loop Explorer */}
        {activeTab === 'loop' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                The 10-Stage Closed-Loop Feedback Cycle
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                LearnCraft never treats learning as passive video consumption. Every action feeds the next optimization step:
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {coreLoopSteps.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedLoopStep(idx);
                    audioEngine.playChime(550 + idx * 30, 0.1);
                  }}
                  className="card"
                  style={{
                    padding: '14px',
                    border: selectedLoopStep === idx ? '2px solid var(--cyan-primary)' : '1px solid var(--border-subtle)',
                    backgroundColor: selectedLoopStep === idx ? 'rgba(0, 229, 255, 0.08)' : 'rgba(15, 23, 42, 0.6)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '18px' }}>{step.icon}</span>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {step.step}. {step.title}
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 8px 0', lineHeight: 1.4 }}>
                    {step.desc}
                  </p>
                  <div style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)', fontWeight: 700 }}>
                    Powered by: {step.engine}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: The 7 Architectural Layers */}
        {activeTab === 'phases' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                The 7-Layer Architecture Stack
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                Every layer is fully implemented, verified, and active in the live application:
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {architecturalPhases.map((phase, idx) => (
                <div
                  key={idx}
                  className="card"
                  style={{
                    padding: '16px 20px',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'rgba(15, 23, 42, 0.7)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 229, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 800,
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--cyan-primary)'
                      }}>
                        L{phase.phase}
                      </div>
                      <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                        Layer {phase.phase}: {phase.name}
                      </h4>
                    </div>

                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--emerald-primary)', backgroundColor: 'rgba(16, 185, 129, 0.12)', padding: '3px 10px', borderRadius: '999px' }}>
                      {phase.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                    {phase.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        style={{
                          fontSize: '11.5px',
                          backgroundColor: 'rgba(2, 6, 23, 0.8)',
                          border: '1px solid var(--border-subtle)',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: The 12-Step Judge-Winning Demo Flow */}
        {activeTab === 'demo' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                The 12-Step Judge-Winning Demo Script
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                Follow this sequential storyline to showcase the AI Learning OS in 3 minutes flat:
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {demoScriptSteps.map((d, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: idx === 11 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(0, 229, 255, 0.15)',
                    color: idx === 11 ? 'var(--amber-primary)' : 'var(--cyan-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    flexShrink: 0
                  }}>
                    {d.num}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: idx === 11 ? 'var(--amber-primary)' : 'var(--text-primary)' }}>
                      {d.action}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {d.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: AI Engine Specifications */}
        {activeTab === 'engines' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
              
              <div className="card" style={{ padding: '18px', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--cyan-primary)', margin: '0 0 8px 0' }}>
                  1. Learner DNA & Cognitive Fingerprint
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  Tracks Retention, Recall Speed, Problem-Solving Agility, Application Score, and Study Consistency as a living tensor. Automatically flags hidden weaknesses.
                </p>
              </div>

              <div className="card" style={{ padding: '18px', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--emerald-primary)', margin: '0 0 8px 0' }}>
                  2. Prerequisite Detective (DAG)
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  Detects upstream conceptual blockers across Calculus, Mechanics, Electromagnetism, and Chemistry, providing 1-click remediation bridges.
                </p>
              </div>

              <div className="card" style={{ padding: '18px', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--purple-primary)', margin: '0 0 8px 0' }}>
                  3. Root-Cause Mistake Taxonomy
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  Categorizes errors into Concept Gaps, Formula/Sign Confusion, Calculation Slips, Misread Questions, and False Confidence Guessing.
                </p>
              </div>

              <div className="card" style={{ padding: '18px', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--amber-primary)', margin: '0 0 8px 0' }}>
                  4. Multi-Perspective Synthesizer
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  Generates 4 synchronous perspectives: 🐣 Simple ELI10, 🔬 Exam Rigor, 🌍 Cultural Analogy, and 📐 First-Principles Proof.
                </p>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
