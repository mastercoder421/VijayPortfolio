import React from 'react';
import { motion } from 'framer-motion';
import { ScrambleText } from './ScrambleText';

interface SectionHeaderProps {
  numberTag: string; // e.g. "// 01 ABOUT"
  badgeText: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  accent?: 'cyan' | 'violet' | 'emerald' | 'amber';
}

const accentStyles = {
  cyan: {
    tagColor: 'text-cyan-700 dark:text-cyan-400',
    badge: 'bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/20 text-cyan-800 dark:text-cyan-300',
    underline: 'from-transparent via-cyan-500/80 dark:via-cyan-400/80 to-transparent',
    blob: 'bg-cyan-500/[0.05] dark:bg-cyan-500/[0.04]',
  },
  violet: {
    tagColor: 'text-violet-700 dark:text-violet-400',
    badge: 'bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20 text-violet-800 dark:text-violet-300',
    underline: 'from-transparent via-violet-500/80 dark:via-violet-400/80 to-transparent',
    blob: 'bg-violet-500/[0.05] dark:bg-violet-500/[0.04]',
  },
  emerald: {
    tagColor: 'text-emerald-700 dark:text-emerald-400',
    badge: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300',
    underline: 'from-transparent via-emerald-500/80 dark:via-emerald-400/80 to-transparent',
    blob: 'bg-emerald-500/[0.05] dark:bg-emerald-500/[0.04]',
  },
  amber: {
    tagColor: 'text-amber-700 dark:text-amber-400',
    badge: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-300',
    underline: 'from-transparent via-amber-500/80 dark:via-amber-400/80 to-transparent',
    blob: 'bg-amber-500/[0.05] dark:bg-amber-500/[0.04]',
  },
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  numberTag,
  badgeText,
  badgeIcon,
  title,
  subtitle,
  accent = 'cyan',
}) => {
  const currentAccent = accentStyles[accent] || accentStyles.cyan;

  return (
    <div className="relative text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-4">
      {/* Soft Low-Opacity Ambient Light Blob Behind Heading (Max 5% opacity) */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[450px] h-32 ${currentAccent.blob} rounded-full blur-3xl pointer-events-none -z-10`}
        aria-hidden="true"
      />

      {/* Monospace Code Tag */}
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className={`font-mono text-xs sm:text-[13px] tracking-widest uppercase font-semibold mb-2 leading-normal whitespace-normal ${currentAccent.tagColor}`}
      >
        {numberTag}
      </motion.p>

      {/* Pill Category Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border shadow-sm mb-3 leading-normal whitespace-normal ${currentAccent.badge}`}
      >
        {badgeIcon && <span className="shrink-0">{badgeIcon}</span>}
        <span>{badgeText}</span>
      </motion.div>

      {/* Heading Title with Scramble Text */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white leading-tight">
        <ScrambleText text={title} />
      </h2>

      {/* Animated Clean Glowing Underline */}
      <div className="flex justify-center mt-3 mb-2">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className={`h-px w-24 sm:w-32 bg-gradient-to-r ${currentAccent.underline}`}
        />
      </div>

      {/* Subtitle Description */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-3 text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed break-words"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
