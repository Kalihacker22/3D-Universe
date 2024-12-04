import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { generateGalaxyParticles, generateNebulae } from '../../utils/procedural';

export default function GalaxyArms() {
  const particlesRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const nebulaeRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    // Generate more stars for a denser galaxy
    starsRef.current = generateGalaxyParticles(150000);
    nebulaeRef.current = generateNebulae(2000);

    if (particlesRef.current) {
      particlesRef.current.add(starsRef.current);
      particlesRef.current.add(nebulaeRef.current);
    }

    return () => {
      if (starsRef.current) {
        starsRef.current.geometry.dispose();
        (starsRef.current.material as THREE.Material).dispose();
      }
      if (nebulaeRef.current) {
        nebulaeRef.current.geometry.dispose();
        (nebulaeRef.current.material as THREE.Material).dispose();
      }
    };
  }, []);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.03;
    }
  });

  return <group ref={particlesRef} />;
}