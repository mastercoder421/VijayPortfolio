import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Users } from 'lucide-react';
import { useVisitorCount } from '../hooks/useVisitorCount';

interface VisitorCounterProps {
  className?: string;
}

export const VisitorCounter: React.FC<VisitorCounterProps> = ({ className = '' }) => {
  const { count } = useVisitorCount();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState<number>(0);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    if (count === null || !isInView || hasAnimatedRef.current) return;

    hasAnimatedRef.current = true;

    // Respect user's motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayValue(count);
      return;
    }

    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out cubic
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.round(easeOutProgress * count);

      setDisplayValue(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(count); // Guarantee exactly stops on real value
      }
    };

    requestAnimationFrame(animate);
  }, [count, isInView]);

  // If loading and no cached count exists, or if counter failed permanently, hide completely
  if (count === null) {
    return null;
  }

  const formattedCount = displayValue.toLocaleString('en-US');

  return (
    <div
      ref={ref}
      aria-label={`Total visits: ${count.toLocaleString('en-US')}`}
      className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 dark:bg-zinc-900/70 border border-slate-200/90 dark:border-white/10 backdrop-blur-md shadow-sm hover:border-slate-300 dark:hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-default select-none ${className}`}
    >
      {/* Icon with subtle accent */}
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
        <Users className="w-3.5 h-3.5" />
      </div>

      {/* Counter number and label */}
      <div className="flex items-baseline gap-1.5 font-mono">
        <span className="text-sm sm:text-base font-bold tabular-nums text-slate-900 dark:text-zinc-100 tracking-tight">
          {formattedCount}
        </span>
        <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
          Total Visits
        </span>
      </div>

      {/* Tiny pulsing green "live" dot */}
      <span className="relative flex h-2 w-2 ml-0.5 shrink-0" title="Live Counter">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
    </div>
  );
};
