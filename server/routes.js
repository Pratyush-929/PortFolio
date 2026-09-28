import express from 'express';
import db from './db.js';

const router = express.Router();

router.get('/stats', (req, res) => {
  try {
    const projCount = db.prepare('SELECT COUNT(*) as count FROM projects').get().count;
    const certCount = db.prepare('SELECT COUNT(*) as count FROM certifications').get().count;
    const msgCount = db.prepare('SELECT COUNT(*) as count FROM contact_messages').get().count;

    res.json({
      success: true,
      stats: {
        projects_count: projCount,
        certifications_count: certCount,
        messages_received: msgCount,
        system_status: 'DEFENSIVE // MONITORING',
        academic_year: '2nd Year (4th Semester)',
        target_role: 'SOC Analyst / Defensive Security'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/projects', (req, res) => {
  try {
    const projects = db.prepare('SELECT * FROM projects ORDER BY featured DESC, id ASC').all();
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/certs', (req, res) => {
  try {
    const certs = db.prepare('SELECT * FROM certifications ORDER BY id ASC').all();
    res.json({ success: true, data: certs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/resume', (req, res) => {
  res.json({
    success: true,
    data: {
      profile: {
        name: 'Pratyush Sharma',
        role: 'BSc (Hons) Cyber Security Student — Aspiring SOC Analyst / Defensive Security & Network Security',
        academic_badge: '2nd Year 4TH SEMESTER | 6+ CERTIFICATIONS | 3 LANGUAGES | SOC CAREER TARGET',
        career_objective: 'Seeking an entry-level SOC Analyst / SOC Intern position to acquire hands-on experience in threat detection, monitoring, and incident response in a live security operations center environment.',
        summary: 'Second year student of Ethical Hacking and Cyber Security with interest in defensive security and network monitoring. Experience with core networking concepts, packet analysis and basic SIEM/log analysis via coursework and independent lab work.',
        location: 'Kathmandu, Nepal',
        phone: '+977-9864004444',
        email: 'pratyushsharma@gmail.com',
        focus_split: {
          defensive_network: '55%',
          soc_monitoring: '30%',
          other_domains: '15%'
        },
        languages: [
          { name: 'Nepali', status: 'Native' },
          { name: 'English', status: 'Fluent' },
          { name: 'Hindi', status: 'Conversational' }
        ],
        socials: {
          linkedin: 'https://www.linkedin.com/in/pratyush-sharma-01673a326/',
          github: 'https://github.com/Pratyush-929',
          medium: 'https://medium.com/@pratyush929',
          tryhackme: 'https://tryhackme.com/p/spratyush929',
          hackthebox: 'https://profile.hackthebox.com/profile/01a0e878-32cc-7209-87be-88948543ef18?utm_medium=copy_url',
          instagram: 'https://www.instagram.com/pratyush_929/',
          facebook: 'https://www.facebook.com/pratyush929',
          tiktok: 'https://www.tiktok.com/@_pratyush929'
        }
      },
      toolkit: [
        'Wireshark',
        'Cisco Packet Tracer · GNS3',
        'VirtualBox / VMware',
        'Security Onion (intro)',
        'TryHackMe (Blue Team / SOC path)'
      ],
      key_modules: [
        'Network Security',
        'Fundamentals of Ethical Hacking',
        'Digital Forensics',
        'Cryptography',
        'Web Application Security',
        'System Administration'
      ],
      self_study_progress: [
        { topic: 'Networking (TCP/IP, VLANs, Routing)', percent: 80 },
        { topic: 'Firewalls & VPNs', percent: 75 },
        { topic: 'Packet Analysis (Wireshark)', percent: 75 },
        { topic: 'Windows & Linux Administration', percent: 60 },
        { topic: 'SIEM / Log Analysis (introductory)', percent: 40 },
        { topic: 'PowerShell / Bash Scripting (basic)', percent: 35 }
      ],
      education: [
        {
          degree: 'BSc (Hons) in Ethical Hacking and Cyber Security',
          institution: 'Softwarica College of IT and E-Commerce (Coventry University, UK)',
          location: 'Kathmandu, Nepal',
          period: '2024 — 2027',
          details: 'Currently in 4th semester, 2nd year. Relevant coursework: Network Security, Fundamentals of Ethical Hacking, Digital Forensics, Cryptography, Web Application Security, System Administration.'
        },
        {
          degree: '+2 (Higher Secondary), Science Stream',
          institution: 'Little Angels College',
          location: 'Kathmandu, Nepal',
          period: '2022 — 2024',
          details: 'Completed Higher Secondary Education in Science.'
        },
        {
          degree: 'Schooling (SEE)',
          institution: 'Pinnacle Scholars Academy',
          location: 'Kathmandu, Nepal',
          period: '2010 — 2022',
          details: 'Completed Secondary Education Examination.'
        }
      ],
      journey_projects: [
        {
          title: 'Home Lab — Simulated Small Office Network with Monitoring',
          period: '2025 — PRESENT',
          desc: 'Built a small virtualized network using VMs and Packet Tracer, including a firewall and basic department segmentation. Captured traffic with Wireshark to distinguish normal from suspicious activity.'
        },
        {
          title: 'Blue Team Skill-Building — TryHackMe (Self-Study)',
          period: '2025 — PRESENT',
          desc: 'Working through introductory Security Operations / Blue Team rooms covering log analysis, SIEM basics, and phishing/alert triage.'
        },
        {
          title: 'Packet Analysis Practice',
          period: '2024 — PRESENT',
          desc: 'Studying network traffic in Wireshark to tell normal activity apart from suspicious activity.'
        },
        {
          title: 'Certification Prep',
          period: '2025 — PRESENT',
          desc: 'Preparing for CompTIA Network+, then Security+ and CCNA, alongside degree coursework.'
        }
      ],
      certifications: [
        { name: 'ISC2 Certified in Cybersecurity (CC)', status: 'Active' },
        { name: 'Google Cybersecurity Professional Certificate', status: 'In Progress' },
        { name: 'Cisco Introduction to Cybersecurity / CCST', status: 'Active' },
        { name: 'TryHackMe — SOC Level 1 learning path', status: 'In Progress' },
        { name: 'CompTIA Network+', status: 'Target Certification' },
        { name: 'Cisco Certified Network Associate (CCNA)', status: 'Target Certification' }
      ],
      reference: {
        name: 'Suman Shrestha',
        role: 'SOC Analyst',
        phone: '+977 9809098099'
      },
      soft_skills: [
        'Attention to detail',
        'Systematic problem solving',
        'Clear written reporting',
        'Calm under pressure',
        'Quick to learn new tools'
      ]
    }
  });
});

router.post('/contact', (req, res) => {
  try {
    const { name, email, subject, inquiry_type, message, encrypted } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }

    const stmt = db.prepare(`
      INSERT INTO contact_messages (name, email, subject, inquiry_type, message, encrypted)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name,
      email,
      subject || 'SOC Opportunity / Inquiry',
      inquiry_type || 'General',
      message,
      encrypted ? 1 : 0
    );

    const ticketId = `PRATYUSH-SOC-${String(result.lastInsertRowid).padStart(5, '0')}`;

    res.status(201).json({
      success: true,
      ticket_id: ticketId,
      message: 'Transmission successfully logged in database.',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/admin/messages', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== 'Bearer secadmin2026') {
    return res.status(401).json({ success: false, error: 'Unauthorized: Invalid Key' });
  }

  try {
    const messages = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all();
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/terminal-eval', (req, res) => {
  const { command } = req.body;
  const cmd = (command || '').trim().toLowerCase();

  if (!cmd) return res.json({ output: '' });

  let response = '';

  if (cmd === 'help') {
    response = `AVAILABLE SEC-SHELL COMMANDS:
  help        - Display list of terminal commands
  sysinfo     - Display profile of Pratyush Sharma
  whoami      - Display SOC career objective
  toolkit     - List tools (Wireshark, Packet Tracer, GNS3)
  education   - Display education timeline
  certs       - Display certifications
  clear       - Clear terminal screen`;
  } else if (cmd === 'whoami' || cmd === 'sysinfo') {
    response = `[+] ROOT@SECURITY:~$ WHOAMI
[+] NAME: Pratyush Sharma
[+] TARGET ROLE: Aspiring SOC Analyst / Defensive Security & Network Security
[+] COLLEGE: Softwarica College of IT & E-Commerce (Coventry Univ, UK)
[+] STATUS: 2nd Year (4th Semester) — BSc (Hons) Cyber Security
[+] LOCATION: Kathmandu, Nepal | Phone: +977-9864004444
[+] EMAIL: pratyushsharma@gmail.com`;
  } else if (cmd === 'toolkit') {
    response = `TOOLKIT:
  - Wireshark
  - Cisco Packet Tracer · GNS3
  - VirtualBox / VMware
  - Security Onion (intro)
  - TryHackMe (Blue Team / SOC path)`;
  } else if (cmd === 'education') {
    response = `EDUCATION TIMELINE:
  1. BSc (Hons) Ethical Hacking & Cyber Security (2024 - 2027) | Softwarica College
  2. +2 Science (2022 - 2024) | Little Angels College, Kathmandu
  3. Schooling SEE (2010 - 2022) | Pinnacle Scholars Academy, Kathmandu`;
  } else {
    response = `zsh: command not found: ${command}. Type 'help' for available commands.`;
  }

  res.json({ success: true, output: response });
});

export default router;
