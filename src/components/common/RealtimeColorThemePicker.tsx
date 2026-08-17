import React, { useState, useEffect } from 'react';
import { Palette, Check, RefreshCw, Sliders } from 'lucide-react';

interface ColorPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  canvas: string;
  surface: string;
}

const PALETTES: ColorPalette[] = [
  {
    id: 'cyber-cyan',
    name: 'Cyber Cyan (Default STEM)',
    primary: '#00e5ff',
    secondary: '#10b981',
    accent: '#a855f7',
    canvas: '#090d16',
    surface: '#111827'
  },
  {
    id: 'emerald-science',
    name: 'Emerald BioLab',
    primary: '#10b981',
    secondary: '#00e5ff',
    accent: '#f59e0b',
    canvas: '#06130e',
    surface: '#0d221a'
  },
  {
    id: 'warm-amber',
    name: 'Warm Physics Amber',
    primary: '#f59e0b',
    secondary: '#00e5ff',
    accent: '#10b981',
    canvas: '#140f07',
    surface: '#241b0d'
  },
  {
    id: 'minimal-slate',
    name: 'Minimal Slate',
    primary: '#38bdf8',
    secondary: '#94a3b8',
    accent: '#64748b',
    canvas: '#0f172a',
    surface: '#1e293b'
  }
];

export const RealtimeColorThemePicker: React.FC = () => {
  const [activePalette, setActivePalette] = useState<string>('cyber-cyan');

  const applyPalette = (pal: ColorPalette) => {
    setActivePalette(pal.id);
    document.documentElement.style.setProperty('--cyan-primary', pal.primary);
    document.documentElement.style.setProperty('--emerald-primary', pal.secondary);
    document.documentElement.style.setProperty('--purple-primary', pal.accent);
    document.documentElement.style.setProperty('--canvas-bg', pal.canvas);
    document.documentElement.style.setProperty('--surface-bg', pal.surface);
  };

  return (
    <div style={{
      backgroundColor: 'var(--surface-bg)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Palette size={18} color="var(--cyan-primary)" />
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
          Realtime Colors Engine:
        </span>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        {PALETTES.map((pal) => {
          const isActive = activePalette === pal.id;
          return (
            <button
              key={pal.id}
              onClick={() => applyPalette(pal)}
              style={{
                backgroundColor: isActive ? 'var(--card-bg)' : 'transparent',
                border: `1px solid ${isActive ? pal.primary : 'var(--border-color)'}`,
                borderRadius: 'var(--radius-full)',
                padding: '5px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {/* 3-Color Swatch Dots */}
              <div style={{ display: 'flex', gap: '3px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: pal.primary }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: pal.secondary }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: pal.canvas, border: '1px solid #444' }} />
              </div>
              <span style={{ fontSize: '12px', color: isActive ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: isActive ? 700 : 500 }}>
                {pal.name}
              </span>
              {isActive && <Check size={12} color={pal.primary} />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
