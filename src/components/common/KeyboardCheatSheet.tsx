import React from 'react';
import { X, Keyboard, Volume2, Globe, GitFork } from 'lucide-react';

interface KeyboardCheatSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardCheatSheet: React.FC<KeyboardCheatSheetProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="shortcuts-title">
      <div className="modal-card" style={{ maxWidth: '600px' }}>
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Keyboard size={20} color="var(--cyan-primary)" />
            <h3 id="shortcuts-title" className="card-title" style={{ fontSize: '18px' }}>
              Universal Keyboard Navigation Shortcuts (WCAG 2.1 AAA)
            </h3>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Close Shortcuts Modal">
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
          {/* Global Hotkeys */}
          <div>
            <div style={{ fontWeight: 700, color: 'var(--amber-primary)', marginBottom: '8px' }}>
              Study Mode Shortcuts
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '8px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
              <kbd style={{ background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>1</kbd>
              <span><strong>Concept Bridge</strong> (NCERT Textbook Lessons)</span>

              <kbd style={{ background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>2</kbd>
              <span><strong>Diagram & Circuit Lab</strong> (Spatial Audio Visualizer)</span>

              <kbd style={{ background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>3</kbd>
              <span><strong>Derivation Practice</strong> (Exam Proof Solver)</span>

              <kbd style={{ background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>4</kbd>
              <span><strong>AI Lesson Scanner</strong> (Paste Custom Notes)</span>

              <kbd style={{ background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>5</kbd>
              <span><strong>My Progress</strong> (Mastery & Vocabulary Bank)</span>

              <kbd style={{ background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>?</kbd>
              <span>Open this Keyboard Accessibility Guide</span>
            </div>
          </div>

          {/* TopoSTEM Hotkeys */}
          <div>
            <div style={{ fontWeight: 700, color: 'var(--cyan-primary)', marginBottom: '8px' }}>
              TopoSTEM Spatial Directional Matrix
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
              <kbd style={{ background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>Arrow Keys</kbd>
              <span>Traverse physically connected branches with stereo panned audio</span>

              <kbd style={{ background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>L</kbd>
              <span>Announce and cycle through closed Kirchhoff / In-Order loops</span>

              <kbd style={{ background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>Spacebar</kbd>
              <span>Trigger instant Relational Natural Language Query console</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button className="btn btn-primary" onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
