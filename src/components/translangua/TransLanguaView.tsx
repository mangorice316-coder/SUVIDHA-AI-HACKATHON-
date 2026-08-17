import React, { useState } from 'react';
import { TranslanguaStudySet, SupportedLanguage } from '../../types/translangua';
import { TRANSLANGUA_PRESET_STUDIES } from '../../services/fixtures';
import { BridgeCoreFlow } from './BridgeCoreFlow';
import { DualLayerCard } from './DualLayerCard';
import { VocabularyBridge } from './VocabularyBridge';
import { ProofAssembler } from './ProofAssembler';
import { AcademicRegisterScorer } from './AcademicRegisterScorer';
import { Globe, BookOpen, Sparkles, FlaskConical, Atom } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

export const TransLanguaView: React.FC = () => {
  const [selectedStudyKey, setSelectedStudyKey] = useState<string>('maxwell_displacement');
  const [selectedStudy, setSelectedStudy] = useState<TranslanguaStudySet>(TRANSLANGUA_PRESET_STUDIES.maxwell_displacement);
  const [activeLanguage, setActiveLanguage] = useState<SupportedLanguage>('ta');

  const languages: { code: SupportedLanguage; name: string; native: string }[] = [
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' }
  ];

  const handleStudyChange = (key: string) => {
    setSelectedStudyKey(key);
    const study = TRANSLANGUA_PRESET_STUDIES[key];
    if (study) {
      setSelectedStudy(study);
      audioEngine.speakAnnouncement(`Loaded ${study.title} from ${study.sourceCurriculum}`);
    }
  };

  const handleLanguageChange = (code: SupportedLanguage) => {
    setActiveLanguage(code);
    audioEngine.speakAnnouncement(`Switched translanguaging language to ${languages.find(l => l.code === code)?.name}`);
  };

  return (
    <div className="tab-pane" role="tabpanel" id="panel-translangua" aria-labelledby="tab-translangua">
      {/* Top Banner */}
      <div className="judge-banner">
        <div className="judge-banner-content">
          <span className="judge-tag" style={{ backgroundColor: 'var(--cyan-primary)', color: '#000' }}>
            Flagship Module
          </span>
          <div className="judge-banner-text">
            <strong>Project BRIDGE (Concept-to-Academic Register Access):</strong> "Don't replace the lesson. Bridge the learner into it." Removes the linguistic bottleneck between everyday conceptual understanding and formal academic STEM terminology.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className={`btn ${selectedStudyKey === 'maxwell_displacement' ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: '11px', padding: '6px 10px' }}
            onClick={() => handleStudyChange('maxwell_displacement')}
          >
            <Atom size={13} /> Physics: Maxwell
          </button>
          <button 
            className={`btn ${selectedStudyKey === 'chemical_equilibrium' ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: '11px', padding: '6px 10px' }}
            onClick={() => handleStudyChange('chemical_equilibrium')}
          >
            <FlaskConical size={13} /> Chem: Le Chatelier
          </button>
        </div>
      </div>

      {/* Flagship 5-Step Core Interactive Bridge Flow */}
      <div style={{ marginBottom: '24px' }}>
        <BridgeCoreFlow />
      </div>

      {/* Main Grid: Dual Layer Scaffolding & Academic Register Scorer */}
      <div className="view-grid-two-col">
        {/* Left Column: Dual Layer Scaffold & Derivation Assembler */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <DualLayerCard studySet={selectedStudy} />

          <ProofAssembler
            initialPieces={selectedStudy.proofAssemblerPieces}
            expectedSummary={selectedStudy.formalEnglishSummary}
          />
        </div>

        {/* Right Column: Academic Register Scorer, Vocabulary Bridge, & Language Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <AcademicRegisterScorer />

          {/* Language Selector Bar */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <Globe size={18} color="var(--cyan-primary)" />
                <span>Regional Bridge Language</span>
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`btn ${activeLanguage === lang.code ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '12px', padding: '8px 4px', flexDirection: 'column', gap: '2px' }}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <span style={{ fontWeight: 700 }}>{lang.native}</span>
                  <span style={{ fontSize: '10px', opacity: 0.8 }}>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          <VocabularyBridge vocabulary={selectedStudy.vocabularyAnchors} />
        </div>
      </div>
    </div>
  );
};
