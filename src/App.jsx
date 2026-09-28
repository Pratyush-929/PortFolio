import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import Skills from './components/Skills';
import Advisories from './components/Advisories';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import ResumeViewer from './components/ResumeViewer';
import SecurityTerminal from './components/SecurityTerminal';
import ContactSection from './components/ContactSection';
import AdminModal from './components/AdminModal';
import Footer from './components/Footer';

import { initialStats } from './data/portfolioData';

export default function App() {
  const [stats, setStats] = useState(initialStats);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    fetchStats();
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (!res.ok) return;
      const json = await res.json();
      if (json.success) {
        setStats(json.stats);
      }
    } catch {
      // Offline or GitHub Pages static hosting: already initialized with initialStats
    }
  };

  return (
    <ThemeProvider>
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        
        {/* Navigation Bar */}
        <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

        {/* Hero Section */}
        <Hero stats={stats} />

        {/* Academic Education */}
        <Education />

        {/* Technical Skills */}
        <Skills />

        {/* Open Source Projects */}
        <Projects />

        {/* CVE Vulnerability Advisories */}
        <Advisories />

        {/* Certifications */}
        <Certifications />

        {/* Official Interactive CV / Resume */}
        <ResumeViewer />

        {/* CTF Bash Terminal */}
        <SecurityTerminal />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

        {/* Admin DB Vault Modal */}
        <AdminModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />

      </div>
    </ThemeProvider>
  );
}
