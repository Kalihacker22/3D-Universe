import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useUniverseStore } from '../store/universeStore';
import Galaxy from './celestial/Galaxy';
import StarSystem from './celestial/StarSystem';
import { COLORS } from '../constants/colors';

export default function Scene() {
  const { zoomLevel } = useUniverseStore();

  return (
    <Canvas
      camera={{ position: [0, 0, 100], fov: 75 }}
      style={{ background: COLORS.space.background }}
    >
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        zoomSpeed={0.6}
        panSpeed={0.5}
        rotateSpeed={0.4}
      />
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={1} />
      <Stars radius={300} depth={50} count={5000} factor={4} />
      {zoomLevel > 50 ? <Galaxy /> : <StarSystem />}
    </Canvas>
  );
}