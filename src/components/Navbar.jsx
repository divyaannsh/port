// src/components/Navbar.jsx — dark mode only, no toggle
import { useState, useEffect } from 'react';

const links = [
  { href: '#about', label: 'About' }, { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' }, { href: '#hackathons', label: 'Hackathons' },
  { href: '#skills', label: 'Skills' }, { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Track scroll for navbar transparency
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Set active link based on scroll section
  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(l => document.querySelector(l.href));
      const scrollPos = window.scrollY + 100;
      let currentActive = '';
      sections.forEach(sec => {
        if (sec && sec.offsetTop <= scrollPos && (sec.offsetTop + sec.offsetHeight) > scrollPos) {
          currentActive = `#${sec.id}`;
        }
      });
      setActive(currentActive);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? '1rem 2rem' : '1.5rem 4rem', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrolled ? 'rgba(3,3,13,0.96)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(100,255,218,0.07)' : 'none',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'all 0.35s ease',
      }} className="navbar">
        {/* logo */}
        <div style={{ fontFamily: 'Fira Code,monospace', fontSize: '0.88rem', color: '#64ffda', letterSpacing: '-0.01em', zIndex: 101 }}>
          <span style={{ color: 'rgba(100,255,218,0.35)' }}>~/</span>
          divyansh
          <span style={{ color: 'rgba(100,255,218,0.35)' }}>.dev</span>
          <span style={{ display: 'inline-block', width: 8, height: 14, background: '#64ffda', marginLeft: 3, animation: 'blink 1s step-end infinite', verticalAlign: 'middle' }} />
        </div>

        {/* desktop links */}
        <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2.2rem' }}>
          {links.map(l => (
            <a key={l.href} href={l.href}
              style={{
                fontFamily: 'Fira Code,monospace', fontSize: '0.68rem', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: active === l.href ? '#64ffda' : '#4b6280',
                transition: 'color 0.25s', position: 'relative'
              }}
              onMouseEnter={e => e.target.style.color = '#64ffda'}
              onMouseLeave={e => e.target.style.color = active === l.href ? '#64ffda' : '#4b6280'}
            >{l.label}</a>
          ))}

          {/* CTA */}
          <a href="mailto:divyanshsrivastav72@gmail.com" style={{
            padding: '0.5rem 1.2rem', fontFamily: 'Fira Code,monospace',
            fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#03030d', background: '#64ffda', fontWeight: 700,
            clipPath: 'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)',
            transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.target.style.boxShadow = '0 6px 24px rgba(100,255,218,0.35)'; e.target.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.target.style.boxShadow = 'none'; e.target.style.transform = 'none'; }}
          >Hire Me</a>
        </div>
        
        {/* mobile hamburger button */}
        <button 
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', background: 'transparent', border: 'none', 
            cursor: 'pointer', zIndex: 101, padding: '0.5rem',
            width: '40px', height: '40px', position: 'relative'
          }}
          aria-label="Toggle menu"
        >
          <div style={{
            width: '24px', height: '2px', background: '#64ffda', 
            position: 'absolute', top: menuOpen ? '19px' : '14px', left: '8px',
            transform: menuOpen ? 'rotate(45deg)' : 'none',
            transition: 'all 0.3s ease'
          }} />
          <div style={{
            width: '24px', height: '2px', background: '#64ffda',
            position: 'absolute', top: '19px', left: '8px',
            opacity: menuOpen ? 0 : 1, transition: 'all 0.3s ease'
          }} />
          <div style={{
            width: '24px', height: '2px', background: '#64ffda',
            position: 'absolute', top: menuOpen ? '19px' : '24px', left: '8px',
            transform: menuOpen ? 'rotate(-45deg)' : 'none',
            transition: 'all 0.3s ease'
          }} />
        </button>
      </nav>

      {/* mobile menu overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
        background: 'rgba(3,3,13,0.98)', backdropFilter: 'blur(20px)',
        zIndex: 99, display: 'flex', flexDirection: 'column', 
        justifyContent: 'center', alignItems: 'center', gap: '2rem',
        transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
        opacity: menuOpen ? 1 : 0, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: menuOpen ? 'auto' : 'none'
      }}>
        {links.map((l, i) => (
          <a key={l.href} href={l.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'Fira Code,monospace', fontSize: '1.2rem', letterSpacing: '0.14em',
              textTransform: 'uppercase', color: active === l.href ? '#64ffda' : '#e2e8f0',
              transition: 'all 0.3s', position: 'relative',
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
              transitionDelay: menuOpen ? `${0.1 + i * 0.05}s` : '0s'
            }}
          >
            {active === l.href && <span style={{ color: '#64ffda', marginRight: '10px' }}>&gt;</span>}
            {l.label}
          </a>
        ))}
        
        <a href="mailto:divyanshsrivastav72@gmail.com" 
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: '2rem', padding: '1rem 2.5rem', fontFamily: 'Fira Code,monospace',
            fontSize: '1rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#03030d', background: '#64ffda', fontWeight: 700,
            clipPath: 'polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%)',
            transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            opacity: menuOpen ? 1 : 0, transition: 'all 0.3s',
            transitionDelay: menuOpen ? '0.4s' : '0s'
        }}>Hire Me</a>
      </div>

      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
          .navbar { padding: 1rem 1.5rem !important; }
        }
      `}</style>
    </>
  );
}
