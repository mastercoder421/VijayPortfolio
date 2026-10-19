import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { CPStats } from './components/CPStats';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CursorSpotlight } from './components/CursorSpotlight';
import { ScrollProgress } from './components/ScrollProgress';
import { SignatureIntro } from './components/SignatureIntro';
import { CommandPalette } from './components/CommandPalette';
import { SectionDivider } from './components/SectionDivider';

// Single global full-viewport Three.js scene (React.lazy for performance)
const GlobalBackground3D = lazy(() =>
  import('./components/GlobalBackground3D').then((module) => ({
    default: module.GlobalBackground3D,
  }))
);

export const App: React.FC = () => {
  const [isBooted, setIsBooted] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('portfolio_booted') === 'true';
    } catch {
      return false;
    }
  });

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
      {/* Handwritten Signature Intro (shown once per session, skippable) */}
      {!isBooted && <SignatureIntro onComplete={() => setIsBooted(true)} />}

      {/* Top Gradient Scroll Progress Line */}
      <ScrollProgress />

      {/* Quick Action Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Single Fixed Global Three.js Scene Shared by Entire Page */}
      <Suspense fallback={null}>
        <GlobalBackground3D />
      </Suspense>

      {/* Page Content Wrapper (relative z-10 above fixed canvas at z-0) */}
      <div className="relative z-10 min-h-screen bg-transparent text-zinc-900 dark:text-zinc-100 selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-300">
        {/* Subtle grid background texture */}
        <div
          className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.025] dark:opacity-[0.035]"
          aria-hidden="true"
        />

        {/* Dynamic Trailing Pointer & Viewport Ambient Glow */}
        <CursorSpotlight />

        {/* Floating 3D Island Navbar with Ctrl+K trigger */}
        <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

        {/* Semantic HTML5 Main landmark */}
        <main id="main-content" className="relative z-10">
          {/* 1. Hero Section with Glowing Profile Card & Direct CTAs */}
          <Hero />

          <SectionDivider accent="cyan" />

          {/* 2. About Me & Key Stats 3D Tiles */}
          <About />

          <SectionDivider accent="violet" />

          {/* 3. Technical Stack (4 3D Glass Pods) */}
          <Skills />

          <SectionDivider accent="emerald" />

          {/* 4. Featured Projects (CampusOne 3D Perspective Showcase) */}
          <Projects />

          <SectionDivider accent="amber" />

          {/* 5. Experience & Leadership 3D Timeline */}
          <Experience />

          <SectionDivider accent="cyan" />

          {/* 6. Competitive Programming & Rating Gauges */}
          <CPStats />

          <SectionDivider accent="amber" />

          {/* 7. Contest Achievements 3D Shimmer Cards */}
          <Achievements />

          <SectionDivider accent="cyan" />

          {/* 8. Contact Section with 3D Glass Cards */}
          <Contact />
        </main>

        {/* Footer with 3D Glass Top Rim */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
