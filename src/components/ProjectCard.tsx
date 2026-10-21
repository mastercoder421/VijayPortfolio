import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  Globe,
  Sparkles,
  CheckCircle,
  Eye,
  Smartphone,
} from 'lucide-react';
import { Project } from '../data/portfolio';
import { GlassCard3D } from './GlassCard3D';
import { MagneticButton } from './MagneticButton';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);

  const demoLink = project.demoUrl || project.liveUrl;
  const isMobile =
    project.id.toLowerCase().includes('wall') ||
    project.techStack.includes('Mobile App') ||
    project.techStack.includes('Kotlin');

  const currentScreenshot =
    project.screenshots && project.screenshots.length > 0
      ? project.screenshots[activeScreenshotIndex] || project.screenshots[0]
      : null;

  return (
    <GlassCard3D tilt={false} accent="emerald" className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center min-w-0">
        {/* Left Column: Device / Mockup Window with Screenshots (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-3 min-w-0">
          {/* Device-frame style browser / app border */}
          <div className="rounded-xl overflow-hidden border border-slate-300/80 dark:border-white/10 bg-slate-900 shadow-md">
            {/* Window Header */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-100 dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800">
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>

              <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-white dark:bg-zinc-950 text-[11px] text-slate-600 dark:text-zinc-400 font-mono border border-slate-200 dark:border-zinc-800 truncate shadow-inner dark:shadow-none">
                {isMobile ? (
                  <>
                    <Smartphone className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="truncate">WallGodds App · Kotlin & Compose</span>
                  </>
                ) : (
                  <>
                    <Globe className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="truncate">campus-one-nine.vercel.app</span>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Main Screenshot Image Container */}
            <div
              className={`relative aspect-[16/10] w-full bg-slate-950 overflow-hidden ${
                isMobile ? 'flex items-center justify-center p-2.5 sm:p-3' : ''
              }`}
            >
              {currentScreenshot ? (
                isMobile ? (
                  <>
                    {/* Soft ambient backdrop of current wallpaper so letterboxing looks ultra-sleek */}
                    <img
                      src={currentScreenshot.url}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none select-none"
                    />

                    {/* Centered portrait phone screen */}
                    <img
                      src={currentScreenshot.url}
                      alt={currentScreenshot.caption || project.title}
                      className="relative z-10 h-full w-auto max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300"
                      loading="lazy"
                    />
                  </>
                ) : (
                  <img
                    src={currentScreenshot.url}
                    alt={currentScreenshot.caption || project.title}
                    className="w-full h-auto aspect-[16/10] object-cover object-top transition-all duration-300"
                    loading="lazy"
                  />
                )
              ) : null}

              {/* Caption Overlay */}
              {currentScreenshot && (
                <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-3 flex items-center justify-between text-xs text-zinc-200">
                  <span className="font-medium flex items-center space-x-1.5 truncate">
                    <Eye className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{currentScreenshot.caption}</span>
                  </span>
                  {project.screenshots.length > 1 && (
                    <span className="font-mono text-[11px] text-zinc-400 shrink-0 ml-2">
                      {activeScreenshotIndex + 1} / {project.screenshots.length}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Screenshot Switcher Tabs that wrap cleanly */}
          {project.screenshots && project.screenshots.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {project.screenshots.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveScreenshotIndex(idx)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeScreenshotIndex === idx
                      ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 font-semibold shadow-sm'
                      : 'bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-transparent'
                  }`}
                >
                  {s.caption.split('(')[0]?.trim()}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Actions (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 min-w-0">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20 mb-2 shadow-sm dark:shadow-none">
              {isMobile ? (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Mobile App · GSSoC 2025</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Featured Flagship Platform</span>
                </>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white leading-snug break-words">
              {project.title}
            </h3>

            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed break-words">
              {project.description}
            </p>

            {/* Highlights */}
            {project.highlights && (
              <ul className="mt-3.5 space-y-1.5">
                {project.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start space-x-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-300"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                    <span className="break-words">{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tech Stack Badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 dark:bg-zinc-800/80 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.03)] dark:shadow-none"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {demoLink && (
              <MagneticButton
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-md shadow-emerald-600/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer active:scale-98"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </MagneticButton>
            )}

            {project.githubUrl && (
              <MagneticButton
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white dark:glass-card border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white hover:border-emerald-500/40 shadow-sm dark:shadow-none hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer active:scale-98"
              >
                <Github className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
                <span>GitHub Code</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
              </MagneticButton>
            )}
          </div>
        </div>
      </div>
    </GlassCard3D>
  );
};
