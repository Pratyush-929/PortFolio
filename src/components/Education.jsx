import React from 'react';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

export default function Education() {
  const items = [
    {
      degree: "BSc (Hons) in Ethical Hacking and Cyber Security",
      institution: "Softwarica College of IT and E-Commerce (Affiliated to Coventry University, UK)",
      location: "Kathmandu, Nepal",
      period: "2024 — 2027",
      status: "Currently in 4th Semester, 2nd Year",
      coursework: "Network Security, Fundamentals of Ethical Hacking, Digital Forensics, Cryptography, Web Application Security, System Administration."
    },
    {
      degree: "+2 (Higher Secondary), Science Stream",
      institution: "Little Angels College",
      location: "Kathmandu, Nepal",
      period: "2022 — 2024",
      status: "Completed",
      coursework: "Higher Secondary Education in Science."
    },
    {
      degree: "Schooling (SEE)",
      institution: "Pinnacle Scholars Academy",
      location: "Kathmandu, Nepal",
      period: "2010 — 2022",
      status: "Completed",
      coursework: "Secondary Education Examination."
    }
  ];

  return (
    <section id="education" className="section section-alt">
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <GraduationCap size={16} />
            <span>Academic Background</span>
          </div>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            Formal education timeline as listed in my official Curriculum Vitae.
          </p>
        </div>

        {/* Timeline */}
        <div className="resume-timeline" style={{ maxWidth: '850px' }}>
          {items.map((item, idx) => (
            <div key={idx} className="card" style={{ marginBottom: '1.25rem', position: 'relative', paddingLeft: '1.75rem', borderLeft: '3px solid var(--accent-emerald)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>{item.degree}</h3>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                    {item.institution}
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {item.period}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={14} style={{ color: 'var(--accent-emerald)' }} />
                  <span>{item.location}</span>
                </span>
                <span className="badge badge-emerald">{item.status}</span>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem', lineHeight: 1.55 }}>
                {item.coursework}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
