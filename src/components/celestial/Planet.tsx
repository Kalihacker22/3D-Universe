import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { CelestialObject } from '../../types/celestial';

interface PlanetProps {
  planet: CelestialObject;
  showLabel?: boolean;
}

export default function Planet({ planet, showLabel = true }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current && planet.orbit) {
      // Rotate planet around its axis
      meshRef.current.rotation.y += delta * 0.5;
      
      // Orbit around parent star
      if (orbitRef.current) {
        orbitRef.current.rotation.y += delta * (0.1 / planet.orbit.period);
      }
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh
        ref={meshRef}
        position={[planet.orbit?.semiMajorAxis || 0, 0, 0]}
      >
        <sphereGeometry args={[planet.scale, 32, 32]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
      {showLabel && (
        <Html position={[planet.orbit?.semiMajorAxis || 0, planet.scale + 1, 0]}>
          <div className="text-white text-sm bg-black/50 px-2 py-1 rounded">
            {planet.name}
          </div>
        </Html>
      )}
    </group>
  );
}