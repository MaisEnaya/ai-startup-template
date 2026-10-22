"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Line, PerformanceMonitor } from "@react-three/drei";
import { useRef, useState } from "react";
import type { MotionValue } from "motion/react";
import * as THREE from "three";

function IntelligenceCore({ progress, reduced }: { progress: MotionValue<number>; reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const pieces = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!root.current || !pieces.current) return;
    const value = progress.get();
    const targetRotation = value > 0.35 ? 0.68 : -0.2;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, targetRotation + (reduced ? 0 : state.pointer.x * 0.12), 2.4, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, reduced ? -0.12 : state.pointer.y * 0.1 - 0.12, 2, delta);
    const spread = value > 0.24 && value < 0.78 ? 0.12 : 0;
    pieces.current.children.forEach((part, index) => {
      const angle = (index / 6) * Math.PI * 2;
      const target = spread * (0.45 + Math.cos(angle * 2) * 0.15);
      part.position.x = THREE.MathUtils.damp(part.position.x, Math.cos(angle) * target, 3, delta);
      part.position.y = THREE.MathUtils.damp(part.position.y, Math.sin(angle) * target, 3, delta);
    });
  });
  const colors = ["#dfe8f2", "#2586ff", "#c5d1df", "#1264cc", "#e5edf5", "#2679e5"];
  return (
    <group ref={root} rotation={[0.2, -0.3, -0.24]}>
      <group ref={pieces}>
        {colors.map((color, index) => (
          <mesh key={index} position={[0, 0, (index % 2 ? -1 : 1) * 0.045]} rotation={[0, 0, (index / colors.length) * Math.PI * 2]}>
            <torusGeometry args={[1.08, 0.17, 20, 64, Math.PI / 3.35]} />
            <meshStandardMaterial color={color} metalness={0.58} roughness={0.32} emissive={color} emissiveIntensity={color === "#2586ff" || color === "#1264cc" ? 0.11 : 0.018} />
          </mesh>
        ))}
      </group>
      <mesh>
        <sphereGeometry args={[0.47, 48, 48]} />
        <meshPhysicalMaterial color="#287fff" metalness={0.52} roughness={0.2} clearcoat={0.8} clearcoatRoughness={0.16} emissive="#06438f" emissiveIntensity={0.45} />
      </mesh>
      <mesh position={[-0.12, 0.17, 0.36]}>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshBasicMaterial color="#dff5ff" />
      </mesh>
      {[
        [-1.75, 1.12, -0.3], [1.78, 1.05, 0.1], [1.87, -1.02, -0.15], [-1.76, -1.04, 0.18],
      ].map((position, index) => (
        <group key={index}>
          <Line points={[[0, 0, 0], position as [number, number, number]]} color="#6db6ff" transparent opacity={0.48} lineWidth={1} />
          <Float speed={reduced ? 0 : 1} floatIntensity={reduced ? 0 : 0.16} rotationIntensity={0}>
            <mesh position={position as [number, number, number]}>
              <sphereGeometry args={[0.105, 24, 24]} />
              <meshStandardMaterial color={index % 2 ? "#a9d8ff" : "#f3f7fc"} metalness={0.62} roughness={0.22} emissive="#1c70ce" emissiveIntensity={0.15} />
            </mesh>
          </Float>
        </group>
      ))}
    </group>
  );
}

export default function CoreScene({ progress, reduced }: { progress: MotionValue<number>; reduced: boolean }) {
  const [dpr, setDpr] = useState(1.15);
  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 5.6], fov: 35 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power", failIfMajorPerformanceCaveat: true }}
      onCreated={({ gl }) => {
        gl.setClearColor("#000000", 0);
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
      }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 4, 6]} intensity={3} color="#edf7ff" />
      <pointLight position={[-4, 0, 3]} intensity={10} color="#338dff" distance={8} />
      <pointLight position={[2, -3, -3]} intensity={7} color="#b6d9ff" distance={7} />
      <Environment preset="city" environmentIntensity={0.62} />
      <Float speed={reduced ? 0 : 0.55} floatIntensity={reduced ? 0 : 0.11} rotationIntensity={0}>
        <IntelligenceCore progress={progress} reduced={reduced} />
      </Float>
      <PerformanceMonitor
        flipflops={2}
        bounds={() => [35, 58]}
        onDecline={() => setDpr(0.8)}
        onIncline={() => setDpr(1.15)}
        onFallback={() => setDpr(0.7)}
      />
    </Canvas>
  );
}
