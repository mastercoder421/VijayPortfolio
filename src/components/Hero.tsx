import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown,
  Download,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { TiltCard } from './TiltCard';
import { MagneticButton } from './MagneticButton';
import { getGmailComposeUrl } from '../utils/email';
import { InstagramIcon, XIcon } from './icons/BrandIcons';

export const Hero: React.FC = () => {
  const { personal } = portfolioData;
  const [roleIndex, setRoleIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(personal.avatarUrl);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  // Cycling roles every 2.8 seconds: ONLY between "Full Stack Developer" and "Competitive Programmer"
  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personal.roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [personal.roles.length, reducedMotion]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const gmailUrl = getGmailComposeUrl();

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Subtle ambient gradient backdrops (low opacity) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(500px,90vw)] max-w-full h-[300px] bg-gradient-to-tr from-cyan-500/5 via-violet-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Heading, Rotating Role, Intro, CTAs, Socials */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Soft light theme readability veil behind hero text column (invisible in dark mode, max 50% opacity) */}
            <div className="absolute -inset-4 sm:-inset-6 -z-10 bg-gradient-to-r from-[#f6f7fb]/50 via-[#f6f7fb]/25 to-transparent rounded-3xl blur-xl pointer-events-none opacity-100 dark:opacity-0 transition-opacity duration-300" />

            {/* Status Badge */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-emerald-50 border border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-300 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>{personal.availability}</span>
            </div>

            {/* Name & Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white leading-tight">
                Hi, I'm{' '}
                <span className="text-gradient-cyan-violet">
                  {personal.name}
                </span>
              </h1>

              {/* Animated Rotating Role */}
              <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
                <span className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-zinc-300 mr-2 font-display">
                  I'm a
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0, y: reducedMotion ? 0 : 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reducedMotion ? 0 : -15 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl sm:text-2xl font-bold text-cyan-700 dark:text-cyan-400 font-display underline decoration-cyan-500/40 underline-offset-4"
                  >
                    {personal.roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Natural Intro Bio (No CPI, no mobile apps) */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
              {personal.intro}
            </p>

            {/* Primary Action Buttons with Magnetic Hover */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2 w-full sm:w-auto">
              <MagneticButton
                onClick={() => scrollTo('projects')}
                className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl font-semibold text-sm bg-white border border-slate-200 text-slate-800 shadow-sm hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 dark:glass-card dark:border-white/10 dark:text-zinc-200 dark:hover:text-white dark:hover:border-cyan-500/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <Github className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
                <span>GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 ml-0.5" />
              </MagneticButton>

              <MagneticButton
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl font-semibold text-sm bg-white border border-slate-200 text-slate-800 shadow-sm hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 dark:glass-card dark:border-white/10 dark:text-zinc-200 dark:hover:text-white dark:hover:border-cyan-500/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Download Resume</span>
              </MagneticButton>
            </div>

            {/* Social Connect Bar: GitHub, LinkedIn, Gmail (No Codeforces here) */}
            <div className="flex items-center space-x-4 pt-3">
              <span className="text-xs uppercase tracking-wider text-slate-600 dark:text-zinc-400 font-semibold font-mono">
                Connect:
              </span>
              <div className="flex items-center space-x-3">
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:shadow-md hover:text-cyan-600 hover:-translate-y-0.5 dark:glass-card dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:text-cyan-400 dark:hover:border-cyan-500/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:shadow-md hover:text-cyan-600 hover:-translate-y-0.5 dark:glass-card dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:text-cyan-400 dark:hover:border-cyan-500/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={personal.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:shadow-md hover:text-pink-600 hover:-translate-y-0.5 dark:glass-card dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:text-pink-400 dark:hover:border-pink-500/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
                  aria-label="Instagram profile"
                  title="Instagram profile"
                >
                  <InstagramIcon size={16} />
                </a>
                <a
                  href={personal.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:shadow-md hover:text-slate-950 hover:-translate-y-0.5 dark:glass-card dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:text-white dark:hover:border-zinc-500/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                  aria-label="X profile"
                  title="X profile"
                >
                  <XIcon size={15} />
                </a>
                <a
                  href={gmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:shadow-md hover:text-cyan-600 hover:-translate-y-0.5 dark:glass-card dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:text-cyan-400 dark:hover:border-cyan-500/40 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  aria-label="Send Direct Email via Gmail"
                  title="Send Direct Email via Gmail"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Profile Picture Card with Glowing Border & 3D Tilt */}
          <motion.div
            className="lg:col-span-5 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <TiltCard maxTilt={10} scale={1.02} className="relative group">
              {/* Outer Pulsing Glowing Border Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-violet-600 to-cyan-400 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition-all duration-500 animate-pulse-slow" />

              {/* Border Ring container */}
              <div className="relative p-1 rounded-3xl bg-gradient-to-tr from-cyan-400 via-violet-500 to-cyan-500 shadow-2xl">
                <div className="w-64 h-72 sm:w-80 sm:h-96 rounded-[22px] overflow-hidden bg-slate-100 dark:bg-zinc-950 flex items-center justify-center border-2 border-slate-200 dark:border-zinc-900 shadow-inner">
                  <img
                    src={imgSrc}
                    alt="Vijay Maheshwari"
                    onError={() => setImgSrc(personal.avatarFallback)}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
