import './App.css';

import React from 'react';
import { Box } from './Utilities';
import { Canvas } from '@react-three/fiber';

function FlightVisualizationApp() {
  return (
    <div className="App">
      <React.Suspense fallback={<div>Loading data...ð</div>}>
        <Canvas id="canvas">
          <Box />
        </Canvas>
      </React.Suspense>
    </div>
  );
}

export default FlightVisualizationApp;
