import React, { useState } from 'react';
import { TranslanguaStudySet, ProofStepClause } from '../../types/translangua';
import { AlertCircle, CheckCircle, Sparkles, BookOpen, Volume2 } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

interface DualLayerCardProps {
  studySet: TranslanguaStudySet;
}

export const DualLayerCard: React.FC<DualLayerCardProps> = ({ studySet }) => {
  const [selectedClauseId, setSelectedClauseId] = useState<string | null>(null);

  const handleClauseClick = (clause: ProofStepClause) => {
    setSelectedClauseId(clause.id);
    audioEngine.speakAnnouncement(`English clause: ${clause.englishClause}. Vernacular meaning: ${clause.vernacularIntuition}`);
  };

  return (
    <div className="dual-layer-container">
      {/* 1. The Broken Literal Translation (The Trap) */}
      <div className="broken-translate-box">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginBottom: '6px' }}>
          <AlertCircle size={16} />
          <span>Why Standard Translation Fails (Google Translate / IndicTrans2)</span>
        </div>
        <p style={{ fontStyle: 'italic', marginBottom: '8px' }}>
          "{studySet.brokenLiteralTranslation.text}"
        </p>
        <ul style={{ paddingLeft: '20px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {studySet.brokenLiteralTranslation.identifiedErrors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      </div>

      {/* 2. Layer 1: The Vernacular Conceptual Analogy */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--emerald-primary)', borderRadius: 'var(--radius-md)', padding: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-primary)', fontWeight: 700, fontSize: '15px', marginBottom: '8px' }}>
          <Sparkles size={18} />
          <span>{studySet.vernacularConceptualAnalogy.analogyTitle}</span>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.7', marginBottom: '10px' }}>
          {studySet.vernacularConceptualAnalogy.narrative}
        </p>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          💡 <strong>Cultural/Pedagogical Anchor:</strong> {studySet.vernacularConceptualAnalogy.culturalContextualAnchor}
        </div>
      </div>

      {/* 3. Layer 2: Clause-by-Clause Academic English Bridge */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <BookOpen size={18} color="var(--cyan-primary)" />
            <span>Clause-by-Clause Academic Register Linker</span>
          </h3>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Click clause to inspect syntax</span>
        </div>

        <div>
          {studySet.clauseMap.map((clause) => {
            const isSelected = clause.id === selectedClauseId;

            return (
              <div
                key={clause.id}
                className="clause-item"
                style={{
                  borderLeft: isSelected ? '4px solid var(--cyan-primary)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer'
                }}
                onClick={() => handleClauseClick(clause)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div className="clause-vernacular">
                    {clause.vernacularIntuition}
                  </div>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)' }}>
                    Clause {clause.clauseIndex}
                  </span>
                </div>

                <div className="clause-english">
                  {clause.englishClause}
                </div>

                {isSelected && (
                  <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed var(--border-subtle)', fontSize: '12px' }}>
                    <div style={{ color: 'var(--amber-primary)', fontWeight: 600, marginBottom: '2px' }}>
                      📐 Mathematical Operator: <code style={{ fontFamily: 'var(--font-mono)' }}>{clause.mathematicalOperator}</code>
                    </div>
                    {clause.scientificIdiomAnchor && (
                      <div style={{ color: 'var(--text-secondary)' }}>
                        📝 Academic Pattern: <em>{clause.scientificIdiomAnchor}</em>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
