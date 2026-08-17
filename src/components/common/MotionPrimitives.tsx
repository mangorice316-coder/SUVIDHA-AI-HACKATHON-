import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ============================================================================
// 1. MOTION PRIMITIVES: SPOTLIGHT CARD (Mouse-Following Radial Light)
// ============================================================================
interface SpotlightCardProps {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  spotlightColor = 'rgba(0, 229, 255, 0.12)',
  style
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      style={{
        position: 'relative',
        backgroundColor: 'var(--surface-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        padding: '16px',
        ...style
      }}
    >
      {/* Dynamic Radial Spotlight */}
      <div
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          opacity,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

// ============================================================================
// 2. MOTION PRIMITIVES: MAGNETIC BUTTON (Cursor Gravitational Pull)
// ============================================================================
interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  strength?: number;
  style?: React.CSSProperties;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  strength = 0.3,
  style
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="btn"
    >
      {children}
    </motion.button>
  );
};

// ============================================================================
// 3. MOTION PRIMITIVES: ANIMATED TABS (LayoutId Spring Pill)
// ============================================================================
interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export const AnimatedTabs: React.FC<{
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}> = ({ tabs, activeId, onChange }) => {
  return (
    <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--canvas-bg)', padding: '4px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
      {tabs.map((tab) => {
        const isActive = activeId === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              position: 'relative',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              color: isActive ? 'var(--cyan-primary)' : 'var(--text-muted)',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              zIndex: 1,
              transition: 'color 0.15s ease'
            }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'hsla(190, 95%, 45%, 0.15)',
                  border: '1px solid var(--cyan-primary)',
                  borderRadius: 'var(--radius-full)',
                  zIndex: -1
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              />
            )}
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
