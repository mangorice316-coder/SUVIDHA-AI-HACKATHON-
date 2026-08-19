import React from 'react';
import { Eye, Volume2, VolumeX, Settings, Keyboard, User, LogOut } from 'lucide-react';
import { AccessibilitySettings, UserProfile } from '../../types/common';
import { audioEngine } from '../../services/audioEngine';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  settings: AccessibilitySettings;
  userProfile?: UserProfile | null;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  onOpenSettings: () => void;
  onOpenShortcuts: () => void;
  onSwitchProfile?: () => void;
  isLandingView?: boolean;
  onToggleLanding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  userProfile,
  onUpdateSettings,
  onOpenSettings,
  onOpenShortcuts,
  onSwitchProfile,
  isLandingView,
  onToggleLanding
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

  const getClassShortLabel = (cls?: string) => {
    if (!cls) return '';
    if (cls === 'class_12') return 'Cl.12';
    if (cls === 'class_11') return 'Cl.11';
    if (cls === 'class_10') return 'Cl.10';
    if (cls === 'college_ug') return 'College';
    return cls;
  };

  return (
    <header className="header-bar" role="banner">
      <div className="header-inner">
        {/* Brand with Animated Bespoke Logo */}
        <div className="brand-section" style={{ cursor: onToggleLanding ? 'pointer' : 'default' }} onClick={onToggleLanding}>
          <BrandLogo size="md" showText={true} animated={true} />
        </div>

        {/* Student Profile Capsule (if logged in) */}
        {userProfile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '999px',
            padding: '4px 12px',
            fontSize: '12px'
          }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--cyan-primary), var(--purple-primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 800, fontSize: '11px' }}>
              {userProfile.name.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{userProfile.name}</span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <span style={{ color: 'var(--cyan-primary)', fontWeight: 600 }}>
              {getClassShortLabel(userProfile.studentClass)} ({userProfile.board.toUpperCase()})
            </span>
            {onSwitchProfile && (
              <button
                onClick={onSwitchProfile}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '4px'
                }}
                title="Switch Student Profile"
                aria-label="Switch Student Profile"
              >
                <LogOut size={13} />
              </button>
            )}
          </div>
        )}

        {/* Learning Controls & Accessibility */}
        <div className="header-actions">
          {onToggleLanding && (
            <button
              className={`btn ${isLandingView ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '12px', padding: '6px 12px' }}
              onClick={onToggleLanding}
            >
              {isLandingView ? "Open Student Studio" : "Platform Overview"}
            </button>
          )}
          {/* Keyboard Shortcuts Trigger */}
          <button
            className="btn-icon"
            onClick={onOpenShortcuts}
            aria-label="View Keyboard Shortcuts (?)"
            title="Keyboard Shortcuts (Press ?)"
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
            aria-label="Open Settings"
            title="API & Audio Settings"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
