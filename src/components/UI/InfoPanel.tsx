import React from 'react';
import { X } from 'lucide-react';
import { useUniverseStore } from '../../store/universeStore';

export default function InfoPanel() {
  const { selectedObject, setSelectedObject } = useUniverseStore();

  if (!selectedObject) return null;

  return (
    <div className="fixed top-8 right-8 w-80 bg-gray-800/90 text-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{selectedObject.name}</h2>
        <button
          onClick={() => setSelectedObject(null)}
          className="p-1 hover:bg-gray-700/50 rounded-full"
        >
          <X size={20} />
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-gray-300">{selectedObject.description}</p>
        {selectedObject.type === 'star' && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Star Properties</h3>
            <p className="text-sm text-gray-300">Type: {selectedObject.type}</p>
            <p className="text-sm text-gray-300">Scale: {selectedObject.scale}x</p>
          </div>
        )}
      </div>
    </div>
  );
}