"use client";

import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Hero3DProps = {
  orbRef: MutableRefObject<THREE.Mesh | null>;
  reducedMotion: boolean;
};

function Orb({ orbRef, runMotion, reducedMotion }: Hero3DProps & { runMotion: boolean }) {
  const localRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    orbRef.current = localRef.current;
    return () => {
      orbRef.current = null;
    };
  }, [orbRef]);

  useFrame((state, delta) => {
    if (!localRef.current || !runMotion || reducedMotion) {
      return;
    }

    localRef.current.rotation.y += delta * 0.35;
    localRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
  });

  return (
    <Float speed={1.4} rotationIntensity={reducedMotion ? 0.15 : 0.35} floatIntensity={0.8}>
      <mesh ref={localRef} position={[0, 0.1, 0]} castShadow>
        <icosahedronGeometry args={[1.15, 5]} />
        <MeshDistortMaterial
          color="#7ec6ff"
          metalness={0.2}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
          distort={reducedMotion ? 0.08 : 0.16}
          speed={reducedMotion ? 0.6 : 1.1}
          transmission={0.95}
          thickness={1.1}
          envMapIntensity={1.1}
        />
      </mesh>
    </Float>
  );
}

export function Hero3D({ orbRef, reducedMotion }: Hero3DProps) {
  const [runMotion, setRunMotion] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(media.matches);
    apply();
    media.addEventListener("change", apply);

    const onVisibility = () => {
      setRunMotion(!document.hidden);
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      media.removeEventListener("change", apply);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const dpr = useMemo<[number, number]>(() => (isMobile ? [0.7, 1.1] : [1, 1.8]), [isMobile]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Canvas dpr={dpr} camera={{ position: [0, 0, 4.5], fov: isMobile ? 54 : 48 }} gl={{ alpha: true, antialias: !isMobile }}>
        <color attach="background" args={["#07090f"]} />
        <fog attach="fog" args={["#07090f", 4.2, 11]} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 4, 4]} intensity={1.1} color="#bfe3ff" />
        <pointLight position={[-4, -1, 3]} intensity={1.2} color="#f6c76e" />
        <Orb orbRef={orbRef} reducedMotion={reducedMotion} runMotion={runMotion} />
        <Environment preset="night" />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(14,24,48,0.05)_0%,_rgba(6,7,11,0.78)_68%,_rgba(6,7,11,0.98)_100%)]" />
    </div>
  );
}
