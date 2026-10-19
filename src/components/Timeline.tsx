import React from 'react';
import { Users, Briefcase, Calendar, CheckCircle2, HeartHandshake } from 'lucide-react';
import { ExperienceItem } from '../data/portfolio';
import { GlassCard3D } from './GlassCard3D';

interface TimelineProps {
  items: ExperienceItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const getItemIcon = (badge: string) => {
    if (badge === 'Mentorship') return <Users className="w-4 h-4 text-amber-500 dark:text-amber-400" />;
    if (badge === 'Leadership') return <Briefcase className="w-4 h-4 text-amber-500 dark:text-amber-400" />;
    return <HeartHandshake className="w-4 h-4 text-amber-500 dark:text-amber-400" />;
  };

  return (
    <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 dark:border-zinc-800 space-y-8 sm:space-y-10 ml-3 sm:ml-4">
      {items.map((item) => (
        <div key={item.id} className="relative group">
          {/* Timeline Node Orb (Clean, centered on vertical border) */}
          <div className="absolute -left-[33px] sm:-left-[41px] top-6 w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border-2 border-amber-500 dark:border-amber-400 flex items-center justify-center shadow-sm z-10">
            {getItemIcon(item.badge)}
          </div>

          {/* Timeline Card (Tilt off) */}
          <GlassCard3D tilt={false} accent="amber" className="w-full">
            {/* Badge & Period Header */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20 shadow-sm dark:shadow-none">
                {item.badge}
              </span>

              <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.period}</span>
              </span>
            </div>

            {/* Role & Organization */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white leading-snug break-words">
                {item.role}
              </h3>
              <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mt-0.5 break-words">
                {item.organization}
              </p>
            </div>

            {/* Bullet Points */}
            <ul className="space-y-2 pt-1">
              {item.points.map((point, pIdx) => (
                <li
                  key={pIdx}
                  className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-zinc-300 leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                  <span className="break-words">{point}</span>
                </li>
              ))}
            </ul>
          </GlassCard3D>
        </div>
      ))}
    </div>
  );
};
