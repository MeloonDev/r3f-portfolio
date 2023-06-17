import { ContactShadows, Environment, useScroll } from "@react-three/drei";
import { Leva, useControls } from "leva";
import { motion } from "framer-motion-3d";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../config";
import * as THREE from "three";
import { Avatar } from "./Avatar";

export const Experience = (props) => {
  const { menuOpened } = props;

  const characterContainer = useRef();
  const { viewport } = useThree();

  const data = useScroll();
  const [section, setSection] = useState(0);

  const [characterAnimation, setCharacterAnimation] = useState("Waving");
  const animations = ["Waving", "Idle", "Idle", "Idle"];
  useEffect(() => {
    setCharacterAnimation("Falling");
    setTimeout(() => {
      setCharacterAnimation(animations[section]);
    }, 600);
  }, [section]);
  // const { animation } = useControls({
  //   animation: {
  //     value: "Waving",
  //     options: ["Waving", "Idle", "Falling"],
  //   },
  // });

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -1 : 0, { ...framerMotionConfig });
    animate(cameraLookAtX, menuOpened ? 1 : 0, { ...framerMotionConfig });
  }, [menuOpened]);

  useFrame((state) => {
    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);

    let curSection = Math.floor(data.scroll.current * data.pages);
    if (curSection > 3) {
      curSection = 3;
    }

    if (curSection !== section) {
      setSection(curSection);
    }

    // const position = new THREE.Vector3();
    // characterContainer.current.getWorldPosition(position);

    // const rotation = new THREE.Quaternion();
    // characterContainer.current.getWorldQuaternion(rotation);
    // const euler = new THREE.Euler().setFromQuaternion(rotation, "XYZ");
  });

  return (
    <>
      <Leva hidden />
      <ambientLight intensity={1} />
      <motion.group
        ref={characterContainer}
        position={[0, -1, 0]}
        transition={{
          duration: 0.6,
          delay: 0,
        }}
        animate={"" + section}
        variants={{
          0: {
            scaleX: 1.1,
            scaleY: 1.1,
            scaleZ: 1.1,
          },
          1: {
            y: -viewport.height - 1,
            x: 0,
            z: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          },
          2: {
            y: section * -viewport.height - 1,
            x: 0,
            z: 0,
            scaleX: 1,
          },
          3: {
            y: section * -viewport.height - 0.3,
            x: 0,
            z: 3,
            rotateY: -Math.PI * 0.2,
          },
        }}
      >
        {/* <ContactShadows
          opacity={0.4}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        /> */}
        <Avatar animation={characterAnimation} />
      </motion.group>
    </>
  );
};
