// src/components/Sections.jsx
// All portfolio sections bundled
import { useRef, useEffect } from 'react';
import { SectionHeader, RevealItem } from './Section';
import { experience, projects, hackathons, skills, testimonials } from '../data/portfolio';
import styles from './Sections.module.css';

// ─── About ────────────────────────────────────────────────────────
export function About() {
  const techs = ['Python', 'PyQt5', 'SciPy', 'React.js', 'TypeScript', 'Node.js', 'LangChain', 'FAISS', 'AWS Lambda', 'PostgreSQL', 'Redux', 'MongoDB', 'Docker', 'Matplotlib', 'Gradio'];
  return (
    <section id="about" className={styles.about}>
      <div className={styles.sw}>
        <SectionHeader num="// 01 — about" title="The engineer <em>behind</em> the code" />
        <div className={styles.aboutGrid}>
          <RevealItem>
            <div className={styles.aboutText}>
              <p>I'm a <strong>Clinical Software Engineer</strong> specializing in medical-grade signal processing and diagnostic software.</p>
              <p>At Deckmount Electronics, I architected <span className={styles.hl}>CardioX</span> — a 12-lead ECG monitoring system deployed in 3 hospitals, serving 500+ patients daily. Built end-to-end in ~55 days: Pan-Tompkins QRS detection, 15+ arrhythmia detection, PQRST delineation, HRV analysis, Holter monitoring, and a hardware-bound AWS license system.</p>
              <p>I write production Python at the intersection of <strong>signal processing, PyQt5 desktop applications, and clinical standards</strong> (IEC 62304, GE/Philips measurement protocols, ESC/NASPE HRV Task Force 1996).</p>
              <p>Outside medical software — RAG pipelines, voice bots, and full-stack SaaS. But my core is clinical.</p>
              <p>B.Tech IT · <strong>Inderprastha Engineering College</strong> · 8.1 GPA.</p>
            </div>
          </RevealItem>
          <RevealItem delay={0.15}>
            <div className={styles.aboutCard}>
              <div className={styles.cardTitle}>// Tech I work with</div>
              <div className={styles.tags}>
                {techs.map(t => <span key={t} className={styles.tag}>{t}</span>)}
              </div>
              <div className={styles.aboutMeta}>
                <div className={styles.metaRow}><span className={styles.metaKey}>Location</span><span className={styles.metaVal}>Delhi NCR, India</span></div>
                <div className={styles.metaRow}><span className={styles.metaKey}>Email</span><span className={styles.metaVal}>divyanshsrivastav72@gmail.com</span></div>
                <div className={styles.metaRow}><span className={styles.metaKey}>Phone</span><span className={styles.metaVal}>+91 9560350477</span></div>
                <div className={styles.metaRow}><span className={styles.metaKey}>Status</span><span className={styles.metaVal} style={{ color: '#4ade80' }}>Open to Opportunities</span></div>
              </div>
            </div>
          </RevealItem>
        </div>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────
export function Experience() {
  return (
    <section id="experience">
      <div className={styles.sw}>
        <SectionHeader num="// 02 — experience" title="Where I've <em>shipped</em>" />
        <div>
          {experience.map((e, i) => (
            <RevealItem key={e.company} delay={i * 0.1}>
              <div className={styles.expItem}>
                <div className={styles.expPeriod}>{e.period}</div>
                <div className={styles.expMain}>
                  <div className={styles.expCompany}>{e.company}</div>
                  <div className={styles.expRole}>{e.role}</div>
                  <div className={styles.expDesc}>{e.desc}</div>
                  {e.highlights && e.highlights.length > 0 && (
                    <ul className={styles.expHighlights}>
                      {e.highlights.map(h => (
                        <li key={h} className={styles.expHighlight}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className={styles.expImpact}>
                  <div className={styles.impactNum}>{e.impact.num}</div>
                  <div className={styles.impactLabel}>{e.impact.label}</div>
                </div>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}



// ─── Projects ─────────────────────────────────────────────────────
export function Projects() {
  // Filter out the CardioX featured project (span 12) from the grid — it has its own section
  const gridProjects = projects.filter(p => !p.isFeatured);
  return (
    <section id="projects" className={styles.bgAlt}>
      <div className={styles.sw}>
        <SectionHeader num="// 04 — projects" title="Things I've <em>built</em>" />
        <div className={styles.projGrid}>
          {gridProjects.map((p, i) => (
            <RevealItem key={p.name} delay={i * 0.07} className={styles[`span${p.span}`]}>
              <div className={styles.projCard} style={{ '--card-accent': p.accent }}>
                <div className={styles.projCat}>
                  <span className={styles.projCatSlash}>//</span> {p.cat}
                </div>
                <div className={styles.projName}>{p.name}</div>
                <div className={styles.projDesc}>{p.desc}</div>
                <div className={styles.projStack}>
                  {p.stack.map(s => <span key={s} className={styles.pill}>{s}</span>)}
                </div>
                <a
                  href={p.link}
                  target={p.link !== '#' ? '_blank' : undefined}
                  rel="noreferrer"
                  className={styles.projLink}
                >
                  {p.isLive ? 'Live Demo ↗' : 'View Project ↗'}
                </a>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Hackathons ───────────────────────────────────────────────────
export function Hackathons() {
  return (
    <section id="hackathons">
      <div className={styles.sw}>
        <SectionHeader num="// 05 — hackathons" title="Building under <em>pressure</em>">
          48–72 hours. No sleep. Just motivation, caffeine, and a laptop. Three competitions that shaped how I think under pressure.
        </SectionHeader>
        <div className={styles.hackGrid}>
          {hackathons.map((h, i) => (
            <RevealItem key={h.name} delay={i * 0.15}>
              <div className={styles.hackCard} style={{ '--hack-color': h.color }}>
                <div className={styles.hackGlow} />
                <div className={styles.hackPeriod}>{h.period}</div>
                <div className={styles.hackName}>{h.name}</div>
                <div className={styles.hackOrg}>{h.org}</div>
                <div className={styles.hackDesc}>{h.desc}</div>
                <div className={styles.hackBadge}>{h.badge}</div>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────
export function Skills() {
  return (
    <section id="skills" className={styles.bgAlt}>
      <div className={styles.sw}>
        <SectionHeader num="// 06 — skills" title="My <em>arsenal</em>" />
        <div className={styles.skillsWrap}>
          {skills.map((group, gi) => (
            <RevealItem key={group.label} delay={gi * 0.1}>
              <div>
                <div className={styles.sgHead} style={{ color: group.color }}>{group.label}</div>
                {group.items.map(item => (
                  <div key={item.name} className={styles.skillRow}>
                    <span className={styles.skillName}>{item.name}</span>
                    <div className={styles.dots}>
                      {[1, 2, 3, 4, 5].map(d => (
                        <div key={d} className={`${styles.dot} ${d <= item.level ? styles.dotFilled : ''}`}
                          style={{ '--dot-color': group.color }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────
export function Testimonials() {
  return (
    <section id="testimonials">
      <div className={styles.sw}>
        <SectionHeader num="// 07 — testimonials" title="What people <em>say</em>" />
        <div className={styles.testGrid}>
          {testimonials.map((t, i) => (
            <RevealItem key={t.author} delay={i * 0.1}>
              <div className={styles.testCard}>
                <div className={styles.testQuote}>"</div>
                <p className={styles.testText}>{t.text}</p>
                <div className={styles.testAuthor}>{t.author}</div>
                <div className={styles.testRole}>{t.role}</div>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────
export function Contact() {
  return (
    <section id="contact" className={`${styles.bgAlt} ${styles.contactSection}`}>
      <div className={styles.sw}>
        <RevealItem>
          <span className={styles.contactPre}>// 08 — let's connect</span>
          <h2 className={styles.contactBig}>
            Ready to build<br />
            <span>something great?</span>
          </h2>
          <p className={styles.contactSub}>
            Open to full-time SDE roles, medical software, AI/ML projects, and freelance work.<br />
            Let's make something people remember.
          </p>
          <div className={styles.contactLinks}>
            <a href="mailto:divyanshsrivastav72@gmail.com" className={styles.btnPrimary}>✉ Email Me</a>
            <a href="https://www.linkedin.com/in/divyansh-srivastav-a00127221/" target="_blank" rel="noreferrer" className={styles.btnGhost}>↗ LinkedIn</a>
            <a href="https://github.com/divyaannsh" target="_blank" rel="noreferrer" className={styles.btnGhost}>⌥ GitHub</a>
          </div>
          <div className={styles.contactInfo}>divyanshsrivastav72@gmail.com · +91 9560350477 · Delhi NCR, India</div>
        </RevealItem>
      </div>
    </section>
  );
}
