import React, { useState } from 'react';
import { X, Lock, Database } from 'lucide-react';

export default function AdminModal({ isOpen, onClose }) {
  const [pin, setPin] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleAuthenticate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let authenticatedOk = false;
      let msgData = [];
      try {
        const res = await fetch('/api/admin/messages', {
          headers: { 'Authorization': `Bearer ${pin.trim()}` }
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            authenticatedOk = true;
            msgData = json.data;
          }
        }
      } catch {
        // Backend offline / GitHub Pages static mode
      }

      if (!authenticatedOk) {
        const entered = pin.trim().toLowerCase();
        if (entered === 'pratyush929' || entered === '929' || entered === 'admin') {
          authenticatedOk = true;
          try {
            msgData = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
          } catch {
            msgData = [];
          }
        } else {
          setError('Invalid Admin Security Key.');
          setLoading(false);
          return;
        }
      }

      setAuthenticated(true);
      setMessages(msgData);
    } catch (err) {
      setError(`Auth error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const overlayStyle = {
    position: 'fixed', inset: 0, zIndex: 300,
    background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
  };

  const modalStyle = {
    width: '100%', maxWidth: '720px',
    maxHeight: '85vh', overflowY: 'auto',
    background: 'var(--card-bg)',
    border: '1px solid var(--card-border)',
    borderRadius: '12px',
    padding: '1.75rem',
    animation: 'fadeInUp 0.2s ease both',
  };

  return (
    <div style={overlayStyle} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={modalStyle}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.25rem', borderBottom: '1px solid var(--card-border)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'var(--accent-emerald-light)', color: 'var(--accent-emerald)', border: '1px solid rgba(16,185,129,0.25)' }}>
              <Database size={18} />
            </div>
            <div>
              <h3 className="font-mono" style={{ fontSize: '1rem', fontWeight: 700 }}>DB Admin Vault</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Live SQLite Contact Messages &amp; Inquiries</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid var(--card-border)', background: 'var(--bg-tertiary)', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            <X size={17} />
          </button>
        </div>

        {/* Auth screen */}
        {!authenticated ? (
          <form onSubmit={handleAuthenticate} style={{ maxWidth: '380px', margin: '0 auto', padding: '1.5rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <Lock size={32} style={{ color: 'var(--accent-emerald)', margin: '0 auto 0.75rem' }} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.5rem' }}>Enter Admin Vault Key</h4>
              <p
                className="font-mono"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)'
                }}
              >
                Enter your administrator PIN to continue.
              </p>
            </div>

            {error && (
              <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171', fontSize: '0.8rem', textAlign: 'center', marginBottom: '1rem' }} className="font-mono">
                {error}
              </div>
            )}

            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter admin pin..."
              className="form-input font-mono"
              style={{ textAlign: 'center', marginBottom: '1rem' }}
            />

            <button type="submit" disabled={loading} className="btn btn-primary font-mono" style={{ width: '100%' }}>
              {loading ? 'Authenticating...' : 'Unlock SQLite DB Vault'}
            </button>
          </form>
        ) : (
          <div>
            {/* Vault header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                [+] {messages.length} Record(s) Retrieved from SQLite DB
              </span>
              <button
                onClick={() => { setAuthenticated(false); setPin(''); }}
                style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Lock Vault
              </button>
            </div>

            {messages.length === 0 ? (
              <div className="font-mono" style={{ padding: '2.5rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', border: '1px dashed var(--card-border)', borderRadius: '8px' }}>
                No contact messages in the database yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '50vh', overflowY: 'auto' }}>
                {messages.map((msg) => (
                  <div key={msg.id} className="font-mono" style={{ padding: '1rem', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', fontSize: '0.78rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', paddingBottom: '0.6rem', borderBottom: '1px solid var(--card-border)', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-emerald)', fontWeight: 800 }}>#{msg.id}</span>
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{msg.name}</span>
                        <span style={{ color: 'var(--text-muted)' }}>&lt;{msg.email}&gt;</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <span className="badge badge-cyan">{msg.inquiry_type}</span>
                        {msg.encrypted === 1 && <span className="badge badge-emerald">PGP VERIFIED</span>}
                      </div>
                    </div>

                    <div style={{ marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Subject: </span>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{msg.subject}</span>
                    </div>

                    <p style={{ padding: '0.65rem 0.85rem', borderRadius: '6px', background: 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', lineHeight: 1.6, margin: 0 }}>
                      {msg.message}
                    </p>

                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '0.4rem' }}>
                      Logged at: {msg.created_at}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
