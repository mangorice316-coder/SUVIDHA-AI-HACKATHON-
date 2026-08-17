import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Layers, MousePointer, Compass, Sparkles as SparklesIcon, 
  Eye, Code2, Play, CheckCircle2, ArrowDown, ChevronRight
} from 'lucide-react';

// 3D Scene Actor responding directly to scroll progress
function InteractiveScrollModel({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current || !ringRef.current) return;

    // Smooth lerp rotation based on scroll progress (0.0 to 1.0)
    const targetRotX = progress * Math.PI * 2.5;
    const targetRotY = progress * Math.PI * 4;
    const targetScale = 1.0 + Math.sin(progress * Math.PI) * 0.5;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.1);
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1));

    // Outer orbiting ring
    ringRef.current.rotation.z += delta * 0.8;
    ringRef.current.rotation.x = progress * Math.PI;
  });

  return (
    <group>
      {/* Central Morphing Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.3, 2]} />
        <MeshDistortMaterial
          color={progress > 0.6 ? "#10b981" : progress > 0.3 ? "#00e5ff" : "#a855f7"}
          emissive={progress > 0.6 ? "#059669" : progress > 0.3 ? "#0099b8" : "#6b21a8"}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          distort={0.3 + progress * 0.4}
          speed={2}
          wireframe={progress < 0.25}
        />
      </mesh>

      {/* Orbiting Spatial Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.0, 0.04, 16, 100]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.8} />
      </mesh>

      {/* Dynamic Particle Cloud */}
      <Sparkles
        count={50}
        scale={4.5}
        size={2 + progress * 3}
        speed={0.4 + progress * 0.6}
        color={progress > 0.5 ? "#10b981" : "#00e5ff"}
      />
    </group>
  );
}

export const ScrollDriven3DExperience: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track relative scroll progress inside this container
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const maxScroll = scrollHeight - clientHeight;
    const progress = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;
    setScrollProgress(progress);
  };

  const steps = [
    {
      pct: "0% — 25%",
      title: "Stage 1: The Raw Wireframe (The Barrier)",
      desc: "The 3D core starts in skeletal wireframe mode with low rotation velocity. Represents a learner encountering unfamiliar academic syntax without conceptual grounding.",
      color: "var(--purple-primary)"
    },
    {
      pct: "25% — 60%",
      title: "Stage 2: Morphing & Resonance (Translanguaging)",
      desc: "As scroll depth increases, the shader engages distortion noise and dynamic emission. Mother-tongue scaffolding activates spatial harmonics.",
      color: "var(--cyan-primary)"
    },
    {
      pct: "60% — 100%",
      title: "Stage 3: Crystalline Solidification (Access Restored)",
      desc: "The core solidifies into an emerald metallic lattice, ring trajectories lock into alignment, and full academic comprehension is achieved.",
      color: "var(--emerald-primary)"
    }
  ];

  return (
    <div style={{
      backgroundColor: 'var(--surface-bg)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--cyan-primary)', fontWeight: 800, letterSpacing: '1px' }}>
            Interactive 3D Scroll Architecture
          </span>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
            How 3D Scroll-Driven UI Works
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--card-bg)', padding: '6px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
          <Compass size={16} color="var(--cyan-primary)" />
          <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)' }}>
            Scroll Progress: {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>

      {/* Two-Column Interactive Demo Box */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        backgroundColor: 'var(--canvas-bg)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}>
        {/* Left: Sticky 3D WebGL Canvas */}
        <div style={{ height: '360px', position: 'relative', background: 'radial-gradient(circle at center, hsla(190, 95%, 45%, 0.12) 0%, transparent 70%)' }}>
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 4.8], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00e5ff" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#10b981" />
            <InteractiveScrollModel progress={scrollProgress} />
          </Canvas>

          {/* Interactive Hint */}
          <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', pointerEvents: 'none' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', backgroundColor: 'rgba(9, 13, 22, 0.8)', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
              WebGL 3D Viewport (Three.js + R3F)
            </span>
            <span style={{ fontSize: '11px', color: 'var(--emerald-primary)', fontWeight: 600 }}>
              60 FPS Reactive
            </span>
          </div>
        </div>

        {/* Right: Scrollable Storyline */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          style={{
            height: '360px',
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cyan-primary)', fontSize: '12px', fontWeight: 700 }}>
            <ArrowDown size={14} className="animate-bounce" />
            <span>Scroll inside this container to drive the 3D model:</span>
          </div>

          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--card-bg)',
                border: `1px solid ${scrollProgress >= (idx * 0.33) ? step.color : 'var(--border-color)'}`,
                borderLeft: `4px solid ${step.color}`,
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                transition: 'all 0.2s ease',
                opacity: scrollProgress >= (idx * 0.3) ? 1 : 0.6
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: step.color, textTransform: 'uppercase' }}>
                  {step.pct}
                </span>
                {scrollProgress >= (idx * 0.33) && (
                  <CheckCircle2 size={14} color={step.color} />
                )}
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {step.title}
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </div>
          ))}

          {/* Code Recipe */}
          <div style={{ backgroundColor: 'rgba(0, 229, 255, 0.05)', border: '1px dashed var(--cyan-primary)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--cyan-primary)', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              <Code2 size={14} />
              <span>The 4-Line Math Recipe</span>
            </div>
            <pre style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', margin: 0, overflowX: 'auto', lineHeight: 1.5 }}>
{`// 1. Normalized progress: t in [0, 1]
const targetRotX = t * Math.PI * 2;
// 2. Smooth lerp inside useFrame
mesh.rotation.x = THREE.MathUtils.lerp(
  mesh.rotation.x, targetRotX, delta * 4
);`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
