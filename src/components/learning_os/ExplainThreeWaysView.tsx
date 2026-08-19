import React, { useState } from 'react';
import { learningOS, MULTI_PERSPECTIVE_LIBRARY } from '../../services/learningOS';
import { MultiPerspectiveExplanation } from '../../types/learningOS';
import { audioEngine } from '../../services/audioEngine';
import { Sparkles, Layers, CheckCircle2, BookOpen, Atom, Globe, Code } from 'lucide-react';

interface ExplainThreeWaysViewProps {
  currentConceptKey?: string;
}

export const ExplainThreeWaysView: React.FC<ExplainThreeWaysViewProps> = ({
  currentConceptKey = 'faraday_law'
}) => {
  const [selectedKey, setSelectedKey] = useState<string>(currentConceptKey);
  const [activeMode, setActiveMode] = useState<'simple' | 'technical' | 'analogy' | 'proof'>('simple');

  const explanation: MultiPerspectiveExplanation = learningOS.getMultiPerspectiveExplanation(selectedKey);

  const concepts = [
    { key: 'faraday_law', label: "Faraday's Induction (Physics)" },
    { key: 'le_chatelier', label: "Le Chatelier's Principle (Chemistry)" },
    { key: 'photosynthesis', label: "Photosynthesis Coupling (Biology)" }
  ];

  const handleSelectMode = (mode: 'simple' | 'technical' | 'analogy' | 'proof') => {
    setActiveMode(mode);
    audioEngine.playChime(600 + (mode === 'simple' ? 0 : mode === 'technical' ? 50 : mode === 'analogy' ? 100 : 150), 0.15);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
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
          <Layers size={14} />
          <span>Multi-Perspective Cognitive Synthesizer</span>
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
          "Explain It Three Ways" Studio
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
          One theorem synthesized across four distinct cognitive lenses: intuitive storytelling, formal exam rigor, everyday cultural analogies, and mathematical proofs.
        </p>
      </div>

      {/* Concept Selector Chips */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {concepts.map(c => (
          <button
            key={c.key}
            onClick={() => {
              setSelectedKey(c.key);
              audioEngine.playChime(550, 0.1);
            }}
            className={`btn ${selectedKey === c.key ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: '12px', padding: '6px 14px', borderRadius: '999px' }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* 4 Perspective Selector Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px' }}>
        <button
          onClick={() => handleSelectMode('simple')}
          className={`card ${activeMode === 'simple' ? 'active' : ''}`}
          style={{
            cursor: 'pointer',
            padding: '16px',
            textAlign: 'center',
            border: activeMode === 'simple' ? '2px solid var(--emerald-primary)' : '1px solid var(--border-subtle)',
            backgroundColor: activeMode === 'simple' ? 'rgba(16, 185, 129, 0.1)' : 'var(--surface-card)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <div style={{ fontSize: '20px', marginBottom: '6px' }}>🐣</div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>1. Simple (ELI10)</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Zero jargon intuition</div>
        </button>

        <button
          onClick={() => handleSelectMode('technical')}
          className={`card ${activeMode === 'technical' ? 'active' : ''}`}
          style={{
            cursor: 'pointer',
            padding: '16px',
            textAlign: 'center',
            border: activeMode === 'technical' ? '2px solid var(--cyan-primary)' : '1px solid var(--border-subtle)',
            backgroundColor: activeMode === 'technical' ? 'rgba(0, 229, 255, 0.1)' : 'var(--surface-card)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <div style={{ fontSize: '20px', marginBottom: '6px' }}>🔬</div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>2. Formal Rigor</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Exam marking keywords</div>
        </button>

        <button
          onClick={() => handleSelectMode('analogy')}
          className={`card ${activeMode === 'analogy' ? 'active' : ''}`}
          style={{
            cursor: 'pointer',
            padding: '16px',
            textAlign: 'center',
            border: activeMode === 'analogy' ? '2px solid var(--purple-primary)' : '1px solid var(--border-subtle)',
            backgroundColor: activeMode === 'analogy' ? 'rgba(168, 85, 247, 0.1)' : 'var(--surface-card)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <div style={{ fontSize: '20px', marginBottom: '6px' }}>🌍</div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>3. Cultural Analogy</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Everyday physical metaphor</div>
        </button>

        <button
          onClick={() => handleSelectMode('proof')}
          className={`card ${activeMode === 'proof' ? 'active' : ''}`}
          style={{
            cursor: 'pointer',
            padding: '16px',
            textAlign: 'center',
            border: activeMode === 'proof' ? '2px solid var(--amber-primary)' : '1px solid var(--border-subtle)',
            backgroundColor: activeMode === 'proof' ? 'rgba(245, 158, 11, 0.1)' : 'var(--surface-card)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <div style={{ fontSize: '20px', marginBottom: '6px' }}>📐</div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>4. Mathematical Proof</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>First principles derivation</div>
        </button>
      </div>

      {/* Main Perspective Display Card */}
      <div className="card" style={{
        padding: '32px',
        border: '1px solid var(--border-subtle)',
        minHeight: '220px',
        backgroundColor: 'var(--surface-card)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        
        <div style={{ fontSize: '12px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)', marginBottom: '8px' }}>
          {explanation.conceptTitle}
        </div>

        {activeMode === 'simple' && (
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--emerald-primary)', margin: '0 0 12px 0' }}>
              🐣 Intuitive Everyday Concept:
            </h3>
            <p style={{ fontSize: '16px', color: 'var(--text-primary)', lineHeight: 1.7, margin: 0 }}>
              {explanation.simpleExplanation}
            </p>
          </div>
        )}

        {activeMode === 'technical' && (
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--cyan-primary)', margin: '0 0 12px 0' }}>
              🔬 Formal Academic & Exam Definition:
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.7, margin: 0 }}>
              {explanation.technicalExplanation}
            </p>
          </div>
        )}

        {activeMode === 'analogy' && (
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--purple-primary)', margin: '0 0 12px 0' }}>
              🌍 Cultural & Real-World Analogy:
            </h3>
            <p style={{ fontSize: '16px', color: 'var(--text-primary)', lineHeight: 1.7, margin: 0 }}>
              {explanation.culturalAnalogy}
            </p>
          </div>
        )}

        {activeMode === 'proof' && (
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--amber-primary)', margin: '0 0 12px 0' }}>
              📐 First-Principles Mathematical Derivation:
            </h3>
            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              padding: '16px 20px',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: 'var(--text-primary)',
              lineHeight: 1.6,
              borderLeft: '4px solid var(--amber-primary)'
            }}>
              {explanation.mathematicalProof}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
