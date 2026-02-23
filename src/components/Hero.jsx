// src/components/Hero.jsx — Professional split hero with right-side animated terminal
import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

const TERMINAL_LINES = [
  { delay: 0, text: '$ initializing divyansh.exe', color: '#64ffda' },
  { delay: 600, text: '> loading: 4+ years experience', color: '#94a3b8' },
  { delay: 1200, text: '> skills: React, Python, AI/ML, Node', color: '#94a3b8' },
  { delay: 1800, text: '> hackathons: [ARMY, IBM] ✓ qualified', color: '#ffd166' },
  { delay: 2400, text: '> medical_grade: ECG, Sleep Sense ✓', color: '#94a3b8' },
  { delay: 3000, text: '> status: AVAILABLE_FOR_HIRE', color: '#4ade80' },
  { delay: 3600, text: '█', color: '#64ffda', cursor: true },
];

function TerminalLine({ line, index }) {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), line.delay);
    if (!line.cursor) {
      let i = 0;
      const t2 = setTimeout(() => {
        const iv = setInterval(() => {
          setText(line.text.slice(0, ++i));
          if (i >= line.text.length) clearInterval(iv);
        }, 28);
        return () => clearInterval(iv);
      }, line.delay);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
    return () => clearTimeout(t1);
  }, [line]);
  if (!visible) return null;
  return (
    <div className={`${styles.termLine} ${line.cursor ? styles.termCursor : ''}`} style={{ color: line.color }}>
      {line.cursor ? '█' : text}
    </div>
  );
}

function LiveStats() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const iv = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(iv); }, []);
  return (
    <div className={styles.liveStats}>
      <div className={styles.statRow}><span className={styles.statKey}>LOCAL_TIME</span><span className={styles.statVal}>{time.toLocaleTimeString()}</span></div>
      <div className={styles.statRow}><span className={styles.statKey}>UPTIME</span><span className={styles.statVal} style={{ color: '#4ade80' }}>99.9%</span></div>
      <div className={styles.statRow}><span className={styles.statKey}>MODE</span><span className={styles.statVal} style={{ color: '#ffd166' }}>CREATIVE</span></div>
      <div className={styles.statRow}><span className={styles.statKey}>THREAT_LVL</span><span className={styles.statVal} style={{ color: '#f87171' }}>MINIMAL</span></div>
    </div>
  );
}

export default function Hero() {
  const h1Ref = useRef(null);
  useEffect(() => { setTimeout(() => h1Ref.current?.classList.add(styles.visible), 100); }, []);

  return (
    <section id="hero" className={styles.hero}>
      {/* LEFT — text content */}
      <div className={styles.left}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span>Available for opportunities</span>
        </div>
        <div className={styles.eyebrow}>
          <div className={styles.eyeLine} />
          <span>Frontend Dev × Data Analyst × AI Engineer</span>
        </div>
        <h1 ref={h1Ref} className={styles.h1}>
          <span className={styles.l1}>Divyansh</span>
          <span className={styles.l2}>Srivastava</span>
        </h1>
        <p className={styles.desc}>
          Senior-level engineer crafting <em>mission-critical systems</em> —
          from IEC 62304 medical devices to AI-powered SaaS platforms.
          Precision-engineered. Battle-tested. Production-ready.
        </p>
        <div className={styles.btns}>
          <a href="#projects" className={styles.btnPrimary}>
            <span className={styles.btnIcon}>▶</span> View Deployments
          </a>
          <a href="#contact" className={styles.btnOutline}>
            <span className={styles.btnIcon}>⌗</span> Open Channel
          </a>
        </div>
        <div className={styles.stats}>
          {[
            { num: '10+', label: 'Shipped' },
            { num: '2', label: 'Hackathons' },
            { num: '40%', label: 'Perf Δ' },
          ].map(s => (
            <div key={s.label} className={styles.statBox}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — creative animated panel */}
      <div className={styles.right}>
        {/* scan lines overlay */}
        <div className={styles.scanlines} />

        {/* top bar */}
        <div className={styles.panelBar}>
          <div className={styles.panelDots}>
            <span style={{ background: '#ef4444' }} />
            <span style={{ background: '#fbbf24' }} />
            <span style={{ background: '#4ade80' }} />
          </div>
          <span className={styles.panelTitle}>DIVYANSH_OS v4.2 — CLASSIFIED</span>
          <div className={styles.panelLed} />
        </div>

        {/* terminal */}
        <div className={styles.terminal}>
          {TERMINAL_LINES.map((line, i) => (
            <TerminalLine key={i} line={line} index={i} />
          ))}
        </div>

        {/* live stats grid */}
        <LiveStats />

        {/* skill bars */}
        <div className={styles.skillBars}>
          {[
            { label: 'React.js', pct: 96, color: '#64ffda' },
            { label: 'Python / AI', pct: 91, color: '#a78bfa' },
            { label: 'Node.js', pct: 85, color: '#60a5fa' },
            { label: 'Signal Proc', pct: 80, color: '#ffd166' },
          ].map(s => (
            <div key={s.label} className={styles.barRow}>
              <div className={styles.barMeta}>
                <span className={styles.barLabel}>{s.label}</span>
                <span className={styles.barPct} style={{ color: s.color }}>{s.pct}%</span>
              </div>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ '--w': `${s.pct}%`, '--c': s.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* bottom status */}
        <div className={styles.panelFooter}>
          <span className={styles.footerPing}><span className={styles.pingDot} />ONLINE</span>
          <span className={styles.footerLoc}>📍 Delhi NCR, India</span>
          <span className={styles.footerCode}>SYS::OK</span>
        </div>

        {/* corner decorations */}
        <div className={`${styles.corner} ${styles.cornerTL}`} />
        <div className={`${styles.corner} ${styles.cornerTR}`} />
        <div className={`${styles.corner} ${styles.cornerBL}`} />
        <div className={`${styles.corner} ${styles.cornerBR}`} />
      </div>
    </section>
  );
}
