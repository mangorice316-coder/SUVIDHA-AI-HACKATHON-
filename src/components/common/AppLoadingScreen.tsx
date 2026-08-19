import React, { useEffect, useState } from 'react';
import { UserProfile } from '../../types/common';
import { BrandLogo } from './BrandLogo';
import { Sparkles, CheckCircle2, BookOpen, Globe, Cpu } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

interface AppLoadingScreenProps {
  profile: UserProfile;
  onComplete: () => void;
}

export const AppLoadingScreen: React.FC<AppLoadingScreenProps> = ({
  profile,
  onComplete
}) => {
  const [progress, setProgress] = useState<number>(10);
  const [currentStage, setCurrentStage] = useState<number>(1);

  const getLanguageName = (code: string) => {
    switch (code) {
      case 'ta': return 'Tamil (தமிழ்)';
      case 'hi': return 'Hindi (हिन्दी)';
      case 'te': return 'Telugu (తెలుగు)';
      case 'mr': return 'Marathi (मराठी)';
      case 'bn': return 'Bengali (বাংলা)';
      case 'kn': return 'Kannada (ಕನ್ನಡ)';
      default: return 'Regional Language';
    }
  };

  const getBoardLabel = (board: string) => {
    switch (board) {
      case 'cbse': return 'CBSE / NCERT';
      case 'state_board': return 'State Board';
      case 'icse_isc': return 'ICSE / ISC';
      case 'university': return 'Technical University';
      default: return 'Curriculum';
    }
  };

  const getClassLabel = (cls: string) => {
    switch (cls) {
      case 'class_9': return 'Class 9';
      case 'class_10': return 'Class 10';
      case 'class_11': return 'Class 11';
      case 'class_12': return 'Class 12';
      case 'college_ug': return 'College STEM';
      default: return 'Grade';
    }
  };

  useEffect(() => {
    audioEngine.speakAnnouncement(`Personalizing ${getBoardLabel(profile.board)} ${getClassLabel(profile.studentClass)} curriculum for ${profile.name} in ${getLanguageName(profile.homeLanguage)}.`);

    const timer1 = setTimeout(() => {
      setProgress(40);
      setCurrentStage(2);
    }, 450);

    const timer2 = setTimeout(() => {
      setProgress(75);
      setCurrentStage(3);
    }, 950);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setCurrentStage(4);
    }, 1450);

    const timer4 = setTimeout(() => {
      onComplete();
    }, 1850);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [profile, onComplete]);

  return (
    <div className="app-loading-screen" style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div className="card" style={{
        maxWidth: '520px',
        width: '100%',
        padding: '36px 28px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, rgba(14, 21, 37, 0.95), rgba(15, 23, 42, 0.98))',
        border: '1px solid var(--cyan-primary)',
        boxShadow: '0 12px 48px rgba(0, 229, 255, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        {/* Animated Hero Logo */}
        <BrandLogo size="hero" showText={false} animated={true} />

        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Setting Up Your Learning Space
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Welcome, <strong style={{ color: 'var(--cyan-primary)' }}>{profile.name}</strong>! 
            Customizing <strong style={{ color: 'var(--text-primary)' }}>{getBoardLabel(profile.board)} {getClassLabel(profile.studentClass)}</strong> syllabus in <strong style={{ color: 'var(--amber-primary)' }}>{getLanguageName(profile.homeLanguage)}</strong>.
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%' }}>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '999px',
            overflow: 'hidden',
            border: '1px solid var(--border-subtle)',
            marginBottom: '10px'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--cyan-primary), var(--purple-primary), var(--emerald-primary))',
              borderRadius: '999px',
              transition: 'width 0.4s ease-out'
            }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
            <span>{progress}% Loaded</span>
            <span>Optimizing Neural Concept Bridge</span>
          </div>
        </div>

        {/* Stage Status Indicator */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 16px',
          width: '100%',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontSize: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: currentStage >= 1 ? 'var(--emerald-primary)' : 'var(--text-muted)' }}>
            <CheckCircle2 size={14} />
            <span>Learner Profile Verified: <strong>{profile.name}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: currentStage >= 2 ? 'var(--emerald-primary)' : 'var(--text-muted)' }}>
            <CheckCircle2 size={14} />
            <span>Filtering {getBoardLabel(profile.board)} {getClassLabel(profile.studentClass)} STEM Textbook Lessons</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: currentStage >= 3 ? 'var(--emerald-primary)' : 'var(--text-muted)' }}>
            <CheckCircle2 size={14} />
            <span>Indexing {getLanguageName(profile.homeLanguage)} Vernacular Analogies & Proof Engines</span>
          </div>
        </div>
      </div>
    </div>
  );
};
