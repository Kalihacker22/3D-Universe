import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '../../constants/colors';

export default function GalaxyCore() {
  const coreRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.z += delta * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.rotation.z -= delta * 0.05;
    }
  });

  return (
    <group ref={coreRef}>
      {/* Central core */}
      <mesh>
        <sphereGeometry args={[8, 64, 64]} />
        <meshStandardMaterial
          color={COLORS.space.core}
          emissive={COLORS.space.core}
          emissiveIntensity={1}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[12, 64, 64]} />
        <meshStandardMaterial
          color={COLORS.space.core}
          emissive={COLORS.space.core}
          emissiveIntensity={0.5}
          transparent
          opacity={0.2}
        />
      </mesh>
      
      {/* Outer halo */}
      <mesh>
        <sphereGeometry args={[15, 64, 64]} />
        <meshStandardMaterial
          color={COLORS.stars.yellow}
          emissive={COLORS.stars.yellow}
          emissiveIntensity={0.2}
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}