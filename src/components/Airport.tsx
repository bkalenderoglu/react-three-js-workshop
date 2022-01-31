import { Html } from '@react-three/drei';
import { useRef, useState } from 'react';
import { Group } from 'three';
import { EARTH_SURFACE_HEIGHT } from '../constants';
import { IAirport } from '../types';
import { Box, rotationQuaternionForCoordinates } from '../Utilities';

export default function Airport({ airport }: { airport: IAirport }) {
  const rotationBoxRef = useRef<Group>();
  const [isHovered, setHovered] = useState(false);

  if (rotationBoxRef.current) {
    const q = rotationQuaternionForCoordinates(airport.latitude, airport.longitude);
    rotationBoxRef.current?.setRotationFromQuaternion(q);
  }

  return (
    <group ref={rotationBoxRef}>
      <group position={[0, EARTH_SURFACE_HEIGHT, 0]}>
        <Box
          onPointerOut={() => setHovered(false)}
          onPointerOver={() => setHovered(true)}
          size={[0.1, 0.1, 0.1]}
          color={!isHovered ? 'hotorange' : 'blue'}
        />
        {isHovered && <pointLight position-y={0.1} intensity={0.5} color={'red'} />}
        {isHovered && (
          <Html>
            <div className="info-bubble">{airport.city}</div>
          </Html>
        )}
      </group>
    </group>
  );
}
