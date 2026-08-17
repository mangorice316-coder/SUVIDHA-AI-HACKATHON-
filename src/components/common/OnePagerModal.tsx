import React from 'react';
import { X, CheckCircle2, Target, Zap, Shield, BookOpen } from 'lucide-react';

interface OnePagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnePagerModal: React.FC<OnePagerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="onepager-title">
      <div className="modal-card">
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="judge-tag">Official Submission</span>
            <h2 id="onepager-title" className="card-title" style={{ fontSize: '20px' }}>
              SUVIDHA ULAE — Executive One-Pager
            </h2>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Close One-Pager">
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Section 1: Who We Built For */}
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '15px', color: 'var(--cyan-primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Target size={18} /> 1. WHO WE BUILT FOR (The Excluded Learners)
            </h3>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.7' }}>
              <li><strong>Blind / Low-Vision STEM Students:</strong> Excluded from circuit, vector, and geometry problems because screen readers flatten 2D spatial diagrams into 200-word linear paragraphs.</li>
              <li><strong>Regional-Medium STEM Learners:</strong> Excluded from formal scientific proofs because textbooks and exams demand the formal academic English register, while translation tools bypass English and generate technical gibberish.</li>
              <li><strong>Autistic & Neurodivergent Scholars:</strong> Excluded from lab access and testing accommodations because administrative policies hide unwritten social expectations across multi-department PDF handbooks.</li>
            </ul>
          </div>

          {/* Section 2: The Structural Barrier We Remove */}
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '15px', color: 'var(--emerald-primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Shield size={18} /> 2. THE STRUCTURAL BARRIERS WE REMOVE
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.7' }}>
              We do not build generic chatbots. We eliminate the three flawed assumptions that define modern EdTech:
              <br />
              <strong>(A) The Visual Flaw:</strong> Assuming audio text is equivalent to spatial exploration.
              <br />
              <strong>(B) The Linguistic Flaw:</strong> Assuming dictionary translation equals academic register mastery.
              <br />
              <strong>(C) The Institutional Flaw:</strong> Assuming all students possess intuitive institutional knowledge.
            </p>
          </div>

          {/* Section 3: How It Works (The 3 Modules) */}
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '15px', color: 'var(--amber-primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Zap size={18} /> 3. HOW IT WORKS (The Tri-Pillar Engine)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '10px', marginTop: '8px' }}>
              <div style={{ background: 'var(--bg-tertiary)', padding: '10px', borderRadius: 'var(--radius-sm)', fontSize: '12px' }}>
                <strong style={{ color: 'var(--cyan-primary)' }}>TopoSTEM</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>VLM parses raster circuits into non-linear topological graphs with directional spatial audio & keyboard navigation.</p>
              </div>
              <div style={{ background: 'var(--bg-tertiary)', padding: '10px', borderRadius: 'var(--radius-sm)', fontSize: '12px' }}>
                <strong style={{ color: 'var(--emerald-primary)' }}>TransLanguaSTEM</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Dual-layer translanguaging anchors regional mother-tongue intuition directly to formal academic English proofs.</p>
              </div>
              <div style={{ background: 'var(--bg-tertiary)', padding: '10px', borderRadius: 'var(--radius-sm)', fontSize: '12px' }}>
                <strong style={{ color: 'var(--amber-primary)' }}>PathWeaver</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Compiles unstructured 40-page university PDF policies into deterministic Directed Acyclic Action Graphs (DAGs).</p>
              </div>
            </div>
          </div>

          {/* Section 4: Measurable Impact & Live Verification */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'hsla(190, 95%, 45%, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--cyan-primary)' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>
              <strong>WCAG 2.1 AAA Compliant</strong> • 100% Offline-Resilient • Zero Setup Required
            </div>
            <button className="btn btn-primary" onClick={onClose}>
              Explore Live Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
