import React from 'react';
import { Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { ProjectCard } from './ProjectCard';
import { SectionHeader } from './SectionHeader';

export const Projects: React.FC = () => {
  const { projects } = portfolioData;

  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <SectionHeader
          numberTag="// 03 PROJECTS"
          badgeText="Portfolio Artifacts"
          badgeIcon={<Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
          title="Featured Projects"
          subtitle="Production-ready full-stack web platforms, intelligent campus tools, and scalable cloud systems."
          accent="emerald"
        />

        <div className="space-y-8 md:space-y-10">
          {/* 1. Featured Flagship: CampusOne */}
          {featuredProject && <ProjectCard project={featuredProject} />}

          {/* 2. Secondary Projects */}
          {otherProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
