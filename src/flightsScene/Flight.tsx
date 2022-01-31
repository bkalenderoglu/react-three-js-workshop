import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group, Quaternion, Vector3 } from 'three';
import { EARTH_SURFACE_HEIGHT, FLOAT_HEIGHT, GLOBE_BASE_RADIUS, GLOBE_SCALE, LEFT, PLANE_SCALE } from '../constants';
import Plane from '../models/Plane';
import { IAirport } from '../types';
import { getRotationForDirection, rotationQuaternionForCoordinates } from '../Utilities';

export default function Flight({ from, to }: { from: IAirport; to: IAirport }) {
  const rotationBoxRef = useRef<Group>();
  const flightContainerRef = useRef<Group>();

  const fromQuaternion = rotationQuaternionForCoordinates(from.latitude, from.latitude);
  const toQuaternion = rotationQuaternionForCoordinates(to.latitude, to.longitude);

  useFrame((state, delta) => {
    const phase = (state.clock.elapsedTime % 5) / 5;

    if (flightContainerRef.current && rotationBoxRef.current) {
      const q = new Quaternion();
      q.slerpQuaternions(fromQuaternion, toQuaternion, phase);

      const worldPositionBefore = new Vector3();
      flightContainerRef.current?.getWorldPosition(worldPositionBefore);

      rotationBoxRef.current?.setRotationFromQuaternion(q);

      flightContainerRef.current?.lookAt(worldPositionBefore);
      flightContainerRef.current.rotation.z = getRotationForDirection(from, to);
    }
  });

  return (
    <group ref={rotationBoxRef}>
      <group ref={flightContainerRef} position-y={GLOBE_BASE_RADIUS * GLOBE_SCALE + FLOAT_HEIGHT}>
        <Plane scale={PLANE_SCALE} />
      </group>
    </group>
  );
}
