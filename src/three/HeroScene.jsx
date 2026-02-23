// src/three/HeroScene.jsx — AI Military Robot + Radar HUD + Fighter Jet
import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const lerp = (a, b, t) => a + (b - a) * t;

// ─── Fighter Jet with Sonic Boom ─────────────────────────────────────────────
function FighterJet({ mouseX, mouseY }) {
  const groupRef = useRef();
  const coneRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();
  const exhaustLRef = useRef();
  const exhaustRRef = useRef();
  const cockpitRef = useRef();
  const targetPos = useRef({ x: -14, y: 0 });
  const curPos = useRef({ x: -14, y: 0 });

  // Jet flies from x=-14 → x=+14 at y=2.8, z=1.5, loops every 5s
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const period = 6.0;
    const progress = (t % period) / period;     // 0→1, wraps cleanly

    // When a new pass starts (progress near 0), snap curPos back to left edge
    if (progress < 0.02) {
      curPos.current.x = -14;
    }

    const sweepX = lerp(-14, 14, progress);     // always left → right

    const mx = mouseX ? mouseX.current : 0;
    const my = mouseY ? mouseY.current : 0;
    targetPos.current.x = sweepX;
    targetPos.current.y = -my * 3.2;

    curPos.current.x = lerp(curPos.current.x, targetPos.current.x, 0.18);
    curPos.current.y = lerp(curPos.current.y, targetPos.current.y, 0.08);

    if (groupRef.current) {
      groupRef.current.position.x = curPos.current.x;
      groupRef.current.position.y = curPos.current.y + Math.sin(t * 3.5) * 0.06;
      groupRef.current.position.z = 1.5;
      // Slight roll
      groupRef.current.rotation.z = Math.sin(t * 2.2) * 0.06;
    }

    // Sonic boom cone — Mach cone pulsing opacity
    if (coneRef.current) {
      coneRef.current.material.opacity = 0.12 + Math.sin(t * 8) * 0.06;
    }

    // Shockwave ring 1 — expands and fades
    if (ringRef.current) {
      const s = 0.5 + ((t * 2.2) % 1.8) * 1.4;  // 0.5→3.0
      const op = Math.max(0, 1.0 - ((t * 2.2) % 1.8) / 1.8);
      ringRef.current.scale.set(s, s, 1);
      ringRef.current.material.opacity = op * 0.55;
    }
    // Shockwave ring 2 — offset phase
    if (ring2Ref.current) {
      const phase = ((t * 2.2 + 0.9) % 1.8);
      const s = 0.5 + phase * 1.4;
      const op = Math.max(0, 1.0 - phase / 1.8);
      ring2Ref.current.scale.set(s, s, 1);
      ring2Ref.current.material.opacity = op * 0.38;
    }

    // Afterburner flicker
    const flicker = 0.8 + Math.sin(t * 40) * 0.25 + Math.sin(t * 17) * 0.15;
    if (exhaustLRef.current) exhaustLRef.current.material.emissiveIntensity = flicker;
    if (exhaustRRef.current) exhaustRRef.current.material.emissiveIntensity = flicker;

    // Cockpit glow pulse
    if (cockpitRef.current) cockpitRef.current.material.emissiveIntensity = 0.6 + Math.sin(t * 1.8) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* ── Fuselage ── */}
      {/* Main body */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.055, 0.018, 1.1, 10]} />
        <meshStandardMaterial color="#b0bec5" roughness={0.18} metalness={0.92} />
      </mesh>
      {/* Nose cone */}
      <mesh position={[0.62, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.055, 0.32, 10]} />
        <meshStandardMaterial color="#cfd8dc" roughness={0.12} metalness={0.95} />
      </mesh>
      {/* Tail taper */}
      <mesh position={[-0.58, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.045, 0.22, 8]} />
        <meshStandardMaterial color="#90a4ae" roughness={0.22} metalness={0.88} />
      </mesh>

      {/* ── Cockpit ── */}
      <mesh ref={cockpitRef} position={[0.28, 0.06, 0]}>
        <sphereGeometry args={[0.065, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#40c4ff" emissive="#40c4ff" emissiveIntensity={0.6}
          transparent opacity={0.72} roughness={0.05} metalness={0.1}
        />
      </mesh>

      {/* ── Delta Wings ── */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([
              // left wing
              -0.28, 0, 0.04, 0.22, 0, 0.04, -0.22, 0, 0.72,
              // right wing
              -0.28, 0, -0.04, -0.22, 0, -0.72, 0.22, 0, -0.04,
            ])}
            count={6} itemSize={3}
          />
          <bufferAttribute
            attach="attributes-normal"
            array={new Float32Array([
              0, 1, 0, 0, 1, 0, 0, 1, 0,
              0, 1, 0, 0, 1, 0, 0, 1, 0,
            ])}
            count={6} itemSize={3}
          />
        </bufferGeometry>
        <meshStandardMaterial color="#90a4ae" roughness={0.2} metalness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* ── Tail Fins (vertical) ── */}
      {[0.12, -0.12].map((z, i) => (
        <mesh key={i} position={[-0.42, 0.05, z]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array([
                -0.14, 0, 0, 0.06, 0, 0, -0.1, 0.22, 0,
              ])}
              count={3} itemSize={3}
            />
            <bufferAttribute
              attach="attributes-normal"
              array={new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1])}
              count={3} itemSize={3}
            />
          </bufferGeometry>
          <meshStandardMaterial color="#78909c" roughness={0.22} metalness={0.88} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* ── Engines / afterburner ── */}
      {[0.14, -0.14].map((z, i) => (
        <group key={i} position={[-0.52, 0, z]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.032, 0.028, 0.12, 8]} />
            <meshStandardMaterial color="#455a64" roughness={0.25} metalness={0.9} />
          </mesh>
          {/* afterburner flame */}
          <mesh
            ref={i === 0 ? exhaustLRef : exhaustRRef}
            position={[-0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}
          >
            <coneGeometry args={[0.028, 0.28, 8]} />
            <meshStandardMaterial
              color="#ff6d00" emissive="#ff3d00" emissiveIntensity={1.2}
              transparent opacity={0.82} side={THREE.DoubleSide}
            />
          </mesh>
          {/* inner hot core */}
          <mesh position={[-0.09, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[0.014, 0.14, 6]} />
            <meshStandardMaterial
              color="#ffffff" emissive="#ffea00" emissiveIntensity={2.5}
              transparent opacity={0.65}
            />
          </mesh>
        </group>
      ))}

      {/* ── Sonic Boom Mach Cone ── (trails behind the nose) */}
      <mesh ref={coneRef} position={[-0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[1.1, 2.8, 32, 1, true]} />
        <meshBasicMaterial
          color="#64ffda" transparent opacity={0.14}
          side={THREE.DoubleSide} depthWrite={false}
        />
      </mesh>

      {/* ── Shockwave rings ── (facing side, like a mach disc) */}
      <mesh ref={ringRef} position={[0.76, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[0.18, 0.26, 40]} />
        <meshBasicMaterial
          color="#64ffda" transparent opacity={0.55}
          side={THREE.DoubleSide} depthWrite={false}
        />
      </mesh>
      <mesh ref={ring2Ref} position={[0.76, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[0.18, 0.26, 40]} />
        <meshBasicMaterial
          color="#a78bfa" transparent opacity={0.4}
          side={THREE.DoubleSide} depthWrite={false}
        />
      </mesh>

      {/* point light for local glow */}
      <pointLight position={[-0.5, 0, 0]} color="#ff6d00" intensity={1.8} distance={1.8} decay={2} />
    </group>
  );
}

function RadarRings() {
  const sweepRef = useRef();
  useFrame(({ clock }) => {
    if (sweepRef.current) sweepRef.current.rotation.z = -clock.getElapsedTime() * 1.2;
  });
  return (
    <group position={[0, 0, -2]} rotation={[Math.PI / 2, 0, 0]}>
      {[0.9, 1.7, 2.5, 3.2].map((r, i) => (
        <mesh key={i}>
          <ringGeometry args={[r - 0.015, r, 64]} />
          <meshBasicMaterial color="#64ffda" transparent opacity={0.1 - i * 0.018} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {[0, Math.PI / 2].map((angle, i) => (
        <mesh key={i} rotation={[0, 0, angle]}>
          <planeGeometry args={[6.4, 0.01]} />
          <meshBasicMaterial color="#64ffda" transparent opacity={0.06} />
        </mesh>
      ))}
      <group ref={sweepRef}>
        <mesh position={[1.6, 0, 0]}>
          <planeGeometry args={[3.2, 0.015]} />
          <meshBasicMaterial color="#64ffda" transparent opacity={0.7} />
        </mesh>
        <mesh position={[1.6, 0, 0]}>
          <planeGeometry args={[3.2, 0.5]} />
          <meshBasicMaterial color="#64ffda" transparent opacity={0.05} />
        </mesh>
      </group>
      {/* blip dots */}
      {[[1.2, 0.6], [-0.8, -1.4], [2.1, 1.0], [-1.5, 0.4]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.01]}>
          <circleGeometry args={[0.045, 8]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      ))}
    </group>
  );
}

function HUDPanel({ position, width, height, label = 'SYS', color = '#64ffda', delay = 0 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay;
    if (ref.current) ref.current.material.opacity = 0.1 + Math.sin(t * 0.6) * 0.04;
  });
  const lineWidths = useMemo(() => Array.from({ length: 5 }, () => 0.3 + Math.random() * 0.55), []);
  return (
    <group position={position}>
      <mesh ref={ref}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
      {/* border lines */}
      {[[-1, -1], [1, -1], [1, 1], [-1, 1], [-1, -1]].map((_, i, arr) => i < arr.length - 1 ? null : null)}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
        <lineBasicMaterial color={color} transparent opacity={0.45} />
      </lineSegments>
      {/* corner marks */}
      {[[-1, 1], [1, 1], [-1, -1], [1, -1]].map(([sx, sy], i) => (
        <group key={i} position={[sx * width / 2, sy * height / 2, 0.001]}>
          <mesh position={[sx * 0.04, 0, 0]}><planeGeometry args={[0.08, 0.012]} /><meshBasicMaterial color={color} /></mesh>
          <mesh position={[0, sy * 0.04, 0]}><planeGeometry args={[0.012, 0.08]} /><meshBasicMaterial color={color} /></mesh>
        </group>
      ))}
      {/* data lines */}
      {lineWidths.map((w, i) => (
        <mesh key={i} position={[-(width / 2) + w * width / 2, height / 2 - 0.09 - i * (height / 5.5), 0.001]}>
          <planeGeometry args={[w * width * 0.85, 0.012]} />
          <meshBasicMaterial color={color} transparent opacity={0.65} />
        </mesh>
      ))}
    </group>
  );
}

function Robot({ robotRef, headRef, armLRef, armRRef, legLRef, legRRef, visorRef }) {
  return (
    <group ref={robotRef}>
      {/* TORSO */}
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.88, 0.37]} />
        <meshStandardMaterial color="#2d4a6e" roughness={0.18} metalness={0.72} />
      </mesh>
      <mesh position={[0, 0.05, 0.2]}>
        <boxGeometry args={[0.48, 0.52, 0.045]} />
        <meshStandardMaterial color="#1a3555" roughness={0.12} metalness={0.82} />
      </mesh>
      {/* reactor core */}
      <mesh position={[0, 0.06, 0.225]}>
        <circleGeometry args={[0.095, 20]} />
        <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={3} />
      </mesh>
      <mesh position={[0, 0.06, 0.222]}>
        <ringGeometry args={[0.095, 0.125, 24]} />
        <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.6} transparent opacity={0.7} />
      </mesh>
      {/* vents */}
      {[-0.15, 0.15].map((x, i) => (
        <mesh key={i} position={[x, -0.2, 0.21]}>
          <boxGeometry args={[0.055, 0.2, 0.018]} />
          <meshStandardMaterial color="#4a6080" roughness={0.3} metalness={0.7} />
        </mesh>
      ))}
      {/* rank stripes */}
      <mesh position={[-0.22, 0.3, 0.21]}><boxGeometry args={[0.18, 0.038, 0.01]} /><meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={1.2} /></mesh>
      <mesh position={[-0.22, 0.245, 0.21]}><boxGeometry args={[0.12, 0.025, 0.01]} /><meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={1.0} /></mesh>
      {/* shoulder bolts */}
      {[-0.37, 0.37].map((x, i) => (
        <mesh key={i} position={[x, 0.41, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.09, 8]} />
          <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={1.2} />
        </mesh>
      ))}

      {/* NECK */}
      <mesh position={[0, 0.49, 0]}>
        <cylinderGeometry args={[0.095, 0.125, 0.17, 10]} />
        <meshStandardMaterial color="#1a3555" roughness={0.25} metalness={0.88} />
      </mesh>

      {/* HEAD */}
      <group ref={headRef} position={[0, 0.71, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.54, 0.48, 0.46]} />
          <meshStandardMaterial color="#2d4a6e" roughness={0.14} metalness={0.82} />
        </mesh>
        {/* visor */}
        <mesh ref={visorRef} position={[0, 0.04, 0.245]}>
          <boxGeometry args={[0.4, 0.15, 0.035]} />
          <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={2.8} transparent opacity={0.95} />
        </mesh>
        <mesh position={[0, 0.04, 0.228]}>
          <boxGeometry args={[0.42, 0.17, 0.01]} />
          <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.6} transparent opacity={0.45} />
        </mesh>
        {/* antenna */}
        <mesh position={[0.14, 0.32, 0]}><cylinderGeometry args={[0.009, 0.009, 0.28, 6]} /><meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={1.4} /></mesh>
        <mesh position={[0.14, 0.47, 0]}><sphereGeometry args={[0.028, 8, 8]} /><meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2.5} /></mesh>
        {/* ear panels */}
        {[-0.29, 0.29].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}><boxGeometry args={[0.055, 0.28, 0.33]} /><meshStandardMaterial color="#1a3555" roughness={0.18} metalness={0.92} /></mesh>
        ))}
        <mesh position={[0, 0.265, 0]}><boxGeometry args={[0.28, 0.055, 0.28]} /><meshStandardMaterial color="#4a6080" roughness={0.2} metalness={0.82} /></mesh>
      </group>

      {/* LEFT ARM */}
      <group ref={armLRef} position={[-0.44, 0.18, 0]}>
        <mesh position={[0, 0.11, 0]}><sphereGeometry args={[0.13, 10, 10]} /><meshStandardMaterial color="#2d4a6e" roughness={0.18} metalness={0.72} /></mesh>
        <mesh position={[0, -0.09, 0]}><cylinderGeometry args={[0.088, 0.082, 0.36, 10]} /><meshStandardMaterial color="#1a3555" roughness={0.24} metalness={0.82} /></mesh>
        <mesh position={[0, -0.31, 0]}><sphereGeometry args={[0.075, 8, 8]} /><meshStandardMaterial color="#4a6080" roughness={0.3} metalness={0.7} /></mesh>
        <mesh position={[0, -0.51, 0]}><cylinderGeometry args={[0.075, 0.068, 0.34, 10]} /><meshStandardMaterial color="#1a3555" roughness={0.24} metalness={0.82} /></mesh>
        <mesh position={[0, -0.72, 0]}><boxGeometry args={[0.13, 0.11, 0.11]} /><meshStandardMaterial color="#1a3555" roughness={0.18} metalness={0.88} /></mesh>
      </group>

      {/* RIGHT ARM */}
      <group ref={armRRef} position={[0.44, 0.18, 0]}>
        <mesh position={[0, 0.11, 0]}><sphereGeometry args={[0.13, 10, 10]} /><meshStandardMaterial color="#2d4a6e" roughness={0.18} metalness={0.72} /></mesh>
        <mesh position={[0, -0.09, 0]}><cylinderGeometry args={[0.088, 0.082, 0.36, 10]} /><meshStandardMaterial color="#1a3555" roughness={0.24} metalness={0.82} /></mesh>
        <mesh position={[0, -0.31, 0]}><sphereGeometry args={[0.075, 8, 8]} /><meshStandardMaterial color="#4a6080" roughness={0.3} metalness={0.7} /></mesh>
        <mesh position={[0, -0.51, 0]}><cylinderGeometry args={[0.075, 0.068, 0.34, 10]} /><meshStandardMaterial color="#1a3555" roughness={0.24} metalness={0.82} /></mesh>
        <mesh position={[0, -0.72, 0]}><boxGeometry args={[0.13, 0.11, 0.11]} /><meshStandardMaterial color="#1a3555" roughness={0.18} metalness={0.88} /></mesh>
        {/* gun barrel */}
        <mesh position={[0, -0.8, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.18, 8]} />
          <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={1.4} />
        </mesh>
      </group>

      {/* LEFT LEG */}
      <group ref={legLRef} position={[-0.21, -0.57, 0]}>
        <mesh position={[0, 0.04, 0]}><sphereGeometry args={[0.105, 8, 8]} /><meshStandardMaterial color="#4a6080" roughness={0.3} metalness={0.72} /></mesh>
        <mesh position={[0, -0.19, 0]}><cylinderGeometry args={[0.097, 0.088, 0.4, 10]} /><meshStandardMaterial color="#1a3555" roughness={0.22} metalness={0.82} /></mesh>
        <mesh position={[0, -0.42, 0]}><boxGeometry args={[0.155, 0.095, 0.19]} /><meshStandardMaterial color="#2d4a6e" roughness={0.18} metalness={0.78} /></mesh>
        <mesh position={[0, -0.6, 0]}><cylinderGeometry args={[0.086, 0.076, 0.32, 10]} /><meshStandardMaterial color="#1a3555" roughness={0.22} metalness={0.82} /></mesh>
        <mesh position={[0, -0.82, 0.06]}><boxGeometry args={[0.19, 0.14, 0.32]} /><meshStandardMaterial color="#1a3555" roughness={0.18} metalness={0.88} /></mesh>
        <mesh position={[0, -0.9, 0.06]}><boxGeometry args={[0.19, 0.018, 0.32]} /><meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={1.2} /></mesh>
      </group>

      {/* RIGHT LEG */}
      <group ref={legRRef} position={[0.21, -0.57, 0]}>
        <mesh position={[0, 0.04, 0]}><sphereGeometry args={[0.105, 8, 8]} /><meshStandardMaterial color="#4a6080" roughness={0.3} metalness={0.72} /></mesh>
        <mesh position={[0, -0.19, 0]}><cylinderGeometry args={[0.097, 0.088, 0.4, 10]} /><meshStandardMaterial color="#1a3555" roughness={0.22} metalness={0.82} /></mesh>
        <mesh position={[0, -0.42, 0]}><boxGeometry args={[0.155, 0.095, 0.19]} /><meshStandardMaterial color="#2d4a6e" roughness={0.18} metalness={0.78} /></mesh>
        <mesh position={[0, -0.6, 0]}><cylinderGeometry args={[0.086, 0.076, 0.32, 10]} /><meshStandardMaterial color="#1a3555" roughness={0.22} metalness={0.82} /></mesh>
        <mesh position={[0, -0.82, 0.06]}><boxGeometry args={[0.19, 0.14, 0.32]} /><meshStandardMaterial color="#1a3555" roughness={0.18} metalness={0.88} /></mesh>
        <mesh position={[0, -0.9, 0.06]}><boxGeometry args={[0.19, 0.018, 0.32]} /><meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={1.2} /></mesh>
      </group>
    </group>
  );
}

function GridFloor() {
  const ref = useRef();
  useFrame(({ clock }) => { if (ref.current) ref.current.position.z = (clock.getElapsedTime() * 0.35) % 1; });
  return <gridHelper ref={ref} args={[20, 22, '#1e3a5f', '#0f2044']} position={[0, -2.1, 0]} />;
}

function DataStream() {
  const ref = useRef();
  const count = 60;
  const pos = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) { a[i * 3] = (Math.random() - 0.5) * 12; a[i * 3 + 1] = (Math.random() - 0.5) * 14; a[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2; }
    return a;
  }, []);
  useFrame(() => {
    const p = ref.current?.geometry?.attributes?.position;
    if (!p) return;
    for (let i = 0; i < count; i++) { p.array[i * 3 + 1] += 0.012; if (p.array[i * 3 + 1] > 7) p.array[i * 3 + 1] = -7; }
    p.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" array={pos} count={count} itemSize={3} /></bufferGeometry>
      <pointsMaterial color="#64ffda" size={0.028} transparent opacity={0.55} />
    </points>
  );
}

export default function HeroScene({ mouseX, mouseY }) {
  const robotRef = useRef(); const headRef = useRef(); const armLRef = useRef(); const armRRef = useRef();
  const legLRef = useRef(); const legRRef = useRef(); const visorRef = useRef(); const lightRef = useRef();

  const sc = useRef({ currentY: 0.8, targetY: 0.8, lastRaw: 0, dir: 0, phase: 0, walking: false, idleT: 0 });

  useEffect(() => {
    const h = () => {
      const s = sc.current, raw = window.scrollY, max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      s.targetY = 0.8 - (raw / max) * 8.5; s.dir = raw > s.lastRaw ? -1 : 1; s.lastRaw = raw; s.walking = true; s.idleT = 0;
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.05), t = clock.getElapsedTime(), s = sc.current;
    s.currentY = lerp(s.currentY, s.targetY, 0.07);
    const dist = Math.abs(s.targetY - s.currentY);
    if (dist < 0.02) { s.walking = false; s.idleT += dt; } else { s.walking = true; s.idleT = 0; }

    const r = robotRef.current, h = headRef.current, aL = armLRef.current, aR = armRRef.current;
    const lL = legLRef.current, lR = legRRef.current, v = visorRef.current, light = lightRef.current;
    if (!r || !h || !aL || !aR || !lL || !lR) return;

    r.position.y = s.currentY;

    if (s.walking) {
      s.phase += dt * 7;
      r.position.y = s.currentY + Math.abs(Math.sin(s.phase)) * 0.055;
      r.rotation.x = lerp(r.rotation.x, s.dir === -1 ? 0.09 : -0.09, 0.06);
      lL.rotation.x = Math.sin(s.phase) * 0.52; lR.rotation.x = Math.sin(s.phase + Math.PI) * 0.52;
      aL.rotation.x = Math.sin(s.phase + Math.PI) * 0.38; aR.rotation.x = Math.sin(s.phase) * 0.38;
      aL.rotation.z = lerp(aL.rotation.z, -0.14, 0.1); aR.rotation.z = lerp(aR.rotation.z, 0.14, 0.1);
      h.rotation.x = lerp(h.rotation.x, s.dir === -1 ? 0.12 : -0.08, 0.05);
      if (light) light.intensity = 1.4 + Math.sin(s.phase * 2) * 0.38;
    } else {
      r.rotation.x = lerp(r.rotation.x, 0, 0.04);
      r.position.y = s.currentY + Math.sin(t * 1.1) * 0.038;
      lL.rotation.x = lerp(lL.rotation.x, 0, 0.07); lR.rotation.x = lerp(lR.rotation.x, 0, 0.07);
      aL.rotation.x = lerp(aL.rotation.x, 0, 0.05); aR.rotation.x = lerp(aR.rotation.x, 0, 0.05);
      aL.rotation.z = lerp(aL.rotation.z, -0.22, 0.04); aR.rotation.z = lerp(aR.rotation.z, 0.22, 0.04);
      // Idle head look-around overridden by cursor when available
      if (s.idleT > 1) {
        const mx = mouseX ? mouseX.current : 0;
        const my = mouseY ? mouseY.current : 0;
        if (Math.abs(mx) > 0.02 || Math.abs(my) > 0.02) {
          h.rotation.y = lerp(h.rotation.y, mx * 0.55, 0.08);
          h.rotation.x = lerp(h.rotation.x, my * 0.3, 0.08);
        } else {
          h.rotation.y = Math.sin(t * 0.45) * 0.22; h.rotation.x = lerp(h.rotation.x, 0.04, 0.03);
        }
      }
      if (light) light.intensity = lerp(light.intensity, 1.6 + Math.sin(t * 1.4) * 0.4, 0.04);
    }
    // Always track cursor with head (smooth, even while walking)
    if (h && mouseX && mouseY) {
      const mx = mouseX.current || 0;
      const my = mouseY.current || 0;
      if (!s.walking) {
        h.rotation.y = lerp(h.rotation.y, mx * 0.55, 0.06);
        h.rotation.x = lerp(h.rotation.x, my * 0.3 - 0.04, 0.06);
      }
    }
    if (v) v.material.emissiveIntensity = 1.8 + Math.sin(t * 2.2) * 0.65;
  });

  return (
    <group>
      <pointLight ref={lightRef} position={[0, 1, 2.5]} color="#64ffda" intensity={3.5} distance={12} decay={2} />
      <pointLight position={[-2.5, 2, 1.5]} color="#818cf8" intensity={2.0} distance={9} decay={2} />
      <pointLight position={[2, -1, 1.5]} color="#60d0ff" intensity={1.8} distance={8} decay={2} />
      <pointLight position={[0, 0, 4]} color="#ffffff" intensity={2.5} distance={10} decay={2} />

      <RadarRings />
      <DataStream />
      <GridFloor />

      <HUDPanel position={[-3.6, 1.4, -0.8]} width={1.3} height={0.85} color="#64ffda" delay={0} />
      <HUDPanel position={[3.4, 0.7, -0.8]} width={1.1} height={0.7} color="#a78bfa" delay={1.2} />
      <HUDPanel position={[-3.3, -1.4, -0.8]} width={1.0} height={0.6} color="#60a5fa" delay={2.1} />
      <HUDPanel position={[3.2, -1.9, -0.8]} width={1.2} height={0.75} color="#64ffda" delay={0.6} />

      <Robot robotRef={robotRef} headRef={headRef} armLRef={armLRef} armRRef={armRRef}
        legLRef={legLRef} legRRef={legRRef} visorRef={visorRef} />

      <FighterJet mouseX={mouseX} mouseY={mouseY} />
    </group>
  );
}
