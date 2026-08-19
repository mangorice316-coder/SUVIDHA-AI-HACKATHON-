import React, { useState } from 'react';
import { learningEngine } from '../../services/learningEngine';
import { MistakeRecord } from '../../types/learning';
import { audioEngine } from '../../services/audioEngine';
import { BookX, CheckCircle, HelpCircle, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export const MistakeNotebookView: React.FC = () => {
  const [mistakes, setMistakes] = useState<MistakeRecord[]>(learningEngine.getMistakes());
  const [selectedMistake, setSelectedMistake] = useState<MistakeRecord | null>(mistakes[0] || null);

  const handleResolve = (id: string) => {
    learningEngine.resolveMistake(id);
    setMistakes([...learningEngine.getMistakes()]);
    audioEngine.playChime(780, 0.25);
    audioEngine.speakAnnouncement("Mistake resolved! Earned 35 XP.");
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          fontWeight: 800,
          fontFamily: 'var(--font-mono)',
          color: '#f43f5e',
          textTransform: 'uppercase',
          marginBottom: '6px'
        }}>
          <BookX size={14} />
          <span>Active Misconception Diagnostics</span>
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
          My Mistake Notebook & "Why Am I Wrong?" Analyzer
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
          Every incorrect quiz answer automatically enters your personalized notebook with AI root-cause analysis.
        </p>
      </div>

      {/* Grid Layout: Left List, Right Detailed Analysis */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 360px) 1fr', gap: '24px' }}>
        
        {/* Left List of Mistakes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {mistakes.map(m => {
            const isSelected = selectedMistake?.id === m.id;
            return (
              <div
                key={m.id}
                onClick={() => {
                  setSelectedMistake(m);
                  audioEngine.playChime(550, 0.1);
                }}
                className="card"
                style={{
                  cursor: 'pointer',
                  padding: '16px',
                  border: isSelected ? '2px solid var(--cyan-primary)' : '1px solid var(--border-subtle)',
                  backgroundColor: isSelected ? 'rgba(0, 229, 255, 0.05)' : 'var(--surface-card)',
                  opacity: m.resolved ? 0.7 : 1,
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {m.subject} • {m.timestamp}
                  </span>
                  {m.resolved ? (
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--emerald-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle size={12} /> Resolved
                    </span>
                  ) : (
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#f43f5e', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <AlertCircle size={12} /> Needs Review
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                  {m.conceptTitle}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detailed "Why Am I Wrong?" Deep Dive */}
        {selectedMistake ? (
          <div className="card" style={{ padding: '28px', border: '1px solid var(--border-subtle)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)' }}>
                  {selectedMistake.subject}
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 0 0' }}>
                  {selectedMistake.conceptTitle}
                </h3>
              </div>
              {!selectedMistake.resolved && (
                <button
                  onClick={() => handleResolve(selectedMistake.id)}
                  className="btn btn-primary"
                  style={{ fontSize: '13px', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <CheckCircle size={14} />
                  <span>Mark Resolved (+35 XP)</span>
                </button>
              )}
            </div>

            {/* Question */}
            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              padding: '16px 18px',
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--cyan-primary)',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)', marginBottom: '4px' }}>
                EXAM QUESTION
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {selectedMistake.question}
              </div>
            </div>

            {/* Answers Comparison */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                backgroundColor: 'rgba(244, 63, 94, 0.08)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#f43f5e', marginBottom: '4px' }}>
                  ❌ YOUR PAST ATTEMPT
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                  {selectedMistake.studentAnswer}
                </div>
              </div>

              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--emerald-primary)', marginBottom: '4px' }}>
                  ✅ RIGOROUS EXAM ANSWER
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                  {selectedMistake.correctAnswer}
                </div>
              </div>
            </div>

            {/* Neuro-Symbolic "Why Am I Wrong?" Root Misconception */}
            <div style={{
              backgroundColor: 'rgba(168, 85, 247, 0.08)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '18px 20px',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 800,
                color: 'var(--purple-primary)',
                marginBottom: '6px'
              }}>
                <Sparkles size={14} />
                <span>"Why Am I Wrong?" AI Cognitive Diagnostic</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                {selectedMistake.rootMisconception}
              </p>
            </div>

            {/* Governing Scientific Law */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: 'rgba(0, 229, 255, 0.05)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(0, 229, 255, 0.2)'
            }}>
              <HelpCircle size={16} color="var(--cyan-primary)" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Scientific Law: </strong>
                {selectedMistake.conceptRule}
              </div>
            </div>

          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
            No mistake selected.
          </div>
        )}

      </div>

    </div>
  );
};
