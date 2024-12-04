import { create } from 'zustand';
import type { CelestialObject, StarSystem } from '../types/celestial';

interface UniverseState {
  selectedObject: CelestialObject | null;
  currentSystem: StarSystem | null;
  zoomLevel: number;
  cameraPosition: [number, number, number];
  setSelectedObject: (object: CelestialObject | null) => void;
  setCurrentSystem: (system: StarSystem | null) => void;
  setZoomLevel: (level: number) => void;
  setCameraPosition: (position: [number, number, number]) => void;
}

export const useUniverseStore = create<UniverseState>((set) => ({
  selectedObject: null,
  currentSystem: null,
  zoomLevel: 1,
  cameraPosition: [0, 0, 100],
  setSelectedObject: (object) => set({ selectedObject: object }),
  setCurrentSystem: (system) => set({ currentSystem: system }),
  setZoomLevel: (level) => set({ zoomLevel: level }),
  setCameraPosition: (position) => set({ cameraPosition: position }),
}));