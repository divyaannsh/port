// src/three/BackgroundScene.jsx
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stars() {
  const positions = useMemo(() => {
    const arr = new Float32Array(3000);
    for (let i = 0; i < 1000; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15 - 6;
    }
    return arr;
  }, []);
  const ref = useRef();
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.006; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={1000} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#334155" size={0.025} transparent opacity={0.8} />
    </points>
  );
}

function FloatingOrbs() {
  const orbs = useMemo(() => [
    { pos: [-5, 1, -4], color: '#6366f1', size: 1.6, sx: 0.07, sy: 0.12 },
    { pos: [6, 2, -3], color: '#a78bfa', size: 1.0, sx: 0.1, sy: -0.08 },
    { pos: [-2, -4, -6], color: '#60a5fa', size: 2.0, sx: 0.04, sy: 0.06 },
  ], []);
  const refs = useRef(orbs.map(() => null));
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    refs.current.forEach((ref, i) => {
      if (ref) { ref.rotation.x = t * orbs[i].sx; ref.rotation.y = t * orbs[i].sy; }
    });
  });
  return (
    <>
      {orbs.map((o, i) => (
        <mesh key={i} ref={el => refs.current[i] = el} position={o.pos}>
          <icosahedronGeometry args={[o.size, 1]} />
          <meshBasicMaterial color={o.color} wireframe transparent opacity={0.05} />
        </mesh>
      ))}
    </>
  );
}

// Floating path line — dashed vertical line on the right showing the scroll path
function ScrollPathLine() {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 30; i++) pts.push(new THREE.Vector3(3.2, 2.5 - i * 0.35, 0));
    return pts;
  }, []);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(points);
    return g;
  }, [points]);
  return (
    <line geometry={geo}>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.15} linewidth={1} />
    </line>
  );
}

export default function BackgroundScene() {
  return (
    <>
      <Stars />
      <FloatingOrbs />
      <ScrollPathLine />
    </>
  );
}
