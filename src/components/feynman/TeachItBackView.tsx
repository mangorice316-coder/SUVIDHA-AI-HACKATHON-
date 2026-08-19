import React, { useState } from 'react';
import { learningEngine } from '../../services/learningEngine';
import { FeynmanEvaluation } from '../../types/learning';
import { audioEngine } from '../../services/audioEngine';
import { Mic, MicOff, Send, Sparkles, Award, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export const TeachItBackView: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState<string>("Faraday's Law of Electromagnetic Induction");
  const [explanationText, setExplanationText] = useState<string>(
    "When a magnet moves toward a coil, the coil hates the change in magnetic flux, so it generates a current in the opposite direction to push the magnet away."
  );
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<FeynmanEvaluation | null>(null);

  const concepts = [
    "Faraday's Law of Electromagnetic Induction",
    "Le Chatelier's Equilibrium Principle",
    "Photosynthesis: Light & Dark Reactions",
    "First Principles Derivative & Instantaneous Rate"
  ];

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      audioEngine.playChime(650, 0.15);
      audioEngine.speakAnnouncement("Listening... explain the concept in your own words.");
      // In real browser or demo, simulate recording input
      setTimeout(() => {
        setIsRecording(false);
        audioEngine.playChime(500, 0.15);
      }, 5000);
    } else {
      setIsRecording(false);
    }
  };

  const handleEvaluate = async () => {
    if (!explanationText.trim()) return;
    setIsEvaluating(true);
    audioEngine.playChime(600, 0.15);

    try {
      const result = await learningEngine.evaluateFeynmanExplanation(selectedConcept, explanationText);
      setEvaluation(result);
      learningEngine.addXp(result.accuracyScore >= 80 ? 60 : 35);
      audioEngine.playChime(result.accuracyScore >= 80 ? 800 : 620, 0.3);
      audioEngine.speakAnnouncement(`Evaluation complete. Accuracy score: ${result.accuracyScore} percent. Verdict: ${result.masteryVerdict}.`);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          fontWeight: 800,
          fontFamily: 'var(--font-mono)',
          color: 'var(--purple-primary)',
          textTransform: 'uppercase',
          marginBottom: '6px'
        }}>
          <Sparkles size={14} />
          <span>Feynman Active Recall Technique</span>
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
          "Teach It Back" Feynman Studio
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
          Explain a complex STEM theorem to the AI as if teaching a beginner. The AI evaluates your conceptual clarity, scientific rigor, and missing prerequisites.
        </p>
      </div>

      {/* Concept Selector */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {concepts.map(c => (
          <button
            key={c}
            onClick={() => {
              setSelectedConcept(c);
              setEvaluation(null);
              audioEngine.playChime(550, 0.1);
            }}
            className={`btn ${selectedConcept === c ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: '12px', padding: '6px 14px', borderRadius: '999px' }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Input Box with Voice & Send */}
      <div className="card" style={{ padding: '20px', border: '1px solid var(--border-subtle)', marginBottom: '28px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
          Your Intuitive Explanation of <span style={{ color: 'var(--cyan-primary)' }}>{selectedConcept}</span>:
        </label>
        
        <textarea
          value={explanationText}
          onChange={(e) => setExplanationText(e.target.value)}
          placeholder="Type or speak your explanation here... Use everyday analogies or mathematical reasoning."
          rows={4}
          style={{
            width: '100%',
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 14px',
            fontSize: '14px',
            lineHeight: 1.5,
            resize: 'vertical',
            marginBottom: '16px'
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <button
            onClick={handleToggleRecording}
            className={`btn ${isRecording ? 'btn-primary' : 'btn-outline'}`}
            style={{
              fontSize: '13px',
              padding: '8px 16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: isRecording ? '#f43f5e' : undefined
            }}
          >
            {isRecording ? <MicOff size={15} /> : <Mic size={15} />}
            <span>{isRecording ? 'Listening (Speaking...)' : 'Explain with Voice'}</span>
          </button>

          <button
            onClick={handleEvaluate}
            disabled={isEvaluating || !explanationText.trim()}
            className="btn btn-primary"
            style={{
              fontSize: '14px',
              padding: '10px 24px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 800
            }}
          >
            {isEvaluating ? <RefreshCw size={16} className="spinning" /> : <Send size={16} />}
            <span>{isEvaluating ? 'Analyzing Comprehension...' : 'Evaluate Comprehension'}</span>
          </button>
        </div>
      </div>

      {/* AI Feynman Evaluation Results */}
      {evaluation && (
        <div className="card" style={{
          padding: '28px',
          border: '1px solid var(--purple-primary)',
          backgroundColor: 'rgba(168, 85, 247, 0.04)',
          borderRadius: 'var(--radius-md)'
        }}>
          
          {/* Top Score Matrix */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div className="card" style={{ padding: '16px', textAlign: 'center', borderLeft: '4px solid var(--emerald-primary)' }}>
              <div style={{ fontSize: '28px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--emerald-primary)' }}>
                {evaluation.accuracyScore}%
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Scientific Accuracy</div>
            </div>

            <div className="card" style={{ padding: '16px', textAlign: 'center', borderLeft: '4px solid var(--cyan-primary)' }}>
              <div style={{ fontSize: '28px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)' }}>
                {evaluation.clarityScore}%
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Pedagogical Clarity</div>
            </div>

            <div className="card" style={{ padding: '16px', textAlign: 'center', borderLeft: '4px solid var(--purple-primary)' }}>
              <div style={{ fontSize: '28px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--purple-primary)' }}>
                {evaluation.depthScore}%
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Conceptual Depth</div>
            </div>

            <div className="card" style={{ padding: '16px', textAlign: 'center', borderLeft: '4px solid var(--amber-primary)' }}>
              <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--amber-primary)', marginTop: '4px' }}>
                {evaluation.masteryVerdict}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>Mastery Level</div>
            </div>
          </div>

          {/* Key Strengths & Missing Elements */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            
            {/* Strengths */}
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              padding: '16px',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--emerald-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} />
                <span>What You Articulated Well</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {evaluation.keyStrengths.map((str, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{str}</li>
                ))}
              </ul>
            </div>

            {/* Missing Concepts */}
            <div style={{
              backgroundColor: 'rgba(244, 63, 94, 0.08)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              padding: '16px',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#f43f5e', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertCircle size={14} />
                <span>Gaps & Missing Rigor</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {evaluation.missingCrucialConcepts.length > 0 ? (
                  evaluation.missingCrucialConcepts.map((gap, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>{gap}</li>
                  ))
                ) : (
                  <li>No major gaps detected! Outstanding explanation.</li>
                )}
              </ul>
            </div>

          </div>

          {/* AI Refined Golden Summary */}
          <div style={{
            backgroundColor: 'rgba(0, 229, 255, 0.08)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)', marginBottom: '4px' }}>
              ✨ AI REFINED FEYNMAN SYNTHESIS
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
              {evaluation.improvedSummary}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
