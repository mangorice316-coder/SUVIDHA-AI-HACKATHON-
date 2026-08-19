import React from 'react';
import { Award, BookCheck, Flame, Zap, BarChart3, TrendingUp, CheckCircle, Clock, BookOpen, Layers } from 'lucide-react';

export const LearningProgressView: React.FC = () => {
  return (
    <div className="tab-pane" role="tabpanel" id="panel-progress" aria-labelledby="tab-progress">
      {/* Top Banner */}
      <div className="card" style={{ marginBottom: '20px', background: 'linear-gradient(135deg, rgba(14, 21, 37, 0.95), rgba(15, 23, 42, 0.98))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="hero-pill-badge" style={{ fontSize: '10px' }}>Study Profile</span>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>My STEM Learning Dashboard</h2>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
              Track your concept mastery, translanguaged vocabulary words, and exam derivation practice.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="stat-capsule" style={{ padding: '8px 16px', borderColor: 'var(--amber-primary)' }}>
              <Flame size={18} color="var(--amber-primary)" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>5 Day Streak</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Daily Study Goal</div>
              </div>
            </div>
            <div className="stat-capsule" style={{ padding: '8px 16px', borderColor: 'var(--cyan-primary)' }}>
              <Zap size={18} color="var(--cyan-primary)" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>880 XP</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>STEM Mastery</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="metric-box">
          <div className="metric-header">
            <span className="metric-title">Concepts Mastered</span>
            <BookCheck size={16} color="var(--emerald-primary)" />
          </div>
          <div className="metric-value-row">
            <span className="metric-main-val">12</span>
            <span className="metric-sub-val">/ 15 NCERT Topics</span>
          </div>
          <p className="metric-footnote">
            Physics: Electrodynamics, Chemistry: Equilibrium, Bio: Action Potentials.
          </p>
        </div>

        <div className="metric-box">
          <div className="metric-header">
            <span className="metric-title">Vocabulary Anchors</span>
            <BookOpen size={16} color="var(--cyan-primary)" />
          </div>
          <div className="metric-value-row">
            <span className="metric-main-val">48</span>
            <span className="metric-sub-val">Academic Terms</span>
          </div>
          <p className="metric-footnote">
            Mapped across Tamil, Hindi, Telugu, and English.
          </p>
        </div>

        <div className="metric-box">
          <div className="metric-header">
            <span className="metric-title">Exam Derivations Solved</span>
            <Award size={16} color="var(--purple-primary)" />
          </div>
          <div className="metric-value-row">
            <span className="metric-main-val">8</span>
            <span className="metric-sub-val">100% Accuracy</span>
          </div>
          <p className="metric-footnote">
            Assembled using the interactive step-by-step proof lab.
          </p>
        </div>

        <div className="metric-box">
          <div className="metric-header">
            <span className="metric-title">Quick Check Quiz Score</span>
            <TrendingUp size={16} color="var(--amber-primary)" />
          </div>
          <div className="metric-value-row">
            <span className="metric-main-val">94%</span>
            <span className="metric-sub-val">Retention Rate</span>
          </div>
          <p className="metric-footnote">
            High retention when grounded in everyday physical analogies.
          </p>
        </div>
      </div>

      {/* Vocabulary Mastery Bank */}
      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="var(--cyan-primary)" />
            <h3 className="card-title">Recent STEM Vocabulary Bank</h3>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Updated live</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '8px 12px' }}>Formal English Term</th>
                <th style={{ padding: '8px 12px' }}>Mother Tongue Model</th>
                <th style={{ padding: '8px 12px' }}>Subject Domain</th>
                <th style={{ padding: '8px 12px' }}>Mastery Status</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--text-secondary)' }}>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Displacement Current (Id)</td>
                <td style={{ padding: '12px', color: 'var(--cyan-primary)' }}>மின்புல மாறுதலால் ஏற்படும் கற்பனை மின்னோட்டம்</td>
                <td style={{ padding: '12px' }}>Physics (NCERT 12)</td>
                <td style={{ padding: '12px' }}><span style={{ color: 'var(--emerald-primary)', fontWeight: 700 }}>● Mastered</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Dynamic Equilibrium</td>
                <td style={{ padding: '12px', color: 'var(--cyan-primary)' }}>இருபுறமும் சம வேகத்தில் நிகழும் இயங்கு சமநிலை</td>
                <td style={{ padding: '12px' }}>Chemistry (NCERT 11)</td>
                <td style={{ padding: '12px' }}><span style={{ color: 'var(--emerald-primary)', fontWeight: 700 }}>● Mastered</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Action Potential Depolarization</td>
                <td style={{ padding: '12px', color: 'var(--cyan-primary)' }}>சோடியம் வாயில்கள் திறந்து மின் அழுத்தம் தலைகீழாதல்</td>
                <td style={{ padding: '12px' }}>Biology (NCERT 12)</td>
                <td style={{ padding: '12px' }}><span style={{ color: 'var(--emerald-primary)', fontWeight: 700 }}>● Mastered</span></td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Dielectric Polarization (κ)</td>
                <td style={{ padding: '12px', color: 'var(--cyan-primary)' }}>மின் தகடுகளுக்கிடையே மின் தேக்கும் திறன் அதிகரிப்பு</td>
                <td style={{ padding: '12px' }}>Physics (NCERT 12)</td>
                <td style={{ padding: '12px' }}><span style={{ color: 'var(--amber-primary)', fontWeight: 700 }}>● In Progress</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
