import React from 'react';
import { Eye, Volume2, VolumeX, FileText, Compass, Settings, Keyboard } from 'lucide-react';
import { AccessibilitySettings } from '../../types/common';
import { audioEngine } from '../../services/audioEngine';
import { Oscilloscope } from './Oscilloscope';

interface HeaderProps {
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  onOpenOnePager: () => void;
  onOpenJudgeGuide: () => void;
  onOpenSettings: () => void;
  onOpenShortcuts: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onUpdateSettings,
  onOpenOnePager,
  onOpenJudgeGuide,
  onOpenSettings,
  onOpenShortcuts
}) => {
  const toggleSound = () => {
    const next = !settings.soundEnabled;
    onUpdateSettings({ soundEnabled: next });
    audioEngine.setSoundEnabled(next);
    if (next) {
      audioEngine.speakAnnouncement("Spatial Audio and Sound enabled.");
    }
  };

  const toggleHighContrast = () => {
    const next = !settings.highContrast;
    onUpdateSettings({ highContrast: next });
    if (next) {
      document.body.classList.add('high-contrast');
      audioEngine.speakAnnouncement("High contrast mode active.");
    } else {
      document.body.classList.remove('high-contrast');
      audioEngine.speakAnnouncement("Standard contrast mode active.");
    }
  };

  return (
    <header className="header-bar" role="banner">
      <div className="header-inner">
        {/* Brand */}
        <div className="brand-section">
          <span className="brand-badge">SUVIDHA-AI</span>
          <div>
            <h1 className="brand-title">ULAE</h1>
            <span className="brand-subtitle">Universal Learning Access Engine</span>
          </div>
        </div>

        {/* Global Controls & Live Oscilloscope */}
        <div className="header-actions">
          {/* Live Audio Visualizer */}
          <Oscilloscope />

          {/* Judge Demo Guide Button */}
          <button 
            className="btn btn-accent" 
            onClick={onOpenJudgeGuide}
            aria-label="Open 2-Minute Judge Evaluation Guide"
            title="Interactive 2-Minute Demo Flow for Hackathon Judges"
          >
            <Compass size={16} />
            <span>2-Min Judge Guide</span>
          </button>

          {/* 1-Pager Pitch Document */}
          <button 
            className="btn btn-secondary" 
            onClick={onOpenOnePager}
            aria-label="View Official One-Pager Submission Document"
          >
            <FileText size={16} />
            <span>One-Pager</span>
          </button>

          {/* Keyboard Shortcuts Trigger */}
          <button
            className="btn-icon"
            onClick={onOpenShortcuts}
            aria-label="View Keyboard Shortcuts (?)"
            title="Keyboard Navigation Shortcuts (Press ?)"
          >
            <Keyboard size={18} />
          </button>

          {/* Sound Toggle */}
          <button 
            className={`btn-icon ${settings.soundEnabled ? 'active' : ''}`}
            onClick={toggleSound}
            aria-label={settings.soundEnabled ? "Disable Spatial Audio" : "Enable Spatial Audio"}
            title={settings.soundEnabled ? "Sound Enabled (Click to Mute)" : "Sound Muted (Click to Enable)"}
          >
            {settings.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* High Contrast Toggle */}
          <button 
            className={`btn-icon ${settings.highContrast ? 'active' : ''}`}
            onClick={toggleHighContrast}
            aria-label={settings.highContrast ? "Disable High Contrast" : "Enable High Contrast (WCAG AAA)"}
            title="Toggle High Contrast Mode (WCAG AAA)"
          >
            <Eye size={18} />
          </button>

          {/* Settings Modal Toggle */}
          <button 
            className="btn-icon"
            onClick={onOpenSettings}
            aria-label="Open API & Accessibility Settings"
            title="API Keys & Model Settings"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
