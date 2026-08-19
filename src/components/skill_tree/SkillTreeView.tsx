import React, { useState } from 'react';
import { learningEngine } from '../../services/learningEngine';
import { SkillNode, KnowledgeGap } from '../../types/learning';
import { SupportedLanguage } from '../../types/translangua';
import { audioEngine } from '../../services/audioEngine';
import { GitBranch, CheckCircle2, AlertTriangle, Lock, Sparkles, Play, ArrowRight } from 'lucide-react';

interface SkillTreeViewProps {
  currentLanguage: SupportedLanguage;
  onSelectConceptStudy?: (studyKey: string) => void;
}

export const SkillTreeView: React.FC<SkillTreeViewProps> = ({
  currentLanguage,
  onSelectConceptStudy
}) => {
  const [selectedSubject, setSelectedSubject] = useState<'All' | 'Physics' | 'Chemistry' | 'Biology' | 'Mathematics'>('All');
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);

  const nodes = selectedSubject === 'All'
    ? learningEngine.getSkillNodes()
    : learningEngine.getSkillNodes(selectedSubject);

  const knowledgeGaps: KnowledgeGap[] = learningEngine.detectKnowledgeGaps();

  const handleNodeClick = (node: SkillNode) => {
    setSelectedNode(node);
    if (node.level === 'mastered') {
      audioEngine.playChime(750, 0.15);
    } else if (node.level === 'gap_detected') {
      audioEngine.playChime(420, 0.2);
    } else {
      audioEngine.playChime(600, 0.15);
    }
  };

  const getLevelBadge = (level: SkillNode['level']) => {
    switch (level) {
      case 'mastered':
        return (
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            color: 'var(--emerald-primary)',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '3px 8px',
            borderRadius: '999px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <CheckCircle2 size={12} /> Mastered
          </span>
        );
      case 'learning':
        return (
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            color: 'var(--cyan-primary)',
            backgroundColor: 'rgba(0, 229, 255, 0.15)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            padding: '3px 8px',
            borderRadius: '999px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Sparkles size={12} /> Learning
          </span>
        );
      case 'gap_detected':
        return (
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            color: 'var(--rose-primary, #f43f5e)',
            backgroundColor: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            padding: '3px 8px',
            borderRadius: '999px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <AlertTriangle size={12} /> Gap Detected
          </span>
        );
      case 'locked':
        return (
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            color: 'var(--text-muted)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            padding: '3px 8px',
            borderRadius: '999px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Lock size={12} /> Locked
          </span>
        );
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* Header & Filter Ribbon */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            color: 'var(--cyan-primary)',
            textTransform: 'uppercase',
            marginBottom: '6px'
          }}>
            <GitBranch size={14} />
            <span>Mastery Progression Graph</span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            STEM Skill Tree & Knowledge Map
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
            Khan Academy-style mastery tracking and Duolingo progression. Master prerequisites to unlock advanced theorems.
          </p>
        </div>

        {/* Subject Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['All', 'Physics', 'Chemistry', 'Biology', 'Mathematics'] as const).map(sub => (
            <button
              key={sub}
              onClick={() => {
                setSelectedSubject(sub);
                audioEngine.playChime(600, 0.1);
              }}
              className={`btn ${selectedSubject === sub ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '13px', padding: '8px 16px', borderRadius: '999px' }}
            >
              {sub === 'Physics' ? '⚛️ Physics' : sub === 'Chemistry' ? '🧪 Chemistry' : sub === 'Biology' ? '🧬 Biology' : sub === 'Mathematics' ? '📐 Math' : '🌐 All STEM'}
            </button>
          ))}
        </div>
      </div>

      {/* Knowledge Gap Detector Alert Ribbon */}
      {knowledgeGaps.length > 0 && (
        <div style={{
          backgroundColor: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.35)',
          borderRadius: 'var(--radius-md)',
          padding: '18px 20px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(244, 63, 94, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: '#f43f5e'
          }}>
            <AlertTriangle size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#f43f5e', marginBottom: '4px' }}>
              Knowledge Gap Detected in Prerequisite Chain
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '10px' }}>
              {knowledgeGaps[0].diagnosticReason}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Recommended Fix: {knowledgeGaps[0].recommendedAction}
              </span>
              {onSelectConceptStudy && (
                <button
                  onClick={() => {
                    onSelectConceptStudy(knowledgeGaps[0].quickStudyKey);
                    audioEngine.playChime(700, 0.2);
                  }}
                  className="btn btn-primary"
                  style={{
                    fontSize: '12px',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Play size={12} fill="currentColor" />
                  <span>Fix Prerequisite Gap Now</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Skill Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {nodes.map(node => {
          const isSelected = selectedNode?.id === node.id;
          const vernacular = node.vernacularTitle[currentLanguage] || node.title;

          return (
            <div
              key={node.id}
              onClick={() => handleNodeClick(node)}
              className="card"
              style={{
                cursor: 'pointer',
                padding: '20px',
                border: isSelected
                  ? '2px solid var(--cyan-primary)'
                  : node.level === 'gap_detected'
                  ? '1px solid rgba(244, 63, 94, 0.4)'
                  : '1px solid var(--border-subtle)',
                backgroundColor: isSelected ? 'rgba(0, 229, 255, 0.05)' : 'var(--surface-card)',
                transition: 'all 0.25s ease',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Top Row: Subject & Level */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {node.chapter}
                  </span>
                  {getLevelBadge(node.level)}
                </div>

                {/* English Title */}
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                  {node.title}
                </h3>

                {/* Vernacular Mother-Tongue Title */}
                {vernacular && vernacular !== node.title && (
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--cyan-primary)', marginBottom: '8px' }}>
                    {vernacular}
                  </div>
                )}

                {/* Description */}
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4, margin: '0 0 16px 0' }}>
                  {node.description}
                </p>
              </div>

              {/* Bottom Row: XP & Action Button */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <span style={{ fontSize: '12px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--amber-primary)' }}>
                  +{node.xpReward} XP
                </span>

                {node.studyKey && onSelectConceptStudy ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (node.studyKey) {
                        onSelectConceptStudy(node.studyKey);
                        audioEngine.playChime(650, 0.2);
                      }
                    }}
                    className="btn btn-outline"
                    style={{
                      fontSize: '11px',
                      padding: '5px 12px',
                      borderRadius: 'var(--radius-sm)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>Launch Studio</span>
                    <ArrowRight size={11} />
                  </button>
                ) : (
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {node.level === 'mastered' ? 'Completed' : 'Prerequisite'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
