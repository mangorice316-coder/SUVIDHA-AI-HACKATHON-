import React, { useState, useEffect } from 'react';
import { ActiveModule, AccessibilitySettings } from './types/common';
import { Header } from './components/common/Header';
import { ModuleNav } from './components/common/ModuleNav';
import { OnePagerModal } from './components/common/OnePagerModal';
import { JudgeWalkthrough } from './components/common/JudgeWalkthrough';
import { SettingsModal } from './components/common/SettingsModal';
import { KeyboardCheatSheet } from './components/common/KeyboardCheatSheet';
import { TopoSTEMView } from './components/topostem/TopoSTEMView';
import { TransLanguaView } from './components/translangua/TransLanguaView';
import { PathWeaverView } from './components/pathweaver/PathWeaverView';
import { audioEngine } from './services/audioEngine';

export const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ActiveModule>('topostem');
  const [isOnePagerOpen, setIsOnePagerOpen] = useState<boolean>(false);
  const [isJudgeGuideOpen, setIsJudgeGuideOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);

  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    soundEnabled: true,
    screenReaderVerbose: true,
    fontSize: 'normal'
  });

  // Global Key Shortcut Listener (1, 2, 3, ?)
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in form inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === '1') {
        setActiveModule('topostem');
        audioEngine.speakAnnouncement("Switched to TopoSTEM: Spatial Audio and Visual Representation Module.");
      } else if (e.key === '2') {
        setActiveModule('translangua');
        audioEngine.speakAnnouncement("Switched to TransLanguaSTEM: Academic Register and Translanguaging Module.");
      } else if (e.key === '3') {
        setActiveModule('pathweaver');
        audioEngine.speakAnnouncement("Switched to PathWeaver: Hidden Curriculum and Action DAG Module.");
      } else if (e.key === '?') {
        setIsShortcutsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  const handleUpdateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="app-container">
      {/* Universal Header */}
      <Header
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenOnePager={() => setIsOnePagerOpen(true)}
        onOpenJudgeGuide={() => setIsJudgeGuideOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Tri-Pillar Navigation Tabs */}
      <ModuleNav
        activeModule={activeModule}
        onSelectModule={(mod) => {
          setActiveModule(mod);
          audioEngine.speakAnnouncement(`Loaded ${mod.toUpperCase()} Module.`);
        }}
      />

      {/* Main Content Area */}
      <main className="main-content" role="main">
        {activeModule === 'topostem' && <TopoSTEMView />}
        {activeModule === 'translangua' && <TransLanguaView />}
        {activeModule === 'pathweaver' && <PathWeaverView />}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', padding: '20px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <strong>SUVIDHA ULAE</strong> — Built for the <em>SUVIDHA AI Virtual Hackathon 2026</em>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>WCAG 2.1 AAA Compliant</span>
            <span>•</span>
            <span>100% Offline-Resilient</span>
            <span>•</span>
            <button onClick={() => setIsOnePagerOpen(true)} style={{ color: 'var(--cyan-primary)', cursor: 'pointer' }}>
              Submission Dossier
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <OnePagerModal
        isOpen={isOnePagerOpen}
        onClose={() => setIsOnePagerOpen(false)}
      />

      <JudgeWalkthrough
        isOpen={isJudgeGuideOpen}
        onClose={() => setIsJudgeGuideOpen(false)}
        onSelectModule={(mod) => setActiveModule(mod)}
      />

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
