import React, { useState } from 'react';
import { Award, FileText, CheckCircle2, RotateCcw, HelpCircle, ArrowRight, Atom, FlaskConical, Dna } from 'lucide-react';
import { TRANSLANGUA_PRESET_STUDIES } from '../../services/fixtures';
import { ProofAssembler } from '../translangua/ProofAssembler';
import { AcademicRegisterScorer } from '../translangua/AcademicRegisterScorer';
import { audioEngine } from '../../services/audioEngine';

export const ProofLabView: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('maxwell_displacement');
  const study = TRANSLANGUA_PRESET_STUDIES[selectedTopic] || TRANSLANGUA_PRESET_STUDIES.maxwell_displacement;

  const handleTopicSwitch = (key: string) => {
    setSelectedTopic(key);
    const newStudy = TRANSLANGUA_PRESET_STUDIES[key];
    if (newStudy) {
      audioEngine.speakAnnouncement(`Loaded derivation practice for ${newStudy.title}`);
    }
  };

  return (
    <div className="tab-pane" role="tabpanel" id="panel-proof-lab" aria-labelledby="tab-proof-lab">
      {/* Top Banner */}
      <div className="card" style={{ marginBottom: '20px', background: 'linear-gradient(135deg, rgba(14, 21, 37, 0.95), rgba(15, 23, 42, 0.98))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="hero-pill-badge" style={{ fontSize: '10px' }}>Exam Prep Lab</span>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>Interactive Derivation & Proof Solver</h2>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
              Practice assembling standard mathematical derivations step-by-step and test your written scientific answers for exam compliance.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              className={`btn ${selectedTopic === 'maxwell_displacement' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '12px', padding: '6px 12px' }}
              onClick={() => handleTopicSwitch('maxwell_displacement')}
            >
              <Atom size={14} /> Maxwell's Law (Physics)
            </button>
            <button
              className={`btn ${selectedTopic === 'chemical_equilibrium' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '12px', padding: '6px 12px' }}
              onClick={() => handleTopicSwitch('chemical_equilibrium')}
            >
              <FlaskConical size={14} /> Le Chatelier (Chemistry)
            </button>
            <button
              className={`btn ${selectedTopic === 'bio_photosynthesis' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '12px', padding: '6px 12px' }}
              onClick={() => handleTopicSwitch('bio_photosynthesis')}
            >
              <Dna size={14} /> Z-Scheme ATP (Biology)
            </button>
            <button
              className={`btn ${selectedTopic === 'math_derivatives' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '12px', padding: '6px 12px' }}
              onClick={() => handleTopicSwitch('math_derivatives')}
            >
              <Award size={14} /> Derivatives (Math)
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Derivation Assembler + Academic Register Scorer */}
      <div className="view-grid-two-col">
        {/* Left Column: Derivation Assembler */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <ProofAssembler
            key={selectedTopic}
            initialPieces={study.proofAssemblerPieces}
            expectedSummary={study.formalEnglishSummary}
          />
        </div>

        {/* Right Column: AI Academic Register Scorer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <AcademicRegisterScorer />
        </div>
      </div>
    </div>
  );
};
