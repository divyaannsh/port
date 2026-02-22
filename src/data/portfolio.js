// src/data/portfolio.js

export const experience = [
  {
    company: 'Deckmount Electronics',
    role: 'Software Development Engineer',
    period: 'May 2024 — Present',
    location: 'Gurgaon, India',
    impact: { num: '40%', label: 'Latency Cut' },
    desc: 'Architected a 12-lead ECG monitoring system with high-frequency waveform rendering. Built Sleep Sense polysomnography app (SpO2, Pulse, CPAP) with PyQt5. Ensured 100% IEC 62304 medical safety compliance with zero packet loss during 24/7 patient monitoring.',
  },
  {
    company: 'Zidio Development',
    role: 'Frontend Developer',
    period: 'Jun 2024 — Sep 2024',
    location: 'Remote',
    impact: { num: '50%', label: 'Engagement Up' },
    desc: 'Built RESTful API integrations for secure auth and real-time streaming. Designed 10+ scalable React.js UI components with dynamic dashboards and filtering. Optimized with Redux Toolkit, lazy loading, and code-splitting.',
  },
  {
    company: 'Ingelt Marketing',
    role: 'Frontend Developer',
    period: 'Feb 2024 — Apr 2024',
    location: 'Remote',
    impact: { num: '30%', label: 'Load Time Cut' },
    desc: 'Developed responsive UIs with ReactJS and Tailwind CSS. Implemented interactive components and animations. Applied lazy loading and efficient state management best practices across the platform.',
  },
];

export const projects = [
  {
    name: 'SmartFlow AI',
    cat: 'Full-Stack SaaS',
    desc: 'Project management suite with Role-Based Access Control, multi-layered JWT security, automated task lifecycles, and SQLite storage. 99.9% uptime on Vercel + Railway CI/CD.',
    stack: ['TypeScript', 'React', 'Node.js', 'SQLite', 'JWT', 'Railway'],
    link: '#',
    span: 7,
    accent: '#64ffda',
  },
  {
    name: 'Multi-Lingual Review Analyzer',
    cat: 'AI / NLP / RAG',
    desc: 'Multilingual RAG system analyzing customer reviews in Hindi, Marathi, Tamil & English using LaBSE embeddings and FAISS vector search. Pre-LLM sentiment classification with Gradio UI.',
    stack: ['LaBSE', 'FAISS', 'LangChain', 'Gradio', 'scikit-learn'],
    link: '#',
    span: 5,
    accent: '#a78bfa',
  },
  {
    name: 'Blinkit Sales Dashboard',
    cat: 'Data Analytics',
    desc: 'Interactive retail analytics dashboard — sales by product/outlet attributes, location trends, statistical analysis. Built with Plotly/Dash for live, stakeholder-ready exploration.',
    stack: ['Python', 'Plotly', 'Pandas', 'Dash', 'NumPy'],
    link: '#',
    span: 6,
    accent: '#ffd166',
  },
  {
    name: 'AtlasBazaar',
    cat: 'E-Commerce Platform',
    desc: 'Full-featured shopping platform — auth, multiple filters, cart management, wishlist, address management, coupon discounts, and checkout.',
    stack: ['React.js', 'Redux Toolkit', 'Tailwind CSS', 'Node.js'],
    link: '#',
    span: 6,
    accent: '#ff6584',
  },
  {
    name: 'Sociatree',
    cat: 'Link-in-Bio SaaS',
    desc: 'Full-stack SaaS with merchant storefront, Stripe payment reconciliation, real-time analytics via Chart.js, drag-and-drop profile customizer. 95+ Lighthouse score.',
    stack: ['React.js', 'MongoDB', 'Stripe', 'Chart.js', 'Redux'],
    link: '#',
    span: 5,
    accent: '#60a5fa',
  },
  {
    name: 'Farmer Dashboard',
    cat: 'Client Work — AgriTech 🇦🇺',
    desc: 'Built for an Australian client. Real-time agricultural alerts, moisture control, expert consultations via chat/video, community forum, mobile extension locator. Live on Vercel.',
    stack: ['React.js', 'Tailwind', 'Node.js', 'Vercel'],
    link: 'https://farmer-dashboard-flax.vercel.app',
    span: 7,
    accent: '#64ffda',
    isLive: true,
  },
  {
    name: 'Ochi Design Clone',
    cat: 'Creative Development',
    desc: 'Award-winning design clone with Framer Motion and Locomotive Scroll for unparalleled smooth scrolling. Captivating transitions and a mesmerizing user journey.',
    stack: ['React.js', 'Framer Motion', 'Locomotive Scroll'],
    link: '#',
    span: 6,
    accent: '#a78bfa',
  },
  {
    name: 'Object Detection App',
    cat: 'Computer Vision',
    desc: 'Real-time object detection with TensorFlow, live camera feed, bounding box visualization, and interactive threshold tuning UI.',
    stack: ['TensorFlow', 'Python', 'OpenCV', 'React'],
    link: '#',
    span: 6,
    accent: '#ffd166',
  },
];

export const hackathons = [
  {
    name: 'Sainya Ranakshetram 2.0',
    org: 'Indian Army Cybersecurity Hackathon · Virtual',
    period: 'Oct 2022 — Jan 2023',
    badge: '⚔️ Level 3 Qualified',
    desc: 'Qualified for Level 3 of this prestigious national defense cybersecurity challenge. Demonstrated expertise in ethical hacking, secure software development, and real-world defense cybersecurity strategies competing alongside India\'s best security engineers.',
    color: '#64ffda',
  },
  {
    name: 'IBM Hack Challenge',
    org: 'IBM SkillsBuild · Virtual',
    period: 'Jul — Aug 2023',
    badge: '⚡ EV Infrastructure',
    desc: 'EV Charging Infrastructure — built a system leveraging the Alternative Fueling Station Locator to guide electric vehicles to available charging points in real-time, tackling India\'s critical green energy challenge.',
    color: '#60a5fa',
  },
];

export const skills = [
  {
    label: '// Frontend',
    color: '#64ffda',
    items: [
      { name: 'React.js', level: 5 },
      { name: 'TypeScript', level: 4 },
      { name: 'Redux Toolkit', level: 4 },
      { name: 'Tailwind CSS', level: 5 },
      { name: 'Framer Motion', level: 3 },
      { name: 'Three.js', level: 3 },
    ],
  },
  {
    label: '// Backend',
    color: '#a78bfa',
    items: [
      { name: 'Node.js / Express', level: 4 },
      { name: 'Python', level: 5 },
      { name: 'MongoDB', level: 4 },
      { name: 'PostgreSQL', level: 3 },
      { name: 'Docker', level: 3 },
      { name: 'REST APIs', level: 4 },
    ],
  },
  {
    label: '// AI / Data',
    color: '#ffd166',
    items: [
      { name: 'LangChain', level: 4 },
      { name: 'OpenAI API', level: 4 },
      { name: 'Hugging Face', level: 3 },
      { name: 'FAISS / Pinecone', level: 3 },
      { name: 'Pandas / Plotly', level: 4 },
      { name: 'PyQt5', level: 4 },
    ],
  },
  {
    label: '// DevOps / Cloud',
    color: '#ff6584',
    items: [
      { name: 'AWS (EC2/S3/Lambda)', level: 3 },
      { name: 'Git / GitHub', level: 5 },
      { name: 'CI/CD Pipelines', level: 3 },
      { name: 'Vercel / Railway', level: 4 },
      { name: 'Signal Processing', level: 4 },
      { name: 'IEC 62304', level: 3 },
    ],
  },
];

export const testimonials = [
  {
    text: 'Divyansh delivered an exceptional React dashboard under tight deadlines. His understanding of API integrations and state management was impressive — performance optimizations made a real difference from day one.',
    author: 'Rahul Sharma',
    role: '// Product Manager, Freelance Client',
  },
  {
    text: 'Building Sleep Sense with Divyansh was a pleasure. Rare combination of signal processing depth and clean UI implementation. Product shipped on time and met every clinical requirement perfectly.',
    author: 'Engineering Team',
    role: '// Deckmount Electronics, Medical Division',
  },
  {
    text: 'His ability to architect scalable SaaS features quickly sets him apart. The JWT + RBAC system he built was robust, secure, and exceptionally well-documented for our entire team.',
    author: 'Tech Lead',
    role: '// Zidio Development',
  },
];
