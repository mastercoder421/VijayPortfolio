import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Copy,
  Check,
  MessageSquare,
  ArrowUpRight,
  Github,
  Linkedin,
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { ContactForm } from './ContactForm';
import { GlassCard3D } from './GlassCard3D';
import { SectionHeader } from './SectionHeader';
import { getGmailComposeUrl } from '../utils/email';
import { InstagramIcon, XIcon } from './icons/BrandIcons';

export const Contact: React.FC = () => {
  const { personal } = portfolioData;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2500);
  };

  const gmailUrl = getGmailComposeUrl();

  return (
    <section id="contact" className="scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <SectionHeader
          numberTag="// 07 CONTACT"
          badgeText="Get In Touch"
          badgeIcon={<MessageSquare className="w-3.5 h-3.5 text-cyan-400" />}
          title="Let's Connect"
          subtitle="I am actively open to software development internship opportunities, engineering collaborations, and impactful projects."
          accent="cyan"
        />

        {/* Two Equal-Height Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Left Card: Contact Information (Tilt off) */}
          <GlassCard3D tilt={false} accent="cyan" className="h-full">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white leading-normal">
                Contact Information
              </h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mt-1 break-words">
                Reach out directly via email or connect with me online. I check messages daily and respond promptly.
              </p>
            </div>

            {/* Direct Email Action Button */}
            <div className="pt-1">
              <a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white shadow-md shadow-cyan-600/20 transition-all active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span className="truncate">Send Direct Email</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-80 shrink-0" />
              </a>
            </div>

            {/* Details Cards */}
            <div className="space-y-3 pt-2">
              {/* Email Address with break-all so it never overflows */}
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-white/10 flex items-center justify-between gap-3 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-100 dark:border-transparent text-cyan-700 dark:text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
                      Email
                    </p>
                    <a
                      href={gmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-medium text-slate-900 dark:text-zinc-100 hover:text-cyan-700 dark:hover:text-cyan-400 break-all block"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {copiedKey === 'email' && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400">
                      Copied!
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => copyToClipboard(personal.email, 'email')}
                    className="p-2 rounded-lg bg-white dark:bg-zinc-700/60 hover:bg-slate-100 dark:hover:bg-zinc-600 border border-slate-200 dark:border-transparent text-slate-700 dark:text-zinc-300 shadow-sm dark:shadow-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer"
                    aria-label="Copy email address"
                    title="Copy email address"
                  >
                    {copiedKey === 'email' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-white/10 flex items-center gap-3 shadow-sm dark:shadow-none">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-transparent text-emerald-700 dark:text-emerald-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
                    Location
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-zinc-100 break-words">
                    {personal.location} ({personal.college})
                  </p>
                </div>
              </div>
            </div>

            {/* Find Me Online Row (wrap cleanly on mobile) */}
            <div className="mt-auto pt-3 border-t border-slate-200 dark:border-white/10">
              <p className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-2.5 font-mono">
                Find Me Online
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-cyan-400 hover:border-slate-300 dark:hover:border-cyan-500/40 shadow-sm dark:shadow-none transition-colors cursor-pointer"
                  aria-label="GitHub profile"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-[10px] font-medium mt-1">GitHub</span>
                </a>

                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 shadow-sm dark:shadow-none transition-colors cursor-pointer"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-[10px] font-medium mt-1">LinkedIn</span>
                </a>

                <a
                  href={personal.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-300 hover:text-pink-600 dark:hover:text-pink-400 hover:border-pink-400 shadow-sm dark:shadow-none transition-colors cursor-pointer"
                  aria-label="Instagram profile"
                >
                  <InstagramIcon size={16} />
                  <span className="text-[10px] font-medium mt-1">Instagram</span>
                </a>

                <a
                  href={personal.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white hover:border-slate-400 shadow-sm dark:shadow-none transition-colors cursor-pointer"
                  aria-label="X profile"
                >
                  <XIcon size={14} />
                  <span className="text-[10px] font-medium mt-1">X</span>
                </a>
              </div>
            </div>
          </GlassCard3D>

          {/* Right Card: Interactive Form (Tilt off) */}
          <GlassCard3D tilt={false} accent="cyan" className="h-full">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white leading-normal">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-1 break-words">
                Send me a message and it will land directly in my inbox.
              </p>
            </div>

            <div className="pt-2 flex-1">
              <ContactForm />
            </div>
          </GlassCard3D>
        </div>
      </div>
    </section>
  );
};
