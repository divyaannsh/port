// src/three/ThreeScene.jsx
import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import HeroScene from './HeroScene';

function CameraRig({ mouseX, mouseY }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += ((mouseX.current || 0) * 0.3 - camera.position.x) * 0.03;
    camera.position.y += (-(mouseY.current || 0) * 0.1 - camera.position.y) * 0.03;
    camera.lookAt(0, -0.2, 0);
  });
  return null;
}

export default function ThreeScene() {
  const mouseX = useRef(0), mouseY = useRef(0);
  useEffect(() => {
    const m = e => { mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2; mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2; };
    window.addEventListener('mousemove', m);
    return () => window.removeEventListener('mousemove', m);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0.4, 8.5], fov: 44 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
        <ambientLight color="#1e2a4a" intensity={3.5} />
        <directionalLight position={[4, 8, 4]} intensity={1.5} color="#dbeafe" />
        <directionalLight position={[-4, 3, 3]} intensity={0.6} color="#818cf8" />
        <CameraRig mouseX={mouseX} mouseY={mouseY} />
        <HeroScene />
      </Canvas>
    </div>
  );
}
