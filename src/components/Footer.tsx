import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { getGmailComposeUrl } from '../utils/email';
import { InstagramIcon, XIcon } from './icons/BrandIcons';
import { VisitorCounter } from './VisitorCounter';

export const Footer: React.FC = () => {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const gmailUrl = getGmailComposeUrl();

  return (
    <footer id="footer" className="relative border-t border-slate-200 dark:border-white/10 bg-white/70 dark:bg-zinc-950/40 backdrop-blur-md py-8 transition-colors duration-300">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Live Visitor Counter */}
        <div className="flex justify-center mb-6">
          <VisitorCounter />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright notice */}
          <p className="text-sm font-medium text-slate-600 dark:text-zinc-400 font-mono text-center sm:text-left">
            © 2026 {personal.name} · Built with React & Three.js
          </p>

          {/* Quick links to GitHub, LinkedIn, Instagram, X, Gmail compose, plus "Back to Top" */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <a
              href={personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white dark:glass-card border border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-cyan-400 hover:border-slate-300 dark:hover:border-cyan-500/40 shadow-sm dark:shadow-none hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white dark:glass-card border border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-400 shadow-sm dark:shadow-none hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={personal.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white dark:glass-card border border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-400 hover:text-pink-600 dark:hover:text-pink-400 hover:border-pink-400 shadow-sm dark:shadow-none hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 cursor-pointer"
              aria-label="Instagram profile"
              title="Instagram profile"
            >
              <InstagramIcon size={16} />
            </a>

            <a
              href={personal.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white dark:glass-card border border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white hover:border-slate-400 shadow-sm dark:shadow-none hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 cursor-pointer"
              aria-label="X profile"
              title="X profile"
            >
              <XIcon size={14} />
            </a>

            <a
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white dark:glass-card border border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-400 hover:text-cyan-700 dark:hover:text-cyan-400 hover:border-cyan-500/40 shadow-sm dark:shadow-none hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer"
              aria-label="Send Email via Gmail"
              title="Send Email via Gmail"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800/80 hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-white text-slate-700 dark:text-zinc-400 border border-slate-200 dark:border-transparent shadow-sm dark:shadow-none transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer active:scale-95"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
