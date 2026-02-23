// src/components/Navbar.jsx — with light/dark toggle
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const links = [
  { href: '#about', label: 'About' }, { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' }, { href: '#hackathons', label: 'Hackathons' },
  { href: '#skills', label: 'Skills' }, { href: '#contact', label: 'Contact' },
];

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      onClick={toggle}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        background: 'transparent',
        border: '1px solid var(--border)',
        borderRadius: '999px',
        padding: '0.32rem 0.75rem',
        cursor: 'none',
        fontFamily: 'Fira Code, monospace',
        fontSize: '0.72rem',
        color: 'var(--muted)',
        letterSpacing: '0.05em',
        transition: 'all 0.25s ease',
        userSelect: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.color = 'var(--accent)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.color = 'var(--muted)';
      }}
    >
      {/* track */}
      <span style={{
        position: 'relative', display: 'inline-block',
        width: 28, height: 15, borderRadius: 999,
        background: isDark ? 'rgba(100,255,218,0.15)' : 'rgba(8,145,178,0.2)',
        transition: 'background 0.3s',
        flexShrink: 0,
      }}>
        {/* knob */}
        <span style={{
          position: 'absolute', top: 2,
          left: isDark ? 2 : 13,
          width: 11, height: 11, borderRadius: '50%',
          background: 'var(--accent)',
          transition: 'left 0.25s cubic-bezier(.22,1,.36,1)',
          boxShadow: '0 0 6px var(--accent)',
        }} />
      </span>
      <span style={{ fontSize: '0.8rem', lineHeight: 1 }}>
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '1.1rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: scrolled
        ? (theme === 'light' ? 'rgba(240,244,248,0.96)' : 'rgba(3,3,13,0.96)')
        : 'transparent',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      transition: 'all 0.35s ease',
    }}>
      {/* logo */}
      <div style={{ fontFamily: 'Fira Code,monospace', fontSize: '0.88rem', color: 'var(--accent)', letterSpacing: '-0.01em' }}>
        <span style={{ color: 'rgba(100,255,218,0.35)' }}>~/</span>
        divyansh
        <span style={{ color: 'rgba(100,255,218,0.35)' }}>.dev</span>
        <span style={{ display: 'inline-block', width: 8, height: 14, background: 'var(--accent)', marginLeft: 3, animation: 'blink 1s step-end infinite', verticalAlign: 'middle' }} />
      </div>

      {/* links + controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.2rem' }}>
        {links.map(l => (
          <a key={l.href} href={l.href}
            style={{
              fontFamily: 'Fira Code,monospace', fontSize: '0.68rem', letterSpacing: '0.14em',
              textTransform: 'uppercase', color: active === l.href ? 'var(--accent)' : 'var(--muted)',
              transition: 'color 0.25s', position: 'relative'
            }}
            onMouseEnter={e => e.target.style.color = 'var(--accent)'}
            onMouseLeave={e => e.target.style.color = active === l.href ? 'var(--accent)' : 'var(--muted)'}
          >{l.label}</a>
        ))}

        <ThemeToggle />

        {/* CTA */}
        <a href="mailto:divyanshsrivastav72@gmail.com" style={{
          padding: '0.5rem 1.2rem', fontFamily: 'Fira Code,monospace',
          fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--bg)', background: 'var(--accent)', fontWeight: 700,
          clipPath: 'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)',
          transition: 'all 0.25s',
        }}
          onMouseEnter={e => { e.target.style.boxShadow = '0 6px 24px rgba(100,255,218,0.35)'; e.target.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.target.style.boxShadow = 'none'; e.target.style.transform = 'none'; }}
        >Hire Me</a>
      </div>

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </nav>
  );
}
