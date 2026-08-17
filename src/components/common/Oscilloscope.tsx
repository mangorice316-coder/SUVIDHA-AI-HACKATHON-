import React, { useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';

export const Oscilloscope: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw baseline grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Draw animated harmonic wave
      ctx.strokeStyle = 'hsl(190, 95%, 45%)';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'hsla(190, 95%, 45%, 0.5)';
      ctx.beginPath();

      const sliceWidth = canvas.width / 60;
      let x = 0;

      for (let i = 0; i < 60; i++) {
        const y = canvas.height / 2 + Math.sin(i * 0.2 + phase) * 12 * Math.cos(i * 0.05 + phase * 0.5);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      phase += 0.05;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-tertiary)', padding: '4px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
      <Activity size={14} color="var(--cyan-primary)" />
      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)' }}>Audio Sonifier</span>
      <canvas ref={canvasRef} width={80} height={20} style={{ display: 'block' }} />
    </div>
  );
};
