import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * LIGHT THEME 3D SCENE CONFIGURATION
 * Single source of truth for all Light Mode 3D parameters.
 * Tweak canvasOpacity (0.5 = subtle, 0.7 = standard, 0.85 = prominent) to adjust global visibility.
 */
export const LIGHT_THEME_SCENE = {
  canvasOpacity: 0.7,
  particleSizeDesktop: 2.2,
  particleSizeMobile: 1.8,
  particleOpacity: 0.85,
  lineColor: 0x6366f1, // Base connecting line tint (#6366f1)
  lineOpacity: 0.30,
  shapeOpacity: 0.35,
  sections: [
    { id: 'hero', primary: 0x4f46e5, secondary: 0x7c3aed }, // Indigo -> Violet
    { id: 'about', primary: 0x0ea5e9, secondary: 0x0891b2 }, // Sky -> Deep Cyan
    { id: 'skills', primary: 0x7c3aed, secondary: 0x4f46e5 }, // Violet -> Indigo
    { id: 'projects', primary: 0x059669, secondary: 0x0ea5e9 }, // Emerald -> Sky
    { id: 'experience', primary: 0xd97706, secondary: 0xb45309 }, // Amber
    { id: 'cp', primary: 0x0ea5e9, secondary: 0x7c3aed }, // Sky -> Violet
    { id: 'achievements', primary: 0xd97706, secondary: 0x7c3aed }, // Amber -> Violet
    { id: 'contact', primary: 0x0ea5e9, secondary: 0x059669 }, // Sky -> Emerald
    { id: 'footer', primary: 0x4f46e5, secondary: 0x7c3aed }, // Indigo -> Violet
  ],
};

interface SectionColorConfig {
  id: string;
  primary: THREE.Color;
  secondary: THREE.Color;
}

export const GlobalBackground3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.innerWidth < 768;

    // Check WebGL availability safely - only ONE WebGL context
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isCoarse,
        powerPreference: 'low-power',
      });
    } catch (e) {
      console.warn('WebGL not supported or disabled', e);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 240;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCoarse ? 1 : 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    // Dark & Light section color palettes
    const darkSectionColors: SectionColorConfig[] = [
      { id: 'hero', primary: new THREE.Color(0x06b6d4), secondary: new THREE.Color(0x8b5cf6) }, // Cyan -> Violet
      { id: 'about', primary: new THREE.Color(0x06b6d4), secondary: new THREE.Color(0x38bdf8) }, // Cyan -> Sky
      { id: 'skills', primary: new THREE.Color(0x8b5cf6), secondary: new THREE.Color(0x6366f1) }, // Violet -> Indigo
      { id: 'projects', primary: new THREE.Color(0x10b981), secondary: new THREE.Color(0x06b6d4) }, // Emerald -> Cyan
      { id: 'experience', primary: new THREE.Color(0xf59e0b), secondary: new THREE.Color(0xd97706) }, // Amber
      { id: 'cp', primary: new THREE.Color(0x06b6d4), secondary: new THREE.Color(0x8b5cf6) }, // Cyan -> Violet
      { id: 'achievements', primary: new THREE.Color(0xf59e0b), secondary: new THREE.Color(0x8b5cf6) }, // Amber -> Violet
      { id: 'contact', primary: new THREE.Color(0x06b6d4), secondary: new THREE.Color(0x10b981) }, // Cyan -> Emerald
      { id: 'footer', primary: new THREE.Color(0x06b6d4), secondary: new THREE.Color(0x8b5cf6) }, // Cyan -> Violet
    ];

    const lightSectionColors: SectionColorConfig[] = LIGHT_THEME_SCENE.sections.map((s) => ({
      id: s.id,
      primary: new THREE.Color(s.primary),
      secondary: new THREE.Color(s.secondary),
    }));

    let isDarkMode = document.documentElement.classList.contains('dark');

    // Current interpolated colors
    const initialList = isDarkMode ? darkSectionColors : lightSectionColors;
    const currentPrimary = initialList[0].primary.clone();
    const targetPrimary = initialList[0].primary.clone();
    const currentSecondary = initialList[0].secondary.clone();
    const targetSecondary = initialList[0].secondary.clone();

    // Dynamic particle count scaled for small screens and coarse pointers
    // ~60% reduction on mobile
    const particleCount = isSmallScreen ? 34 : isCoarse ? 42 : 85;
    const maxDistance = isSmallScreen ? 58 : 72;
    const boxWidth = 340;
    const boxHeight = 250;
    const boxDepth = 160;

    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    const speedScale = isReducedMotion ? 0.03 : 0.18;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * boxWidth;
      positions[i * 3 + 1] = (Math.random() - 0.5) * boxHeight;
      positions[i * 3 + 2] = (Math.random() - 0.5) * boxDepth;

      velocities.push({
        x: (Math.random() - 0.5) * speedScale,
        y: (Math.random() - 0.5) * speedScale,
        z: (Math.random() - 0.5) * (speedScale * 0.7),
      });
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: currentPrimary,
      size: isSmallScreen ? 2.6 : 3.2,
      transparent: true,
      opacity: 0.90,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particleSystem);

    // Line segments for the constellation connections
    const maxLines = (particleCount * (particleCount - 1)) / 2;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    linesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage)
    );

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // 3-4 Floating low-poly wireframe 3D shapes at the edges
    const floatingShapes: THREE.Mesh[] = [];
    const shapeMaterials: THREE.MeshBasicMaterial[] = [];

    if (!isSmallScreen && !isCoarse) {
      // Shape 1: Icosahedron wireframe (Top-left edge)
      const icoGeo = new THREE.IcosahedronGeometry(17, 0);
      const icoMat = new THREE.MeshBasicMaterial({
        color: currentPrimary,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      });
      const icoMesh = new THREE.Mesh(icoGeo, icoMat);
      icoMesh.position.set(-145, 70, -20);
      scene.add(icoMesh);
      floatingShapes.push(icoMesh);
      shapeMaterials.push(icoMat);

      // Shape 2: Torus Knot wireframe (Middle-right edge)
      const torusGeo = new THREE.TorusKnotGeometry(13, 3.2, 40, 8);
      const torusMat = new THREE.MeshBasicMaterial({
        color: currentSecondary,
        wireframe: true,
        transparent: true,
        opacity: 0.20,
      });
      const torusMesh = new THREE.Mesh(torusGeo, torusMat);
      torusMesh.position.set(145, -25, -10);
      scene.add(torusMesh);
      floatingShapes.push(torusMesh);
      shapeMaterials.push(torusMat);

      // Shape 3: Octahedron wireframe (Bottom-left edge)
      const octaGeo = new THREE.OctahedronGeometry(14, 0);
      const octaMat = new THREE.MeshBasicMaterial({
        color: currentPrimary,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      });
      const octaMesh = new THREE.Mesh(octaGeo, octaMat);
      octaMesh.position.set(-140, -80, 10);
      scene.add(octaMesh);
      floatingShapes.push(octaMesh);
      shapeMaterials.push(octaMat);

      // Shape 4: Dodecahedron wireframe (Top-right edge)
      const dodecaGeo = new THREE.DodecahedronGeometry(13, 0);
      const dodecaMat = new THREE.MeshBasicMaterial({
        color: currentSecondary,
        wireframe: true,
        transparent: true,
        opacity: 0.20,
      });
      const dodecaMesh = new THREE.Mesh(dodecaGeo, dodecaMat);
      dodecaMesh.position.set(140, 80, -30);
      scene.add(dodecaMesh);
      floatingShapes.push(dodecaMesh);
      shapeMaterials.push(dodecaMat);
    }

    // Pointer tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (isCoarse || isReducedMotion) return;
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    if (!isCoarse && !isReducedMotion) {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
    }

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Section detection via scroll position
    let targetCameraY = 0;

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const viewportMid = scrollY + window.innerHeight * 0.45;
      const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

      const sectionList = isDarkMode ? darkSectionColors : lightSectionColors;
      let activeConfig = sectionList[0];

      // If near bottom of page, activate footer palette
      if (scrollY >= scrollMax - 120) {
        activeConfig = sectionList[sectionList.length - 1]; // footer
      } else {
        for (const config of sectionList) {
          const el = document.getElementById(config.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            const top = rect.top + scrollY;
            const bottom = top + rect.height;

            if (viewportMid >= top && viewportMid <= bottom) {
              activeConfig = config;
              break;
            }
          }
        }
      }

      targetPrimary.copy(activeConfig.primary);
      targetSecondary.copy(activeConfig.secondary);

      // Subtly shift camera Y based on scroll progress (parallax) while keeping all particles inside view
      const scrollPct = Math.min(1, Math.max(0, scrollY / scrollMax));
      targetCameraY = (scrollPct - 0.5) * -30;
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();

    // Theme check: 1.0 in dark theme, tuned in light theme via LIGHT_THEME_SCENE
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      isDarkMode = isDark;
      if (container) {
        container.style.opacity = isDark ? '1.0' : String(LIGHT_THEME_SCENE.canvasOpacity);
      }

      // Live material tuning: Additive blending in dark, Normal alpha blending in light
      particleMaterial.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
      particleMaterial.size = isDark
        ? (isSmallScreen ? 2.6 : 3.2)
        : (isSmallScreen ? LIGHT_THEME_SCENE.particleSizeMobile : LIGHT_THEME_SCENE.particleSizeDesktop);
      particleMaterial.opacity = isDark ? 0.90 : LIGHT_THEME_SCENE.particleOpacity;
      particleMaterial.needsUpdate = true;

      linesMaterial.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
      linesMaterial.opacity = isDark ? 1.0 : LIGHT_THEME_SCENE.lineOpacity;
      linesMaterial.needsUpdate = true;

      shapeMaterials.forEach((mat) => {
        mat.opacity = isDark ? 0.22 : LIGHT_THEME_SCENE.shapeOpacity;
        mat.needsUpdate = true;
      });

      updateActiveSection();
    };

    checkTheme();
    const themeObserver = new MutationObserver(checkTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Animation Loop with Tab Visibility Check
    let animationFrameId: number;
    let clockTime = 0;
    let isTabVisible = !document.hidden;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabVisible) return;

      clockTime += 0.015;

      // Smoothly lerp colors per section (~400ms transition)
      currentPrimary.lerp(targetPrimary, 0.05);
      currentSecondary.lerp(targetSecondary, 0.05);

      particleMaterial.color.copy(currentPrimary);
      shapeMaterials.forEach((mat, idx) => {
        mat.color.copy(idx % 2 === 0 ? currentPrimary : currentSecondary);
      });

      // Smooth camera interpolation towards cursor and scroll
      if (!isCoarse && !isReducedMotion) {
        currentMouseX += (targetMouseX - currentMouseX) * 0.035;
        currentMouseY += (targetMouseY - currentMouseY) * 0.035;

        scene.rotation.y = currentMouseX * 0.16;
        scene.rotation.x = -currentMouseY * 0.12;
      } else {
        scene.rotation.y += 0.0005;
      }

      camera.position.y += (targetCameraY - camera.position.y) * 0.05;

      // Animate floating wireframe shapes
      if (!isReducedMotion) {
        floatingShapes.forEach((shape, index) => {
          shape.rotation.x += 0.003 + index * 0.001;
          shape.rotation.y += 0.004 + index * 0.001;
          // Gentle hovering bob
          shape.position.y += Math.sin(clockTime + index * 1.5) * 0.08;
        });
      }

      // Update particle positions
      const posArray = particlesGeometry.attributes.position.array as Float32Array;
      const halfW = boxWidth / 2;
      const halfH = boxHeight / 2;
      const halfD = boxDepth / 2;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArray[i3] += velocities[i].x;
        posArray[i3 + 1] += velocities[i].y;
        posArray[i3 + 2] += velocities[i].z;

        // Bounce boundaries
        if (posArray[i3] < -halfW || posArray[i3] > halfW) velocities[i].x *= -1;
        if (posArray[i3 + 1] < -halfH || posArray[i3 + 1] > halfH) velocities[i].y *= -1;
        if (posArray[i3 + 2] < -halfD || posArray[i3 + 2] > halfD) velocities[i].z *= -1;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Update constellation connections
      let lineVertexIndex = 0;
      let colorVertexIndex = 0;

      const pPositions = particlesGeometry.attributes.position.array as Float32Array;
      const lPositions = linesGeometry.attributes.position.array as Float32Array;
      const lColors = linesGeometry.attributes.color.array as Float32Array;

      const primR = currentPrimary.r;
      const primG = currentPrimary.g;
      const primB = currentPrimary.b;
      const secR = currentSecondary.r;
      const secG = currentSecondary.g;
      const secB = currentSecondary.b;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x1 = pPositions[i3];
        const y1 = pPositions[i3 + 1];
        const z1 = pPositions[i3 + 2];

        for (let j = i + 1; j < particleCount; j++) {
          const j3 = j * 3;
          const dx = x1 - pPositions[j3];
          const dy = y1 - pPositions[j3 + 1];
          const dz = z1 - pPositions[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / maxDistance;

            // Point A
            lPositions[lineVertexIndex++] = x1;
            lPositions[lineVertexIndex++] = y1;
            lPositions[lineVertexIndex++] = z1;

            // Point B
            lPositions[lineVertexIndex++] = pPositions[j3];
            lPositions[lineVertexIndex++] = pPositions[j3 + 1];
            lPositions[lineVertexIndex++] = pPositions[j3 + 2];

            const mix = (x1 / boxWidth + 0.5);
            const baseR = primR * (1 - mix) + secR * mix;
            const baseG = primG * (1 - mix) + secG * mix;
            const baseB = primB * (1 - mix) + secB * mix;

            let r: number, g: number, b: number;
            if (isDarkMode) {
              const alpha = factor * 0.48;
              r = baseR * alpha;
              g = baseG * alpha;
              b = baseB * alpha;
            } else {
              // In light theme, blend section color with indigo line tint (#6366f1)
              // Factor smoothly softens the line towards the light background without disappearing
              const lcR = baseR * 0.65 + 0.388 * 0.35;
              const lcG = baseG * 0.65 + 0.400 * 0.35;
              const lcB = baseB * 0.65 + 0.945 * 0.35;
              r = lcR * factor + 1.0 * (1 - factor) * 0.5;
              g = lcG * factor + 1.0 * (1 - factor) * 0.5;
              b = lcB * factor + 1.0 * (1 - factor) * 0.5;
            }

            lColors[colorVertexIndex++] = r;
            lColors[colorVertexIndex++] = g;
            lColors[colorVertexIndex++] = b;

            lColors[colorVertexIndex++] = r;
            lColors[colorVertexIndex++] = g;
            lColors[colorVertexIndex++] = b;
          }
        }
      }

      linesGeometry.setDrawRange(0, lineVertexIndex / 3);
      linesGeometry.attributes.position.needsUpdate = true;
      linesGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      themeObserver.disconnect();
      if (!isCoarse && !isReducedMotion) {
        window.removeEventListener('mousemove', handlePointerMove);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateActiveSection);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particleMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      floatingShapes.forEach((s) => s.geometry.dispose());
      shapeMaterials.forEach((m) => m.dispose());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-500"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
};
