# Divyansh Portfolio — React + Three.js

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm start

# Opens at http://localhost:3000
```

## 📁 Folder Structure

```
divyansh-portfolio/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx                    ← Root component, assembles everything
│   ├── index.js                   ← React entry point
│   │
│   ├── data/
│   │   └── portfolio.js           ← ALL your content (projects, exp, skills, etc.)
│   │
│   ├── three/
│   │   ├── ThreeScene.jsx         ← Canvas wrapper + camera controller
│   │   ├── KidCharacter.jsx       ← 🧒 Animated 3D kid (6-state animation machine)
│   │   └── BackgroundScene.jsx    ← Stars, code blocks, wireframe orbs, grid
│   │
│   ├── components/
│   │   ├── Cursor.jsx             ← Custom cursor + ring
│   │   ├── Navbar.jsx             ← Fixed nav with scroll glass effect
│   │   ├── Hero.jsx               ← Hero section
│   │   ├── Hero.module.css
│   │   ├── Marquee.jsx            ← Infinite scrolling tech strip
│   │   ├── Marquee.module.css
│   │   ├── Section.jsx            ← Shared SectionHeader + RevealItem
│   │   ├── Section.module.css
│   │   ├── Sections.jsx           ← About, Experience, Projects, Hackathons, Skills, Testimonials, Contact
│   │   ├── Sections.module.css
│   │   └── Footer.jsx
│   │
│   ├── hooks/
│   │   └── useScrollReveal.js     ← Reusable IntersectionObserver hook
│   │
│   └── styles/
│       └── global.css             ← CSS variables, resets, scrollbar
│
└── package.json
```

## 🧒 3D Character Animation States

The kid character in the background cycles through:

1. **sleeping** — lying flat, breathing, eyes closed
2. **waking** — sits up, stretches arms wide, eyes flutter open
3. **sitting** — gets into position, legs fold
4. **laptop_open** — opens laptop, screen glows to life
5. **typing** — arms alternate up/down, screen color-shifts with "code"
6. **celebrating** — jumps up, arms raised high, golden screen glow!

## 🛠 Customization

Edit `src/data/portfolio.js` to update:
- Experience entries
- Projects (name, description, stack, links)
- Hackathons
- Skills (with levels 1-5)
- Testimonials

## 🌐 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Tech Stack

- **React 18** — UI framework
- **@react-three/fiber** — React renderer for Three.js
- **@react-three/drei** — Three.js helpers
- **Three.js** — 3D character + scene
- **Framer Motion** — (available, add to sections as needed)
- **CSS Modules** — scoped styles per component
