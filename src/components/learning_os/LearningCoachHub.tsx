import React, { useState } from 'react';
import { learningOS } from '../../services/learningOS';
import { QuickImpactSession, LearningDNA, GoalReversePlan, MistakeTaxonomy } from '../../types/learningOS';
import { audioEngine } from '../../services/audioEngine';
import {
  Brain, Clock, Target, ShieldAlert, Sparkles, Zap, Flame,
  ArrowRight, CheckCircle2, TrendingUp, HelpCircle, Activity, Play
} from 'lucide-react';

interface LearningCoachHubProps {
  onStartSessionAction?: (actionType: string) => void;
}

export const LearningCoachHub: React.FC<LearningCoachHubProps> = ({ onStartSessionAction }) => {
  const [selectedMinutes, setSelectedMinutes] = useState<number>(15);
  const quickSession: QuickImpactSession = learningOS.generateQuickImpactSession(selectedMinutes);
  const dna: LearningDNA = learningOS.getLearningDNA();
  const goal: GoalReversePlan = learningOS.getGoalPlan();
  const mistakeTaxonomy: MistakeTaxonomy = learningOS.getMistakeTaxonomy();

  const handleSelectMinutes = (mins: number) => {
    setSelectedMinutes(mins);
    audioEngine.playChime(600 + mins * 5, 0.15);
    audioEngine.speakAnnouncement(`Generated ${mins}-minute high impact learning plan.`);
  };

  const handleLaunchSession = () => {
    audioEngine.playChime(780, 0.25);
    audioEngine.speakAnnouncement("Starting 15-minute high impact study sprint.");
    if (onStartSessionAction) {
      onStartSessionAction(quickSession.breakdown[0].actionType);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* 1. Executive Daily AI Briefing Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.85))',
        border: '1px solid rgba(0, 229, 255, 0.3)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px 28px',
        marginBottom: '32px',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ maxWidth: '720px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            color: 'var(--cyan-primary)',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            <Brain size={14} />
            <span>LearnCraft AI Learning Operating System</span>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 8px 0', lineHeight: 1.3 }}>
            Good afternoon, Scholar. You have <span style={{ color: 'var(--amber-primary)' }}>{goal.examDaysRemaining} days</span> until your {goal.targetSubject} Exam.
          </h2>

          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
            Your current predicted exam readiness is <strong style={{ color: 'var(--emerald-primary)' }}>{goal.predictedReadiness}%</strong> (Target: {goal.targetScore}%). Your highest predicted risk topic is <strong style={{ color: '#f43f5e' }}>{goal.highestRiskTopic}</strong>.
          </p>
        </div>

        {/* Readiness Meter Card */}
        <div className="card" style={{
          padding: '16px 20px',
          backgroundColor: 'rgba(2, 6, 23, 0.7)',
          border: '1px solid var(--border-subtle)',
          textAlign: 'center',
          minWidth: '160px'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--emerald-primary)' }}>
            {goal.predictedReadiness}%
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Exam Readiness
          </div>
          <div style={{ fontSize: '11px', color: 'var(--amber-primary)', marginTop: '4px', fontWeight: 700 }}>
            Target: {goal.targetScore}%
          </div>
        </div>
      </div>

      {/* Grid: Left Column = "15-Min Optimizer", Right Column = "Learning DNA" */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '28px', marginBottom: '32px' }}>
        
        {/* ========================================================
            2. "I ONLY HAVE X MINUTES" HIGH-IMPACT OPTIMIZER
            ======================================================== */}
        <div className="card" style={{ padding: '24px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="var(--cyan-primary)" />
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                "I Only Have {selectedMinutes} Minutes" Mode
              </h3>
            </div>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              Micro-Session Optimizer
            </span>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '18px' }}>
            Short on time? Select how many minutes you have. LearnCraft dynamically plans the highest ROI learning activities:
          </p>

          {/* Time Picker Pills */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {[10, 15, 25, 45].map(mins => (
              <button
                key={mins}
                onClick={() => handleSelectMinutes(mins)}
                className={`btn ${selectedMinutes === mins ? 'btn-primary' : 'btn-outline'}`}
                style={{ fontSize: '12px', padding: '6px 14px', borderRadius: '999px' }}
              >
                ⚡ {mins} Min {mins === 15 && '(Recommended)'}
              </button>
            ))}
          </div>

          {/* Timed Step-by-Step Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px' }}>
            {quickSession.breakdown.map((step, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 229, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--cyan-primary)',
                    flexShrink: 0
                  }}>
                    {step.minutes}m
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {step.phase}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                      {step.activity}
                    </div>
                  </div>
                </div>

                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Phase {idx + 1}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleLaunchSession}
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '14px', fontWeight: 800, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
          >
            <Play size={16} fill="currentColor" />
            <span>Launch {selectedMinutes}-Min High-Impact Session</span>
          </button>
        </div>

        {/* ========================================================
            3. AI LEARNING DNA & COGNITIVE FINGERPRINT
            ======================================================== */}
        <div className="card" style={{ padding: '24px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="var(--purple-primary)" />
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Your AI Learning DNA
              </h3>
            </div>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--emerald-primary)' }}>
              Overall Efficiency: {dna.overallEfficiency}/100
            </span>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Continuously learns how <em>you</em> learn best to calibrate pace, difficulty, and memory retention:
          </p>

          {/* DNA Metrics Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            {[
              { label: 'Concept Retention', value: dna.conceptRetention, color: 'var(--cyan-primary)' },
              { label: 'Active Recall Speed', value: dna.recallSpeed, color: 'var(--emerald-primary)' },
              { label: 'Problem Solving Agility', value: dna.problemSolving, color: 'var(--purple-primary)' },
              { label: 'Application & Synthesis', value: dna.applicationScore, color: 'var(--amber-primary)' },
              { label: 'Daily Study Consistency', value: dna.consistencyRate, color: '#f43f5e' }
            ].map((metric, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-primary)' }}>{metric.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: metric.color }}>{metric.value}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${metric.value}%`, height: '100%', backgroundColor: metric.color, borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Superpower & Hidden Weakness Diagnostic */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px'
            }}>
              <strong style={{ color: 'var(--emerald-primary)' }}>⚡ Superpower: </strong>
              <span style={{ color: 'var(--text-primary)' }}>{dna.strongestSkill}</span>
            </div>

            <div style={{
              backgroundColor: 'rgba(244, 63, 94, 0.08)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px'
            }}>
              <strong style={{ color: '#f43f5e' }}>🔍 Hidden Weakness: </strong>
              <span style={{ color: 'var(--text-primary)' }}>{dna.hiddenWeakness}</span>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================
          4. ROOT-CAUSE MISTAKE TAXONOMY & GOAL ROADMAP
          ======================================================== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '28px' }}>
        
        {/* Root-Cause Mistake Breakdown */}
        <div className="card" style={{ padding: '24px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <ShieldAlert size={18} color="#f43f5e" />
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Root-Cause Mistake Taxonomy
            </h3>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '18px' }}>
            Analyzed across your past {mistakeTaxonomy.totalAnalyzed} diagnostic quiz errors to reveal exactly why you lose marks:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {[
              { reason: 'Concept Gaps & Prerequisite Failure', pct: mistakeTaxonomy.conceptGapsPct, color: '#f43f5e' },
              { reason: 'Calculation & Arithmetic Slips', pct: mistakeTaxonomy.calculationErrorsPct, color: 'var(--amber-primary)' },
              { reason: 'Misread Question / Missed Conditions', pct: mistakeTaxonomy.misreadingQuestionsPct, color: 'var(--cyan-primary)' },
              { reason: 'Formula & Sign (+/-) Confusion', pct: mistakeTaxonomy.formulaConfusionPct, color: 'var(--purple-primary)' },
              { reason: 'Guessing / Low Confidence', pct: mistakeTaxonomy.guessingPct, color: 'var(--text-muted)' }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12.5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }} />
                  <span style={{ color: 'var(--text-primary)' }}>{item.reason}</span>
                </div>
                <strong style={{ fontFamily: 'var(--font-mono)', color: item.color }}>{item.pct}%</strong>
              </div>
            ))}
          </div>

          <div style={{
            backgroundColor: 'rgba(0, 229, 255, 0.06)',
            border: '1px solid rgba(0, 229, 255, 0.25)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12px',
            color: 'var(--text-secondary)'
          }}>
            <strong style={{ color: 'var(--cyan-primary)' }}>AI Diagnostic Insight: </strong>
            {mistakeTaxonomy.primaryDiagnosticAdvice}
          </div>
        </div>

        {/* Goal Reverse Engineering Milestones */}
        <div className="card" style={{ padding: '24px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={18} color="var(--emerald-primary)" />
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Goal Reverse Engineer Roadmap
              </h3>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--amber-primary)', fontWeight: 800, backgroundColor: 'rgba(245, 158, 11, 0.15)', padding: '2px 8px', borderRadius: '999px' }}>
              35 min/day
            </span>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '18px' }}>
            Working backwards from your {goal.targetScore}% target score across the remaining {goal.examDaysRemaining} days:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {goal.milestones.map((m, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: m.completed ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {m.completed ? (
                    <CheckCircle2 size={16} color="var(--emerald-primary)" style={{ flexShrink: 0 }} />
                  ) : (
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      border: '2px solid var(--text-muted)',
                      flexShrink: 0
                    }} />
                  )}
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Day {m.day}: {m.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {m.focus}
                    </div>
                  </div>
                </div>

                <span style={{ fontSize: '10px', color: m.completed ? 'var(--emerald-primary)' : 'var(--text-muted)', fontWeight: 800 }}>
                  {m.completed ? 'MASTERED' : 'PENDING'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
