import React, { useState } from 'react';
import { X, Copy, Check, Mail, Lightbulb, Sparkles } from 'lucide-react';
import { PreDraftedScript } from '../../types/pathweaver';
import { audioEngine } from '../../services/audioEngine';

interface ScriptModalProps {
  script: PreDraftedScript | null;
  onClose: () => void;
}

export const ScriptModal: React.FC<ScriptModalProps> = ({ script, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [variables, setVariables] = useState<Record<string, string>>({
    "Student Name": "Aravind Raman",
    "Student ID": "CS24B042"
  });

  if (!script) return null;

  let populatedBody = script.bodyText;
  Object.entries(variables).forEach(([key, val]) => {
    populatedBody = populatedBody.replace(new RegExp(`\\[${key}\\]`, 'g'), val || `[${key}]`);
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(`To: ${script.recipientEmailPlaceholder}\nSubject: ${script.subjectLine}\n\n${populatedBody}`);
    setCopied(true);
    audioEngine.speakAnnouncement("Email script copied to clipboard.");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="script-modal-title">
      <div className="modal-card" style={{ maxWidth: '640px' }}>
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mail size={20} color="var(--cyan-primary)" />
            <h3 id="script-modal-title" className="card-title" style={{ fontSize: '17px' }}>
              {script.title}
            </h3>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Close Script Modal">
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Recipient & Subject Header */}
          <div style={{ background: 'var(--bg-secondary)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '13px' }}>
            <div style={{ marginBottom: '6px' }}>
              <strong style={{ color: 'var(--text-muted)' }}>To:</strong> <code style={{ color: 'var(--cyan-primary)', fontFamily: 'var(--font-mono)' }}>{script.recipientEmailPlaceholder}</code>
            </div>
            <div>
              <strong style={{ color: 'var(--text-muted)' }}>Subject:</strong> <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{script.subjectLine}</span>
            </div>
          </div>

          {/* Populated Body Box */}
          <div style={{ position: 'relative' }}>
            <textarea
              readOnly
              value={populatedBody}
              rows={8}
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                lineHeight: '1.6',
                resize: 'none'
              }}
            />
          </div>

          {/* Neurodivergent Communication Tips */}
          <div style={{ background: 'hsla(43, 96%, 56%, 0.08)', border: '1px solid hsla(43, 96%, 56%, 0.3)', padding: '12px 14px', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--amber-primary)', fontWeight: 700, fontSize: '12px', marginBottom: '6px' }}>
              <Lightbulb size={15} />
              <span>Social Anxiety & Communication Guidelines</span>
            </div>
            <ul style={{ paddingLeft: '18px', fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {script.neurodivergentCommunicationTips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>

          {/* Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-primary" onClick={handleCopy}>
              {copied ? <><Check size={15} /> Copied to Clipboard!</> : <><Copy size={15} /> Copy Full Script</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
