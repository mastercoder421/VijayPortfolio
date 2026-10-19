import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  Menu,
  X,
  FileText,
  Search,
} from 'lucide-react';
import { navLinks, portfolioData } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { MagneticButton } from './MagneticButton';
import {
  InstagramIcon,
  XIcon,
  GitHubIcon,
  LinkedInIcon,
} from './icons/BrandIcons';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Shrink effect trigger
      setIsScrolled(window.scrollY > 40);

      // Scroll spy for active section
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navOffset = 90;
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className={`fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl backdrop-blur-2xl transition-all duration-300 border border-slate-200 dark:border-white/10 ${
        mobileMenuOpen
          ? 'rounded-3xl py-3 bg-white/95 dark:bg-zinc-950/95 shadow-2xl'
          : isScrolled
          ? 'rounded-full py-2 bg-white/80 dark:bg-zinc-950/90 shadow-[0_8px_30px_rgba(15,23,42,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.6),0_0_15px_rgba(6,182,212,0.1)]'
          : 'rounded-full py-2.5 bg-white/80 dark:bg-zinc-950/85 shadow-[0_8px_30px_rgba(15,23,42,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_10px_rgba(6,182,212,0.08)]'
      } px-3.5 sm:px-5 flex flex-col justify-center`}
    >
      <div className="flex items-center justify-between gap-3 w-full">
        {/* Left Brand Block (shrink-0) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group shrink-0 flex items-center space-x-2.5 text-sm sm:text-base font-bold font-display tracking-tight text-slate-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-full whitespace-nowrap"
          aria-label="Vijay Maheshwari Home"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-cyan-500 dark:border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)] group-hover:scale-105 group-hover:border-cyan-400 transition-all duration-200 shrink-0">
            <img
              src={portfolioData.personal.avatarUrl}
              alt="Vijay Maheshwari"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  portfolioData.personal.avatarFallback;
              }}
            />
          </div>
          <span className="font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
            Vijay <span className="text-cyan-700 dark:text-cyan-400">Maheshwari</span>
          </span>
        </a>

        {/* Center: Desktop Navigation Links (only visible on xl: 1280px and up) */}
        <div
          className="hidden xl:flex items-center gap-0.5 min-w-0"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-3 py-1.5 text-xs font-medium tracking-wide transition-colors duration-200 rounded-full whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                  isActive
                    ? 'text-cyan-700 dark:text-cyan-300 font-semibold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeFloatingIslandNav"
                    className="absolute inset-0 bg-cyan-50 dark:bg-cyan-500/20 rounded-full -z-10 border border-cyan-200 dark:border-cyan-500/40 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Actions Container (shrink-0, compact, never wraps) */}
        <div className="shrink-0 flex items-center gap-2">
          {/* Compact Single-Line Search Button */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              type="button"
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full text-xs text-slate-700 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer shrink-0 whitespace-nowrap shadow-sm dark:shadow-none"
              aria-label="Search (Ctrl+K)"
              title="Search (Ctrl+K / ⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <kbd className="hidden sm:inline-block text-[10px] font-mono font-semibold px-1 py-0.2 rounded bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-300 shadow-[0_1px_1px_rgba(0,0,0,0.05)] dark:shadow-none">
                K
              </kbd>
            </button>
          )}

          {/* Compact Resume CTA (Desktop) */}
          <MagneticButton
            href={portfolioData.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center space-x-1 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white transition-all shadow-[0_4px_14px_rgba(8,145,178,0.25)] dark:shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_6px_20px_rgba(8,145,178,0.35)] dark:hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] border border-cyan-400/20 dark:border-white/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shrink-0 whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span>Resume</span>
          </MagneticButton>

          {/* Theme Toggle Button (fixed size, fully inside pill) */}
          <button
            onClick={toggleTheme}
            type="button"
            className="w-8 h-8 rounded-full text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 active:scale-95 transition-all flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer shadow-sm dark:shadow-none"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400 hover:rotate-90 transition-transform duration-300" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-violet-600 hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* Mobile Hamburger Button (visible on < xl) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="xl:hidden w-8 h-8 rounded-full text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-colors flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer shadow-sm dark:shadow-none"
            aria-label={
              mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'
            }
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Attached Below Floating Island */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="xl:hidden overflow-hidden border-t border-slate-200 dark:border-white/10 pt-3 flex flex-col space-y-1"
          >
            {/* Nav Links */}
            {navLinks.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center justify-between transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-50 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-transparent font-semibold shadow-sm dark:shadow-none'
                      : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                  )}
                </a>
              );
            })}

            {/* Mobile Resume Button */}
            <div className="pt-2 pb-1">
              <a
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white transition-all shadow-md active:scale-98"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Links Row in Drawer */}
            <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-around py-1 text-slate-600 dark:text-zinc-400">
              <a
                href={portfolioData.personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:text-slate-950 dark:hover:text-cyan-400 transition-colors"
                aria-label="GitHub profile"
                title="GitHub"
              >
                <GitHubIcon size={18} />
              </a>
              <a
                href={portfolioData.personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="LinkedIn profile"
                title="LinkedIn"
              >
                <LinkedInIcon size={18} />
              </a>
              <a
                href={portfolioData.personal.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                aria-label="Instagram profile"
                title="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={portfolioData.personal.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:text-slate-950 dark:hover:text-zinc-100 transition-colors"
                aria-label="X profile"
                title="X"
              >
                <XIcon size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
