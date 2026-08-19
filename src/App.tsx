import React, { useState, useEffect } from 'react';
import { AccessibilitySettings, UserProfile } from './types/common';
import { SupportedLanguage } from './types/translangua';
import { Header } from './components/common/Header';
import { LandingPage } from './components/landing/LandingPage';
import { StudentLoginPage } from './components/auth/StudentLoginPage';
import { AppLoadingScreen } from './components/common/AppLoadingScreen';
import { SubjectSelectScreen, SubjectOption } from './components/subject_select/SubjectSelectScreen';
import { SubjectStudyView } from './components/subject_study/SubjectStudyView';
import { AdaptiveWorkflowStudio } from './components/workflow/AdaptiveWorkflowStudio';
import { SettingsModal } from './components/common/SettingsModal';
import { KeyboardCheatSheet } from './components/common/KeyboardCheatSheet';
import { audioEngine } from './services/audioEngine';

const STORAGE_KEY_PROFILE = 'suvidha_stem_user_profile';

export const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLandingView, setIsLandingView] = useState<boolean>(() => {
    // Show landing view by default if no user profile exists
    return !localStorage.getItem(STORAGE_KEY_PROFILE);
  });

  const [isAdaptiveWorkflowOpen, setIsAdaptiveWorkflowOpen] = useState<boolean>(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false);
  const [pendingProfile, setPendingProfile] = useState<UserProfile | null>(null);

  const [selectedSubject, setSelectedSubject] = useState<SubjectOption | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('ta');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);

  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    soundEnabled: true,
    screenReaderVerbose: true,
    fontSize: 'normal'
  });

  // Sync home language with user profile
  useEffect(() => {
    if (userProfile?.homeLanguage) {
      setSelectedLanguage(userProfile.homeLanguage);
    }
  }, [userProfile]);

  // Global Key Shortcut Listener ('?', ESC)
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === '?') {
        setIsShortcutsOpen(prev => !prev);
      } else if (e.key === 'Escape' && selectedSubject) {
        setSelectedSubject(null);
        audioEngine.speakAnnouncement("Returned to Subject Selection menu.");
      }
    };

    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [selectedSubject]);

  const handleUpdateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleLogin = (profile: UserProfile) => {
    setPendingProfile(profile);
    setIsLoadingProfile(true);
    setIsLandingView(false);
  };

  const handleLoadingComplete = () => {
    if (pendingProfile) {
      setUserProfile(pendingProfile);
      setSelectedLanguage(pendingProfile.homeLanguage);
      try {
        localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(pendingProfile));
      } catch {
        // ignore localStorage errors
      }
    }
    setIsLoadingProfile(false);
    setPendingProfile(null);
  };

  const handleSwitchProfile = () => {
    setUserProfile(null);
    setSelectedSubject(null);
    try {
      localStorage.removeItem(STORAGE_KEY_PROFILE);
    } catch {
      // ignore
    }
    audioEngine.speakAnnouncement("Switched profile. Returning to student login.");
  };

  return (
    <div className="app-container">
      {/* Universal Learning Header */}
      <Header
        settings={settings}
        userProfile={userProfile}
        onUpdateSettings={handleUpdateSettings}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onSwitchProfile={userProfile ? handleSwitchProfile : undefined}
        isLandingView={isLandingView}
        onToggleLanding={() => {
          setIsLandingView(prev => !prev);
          audioEngine.speakAnnouncement(isLandingView ? "Entering Student Studio." : "Returned to Platform Overview.");
        }}
      />

      {/* Main Content Flow */}
      <main className="main-content" role="main">
        {isLandingView ? (
          /* Landing Page Overview */
          <LandingPage
            onStartLearning={() => {
              setIsLandingView(false);
              audioEngine.speakAnnouncement("Opening Student Studio.");
            }}
          />
        ) : isAdaptiveWorkflowOpen ? (
          /* Adaptive Diagnostic & Goal Onboarding Studio */
          <AdaptiveWorkflowStudio
            onCompleteWorkflow={(goalData) => {
              setIsAdaptiveWorkflowOpen(false);
              if (!userProfile) {
                const autoProfile: UserProfile = {
                  name: 'Alex Scholar',
                  studentClass: 'class_12',
                  board: 'cbse',
                  homeLanguage: selectedLanguage,
                  goalSubject: goalData.subject,
                  createdAt: new Date().toISOString()
                };
                setUserProfile(autoProfile);
                try {
                  localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(autoProfile));
                } catch {}
              }
              // Launch directly into the primary physics module
              setSelectedSubject({
                id: 'physics_12',
                name: 'Physics',
                domain: 'Electrodynamics & EM Waves',
                grade: 'Class 12 (CBSE / NCERT)',
                icon: 'physics',
                title: "Maxwell's Displacement Current & Induction",
                summary: 'Understand magnetic field continuity across capacitor gaps and derive the modified Ampere-Maxwell Law.',
                curriculum: 'CBSE Class 12 Physics — Chapter 8',
                defaultLanguage: selectedLanguage,
                studyKey: 'maxwell_displacement'
              });
            }}
            onCancel={() => setIsAdaptiveWorkflowOpen(false)}
          />
        ) : isLoadingProfile && pendingProfile ? (
          /* Phase 1: Animated Profile Loading Screen */
          <AppLoadingScreen
            profile={pendingProfile}
            onComplete={handleLoadingComplete}
          />
        ) : !userProfile ? (
          /* Phase 2: Student Login & Onboarding Screen */
          <StudentLoginPage
            onLogin={handleLogin}
            initialProfile={userProfile}
          />
        ) : !selectedSubject ? (
          /* Phase 3: Personalized Subject Selection Screen */
          <SubjectSelectScreen
            userProfile={userProfile}
            onSelectSubject={(subject) => {
              setSelectedSubject(subject);
              setSelectedLanguage(subject.defaultLanguage || userProfile.homeLanguage);
            }}
            selectedLanguage={selectedLanguage}
            onLanguageChange={(lang) => setSelectedLanguage(lang)}
            onSwitchProfile={handleSwitchProfile}
            onStartAdaptiveWorkflow={() => setIsAdaptiveWorkflowOpen(true)}
          />
        ) : (
          /* Phase 4: Dedicated Subject Study Screen */
          <SubjectStudyView
            subject={selectedSubject}
            onBackToSubjects={() => {
              setSelectedSubject(null);
              audioEngine.speakAnnouncement("Returned to Subject Selection screen.");
            }}
            selectedLanguage={selectedLanguage}
            onLanguageChange={(lang) => setSelectedLanguage(lang)}
          />
        )}
      </main>

      {/* Educational Footer */}
      <footer style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', padding: '20px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <strong>SUVIDHA STEM Learn</strong> — Multilingual Learning Access Platform for STEM Students
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>NCERT & State Board Aligned</span>
            <span>•</span>
            <span>WCAG 2.1 AAA Compliant</span>
            <span>•</span>
            <span>Tamil, Hindi, Telugu, Marathi, Bengali & Kannada</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <KeyboardCheatSheet
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
};

export default App;
