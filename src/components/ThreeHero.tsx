"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Core() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.pointer.x * 0.16;
    group.current.rotation.x = -state.pointer.y * 0.08;
  });

  return (
    <Float speed={1.25} rotationIntensity={0.12} floatIntensity={0.38}>
      <group ref={group}>
        <mesh position={[0, 0.82, 0]} scale={[1, 1.08, 0.82]}>
          <sphereGeometry args={[0.86, 48, 48]} />
          <meshStandardMaterial color="#c86f55" roughness={0.32} metalness={0.58} />
        </mesh>
        <mesh position={[0, 0.83, 0.8]} scale={[0.72, 0.48, 0.12]}>
          <sphereGeometry args={[0.86, 32, 32]} />
          <meshStandardMaterial color="#131521" roughness={0.12} metalness={0.92} emissive="#252947" emissiveIntensity={0.22} />
        </mesh>
        <mesh position={[0, 0.85, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[1.22, 0.08, 12, 96]} />
          <meshStandardMaterial color="#e9936e" roughness={0.28} metalness={0.7} emissive="#ff674d" emissiveIntensity={0.22} />
        </mesh>
        <mesh position={[0, 0.85, 0.02]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.15, 0.035, 10, 96]} />
          <meshBasicMaterial color="#ffd2b5" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0, 0.86, 0.15]} scale={[0.18, 0.18, 0.18]}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial color="#f7cf8e" roughness={0.2} metalness={0.4} emissive="#ffa45f" emissiveIntensity={0.75} />
        </mesh>
        <mesh position={[0, -0.58, 0]} scale={[1.18, 1.05, 0.72]}>
          <capsuleGeometry args={[0.72, 1.32, 8, 24]} />
          <meshStandardMaterial color="#a95d48" roughness={0.38} metalness={0.62} />
        </mesh>
        <mesh position={[0, -0.45, 0.68]} scale={[0.42, 0.58, 0.14]}>
          <octahedronGeometry args={[0.72, 0]} />
          <meshStandardMaterial color="#f1b081" roughness={0.2} metalness={0.82} emissive="#ff6b42" emissiveIntensity={0.18} />
        </mesh>
        {[-1, 1].map((side) => (
          <group key={side}>
            <mesh position={[side * 1.14, -0.28, 0]} rotation={[0, 0, side * -0.18]}>
              <capsuleGeometry args={[0.24, 1.15, 8, 16]} />
              <meshStandardMaterial color="#b9634e" roughness={0.35} metalness={0.65} />
            </mesh>
            <mesh position={[side * 1.52, -1.28, 0]} scale={[0.36, 0.48, 0.28]}>
              <sphereGeometry args={[0.78, 24, 24]} />
              <meshStandardMaterial color="#d89a76" roughness={0.28} metalness={0.56} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.15, -0.74]} rotation={[Math.PI / 2, 0, 0]} scale={[1.55, 1.55, 1]}>
          <torusGeometry args={[0.96, 0.025, 8, 96]} />
          <meshBasicMaterial color="#9abfff" transparent opacity={0.72} />
        </mesh>
        <mesh position={[0, -0.1, -0.68]} rotation={[0, 0, Math.PI / 4]} scale={[1.1, 1.1, 1.1]}>
          <torusGeometry args={[1.28, 0.012, 6, 100]} />
          <meshBasicMaterial color="#ff9a62" transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

export default function ThreeHero() {
  return (
    <Canvas camera={{ position: [0, 0.1, 5.6], fov: 34 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.75} />
      <pointLight position={[3, 4, 4]} intensity={18} color="#ff9a64" />
      <pointLight position={[-4, 1, 3]} intensity={10} color="#78aaff" />
      <pointLight position={[0, -3, 2]} intensity={5} color="#f18ab1" />
      <Stars radius={45} depth={25} count={900} factor={2} saturation={0} fade speed={0.28} />
      <Core />
    </Canvas>
  );
}
