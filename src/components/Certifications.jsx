import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, ExternalLink } from 'lucide-react';
import { initialCertifications } from '../data/portfolioData';

export default function Certifications() {
  const [certs, setCerts] = useState(initialCertifications);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCerts();
  }, []);

  const fetchCerts = async () => {
    try {
      const res = await fetch('/api/certs');
      if (!res.ok) return;
      const json = await res.json();
      if (json.success && json.data) {
        setCerts(json.data);
      }
    } catch {
      // Offline / GitHub Pages static mode: already initialized with initialCertifications
    }
  };

  return (
    <section id="certs" className="section">
      <div className="container">

        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Award size={16} />
            <span>Verified Credentials &amp; Accreditation</span>
          </div>
          <h2 className="section-title">Professional Certifications</h2>
          <p className="section-subtitle">
            Industry-standard certifications validating offensive penetration testing,
            cloud security engineering, and enterprise risk management.
          </p>
        </div>

        {/* Certs Grid */}
        {loading ? (
          <div className="font-mono" style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            ⏳ Loading verified certifications...
          </div>
        ) : (
          <div className="grid-2">
            {certs.map((cert) => (
              <div key={cert.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* Top Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        width: '10px', height: '10px',
                        borderRadius: '50%',
                        background: cert.badge_color || 'var(--accent-emerald)',
                        display: 'inline-block',
                        flexShrink: 0
                      }} />
                      <span className="font-mono" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                        {cert.issuer}
                      </span>
                    </div>
                    <span className="badge badge-emerald">
                      <CheckCircle2 size={10} />
                      VERIFIED
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.6rem', lineHeight: 1.35 }}>
                    {cert.title}
                  </h3>

                  {/* Credential Details */}
                  <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.85rem', lineHeight: 1.7 }}>
                    <div><strong style={{ color: 'var(--text-secondary)' }}>ID:</strong> {cert.credential_id}</div>
                    <div>
                      <strong style={{ color: 'var(--text-secondary)' }}>Issued:</strong> {cert.issue_date}
                      {cert.expiry_date ? ` · Valid thru ${cert.expiry_date}` : ''}
                    </div>
                  </div>

                  {/* Skill tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                    {cert.skills.split(',').map((skill, idx) => (
                      <span key={idx} className="tech-tag">{skill.trim()}</span>
                    ))}
                  </div>
                </div>

                {/* Verify link */}
                <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--card-border)', display: 'flex', justifyContent: 'flex-end' }}>
                  <a
                    href={cert.verification_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono"
                    style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
