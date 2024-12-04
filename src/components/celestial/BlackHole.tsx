import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { CelestialObject } from '../../types/celestial';
import { useUniverseStore } from '../../store/universeStore';

interface BlackHoleProps {
  blackhole: CelestialObject;
  showLabel?: boolean;
}

export default function BlackHole({ blackhole, showLabel = true }: BlackHoleProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { setSelectedObject } = useUniverseStore();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group position={blackhole.position}>
      <group ref={groupRef}>
        <mesh
          onClick={() => setSelectedObject(blackhole)}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer';
            setHovered(true);
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default';
            setHovered(false);
          }}
        >
          <sphereGeometry args={[blackhole.scale, 32, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        {/* Accretion disk */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[blackhole.scale * 2, blackhole.scale / 4, 16, 100]} />
          <meshStandardMaterial
            color="#FF4444"
            emissive="#FF0000"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>
      {showLabel && (
        <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
          <Html
            center
            distanceFactor={25}
            occlude={true}
            className={`transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-70'}`}
          >
            <div className="pointer-events-none transform -translate-x-1/2">
              <div className="px-2 py-1 rounded bg-black/80 text-white text-sm whitespace-nowrap">
                {blackhole.name}
              </div>
              {hovered && (
                <div className="px-2 py-1 mt-1 rounded bg-black/80 text-white text-xs whitespace-nowrap">
                  {blackhole.description}
                </div>
              )}
            </div>
          </Html>
        </Billboard>
      )}
      {/* Event horizon glow */}
      <mesh>
        <sphereGeometry args={[blackhole.scale * 1.2, 32, 32]} />
        <meshBasicMaterial
          color="#330000"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}