import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { audioEngine } from '../../services/audioEngine';

interface Landing3DCanvasProps {
  focusedIndex?: number | null;
}

export const Landing3DCanvas: React.FC<Landing3DCanvasProps> = ({ focusedIndex }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const focusedIndexRef = useRef<number | null>(focusedIndex ?? null);

  useEffect(() => {
    focusedIndexRef.current = focusedIndex ?? null;
  }, [focusedIndex]);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- 1. Scene & Perspective Camera Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8.6);

    // --- 2. High-Performance WebGL Renderer ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    containerRef.current.appendChild(renderer.domElement);

    // --- 3. Master STEM 3D Space Group ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ========================================================
    // HELPER: Generate Floating Formula Hologram Badges
    // ========================================================
    const createFormulaHologram = (formulaText: string, accentColor: string): THREE.Mesh => {
      const canvas = document.createElement('canvas');
      canvas.width = 440;
      canvas.height = 140;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createLinearGradient(0, 0, 440, 140);
        grad.addColorStop(0, 'rgba(15, 23, 42, 0.92)');
        grad.addColorStop(1, 'rgba(2, 6, 23, 0.98)');
        ctx.fillStyle = grad;
        ctx.roundRect(10, 10, 420, 120, 28);
        ctx.fill();

        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 16;
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 4;
        ctx.roundRect(10, 10, 420, 120, 28);
        ctx.stroke();

        ctx.shadowBlur = 8;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(formulaText, 220, 70);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      const badgeGeom = new THREE.PlaneGeometry(0.9, 0.28);
      const badgeMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
      });
      return new THREE.Mesh(badgeGeom, badgeMat);
    };

    // ========================================================
    // 3D MODEL 1: Masterpiece Notebook + Organic Flutter + Floating Stylus Pen
    // ========================================================
    const leftPageRef = { current: null as THREE.Mesh | null };
    const rightPageRef = { current: null as THREE.Mesh | null };
    const ribbonRef = { current: null as THREE.Mesh | null };
    const penRef = { current: null as THREE.Group | null };

    const createMasterOpenBook = (): THREE.Group => {
      const bookGroup = new THREE.Group();
      bookGroup.name = "Textbook";
      
      const pageMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        emissive: 0x00e5ff,
        emissiveIntensity: 0.45,
        roughness: 0.3,
        metalness: 0.7
      });

      const coverMat = new THREE.MeshStandardMaterial({
        color: 0x0095f6,
        emissive: 0x00e5ff,
        emissiveIntensity: 0.75,
        roughness: 0.2,
        metalness: 0.85
      });

      // Left curved page block
      const leftPage = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.56, 0.035), pageMat);
      leftPage.position.set(-0.21, 0, 0.06);
      leftPage.rotation.y = 0.32;
      bookGroup.add(leftPage);
      leftPageRef.current = leftPage;

      // Right curved page block
      const rightPage = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.56, 0.035), pageMat);
      rightPage.position.set(0.21, 0, 0.06);
      rightPage.rotation.y = -0.32;
      bookGroup.add(rightPage);
      rightPageRef.current = rightPage;

      // Gilded Spine
      const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.56, 16), coverMat);
      bookGroup.add(spine);

      // Bookmark Ribbon
      const ribbon = new THREE.Mesh(
        new THREE.BoxGeometry(0.045, 0.38, 0.01),
        new THREE.MeshBasicMaterial({ color: 0xf59e0b })
      );
      ribbon.position.set(0, -0.18, 0.1);
      ribbon.rotation.x = 0.25;
      bookGroup.add(ribbon);
      ribbonRef.current = ribbon;

      // Floating Animated Fountain / Stylus Pen
      const penGroup = new THREE.Group();
      const penBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.45, 12),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2, emissive: 0x00e5ff, emissiveIntensity: 0.3 })
      );
      penGroup.add(penBody);

      const penNib = new THREE.Mesh(
        new THREE.ConeGeometry(0.02, 0.08, 12),
        new THREE.MeshBasicMaterial({ color: 0xf59e0b })
      );
      penNib.position.y = -0.26;
      penNib.rotation.x = Math.PI;
      penGroup.add(penNib);

      penGroup.position.set(0.12, 0.1, 0.22);
      penGroup.rotation.z = -0.4;
      bookGroup.add(penGroup);
      penRef.current = penGroup;

      // Floating equation plaque
      const formula = createFormulaHologram('E = -dΦ/dt', '#00e5ff');
      formula.position.set(0, 0.48, 0.15);
      bookGroup.add(formula);

      bookGroup.scale.set(1.15, 1.15, 1.15);
      return bookGroup;
    };

    // ========================================================
    // 3D MODEL 2: Academic Graduation Cap + Physics Pendulum Tassel
    // ========================================================
    const tasselRef = { current: null as THREE.Mesh | null };

    const createMasterGraduationCap = (): THREE.Group => {
      const capGroup = new THREE.Group();
      capGroup.name = "GraduationCap";

      // Top Mortarboard Diamond Board
      const board = new THREE.Mesh(
        new THREE.BoxGeometry(0.68, 0.032, 0.68),
        new THREE.MeshStandardMaterial({
          color: 0x1e1b4b,
          emissive: 0xa855f7,
          emissiveIntensity: 0.75,
          roughness: 0.2,
          metalness: 0.8
        })
      );
      board.rotation.y = Math.PI / 4;
      capGroup.add(board);

      // Skullcap Base
      const skull = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.26, 0.18, 20),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, emissive: 0x6366f1, emissiveIntensity: 0.45 })
      );
      skull.position.y = -0.1;
      capGroup.add(skull);

      // Center Pin
      const pin = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), new THREE.MeshBasicMaterial({ color: 0xf59e0b }));
      pin.position.y = 0.025;
      capGroup.add(pin);

      // Physics Pendulum Tassel
      const tassel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.02, 0.35, 10),
        new THREE.MeshBasicMaterial({ color: 0xf59e0b })
      );
      tassel.position.set(0.24, -0.12, 0.24);
      tassel.rotation.z = 0.35;
      capGroup.add(tassel);
      tasselRef.current = tassel;

      // Floating equation plaque
      const formula = createFormulaHologram('e^{iπ} + 1 = 0', '#a855f7');
      formula.position.set(0, 0.42, 0);
      capGroup.add(formula);

      capGroup.scale.set(1.15, 1.15, 1.15);
      return capGroup;
    };

    // ========================================================
    // 3D MODEL 3: Upright Chemistry Flask + Flowing Liquid + Bubbles
    // ========================================================
    const meniscusRef = { current: null as THREE.Mesh | null };
    const bubblesList: { mesh: THREE.Mesh; baseOffset: number; speed: number }[] = [];

    const createMasterChemistryFlask = (): THREE.Group => {
      const flaskGroup = new THREE.Group();
      flaskGroup.name = "ChemistryFlask";

      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x10b981,
        emissive: 0x059669,
        emissiveIntensity: 0.35,
        roughness: 0.05,
        metalness: 0.1,
        transmission: 0.75,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });

      // Conical Flask Body
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.44, 0.54, 24, 1, true), glassMat);
      flaskGroup.add(body);

      // Neck & Rim
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.28, 24, 1, true), glassMat);
      neck.position.y = 0.38;
      flaskGroup.add(neck);

      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.135, 0.018, 12, 24), glassMat);
      rim.rotation.x = Math.PI / 2;
      rim.position.y = 0.52;
      flaskGroup.add(rim);

      // Glowing Chemical Liquid Volume
      const fluid = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.41, 0.26, 20),
        new THREE.MeshStandardMaterial({
          color: 0x34d399,
          emissive: 0x10b981,
          emissiveIntensity: 1.25,
          roughness: 0.1
        })
      );
      fluid.position.y = -0.14;
      flaskGroup.add(fluid);

      // Liquid Meniscus Top Disk (sloshes with physics)
      const meniscus = new THREE.Mesh(
        new THREE.CircleGeometry(0.235, 20),
        new THREE.MeshBasicMaterial({ color: 0x6ee7b7, side: THREE.DoubleSide, transparent: true, opacity: 0.9 })
      );
      meniscus.rotation.x = -Math.PI / 2;
      meniscus.position.y = -0.01;
      flaskGroup.add(meniscus);
      meniscusRef.current = meniscus;

      // 8 Rising Micro-Bubbles
      for (let b = 0; b < 8; b++) {
        const bubble = new THREE.Mesh(
          new THREE.SphereGeometry(0.022 + (b % 3) * 0.008, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0xa7f3d0, transparent: true, opacity: 0.85 })
        );
        bubble.position.set(
          (Math.sin(b * 1.5) * 0.18),
          -0.2 + (b / 8) * 0.25,
          (Math.cos(b * 1.5) * 0.18)
        );
        flaskGroup.add(bubble);
        bubblesList.push({ mesh: bubble, baseOffset: b * 0.35, speed: 0.4 + (b % 4) * 0.2 });
      }

      const formula = createFormulaHologram('ΔG° = -RT ln K', '#10b981');
      formula.position.set(0, 0.72, 0);
      flaskGroup.add(formula);

      flaskGroup.scale.set(1.15, 1.15, 1.15);
      return flaskGroup;
    };

    // ========================================================
    // 3D MODEL 4: Bohr Atomic Model with Pulsing Nucleus
    // ========================================================
    const createMasterAtomModel = (): THREE.Group => {
      const atomGroup = new THREE.Group();
      atomGroup.name = "AtomModel";

      const nucleus = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 20, 20),
        new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          emissive: 0xf59e0b,
          emissiveIntensity: 1.3,
          roughness: 0.1
        })
      );
      atomGroup.add(nucleus);

      const ringMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.8 });
      
      const r1 = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.015, 12, 50), ringMat);
      r1.rotation.x = Math.PI / 3;
      atomGroup.add(r1);

      const r2 = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.015, 12, 50), ringMat);
      r2.rotation.y = Math.PI / 3;
      atomGroup.add(r2);

      const r3 = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.015, 12, 50), ringMat);
      r3.rotation.z = Math.PI / 3;
      atomGroup.add(r3);

      const eGeom = new THREE.SphereGeometry(0.045, 10, 10);
      const eMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const e1 = new THREE.Mesh(eGeom, eMat);
      e1.position.set(0.55, 0, 0);
      atomGroup.add(e1);

      const e2 = new THREE.Mesh(eGeom, eMat);
      e2.position.set(0, 0.55, 0);
      atomGroup.add(e2);

      const formula = createFormulaHologram('iℏ ∂Ψ/∂t = ĤΨ', '#00e5ff');
      formula.position.set(0, 0.72, 0);
      atomGroup.add(formula);

      atomGroup.scale.set(1.15, 1.15, 1.15);
      return atomGroup;
    };

    // ========================================================
    // 3D MODEL 5: Living DNA Double Helix + Sinuous Traveling Wave
    // ========================================================
    const dnaRungsList: { node1: THREE.Mesh; node2: THREE.Mesh; rung: THREE.Mesh; y: number; index: number }[] = [];

    const createMasterDnaModel = (): THREE.Group => {
      const dnaGroup = new THREE.Group();
      dnaGroup.name = "DnaHelix";
      const rungCount = 8;
      const rungHeight = 0.11;

      for (let i = 0; i < rungCount; i++) {
        const y = (i - rungCount / 2) * rungHeight;
        const angle = i * 0.65;

        // Base pair nodes
        const nodeGeom = new THREE.SphereGeometry(0.05, 12, 12);
        const n1 = new THREE.Mesh(nodeGeom, new THREE.MeshBasicMaterial({ color: 0x00e5ff }));
        n1.position.set(Math.cos(angle) * 0.26, y, Math.sin(angle) * 0.26);
        dnaGroup.add(n1);

        const n2 = new THREE.Mesh(nodeGeom, new THREE.MeshBasicMaterial({ color: 0xa855f7 }));
        n2.position.set(-Math.cos(angle) * 0.26, y, -Math.sin(angle) * 0.26);
        dnaGroup.add(n2);

        // Hydrogen bridge rung
        const rung = new THREE.Mesh(
          new THREE.CylinderGeometry(0.012, 0.012, 0.52, 8),
          new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.75 })
        );
        rung.position.set(0, y, 0);
        rung.rotation.z = Math.PI / 2;
        rung.rotation.y = angle;
        dnaGroup.add(rung);

        dnaRungsList.push({ node1: n1, node2: n2, rung, y, index: i });
      }

      const formula = createFormulaHologram('DNA Base: A-T / G-C', '#a855f7');
      formula.position.set(0, 0.68, 0);
      dnaGroup.add(formula);

      dnaGroup.scale.set(1.15, 1.15, 1.15);
      return dnaGroup;
    };

    // ========================================================
    // 3D MODEL 6: Continuous Connected Optics Prism & Spectral Fan
    // ========================================================
    const createMasterPrismModel = (): THREE.Group => {
      const prismGroup = new THREE.Group();
      prismGroup.name = "OpticsPrism";

      // 1. Equilateral Triangular Glass Prism
      const prism = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.42, 0.58, 3),
        new THREE.MeshPhysicalMaterial({
          color: 0x00e5ff,
          emissive: 0x00e5ff,
          emissiveIntensity: 0.35,
          roughness: 0.05,
          metalness: 0.1,
          transmission: 0.8,
          transparent: true,
          opacity: 0.88
        })
      );
      prismGroup.add(prism);

      // Fixed Key Coordinates for Exact Physical Connection:
      const entryPt = new THREE.Vector3(-0.21, 0, 0);   // Exact entrance vertex on left facet
      const exitPt = new THREE.Vector3(0.21, 0, 0);     // Exact exit vertex on right facet
      const sourcePt = new THREE.Vector3(-1.0, 0.45, 0); // External golden laser source

      // 2. Incident Light Beam (Source -> Entry Point)
      const incidentLength = sourcePt.distanceTo(entryPt);
      const inRayGeom = new THREE.CylinderGeometry(0.014, 0.014, incidentLength, 8);
      const inRayMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
      const inRay = new THREE.Mesh(inRayGeom, inRayMat);
      
      // Position and orient incident beam precisely between sourcePt and entryPt
      const inMid = new THREE.Vector3().addVectors(sourcePt, entryPt).multiplyScalar(0.5);
      inRay.position.copy(inMid);
      inRay.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(entryPt, sourcePt).normalize());
      prismGroup.add(inRay);

      // Entry Refraction Glint Spark
      const entrySpark = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 10), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      entrySpark.position.copy(entryPt);
      prismGroup.add(entrySpark);

      // 3. Internal Refracted Beam (Entry Point -> Exit Point)
      const internalLength = entryPt.distanceTo(exitPt);
      const internalGeom = new THREE.CylinderGeometry(0.016, 0.016, internalLength, 8);
      const internalMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 });
      const internalRay = new THREE.Mesh(internalGeom, internalMat);
      const internalMid = new THREE.Vector3().addVectors(entryPt, exitPt).multiplyScalar(0.5);
      internalRay.position.copy(internalMid);
      internalRay.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(exitPt, entryPt).normalize());
      prismGroup.add(internalRay);

      // Exit Refraction Glint Spark
      const exitSpark = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 10), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      exitSpark.position.copy(exitPt);
      prismGroup.add(exitSpark);

      // 4. Dispersed Continuous Spectral Rainbow Fan (Connected Directly at exitPt)
      const rainbowHex = [0xef4444, 0xf97316, 0xfacc15, 0x10b981, 0x06b6d4, 0x3b82f6, 0x8b5cf6];
      rainbowHex.forEach((col, idx) => {
        const destPt = new THREE.Vector3(1.0, 0.35 - idx * 0.11, 0);
        const rayLen = exitPt.distanceTo(destPt);

        const outGeom = new THREE.CylinderGeometry(0.009, 0.009, rayLen, 8);
        const outMat = new THREE.MeshBasicMaterial({ color: col });
        const outRay = new THREE.Mesh(outGeom, outMat);

        const outMid = new THREE.Vector3().addVectors(exitPt, destPt).multiplyScalar(0.5);
        outRay.position.copy(outMid);
        outRay.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(destPt, exitPt).normalize());
        prismGroup.add(outRay);
      });

      const formula = createFormulaHologram('n₁ sin θ₁ = n₂ sin θ₂', '#00e5ff');
      formula.position.set(0, 0.66, 0);
      prismGroup.add(formula);

      prismGroup.scale.set(1.15, 1.15, 1.15);
      return prismGroup;
    };

    // ========================================================
    // --- 4. CENTRAL INTERACTIVE ORB (Reacts to Mouse!) ---
    // ========================================================
    const orbGroup = new THREE.Group();
    orbGroup.name = "CentralInteractiveOrb";
    mainGroup.add(orbGroup);

    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const innerCore = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 1), innerCoreMat);
    orbGroup.add(innerCore);

    const solidCoreMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.75,
      roughness: 0.1,
      metalness: 0.95,
      flatShading: true
    });
    const solidCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.7, 2), solidCoreMat);
    orbGroup.add(solidCore);

    const auraMat1 = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.14,
      wireframe: true
    });
    const aura1 = new THREE.Mesh(new THREE.SphereGeometry(1.45, 16, 16), auraMat1);
    orbGroup.add(aura1);

    const auraMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.08,
      wireframe: true
    });
    const aura2 = new THREE.Mesh(new THREE.SphereGeometry(1.85, 16, 16), auraMat2);
    orbGroup.add(aura2);

    const rRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.024, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.65 })
    );
    rRing1.rotation.x = Math.PI / 3;
    orbGroup.add(rRing1);

    const rRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.85, 0.02, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.55 })
    );
    rRing2.rotation.y = Math.PI / 4;
    rRing2.rotation.x = -Math.PI / 6;
    orbGroup.add(rRing2);

    const rRing3 = new THREE.Mesh(
      new THREE.TorusGeometry(3.35, 0.016, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.45 })
    );
    rRing3.rotation.z = Math.PI / 5;
    orbGroup.add(rRing3);

    // --- 5. Spawn Peaceful Orbiting Study Objects ---
    const bookModel = createMasterOpenBook();
    const capModel = createMasterGraduationCap();
    const flaskModel = createMasterChemistryFlask();
    const atomModel = createMasterAtomModel();
    const dnaModel = createMasterDnaModel();
    const prismModel = createMasterPrismModel();

    const studyObjects: THREE.Group[] = [
      bookModel,  // 0. Textbook & Pen
      capModel,   // 1. Cap
      flaskModel, // 2. Flask (Upright)
      atomModel,  // 3. Atom
      dnaModel,   // 4. DNA
      prismModel  // 5. Connected Prism
    ];

    studyObjects.forEach((obj) => {
      mainGroup.add(obj);
    });

    // --- 6. Ambient Constellation Particle Field ---
    const particlesCount = 420;
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleColors = new Float32Array(particlesCount * 3);

    const colorPalette = [
      new THREE.Color(0x00e5ff),
      new THREE.Color(0xa855f7),
      new THREE.Color(0x10b981),
      new THREE.Color(0xf59e0b)
    ];

    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 32;
      particlePositions[i + 1] = (Math.random() - 0.5) * 32;
      particlePositions[i + 2] = (Math.random() - 0.5) * 20 - 2;

      const pickColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particleColors[i] = pickColor.r;
      particleColors[i + 1] = pickColor.g;
      particleColors[i + 2] = pickColor.b;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.075,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    // --- 7. Cinema Dynamic Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00e5ff, 3.4);
    dirLight1.position.set(6, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 3.0);
    dirLight2.position.set(-6, -5, 5);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0x10b981, 2.2);
    dirLight3.position.set(0, -6, 3);
    scene.add(dirLight3);

    const mouseSpotLight = new THREE.PointLight(0x00e5ff, 5.0, 12);
    scene.add(mouseSpotLight);

    // --- 8. Event Listeners ---
    let scrollY = window.scrollY;
    let targetScrollY = scrollY;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    const mouse2D = new THREE.Vector2();

    let wasOrbHovered = false;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      mouse2D.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse2D.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // --- 9. 60 FPS Render Loop with Physical Fluid Animations ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Delta lerp for scroll & mouse
      scrollY += (targetScrollY - scrollY) * 0.08;
      mouseX += (targetMouseX - mouseX) * 0.07;
      mouseY += (targetMouseY - mouseY) * 0.07;

      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      mouseSpotLight.position.x = mouseX * 5.0;
      mouseSpotLight.position.y = -mouseY * 4.0;
      mouseSpotLight.position.z = 3.0;

      // =========================================================================
      // CENTRAL ORB MOUSE REACTION
      // =========================================================================
      const mouseDistToCenter = Math.sqrt(mouse2D.x * mouse2D.x + mouse2D.y * mouse2D.y);
      const isOrbHovered = mouseDistToCenter < 0.42;

      if (isOrbHovered && !wasOrbHovered) {
        audioEngine.playChime(660, 0.2);
        wasOrbHovered = true;
      } else if (!isOrbHovered && wasOrbHovered) {
        wasOrbHovered = false;
      }

      const targetOrbRotX = -mouseY * 0.95 + Math.sin(elapsedTime * 0.3) * 0.15;
      const targetOrbRotY = mouseX * 0.95 + elapsedTime * 0.35;
      const targetOrbRotZ = (mouseX - mouseY) * 0.25;

      orbGroup.rotation.x += (targetOrbRotX - orbGroup.rotation.x) * 0.08;
      orbGroup.rotation.y += (targetOrbRotY - orbGroup.rotation.y) * 0.08;
      orbGroup.rotation.z += (targetOrbRotZ - orbGroup.rotation.z) * 0.08;

      const targetEmissive = isOrbHovered ? 1.6 : 0.75;
      solidCoreMat.emissiveIntensity += (targetEmissive - solidCoreMat.emissiveIntensity) * 0.08;

      const basePulse = 1.0 + Math.sin(elapsedTime * 2.8) * 0.08;
      const hoverBoost = isOrbHovered ? 1.35 : 1.0;
      const auraScale = basePulse * hoverBoost;
      aura1.scale.set(auraScale, auraScale, auraScale);
      aura2.scale.set(auraScale * 1.1, auraScale * 1.1, auraScale * 1.1);

      rRing1.rotation.z = elapsedTime * 0.4 + (isOrbHovered ? 2 : 0.5) * elapsedTime * 0.2;
      rRing2.rotation.x = elapsedTime * 0.3 - scrollProgress * 2;
      rRing3.rotation.y = elapsedTime * 0.25 + scrollProgress * 2.5;

      // Main Group Spatial Lateral Panning
      const targetPosX = Math.sin(scrollProgress * Math.PI * 2.5) * 2.5;
      const targetPosY = -Math.cos(scrollProgress * Math.PI * 2.0) * 0.75;
      const targetPosZ = Math.sin(scrollProgress * Math.PI * 3) * 1.4;

      mainGroup.position.x += (targetPosX - mainGroup.position.x) * 0.06;
      mainGroup.position.y += (targetPosY - mainGroup.position.y) * 0.06;
      mainGroup.position.z += (targetPosZ - mainGroup.position.z) * 0.06;

      // =========================================================================
      // DYNAMIC MICRO-PHYSICS FOR STUDY OBJECTS
      // =========================================================================
      
      // 1. Notebook Page Flutter & Animated Fountain Pen
      if (leftPageRef.current && rightPageRef.current) {
        leftPageRef.current.rotation.y = 0.32 + Math.sin(elapsedTime * 2.5) * 0.035;
        rightPageRef.current.rotation.y = -0.32 - Math.sin(elapsedTime * 2.5 + 1.2) * 0.035;
      }
      if (ribbonRef.current) {
        ribbonRef.current.rotation.x = 0.25 + Math.sin(elapsedTime * 3.2) * 0.1;
      }
      if (penRef.current) {
        // Pen writes continuous Lissajous mathematical curves above the notebook
        penRef.current.position.x = 0.12 + Math.sin(elapsedTime * 3.5) * 0.12;
        penRef.current.position.y = 0.08 + Math.cos(elapsedTime * 3.5) * 0.06;
        penRef.current.rotation.z = -0.4 + Math.sin(elapsedTime * 3.5) * 0.15;
      }

      // 2. Graduation Cap Pendulum Tassel Momentum
      if (tasselRef.current) {
        tasselRef.current.rotation.z = 0.35 + Math.sin(elapsedTime * 2.2) * 0.22;
        tasselRef.current.rotation.x = Math.cos(elapsedTime * 1.8) * 0.18;
      }

      // 3. Chemistry Flask Upright Stabilization & Liquid Sloshing Physics
      if (meniscusRef.current) {
        // Liquid surface counter-sloshes
        meniscusRef.current.rotation.y = Math.sin(elapsedTime * 3.5) * 0.12;
        meniscusRef.current.position.y = -0.01 + Math.sin(elapsedTime * 4.0) * 0.01;
      }
      // Rising Micro-Bubbles
      bubblesList.forEach((b) => {
        const currentY = -0.22 + ((elapsedTime * b.speed + b.baseOffset) % 0.22);
        b.mesh.position.y = currentY;
        b.mesh.position.x += Math.sin(elapsedTime * 5 + b.baseOffset) * 0.002;
      });

      // 4. DNA Sinuous Traveling Wave
      dnaRungsList.forEach((r) => {
        const twistAngle = elapsedTime * 1.2 + r.index * 0.65 + Math.sin(elapsedTime * 2.5 + r.index * 0.5) * 0.2;
        const radius = 0.26 + Math.sin(elapsedTime * 3 + r.index) * 0.02;

        r.node1.position.x = Math.cos(twistAngle) * radius;
        r.node1.position.z = Math.sin(twistAngle) * radius;

        r.node2.position.x = -Math.cos(twistAngle) * radius;
        r.node2.position.z = -Math.sin(twistAngle) * radius;

        r.rung.rotation.y = twistAngle;
      });

      // =========================================================================
      // ORBITAL PATHS: Specific Upright Constraints for Chemistry Flask
      // =========================================================================
      studyObjects.forEach((obj, idx) => {
        const isFocused = focusedIndexRef.current === idx;
        const targetScale = isFocused ? 1.5 : 1.15;

        obj.scale.x += (targetScale - obj.scale.x) * 0.1;
        obj.scale.y += (targetScale - obj.scale.y) * 0.1;
        obj.scale.z += (targetScale - obj.scale.z) * 0.1;

        const orbitAngle = elapsedTime * 0.45 + (idx * Math.PI * 2) / studyObjects.length + scrollProgress * 3.0;
        const orbitRadius = 3.2 + (idx % 2) * 0.8;

        obj.position.x = Math.cos(orbitAngle) * orbitRadius;
        obj.position.y = Math.sin(orbitAngle * 1.2) * 1.5 + Math.sin(elapsedTime * 1.2 + idx) * 0.18;
        obj.position.z = Math.sin(orbitAngle) * orbitRadius;

        // Specific orientation rules:
        if (obj.name === "ChemistryFlask") {
          // CRITICAL: The flask ALWAYS stays strictly UPRIGHT with only gentle hydrodynamic sway!
          obj.rotation.x = Math.sin(elapsedTime * 1.5) * 0.07;
          obj.rotation.z = Math.cos(elapsedTime * 1.2) * 0.07;
          obj.rotation.y = elapsedTime * 0.18;
        } else {
          // Other objects rotate smoothly
          obj.rotation.x += 0.012;
          obj.rotation.y += 0.018;
          obj.rotation.z = Math.sin(elapsedTime * 0.7 + idx) * 0.15;
        }
      });

      particleSystem.rotation.y = elapsedTime * 0.02;
      particleSystem.rotation.x = elapsedTime * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // --- 10. Memory Cleanup on Unmount ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      innerCore.geometry.dispose();
      solidCore.geometry.dispose();
      aura1.geometry.dispose();
      aura2.geometry.dispose();
      particleGeom.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.95
      }}
    />
  );
};
