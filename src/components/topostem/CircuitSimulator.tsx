import React from 'react';
import { CircuitGraphData, SimulationResult } from '../../types/topostem';
import { Activity, Zap, Cpu } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

interface CircuitSimulatorProps {
  graphData: CircuitGraphData;
}

export const CircuitSimulator: React.FC<CircuitSimulatorProps> = ({ graphData }) => {
  const sim = graphData.simulation;
  if (!sim) return null;

  const handleReadSimulation = () => {
    audioEngine.speakAnnouncement(
      `Live Simulation: Total equivalent impedance is ${sim.totalEquivalentImpedance}. Total RMS current is ${sim.totalCurrentRMS}.`
    );
  };

  return (
    <div className="card" role="region" aria-label="Live Mathematical Simulation & Impedance Solver">
      <div className="card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="var(--emerald-primary)" />
          <h3 className="card-title">Live Mathematical Circuit Solver</h3>
        </div>
        <button 
          className="btn btn-outline" 
          style={{ fontSize: '11px', padding: '4px 8px' }}
          onClick={handleReadSimulation}
          title="Read Simulation Results via Speech Synthesis"
        >
          <Zap size={12} /> Read Results
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
        <div style={{ background: 'var(--bg-secondary)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Total Equivalent Impedance (Z_eq)
          </div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--cyan-primary)', fontFamily: 'var(--font-mono)' }}>
            {sim.totalEquivalentImpedance}
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Total Source RMS Current (I_total)
          </div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--amber-primary)', fontFamily: 'var(--font-mono)' }}>
            {sim.totalCurrentRMS}
          </div>
        </div>
      </div>

      {/* Branch Currents */}
      <div style={{ background: 'var(--bg-tertiary)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', fontSize: '12px' }}>
        <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
          Branch Current Breakdown:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {Object.entries(sim.branchCurrents).map(([branch, current]) => (
            <div key={branch} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{branch}:</span>
              <span style={{ color: 'var(--emerald-primary)', fontWeight: 600 }}>{current}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
