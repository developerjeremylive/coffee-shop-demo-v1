import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

function CoffeeParticles({ scrollY }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const count = 600;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const warmColors = [
      [0.55, 0.27, 0.07],
      [0.72, 0.45, 0.20],
      [0.85, 0.65, 0.35],
      [0.40, 0.20, 0.10],
      [0.90, 0.75, 0.50],
      [0.65, 0.35, 0.15],
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;

      const color = warmColors[Math.floor(Math.random() * warmColors.length)];
      colors[i * 3] = color[0];
      colors[i * 3 + 1] = color[1];
      colors[i * 3 + 2] = color[2];
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const scrollOffset = scrollY * 0.001;

    meshRef.current.rotation.y = time * 0.03 + scrollOffset * 0.2;
    meshRef.current.rotation.x = Math.sin(time * 0.02) * 0.05 + scrollOffset * 0.05;
    meshRef.current.position.y = -scrollOffset * 1.5;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingRings({ scrollY }: ParticleFieldProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const scrollOffset = scrollY * 0.0008;

    groupRef.current.rotation.z = time * 0.015 + scrollOffset * 0.3;
    groupRef.current.rotation.y = scrollOffset * 0.2;
    groupRef.current.position.y = Math.sin(time * 0.15) * 0.3 - scrollOffset * 0.8;

    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      mesh.rotation.x = time * (0.08 + i * 0.015);
      mesh.rotation.z = time * (0.04 + i * 0.008);
    });
  });

  const rings = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      radius: 2.5 + i * 0.9,
      tube: 0.015 + Math.random() * 0.015,
      color: new THREE.Color().setHSL(0.07 + i * 0.02, 0.5, 0.35 + i * 0.04),
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, i * 0.5, 0]}>
          <torusGeometry args={[ring.radius, ring.tube, 16, 100]} />
          <meshStandardMaterial
            color={ring.color}
            transparent
            opacity={0.25}
            emissive={ring.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeBackground({ scrollY }: { scrollY: number }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.4} color="#d4a574" />
        <pointLight position={[-10, -10, 5]} intensity={0.2} color="#8B4513" />
        <CoffeeParticles scrollY={scrollY} />
        <FloatingRings scrollY={scrollY} />
      </Canvas>
    </div>
  );
}
