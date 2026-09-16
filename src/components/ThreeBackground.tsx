import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

function CoffeeParticles({ scrollY }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const count = 800;

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const warmColors = [
      [0.55, 0.27, 0.07],  // coffee brown
      [0.72, 0.45, 0.20],  // light brown
      [0.85, 0.65, 0.35],  // caramel
      [0.40, 0.20, 0.10],  // dark roast
      [0.90, 0.75, 0.50],  // cream
      [0.65, 0.35, 0.15],  // mocha
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const color = warmColors[Math.floor(Math.random() * warmColors.length)];
      colors[i * 3] = color[0];
      colors[i * 3 + 1] = color[1];
      colors[i * 3 + 2] = color[2];

      sizes[i] = Math.random() * 3 + 1;
    }

    return [positions, colors, sizes];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const scrollOffset = scrollY * 0.002;

    meshRef.current.rotation.y = time * 0.05 + scrollOffset * 0.3;
    meshRef.current.rotation.x = Math.sin(time * 0.03) * 0.1 + scrollOffset * 0.1;
    meshRef.current.position.y = -scrollOffset * 2;

    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3 + 1] += Math.sin(time * 0.5 + i * 0.1) * 0.002;
      posArray[i3] += Math.cos(time * 0.3 + i * 0.05) * 0.001;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
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
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.7}
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
    const time = state.clock.getElapsedTime();
    const scrollOffset = scrollY * 0.001;

    groupRef.current.rotation.z = time * 0.02 + scrollOffset * 0.5;
    groupRef.current.rotation.y = scrollOffset * 0.3;
    groupRef.current.position.y = Math.sin(time * 0.2) * 0.5 - scrollOffset;

    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      mesh.rotation.x = time * (0.1 + i * 0.02);
      mesh.rotation.z = time * (0.05 + i * 0.01);
    });
  });

  const rings = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      radius: 2 + i * 0.8,
      tube: 0.02 + Math.random() * 0.02,
      color: new THREE.Color().setHSL(0.07 + i * 0.02, 0.6, 0.4 + i * 0.05),
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
            opacity={0.3}
            emissive={ring.color}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function SteamWaves({ scrollY }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const scrollOffset = scrollY * 0.001;

    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = time;
    material.uniforms.uScroll.value = scrollOffset;

    meshRef.current.position.y = -scrollOffset * 1.5;
  });

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform float uTime;
        uniform float uScroll;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          float elevation = sin(pos.x * 2.0 + uTime * 0.5) * 0.3 
                          + sin(pos.y * 1.5 + uTime * 0.3) * 0.2
                          + cos(pos.x * pos.y * 0.5 + uTime * 0.2) * 0.15;
          elevation += uScroll * 0.5;
          pos.z += elevation;
          vElevation = elevation;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vec3 warmColor1 = vec3(0.45, 0.22, 0.08);
          vec3 warmColor2 = vec3(0.75, 0.50, 0.25);
          vec3 color = mix(warmColor1, warmColor2, vElevation + 0.5);
          float alpha = 0.08 + vElevation * 0.05;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, 0, -3]}>
      <planeGeometry args={[20, 20, 64, 64]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
}

export default function ThreeBackground({ scrollY }: { scrollY: number }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#d4a574" />
        <pointLight position={[-10, -10, 5]} intensity={0.3} color="#8B4513" />
        <CoffeeParticles scrollY={scrollY} />
        <FloatingRings scrollY={scrollY} />
        <SteamWaves scrollY={scrollY} />
      </Canvas>
    </div>
  );
}
