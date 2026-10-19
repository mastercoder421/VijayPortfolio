import React, { useEffect, useRef, useState } from 'react';

export const CursorSpotlight: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    // Disable on touch devices or if user prefers reduced motion
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || isReduced) {
      setDisabled(true);
      return;
    }

    let targetX = -200;
    let targetY = -200;
    let ringX = -200;
    let ringY = -200;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = !!target.closest(
          'a, button, input, textarea, [role="button"], .group, [data-interactive="true"]'
        );
        setIsHoveringInteractive(interactive);
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      targetX = -200;
      targetY = -200;
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const animate = () => {
      // Lerp for smooth trailing fluid ring
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(650px circle at ${ringX}px ${ringY}px, rgba(6, 182, 212, 0.09), rgba(139, 92, 246, 0.05), transparent 70%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (disabled) {
    return null;
  }

  return (
    <>
      {/* Dynamic Ambient Viewport Spotlight */}
      <div
        ref={spotlightRef}
        className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Trailing Fluid Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-cyan-400/60 dark:border-cyan-400/70 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-[width,height,background-color,border-color,opacity] duration-200 ease-out will-change-transform ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHoveringInteractive
            ? 'w-11 h-11 bg-cyan-400/10 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.6)]'
            : 'w-7 h-7'
        }`}
      />

      {/* Precision Inner Glowing Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.9)] transition-opacity duration-150 will-change-transform ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHoveringInteractive ? 'w-2 h-2 bg-violet-400' : 'w-1.5 h-1.5'}`}
      />
    </>
  );
};
