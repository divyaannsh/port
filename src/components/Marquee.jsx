// src/components/Marquee.jsx
import styles from './Marquee.module.css';

const techs = ['React.js','TypeScript','Node.js','Python','AWS','Three.js','LangChain','Redux','PyQt5','FAISS','MongoDB','Docker','Gradio','Hugging Face','Plotly','Framer Motion'];

export default function Marquee() {
  const doubled = [...techs, ...techs];
  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {doubled.map((t, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot}>◆</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}
