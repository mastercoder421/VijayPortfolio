import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  accent?: 'cyan' | 'violet' | 'emerald' | 'amber';
}

const accentGradients = {
  cyan: 'from-transparent via-cyan-500/30 to-transparent',
  violet: 'from-transparent via-violet-500/30 to-transparent',
  emerald: 'from-transparent via-emerald-500/30 to-transparent',
  amber: 'from-transparent via-amber-500/30 to-transparent',
};

export const SectionDivider: React.FC<SectionDividerProps> = ({ accent = 'cyan' }) => {
  const gradient = accentGradients[accent] || accentGradients.cyan;

  return (
    <div className="relative w-full max-w-5xl mx-auto py-8 sm:py-12 px-6 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Subtle Perspective Grid Fade */}
      <div className="h-[1px] w-full relative">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full w-full bg-gradient-to-r ${gradient}`}
        />
        {/* Center Accent Pip */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 dark:bg-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
      </div>
    </div>
  );
};
