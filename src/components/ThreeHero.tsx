"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Core() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.pointer.x * 0.22;
    group.current.rotation.x = -state.pointer.y * 0.12;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.5}>
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[1.25, 2]} />
          <meshStandardMaterial color="#b9b4a9" roughness={0.25} metalness={0.78} wireframe />
        </mesh>
        <mesh scale={0.78}>
          <icosahedronGeometry args={[1.25, 2]} />
          <meshStandardMaterial color="#10131b" roughness={0.16} metalness={0.92} />
        </mesh>
        {[0, 1, 2, 3, 4].map((index) => (
          <mesh key={index} rotation={[0, 0, (index * Math.PI) / 5]}>
            <torusGeometry args={[1.7 + index * 0.12, 0.012, 8, 96]} />
            <meshBasicMaterial color={index % 2 ? "#ff8a4c" : "#8ec8ff"} transparent opacity={0.55} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function ThreeHero() {
  return (
    <Canvas camera={{ position: [0, 0, 5.2], fov: 38 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[3, 4, 4]} intensity={16} color="#ff9a64" />
      <pointLight position={[-4, -2, 2]} intensity={8} color="#78aaff" />
      <Stars radius={45} depth={25} count={700} factor={2} saturation={0} fade speed={0.35} />
      <Core />
    </Canvas>
  );
}
