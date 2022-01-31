import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group, Quaternion } from 'three';
import { EARTH_SURFACE_HEIGHT, FLOAT_HEIGHT, LEFT, PLANE_SCALE } from '../constants';
import Plane from '../models/Plane';

export default function Flight() {
  const rotationGroup = useRef<Group>();

  useFrame((state, delta) => {
    // cycle of 4secs
    const phase = (state.clock.elapsedTime % 4) / 4;

    const q = new Quaternion();

    if (rotationGroup.current) {
      q.setFromAxisAngle(LEFT, phase * Math.PI * 2);
      rotationGroup.current?.setRotationFromQuaternion(q);
      // rotationGroup.current.rotateOnAxis(LEFT, 0.1);
    }
  });

  return (
    <group ref={rotationGroup}>
      <group position-y={EARTH_SURFACE_HEIGHT + FLOAT_HEIGHT}>
        <Plane scale={PLANE_SCALE} />
      </group>
    </group>
  );
}
