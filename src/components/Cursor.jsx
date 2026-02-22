// src/components/Cursor.jsx
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    let raf;
    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const links = document.querySelectorAll('a, button');
    const grow = () => { if (ringRef.current) { ringRef.current.style.width = '52px'; ringRef.current.style.height = '52px'; } };
    const shrink = () => { if (ringRef.current) { ringRef.current.style.width = '32px'; ringRef.current.style.height = '32px'; } };
    links.forEach(l => { l.addEventListener('mouseenter', grow); l.addEventListener('mouseleave', shrink); });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        width: 8, height: 8, background: '#64ffda', borderRadius: '50%',
        position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999,
        mixBlendMode: 'screen',
      }} />
      <div ref={ringRef} style={{
        width: 32, height: 32, border: '1.5px solid #64ffda', borderRadius: '50%',
        position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9998,
        opacity: 0.4, transition: 'width 0.2s, height 0.2s',
      }} />
    </>
  );
}
