import React, { useState } from 'react';
import { learningOS } from '../../services/learningOS';
import { VirtualExperiment } from '../../types/learningOS';
import { audioEngine } from '../../services/audioEngine';
import { FlaskConical, Play, CheckCircle2, AlertCircle, HelpCircle, Activity, Sparkles } from 'lucide-react';

export const VirtualExperimentLab: React.FC = () => {
  const experiments: VirtualExperiment[] = learningOS.getVirtualExperiments();
  const [selectedExp, setSelectedExp] = useState<VirtualExperiment>(experiments[0]);
  const [sliderValue, setSliderValue] = useState<number>(experiments[0].defaultVal);
  const [selectedPrediction, setSelectedPrediction] = useState<number | null>(null);
  const [isTested, setIsTested] = useState<boolean>(false);

  const observedValue = selectedExp.observedFormula(sliderValue);

  const handleSelectExp = (exp: VirtualExperiment) => {
    setSelectedExp(exp);
    setSliderValue(exp.defaultVal);
    setSelectedPrediction(null);
    setIsTested(false);
    audioEngine.playChime(550, 0.1);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setSliderValue(val);
    audioEngine.playChime(400 + val * 35, 0.08);
  };

  const handleTestPrediction = () => {
    if (selectedPrediction === null) return;
    setIsTested(true);
    const isCorrect = selectedPrediction === selectedExp.correctPredictionIndex;
    audioEngine.playChime(isCorrect ? 800 : 420, 0.25);
    audioEngine.speakAnnouncement(isCorrect ? "Hypothesis confirmed by virtual simulation!" : "Hypothesis disproven. Check the scientific explanation.");
  };

  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
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
          <FlaskConical size={14} />
          <span>Interactive Hypothesis Testing</span>
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
          Virtual Experiment & Prediction Lab
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
          Science is prediction $\rightarrow$ experiment $\rightarrow$ observation $\rightarrow$ explanation. Formulate your hypothesis, test with live simulation sliders, and verify physical laws.
        </p>
      </div>

      {/* Experiment Selector Chips */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {experiments.map(exp => (
          <button
            key={exp.id}
            onClick={() => handleSelectExp(exp)}
            className={`btn ${selectedExp.id === exp.id ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: '13px', padding: '8px 16px', borderRadius: '999px' }}
          >
            {exp.title}
          </button>
        ))}
      </div>

      {/* Main Grid: Left = Prediction Hypothesis, Right = Interactive Simulation Rig */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Step 1: Scientific Hypothesis Prediction */}
        <div className="card" style={{ padding: '24px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)', marginBottom: '8px' }}>
            STEP 1: FORMULATE HYPOTHESIS
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
            {selectedExp.predictionQuestion}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {selectedExp.predictionOptions.map((opt, idx) => {
              const isSelected = selectedPrediction === idx;
              const isCorrect = idx === selectedExp.correctPredictionIndex;

              let borderColor = 'var(--border-subtle)';
              let bgColor = 'rgba(15, 23, 42, 0.6)';

              if (isTested) {
                if (isCorrect) {
                  borderColor = 'var(--emerald-primary)';
                  bgColor = 'rgba(16, 185, 129, 0.15)';
                } else if (isSelected && !isCorrect) {
                  borderColor = '#f43f5e';
                  bgColor = 'rgba(244, 63, 94, 0.15)';
                }
              } else if (isSelected) {
                borderColor = 'var(--cyan-primary)';
                bgColor = 'rgba(0, 229, 255, 0.1)';
              }

              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (!isTested) {
                      setSelectedPrediction(idx);
                      audioEngine.playChime(500 + idx * 40, 0.1);
                    }
                  }}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: bgColor,
                    cursor: isTested ? 'default' : 'pointer',
                    fontSize: '13px',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: '2px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 800,
                    flexShrink: 0
                  }}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span>{opt}</span>
                </div>
              );
            })}
          </div>

          {!isTested ? (
            <button
              onClick={handleTestPrediction}
              disabled={selectedPrediction === null}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '13.5px', fontWeight: 800 }}
            >
              Lock In Hypothesis & Run Simulation
            </button>
          ) : (
            <div style={{
              backgroundColor: selectedPrediction === selectedExp.correctPredictionIndex ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
              border: `1px solid ${selectedPrediction === selectedExp.correctPredictionIndex ? 'var(--emerald-primary)' : '#f43f5e'}`,
              borderRadius: 'var(--radius-sm)',
              padding: '14px',
              fontSize: '12.5px',
              color: 'var(--text-primary)',
              lineHeight: 1.5
            }}>
              <strong>{selectedPrediction === selectedExp.correctPredictionIndex ? '✅ Correct Hypothesis!' : '❌ Hypothesis Disproven:'} </strong>
              {selectedExp.scientificExplanation}
            </div>
          )}
        </div>

        {/* Step 2: Interactive Simulation Rig */}
        <div className="card" style={{ padding: '24px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--emerald-primary)', marginBottom: '8px' }}>
            STEP 2: LIVE SIMULATION RIG
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
            Adjust Variable & Observe Response
          </h3>

          {/* Interactive Slider */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-primary)' }}>{selectedExp.variableName}:</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)', fontSize: '15px' }}>
                {sliderValue} {selectedExp.variableUnit}
              </span>
            </div>
            <input
              type="range"
              min={selectedExp.variableMin}
              max={selectedExp.variableMax}
              step={selectedExp.variableStep}
              value={sliderValue}
              onChange={handleSliderChange}
              style={{ width: '100%', accentColor: 'var(--cyan-primary)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>{selectedExp.variableMin} {selectedExp.variableUnit}</span>
              <span>{selectedExp.variableMax} {selectedExp.variableUnit}</span>
            </div>
          </div>

          {/* Live Output Meter */}
          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            border: '2px solid var(--cyan-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            textAlign: 'center',
            marginBottom: '20px',
            boxShadow: '0 0 20px rgba(0, 229, 255, 0.15)'
          }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
              {selectedExp.observedName}
            </div>
            <div style={{ fontSize: '42px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)' }}>
              {observedValue} <span style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>{selectedExp.observedUnit}</span>
            </div>
          </div>

          {/* Visual Wave Simulation Bar */}
          <div style={{
            height: '32px',
            backgroundColor: 'rgba(2, 6, 23, 0.8)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            padding: '0 4px'
          }}>
            <div style={{
              width: `${Math.min(100, Math.max(5, (observedValue / (selectedExp.observedFormula(selectedExp.variableMin) || 10)) * 100))}%`,
              height: '18px',
              backgroundColor: 'var(--emerald-primary)',
              borderRadius: '2px',
              transition: 'width 0.15s ease',
              boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
            }} />
          </div>

        </div>

      </div>

    </div>
  );
};
