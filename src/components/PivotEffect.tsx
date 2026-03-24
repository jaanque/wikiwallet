"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// Suppress THREE.Clock noise
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0]?.includes?.("THREE.Clock: This module has been deprecated")) return;
    originalWarn(...args);
  };
}

function LiquidMasterpiece() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { mouse, viewport } = useThree();

  useEffect(() => {
    gsap.from(meshRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2.5,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  useFrame(() => {
    const now = performance.now() / 1000;
    
    // Magnetic inertia-based mouse follow
    const targetX = (mouse.x * viewport.width) / 5;
    const targetY = (mouse.y * viewport.height) / 5;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.07);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.07);
    
    // Complex organic rotation
    meshRef.current.rotation.x = now * 0.3 + mouse.y * 1.5;
    meshRef.current.rotation.y = now * 0.4 + mouse.x * 1.5;
    
    // Vertex-level "Pulse" & "Wobble" simulation via scale oscillation
    const wobble = Math.sin(now * 2) * 0.1;
    meshRef.current.scale.set(1.8 + wobble, 1.8 - wobble, 1.8 + wobble);
  });

  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          resolution={512}
          thickness={1.5}
          roughness={0.05}
          chromaticAberration={0.3} // Aggressive iridescent aberration
          anisotropy={1}
          distortion={1.2} // High distortion for organic glass look
          distortionScale={0.1} // Fine-grained noise
          temporalDistortion={0.4}
          clearcoat={1}
          attenuationDistance={1}
          attenuationColor="#6366f1"
          color="#ffffff"
          transmission={1}
        />
      </mesh>
    </Float>
  );
}

export default function PivotEffect() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out scale-110 group-hover:scale-125">
      <Canvas 
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 40 }} 
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          depth: true,
          stencil: false
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#6366f1" />
        <LiquidMasterpiece />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
