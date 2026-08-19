import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
  animated?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  animated = true
}) => {
  const getDimensions = () => {
    switch (size) {
      case 'sm': return { iconSize: 28, textScale: '14px', subScale: '10px' };
      case 'lg': return { iconSize: 48, textScale: '22px', subScale: '12px' };
      case 'hero': return { iconSize: 64, textScale: '28px', subScale: '14px' };
      default: return { iconSize: 36, textScale: '18px', subScale: '11px' };
    }
  };

  const { iconSize, textScale, subScale } = getDimensions();

  return (
    <div className={`brand-logo-wrapper brand-logo-${size}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
      {/* Bespoke Geometric SVG Logo Icon */}
      <div 
        className={`brand-logo-icon-box ${animated ? 'logo-pulse-glow' : ''}`}
        style={{
          width: iconSize,
          height: iconSize,
          borderRadius: '10px',
          background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(168, 85, 247, 0.25))',
          border: '1.5px solid var(--cyan-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 16px rgba(0, 229, 255, 0.25)',
          position: 'relative',
          flexShrink: 0
        }}
      >
        <svg 
          width={iconSize * 0.65} 
          height={iconSize * 0.65} 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Orbital Orbit Ring */}
          <ellipse 
            cx="20" 
            cy="20" 
            rx="16" 
            ry="7" 
            stroke="var(--cyan-primary)" 
            strokeWidth="2.5" 
            strokeDasharray="4 2"
            transform="rotate(-28 20 20)" 
          />
          
          {/* Crossing Interlocking Arch / Bridge */}
          <ellipse 
            cx="20" 
            cy="20" 
            rx="16" 
            ry="7" 
            stroke="var(--purple-primary)" 
            strokeWidth="2.5" 
            strokeDasharray="4 2"
            transform="rotate(32 20 20)" 
          />

          {/* Central Radiant Nucleus */}
          <circle cx="20" cy="20" r="5" fill="var(--cyan-primary)" />
          <circle cx="20" cy="20" r="2.5" fill="#ffffff" />
          
          {/* Synapse Connection Dots */}
          <circle cx="9" cy="14" r="2" fill="var(--amber-primary)" />
          <circle cx="31" cy="26" r="2" fill="var(--emerald-primary)" />
        </svg>
      </div>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ 
              fontWeight: 900, 
              fontSize: textScale, 
              letterSpacing: '-0.5px',
              background: 'linear-gradient(90deg, #ffffff, var(--cyan-primary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              LearnCraft
            </span>
            <span style={{
              fontSize: '10px',
              fontWeight: 800,
              padding: '1px 6px',
              borderRadius: '4px',
              backgroundColor: 'var(--cyan-primary)',
              color: '#000',
              textTransform: 'uppercase'
            }}>
              STEM
            </span>
          </div>
          <span style={{ fontSize: subScale, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.2px' }}>
            Multilingual Concept Engine
          </span>
        </div>
      )}
    </div>
  );
};
