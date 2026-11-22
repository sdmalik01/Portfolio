"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function OrbitalProbe() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.pointer.x * 0.18 + state.clock.elapsedTime * 0.08;
    group.current.rotation.x = -state.pointer.y * 0.08;
  });

  return (
    <Float speed={1.15} rotationIntensity={0.12} floatIntensity={0.42}>
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[1.15, 3]} />
          <meshStandardMaterial color="#b9bdca" roughness={0.2} metalness={0.82} wireframe />
        </mesh>
        <mesh scale={0.82}>
          <icosahedronGeometry args={[1.15, 3]} />
          <meshStandardMaterial color="#151926" roughness={0.18} metalness={0.94} emissive="#252947" emissiveIntensity={0.35} />
        </mesh>
        <mesh scale={0.36}>
          <icosahedronGeometry args={[1.15, 2]} />
          <meshStandardMaterial color="#ffc4b2" roughness={0.16} metalness={0.55} emissive="#ff6d8d" emissiveIntensity={0.8} />
        </mesh>
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 1.65, 0, 0]}>
            <mesh>
              <boxGeometry args={[1.2, 0.08, 0.7]} />
              <meshStandardMaterial color="#8c9bc8" roughness={0.3} metalness={0.8} emissive="#6274bd" emissiveIntensity={0.22} />
            </mesh>
            <mesh position={[side * 0.58, 0, 0]} scale={[0.5, 0.7, 0.52]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="#f0b5e5" transparent opacity={0.72} />
            </mesh>
          </group>
        ))}
        {[0, 1, 2].map((index) => (
          <mesh key={index} rotation={[index * 0.62, index * 0.42, index * 0.28]}>
            <torusGeometry args={[1.7 + index * 0.18, 0.018, 8, 96]} />
            <meshBasicMaterial color={index === 1 ? "#ffd0e8" : "#91aef0"} transparent opacity={0.68} />
          </mesh>
        ))}
        <mesh position={[0, 1.85, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 1.1, 12]} />
          <meshBasicMaterial color="#ffd7c7" />
        </mesh>
        <mesh position={[0, 2.4, 0]}>
          <sphereGeometry args={[0.12, 20, 20]} />
          <meshBasicMaterial color="#fff1d2" />
        </mesh>
        <mesh position={[2.4, 1.35, 0]} scale={0.36}>
          <sphereGeometry args={[1, 28, 28]} />
          <meshStandardMaterial color="#667eb8" roughness={0.86} metalness={0.05} />
        </mesh>
        <mesh position={[2.4, 1.35, 0]} rotation={[0.35, 0.2, 0.2]}>
          <torusGeometry args={[0.52, 0.018, 8, 64]} />
          <meshBasicMaterial color="#ffafd7" transparent opacity={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

export default function ThreeHero() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 37 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.84} />
      <pointLight position={[3, 4, 4]} intensity={16} color="#ffb5d4" />
      <pointLight position={[-4, -2, 3]} intensity={10} color="#8daeff" />
      <Stars radius={45} depth={25} count={750} factor={2} saturation={0.1} fade speed={0.28} />
      <OrbitalProbe />
    </Canvas>
  );
}
