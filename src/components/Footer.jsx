import React from 'react';
import { Shield, Cpu } from 'lucide-react';
import { InstagramIcon, FacebookIcon, TikTokIcon, LinkedInIcon, GitHubIcon } from './SocialIcons';
import { Flame, Box } from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  return (
    <footer className="footer">
      <div className="container">

        {/* Top row: brand + socials */}
        <div className="footer-top">

          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
            <div className="brand-logo-icon">
              <Shield size={20} />
            </div>
            <div>
              <div className="footer-brand-name">
                Pratyush <span style={{ color: 'var(--accent-emerald)' }}>//</span> Cybersecurity
              </div>
              <div className="footer-tagline">
                Kathmandu, Nepal · Softwarica College of IT &amp; E-Commerce
              </div>
              <div className="footer-tagline" style={{ marginTop: '0.2rem' }}>
                BSc (Hons) Ethical Hacking &amp; Cyber Security
              </div>
            </div>
          </div>

          {/* Social links */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.6rem',
              fontWeight: 700
            }}>
              Connect
            </div>
            <div className="footer-social">
              <a href="https://www.linkedin.com/in/pratyush-sharma-01673a326/"
                target="_blank" rel="noopener noreferrer"
                className="social-btn linkedin" title="LinkedIn">
                <LinkedInIcon size={15} />
              </a>
              <a href="https://github.com/Pratyush-929"
                target="_blank" rel="noopener noreferrer"
                className="social-btn github" title="GitHub">
                <GitHubIcon size={15} />
              </a>
              <a href="https://tryhackme.com/p/spratyush929"
                target="_blank" rel="noopener noreferrer"
                className="social-btn tryhackme" title="TryHackMe">
                <Flame size={15} />
              </a>
              <a href="https://profile.hackthebox.com/profile/01a0e878-32cc-7209-87be-88948543ef18"
                target="_blank" rel="noopener noreferrer"
                className="social-btn hackthebox" title="HackTheBox">
                <Box size={15} />
              </a>
              <a href="https://www.instagram.com/pratyush_929/"
                target="_blank" rel="noopener noreferrer"
                className="social-btn instagram" title="Instagram">
                <InstagramIcon size={15} />
              </a>
              <a href="https://www.facebook.com/pratyush929"
                target="_blank" rel="noopener noreferrer"
                className="social-btn facebook" title="Facebook">
                <FacebookIcon size={15} />
              </a>
              <a href="https://www.tiktok.com/@_pratyush929"
                target="_blank" rel="noopener noreferrer"
                className="social-btn tiktok" title="TikTok">
                <TikTokIcon size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row: copyright + admin */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Pratyush Sharma · All rights reserved
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="mailto:pratyush929@gmail.com"
              style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
              pratyush929@gmail.com
            </a>
            <button
              onClick={onOpenAdmin}
              className="btn btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}
            >
              <Cpu size={13} style={{ color: 'var(--accent-emerald)' }} />
              <span>Admin Vault</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
