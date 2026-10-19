import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glareEffect?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.02,
  glareEffect = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setDisabled(isCoarse || isReduced);

    const reducedMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setDisabled(e.matches || isCoarse);
    reducedMedia.addEventListener('change', handler);
    return () => reducedMedia.removeEventListener('change', handler);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 22 });

  const effectiveTilt = disabled ? 0 : maxTilt;
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [effectiveTilt, -effectiveTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-effectiveTilt, effectiveTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    // Track percentage for metallic border shine & refraction
    setGlarePos({
      x: Math.round((mouseX / width) * 100),
      y: Math.round((mouseY / height) * 100),
    });
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: disabled ? 0 : rotateX,
        rotateY: disabled ? 0 : rotateY,
        transformStyle: disabled ? 'flat' : 'preserve-3d',
      }}
      whileHover={disabled ? {} : { scale }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative will-change-transform transform-gpu ${className}`}
    >
      {/* Content wrapper with perspective translation */}
      <div
        style={{ transform: disabled ? 'none' : 'translateZ(0px)' }}
        className="relative z-10 w-full h-full"
      >
        {children}
      </div>

      {/* Dynamic Metallic Refraction & Specular Shine Shifting With Mouse Angle */}
      {glareEffect && !disabled && (
        <div
          className={`absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-20 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(500px circle at ${glarePos.x}% ${glarePos.y}%, rgba(6, 182, 212, 0.12), rgba(139, 92, 246, 0.08) 35%, transparent 70%)`,
          }}
        />
      )}

      {/* Metallic Edge Shimmer Highlight */}
      {glareEffect && !disabled && isHovered && (
        <div
          className="absolute -inset-[1px] pointer-events-none rounded-[inherit] z-0 transition-opacity duration-200"
          style={{
            background: `radial-gradient(280px circle at ${glarePos.x}% ${glarePos.y}%, rgba(6, 182, 212, 0.6), rgba(139, 92, 246, 0.3) 40%, transparent 80%)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px',
          }}
        />
      )}
    </motion.div>
  );
};
