import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  Trophy,
  Award,
  Mail,
  Github,
  Linkedin,
  FileText,
  Copy,
  Sun,
  Moon,
  ExternalLink,
  Check,
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { getGmailComposeUrl } from '../utils/email';
import { InstagramIcon, XIcon } from './icons/BrandIcons';

interface CommandAction {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Navigation' | 'External' | 'Actions';
  icon: React.ReactNode;
  perform: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const { theme, toggleTheme } = useTheme();
  const { personal } = portfolioData;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const offset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  const actions: CommandAction[] = useMemo(
    () => [
      // Navigation
      {
        id: 'nav-about',
        title: 'Go to About Me',
        subtitle: 'Engineering background and philosophy',
        category: 'Navigation',
        icon: <User className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
        perform: () => scrollTo('about'),
        keywords: ['about', 'bio', 'education', 'college'],
      },
      {
        id: 'nav-skills',
        title: 'Go to Skills & Tech Stack',
        subtitle: 'Frontend, Backend, Databases & Dev Tools',
        category: 'Navigation',
        icon: <Cpu className="w-4 h-4 text-violet-600 dark:text-violet-400" />,
        perform: () => scrollTo('skills'),
        keywords: ['skills', 'react', 'node', 'tools', 'languages'],
      },
      {
        id: 'nav-projects',
        title: 'Go to Projects',
        subtitle: 'CampusOne and featured works',
        category: 'Navigation',
        icon: <FolderGit2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        perform: () => scrollTo('projects'),
        keywords: ['projects', 'campusone', 'code'],
      },
      {
        id: 'nav-experience',
        title: 'Go to Experience',
        subtitle: 'Mentorship and leadership positions',
        category: 'Navigation',
        icon: <Briefcase className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
        perform: () => scrollTo('experience'),
        keywords: ['experience', 'mentor', 'leadership'],
      },
      {
        id: 'nav-cp',
        title: 'Go to CP',
        subtitle: 'Codeforces Specialist, CodeChef 3★',
        category: 'Navigation',
        icon: <Trophy className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
        perform: () => scrollTo('cp'),
        keywords: ['cp', 'codeforces', 'codechef', 'leetcode', 'algorithms', 'ratings'],
      },
      {
        id: 'nav-achievements',
        title: 'Go to Awards',
        subtitle: 'Contests, hackathons, and rankings',
        category: 'Navigation',
        icon: <Award className="w-4 h-4 text-amber-600 dark:text-yellow-400" />,
        perform: () => scrollTo('achievements'),
        keywords: ['achievements', 'awards', 'hackathons'],
      },
      {
        id: 'nav-contact',
        title: 'Go to Contact',
        subtitle: 'Send a direct message or email',
        category: 'Navigation',
        icon: <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
        perform: () => scrollTo('contact'),
        keywords: ['contact', 'email', 'message'],
      },

      // External Links
      {
        id: 'ext-github',
        title: 'Open GitHub Profile',
        subtitle: 'github.com/mastercoder421',
        category: 'External',
        icon: <Github className="w-4 h-4 text-slate-700 dark:text-zinc-300" />,
        perform: () => {
          window.open(personal.socials.github, '_blank', 'noopener,noreferrer');
          onClose();
        },
        keywords: ['github', 'repo', 'open source'],
      },
      {
        id: 'ext-linkedin',
        title: 'Open LinkedIn Profile',
        subtitle: 'linkedin.com/in/vijay-maheshwari-136a7b2aa',
        category: 'External',
        icon: <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
        perform: () => {
          window.open(personal.socials.linkedin, '_blank', 'noopener,noreferrer');
          onClose();
        },
        keywords: ['linkedin', 'social', 'connect'],
      },
      {
        id: 'ext-instagram',
        title: 'Open Instagram',
        subtitle: 'instagram.com/__vijay_maheshwari',
        category: 'External',
        icon: <InstagramIcon size={16} className="text-pink-600 dark:text-pink-400" />,
        perform: () => {
          window.open(personal.socials.instagram, '_blank', 'noopener,noreferrer');
          onClose();
        },
        keywords: ['instagram', 'insta', 'photos', 'social'],
      },
      {
        id: 'ext-x',
        title: 'Open X (Twitter)',
        subtitle: 'x.com/VijayM29714',
        category: 'External',
        icon: <XIcon size={15} className="text-slate-800 dark:text-zinc-200" />,
        perform: () => {
          window.open(personal.socials.x, '_blank', 'noopener,noreferrer');
          onClose();
        },
        keywords: ['x', 'twitter', 'social', 'posts'],
      },
      {
        id: 'ext-resume',
        title: 'Open Resume / CV',
        subtitle: 'View Google Drive resume document',
        category: 'External',
        icon: <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        perform: () => {
          window.open(personal.resumeUrl, '_blank', 'noopener,noreferrer');
          onClose();
        },
        keywords: ['resume', 'cv', 'pdf'],
      },

      // Actions
      {
        id: 'act-copy-email',
        title: 'Copy Email Address',
        subtitle: personal.email,
        category: 'Actions',
        icon: <Copy className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
        perform: () => {
          navigator.clipboard.writeText(personal.email);
          showToast('Email address copied to clipboard!');
        },
        keywords: ['email', 'copy', 'clipboard'],
      },
      {
        id: 'act-compose-gmail',
        title: 'Compose Email via Gmail',
        subtitle: 'Opens mail.google.com in a new tab',
        category: 'Actions',
        icon: <Mail className="w-4 h-4 text-rose-600 dark:text-red-400" />,
        perform: () => {
          window.open(getGmailComposeUrl(), '_blank', 'noopener,noreferrer');
          onClose();
        },
        keywords: ['gmail', 'compose', 'write', 'send'],
      },
      {
        id: 'act-toggle-theme',
        title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`,
        subtitle: `Currently active: ${theme} mode`,
        category: 'Actions',
        icon:
          theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          ),
        perform: () => {
          toggleTheme();
          showToast(`Switched to ${theme === 'dark' ? 'Light' : 'Dark'} mode`);
        },
        keywords: ['theme', 'dark', 'light', 'mode'],
      },
    ],
    [onClose, personal, theme, toggleTheme]
  );

  const filteredActions = useMemo(() => {
    if (!query.trim()) return actions;
    const q = query.toLowerCase().trim();
    return actions.filter(
      (action) =>
        action.title.toLowerCase().includes(q) ||
        action.subtitle?.toLowerCase().includes(q) ||
        action.category.toLowerCase().includes(q) ||
        action.keywords?.some((k) => k.toLowerCase().includes(q))
    );
  }, [actions, query]);

  // Reset selected index on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredActions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredActions.length - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].perform();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-xl rounded-2xl bg-white/95 dark:bg-zinc-950/95 border border-slate-200 dark:border-white/15 backdrop-blur-2xl shadow-[0_25px_60px_rgba(15,23,42,0.15),0_0_35px_rgba(8,145,178,0.10)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(6,182,212,0.18)] overflow-hidden z-10 flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-white/10 relative">
              <Search className="w-5 h-5 text-slate-400 dark:text-zinc-400 shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none"
                aria-label="Search commands"
              />
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-slate-600 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded shadow-sm dark:shadow-none">
                ESC
              </kbd>
            </div>

            {/* Toast Feedback */}
            {toastMessage && (
              <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-500/15 border-b border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 text-xs flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>{toastMessage}</span>
              </div>
            )}

            {/* Actions List */}
            <div className="overflow-y-auto p-2 space-y-1 max-h-[55vh] focus:outline-none">
              {filteredActions.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500 dark:text-zinc-500 font-mono">
                  No matching commands found for "{query}".
                </div>
              ) : (
                filteredActions.map((action, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={action.id}
                      onClick={() => action.perform()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm transition-colors ${
                        isSelected
                          ? 'bg-cyan-50 dark:bg-gradient-to-r dark:from-cyan-500/20 dark:to-violet-500/20 text-slate-900 dark:text-white border border-cyan-200 dark:border-cyan-500/40 shadow-sm dark:shadow-none'
                          : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3 truncate">
                        <div className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shrink-0 shadow-sm dark:shadow-none">
                          {action.icon}
                        </div>
                        <div className="truncate">
                          <p className="font-semibold text-slate-900 dark:text-zinc-100 leading-tight">
                            {action.title}
                          </p>
                          {action.subtitle && (
                            <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate mt-0.5">
                              {action.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0 ml-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-500 px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-900/80 border border-slate-200 dark:border-white/5">
                          {action.category}
                        </span>
                        {action.category === 'External' && (
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Shortcut Bar */}
            <div className="px-4 py-2.5 border-t border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-zinc-950/80 text-[11px] text-slate-500 dark:text-zinc-500 flex items-center justify-between font-mono">
              <div className="flex items-center space-x-3">
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 shadow-sm dark:shadow-none">
                    ↑
                  </kbd>{' '}
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 shadow-sm dark:shadow-none">
                    ↓
                  </kbd>{' '}
                  navigate
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 shadow-sm dark:shadow-none">
                    ↵
                  </kbd>{' '}
                  run
                </span>
              </div>
              <span>Vijay Maheshwari Portfolio</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
