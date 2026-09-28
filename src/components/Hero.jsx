import React from 'react';
import { MapPin, GraduationCap, ArrowRight, FileText, Terminal, CheckCircle2 } from 'lucide-react';

export default function Hero({ stats }) {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">

          {/* ── Left Column ────────────────────────────────── */}
          <div style={{ animation: 'fadeInUp 0.6s ease both' }}>

            {/* Status badges */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <span className="badge badge-emerald">
                <span className="pulse-dot" />
                Cybersecurity &amp; Ethical Hacker
              </span>
              <span className="badge badge-cyan">
                <MapPin size={11} />
                Kathmandu, Nepal
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-title">
              Hello 👋, I'm<br />
              <span className="highlight">Pratyush Sharma</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-desc">
              Passionate cybersecurity student at{' '}
              <strong>Softwarica College of IT &amp; E-Commerce</strong>.
              Specializing in Digital Forensic, OSINT and GRC Domain

            </p>

            {/* Quick info list */}
            <ul className="hero-meta-list">
              <li>
                <GraduationCap size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                BSc (Hons) Cybersecurity &amp; Ethical Hacking — Softwarica College
              </li>
              <li>
                <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                3rd Year · 5th Semester · TryHackMe Top 1% Global
              </li>
            </ul>

            {/* CTA buttons */}
            <div className="hero-btns">
              <a href="#projects" className="btn btn-primary">
                <span>View My Work</span>
                <ArrowRight size={15} />
              </a>
              <a href="#resume" className="btn btn-secondary">
                <FileText size={15} style={{ color: 'var(--accent-emerald)' }} />
                <span>Interactive Resume</span>
              </a>
              <a href="#terminal" className="btn btn-outline font-mono">
                <Terminal size={15} />
                <span>CTF Shell</span>
              </a>
            </div>

            {/* Stats */}
            <div className="hero-stats-row">
              <div className="stat-item">
                <span className="stat-value">{stats?.projects_count ?? 10}+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats?.certifications_count ?? 16}+</span>
                <span className="stat-label">Certifications</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">Top 1%</span>
                <span className="stat-label">TryHackMe</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">2nd</span>
                <span className="stat-label">CTF Place</span>
              </div>
            </div>
          </div>

          {/* ── Right Column — Terminal ───────────────────── */}
          <div style={{ animation: 'fadeInUp 0.6s 0.15s ease both' }}>
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <span className="font-mono" style={{ fontSize: '0.72rem', color: '#8b949e' }}>
                  spratyush929@kali:~ — zsh
                </span>
              </div>

              <div className="terminal-body">
                <div style={{ color: '#6e7681', marginBottom: '1rem' }}>
                  # Pratyush Sharma · Security Identity
                </div>

                <TermLine label="[+] Platform" value="TryHackMe" color="#10b981" />
                <TermLine label="    └─ Rank" value="Top 1% Global Player" color="#10b981" />

                <div style={{ marginTop: '0.5rem' }} />

                <TermLine label="[+] Platform" value="HackTheBox" color="#38bdf8" />
                <TermLine label="    └─ Status" value="Active Security Player" color="#38bdf8" />

                <div style={{ marginTop: '0.5rem' }} />

                <TermLine label="[+] Focus" value="Digital Forensics & OSINT" color="#a855f7" />
                <TermLine label="[+] CTF Team" value="Team Visored (Member)" color="#f59e0b" />

                <div style={{
                  margin: '1rem 0',
                  padding: '0.75rem',
                  background: '#161e2e',
                  borderRadius: '8px',
                  border: '1px solid #1f2d47',
                  fontSize: '0.78rem'
                }}>
                  <div style={{ color: '#f59e0b', fontWeight: 700, marginBottom: '0.25rem' }}>
                    🏆 CTF Achievement:
                  </div>
                  <div style={{ color: '#c9d1d9' }}>
                    2nd Place — Pentester Nepal CTF 2026
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '0.25rem' }}>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>$</span>
                  <span style={{ color: '#c9d1d9' }}>ready for security engagements...</span>
                  <span style={{
                    width: '7px', height: '15px',
                    background: '#10b981',
                    display: 'inline-block',
                    animation: 'blink 1s step-end infinite'
                  }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function TermLine({ label, value, color }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
      <span style={{ color: '#8b949e', minWidth: '140px' }}>{label}:</span>
      <span style={{ color, fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
}
