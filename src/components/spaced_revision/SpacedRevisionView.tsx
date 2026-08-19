import React, { useState } from 'react';
import { learningEngine } from '../../services/learningEngine';
import { SpacedRevisionItem } from '../../types/learning';
import { audioEngine } from '../../services/audioEngine';
import { Calendar, CheckCircle2, RotateCw, Eye, EyeOff, Sparkles, Award } from 'lucide-react';

export const SpacedRevisionView: React.FC = () => {
  const [revisionQueue, setRevisionQueue] = useState<SpacedRevisionItem[]>(learningEngine.getRevisions());
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [completedSession, setCompletedSession] = useState<boolean>(false);

  const currentItem = revisionQueue[currentIndex];

  const handleRateConfidence = (rating: 'hard' | 'good' | 'easy') => {
    audioEngine.playChime(rating === 'easy' ? 780 : rating === 'good' ? 620 : 450, 0.2);
    learningEngine.addXp(rating === 'easy' ? 30 : 20);

    if (currentIndex + 1 < revisionQueue.length) {
      setCurrentIndex(currentIndex + 1);
      setIsAnswerRevealed(false);
    } else {
      setCompletedSession(true);
      audioEngine.playChime(850, 0.4);
      audioEngine.speakAnnouncement("Daily spaced revision completed! Great active recall practice.");
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsAnswerRevealed(false);
    setCompletedSession(false);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          fontWeight: 800,
          fontFamily: 'var(--font-mono)',
          color: 'var(--emerald-primary)',
          textTransform: 'uppercase',
          marginBottom: '6px'
        }}>
          <Calendar size={14} />
          <span>Ebbinghaus Forgetting Curve Engine</span>
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
          Smart Spaced Revision & Active Recall
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
          LearnCraft dynamically schedules concepts based on your past confidence and mistake history to guarantee long-term exam retention.
        </p>
      </div>

      {!completedSession && currentItem ? (
        <div className="card" style={{ padding: '32px', border: '1px solid var(--border-subtle)' }}>
          
          {/* Progress & Due Badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              Card {currentIndex + 1} of {revisionQueue.length}
            </span>
            <span style={{
              fontSize: '12px',
              fontWeight: 800,
              color: 'var(--amber-primary)',
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              padding: '3px 10px',
              borderRadius: '999px'
            }}>
              {currentItem.dueDate}
            </span>
          </div>

          {/* Subject & Concept Title */}
          <div style={{ fontSize: '12px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)', marginBottom: '4px' }}>
            {currentItem.subject.toUpperCase()}
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 24px 0' }}>
            {currentItem.conceptTitle}
          </h3>

          {/* Active Recall Prompt Box */}
          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            padding: '24px',
            borderRadius: 'var(--radius-md)',
            borderLeft: '4px solid var(--cyan-primary)',
            marginBottom: '28px'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)', marginBottom: '8px' }}>
              RETRIEVAL PROMPT
            </div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {currentItem.promptQuestion}
            </div>
          </div>

          {/* Reveal Answer Toggle */}
          {!isAnswerRevealed ? (
            <button
              onClick={() => {
                setIsAnswerRevealed(true);
                audioEngine.playChime(600, 0.15);
              }}
              className="btn btn-outline"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '14px',
                fontWeight: 700,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Eye size={16} />
              <span>Reveal Scientific Derivation & Solution</span>
            </button>
          ) : (
            <div>
              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '28px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--emerald-primary)', marginBottom: '6px' }}>
                  ✅ EXACT REASONING & DERIVATION
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  {currentItem.answerExplanation}
                </div>
              </div>

              {/* Confidence Rating Buttons */}
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  How easily did you recall this reasoning?
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <button
                    onClick={() => handleRateConfidence('hard')}
                    className="btn btn-outline"
                    style={{
                      borderColor: 'rgba(244, 63, 94, 0.4)',
                      color: '#f43f5e',
                      padding: '12px',
                      fontSize: '13px'
                    }}
                  >
                    😕 Hard (Repeat Tomorrow)
                  </button>

                  <button
                    onClick={() => handleRateConfidence('good')}
                    className="btn btn-outline"
                    style={{
                      borderColor: 'rgba(0, 229, 255, 0.4)',
                      color: 'var(--cyan-primary)',
                      padding: '12px',
                      fontSize: '13px'
                    }}
                  >
                    🙂 Good (In 3 Days)
                  </button>

                  <button
                    onClick={() => handleRateConfidence('easy')}
                    className="btn btn-primary"
                    style={{
                      padding: '12px',
                      fontSize: '13px'
                    }}
                  >
                    🔥 Easy / Mastered (+30 XP)
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Completed Session Banner */
        <div className="card" style={{ padding: '48px 24px', textAlign: 'center', border: '1px solid var(--emerald-primary)' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            color: 'var(--emerald-primary)'
          }}>
            <Award size={32} />
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
            All Revisions Completed for Today!
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 24px auto' }}>
            You have reinforced your active recall pathways. The system has updated your memory decay intervals for the next session.
          </p>
          <button
            onClick={handleReset}
            className="btn btn-outline"
            style={{ fontSize: '13px', padding: '10px 20px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <RotateCw size={14} />
            <span>Practice Deck Again</span>
          </button>
        </div>
      )}

    </div>
  );
};
