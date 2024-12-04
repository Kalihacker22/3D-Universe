import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { CelestialObject } from '../../types/celestial';
import { useUniverseStore } from '../../store/universeStore';
import { starSystems } from '../../data/starSystems';

interface StarProps {
  star: CelestialObject;
  showLabel?: boolean;
}

export default function Star({ star, showLabel = true }: StarProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { setSelectedObject, setZoomLevel, setCameraPosition, setCurrentSystem } = useUniverseStore();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  const handleClick = () => {
    setSelectedObject(star);
    setZoomLevel(20);
    setCameraPosition([star.position[0], star.position[1], star.position[2] + 20]);
    
    const systemId = star.id.split('-')[1];
    const system = starSystems.find(s => s.id === `system-${systemId}`);
    if (system) {
      setCurrentSystem(system);
    }
  };

  return (
    <group position={star.position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
          setHovered(true);
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
          setHovered(false);
        }}
      >
        <sphereGeometry args={[star.scale, 32, 32]} />
        <meshStandardMaterial
          color={star.color || '#FDB813'}
          emissive={star.color || '#FDB813'}
          emissiveIntensity={hovered ? 0.8 : 0.5}
        />
      </mesh>
      {showLabel && (
        <Billboard
          follow={true}
          lockX={false}
          lockY={false}
          lockZ={false}
        >
          <Html
            center
            distanceFactor={15}
            occlude={true}
            className={`transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-70'}`}
          >
            <div className="pointer-events-none transform -translate-x-1/2">
              <div className="flex flex-col items-center space-y-1">
                <div className="px-2 py-1 rounded bg-black/80 text-white text-sm whitespace-nowrap">
                  {star.name}
                </div>
                {hovered && (
                  <div className="px-2 py-1 rounded bg-black/80 text-white text-xs whitespace-nowrap">
                    {star.type === 'star' && `Type: ${star.name.split('-')[0]}`}
                  </div>
                )}
              </div>
            </div>
          </Html>
        </Billboard>
      )}
      {/* Glow effect */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[star.scale, 32, 32]} />
        <meshBasicMaterial
          color={star.color || '#FDB813'}
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}