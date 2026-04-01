"use client";

import React, { useRef, Suspense } from "react";
import { useFrame, Canvas } from "@react-three/fiber";
import {
  Float,
  MeshWobbleMaterial,
  Stars,
  Sparkles,
  Environment,
  ContactShadows,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";

/* =========================
   🔩 BEYBLADE MODEL
========================= */
export function Beyblade3D({ isHovered = false }: { isHovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Rotation
    const speed = isHovered ? 15 : 4;
    groupRef.current.rotation.y += delta * speed;

    // Glow pulse
    if (
      coreRef.current &&
      coreRef.current.material instanceof THREE.MeshStandardMaterial
    ) {
      const pulse =
        Math.sin(state.clock.elapsedTime * (isHovered ? 10 : 3)) * 0.5 + 0.5;

      coreRef.current.material.emissiveIntensity = isHovered
        ? 2 + pulse
        : 0.5 + pulse * 0.5;
    }
  });

  return (
    <group ref={groupRef} scale={1.5}>
      {/* Core */}
      <mesh ref={coreRef}>
        <cylinderGeometry args={[1, 1.2, 0.4, 32]} />
        <meshStandardMaterial
          color="#111"
          metalness={0.9}
          roughness={0.1}
          emissive="#facc15"
        />
      </mesh>

      {/* Inner Ring */}
      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[0.8, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#facc15"
          emissive="#facc15"
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Blades */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <mesh
          key={i}
          rotation={[0, (angle * Math.PI) / 180, 0]}
          position={[
            1.1 * Math.cos((angle * Math.PI) / 180),
            0,
            1.1 * Math.sin((angle * Math.PI) / 180),
          ]}
        >
          <boxGeometry args={[0.3, 0.25, 0.7]} />
          <meshStandardMaterial
            color="#444"
            metalness={1}
            roughness={0.05}
          />
        </mesh>
      ))}

      {/* Energy Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <torusGeometry args={[2.0, 0.03, 16, 120]} />
        <MeshWobbleMaterial
          color="#facc15"
          factor={0.6}
          speed={4}
          transparent
          opacity={0.4}
          emissive="#facc15"
          emissiveIntensity={isHovered ? 8 : 2}
        />
      </mesh>

      {/* Purple Accent */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={isHovered ? 5 : 1}
        />
      </mesh>

      {/* Tip */}
      <mesh position={[0, -0.4, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.3, 0.5, 32]} />
        <meshStandardMaterial
          color="#222"
          metalness={1}
          roughness={0.1}
        />
      </mesh>

      {/* Particles */}
      <Sparkles
        count={isHovered ? 100 : 40}
        scale={4}
        size={2}
        speed={1}
        color="#facc15"
        opacity={isHovered ? 0.8 : 0.4}
      />
    </group>
  );
}

/* =========================
   🎬 SCENE (FIXED)
========================= */
export default function BeybladeScene({
  isHovered = false,
}: {
  isHovered?: boolean;
}) {
  return (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center">
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 4, 10]} fov={40} />
          
          {/* Stars Background */}
          <Stars radius={100} depth={50} count={500} factor={4} fade />

          {/* Lights */}
          <ambientLight intensity={0.4} />

          <spotLight
            position={[15, 20, 5]}
            angle={0.3}
            penumbra={1}
            intensity={800}
            color="#facc15"
            castShadow
          />

          <pointLight position={[-15, -10, -10]} intensity={200} color="#a855f7" />

          {/* Rim Lights */}
          <pointLight position={[0, 8, 0]} intensity={400} color="#fff" />
          <pointLight position={[0, -8, 0]} intensity={200} color="#facc15" />

          {/* Floating Beyblade */}
          <Float speed={3} rotationIntensity={0.8} floatIntensity={1.5}>
            <Beyblade3D isHovered={isHovered} />
          </Float>

          {/* Shadow */}
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.4}
            scale={10}
            blur={2.5}
            far={3}
            color="#000"
          />

          {/* Environment */}
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}