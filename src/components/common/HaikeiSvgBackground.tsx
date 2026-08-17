import React from 'react';

interface HaikeiBackgroundProps {
  type?: 'layered-waves' | 'blob-mesh' | 'low-poly';
  opacity?: number;
}

export const HaikeiSvgBackground: React.FC<HaikeiBackgroundProps> = ({
  type = 'layered-waves',
  opacity = 0.35
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        opacity
      }}
    >
      {type === 'layered-waves' && (
        <svg
          viewBox="0 0 900 600"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="haikei-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="haikei-grad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#090d16" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Layer 1 Wave */}
          <path
            d="M0,320 C180,240 320,380 500,310 C680,240 760,360 900,280 L900,600 L0,600 Z"
            fill="url(#haikei-grad1)"
          />

          {/* Layer 2 Wave */}
          <path
            d="M0,420 C220,360 380,480 580,410 C740,340 820,440 900,390 L900,600 L0,600 Z"
            fill="url(#haikei-grad2)"
          />
        </svg>
      )}
    </div>
  );
};
