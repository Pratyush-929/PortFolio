import React, { useState, useEffect } from 'react';
import { Terminal, Star, GitFork, ExternalLink, ShieldCheck } from 'lucide-react';
import { initialProjects } from '../data/portfolioData';

export default function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) return;
      const json = await res.json();
      if (json.success && json.data) {
        setProjects(json.data);
      }
    } catch {
      // Offline / GitHub Pages static mode: already initialized with initialProjects
    }
  };

  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Terminal size={16} />
            <span>Defensive Labs & Projects</span>
          </div>
          <h2 className="section-title">Security Tools & Projects</h2>
          <p className="section-subtitle">
            Hands-on home lab network monitoring setups, Wireshark packet analysis, blue team triage, and security utilities.
          </p>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="font-mono" style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
            <span>⏳ Loading projects from database...</span>
          </div>
        ) : (
          <div className="grid-2">
            {projects.map((proj) => (
              <div key={proj.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
                <div>
                  
                  {/* Category & Stats */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span className="badge badge-cyan">{proj.category}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }} className="font-mono">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Star size={14} style={{ color: '#f59e0b' }} />
                        <span>{proj.stars}</span>
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <GitFork size={14} />
                        <span>{proj.forks}</span>
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    {proj.title}
                  </h3>

                  {/* Description */}
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {proj.description}
                  </p>

                  {/* Tech stack badges (Fix for Screenshot 4 issue) */}
                  <div className="project-card-badges">
                    {proj.tech_stack.split(',').map((tech, idx) => (
                      <span key={idx} className="tech-tag">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                </div>

                {/* GitHub / Demo Links */}
                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }} className="font-mono">
                  <a
                    href={proj.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontWeight: 700, color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <span>View Repository</span>
                    <ExternalLink size={14} />
                  </a>

                  {proj.demo_url && (
                    <a
                      href={proj.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      <span>Live Link</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
