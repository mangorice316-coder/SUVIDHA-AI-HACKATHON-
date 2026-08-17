import React from 'react';
import { Sparkles, Layers, Box, Cpu } from 'lucide-react';

interface Icons8Props {
  name: string; // e.g. "physics", "chemistry", "brain", "accessibility"
  size?: number;
  alt?: string;
  fallbackIcon?: React.ReactNode;
}

export const Icons8Badge: React.FC<Icons8Props> = ({
  name,
  size = 24,
  alt = "Icon",
  fallbackIcon
}) => {
  // Icons8 CDN resolution with high-DPI SVG styling
  const iconUrl = `https://img.icons8.com/fluency/${size * 2}/000000/${name}.png`;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
      <img
        src={iconUrl}
        alt={alt}
        width={size}
        height={size}
        onError={(e) => {
          // Fallback seamlessly if offline
          e.currentTarget.style.display = 'none';
        }}
        style={{ objectFit: 'contain' }}
      />
      {fallbackIcon && (
        <span className="fallback-icon" style={{ display: 'none' }}>
          {fallbackIcon}
        </span>
      )}
    </div>
  );
};
