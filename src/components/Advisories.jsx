import React, { useState, useEffect } from 'react';
import { ShieldAlert, Search, ChevronRight, X, AlertTriangle, CheckCircle } from 'lucide-react';

const SEVERITY_COLORS = {
  CRITICAL: { bg: 'rgba(239,68,68,0.12)', color: '#ef4444', border: 'rgba(239,68,68,0.25)' },
  HIGH:     { bg: 'rgba(249,115,22,0.12)', color: '#f97316', border: 'rgba(249,115,22,0.25)' },
  MEDIUM:   { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
};

function SeverityBadge({ severity, score }) {
  const s = SEVERITY_COLORS[severity?.toUpperCase()] || SEVERITY_COLORS.MEDIUM;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
      padding: '0.2rem 0.55rem', borderRadius: '999px',
      fontSize: '0.68rem', fontWeight: 700,
      fontFamily: 'var(--font-mono)',
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
    }}>
      {severity} · {score}
    </span>
  );
}

export default function Advisories() {
  const [advisories, setAdvisories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAdvisory, setSelectedAdvisory] = useState(null);

  useEffect(() => { fetchAdvisories(); }, [severityFilter, searchQuery]);

  const fetchAdvisories = async () => {
    try {
      setLoading(true);
      const url = new URL('/api/advisories', window.location.origin);
      if (severityFilter !== 'ALL') url.searchParams.append('severity', severityFilter);
      if (searchQuery) url.searchParams.append('search', searchQuery);
      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) setAdvisories(json.data);
    } catch (err) {
      console.error('Failed to load advisories:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="advisories" className="section section-alt">
      <div className="container">

        {/* Header + Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <div className="section-tag">
              <ShieldAlert size={16} />
              <span>Vulnerability Intelligence &amp; Disclosures</span>
            </div>
            <h2 className="section-title">CVE Research &amp; Advisories</h2>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>
              Published zero-day disclosures, CVSS vectors, and architectural remediation guides.
            </p>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
            {/* Search */}
            <div style={{ position: 'relative', minWidth: '210px' }}>
              <Search size={14} style={{
                position: 'absolute', left: '0.7rem', top: '50%',
                transform: 'translateY(-50%)', color: 'var(--text-muted)'
              }} />
              <input
                type="text"
                placeholder="Search CVE ID or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.2rem', fontSize: '0.78rem' }}
              />
            </div>

            {/* Severity filters */}
            <div style={{
              display: 'flex', alignItems: 'center',
              padding: '0.25rem', borderRadius: '8px',
              background: 'var(--bg-tertiary)', border: '1px solid var(--card-border)',
              gap: '0.15rem',
            }}>
              {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className="font-mono"
                  style={{
                    padding: '0.3rem 0.65rem',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    transition: 'all 0.15s ease',
                    background: severityFilter === sev ? 'var(--accent-emerald)' : 'transparent',
                    color: severityFilter === sev ? '#fff' : 'var(--text-muted)',
                  }}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Advisory Grid */}
        {loading ? (
          <div className="font-mono" style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            ⏳ Loading vulnerability advisories from database...
          </div>
        ) : advisories.length === 0 ? (
          <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
            <AlertTriangle size={28} style={{ color: '#f59e0b', margin: '0 auto 0.75rem' }} />
            <p className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 700 }}>No CVE Advisories match your query.</p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              Try changing your severity filter or search parameters.
            </p>
          </div>
        ) : (
          <div className="grid-2">
            {advisories.map((adv) => (
              <div
                key={adv.id}
                className="card"
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                onClick={() => setSelectedAdvisory(adv)}
              >
                <div>
                  {/* CVE ID + Severity */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.85rem' }}>
                    <span className="font-mono" style={{
                      fontSize: '0.72rem', fontWeight: 800,
                      color: 'var(--accent-emerald)',
                      background: 'var(--accent-emerald-light)',
                      padding: '0.2rem 0.6rem', borderRadius: '5px',
                      border: '1px solid rgba(16,185,129,0.2)',
                    }}>
                      {adv.cve_id}
                    </span>
                    <SeverityBadge severity={adv.severity} score={`CVSS ${adv.cvss_score}`} />
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem', lineHeight: 1.4 }}>
                    {adv.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: '0.82rem', color: 'var(--text-muted)',
                    lineHeight: 1.6, marginBottom: '1rem',
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden'
                  }}>
                    {adv.description}
                  </p>
                </div>

                {/* Footer */}
                <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', maxWidth: '65%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {adv.affected_stack}
                  </span>
                  <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    Inspect <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedAdvisory && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
          }}>
            <div className="card" style={{
              width: '100%', maxWidth: '660px',
              maxHeight: '88vh', overflowY: 'auto',
              padding: '2rem',
              background: 'var(--card-bg)',
              animation: 'fadeInUp 0.2s ease both'
            }}>
              {/* Modal Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: '1.25rem', borderBottom: '1px solid var(--card-border)', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="font-mono" style={{
                      fontSize: '0.85rem', fontWeight: 800,
                      color: 'var(--accent-emerald)',
                      background: 'var(--accent-emerald-light)',
                      padding: '0.25rem 0.75rem', borderRadius: '5px',
                    }}>
                      {selectedAdvisory.cve_id}
                    </span>
                    <SeverityBadge severity={selectedAdvisory.severity} score={`CVSS ${selectedAdvisory.cvss_score}`} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.3 }}>{selectedAdvisory.title}</h3>
                  <p className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                    Disclosed: {selectedAdvisory.date}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedAdvisory(null)}
                  style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid var(--card-border)', background: 'var(--bg-tertiary)', cursor: 'pointer', color: 'var(--text-muted)', flexShrink: 0 }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <ModalSection title="Vulnerability Description" icon={<AlertTriangle size={15} style={{ color: '#f59e0b' }} />}>
                  <div style={{ padding: '0.85rem', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                    {selectedAdvisory.description}
                  </div>
                </ModalSection>

                <ModalSection title="Vulnerability Impact">
                  <div style={{ padding: '0.85rem', borderRadius: '8px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', fontSize: '0.85rem', lineHeight: 1.7, color: '#f87171' }}>
                    {selectedAdvisory.impact}
                  </div>
                </ModalSection>

                <ModalSection title="Remediation &amp; Hardening" icon={<CheckCircle size={15} style={{ color: '#10b981' }} />}>
                  <div style={{ padding: '0.85rem', borderRadius: '8px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', fontSize: '0.85rem', lineHeight: 1.7, color: '#6ee7b7' }}>
                    {selectedAdvisory.remediation}
                  </div>
                </ModalSection>

                <ModalSection title="Affected Stack">
                  <div style={{ padding: '0.85rem', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', fontSize: '0.85rem', color: 'var(--text-muted)' }} className="font-mono">
                    {selectedAdvisory.affected_stack}
                  </div>
                </ModalSection>

                {selectedAdvisory.tags && (
                  <ModalSection title="Tags">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {selectedAdvisory.tags.split(',').map((tag, i) => (
                        <span key={i} className="tech-tag">#{tag.trim()}</span>
                      ))}
                    </div>
                  </ModalSection>
                )}
              </div>

              {/* Close */}
              <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--card-border)', display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button onClick={() => setSelectedAdvisory(null)} className="btn btn-secondary">
                  Close Advisory
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

function ModalSection({ title, icon, children }) {
  return (
    <div>
      <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
        {icon}
        <span dangerouslySetInnerHTML={{ __html: title }} />
      </h4>
      {children}
    </div>
  );
}
