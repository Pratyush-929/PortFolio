import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'portfolio.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      inquiry_type TEXT NOT NULL,
      message TEXT NOT NULL,
      encrypted INTEGER DEFAULT 0,
      status TEXT DEFAULT 'unread',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      tech_stack TEXT NOT NULL,
      period TEXT NOT NULL,
      stars INTEGER DEFAULT 0,
      forks INTEGER DEFAULT 0,
      github_url TEXT DEFAULT '#',
      demo_url TEXT,
      featured INTEGER DEFAULT 1
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS certifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      issuer TEXT NOT NULL,
      status TEXT NOT NULL,
      badge_color TEXT NOT NULL,
      skills TEXT NOT NULL,
      credential_id TEXT DEFAULT 'N/A',
      issue_date TEXT DEFAULT '',
      expiry_date TEXT DEFAULT '',
      verification_link TEXT DEFAULT '#'
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS advisories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cve_id TEXT NOT NULL,
      title TEXT NOT NULL,
      severity TEXT NOT NULL,
      cvss_score TEXT NOT NULL,
      description TEXT NOT NULL,
      impact TEXT NOT NULL,
      remediation TEXT NOT NULL,
      affected_stack TEXT NOT NULL,
      tags TEXT NOT NULL,
      date TEXT NOT NULL
    )
  `);

  seedData();
}

function seedData() {
  db.prepare('DELETE FROM projects').run();
  db.prepare('DELETE FROM certifications').run();
  db.prepare('DELETE FROM advisories').run();

  // ── Projects ──────────────────────────────────────────────────
  const insertProj = db.prepare(`
    INSERT INTO projects (title, category, description, tech_stack, period, stars, forks, github_url, demo_url, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertProj.run(
    'Home Lab — Simulated Small Office Network',
    'Defensive Security',
    'Built a virtualized network using VMs and Cisco Packet Tracer, including a firewall and department segmentation. Captured traffic with Wireshark to distinguish normal from suspicious activity.',
    'VMs, Cisco Packet Tracer, Wireshark, Firewall, GNS3',
    '2025 — Present', 12, 3, 'https://github.com/Pratyush-929', null, 1
  );

  insertProj.run(
    'Blue Team Skill-Building — TryHackMe SOC Path',
    'SOC & SIEM Labs',
    'Working through SOC Level 1 rooms on TryHackMe covering log analysis, SIEM basics, Security Onion, and phishing/alert triage. Currently Top 1% global ranking.',
    'TryHackMe, SIEM, Security Onion, Log Analysis',
    '2025 — Present', 8, 2, 'https://tryhackme.com/p/spratyush929', 'https://tryhackme.com/p/spratyush929', 1
  );

  insertProj.run(
    'Packet Analysis & Network Traffic Practice',
    'Network Security',
    'Studying network traffic in Wireshark to differentiate normal activity from suspicious patterns and isolating protocol anomalies.',
    'Wireshark, TCP/IP, Packet Analysis, Networking',
    '2024 — Present', 5, 1, 'https://github.com/Pratyush-929', null, 1
  );

  insertProj.run(
    'Certification Prep (CompTIA Network+ & CCNA)',
    'Certification Prep',
    'Preparing for CompTIA Network+, Security+ and CCNA alongside degree coursework at Softwarica College.',
    'CompTIA Network+, CCNA, Subnetting, Routing, VLANs',
    '2025 — Present', 3, 0, 'https://github.com/Pratyush-929', null, 1
  );

  // ── Certifications ─────────────────────────────────────────────
  const insertCert = db.prepare(`
    INSERT INTO certifications (title, issuer, status, badge_color, skills, credential_id, issue_date, expiry_date, verification_link)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertCert.run(
    'ISC2 Certified in Cybersecurity (CC)',
    'ISC2',
    'Active',
    '#2563EB',
    'Security Principles, Business Continuity, Access Controls, Network Security',
    'CC-2026-PRATYUSH',
    'Jan 2026',
    'Jan 2029',
    'https://www.isc2.org/'
  );

  insertCert.run(
    'Google Cybersecurity Professional Certificate',
    'Google / Coursera',
    'In Progress',
    '#4285F4',
    'SIEM Tools, Python, Linux Hardening, SQL, Incident Response',
    'GOOGLE-CYBER-2026',
    '2026',
    '',
    'https://www.coursera.org/professional-certificates/google-cybersecurity'
  );

  insertCert.run(
    'Cisco Introduction to Cybersecurity / CCST',
    'Cisco Networking Academy',
    'Active',
    '#00BCEB',
    'Network Reconnaissance, Port Scanning, Firewalls, Threat Landscape',
    'CISCO-INTRO-CYBER-2025',
    '2025',
    '',
    'https://www.netacad.com/'
  );

  insertCert.run(
    'TryHackMe — SOC Level 1 Learning Path',
    'TryHackMe',
    'In Progress',
    '#E11D48',
    'SIEM Basics, Log Triage, Phishing Analysis, Incident Response',
    'THM-SOC1-PRATYUSH',
    '2025',
    '',
    'https://tryhackme.com/p/spratyush929'
  );

  insertCert.run(
    'CompTIA Network+',
    'CompTIA',
    'Target',
    '#FF0000',
    'TCP/IP, Subnetting, VLANs, Routing, Network Hardening',
    'TARGET-2026',
    'Planned 2026',
    '',
    'https://www.comptia.org/certifications/network'
  );

  insertCert.run(
    'Cisco CCNA',
    'Cisco',
    'Target',
    '#10B981',
    'IP Connectivity, IP Services, Security Fundamentals, Network Automation',
    'TARGET-2027',
    'Planned 2027',
    '',
    'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html'
  );

  // ── Advisories (demo data for portfolio) ──────────────────────
  const insertAdv = db.prepare(`
    INSERT INTO advisories (cve_id, title, severity, cvss_score, description, impact, remediation, affected_stack, tags, date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertAdv.run(
    'CVE-2025-DEMO-01',
    'SQL Injection via Unsanitized Login Parameters',
    'HIGH',
    '8.2',
    'A SQL injection vulnerability was discovered in the login form parameter. Malicious input was not sanitized before being passed to the database query, allowing attackers to bypass authentication.',
    'Attackers can bypass authentication, extract sensitive data from the database, or in some configurations execute arbitrary OS commands.',
    'Use parameterized queries (prepared statements). Implement input validation and web application firewall rules. Apply principle of least privilege to database users.',
    'PHP 7.x, MySQL 5.7, Apache 2.4',
    'sqli, authentication-bypass, owasp-top-10',
    '2025-06-01'
  );

  insertAdv.run(
    'CVE-2025-DEMO-02',
    'Stored XSS in Comment Field — No Output Encoding',
    'MEDIUM',
    '6.1',
    'A stored cross-site scripting vulnerability was identified in the user comment submission field. User-supplied input was stored and rendered without HTML encoding.',
    'Attackers can inject malicious JavaScript that executes in the context of other users, enabling session hijacking, credential theft, or malware delivery.',
    'Encode all user-supplied output before rendering. Implement Content Security Policy (CSP) headers. Use a sanitization library for HTML input.',
    'Node.js, Express 4.x, React 18',
    'xss, stored-xss, owasp-top-10, output-encoding',
    '2025-08-15'
  );

  insertAdv.run(
    'CVE-2025-DEMO-03',
    'IDOR Allowing Unauthorized Access to User Records',
    'HIGH',
    '7.5',
    'An Insecure Direct Object Reference vulnerability was found in the user profile endpoint. The application trusted user-supplied ID parameters without proper authorization checks.',
    'Any authenticated user can view or modify another user\'s private data by manipulating the ID parameter in the API request.',
    'Implement server-side authorization checks for all resource access. Use indirect references (e.g., session-scoped tokens) rather than exposing internal IDs.',
    'REST API, JWT Auth, PostgreSQL',
    'idor, broken-access-control, owasp-top-10, api-security',
    '2025-09-20'
  );
}

export default db;
