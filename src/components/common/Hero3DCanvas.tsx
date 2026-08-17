import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function RotatingCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * (hovered ? 1.2 : 0.4);
    meshRef.current.rotation.y += delta * (hovered ? 1.6 : 0.6);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.3 : 1.1}
      >
        <octahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial
          color={hovered ? "#00e5ff" : "#10b981"}
          emissive={hovered ? "#00e5ff" : "#059669"}
          emissiveIntensity={0.6}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export const Hero3DCanvas: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '140px', position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'radial-gradient(circle at center, hsla(190, 95%, 45%, 0.1) 0%, transparent 70%)' }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00e5ff" />
        <RotatingCore />
        <Sparkles count={35} scale={4} size={2} speed={0.4} color="#00e5ff" />
      </Canvas>
    </div>
  );
};
