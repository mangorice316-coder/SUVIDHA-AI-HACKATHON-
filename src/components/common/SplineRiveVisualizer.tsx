import React, { Suspense, lazy } from 'react';
import { Box, Sparkles, Activity } from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { ShaderGradientCanvas } from './ShaderGradientCanvas';

// Lazy load Spline to prevent blocking initial load
const Spline = lazy(() => import('@splinetool/react-spline'));

interface VisualizerProps {
  type?: '3d-canvas' | 'shader-gradient' | 'spline';
  splineSceneUrl?: string;
  height?: number;
}

export const SplineRiveVisualizer: React.FC<VisualizerProps> = ({
  type = '3d-canvas',
  splineSceneUrl,
  height = 140
}) => {
  return (
    <div style={{ position: 'relative', width: '100%', height, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      {type === 'shader-gradient' && <ShaderGradientCanvas />}
      
      {type === '3d-canvas' && <Hero3DCanvas />}

      {type === 'spline' && splineSceneUrl && (
        <Suspense fallback={<Hero3DCanvas />}>
          <Spline scene={splineSceneUrl} />
        </Suspense>
      )}
    </div>
  );
};
