// src/components/Hero.jsx — Professional split hero with right-side animated terminal
import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

const TERMINAL_LINES = [
  { delay: 0,    text: '$ initializing divyansh.dev', color: '#64ffda' },
  { delay: 500,  text: '> loading: CardioX ECG v4.2 ✓ shipped', color: '#4ade80' },
  { delay: 1100, text: '> ecg_leads: 12 | arrhythmias: 15+ detected', color: '#94a3b8' },
  { delay: 1700, text: '> ai_stack: LangChain, FAISS, LLaMA3, RAG', color: '#a78bfa' },
  { delay: 2300, text: '> uptime: 99.9% | patients/day: 500+', color: '#ffd166' },
  { delay: 2900, text: '> aws_lambda: [activate, validate, auth] ✓', color: '#94a3b8' },
  { delay: 3500, text: '> status: AVAILABLE_FOR_HIRE', color: '#4ade80' },
  { delay: 4100, text: '█', color: '#64ffda', cursor: true },
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
          <span>Clinical Software Engineer · ECG Systems · Medical AI</span>
        </div>
        <h1 ref={h1Ref} className={styles.h1}>
          <span className={styles.l1}>Divyansh</span>
          <span className={styles.l2}>Srivastava</span>
        </h1>
        <p className={styles.desc}>
          Clinical Software Engineer who shipped a hospital-deployed 12-lead
          ECG system from scratch — signal processing to AWS backend — in 55 days.
          1+ year shipping IEC 62304-compliant software.
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
            { num: '50k+', label: 'Lines Shipped' },
            { num: '15+', label: 'Arrhythmias' },
            { num: '500+', label: 'Daily Patients' },
            { num: '99.9%', label: 'Uptime SLA' },
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
          <span className={styles.panelTitle}>CLINICAL_SYS v4.2 — SECURE</span>
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
            { label: 'Python / Medical', pct: 97, color: '#64ffda' },
            { label: 'React.js / TS', pct: 94, color: '#a78bfa' },
            { label: 'Signal Processing', pct: 90, color: '#ffd166' },
            { label: 'LangChain / AI', pct: 85, color: '#60a5fa' },
            { label: 'AWS / DevOps', pct: 80, color: '#f472b6' },
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
