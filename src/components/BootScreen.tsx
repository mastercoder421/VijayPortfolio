import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const completeBoot = useCallback(() => {
    setIsFinished(true);
    try {
      sessionStorage.setItem('portfolio_booted', 'true');
    } catch {
      // Ignore storage errors in restricted iframes/browsers
    }
    setTimeout(() => {
      onComplete();
    }, 400);
  }, [onComplete]);

  useEffect(() => {
    // Check if previously booted in this session
    try {
      const alreadyBooted = sessionStorage.getItem('portfolio_booted');
      if (alreadyBooted === 'true') {
        onComplete();
        return;
      }
    } catch {
      // Ignore
    }

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      completeBoot();
      return;
    }

    // Sequential terminal steps totaling ~1.5s
    const step1 = setTimeout(() => {
      setLines((prev) => [...prev, '> initializing portfolio system...']);
    }, 150);

    const step2 = setTimeout(() => {
      setLines((prev) => [...prev, '> loading modules & algorithmic cores...']);
    }, 650);

    const step3 = setTimeout(() => {
      setLines((prev) => [...prev, '> system ready. launching interface...']);
    }, 1150);

    const finish = setTimeout(() => {
      completeBoot();
    }, 1600);

    // Keyboard listener to skip immediately
    const handleKeyDown = () => {
      completeBoot();
    };

    window.addEventListener('keydown', handleKeyDown, { once: true });

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(finish);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [completeBoot, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.99, filter: 'blur(8px)' }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          onClick={completeBoot}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 text-zinc-100 font-mono select-none cursor-pointer p-6"
          aria-label="Booting portfolio. Click or press any key to skip."
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-radial-at-c from-cyan-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />

          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-900/90 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] relative">
            {/* Window bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs text-zinc-400">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="flex items-center space-x-1.5 font-semibold text-zinc-300">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>vijay@iiitdmj:~</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-sans">Click to skip</span>
            </div>

            {/* Terminal output */}
            <div className="space-y-2 text-xs sm:text-sm min-h-[90px]">
              {lines.map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`${
                    idx === lines.length - 1
                      ? 'text-cyan-400 font-semibold'
                      : 'text-zinc-300'
                  }`}
                >
                  {line}
                </motion.div>
              ))}

              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-cyan-400 align-middle ml-1"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
