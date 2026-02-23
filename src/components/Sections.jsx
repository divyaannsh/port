// src/components/Sections.jsx
// All portfolio sections bundled
import { useRef, useEffect } from 'react';
import { SectionHeader, RevealItem } from './Section';
import { experience, projects, hackathons, skills, testimonials } from '../data/portfolio';
import styles from './Sections.module.css';

// ─── About ────────────────────────────────────────────────────────
export function About() {
  const techs = ['React.js', 'TypeScript', 'Node.js', 'Python', 'Redux', 'LangChain', 'AWS', 'MongoDB', 'PyQt5', 'Tailwind', 'Docker', 'OpenAI API', 'FAISS', 'Gradio', 'Plotly'];
  return (
    <section id="about" className={styles.about}>
      <div className={styles.sw}>
        <SectionHeader num="// 01 — about" title="The person <em>behind</em> the code" />
        <div className={styles.aboutGrid}>
          <RevealItem>
            <div className={styles.aboutText}>
              <p>I'm <strong>Divyansh</strong> — a <strong>Frontend Developer and Data Analyst</strong> based in Delhi NCR. I currently build medical-grade software at Deckmount Electronics and work on AI systems that I actually find fascinating.</p>
              <p>My path started with <span className={styles.hl}>Data Structures and competitive programming</span>, ran through cybersecurity hackathons with the Indian Army and IBM, and landed me in clinical software — where a bug isn't just a bug, it's a patient risk. That sharpens you.</p>
              <p>Outside work I dig into <strong>multilingual NLP, RAG pipelines, and data storytelling</strong>. I care about software that feels effortless to use — invisible in the best possible way.</p>
              <p>B.Tech in Information Technology — <strong>Inderprastha Engineering College</strong> (2020–2024).</p>
            </div>
          </RevealItem>
          <RevealItem delay={0.15}>
            <div className={styles.aboutCard}>
              <div className={styles.cardTitle}>// Tech I work with</div>
              <div className={styles.tags}>
                {techs.map(t => <span key={t} className={styles.tag}>{t}</span>)}
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
  return (
    <section id="projects" className={styles.bgAlt}>
      <div className={styles.sw}>
        <SectionHeader num="// 03 — projects" title="Things I've <em>built</em>" />
        <div className={styles.projGrid}>
          {projects.map((p, i) => (
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
        <SectionHeader num="// 04 — hackathons" title="Building under <em>pressure</em>">
          48–72 hours. No sleep. Just motivation, caffeine, and a laptop. Two hackathons that showed me what passionate people can build together.
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
        <SectionHeader num="// 05 — skills" title="My <em>arsenal</em>" />
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
        <SectionHeader num="// 06 — testimonials" title="What people <em>say</em>" />
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
          <span className={styles.contactPre}>// 07 — let's connect</span>
          <h2 className={styles.contactBig}>
            Ready to build<br />
            <span>something great?</span>
          </h2>
          <p className={styles.contactSub}>
            Open to full-time roles, freelance projects, and interesting collaborations.<br />
            Let's make something people remember.
          </p>
          <div className={styles.contactLinks}>
            <a href="mailto:divyanshsrivastav72@gmail.com" className={styles.btnPrimary}>✉ Email Me</a>
            <a href="https://www.linkedin.com/in/divyansh-srivastav-a00127221/" target="_blank" rel="noreferrer" className={styles.btnGhost}>↗ LinkedIn</a>
            <a href="https://github.com/divyaannsh" target="_blank" rel="noreferrer" className={styles.btnGhost}>⌥ GitHub</a>
          </div>
          <div className={styles.contactInfo}>divyanshsrivastav72@gmail.com · +91 9560350477</div>
        </RevealItem>
      </div>
    </section>
  );
}
