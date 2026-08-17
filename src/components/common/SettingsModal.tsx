import React, { useState } from 'react';
import { X, Key, ShieldCheck, Cpu, Check } from 'lucide-react';
import { geminiService } from '../../services/gemini';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState<string>(geminiService.getApiKey());
  const [saved, setSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    geminiService.setApiKey(apiKey);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="settings-title">
      <div className="modal-card" style={{ maxWidth: '560px' }}>
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu size={20} color="var(--cyan-primary)" />
            <h2 id="settings-title" className="card-title" style={{ fontSize: '18px' }}>
              AI Engine & API Configuration
            </h2>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Close Settings">
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-primary)', fontWeight: 600, marginBottom: '4px' }}>
              <ShieldCheck size={16} /> Instant Offline Fixture Engine Active
            </div>
            SUVIDHA ULAE runs 100% reliably out of the box with zero configuration using deterministic high-fidelity benchmark fixtures. An API key is optional for custom live image/text prompts.
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
              Google Gemini API Key (Optional for live custom parsing):
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                style={{
                  width: '100%',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  fontFamily: 'var(--font-mono)'
                }}
              />
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
              Keys are stored strictly in local browser memory and never transmitted to external servers.
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              {saved ? <><Check size={16} /> Saved!</> : <><Key size={16} /> Save Configuration</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
