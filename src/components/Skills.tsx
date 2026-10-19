import React from 'react';
import { Layout, Server, Database, Wrench, Cpu } from 'lucide-react';
import { portfolioData, SkillCategory } from '../data/portfolio';
import { GlassCard3D } from './GlassCard3D';
import { SectionHeader } from './SectionHeader';

interface PodConfig {
  icon: React.ReactNode;
  tag: string;
  statusText: string;
}

const podConfigs: Record<string, PodConfig> = {
  Frontend: {
    icon: <Layout className="w-5 h-5 text-violet-500 dark:text-violet-400" />,
    tag: 'POD-01 // UI',
    statusText: 'Interactive & Modern',
  },
  Backend: {
    icon: <Server className="w-5 h-5 text-violet-500 dark:text-violet-400" />,
    tag: 'POD-02 // CORE',
    statusText: 'Reliable Architecture',
  },
  'Databases & Cloud': {
    icon: <Database className="w-5 h-5 text-violet-500 dark:text-violet-400" />,
    tag: 'POD-03 // DATA',
    statusText: 'Scalable Schemas',
  },
  'Developer Tools': {
    icon: <Wrench className="w-5 h-5 text-violet-500 dark:text-violet-400" />,
    tag: 'POD-04 // DEVOPS',
    statusText: 'Tooling & CI/CD',
  },
};

const defaultPodConfig: PodConfig = {
  icon: <Wrench className="w-5 h-5 text-violet-500 dark:text-violet-400" />,
  tag: 'POD // STACK',
  statusText: 'Active Production',
};

export const Skills: React.FC = () => {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <SectionHeader
          numberTag="// 02 SKILLS"
          badgeText="Technical Repertoire"
          badgeIcon={<Cpu className="w-3.5 h-3.5 text-violet-400" />}
          title="Skills & Technologies"
          subtitle="Core engineering stack, frameworks, and developer tools I use to build robust full-stack systems."
          accent="violet"
        />

        {/* 4 Pods in a 2x2 grid (4 cols on xl) with equal height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {skills.map((category: SkillCategory) => {
            const config = podConfigs[category.title] || defaultPodConfig;

            return (
              <GlassCard3D
                key={category.title}
                accent="violet"
                tilt={true}
                className="h-full"
              >
                {/* Pod Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
                    {config.icon}
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold border bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20 text-violet-700 dark:text-violet-300 shadow-sm dark:shadow-none">
                    {config.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white leading-normal">
                  {category.title}
                </h3>

                {/* Badges: Wrap cleanly without overflowing pod */}
                <div className="flex flex-wrap gap-2 py-1 flex-1">
                  {category.skills.map((skillName) => (
                    <span
                      key={skillName}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-zinc-800/80 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-white/10 hover:border-violet-500/40 transition-colors cursor-default shadow-[0_1px_2px_rgba(0,0,0,0.03)] dark:shadow-none"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 dark:bg-violet-400 shrink-0" />
                      <span className="break-words">{skillName}</span>
                    </span>
                  ))}
                </div>

                {/* Status Rail */}
                <div className="mt-auto pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400 animate-pulse" />
                    <span className="font-medium text-slate-700 dark:text-zinc-300">{config.statusText}</span>
                  </div>
                  <span>{category.skills.length} tools</span>
                </div>
              </GlassCard3D>
            );
          })}
        </div>
      </div>
    </section>
  );
};
