import React from 'react';
import { Briefcase } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { Timeline } from './Timeline';
import { SectionHeader } from './SectionHeader';

export const Experience: React.FC = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <SectionHeader
          numberTag="// 04 EXPERIENCE"
          badgeText="Leadership & Mentorship"
          badgeIcon={<Briefcase className="w-3.5 h-3.5 text-amber-400" />}
          title="Experience & Impact"
          subtitle="Empowering hundreds of students in data structures and competitive programming, and directing major institutional events."
          accent="amber"
        />

        {/* Clean Vertical Timeline */}
        <div className="max-w-3xl mx-auto">
          <Timeline items={experience} />
        </div>
      </div>
    </section>
  );
};
