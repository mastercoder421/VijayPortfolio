import React from 'react';
import { ExternalLink, Flame } from 'lucide-react';
import { portfolioData, CompetitiveProgrammingProfile } from '../data/portfolio';
import { GlassCard3D } from './GlassCard3D';
import { SectionHeader } from './SectionHeader';
import { AnimatedCounter } from './AnimatedCounter';
import { useLiveStats } from '../hooks/useLiveStats';

export const CPStats: React.FC = () => {
  const { cpStats } = portfolioData;
  const liveStats = useLiveStats();

  const radius = 36;
  const circumference = 2 * Math.PI * radius;

  return (
    <section id="cp" className="scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <SectionHeader
          numberTag="// 05 CP"
          badgeText="Problem Solving & Ratings"
          badgeIcon={<Flame className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}
          title="Competitive Programming"
          subtitle="Consistent problem solving, contest ratings, and algorithmic profiles across global competitive platforms."
          accent="cyan"
        />

        {/* 3 Equal Cards in a responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {cpStats.profiles.map((profile: CompetitiveProgrammingProfile) => {
            const isCF = profile.platform.toLowerCase() === 'codeforces';
            const rawRating = isCF ? liveStats.cfRating : profile.ratingValue;
            const numericRating =
              typeof rawRating === 'number'
                ? rawRating
                : parseInt(String(rawRating).replace(/\D/g, ''), 10) || 1400;
            const rankDisplay = isCF ? liveStats.cfRank : profile.rankTitle;

            const targetMax = isCF ? 1600 : profile.platform.toLowerCase() === 'codechef' ? 1800 : 2000;
            const ratingPct = Math.min(1, Math.max(0.15, numericRating / targetMax));
            const strokeOffset = circumference - ratingPct * circumference;

            return (
              <GlassCard3D
                key={profile.platform}
                accent="cyan"
                tilt={true}
                className="h-full"
              >
                {/* Platform Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-cyan-50 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/20 shadow-sm dark:shadow-none">
                      {rankDisplay}
                    </span>
                    {isCF && liveStats.isLive && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-800 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20 shadow-sm dark:shadow-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                        <span>Live</span>
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                    @{profile.username}
                  </span>
                </div>

                {/* Rating Gauge and Numbers Centered */}
                <div className="flex flex-col items-center justify-center text-center py-2">
                  <div className="relative w-24 h-24 flex items-center justify-center my-1">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
                      <defs>
                        <linearGradient id={`gauge-${profile.platform}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#0891b2" />
                          <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="5"
                        fill="transparent"
                        className="text-slate-200 dark:text-zinc-800"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke={`url(#gauge-${profile.platform})`}
                        strokeWidth="5.5"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeOffset}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                      <span className="text-lg font-mono font-bold text-slate-900 dark:text-white leading-none">
                        {typeof rawRating === 'number' ? <AnimatedCounter value={rawRating} /> : rawRating}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-500 uppercase mt-1">Rating</span>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                    {profile.platform}
                  </p>
                  {isCF && (
                    <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono mt-0.5">
                      Peak: {liveStats.cfMaxRating}
                    </p>
                  )}
                </div>

                {/* Highlight */}
                <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed text-center break-words flex-1">
                  {profile.highlight}
                </p>

                {/* Profile Link Button */}
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded-xl text-xs font-semibold bg-white dark:glass-card border border-slate-200 dark:border-white/10 text-slate-800 dark:text-zinc-200 hover:text-cyan-700 dark:hover:text-cyan-400 hover:border-cyan-500/40 shadow-sm dark:shadow-none hover:shadow-md transition-all active:scale-98"
                >
                  <span>View {profile.platform} Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </GlassCard3D>
            );
          })}
        </div>
      </div>
    </section>
  );
};
