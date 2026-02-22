// src/three/KidCharacter.jsx - Fixed: no broken material refs
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const lerp = (a, b, t) => a + (b - a) * t;

export default function KidCharacter() {
  const groupRef = useRef();
  const headRef  = useRef();
  const legLRef  = useRef();
  const legRRef  = useRef();
  const armLRef  = useRef();
  const armRRef  = useRef();
  const eyeLRef  = useRef();
  const eyeRRef  = useRef();
  const tailRef  = useRef();
  const lightRef = useRef(); // pointLight — only .intensity, never .material

  const s = useRef({
    currentY: 2.5, targetY: 2.5,
    lastRaw: 0, dir: 0,
    phase: 0, walking: false, idleT: 0,
  });

  useEffect(() => {
    const onScroll = () => {
      const sc  = s.current;
      const raw = window.scrollY;
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      sc.targetY  = 2.5 - (raw / max) * 10.5;
      sc.dir      = raw > sc.lastRaw ? -1 : 1;
      sc.lastRaw  = raw;
      sc.walking  = true;
      sc.idleT    = 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.05);
    const t  = clock.getElapsedTime();
    const sc = s.current;

    const grp  = groupRef.current;
    const head = headRef.current;
    const legL = legLRef.current;
    const legR = legRRef.current;
    const armL = armLRef.current;
    const armR = armRRef.current;
    const eyeL = eyeLRef.current;
    const eyeR = eyeRRef.current;
    const tail = tailRef.current;
    const light = lightRef.current;

    if (!grp || !head || !legL || !legR || !armL || !armR) return;

    sc.currentY = lerp(sc.currentY, sc.targetY, 0.065);
    const dist  = Math.abs(sc.targetY - sc.currentY);
    if (dist < 0.015) { sc.walking = false; sc.idleT += dt; }
    else              { sc.walking = true;  sc.idleT  = 0;  }

    if (sc.walking) {
      sc.phase += dt * 9;
      grp.position.y = sc.currentY + Math.abs(Math.sin(sc.phase)) * 0.08;
      grp.rotation.x = lerp(grp.rotation.x, sc.dir === -1 ? 0.13 : -0.13, 0.06);

      legL.rotation.x =  Math.sin(sc.phase) * 0.6;
      legR.rotation.x =  Math.sin(sc.phase + Math.PI) * 0.6;
      armL.rotation.x =  Math.sin(sc.phase + Math.PI) * 0.5;
      armR.rotation.x =  Math.sin(sc.phase) * 0.5;
      armL.rotation.z = lerp(armL.rotation.z, -0.22, 0.1);
      armR.rotation.z = lerp(armR.rotation.z,  0.22, 0.1);

      head.rotation.x = Math.sin(sc.phase * 2) * 0.04;
      head.position.y = 0.5 + Math.abs(Math.sin(sc.phase)) * 0.03;

      if (tail) { tail.rotation.z = Math.sin(sc.phase * 1.5) * 0.45; }
      if (eyeL) eyeL.scale.y = lerp(eyeL.scale.y, 0.7, 0.1);
      if (eyeR) eyeR.scale.y = lerp(eyeR.scale.y, 0.7, 0.1);
      if (light) light.intensity = 1.0 + Math.sin(sc.phase * 2) * 0.3;

    } else {
      grp.position.y = sc.currentY + Math.sin(t * 1.6) * 0.04;
      grp.rotation.x = lerp(grp.rotation.x, 0, 0.05);

      legL.rotation.x = lerp(legL.rotation.x, 0, 0.08);
      legR.rotation.x = lerp(legR.rotation.x, 0, 0.08);
      armL.rotation.x = lerp(armL.rotation.x, 0, 0.06);
      armR.rotation.x = lerp(armR.rotation.x, 0, 0.06);
      armL.rotation.z = lerp(armL.rotation.z, -0.28, 0.05);
      armR.rotation.z = lerp(armR.rotation.z,  0.28, 0.05);

      if (sc.idleT > 0.8) {
        head.rotation.y = Math.sin(t * 0.7) * 0.3;
        head.rotation.x = Math.sin(t * 0.5) * 0.08;
        head.position.y = 0.5 + Math.sin(t * 1.6) * 0.02;
      } else {
        head.rotation.y = lerp(head.rotation.y, 0, 0.06);
        head.rotation.x = lerp(head.rotation.x, 0, 0.06);
        head.position.y = lerp(head.position.y, 0.5, 0.06);
      }

      if (tail) tail.rotation.z = Math.sin(t * 2.2) * 0.22;

      // blink
      const blink = Math.sin(t * 0.28) > 0.97 ? 0.05 : 1;
      if (eyeL) eyeL.scale.y = lerp(eyeL.scale.y, blink, 0.15);
      if (eyeR) eyeR.scale.y = lerp(eyeR.scale.y, blink, 0.15);
      if (light) light.intensity = lerp(light.intensity, 0.7 + Math.sin(t * 2) * 0.15, 0.05);
    }
  });

  return (
    <group position={[3.0, 2.5, 0]}>
      <pointLight ref={lightRef} position={[0, 0.3, 1.5]} color="#818cf8" intensity={0.8} distance={5} decay={2} />
      <pointLight position={[0, 0.8, 1]} color="#64ffda" intensity={0.5} distance={3} decay={2} />

      <group ref={groupRef}>

        {/* BODY */}
        <mesh>
          <sphereGeometry args={[0.38, 20, 20]} />
          <meshStandardMaterial color="#6366f1" roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.05, 0.3]}>
          <sphereGeometry args={[0.19, 12, 12]} />
          <meshStandardMaterial color="#818cf8" roughness={0.5} />
        </mesh>

        {/* HEAD */}
        <group ref={headRef} position={[0, 0.5, 0]}>
          <mesh>
            <sphereGeometry args={[0.3, 20, 20]} />
            <meshStandardMaterial color="#6366f1" roughness={0.4} />
          </mesh>
          {/* snout */}
          <mesh position={[0, -0.07, 0.24]}>
            <sphereGeometry args={[0.13, 12, 12]} />
            <meshStandardMaterial color="#818cf8" roughness={0.5} />
          </mesh>
          {/* nostrils */}
          <mesh position={[-0.05, -0.05, 0.355]}>
            <sphereGeometry args={[0.022, 6, 6]} />
            <meshStandardMaterial color="#4338ca" />
          </mesh>
          <mesh position={[0.05, -0.05, 0.355]}>
            <sphereGeometry args={[0.022, 6, 6]} />
            <meshStandardMaterial color="#4338ca" />
          </mesh>
          {/* smile */}
          <mesh position={[0, -0.1, 0.33]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.065, 0.015, 8, 14, Math.PI * 0.75]} />
            <meshStandardMaterial color="#4338ca" />
          </mesh>
          {/* eyebrows */}
          <mesh position={[-0.12, 0.2, 0.27]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.09, 0.018, 0.01]} />
            <meshStandardMaterial color="#4338ca" />
          </mesh>
          <mesh position={[0.12, 0.2, 0.27]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.09, 0.018, 0.01]} />
            <meshStandardMaterial color="#4338ca" />
          </mesh>

          {/* EYE LEFT */}
          <group ref={eyeLRef} position={[-0.12, 0.09, 0.245]}>
            <mesh><sphereGeometry args={[0.078, 10, 10]} /><meshStandardMaterial color="white" /></mesh>
            <mesh position={[0, 0, 0.058]}><sphereGeometry args={[0.044, 8, 8]} /><meshStandardMaterial color="#0f172a" /></mesh>
            <mesh position={[0.022, 0.025, 0.078]}><sphereGeometry args={[0.014, 6, 6]} /><meshBasicMaterial color="white" /></mesh>
          </group>

          {/* EYE RIGHT */}
          <group ref={eyeRRef} position={[0.12, 0.09, 0.245]}>
            <mesh><sphereGeometry args={[0.078, 10, 10]} /><meshStandardMaterial color="white" /></mesh>
            <mesh position={[0, 0, 0.058]}><sphereGeometry args={[0.044, 8, 8]} /><meshStandardMaterial color="#0f172a" /></mesh>
            <mesh position={[0.022, 0.025, 0.078]}><sphereGeometry args={[0.014, 6, 6]} /><meshBasicMaterial color="white" /></mesh>
          </group>

          {/* EARS */}
          <mesh position={[-0.21, 0.26, 0]} rotation={[0, 0, -0.4]}>
            <coneGeometry args={[0.065, 0.2, 8]} />
            <meshStandardMaterial color="#6366f1" roughness={0.4} />
          </mesh>
          <mesh position={[0.21, 0.26, 0]} rotation={[0, 0, 0.4]}>
            <coneGeometry args={[0.065, 0.2, 8]} />
            <meshStandardMaterial color="#6366f1" roughness={0.4} />
          </mesh>
          {/* ear inner glow */}
          <mesh position={[-0.21, 0.28, 0.015]} rotation={[0, 0, -0.4]}>
            <coneGeometry args={[0.038, 0.13, 8]} />
            <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.6} />
          </mesh>
          <mesh position={[0.21, 0.28, 0.015]} rotation={[0, 0, 0.4]}>
            <coneGeometry args={[0.038, 0.13, 8]} />
            <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.6} />
          </mesh>
          {/* cheek blush */}
          <mesh position={[-0.2, -0.04, 0.24]}>
            <sphereGeometry args={[0.055, 8, 8]} />
            <meshStandardMaterial color="#f87171" transparent opacity={0.3} />
          </mesh>
          <mesh position={[0.2, -0.04, 0.24]}>
            <sphereGeometry args={[0.055, 8, 8]} />
            <meshStandardMaterial color="#f87171" transparent opacity={0.3} />
          </mesh>
        </group>

        {/* TAIL */}
        <group ref={tailRef} position={[0, -0.08, -0.34]}>
          <mesh rotation={[0.55, 0, 0]}>
            <cylinderGeometry args={[0.055, 0.03, 0.32, 8]} />
            <meshStandardMaterial color="#818cf8" roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.19, 0.13]}>
            <sphereGeometry args={[0.065, 8, 8]} />
            <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.6} />
          </mesh>
        </group>

        {/* LEFT ARM */}
        <group ref={armLRef} position={[-0.41, 0.1, 0]}>
          <mesh position={[0, -0.12, 0]}>
            <cylinderGeometry args={[0.065, 0.065, 0.26, 10]} />
            <meshStandardMaterial color="#4f46e5" roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.27, 0]}>
            <sphereGeometry args={[0.085, 8, 8]} />
            <meshStandardMaterial color="#6366f1" roughness={0.4} />
          </mesh>
        </group>

        {/* RIGHT ARM */}
        <group ref={armRRef} position={[0.41, 0.1, 0]}>
          <mesh position={[0, -0.12, 0]}>
            <cylinderGeometry args={[0.065, 0.065, 0.26, 10]} />
            <meshStandardMaterial color="#4f46e5" roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.27, 0]}>
            <sphereGeometry args={[0.085, 8, 8]} />
            <meshStandardMaterial color="#6366f1" roughness={0.4} />
          </mesh>
        </group>

        {/* LEFT LEG */}
        <group ref={legLRef} position={[-0.17, -0.35, 0]}>
          <mesh position={[0, -0.14, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.28, 10]} />
            <meshStandardMaterial color="#4f46e5" roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.32, 0.07]}>
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshStandardMaterial color="#4338ca" roughness={0.3} />
          </mesh>
        </group>

        {/* RIGHT LEG */}
        <group ref={legRRef} position={[0.17, -0.35, 0]}>
          <mesh position={[0, -0.14, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.28, 10]} />
            <meshStandardMaterial color="#4f46e5" roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.32, 0.07]}>
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshStandardMaterial color="#4338ca" roughness={0.3} />
          </mesh>
        </group>

        {/* glow aura */}
        <mesh>
          <sphereGeometry args={[0.52, 16, 16]} />
          <meshStandardMaterial color="#6366f1" transparent opacity={0.05} side={THREE.BackSide} />
        </mesh>

      </group>
    </group>
  );
}
