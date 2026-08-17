import React from 'react';
import { VocabularyAnchor } from '../../types/translangua';
import { Volume2, Bookmark, Lightbulb } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

interface VocabularyBridgeProps {
  vocabulary: VocabularyAnchor[];
}

export const VocabularyBridge: React.FC<VocabularyBridgeProps> = ({ vocabulary }) => {
  const handlePronounce = (term: string) => {
    audioEngine.speakAnnouncement(term);
  };

  return (
    <div className="card" role="region" aria-label="STEM Academic Vocabulary Bridge">
      <div className="card-header">
        <h3 className="card-title">
          <Bookmark size={18} color="var(--amber-primary)" />
          <span>STEM Academic Vocabulary Anchors</span>
        </h3>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Exam & Derivation Terminology</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {vocabulary.map((vocab) => (
          <div
            key={vocab.id}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 14px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--cyan-primary)', fontSize: '14px' }}>
                  {vocab.formalEnglishTerm}
                </span>
                <button
                  className="btn-icon"
                  style={{ padding: '4px' }}
                  onClick={() => handlePronounce(vocab.formalEnglishTerm)}
                  aria-label={`Pronounce ${vocab.formalEnglishTerm}`}
                  title="Listen to English Pronunciation"
                >
                  <Volume2 size={13} />
                </button>
              </div>
              <span className="tab-badge" style={{ textTransform: 'capitalize' }}>
                {vocab.pedagogicalRole.replace('_', ' ')}
              </span>
            </div>

            <div style={{ fontSize: '13px', color: 'var(--emerald-primary)', fontWeight: 600, marginBottom: '6px' }}>
              {vocab.vernacularTerm} <span style={{ color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>({vocab.phoneticPronunciation})</span>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', background: 'var(--bg-tertiary)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', marginBottom: '6px' }}>
              <Lightbulb size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} color="var(--amber-primary)" />
              <strong>Intuitive Analogy:</strong> {vocab.colloquialAnalogy}
            </div>

            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Exam usage: "{vocab.exampleUsage}"
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
