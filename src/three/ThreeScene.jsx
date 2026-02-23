// src/three/ThreeScene.jsx
import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import HeroScene from './HeroScene';

function CameraRig({ mouseX, mouseY }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += ((mouseX.current || 0) * 1.2 - camera.position.x) * 0.05;
    camera.position.y += (-(mouseY.current || 0) * 0.6 + 0.4 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function ThreeScene() {
  const mouseX = useRef(0), mouseY = useRef(0);
  useEffect(() => {
    const m = e => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', m);
    return () => window.removeEventListener('mousemove', m);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0.4, 8.5], fov: 44 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]} style={{ pointerEvents: 'none' }}>
        {/* Brightened ambient so robot body is clearly visible */}
        <ambientLight color="#c8d8ff" intensity={6} />
        <directionalLight position={[4, 8, 4]} intensity={3.5} color="#ffffff" />
        <directionalLight position={[-4, 3, 3]} intensity={2.0} color="#a0c4ff" />
        <directionalLight position={[0, -2, 6]} intensity={2.5} color="#dbeafe" />
        <CameraRig mouseX={mouseX} mouseY={mouseY} />
        <HeroScene mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  );
}
