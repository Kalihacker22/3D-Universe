import React from 'react';
import Scene from './components/Scene';
import Controls from './components/UI/Controls';
import InfoPanel from './components/UI/InfoPanel';

function App() {
  return (
    <div className="w-full h-screen relative">
      <Scene />
      <Controls />
      <InfoPanel />
      <div className="absolute top-8 left-8 text-white">
        <h1 className="text-2xl font-bold">Space Explorer</h1>
        <p className="text-gray-300">Navigate the cosmos</p>
      </div>
    </div>
  );
}

export default App;