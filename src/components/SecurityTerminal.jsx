import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Terminal, Send, Cpu } from 'lucide-react';

export default function SecurityTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'sys', text: 'SEC-SHELL v4.2 — Type "help" for commands or "ctf" for challenge' }
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    setHistory(prev => [...prev, { type: 'cmd', text: cmd }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/terminal-eval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd })
      });
      const json = await res.json();
      if (json.output) {
        setHistory(prev => [...prev, { type: 'res', text: json.output }]);
        if (json.output.includes('CONGRATULATIONS! FLAG VERIFIED!')) {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
      }
    } catch (err) {
      setHistory(prev => [...prev, { type: 'err', text: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const quickCmds = ['help', 'nmap me', 'sysinfo', 'cve', 'ctf', 'resume', 'clear'];

  return (
    <section id="terminal" className="section">
      <div className="container">

        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Terminal size={16} />
            <span>Interactive Security Sandbox &amp; CTF Simulator</span>
          </div>
          <h2 className="section-title">Security CLI Terminal</h2>
          <p className="section-subtitle">
            Execute simulated commands, run port scans, inspect kernel policies, or solve the mini CTF challenge!
          </p>
        </div>

        {/* Quick Command Shortcuts */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span className="font-mono" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            Quick Commands:
          </span>
          {quickCmds.map((cmd, idx) => (
            <button
              key={idx}
              onClick={() => setInput(cmd)}
              className="font-mono"
              style={{
                padding: '0.2rem 0.6rem',
                borderRadius: '5px',
                border: '1px solid var(--card-border)',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                fontSize: '0.72rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.target.style.color = '#10b981'; e.target.style.borderColor = '#10b981'; }}
              onMouseLeave={e => { e.target.style.color = 'var(--text-secondary)'; e.target.style.borderColor = 'var(--card-border)'; }}
            >
              ${cmd}
            </button>
          ))}
        </div>

        {/* Terminal Window */}
        <div className="terminal-window" style={{ maxWidth: '860px', margin: '0 auto' }}>

          {/* Header Bar */}
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="font-mono" style={{ fontSize: '0.72rem', color: '#8b949e', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Cpu size={13} style={{ color: '#10b981' }} />
              sec-guest@purnika-sandbox:~ (zsh)
            </div>
          </div>

          {/* Console Output */}
          <div className="terminal-body" style={{ minHeight: '300px', maxHeight: '440px', overflowY: 'auto' }}>
            {history.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '0.35rem' }}>
                {item.type === 'cmd' && (
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', fontWeight: 700 }}>
                    <span style={{ color: '#10b981', flexShrink: 0 }}>sec-guest@sandbox:~$</span>
                    <span style={{ color: '#c9d1d9' }}>{item.text}</span>
                  </div>
                )}
                {item.type === 'res' && (
                  <pre style={{
                    color: '#c9d1d9', fontFamily: 'var(--font-mono)',
                    whiteSpace: 'pre-wrap', lineHeight: 1.6,
                    paddingLeft: '1rem', borderLeft: '2px solid #21262d', margin: '0.25rem 0'
                  }}>
                    {item.text}
                  </pre>
                )}
                {item.type === 'sys' && (
                  <div style={{ color: '#10b981' }}>{item.text}</div>
                )}
                {item.type === 'err' && (
                  <div style={{ color: '#f87171' }}>{item.text}</div>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ color: '#f59e0b', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                [Executing remote payload...]
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} style={{
            borderTop: '1px solid #21262d',
            background: '#0d1117',
            padding: '0.75rem 1rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem'
          }}>
            <span style={{ color: '#10b981', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem' }}>$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type command (e.g. 'help', 'nmap me', 'ctf')..."
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: '#c9d1d9', fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                padding: '0.35rem 0.85rem', borderRadius: '5px',
                background: '#10b981', color: '#fff',
                fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.75rem',
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
            >
              <Send size={13} />
              Exec
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
