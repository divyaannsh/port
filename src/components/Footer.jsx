// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer style={{
      padding: '2rem 4rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      position: 'relative', zIndex: 1,
      background: '#05050a',
    }}>
      <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.82rem', color: '#64748b' }}>
        ~/divyansh.dev
      </div>
      <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.72rem', color: '#64748b' }}>
        crafted with curiosity & Three.js · 2024
      </div>
    </footer>
  );
}
