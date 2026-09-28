import React, { useState, useEffect } from 'react';
import { FileText, Printer, Copy, Check, Mail, MapPin, Phone, Shield, ExternalLink, Code } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from './SocialIcons';

export default function ResumeViewer() {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/resume');
      const json = await res.json();
      if (json.success) {
        setResumeData(json.data);
      }
    } catch (err) {
      console.error('Failed to load resume:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    if (!resumeData) return;
    const { profile, education, certifications, journey_projects } = resumeData;
    
    let md = `# CURRICULUM VITAE — ${profile.name.toUpperCase()}\n`;
    md += `**${profile.role}**\n`;
    md += `Email: ${profile.email} | Phone: ${profile.phone} | Location: ${profile.location}\n\n`;
    md += `## Profile\n${profile.summary}\n\n`;
    md += `## Objective\n${profile.career_objective}\n\n`;
    md += `## Education\n`;
    education.forEach(edu => {
      md += `### ${edu.degree} (${edu.period})\n`;
      md += `- ${edu.institution}, ${edu.location}\n`;
    });
    md += `\n## Projects\n`;
    journey_projects.forEach(proj => md += `- **${proj.title}** (${proj.period}): ${proj.desc}\n`);
    md += `\n## Certifications\n`;
    certifications.forEach(cert => md += `- ${cert.name} [${cert.status}]\n`);

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <section id="resume" className="section">
        <div className="container font-mono" style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          ⏳ Formatting Official CV Document...
        </div>
      </section>
    );
  }

  const { profile, toolkit, key_modules, education, journey_projects, certifications, reference, soft_skills } = resumeData;

  return (
    <section id="resume" className="section">
      <div className="container">
        
        {/* Top Header & Actions Bar */}
        <div className="no-print" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', gap: '1rem' }}>
          <div>
            <div className="section-tag">
              <FileText size={16} />
              <span>Official CV & Profile</span>
            </div>
            <h2 className="section-title">Curriculum Vitae</h2>
            <p className="section-subtitle">
              Exact replica of official CV formatted for entry-level SOC Analyst evaluation & security hiring.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={handleCopyMarkdown} className="btn btn-secondary">
              {copied ? <Check size={16} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={16} />}
              <span>{copied ? 'Copied MD' : 'Copy MD'}</span>
            </button>

            <button onClick={handlePrint} className="btn btn-primary">
              <Printer size={16} />
              <span>Export PDF / Print CV</span>
            </button>
          </div>
        </div>

        {/* 2-Column Exact CV Document Layout (Screenshots 2 & 3 reproduction) */}
        <div className="cv-document">
          
          {/* Top Banner */}
          <div className="cv-top-banner">
            <div className="cv-top-whoami">ROOT@SECURITY:~$ WHOAMI</div>
            <h1 className="cv-top-name">{profile.name}</h1>
            <div className="cv-top-role">{profile.role}</div>
            
            <div className="cv-top-meta-row">
              <span>2nd Year <strong>4TH SEMESTER</strong></span>
              <span>•</span>
              <span><strong>6+</strong> CERTIFICATIONS</span>
              <span>•</span>
              <span><strong>3</strong> LANGUAGES</span>
              <span>•</span>
              <span><strong>SOC</strong> CAREER TARGET</span>
            </div>
          </div>

          {/* 2-Column Layout */}
          <div className="cv-body-layout">
            
            {/* Left Sidebar */}
            <div className="cv-sidebar">
              
              {/* Focus Split */}
              <div className="cv-sidebar-section">
                <div className="cv-sidebar-title">FOCUS SPLIT (SELF-ASSESSED)</div>
                <ul className="cv-sidebar-list">
                  <li>• Network / Defensive: <strong>55%</strong></li>
                  <li>• SOC & Monitoring: <strong>30%</strong></li>
                  <li>• Other Domains: <strong>15%</strong></li>
                </ul>
              </div>

              {/* Languages */}
              <div className="cv-sidebar-section">
                <div className="cv-sidebar-title">LANGUAGES</div>
                <ul className="cv-sidebar-list">
                  {profile.languages.map((lang, idx) => (
                    <li key={idx}><strong>{lang.name}</strong> — {lang.status}</li>
                  ))}
                </ul>
              </div>

              {/* Toolkit */}
              <div className="cv-sidebar-section">
                <div className="cv-sidebar-title">TOOLKIT</div>
                <ul className="cv-sidebar-list">
                  {toolkit.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Key Modules */}
              <div className="cv-sidebar-section">
                <div className="cv-sidebar-title">KEY MODULES</div>
                <ul className="cv-sidebar-list">
                  {key_modules.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Certifications */}
              <div className="cv-sidebar-section">
                <div className="cv-sidebar-title">CERTIFICATIONS</div>
                <ul className="cv-sidebar-list">
                  {certifications.map((cert, idx) => (
                    <li key={idx} style={{ marginBottom: '0.5rem' }}>
                      • {cert.name} <em>({cert.status})</em>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="cv-sidebar-section">
                <div className="cv-sidebar-title">CONTACT</div>
                <ul className="cv-sidebar-list">
                  <li>📍 {profile.location}</li>
                  <li>📞 {profile.phone}</li>
                  <li>✉️ {profile.email}</li>
                  <li>🔗 linkedin.com/in/pratyush-sharma</li>
                  <li>💻 github.com/Pratyush-929</li>
                </ul>
              </div>

              {/* Reference */}
              <div>
                <div className="cv-sidebar-title">REFERENCE</div>
                <div style={{ fontSize: '0.85rem' }}>
                  <strong>{reference.name}</strong> — {reference.role}<br />
                  {reference.phone}
                </div>
              </div>

            </div>

            {/* Right Main Content Column */}
            <div className="cv-main-content">
              
              {/* Profile & Objective */}
              <div className="cv-main-section">
                <div className="cv-main-title">PROFILE & CAREER OBJECTIVE</div>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                  {profile.summary}
                </p>
                <div style={{ padding: '0.85rem', background: '#f8fafc', borderLeft: '3px solid #059669', fontSize: '0.85rem', color: '#334155' }}>
                  <strong>Objective:</strong> {profile.career_objective}
                </div>
              </div>

              {/* Self-Study Progress */}
              <div className="cv-main-section">
                <div className="cv-main-title">SELF-STUDY PROGRESS & COMPETENCIES</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyBetween: 'space-between', fontSize: '0.8rem', fontWeight: 700 }}>
                      <span>Networking (TCP/IP, VLANs, Routing)</span>
                      <span className="font-mono" style={{ color: '#059669' }}>80%</span>
                    </div>
                    <div className="cv-progress-bar"><div className="cv-progress-fill" style={{ width: '80%' }}></div></div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyBetween: 'space-between', fontSize: '0.8rem', fontWeight: 700 }}>
                      <span>Firewalls & VPNs</span>
                      <span className="font-mono" style={{ color: '#059669' }}>75%</span>
                    </div>
                    <div className="cv-progress-bar"><div className="cv-progress-fill" style={{ width: '75%' }}></div></div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyBetween: 'space-between', fontSize: '0.8rem', fontWeight: 700 }}>
                      <span>Packet Analysis (Wireshark)</span>
                      <span className="font-mono" style={{ color: '#059669' }}>75%</span>
                    </div>
                    <div className="cv-progress-bar"><div className="cv-progress-fill" style={{ width: '75%' }}></div></div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyBetween: 'space-between', fontSize: '0.8rem', fontWeight: 700 }}>
                      <span>Windows & Linux Administration</span>
                      <span className="font-mono" style={{ color: '#059669' }}>60%</span>
                    </div>
                    <div className="cv-progress-bar"><div className="cv-progress-fill" style={{ width: '60%' }}></div></div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyBetween: 'space-between', fontSize: '0.8rem', fontWeight: 700 }}>
                      <span>SIEM / Log Analysis (Introductory)</span>
                      <span className="font-mono" style={{ color: '#059669' }}>40%</span>
                    </div>
                    <div className="cv-progress-bar"><div className="cv-progress-fill" style={{ width: '40%' }}></div></div>
                  </div>
                </div>
              </div>

              {/* Journey & Project History */}
              <div className="cv-main-section">
                <div className="cv-main-title">JOURNEY & PROJECT HISTORY</div>
                
                {journey_projects.map((proj, idx) => (
                  <div key={idx} className="cv-item-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div className="cv-item-title">{proj.title}</div>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#059669', fontWeight: 700 }}>{proj.period}</div>
                    </div>
                    <p className="cv-item-desc" style={{ marginTop: '0.25rem' }}>{proj.desc}</p>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="cv-main-section">
                <div className="cv-main-title">EDUCATION</div>
                
                {education.map((edu, idx) => (
                  <div key={idx} className="cv-item-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div className="cv-item-title">{edu.degree}</div>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>{edu.period}</div>
                    </div>
                    <div className="cv-item-sub">{edu.institution}</div>
                    <p className="cv-item-desc">{edu.details}</p>
                  </div>
                ))}
              </div>

              {/* Soft Skills */}
              <div>
                <div className="cv-main-title">ADDITIONAL INFORMATION & SOFT SKILLS</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {soft_skills.map((skill, idx) => (
                    <span key={idx} style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', background: '#f1f5f9', border: '1px solid #cbd5e1', fontSize: '0.8rem', fontWeight: 600 }}>
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
