import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { CelestialObject } from '../../types/celestial';
import { useUniverseStore } from '../../store/universeStore';

interface NebulaProps {
  nebula: CelestialObject;
  showLabel?: boolean;
}

export default function Nebula({ nebula, showLabel = true }: NebulaProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { setSelectedObject } = useUniverseStore();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group position={nebula.position}>
      <mesh
        ref={meshRef}
        onClick={() => setSelectedObject(nebula)}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
          setHovered(true);
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
          setHovered(false);
        }}
      >
        <sphereGeometry args={[nebula.scale, 32, 32]} />
        <meshStandardMaterial
          color={nebula.color}
          emissive={nebula.color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>
      {showLabel && (
        <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
          <Html
            center
            distanceFactor={20}
            occlude={true}
            className={`transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-70'}`}
          >
            <div className="pointer-events-none transform -translate-x-1/2">
              <div className="px-2 py-1 rounded bg-black/80 text-white text-sm whitespace-nowrap">
                {nebula.name}
              </div>
              {hovered && (
                <div className="px-2 py-1 mt-1 rounded bg-black/80 text-white text-xs whitespace-nowrap">
                  {nebula.description}
                </div>
              )}
            </div>
          </Html>
        </Billboard>
      )}
      {/* Nebula glow effect */}
      <mesh scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[nebula.scale, 32, 32]} />
        <meshBasicMaterial
          color={nebula.color}
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}