import React from 'react';
import { ShieldCheck, Bug, Award, Terminal } from 'lucide-react';

export default function SecurityStats({ stats }) {
  const items = [
    {
      icon: <Bug size={22} style={{ color: '#10b981' }} />,
      value: `${stats?.cve_discovered || 12}+`,
      label: 'CVEs & Zero-Days Disclosed',
      desc: 'Responsible disclosures across web apps, APIs & network services.'
    },
    {
      icon: <ShieldCheck size={22} style={{ color: '#38bdf8' }} />,
      value: '50+',
      label: 'Penetration Audits',
      desc: 'Red-teaming & black-box application security engagements.'
    },
    {
      icon: <Award size={22} style={{ color: '#a855f7' }} />,
      value: '16+',
      label: 'Certifications Earned',
      desc: 'eJPT, CompTIA, Cisco CCNA & more industry credentials.'
    },
    {
      icon: <Terminal size={22} style={{ color: '#f59e0b' }} />,
      value: 'Top 1%',
      label: 'CTF Global Ranking',
      desc: 'HackTheBox, TryHackMe & Pentester Nepal CTF competitor.'
    }
  ];

  return (
    <section style={{ padding: '2.5rem 0', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)', background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="grid-2" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
          {items.map((item, idx) => (
            <div key={idx} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <div style={{ padding: '0.6rem', borderRadius: '10px', background: 'var(--bg-tertiary)', display: 'flex' }}>
                  {item.icon}
                </div>
                <span className="font-mono" style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                  VERIFIED
                </span>
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem', lineHeight: 1 }}>
                  {item.value}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
