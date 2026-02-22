// src/components/Section.jsx
import { useEffect, useRef } from 'react';
import styles from './Section.module.css';

export function SectionHeader({ num, title, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add(styles.visible); }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={styles.header}>
      <span className={styles.num}>{num}</span>
      <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
      {children && <p className={styles.sub}>{children}</p>}
    </div>
  );
}

export function RevealItem({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}s`;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add(styles.visible); io.unobserve(el); } }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`${styles.reveal} ${className}`}>
      {children}
    </div>
  );
}
