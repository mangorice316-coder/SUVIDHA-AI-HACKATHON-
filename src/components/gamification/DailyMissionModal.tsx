import React, { useState } from 'react';
import { learningEngine } from '../../services/learningEngine';
import { DailyMission } from '../../types/learning';
import { audioEngine } from '../../services/audioEngine';
import { Flame, Zap, Target, CheckCircle2, X, Award, Sparkles } from 'lucide-react';

interface DailyMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyMissionModal: React.FC<DailyMissionModalProps> = ({ isOpen, onClose }) => {
  const [missions] = useState<DailyMission[]>(learningEngine.getMissions());
  const xp = learningEngine.getXp();
  const streak = learningEngine.getStreak();

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(2, 6, 23, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px'
    }}>
      
      <div className="card" style={{
        width: '100%',
        maxWidth: '540px',
        backgroundColor: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        padding: '24px'
      }}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={20} color="var(--cyan-primary)" />
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Daily Learning Missions & Streak
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Top XP & Streak Ribbon */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <div style={{
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--amber-primary)'
            }}>
              <Zap size={20} />
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--amber-primary)' }}>
                {xp} XP
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Level 3 Polymath</div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(244, 63, 94, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f43f5e'
            }}>
              <Flame size={20} />
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#f43f5e' }}>
                {streak} Days
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Daily Streak Active</div>
            </div>
          </div>
        </div>

        {/* Missions List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          {missions.map(m => (
            <div
              key={m.id}
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {m.title}
                  </span>
                  {m.completed && (
                    <span style={{ fontSize: '10px', color: 'var(--emerald-primary)', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <CheckCircle2 size={11} /> Done
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  {m.description}
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '5px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${(m.progress / m.total) * 100}%`,
                    height: '100%',
                    backgroundColor: m.completed ? 'var(--emerald-primary)' : 'var(--cyan-primary)',
                    borderRadius: '3px',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <span style={{ fontSize: '12px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--amber-primary)' }}>
                  +{m.xpReward} XP
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="btn btn-primary"
          style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: 800 }}
        >
          Keep Learning
        </button>

      </div>

    </div>
  );
};
