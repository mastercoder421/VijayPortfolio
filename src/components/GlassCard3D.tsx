import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export type CardAccent = 'cyan' | 'violet' | 'emerald' | 'amber';

export interface GlassCard3DProps {
  children: React.ReactNode;
  className?: string;
  accent?: CardAccent;
  tilt?: boolean;
  onClick?: () => void;
}

const accentMap: Record<CardAccent, { topGlow: string; hoverBorder: string; glareRgba: string }> = {
  cyan: {
    topGlow: 'via-cyan-600 dark:via-cyan-400',
    hoverBorder: 'hover:border-cyan-500/35 dark:hover:border-cyan-500/40',
    glareRgba: 'rgba(6, 182, 212, 0.08)',
  },
  violet: {
    topGlow: 'via-violet-600 dark:via-violet-400',
    hoverBorder: 'hover:border-violet-500/35 dark:hover:border-violet-500/40',
    glareRgba: 'rgba(139, 92, 246, 0.08)',
  },
  emerald: {
    topGlow: 'via-emerald-600 dark:via-emerald-400',
    hoverBorder: 'hover:border-emerald-500/35 dark:hover:border-emerald-500/40',
    glareRgba: 'rgba(16, 185, 129, 0.08)',
  },
  amber: {
    topGlow: 'via-amber-600 dark:via-amber-400',
    hoverBorder: 'hover:border-amber-500/35 dark:hover:border-amber-500/40',
    glareRgba: 'rgba(245, 158, 11, 0.08)',
  },
};

export const GlassCard3D: React.FC<GlassCard3DProps> = ({
  children,
  className = '',
  accent = 'cyan',
  tilt = false,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setDisabled(isCoarse || isReduced || !tilt);

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setDisabled(e.matches || isCoarse || !tilt);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [tilt]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  // Strictly limited to max 3 degrees tilt for clean readability
  const maxTilt = 3;
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);

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

  const currentAccent = accentMap[accent] || accentMap.cyan;

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: disabled ? 0 : rotateX,
        rotateY: disabled ? 0 : rotateY,
      }}
      className={`group relative h-full rounded-2xl border border-slate-200/80 bg-white/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-8px_rgba(15,23,42,0.10)] hover:shadow-[0_4px_6px_-1px_rgba(15,23,42,0.06),0_12px_28px_-6px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-zinc-900/60 dark:shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 ${currentAccent.hoverBorder} ${className}`}
    >
      {/* 1px Accent Highlight Line on Top */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent ${currentAccent.topGlow} to-transparent opacity-60`}
      />

      {/* Subtle Specular Glare Background Sibling (never wraps or affects children) */}
      {!disabled && (
        <div
          className={`pointer-events-none absolute inset-0 rounded-2xl overflow-hidden transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(400px circle at ${glarePos.x}% ${glarePos.y}%, ${currentAccent.glareRgba}, transparent 70%)`,
          }}
        />
      )}

      {/* Guaranteed Inner Content Wrapper with Fixed Padding & Flex Column Flow */}
      <div className="relative p-6 md:p-8 h-full flex flex-col gap-4 min-w-0">
        {children}
      </div>
    </motion.div>
  );
};
