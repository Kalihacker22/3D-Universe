import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import GalaxyCore from './GalaxyCore';
import GalaxyArms from './GalaxyArms';

export default function Galaxy() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <GalaxyCore />
      <GalaxyArms />
    </group>
  );
}