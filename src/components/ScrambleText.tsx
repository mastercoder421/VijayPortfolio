import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
}

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  duration = 600,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    // If reduced motion is requested, show plain text directly
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayText(text);
      return;
    }

    if (!isInView) return;

    let iteration = 0;
    const totalSteps = text.length;
    const intervalTime = Math.max(25, Math.floor(duration / (totalSteps * 2)));

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2;
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isInView, text, duration]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
};
