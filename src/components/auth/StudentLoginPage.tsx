import React, { useState } from 'react';
import { UserProfile, StudentClass, EducationBoard } from '../../types/common';
import { SupportedLanguage } from '../../types/translangua';
import { BrandLogo } from '../common/BrandLogo';
import { User, BookOpen, GraduationCap, Globe, ArrowRight, Sparkles, Check, School } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

interface StudentLoginPageProps {
  onLogin: (profile: UserProfile) => void;
  initialProfile?: UserProfile | null;
}

export const StudentLoginPage: React.FC<StudentLoginPageProps> = ({
  onLogin,
  initialProfile
}) => {
  const [name, setName] = useState<string>(initialProfile?.name || '');
  const [studentClass, setStudentClass] = useState<StudentClass>(initialProfile?.studentClass || 'class_12');
  const [board, setBoard] = useState<EducationBoard>(initialProfile?.board || 'cbse');
  const [homeLanguage, setHomeLanguage] = useState<SupportedLanguage>(initialProfile?.homeLanguage || 'ta');
  const [error, setError] = useState<string | null>(null);

  const classes: { id: StudentClass; label: string; desc: string }[] = [
    { id: 'class_10', label: 'Class 10', desc: 'Secondary Science & Math' },
    { id: 'class_11', label: 'Class 11', desc: 'Higher Secondary STEM Foundation' },
    { id: 'class_12', label: 'Class 12', desc: 'Senior Secondary & Board Exam Prep' },
    { id: 'college_ug', label: 'College STEM', desc: '1st/2nd Year Engineering & Science' }
  ];

  const boards: { id: EducationBoard; label: string; sub: string }[] = [
    { id: 'cbse', label: 'CBSE / NCERT', sub: 'National Curriculum' },
    { id: 'state_board', label: 'State Board', sub: 'State Secondary / HSC' },
    { id: 'icse_isc', label: 'ICSE / ISC', sub: 'Council for School Cert.' },
    { id: 'university', label: 'University / AICTE', sub: 'Higher Technical Education' }
  ];

  const languages: { code: SupportedLanguage; name: string; native: string }[] = [
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' }
  ];

  const handleQuickPreset = (pName: string, pClass: StudentClass, pBoard: EducationBoard, pLang: SupportedLanguage) => {
    setName(pName);
    setStudentClass(pClass);
    setBoard(pBoard);
    setHomeLanguage(pLang);
    setError(null);
    audioEngine.speakAnnouncement(`Loaded student preset for ${pName}.`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name to personalize your study space.");
      return;
    }

    const profile: UserProfile = {
      name: name.trim(),
      studentClass,
      board,
      homeLanguage,
      createdAt: new Date().toISOString()
    };

    onLogin(profile);
  };

  return (
    <div className="login-portal-wrapper" style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px'
    }}>
      <div className="card login-card" style={{
        maxWidth: '680px',
        width: '100%',
        padding: '32px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, rgba(14, 21, 37, 0.96), rgba(15, 23, 42, 0.98))',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
            <BrandLogo size="lg" showText={true} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
            Create Your Student Profile
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: '1.5' }}>
            Tell us your class, board, and mother tongue so we can personalize textbook lessons and concept bridges for you.
          </p>
        </div>

        {/* Quick Demo Student Presets */}
        <div style={{ marginBottom: '22px', backgroundColor: 'var(--bg-tertiary)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={13} color="var(--amber-primary)" />
            <span>Or click a sample student profile:</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              type="button"
              className="btn btn-outline"
              style={{ fontSize: '11px', padding: '4px 10px' }}
              onClick={() => handleQuickPreset("Priya", "class_12", "cbse", "ta")}
            >
              🎓 Priya (Class 12 CBSE • தமிழ்)
            </button>
            <button
              type="button"
              className="btn btn-outline"
              style={{ fontSize: '11px', padding: '4px 10px' }}
              onClick={() => handleQuickPreset("Rahul", "class_11", "state_board", "hi")}
            >
              🎓 Rahul (Class 11 State • हिन्दी)
            </button>
            <button
              type="button"
              className="btn btn-outline"
              style={{ fontSize: '11px', padding: '4px 10px' }}
              onClick={() => handleQuickPreset("Sneha", "class_10", "icse_isc", "te")}
            >
              🎓 Sneha (Class 10 ICSE • తెలుగు)
            </button>
          </div>
        </div>

        {/* Main Onboarding Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Input 1: Student Name */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              <User size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
              Student Name
            </label>
            <input
              type="text"
              className="search-input"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(null); }}
              placeholder="e.g. Aravind / Priya / Rahul"
              style={{ width: '100%', fontSize: '14px', padding: '10px 14px' }}
              autoFocus
            />
          </div>

          {/* Input 2: Select Class */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              <GraduationCap size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
              Select Class / Grade
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
              {classes.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  className={`btn ${studentClass === c.id ? 'btn-primary' : 'btn-outline'}`}
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '10px 12px',
                    textAlign: 'left',
                    gap: '2px'
                  }}
                  onClick={() => setStudentClass(c.id)}
                >
                  <span style={{ fontWeight: 800, fontSize: '13px' }}>{c.label}</span>
                  <span style={{ fontSize: '10px', opacity: 0.75 }}>{c.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input 3: Select Board */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              <School size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
              Select Education Board / Curriculum
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
              {boards.map((b) => (
                <button
                  type="button"
                  key={b.id}
                  className={`btn ${board === b.id ? 'btn-primary' : 'btn-outline'}`}
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '10px 12px',
                    textAlign: 'left',
                    gap: '2px'
                  }}
                  onClick={() => setBoard(b.id)}
                >
                  <span style={{ fontWeight: 800, fontSize: '13px' }}>{b.label}</span>
                  <span style={{ fontSize: '10px', opacity: 0.75 }}>{b.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input 4: Select Mother Tongue */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              <Globe size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
              Select Your Mother Tongue / Home Language
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {languages.map((l) => (
                <button
                  type="button"
                  key={l.code}
                  className={`btn ${homeLanguage === l.code ? 'btn-primary' : 'btn-outline'}`}
                  style={{ padding: '8px 10px', fontSize: '12px', justifyContent: 'center' }}
                  onClick={() => setHomeLanguage(l.code)}
                >
                  <span style={{ fontWeight: 700 }}>{l.native}</span>
                  <span style={{ fontSize: '10px', opacity: 0.75, marginLeft: '6px' }}>({l.name})</span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div style={{ color: 'var(--rose-primary)', fontSize: '12px', background: 'rgba(239, 68, 68, 0.15)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
              ⚠️ {error}
            </div>
          )}

          {/* Submit CTA */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              padding: '14px',
              fontSize: '15px',
              fontWeight: 800,
              justifyContent: 'center',
              marginTop: '8px'
            }}
          >
            <span>Start Personalized STEM Learning</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
