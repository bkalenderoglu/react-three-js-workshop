import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { PointLight } from 'three';
import { setInterval } from 'timers';
import Globe from '../models/Globe';
import Plane from '../models/Plane';

export default function FlightsScene() {
  const [intensity, setIntensity] = useState<number>(0);
  const lightRef = useRef<PointLight>();

  return (
    <>
      <OrbitControls />
      <pointLight intensity={2} position={[2, 2, 2]} />
      <Globe />
      <Plane />
    </>
  );
}
