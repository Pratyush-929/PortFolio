import React from 'react';
import { Code2, ShieldAlert, Terminal, Cpu } from 'lucide-react';

export default function Skills() {
  const programmingSkills = [
    { name: 'Python (Scripting & Exploits)', level: 75 },
    { name: 'HTML5 / CSS3', level: 80 },
    { name: 'JavaScript / Node.js', level: 70 },
    { name: 'React.js', level: 65 },
    { name: 'Bash / Shell Scripting', level: 75 },
    { name: 'C Language', level: 55 },
    { name: 'MySQL / PHP', level: 50 },
  ];

  const securitySkills = [
    { name: 'OSINT & Reconnaissance', level: 75 },
    { name: 'Web Application Security & OWASP Top 10', level: 70 },
    { name: 'Digital Forensics', level: 68 },
    { name: 'Network Security & Wireshark', level: 60 },
    { name: 'Threat Monitoring', level: 55 },
    { name: 'SOC Analyst', level: 50 },
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Code2 size={16} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="section-title">Skills & Competencies</h2>
          <p className="section-subtitle">
            Languages, defensive security tools, digital forensics, network packet analysis, and SOC monitoring competencies.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid-2">
          
          {/* Languages & Frameworks */}
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Code2 size={18} style={{ color: 'var(--accent-emerald)' }} />
              <span>Languages & Frameworks</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {programmingSkills.map((skill, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    <span>{skill.name}</span>
                    <span className="font-mono" style={{ color: 'var(--accent-emerald)' }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${skill.level}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--accent-emerald) 0%, #34d399 100%)',
                        borderRadius: '4px'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Defensive Security & Operations */}
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={18} style={{ color: 'var(--accent-cyan)' }} />
              <span>Defensive Security & Threat Analysis</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {securitySkills.map((skill, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    <span>{skill.name}</span>
                    <span className="font-mono" style={{ color: 'var(--accent-cyan)' }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${skill.level}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--accent-cyan) 0%, #60a5fa 100%)',
                        borderRadius: '4px'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
