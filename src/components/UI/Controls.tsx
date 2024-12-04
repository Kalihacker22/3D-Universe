import React from 'react';
import { ZoomIn, ZoomOut, Search, Info, Home } from 'lucide-react';
import { useUniverseStore } from '../../store/universeStore';

export default function Controls() {
  const { zoomLevel, setZoomLevel, setSelectedObject, setCurrentSystem, setCameraPosition } = useUniverseStore();

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 10, 100));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 10, 1));
    if (zoomLevel - 10 <= 20) {
      setSelectedObject(null);
      setCurrentSystem(null);
      setCameraPosition([0, 0, 100]);
    }
  };

  const handleReset = () => {
    setZoomLevel(1);
    setSelectedObject(null);
    setCurrentSystem(null);
    setCameraPosition([0, 0, 100]);
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4">
      <button
        className="p-2 bg-gray-800/80 text-white rounded-full hover:bg-gray-700/80 transition-colors"
        onClick={handleZoomIn}
      >
        <ZoomIn size={24} />
      </button>
      <button
        className="p-2 bg-gray-800/80 text-white rounded-full hover:bg-gray-700/80 transition-colors"
        onClick={handleZoomOut}
      >
        <ZoomOut size={24} />
      </button>
      <button
        className="p-2 bg-gray-800/80 text-white rounded-full hover:bg-gray-700/80 transition-colors"
        onClick={handleReset}
      >
        <Home size={24} />
      </button>
      <button
        className="p-2 bg-gray-800/80 text-white rounded-full hover:bg-gray-700/80 transition-colors"
      >
        <Search size={24} />
      </button>
      <button
        className="p-2 bg-gray-800/80 text-white rounded-full hover:bg-gray-700/80 transition-colors"
      >
        <Info size={24} />
      </button>
    </div>
  );
}