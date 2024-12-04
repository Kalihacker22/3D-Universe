import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useUniverseStore } from '../../store/universeStore';
import Star from './Star';
import Planet from './Planet';
import { starSystems, celestialObjects } from '../../data/starSystems';
import Nebula from './Nebula';
import BlackHole from './BlackHole';

export default function StarSystem() {
  const groupRef = useRef<THREE.Group>(null);
  const { currentSystem, selectedObject, zoomLevel } = useUniverseStore();

  // If no system is selected, show all celestial objects
  if (!currentSystem) {
    return (
      <group>
        {celestialObjects.map((object) => {
          switch (object.type) {
            case 'star':
              return (
                <Star
                  key={object.id}
                  star={object}
                  showLabel={zoomLevel < 50}
                />
              );
            case 'nebula':
              return (
                <Nebula
                  key={object.id}
                  nebula={object}
                  showLabel={zoomLevel < 50}
                />
              );
            case 'blackhole':
              return (
                <BlackHole
                  key={object.id}
                  blackhole={object}
                  showLabel={zoomLevel < 50}
                />
              );
            default:
              return null;
          }
        })}
      </group>
    );
  }

  // Show detailed view of selected system
  return (
    <group ref={groupRef} position={currentSystem.position}>
      {currentSystem.stars.map((star) => (
        <Star key={star.id} star={star} />
      ))}
      {currentSystem.planets.map((planet) => (
        <Planet key={planet.id} planet={planet} />
      ))}
    </group>
  );
}