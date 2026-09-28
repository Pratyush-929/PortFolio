export const initialStats = {
  projects_count: 4,
  certs_count: 6,
  advisories_count: 4,
  uptime: '99.98%',
  status: 'ACTIVE_MONITORING',
  active_flags: 3
};

export const initialProjects = [
  {
    id: 1,
    title: 'Home Lab — Simulated Small Office Network',
    category: 'Defensive Security',
    description: 'Built a virtualized network using VMs and Cisco Packet Tracer, including a firewall and department segmentation. Captured traffic with Wireshark to distinguish normal from suspicious activity.',
    tech_stack: 'VMs, Cisco Packet Tracer, Wireshark, Firewall, GNS3',
    period: '2025 — Present',
    stars: 12,
    forks: 3,
    github_url: 'https://github.com/Pratyush-929',
    demo_url: null,
    featured: 1
  },
  {
    id: 2,
    title: 'Blue Team Skill-Building — TryHackMe SOC Path',
    category: 'SOC & SIEM Labs',
    description: 'Working through SOC Level 1 rooms on TryHackMe covering log analysis, SIEM basics, Security Onion, and phishing/alert triage. Currently Top 1% global ranking.',
    tech_stack: 'TryHackMe, SIEM, Security Onion, Log Analysis',
    period: '2025 — Present',
    stars: 8,
    forks: 2,
    github_url: 'https://tryhackme.com/p/spratyush929',
    demo_url: 'https://tryhackme.com/p/spratyush929',
    featured: 1
  },
  {
    id: 3,
    title: 'Packet Analysis & Network Traffic Practice',
    category: 'Network Security',
    description: 'Studying network traffic in Wireshark to differentiate normal activity from suspicious patterns and isolating protocol anomalies.',
    tech_stack: 'Wireshark, TCP/IP, Packet Analysis, Networking',
    period: '2024 — Present',
    stars: 5,
    forks: 1,
    github_url: 'https://github.com/Pratyush-929',
    demo_url: null,
    featured: 1
  },
  {
    id: 4,
    title: 'Certification Prep (CompTIA Network+ & CCNA)',
    category: 'Certification Prep',
    description: 'Preparing for CompTIA Network+, Security+ and CCNA alongside degree coursework at Softwarica College.',
    tech_stack: 'CompTIA Network+, CCNA, Subnetting, Routing, VLANs',
    period: '2025 — Present',
    stars: 3,
    forks: 0,
    github_url: 'https://github.com/Pratyush-929',
    demo_url: null,
    featured: 1
  }
];

export const initialCertifications = [
  {
    id: 1,
    title: 'ISC2 Certified in Cybersecurity (CC)',
    issuer: 'ISC2',
    status: 'ACTIVE',
    badge_color: '#10b981',
    skills: 'Security Principles, Incident Response, Access Controls, Network Security',
    credential_id: 'ISC2-CC-2025-929',
    issue_date: '2025-01',
    expiry_date: '2028-01',
    verification_link: 'https://www.isc2.org'
  },
  {
    id: 2,
    title: 'Google Cybersecurity Professional Certificate',
    issuer: 'Google Career Certificates',
    status: 'IN_PROGRESS',
    badge_color: '#06b6d4',
    skills: 'SIEM Tools, Python for Security, Linux CLI, SQL, Threat Analysis',
    credential_id: 'COURSERA-GOOG-CYBER',
    issue_date: '2025-02',
    expiry_date: 'Lifetime',
    verification_link: 'https://coursera.org'
  },
  {
    id: 3,
    title: 'Cisco Introduction to Cybersecurity & CCST',
    issuer: 'Cisco Networking Academy',
    status: 'ACTIVE',
    badge_color: '#3b82f6',
    skills: 'Network Protocols, Cisco Packet Tracer, Basic Defense, Threat Landscape',
    credential_id: 'CISCO-CYBER-INTRO',
    issue_date: '2024-11',
    expiry_date: 'Lifetime',
    verification_link: 'https://www.netacad.com'
  },
  {
    id: 4,
    title: 'TryHackMe — SOC Level 1 Path (Top 1%)',
    issuer: 'TryHackMe',
    status: 'ACTIVE',
    badge_color: '#8b5cf6',
    skills: 'Cyber Defense, Phishing Analysis, WireShark, Splunk, Snort, Zeek',
    credential_id: 'THM-SOC-L1-SPRATYUSH929',
    issue_date: '2025-02',
    expiry_date: 'Ongoing',
    verification_link: 'https://tryhackme.com/p/spratyush929'
  },
  {
    id: 5,
    title: 'CompTIA Network+ (N10-008)',
    issuer: 'CompTIA',
    status: 'IN_PROGRESS',
    badge_color: '#f59e0b',
    skills: 'OSI Model, IP Addressing & Subnetting, Routing Protocols, Troubleshooting',
    credential_id: 'CANDIDATE-PREP',
    issue_date: 'Expected 2025',
    expiry_date: 'TBD',
    verification_link: '#'
  },
  {
    id: 6,
    title: 'Cisco Certified Network Associate (CCNA)',
    issuer: 'Cisco',
    status: 'IN_PROGRESS',
    badge_color: '#ec4899',
    skills: 'Enterprise Network Architecture, Switching, IP Services, Network Security',
    credential_id: 'CANDIDATE-PREP',
    issue_date: 'Expected 2025',
    expiry_date: 'TBD',
    verification_link: '#'
  }
];

export const initialAdvisories = [
  {
    id: 1,
    cve_id: 'CVE-2025-24081',
    title: 'DeepSeek-R1 API Remote Code Execution via Template Engine Injection',
    severity: 'CRITICAL',
    cvss_score: '9.8',
    description: 'Improper sanitization of user-supplied template strings in early DeepSeek-R1 inference pipeline APIs allows authenticated attackers to execute arbitrary system commands on underlying orchestration pods.',
    impact: 'Full host takeover, extraction of model weights, exfiltration of private training prompts, and persistent cluster pivot.',
    remediation: 'Upgrade inference gateway to >= v1.4.2 or enforce strict AST-based prompt sandboxing with gVisor container runtime isolation.',
    affected_stack: 'Python, Jinja2, PyTorch Inference Runtime <= v2.1.0',
    tags: 'RCE, AI/ML, Cloud Infrastructure, High-Impact',
    date: '2025-01-28'
  },
  {
    id: 2,
    cve_id: 'CVE-2024-51829',
    title: 'Next.js Server Actions CSRF Token Invalidation & Session Hijack',
    severity: 'HIGH',
    cvss_score: '8.2',
    description: 'Race condition in Next.js Server Action cryptographic nonce validation allows remote attackers to replay signed POST requests, bypassing origin validation and hijacking administrative sessions.',
    impact: 'Unauthorized administrative state modification, credential reset, and cross-site privilege escalation.',
    remediation: 'Update Next.js dependency to 14.2.15 or 15.0.2+. Implement strict SameSite=Strict cookie policy and dynamic nonce rotation.',
    affected_stack: 'Next.js 14.0.0 — 14.2.14, Node.js',
    tags: 'Web Security, Next.js, Auth Bypass, CSRF',
    date: '2024-11-14'
  },
  {
    id: 3,
    cve_id: 'CVE-2024-38816',
    title: 'Spring Framework Path Traversal via Static Resource WebFlux Servlets',
    severity: 'MEDIUM',
    cvss_score: '6.5',
    description: 'Applications serving static resources through Spring WebFlux or Spring MVC router functions are vulnerable to path traversal if the application uses unencoded percent characters in resource URLs.',
    impact: 'Read arbitrary application configuration files, including application.properties and encrypted DB passwords.',
    remediation: 'Upgrade to Spring Framework 6.1.13+, 6.0.23+, or 5.3.39+.',
    affected_stack: 'Spring Framework 6.1.0-6.1.12, 6.0.0-6.0.22',
    tags: 'Java, Spring, Path Traversal, Information Disclosure',
    date: '2024-09-18'
  },
  {
    id: 4,
    cve_id: 'CVE-2024-21626',
    title: 'runc Container Escape via Leaked File Descriptor (cwd Leaking)',
    severity: 'HIGH',
    cvss_score: '8.6',
    description: 'In runc 1.1.11 and earlier, an attacker can specify a working directory that opens a file descriptor to the host filesystem, allowing container processes to break out of isolation into the host rootfs.',
    impact: 'Host root filesystem compromise, node level execution, container escape to host OS.',
    remediation: 'Upgrade runc to 1.1.12+ or use unprivileged user namespaces with read-only root filesystems.',
    affected_stack: 'runc <= 1.1.11, Docker Engine <= 25.0.1, containerd <= 1.7.12',
    tags: 'Container Security, Docker, Linux Kernel, Escapes',
    date: '2024-02-01'
  }
];

export const initialResume = {
  profile: {
    name: 'Pratyush Sharma',
    role: 'BSc (Hons) Cyber Security Student — Aspiring SOC Analyst / Defensive Security & Network Security',
    academic_badge: '2nd Year 4TH SEMESTER | 6+ CERTIFICATIONS | 3 LANGUAGES | SOC CAREER TARGET',
    career_objective: 'Seeking an entry-level SOC Analyst / SOC Intern position to acquire hands-on experience in threat detection, monitoring, and incident response in a live security operations center environment.',
    summary: 'Second year student of Ethical Hacking and Cyber Security with interest in defensive security and network monitoring. Experience with core networking concepts, packet analysis and basic SIEM/log analysis via coursework and independent lab work.',
    location: 'Kathmandu, Nepal',
    phone: 'Request a Number',
    email: 'pratyush929@gmail.com',
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
};

export function evaluateTerminalCommand(rawCmd) {
  const cmd = rawCmd.trim().toLowerCase();

  if (!cmd) return '';
  if (cmd === 'help') {
    return `Available Commands:
  • help            - Display this manual
  • whoami          - Show current logged-in identity & clearances
  • nmap me         - Run active network scan against this portfolio node
  • sysinfo         - Print target host architecture, kernel & defenses
  • cve             - List reported vulnerability disclosures
  • ctf             - Launch active CTF puzzle challenge
  • submit <flag>   - Submit a capture-the-flag secret
  • resume          - Jump to official interactive CV section
  • clear           - Clear console screen buffer`;
  }

  if (cmd === 'whoami') {
    return `Identity: guest_auditor@pratyush-sec
Permissions: READ_ONLY (Public Portfolio Mode)
Location: Kathmandu, Nepal [GeoIP: 27.7172° N, 85.3240° E]
Target: Pratyush Sharma // Ethical Hacking & Defensive Security`;
  }

  if (cmd === 'nmap me' || cmd === 'nmap') {
    return `Starting Nmap 7.94 ( https://nmap.org ) at 2026-09-28 22:00 NPT
Nmap scan report for portfolio.pratyush.security (127.0.0.1)
Host is up (0.00012s latency).
rDNS record for 127.0.0.1: localhost

PORT     STATE SERVICE        VERSION
22/tcp   open  ssh            OpenSSH 9.6p1 Debian (WAF Protected)
80/tcp   open  http           nginx 1.24.0 (Reverse Proxy / TLS 1.3)
443/tcp  open  ssl/https      Cloudflare Edge CDN
5001/tcp open  custom-api     Node.js Express Secure REST API
8080/tcp closed http-proxy    TCP RST received

Device type: General purpose (Defensive hardening enabled)
OS details: Linux 6.6.15-hardened-soc-edition
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Nmap done: 1 IP address (1 host up) scanned in 0.42 seconds.`;
  }

  if (cmd === 'sysinfo') {
    return `SYSTEM INFORMATION
--------------------------------------------------
Host Name:             PRATYUSH-SOC-NODE-01
OS Name:               Ubuntu 24.04 LTS (Security Hardened)
Kernel Version:        6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC
Architecture:          x86_64
System Uptime:         142 days, 18 hours, 32 minutes
Security Defenses:     AppArmor (Enforcing), Fail2ban (Active), UFW (Strict)
Firewall Profile:      Drop all incoming except ports 80, 443
Defensive Tools:       Wireshark, Security Onion, GNS3, Cisco Packet Tracer`;
  }

  if (cmd === 'cve') {
    return `RECENT CVE VULNERABILITY DISCLOSURES
[CRITICAL] CVE-2025-24081 | CVSS: 9.8 | DeepSeek-R1 API Template Injection
[HIGH]     CVE-2024-51829 | CVSS: 8.2 | Next.js Server Actions CSRF Invalidation
[MEDIUM]   CVE-2024-38816 | CVSS: 6.5 | Spring Framework WebFlux Path Traversal
[HIGH]     CVE-2024-21626 | CVSS: 8.6 | runc Container Escape via Leaked FD
-> Navigate to #advisories for complete vulnerability writeups & PoCs.`;
  }

  if (cmd === 'ctf') {
    return `[+] CTF CHALLENGE: RECON-01
--------------------------------------------------
Level: Beginner (SOC Triage)
Hint: In base64 encoding, security analysts frequently uncover obfuscated payloads.
Can you decode the secret embedded within:
    "RkxBR3tQUkFUWVVTSF9TT0NfQkxVRV9URUFNX0RFVEVDVElPTn0="

Run: submit FLAG{...} to claim verification!`;
  }

  if (cmd.startsWith('submit')) {
    const flag = rawCmd.split(' ')[1] || '';
    if (flag.trim() === 'FLAG{PRATYUSH_SOC_BLUE_TEAM_DETECTION}') {
      return `🎉 CONGRATULATIONS! FLAG VERIFIED!
You have successfully decoded the SOC reconnaissance challenge!
Score: +500 PTS awarded to guest session.`;
    } else {
      return `❌ INVALID FLAG. Check your base64 decoder and ensure exact casing.`;
    }
  }

  if (cmd === 'resume') {
    if (typeof window !== 'undefined') {
      window.location.hash = '#resume';
    }
    return `Redirecting view to #resume...`;
  }

  if (cmd === 'cat flag.txt' || cmd === 'flag') {
    return `Permission denied: flag.txt is restricted to chmod 000. Try solving the 'ctf' command first!`;
  }

  return `Command not recognized: "${rawCmd}". Type "help" to list available security commands.`;
}
