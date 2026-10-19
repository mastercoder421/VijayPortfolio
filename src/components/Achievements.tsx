import React from 'react';
import { Trophy, Medal, Award, Star } from 'lucide-react';
import { portfolioData, AchievementItem } from '../data/portfolio';
import { GlassCard3D } from './GlassCard3D';
import { SectionHeader } from './SectionHeader';

export const Achievements: React.FC = () => {
  const { achievements } = portfolioData;

  const getIcon = (idx: number) => {
    if (idx === 0) return <Trophy className="w-5 h-5 text-amber-500 dark:text-amber-400" />;
    if (idx === 1) return <Medal className="w-5 h-5 text-amber-500 dark:text-amber-400" />;
    return <Award className="w-5 h-5 text-amber-500 dark:text-amber-400" />;
  };

  return (
    <section id="achievements" className="scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <SectionHeader
          numberTag="// 06 AWARDS"
          badgeText="Honors & Contests"
          badgeIcon={<Star className="w-3.5 h-3.5 text-amber-400" />}
          title="Contest Achievements"
          subtitle="National collegiate contest rankings, hackathon distinctions, and academic recognition."
          accent="amber"
        />

        {/* 3 Equal Cards in a responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {achievements.map((item: AchievementItem, index) => (
            <GlassCard3D
              key={item.id}
              accent="amber"
              tilt={true}
              className="h-full"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
                  {getIcon(index)}
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20 shadow-sm dark:shadow-none">
                  {item.rank}
                </span>
              </div>

              {/* Title & Event */}
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white leading-snug break-words">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mt-1 break-words">
                  {item.event}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed break-words flex-1">
                {item.description}
              </p>

              {/* Card Footer */}
              <div className="mt-auto pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-zinc-400 font-mono">
                  {item.tag}
                </span>
                <span className="text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Verified
                </span>
              </div>
            </GlassCard3D>
          ))}
        </div>
      </div>
    </section>
  );
};
