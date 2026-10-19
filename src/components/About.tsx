import React, { useState } from 'react';
import {
  GraduationCap,
  Code2,
  Brain,
  Users2,
  Trophy,
  Flame,
  Award,
  Sparkles,
} from 'lucide-react';
import { portfolioData, StatItem } from '../data/portfolio';
import { GlassCard3D, CardAccent } from './GlassCard3D';
import { SectionHeader } from './SectionHeader';
import { AnimatedCounter } from './AnimatedCounter';
import { useLiveStats } from '../hooks/useLiveStats';

export const About: React.FC = () => {
  const { about, stats, personal } = portfolioData;
  const liveStats = useLiveStats();
  const [imgSrc, setImgSrc] = useState(personal.avatarUrl);

  const getStatConfig = (id: string): { icon: React.ReactNode; accent: CardAccent } => {
    switch (id) {
      case 'problems':
        return {
          icon: <Brain className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />,
          accent: 'cyan',
        };
      case 'cf-peak':
        return {
          icon: <Trophy className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />,
          accent: 'cyan',
        };
      case 'codechef':
        return {
          icon: <Award className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />,
          accent: 'cyan',
        };
      case 'mentorship':
        return {
          icon: <Users2 className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />,
          accent: 'cyan',
        };
      default:
        return {
          icon: <Flame className="w-5 h-5 text-cyan-400" />,
          accent: 'cyan',
        };
    }
  };

  const renderStatValue = (stat: StatItem) => {
    if (stat.id === 'problems') {
      return <AnimatedCounter value={1500} suffix="+" />;
    }
    if (stat.id === 'mentorship') {
      return <AnimatedCounter value={100} suffix="+" />;
    }
    if (stat.id === 'cf-peak') {
      return (
        <span className="flex items-center space-x-1.5">
          <AnimatedCounter value={liveStats.cfMaxRating} />
          {liveStats.isLive && (
            <span
              className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
              title="Live verified via Codeforces API"
            />
          )}
        </span>
      );
    }
    return stat.value;
  };

  return (
    <section id="about" className="scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <SectionHeader
          numberTag="// 01 ABOUT"
          badgeText="Engineering & Acumen"
          badgeIcon={<Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
          title="About Me"
          subtitle="Electronics & Communication student passionate about building scalable full-stack applications and solving algorithmic problems."
          accent="cyan"
        />

        {/* Narrative & Philosophy Grid: Two equal-height columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch mb-12 sm:mb-16">
          {/* Left Column: Story Card (Tilt off) */}
          <GlassCard3D tilt={false} accent="cyan" className="h-full">
            {/* Header: Avatar + Name + Role */}
            <div className="flex items-center gap-4 pb-4 border-b border-slate-200 dark:border-white/10 min-w-0">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-zinc-950">
                <img
                  src={imgSrc}
                  alt={personal.name}
                  onError={() => setImgSrc(personal.avatarFallback)}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>

              <div className="min-w-0 space-y-0.5">
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 leading-normal truncate">
                  Full Stack Dev & Problem Solver
                </p>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white truncate">
                  {personal.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 truncate">
                  {about.education.institute}
                </p>
              </div>
            </div>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 pt-1 flex-1">
              {about.paragraphs.map((p, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-slate-600 dark:text-zinc-300 break-words"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Academic Background Sub-card at bottom of story card */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 mt-auto">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-100 dark:border-transparent text-cyan-700 dark:text-cyan-400 shrink-0 mt-0.5">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 leading-normal">
                    Education
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5 break-words">
                    {about.education.institute}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 break-words">
                    {about.education.program} · {about.education.location}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard3D>

          {/* Right Column: Two stacked equal-padding cards (Tilt off) */}
          <div className="flex flex-col gap-6 md:gap-8 h-full justify-between">
            {/* Card 1: What I Enjoy Building */}
            <GlassCard3D tilt={false} accent="cyan" className="flex-1">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white leading-normal">
                  What I Enjoy Building
                </h3>
              </div>

              <div className="space-y-3.5 pt-1">
                {about.whatIEnjoy.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 shrink-0" />
                      <span className="break-words">{item.title}</span>
                    </p>
                    <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed pl-3.5 break-words">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard3D>

            {/* Card 2: Engineering Philosophy */}
            <GlassCard3D tilt={false} accent="cyan" className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-400 leading-normal">
                Engineering Philosophy
              </p>

              <div>
                <blockquote className="border-l-2 border-cyan-600 dark:border-cyan-500 pl-3.5 py-1 text-sm italic font-medium text-slate-800 dark:text-zinc-200 leading-relaxed break-words">
                  "{about.philosophy}"
                </blockquote>
              </div>

              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed break-words">
                {about.closing}
              </p>

              <div className="pt-3 border-t border-slate-200 dark:border-white/10 mt-auto">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between shadow-sm dark:shadow-none">
                  <span className="font-medium">Current Status</span>
                  <span className="font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {about.currentStatus}
                  </span>
                </div>
              </div>
            </GlassCard3D>
          </div>
        </div>

        {/* 4 Interactive Stat Cards: 2x2 on mobile, 4 columns on desktop (Light tilt allowed) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {stats.map((stat: StatItem) => {
            const config = getStatConfig(stat.id);

            return (
              <GlassCard3D
                key={stat.id}
                accent="cyan"
                tilt={true}
                className="h-full"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
                    {config.icon}
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
                    {renderStatValue(stat)}
                  </span>
                </div>

                <div className="mt-auto">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white leading-normal break-words">
                    {stat.label}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 break-words">
                    {stat.description}
                  </p>
                </div>
              </GlassCard3D>
            );
          })}
        </div>
      </div>
    </section>
  );
};
