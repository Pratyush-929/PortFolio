import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  Shield, Sun, Moon,
  FileText, Terminal, Code2, Award, Mail, Cpu,
  User, GraduationCap, Menu, X
} from 'lucide-react';

export default function Navbar({ onOpenAdmin }) {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '#home',      icon: <User size={13} />,         label: 'Home' },
    { href: '#education', icon: <GraduationCap size={13} />, label: 'Education' },
    { href: '#skills',    icon: <Code2 size={13} />,         label: 'Skills' },
    { href: '#projects',  icon: <Terminal size={13} />,      label: 'Projects' },
    { href: '#certs',     icon: <Award size={13} />,         label: 'Certs' },
    { href: '#resume',    icon: <FileText size={13} />,      label: 'Resume' },
    { href: '#contact',   icon: <Mail size={13} />,          label: 'Contact' },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-inner">

        {/* Brand */}
        <a href="#home" className="brand-logo">
          <div className="brand-logo-icon">
            <Shield size={18} />
          </div>
          <div>
            <div className="brand-title">
              <span>PRATYUSH</span>
              <span style={{ color: 'var(--accent-emerald)' }}>//</span>
              <span style={{ opacity: 0.75, fontSize: '0.78rem' }}>SEC</span>
            </div>
            <div className="brand-status">
              <span className="pulse-dot" />
              <span>ETHICAL HACKER</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <ul className="nav-menu">
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Right-side actions */}
        <div className="nav-actions">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="social-btn"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light'
              ? <Moon size={15} />
              : <Sun size={15} style={{ color: '#f59e0b' }} />}
          </button>

          {/* Admin vault */}
          <button
            onClick={onOpenAdmin}
            className="social-btn"
            title="Admin Vault"
          >
            <Cpu size={15} style={{ color: 'var(--accent-emerald)' }} />
          </button>

          {/* Mobile hamburger */}
          <button
            className="social-btn"
            style={{ display: 'none' }}
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            title="Menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--glass-bg)',
          borderTop: '1px solid var(--glass-border)',
          padding: '0.5rem 1.5rem 1rem',
        }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link"
                  style={{ width: '100%' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
