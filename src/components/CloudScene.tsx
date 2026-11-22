"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Cloud, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function CloudField() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.pointer.x * 0.06 + state.clock.elapsedTime * 0.012;
    group.current.rotation.x = state.pointer.y * 0.025;
  });

  return (
    <group ref={group} position={[0, 0, -1]}>
      <Cloud position={[-2.8, 0.1, 0]} color="#fff4fa" opacity={0.78} speed={0.12} width={7} depth={2.2} segments={20} />
      <Cloud position={[2.5, 0.35, -0.5]} color="#f4c8e8" opacity={0.7} speed={0.1} width={7.5} depth={2.4} segments={22} />
      <Cloud position={[0, -0.8, 0.7]} color="#ffdce8" opacity={0.55} speed={0.08} width={8} depth={2.1} segments={18} />
      <Cloud position={[0.2, 1.05, -1.5]} color="#c7c8ef" opacity={0.34} speed={0.08} width={5.5} depth={2} segments={16} />
      <mesh position={[0, 0.05, 0.7]}>
        <sphereGeometry args={[0.48, 32, 32]} />
        <meshBasicMaterial color="#fff1d2" transparent opacity={0.82} />
      </mesh>
      <mesh rotation={[0.7, 0.1, 0.2]} position={[0, 0.05, 0.7]}>
        <torusGeometry args={[0.9, 0.012, 8, 96]} />
        <meshBasicMaterial color="#f8c7e8" transparent opacity={0.72} />
      </mesh>
    </group>
  );
}

export default function CloudScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 42 }} dpr={[1, 1.35]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[2, 3, 4]} intensity={10} color="#ffd9ee" />
      <pointLight position={[-3, -2, 2]} intensity={7} color="#aebaff" />
      <Stars radius={18} depth={8} count={350} factor={1.35} saturation={0.1} fade speed={0.15} />
      <CloudField />
    </Canvas>
  );
}
