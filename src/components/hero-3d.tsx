"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text3D, Center, Environment, PerspectiveCamera, Stars } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

/** Floating Android robot head (simplified geometric representation) */
function AndroidHead({ position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Head base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 2.2, 1.6]} />
        <meshStandardMaterial color="#00ff9d" metalness={0.8} roughness={0.2} emissive="#00ff9d" emissiveIntensity={0.3} />
      </mesh>
      {/* Antenna left */}
      <mesh position={[-0.6, 1.4, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.5]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} roughness={0.1} emissive="#00f0ff" emissiveIntensity={0.5} />
      </mesh>
      {/* Antenna right */}
      <mesh position={[0.6, 1.4, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.5]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} roughness={0.1} emissive="#00f0ff" emissiveIntensity={0.5} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.4, 0.2, 0.7]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#0a0a0f" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.4, 0.2, 0.7]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#0a0a0f" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Eye glow */}
      <mesh position={[-0.4, 0.2, 0.78]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0.4, 0.2, 0.78]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

/** Rotating neon rings around the hero */
function NeonRings() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const ringColors = ["#00f0ff", "#ff00e6", "#bd00ff", "#00ff9d"];
  
  return (
    <group ref={groupRef}>
      {ringColors.map((color, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.2, 0, 0]}>
          <torusGeometry args={[2.5 + i * 0.6, 0.02 + i * 0.01, 16, 100]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.7 - i * 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Floating code particles */
function CodeParticles({ count = 150 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const positions = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 12,
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 0.5) * 6,
      speed: 0.2 + Math.random() * 0.3,
      char: ["{", "}", "K", "∞", "→", "◈", "⟨", "⟩", "//", "val", "fun"][Math.floor(Math.random() * 10)],
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    positions.forEach((pos, i) => {
      pos.y += pos.speed * 0.02;
      if (pos.y > 4) pos.y = -4;
      dummy.position.set(pos.x, pos.y, pos.z);
      dummy.rotation.set(0, state.clock.elapsedTime * pos.speed, 0);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.15, 0.15, 0.15]} />
      <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.6} metalness={0.8} roughness={0.2} />
    </instancedMesh>
  );
}

/** Floating Kotlin/Android icons */
function FloatingIcons() {
  const icons = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    position: [Math.cos(i * Math.PI / 4) * 4, Math.sin(i * Math.PI / 4) * 2, (Math.random() - 0.5) * 3] as [number, number, number],
    color: ["#00f0ff", "#ff00e6", "#bd00ff", "#00ff9d", "#ffea00"][i % 5],
    scale: 0.3 + Math.random() * 0.2,
  })), []);

  return (
    <>
      {icons.map((icon, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
          <mesh position={icon.position} scale={icon.scale}>
            <octahedronGeometry args={[0.4]} />
            <meshStandardMaterial 
              color={icon.color} 
              emissive={icon.color} 
              emissiveIntensity={0.8}
              metalness={0.9}
              roughness={0.1}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/** Main 3D Hero Scene */
export function HeroScene() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="neon-text-blue text-xl font-mono">INITIALIZING 3D ENGINE...</div>
      </div>
    );
  }

  return (
    <Canvas className="absolute inset-0" gl={{ antialias: true, alpha: true }}>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={55} />
      <color attach="background" args={["#0a0a0f"]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ff00e6" />
      <spotLight position={[0, 10, 5]} intensity={0.8} color="#bd00ff" angle={0.4} penumbra={0.5} />
      
      {/* Environment */}
      <Environment preset="city" />
      <Stars radius={80} depth={40} count={3000} factor={3} saturation={0.8} fade speed={0.8} />
      
      {/* Main content */}
      <group position={[0, -0.5, 0]}>
        <AndroidHead position={[0, 0, 0]} />
        <NeonRings />
        <CodeParticles count={120} />
        <FloatingIcons />
      </group>
      
      {/* Post-processing glow effect via bloom would go here */}
    </Canvas>
  );
}

/** Mini 3D scene for cards */
export function MiniScene({ color = "#00f0ff" }: { color?: string }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return <div className="h-16 w-16" />;

  return (
    <Canvas className="h-16 w-16" gl={{ antialias: true, alpha: true }}>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={1} color={color} />
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <mesh>
          <icosahedronGeometry args={[0.8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} wireframe metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
    </Canvas>
  );
}
