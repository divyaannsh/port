// src/components/Navbar.jsx — Senior dev nav
import { useState, useEffect } from 'react';

const links = [
  { href: '#about', label: 'About' }, { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' }, { href: '#hackathons', label: 'Hackathons' },
  { href: '#skills', label: 'Skills' }, { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      padding:'1.1rem 4rem', display:'flex', justifyContent:'space-between', alignItems:'center',
      background: scrolled ? 'rgba(3,3,13,0.96)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(100,255,218,0.07)' : 'none',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      transition: 'all 0.35s ease',
    }}>
      {/* logo */}
      <div style={{ fontFamily:'Fira Code,monospace', fontSize:'0.88rem', color:'#64ffda', letterSpacing:'-0.01em' }}>
        <span style={{ color:'rgba(100,255,218,0.35)' }}>~/</span>
        divyansh
        <span style={{ color:'rgba(100,255,218,0.35)' }}>.dev</span>
        <span style={{ display:'inline-block', width:8, height:14, background:'#64ffda', marginLeft:3, animation:'blink 1s step-end infinite', verticalAlign:'middle' }} />
      </div>

      {/* links */}
      <div style={{ display:'flex', alignItems:'center', gap:'2.2rem' }}>
        {links.map(l => (
          <a key={l.href} href={l.href}
            style={{ fontFamily:'Fira Code,monospace', fontSize:'0.68rem', letterSpacing:'0.14em',
              textTransform:'uppercase', color: active === l.href ? '#64ffda' : '#4b6280',
              transition:'color 0.25s', position:'relative' }}
            onMouseEnter={e => e.target.style.color='#64ffda'}
            onMouseLeave={e => e.target.style.color= active===l.href ? '#64ffda' : '#4b6280'}
          >{l.label}</a>
        ))}

        {/* CTA */}
        <a href="mailto:divyanshsrivastav72@gmail.com" style={{
          padding:'0.5rem 1.2rem', fontFamily:'Fira Code,monospace',
          fontSize:'0.68rem', letterSpacing:'0.12em', textTransform:'uppercase',
          color:'#03030d', background:'#64ffda', fontWeight:700,
          clipPath:'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)',
          transition:'all 0.25s',
        }}
        onMouseEnter={e => { e.target.style.boxShadow='0 6px 24px rgba(100,255,218,0.35)'; e.target.style.transform='translateY(-1px)'; }}
        onMouseLeave={e => { e.target.style.boxShadow='none'; e.target.style.transform='none'; }}
        >Hire Me</a>
      </div>

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </nav>
  );
}
