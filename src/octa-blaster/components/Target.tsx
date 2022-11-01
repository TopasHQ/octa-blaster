import { animated, useSpring } from '@react-spring/three';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { Interactive, XRInteractionEvent } from '@react-three/xr';
import { getRandomElementFromArray, getRandomNumberBetweenRange } from '@topashq/toolkit';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { Group, MeshStandardMaterial, OctahedronGeometry, PointLight, Vector3 } from 'three';
import useSound from 'use-sound';

import targetHitSound from '../assets/audio/target-hit.mp3';

const HANG_TIME = 3;
const LIGHT_INTENSITY = 1;
const X_POS_RANGE = [-2, 2];
const Y_POS_RANGE = [-0.3, 0.6];
const Z_POS_RANGE = [-0.5, -1.75];

type Props = {
  onTargetHit: () => void;
  clearTarget: (id: string) => void;
  id: string;
};

const colors: string[] = [
  'Aqua', //
  'LawnGreen',
  'Magenta',
  'Red',
  'Lavender',
  'Pink',
];

const Target = ({ onTargetHit, clearTarget, id }: Props): ReactElement => {
  const [color] = useState(getRandomElementFromArray(colors));
  const [xPos] = useState(getRandomNumberBetweenRange(X_POS_RANGE[0], X_POS_RANGE[1]));
  const [yPos] = useState(getRandomNumberBetweenRange(Y_POS_RANGE[0], Y_POS_RANGE[1]));
  const [zPos] = useState(getRandomNumberBetweenRange(Z_POS_RANGE[0], Z_POS_RANGE[1]));

  const [active, setActive] = useState(false);
  const [targetIsHit, setTargetIsHit] = useState(false);

  const [playTargetHit] = useSound(targetHitSound);

  const pointLightRef = useRef<PointLight>(null);
  const groupRef = useRef<Group>(null);
  const targetRef = useRef<OctahedronGeometry>(null);
  const meshRef = useRef<MeshStandardMaterial>(null);

  const { position } = useSpring<{ position: Vector3 }>({
    position: active ? [xPos, yPos, zPos] : [xPos, -1, zPos],
  });

  useEffect(() => {
    setActive(true);

    setTimeout(() => {
      !targetIsHit && deActivateTarget();
    }, HANG_TIME * 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deActivateTarget = () => {
    setActive(false);
    setTimeout(() => {
      clearTarget(id);
    }, 200);
  };

  const handleTargetHit = (e: ThreeEvent<MouseEvent> | XRInteractionEvent) => {
    if (targetIsHit) {
      return;
    }

    // Small delay to simulate bullet travel time (on-hit sound is later than gun-trigger sound)
    setTimeout(() => {
      playTargetHit();
    }, 100);

    onTargetHit();
    setTargetIsHit(true);
    deActivateTarget();
  };

  useFrame((_, dt) => {
    if (targetRef.current) {
      targetRef.current.rotateY(dt * 2);
    }

    const fadeSpeed = 2;

    if (pointLightRef.current) {
      if (!targetIsHit && pointLightRef.current.intensity < LIGHT_INTENSITY) {
        pointLightRef.current.intensity += dt * fadeSpeed;
      }

      if (targetIsHit && pointLightRef.current.intensity > 0) {
        pointLightRef.current.intensity -= dt * fadeSpeed;
      }
    }
  });

  return (
    <animated.group scale={0.3} position={position} key={id} ref={groupRef} onClick={handleTargetHit}>
      {/* <pointLight color={color} ref={pointLightRef} intensity={0} /> */}
      <Interactive onSelect={handleTargetHit}>
        <mesh>
          <octahedronBufferGeometry attach="geometry" args={[0.5, 0]} ref={targetRef} />
          <meshStandardMaterial attach="material" color={color} opacity={1} ref={meshRef} />
        </mesh>
      </Interactive>
    </animated.group>
  );
};

export default Target;
