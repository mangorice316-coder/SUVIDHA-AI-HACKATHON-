import React, { useEffect } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Volume2, RotateCcw, HelpCircle } from 'lucide-react';
import { CircuitGraphData, CircuitNode } from '../../types/topostem';
import { audioEngine } from '../../services/audioEngine';

interface KeyNavPanelProps {
  graphData: CircuitGraphData;
  activeNode: CircuitNode;
  onNavigate: (direction: 'left' | 'right' | 'up' | 'down') => void;
  onCycleLoop: () => void;
  activeLoopName: string | null;
}

export const KeyNavPanel: React.FC<KeyNavPanelProps> = ({
  graphData,
  activeNode,
  onNavigate,
  onCycleLoop,
  activeLoopName
}) => {
  // Global Keyboard Listener for Arrow Keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          onNavigate('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          onNavigate('right');
          break;
        case 'ArrowUp':
          e.preventDefault();
          onNavigate('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          onNavigate('down');
          break;
        case 'l':
        case 'L':
          e.preventDefault();
          onCycleLoop();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNavigate, onCycleLoop]);

  const pannedPercentage = Math.round(activeNode.position.x * 100);
  const pannedDirection = pannedPercentage < 40 ? 'Left Ear' : pannedPercentage > 60 ? 'Right Ear' : 'Center';

  return (
    <div className="card" role="region" aria-label="Audio-Spatial Keyboard Navigation Controls">
      <div className="card-header">
        <h3 className="card-title">
          <Volume2 size={18} color="var(--cyan-primary)" />
          <span>Spatial Directional Matrix</span>
        </h3>
        <div className="audio-pulse-indicator">
          <span className="pulse-dot"></span>
          <span>Pan: {pannedDirection} ({pannedPercentage}%)</span>
        </div>
      </div>

      {/* Currently Focused Component Details */}
      <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--amber-primary)', fontWeight: 700 }}>
            Active Spatial Node
          </span>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            ID: {activeNode.id}
          </span>
        </div>
        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          {activeNode.label}
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          {activeNode.description}
        </p>
      </div>

      {/* Directional Pad */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <button 
          className="btn btn-secondary"
          onClick={() => onNavigate('up')}
          aria-label="Traverse Up Branch"
          style={{ width: '130px' }}
        >
          <ArrowUp size={16} /> Up Branch
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn-secondary"
            onClick={() => onNavigate('left')}
            aria-label="Traverse Left Source Path"
            style={{ width: '130px' }}
          >
            <ArrowLeft size={16} /> West (Left)
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => onNavigate('right')}
            aria-label="Traverse Right Ground Path"
            style={{ width: '130px' }}
          >
            East (Right) <ArrowRight size={16} />
          </button>
        </div>

        <button 
          className="btn btn-secondary"
          onClick={() => onNavigate('down')}
          aria-label="Traverse Down Branch"
          style={{ width: '130px' }}
        >
          <ArrowDown size={16} /> Down Branch
        </button>
      </div>

      {/* Loop Cycle Trigger */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
        <button className="btn btn-outline" onClick={onCycleLoop} style={{ flex: 1, marginRight: '8px' }}>
          <RotateCcw size={15} />
          <span>{activeLoopName ? `Loop: ${activeLoopName}` : "Trace Kirchhoff Loop (Press L)"}</span>
        </button>
      </div>
    </div>
  );
};
