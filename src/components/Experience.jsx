import {
  ContactShadows,
  Float,
  Html,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Svg,
  useScroll,
} from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../config";
import { Avatar } from "./Avatar";
import Projects from "./Projects";
import Background from "./Background";
import { Perf } from "r3f-perf";
import { Room } from "./Room";
import Star from "./Star";

export const Experience = (props) => {
  const { menuOpened } = props;

  const characterContainer = useRef();
  const { viewport } = useThree();

  const data = useScroll();
  const [section, setSection] = useState(0);

  const [characterAnimation, setCharacterAnimation] = useState("Waving");
  const animations = ["Waving", "Sitting", "Idle", "Calling"];
  useEffect(() => {
    setCharacterAnimation("Falling");
    setTimeout(() => {
      setCharacterAnimation(animations[section]);
    }, duration * 1000);
  }, [section]);

  const [duration, setDuration] = useState(2);
  useEffect(() => {
    setDuration(0.6);
  }, []);

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -1 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 1 : 0, {
      ...framerMotionConfig,
    });
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
  });

  return (
    <>
      {/* <Perf /> */}
      <Background />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 0]} intensity={0.8} />
      <motion.group
        ref={characterContainer}
        position={[0, 8, 0]}
        transition={{
          duration: duration,
          delay: 0,
        }}
        animate={"" + section}
        variants={{
          0: {
            y: -0.7,
            x: -0.5,
            z: 1,
            scaleX: 1.1,
            scaleY: 1.1,
            scaleZ: 1.1,
            rotateY: Math.PI * 0.04,
          },
          1: {
            y: -viewport.height - 1,
            x: 0.2,
            z: 0,
            scale: 1.4,

            rotateX: -Math.PI * 0.06,
          },
          2: {
            y: section * -viewport.height - 2,
            x: -1.5,
            z: -2,
            rotateY: Math.PI * 0.5,
          },
          3: {
            y: section * -viewport.height - 0.3,
            x: 0.4,
            z: 3,
            rotateY: -Math.PI * 0.2,
          },
        }}
      >
        <Avatar animation={characterAnimation} />
      </motion.group>
      <Room section={section} />
      <Float
        speed={3} // Animation speed, defaults to 1
        rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.3} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Star
          section={section}
          position={[-0.4, -viewport.height + 0.5, 0]}
          transition={{
            ...framerMotionConfig,
            delay: 0.9,
          }}
        />
      </Float>
      <Float
        speed={3} // Animation speed, defaults to 1
        rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.3} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Star
          section={section}
          position={[0.15, -viewport.height + 0.8, 0]}
          transition={{
            ...framerMotionConfig,
            delay: 1.2,
          }}
        />
      </Float>
      <Float
        speed={3} // Animation speed, defaults to 1
        rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Star
          section={section}
          position={[0.75, -viewport.height + 0.5, 0]}
          transition={{
            ...framerMotionConfig,
            delay: 1.5,
          }}
        />
      </Float>
      <Projects section={section} />
    </>
  );
};
