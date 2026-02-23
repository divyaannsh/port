// src/three/HeroScene.jsx — AI Military Robot + Radar HUD + Fighter Jet + Cityscape
import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const lerp = (a, b, t) => a + (b - a) * t;

// ─── City Skyline ─────────────────────────────────────────────────────────────
// Low-poly buildings silhouetted along bottom of scene, with random window glow
const BUILDINGS = [
  { x: -11, w: 0.55, h: 1.1 }, { x: -10.1, w: 0.7, h: 1.8 }, { x: -9.1, w: 0.45, h: 1.4 },
  { x: -8.3, w: 0.9, h: 2.6 }, { x: -7.1, w: 0.5, h: 1.3 }, { x: -6.3, w: 0.65, h: 2.1 },
  { x: -5.3, w: 0.8, h: 3.0 }, { x: -4.2, w: 0.5, h: 1.6 }, { x: -3.4, w: 1.0, h: 2.3 },
  { x: -2.1, w: 0.55, h: 1.8 }, { x: -1.1, w: 0.7, h: 2.8 }, { x: -0.1, w: 0.45, h: 1.5 },
  { x: 0.8, w: 0.9, h: 3.4 }, { x: 2.0, w: 0.5, h: 1.9 }, { x: 2.8, w: 0.75, h: 2.5 },
  { x: 3.9, w: 0.55, h: 1.4 }, { x: 4.8, w: 1.0, h: 3.1 }, { x: 6.1, w: 0.6, h: 2.0 },
  { x: 7.2, w: 0.7, h: 1.6 }, { x: 8.3, w: 0.5, h: 2.7 }, { x: 9.4, w: 0.85, h: 1.3 },
  { x: 10.5, w: 0.6, h: 2.2 }, { x: 11.4, w: 0.45, h: 1.0 },
];

// window grid offsets pre-computed per building
const WIN_SEED = BUILDINGS.map(b => {
  const cols = Math.floor(b.w / 0.12);
  const rows = Math.floor(b.h / 0.18);
  const wins = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() > 0.38) wins.push([c, r]);
    }
  }
  return wins;
});

function CityScape() {
  const windowRefs = useRef([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    windowRefs.current.forEach((m, i) => {
      if (m) m.material.emissiveIntensity = 0.06 + Math.sin(t * 0.4 + i * 2.7) * 0.03;
    });
  });

  let wIdx = 0;
  return (
    <group position={[0, -4.6, -6]}>
      {BUILDINGS.map((b, bi) => (
        <group key={bi} position={[b.x, b.h / 2, 0]}>
          {/* building body */}
          <mesh>
            <boxGeometry args={[b.w, b.h, 0.3]} />
            <meshStandardMaterial color="#0a0e18" roughness={0.9} metalness={0.1} />
          </mesh>
          {/* edge glow outline */}
          <mesh>
            <boxGeometry args={[b.w + 0.01, b.h + 0.01, 0.31]} />
            <meshBasicMaterial color="#1a2840" transparent opacity={0.35} wireframe />
          </mesh>
          {/* windows */}
          {WIN_SEED[bi].map(([c, r], wi) => {
            const wx = -b.w / 2 + 0.07 + c * 0.12;
            const wy = -b.h / 2 + 0.1 + r * 0.18;
            const col = Math.random() > 0.3 ? '#ffd166' : '#60a5fa';
            const ref = el => { windowRefs.current[wIdx++] = el; };
            return (
              <mesh key={wi} ref={ref} position={[wx, wy, 0.16]}>
                <planeGeometry args={[0.072, 0.1]} />
                <meshStandardMaterial color={col} emissive={col}
                  emissiveIntensity={0.08} transparent opacity={0.45} />
              </mesh>
            );
          })}
          {/* rooftop antenna */}
          {b.h > 2.4 && (
            <mesh position={[0, b.h / 2 + 0.12, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.25, 4]} />
              <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.8} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

// ─── Signal Tower ──────────────────────────────────────────────────────────────
function SignalTower({ x = 5.5, y = -4.0, z = -4 }) {
  const dishRef = useRef();
  const blinkRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (dishRef.current) dishRef.current.rotation.y = t * 0.6;
    if (blinkRef.current) blinkRef.current.material.emissiveIntensity =
      Math.sin(t * 3.5) > 0.4 ? 2.5 : 0.0;
  });
  return (
    <group position={[x, y, z]}>
      {/* main mast */}
      <mesh><cylinderGeometry args={[0.025, 0.045, 2.8, 6]} />
        <meshStandardMaterial color="#334155" roughness={0.45} metalness={0.85} /></mesh>
      {/* cross-braces */}
      {[0.5, 1.1, 1.7].map((h, i) => (
        <mesh key={i} position={[0, h - 1.4, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 0.45, 4]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.7} />
        </mesh>
      ))}
      {/* satellite dish */}
      <group ref={dishRef} position={[0, 1.2, 0]}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.22, 0.018, 8, 24, Math.PI * 2]} />
          <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.4}
            roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <sphereGeometry args={[0.18, 12, 6, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} metalness={0.7}
            transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      </group>
      {/* blinking warning light */}
      <mesh ref={blinkRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.035, 8, 6]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff2222" emissiveIntensity={0} />
      </mesh>
      <pointLight position={[0, 1.5, 0]} color="#ff4444" intensity={0.6} distance={1.2} decay={2} />
    </group>
  );
}

// ─── Targeting Reticle ─────────────────────────────────────────────────────────
// Drifts across the scene HUD-style, locks briefly then moves on
function TargetReticle() {
  const groupRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();
  const crossH = useRef();
  const crossV = useRef();
  const labelRef = useRef();
  const state = useRef({ px: -3, py: 1.5, tx: 2, ty: -1, phase: 0, lock: false, lockT: 0 });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const s = state.current;

    // every 4 seconds pick a new target
    if (t - s.lockT > 3.8) {
      s.tx = (Math.random() - 0.5) * 8;
      s.ty = (Math.random() - 0.5) * 5;
      s.lock = false;
      s.lockT = t;
    }

    const dist = Math.hypot(s.px - s.tx, s.py - s.ty);
    if (dist < 0.08) { s.lock = true; }

    s.px = lerp(s.px, s.tx, s.lock ? 0 : 0.04);
    s.py = lerp(s.py, s.ty, s.lock ? 0 : 0.04);

    const locking = s.lock;
    const ringScale = locking ? lerp(1.4, 1.0, Math.min(1, (t - s.lockT) * 2)) : 1.0;
    const opacity = locking ? 0.9 : 0.5 + Math.sin(t * 2) * 0.1;
    const col = locking ? '#ff4444' : '#64ffda';

    if (groupRef.current) {
      groupRef.current.position.set(s.px, s.py, 1.8);
    }
    [ringRef, ring2Ref].forEach((r, i) => {
      if (!r.current) return;
      const sc = ringScale * (i === 0 ? 1 : 0.65);
      r.current.scale.set(sc, sc, 1);
      r.current.material.opacity = opacity * (i === 0 ? 1 : 0.5);
      r.current.material.color.set(col);
    });
    if (crossH.current) {
      crossH.current.material.opacity = opacity;
      crossH.current.material.color.set(col);
    }
    if (crossV.current) {
      crossV.current.material.opacity = opacity;
      crossV.current.material.color.set(col);
    }
    if (ringRef.current) ringRef.current.rotation.z = t * (locking ? 1.5 : 0.4);
  });

  return (
    <group ref={groupRef}>
      {/* outer ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.22, 0.26, 48]} />
        <meshBasicMaterial color="#64ffda" transparent opacity={0.5}
          side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {/* inner ring */}
      <mesh ref={ring2Ref}>
        <ringGeometry args={[0.11, 0.14, 32]} />
        <meshBasicMaterial color="#64ffda" transparent opacity={0.25}
          side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {/* crosshair H */}
      <mesh ref={crossH} position={[0, 0, 0]}>
        <planeGeometry args={[0.55, 0.012]} />
        <meshBasicMaterial color="#64ffda" transparent opacity={0.5}
          side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {/* crosshair V */}
      <mesh ref={crossV} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[0.55, 0.012]} />
        <meshBasicMaterial color="#64ffda" transparent opacity={0.5}
          side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {/* corner brackets at 45° */}
      {[0, 1, 2, 3].map(i => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 2 + Math.PI / 4]}
          position={[Math.cos((i * Math.PI) / 2 + Math.PI / 4) * 0.22,
          Math.sin((i * Math.PI) / 2 + Math.PI / 4) * 0.22, 0]}>
          <planeGeometry args={[0.1, 0.012]} />
          <meshBasicMaterial color="#64ffda" transparent opacity={0.7}
            side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Search Beam ───────────────────────────────────────────────────────────────
// A sweeping cone of light from the ground — like a military searchlight
function SearchBeam({ x = -6, z = -3 }) {
  const beamRef = useRef();
  const coneRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const sweep = Math.sin(t * 0.7) * 0.6;   // oscillate ±0.6 rad
    if (beamRef.current) {
      beamRef.current.rotation.z = sweep;
      beamRef.current.rotation.x = 0.15;
    }
    if (coneRef.current) {
      coneRef.current.material.opacity = 0.06 + Math.sin(t * 1.4) * 0.025;
    }
  });
  return (
    <group position={[x, -4.8, z]}>
      {/* base housing */}
      <mesh>
        <cylinderGeometry args={[0.09, 0.12, 0.15, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.85} />
      </mesh>
      {/* rotating head + beam */}
      <group ref={beamRef} position={[0, 0.1, 0]}>
        <mesh>
          <sphereGeometry args={[0.07, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.9} />
        </mesh>
        {/* the cone beam */}
        <mesh ref={coneRef} position={[0, 1.8, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.8, 3.6, 32, 1, true]} />
          <meshBasicMaterial color="#64ffda" transparent opacity={0.07}
            side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
        {/* lens glow */}
        <mesh position={[0, 0.08, 0]}>
          <sphereGeometry args={[0.05, 8, 6]} />
          <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={1.8}
            roughness={0.05} />
        </mesh>
        <pointLight position={[0, 0.1, 0]} color="#64ffda" intensity={1.2} distance={1.5} decay={2} />
      </group>
    </group>
  );
}


// ─── Fighter Jet (no sonic boom) ───────────────────────────────────────────────
function FighterJet({ mouseX, mouseY, period = 6, offsetT = 0, baseZ = 1.5, scale = 1 }) {
  const groupRef = useRef();
  const exhaustLRef = useRef();
  const exhaustRRef = useRef();
  const cockpitRef = useRef();
  const curPos = useRef({ x: -14, y: 0 });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + offsetT;
    const prg = (t % period) / period;
    if (prg < 0.025) curPos.current.x = -14;  // teleport back silently

    const sweepX = lerp(-14, 14, prg);
    const my = mouseY ? mouseY.current : 0;

    curPos.current.x = lerp(curPos.current.x, sweepX, 0.18);
    curPos.current.y = lerp(curPos.current.y, -my * 3.2, 0.06);

    if (groupRef.current) {
      groupRef.current.position.set(
        curPos.current.x,
        curPos.current.y + Math.sin(t * 3.5) * 0.05,
        baseZ
      );
      groupRef.current.rotation.z = Math.sin(t * 2.2) * 0.05;
    }

    const flicker = 0.8 + Math.sin(t * 40) * 0.25 + Math.sin(t * 17) * 0.15;
    if (exhaustLRef.current) exhaustLRef.current.material.emissiveIntensity = flicker;
    if (exhaustRRef.current) exhaustRRef.current.material.emissiveIntensity = flicker;
    if (cockpitRef.current) cockpitRef.current.material.emissiveIntensity = 0.6 + Math.sin(t * 1.8) * 0.2;
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* fuselage */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.055, 0.018, 1.1, 10]} />
        <meshStandardMaterial color="#b0bec5" roughness={0.18} metalness={0.92} />
      </mesh>
      {/* nose */}
      <mesh position={[0.62, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.055, 0.32, 10]} />
        <meshStandardMaterial color="#cfd8dc" roughness={0.12} metalness={0.95} />
      </mesh>
      {/* tail taper */}
      <mesh position={[-0.58, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.045, 0.22, 8]} />
        <meshStandardMaterial color="#90a4ae" roughness={0.22} metalness={0.88} />
      </mesh>
      {/* cockpit */}
      <mesh ref={cockpitRef} position={[0.28, 0.06, 0]}>
        <sphereGeometry args={[0.065, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#40c4ff" emissive="#40c4ff" emissiveIntensity={0.6}
          transparent opacity={0.72} roughness={0.05} metalness={0.1} />
      </mesh>
      {/* delta wings */}
      <mesh>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position"
            array={new Float32Array([
              -0.28, 0, 0.04, 0.22, 0, 0.04, -0.22, 0, 0.72,
              -0.28, 0, -0.04, -0.22, 0, -0.72, 0.22, 0, -0.04,
            ])} count={6} itemSize={3} />
          <bufferAttribute attach="attributes-normal"
            array={new Float32Array([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0])}
            count={6} itemSize={3} />
        </bufferGeometry>
        <meshStandardMaterial color="#90a4ae" roughness={0.2} metalness={0.9} side={THREE.DoubleSide} />
      </mesh>
      {/* vertical tail fins */}
      {[0.12, -0.12].map((z, i) => (
        <mesh key={i} position={[-0.42, 0.05, z]}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position"
              array={new Float32Array([-0.14, 0, 0, 0.06, 0, 0, -0.1, 0.22, 0])}
              count={3} itemSize={3} />
            <bufferAttribute attach="attributes-normal"
              array={new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1])} count={3} itemSize={3} />
          </bufferGeometry>
          <meshStandardMaterial color="#78909c" roughness={0.22} metalness={0.88} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* engines + afterburner */}
      {[0.14, -0.14].map((z, i) => (
        <group key={i} position={[-0.52, 0, z]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.032, 0.028, 0.12, 8]} />
            <meshStandardMaterial color="#455a64" roughness={0.25} metalness={0.9} />
          </mesh>
          <mesh ref={i === 0 ? exhaustLRef : exhaustRRef}
            position={[-0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[0.028, 0.28, 8]} />
            <meshStandardMaterial color="#ff6d00" emissive="#ff3d00" emissiveIntensity={1.2}
              transparent opacity={0.82} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[-0.09, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[0.014, 0.14, 6]} />
            <meshStandardMaterial color="#fff" emissive="#ffea00" emissiveIntensity={2.5}
              transparent opacity={0.65} />
          </mesh>
        </group>
      ))}
      <pointLight position={[-0.5, 0, 0]} color="#ff6d00" intensity={1.4} distance={1.5} decay={2} />
    </group>
  );
}

// ─── Passenger Plane (Boeing-style wide body) ─────────────────────────────
// Props: period = loop duration, offsetT = time offset for staggering,
//        baseY = fixed altitude, baseZ = depth, scale = size multiplier
function PassengerPlane({ period = 9, offsetT = 0, baseY = 2, baseZ = 0.5, scale = 1 }) {
  const groupRef = useRef();
  const curX = useRef(-14);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + offsetT;
    const prg = (t % period) / period;
    if (prg < 0.02) curX.current = -14;
    curX.current = lerp(curX.current, lerp(-14, 14, prg), 0.14);

    if (groupRef.current) {
      groupRef.current.position.set(
        curX.current,
        baseY + Math.sin(t * 0.8) * 0.12,
        baseZ
      );
      // gentle banking
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.025;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* — Fuselage (wide oval tube) — */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 1.8, 14]} />
        <meshStandardMaterial color="#e8eef5" roughness={0.25} metalness={0.6} />
      </mesh>
      {/* nose dome */}
      <mesh position={[0.96, 0, 0]}>
        <sphereGeometry args={[0.09, 12, 8, 0, Math.PI]} />
        <meshStandardMaterial color="#dde6f0" roughness={0.2} metalness={0.55} />
      </mesh>
      {/* tail taper */}
      <mesh position={[-0.96, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.09, 0.38, 12]} />
        <meshStandardMaterial color="#cdd8e8" roughness={0.28} metalness={0.55} />
      </mesh>

      {/* — Cockpit windows strip — */}
      {[-0.035, 0, 0.035].map((z, i) => (
        <mesh key={i} position={[0.72, 0.07, z]}>
          <boxGeometry args={[0.06, 0.04, 0.025]} />
          <meshStandardMaterial color="#87ceeb" emissive="#87ceeb" emissiveIntensity={0.4}
            transparent opacity={0.85} roughness={0.05} />
        </mesh>
      ))}

      {/* — Fuselage side windows (tiny dots along body) — */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} position={[0.55 - i * 0.12, 0.09, 0.091]}>
          <boxGeometry args={[0.04, 0.04, 0.005]} />
          <meshStandardMaterial color="#b8daf8" emissive="#b8daf8" emissiveIntensity={0.3}
            transparent opacity={0.7} />
        </mesh>
      ))}

      {/* — Swept wings — */}
      {[1, -1].map((side, si) => (
        <mesh key={si}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position"
              array={new Float32Array([
                0.15, -0.02, 0,
                0.15, -0.02, side * 0.08,
                -0.35, -0.02, side * 1.6,
                -0.35, -0.02, side * 1.65,
                0.15, -0.02, side * 0.13,
                0.15, -0.02, 0,
              ])} count={6} itemSize={3} />
            <bufferAttribute attach="attributes-normal"
              array={new Float32Array([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0])}
              count={6} itemSize={3} />
          </bufferGeometry>
          <meshStandardMaterial color="#d0dae8" roughness={0.22} metalness={0.7} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* — Wing tip lights — */}
      {[1, -1].map((side, si) => (
        <pointLight key={si} position={[-0.35, -0.02, side * 1.62]}
          color={side === 1 ? '#ff4444' : '#44ff44'} intensity={0.4} distance={0.8} decay={2} />
      ))}

      {/* — 4 Engine nacelles under wings — */}
      {[{ x: -0.05, z: 0.55 }, { x: -0.22, z: 1.1 },
      { x: -0.05, z: -0.55 }, { x: -0.22, z: -1.1 }].map((p, i) => (
        <group key={i} position={[p.x, -0.1, p.z]}>
          {/* nacelle body */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.038, 0.032, 0.28, 10]} />
            <meshStandardMaterial color="#8090a0" roughness={0.3} metalness={0.85} />
          </mesh>
          {/* inlet */}
          <mesh position={[0.15, 0, 0]}>
            <torusGeometry args={[0.038, 0.008, 8, 18]} />
            <meshStandardMaterial color="#607080" roughness={0.2} metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* — Vertical tail fin — */}
      <mesh position={[-0.72, 0.06, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position"
            array={new Float32Array([
              -0.28, 0, 0, 0.12, 0, 0, -0.2, 0.38, 0,
              -0.28, 0, 0.005, 0.12, 0, 0.005, -0.2, 0.38, 0.005,
            ])} count={6} itemSize={3} />
          <bufferAttribute attach="attributes-normal"
            array={new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1])}
            count={6} itemSize={3} />
        </bufferGeometry>
        <meshStandardMaterial color="#d0dae8" roughness={0.25} metalness={0.65} side={THREE.DoubleSide} />
      </mesh>

      {/* — Horizontal stabilisers — */}
      {[0.18, -0.18].map((z, i) => (
        <mesh key={i} position={[-0.82, 0, z]}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position"
              array={new Float32Array([
                -0.12, 0, 0, 0.06, 0, 0, -0.08, 0, z > 0 ? 0.45 : -0.45,
              ])} count={3} itemSize={3} />
            <bufferAttribute attach="attributes-normal"
              array={new Float32Array([0, 1, 0, 0, 1, 0, 0, 1, 0])} count={3} itemSize={3} />
          </bufferGeometry>
          <meshStandardMaterial color="#d0dae8" roughness={0.25} metalness={0.65} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* belly strobe */}
      <pointLight position={[0, -0.1, 0]} color="#ffffff" intensity={0.3} distance={1.2} decay={2} />
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

      {/* — Fighter jet: cursor-tracking Y — */}
      <FighterJet mouseX={mouseX} mouseY={mouseY} period={6} offsetT={0} baseZ={1.5} scale={1} />

      {/* — Passenger planes at fixed altitudes, staggered — */}
      <PassengerPlane period={11} offsetT={0} baseY={3.8} baseZ={-0.5} scale={0.85} />
      <PassengerPlane period={14} offsetT={5.5} baseY={-2.6} baseZ={-1.2} scale={0.7} />
      <PassengerPlane period={9} offsetT={2.2} baseY={1.4} baseZ={-2.0} scale={0.55} />
      <PassengerPlane period={13} offsetT={7.0} baseY={-1.1} baseZ={-0.8} scale={0.78} />
      <PassengerPlane period={8} offsetT={3.8} baseY={2.9} baseZ={-3.0} scale={0.45} />
      <PassengerPlane period={16} offsetT={1.0} baseY={-3.5} baseZ={-2.5} scale={0.62} />

      {/* — Cityscape + Cinematic Ground Story — */}
      <CityScape />
      <SignalTower x={-8.5} y={-4.0} z={-5} />
      <SignalTower x={6.5} y={-4.0} z={-4.5} />
      <TargetReticle />
      <SearchBeam x={-5.5} z={-4} />
      <SearchBeam x={4.5} z={-5} />
    </group>
  );
}
