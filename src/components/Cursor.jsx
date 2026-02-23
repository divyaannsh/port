// src/components/Cursor.jsx — Metallic mirror-ball cursor
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const ballRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const cur = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const grow = () => {
      if (ballRef.current) {
        ballRef.current.style.width = '52px';
        ballRef.current.style.height = '52px';
      }
    };
    const shrink = () => {
      if (ballRef.current) {
        ballRef.current.style.width = '28px';
        ballRef.current.style.height = '28px';
      }
    };

    const attach = () => {
      const links = document.querySelectorAll('a, button');
      links.forEach(l => {
        l.removeEventListener('mouseenter', grow);
        l.removeEventListener('mouseleave', shrink);
        l.addEventListener('mouseenter', grow);
        l.addEventListener('mouseleave', shrink);
      });
    };
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    let raf;
    const tick = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.16;
      cur.current.y += (pos.current.y - cur.current.y) * 0.16;

      if (ballRef.current) {
        const w = parseFloat(ballRef.current.style.width) || 28;
        const half = w / 2;
        ballRef.current.style.transform = `translate(${cur.current.x - half}px, ${cur.current.y - half}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ballRef}
      style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'width 0.22s cubic-bezier(.22,1,.36,1), height 0.22s cubic-bezier(.22,1,.36,1)',
        /* Chrome radial gradient */
        background: `radial-gradient(
          circle at 32% 28%,
          #ffffff 0%,
          #d8e8f5 14%,
          #8aaec8 32%,
          #3a5a74 55%,
          #0d1a24 82%,
          #000e16 100%
        )`,
        boxShadow: `
          0 0 0 1px rgba(180,210,240,0.4),
          0 4px 14px rgba(0,0,0,0.65),
          inset 0 1px 3px rgba(255,255,255,0.4)
        `,
        overflow: 'hidden',
      }}
    >
      {/* primary specular glint */}
      <div style={{
        position: 'absolute',
        left: '25%', top: '18%',
        width: '35%', height: '25%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0) 100%)',
        filter: 'blur(1px)',
        pointerEvents: 'none',
      }} />
      {/* teal rim glow */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        boxShadow: 'inset 0 -2px 5px rgba(100,255,218,0.28)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
