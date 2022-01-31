import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { PointLight } from 'three';
import Globe from '../models/Globe';
import Flight from './Flight';

export default function FlightsScene() {
  const [intensity, setIntensity] = useState<number>(0);
  const lightRef = useRef<PointLight>();

  useFrame((state) => {
    const phase = (state.clock.elapsedTime % 3) / 3;
    const phaseRadians = Math.PI * 2 * phase;

    if (lightRef.current) {
      const x = Math.sin(phaseRadians) * 10;
      const z = Math.cos(phaseRadians) * 10;
      lightRef.current.position.set(x, 0, z);
    }
  });

  return (
    <>
      <OrbitControls />
      <pointLight ref={lightRef} intensity={0.5} position={[2, 2, 2]} />
      <Globe />
      <Flight />
    </>
  );
}
