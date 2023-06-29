import { Float, useScroll } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../config";
import { Avatar } from "./Avatar";
import Projects from "./Projects";
import Background from "./Background";
import { Room } from "./Room";
import Star from "./Star";

export const Experience = (props) => {
  const { menuOpened } = props;

  const characterContainer = useRef();
  const { viewport } = useThree();
  const data = useScroll();

  const isMobile = window.innerWidth < 768;
  const responsiveRatio = viewport.width / 3;
  const roomScaleRatio = Math.max(0.5, Math.min(responsiveRatio, 1));
  const avatarScaleRatio = Math.max(0.5, Math.min(responsiveRatio, 1.1));

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
      <Background />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 0]} intensity={0.8} />
      <motion.group
        ref={characterContainer}
        position={[0, 8, 0]}
        scale={avatarScaleRatio}
        transition={{
          duration: duration,
          delay: 0,
        }}
        animate={"" + section}
        variants={{
          0: {
            y: isMobile ? -0.65 : -0.7,
            x: -0.5 * avatarScaleRatio,
            z: 1,
            scaleX: avatarScaleRatio,
            scaleY: avatarScaleRatio,
            scaleZ: avatarScaleRatio,
            rotateY: Math.PI * 0.04,
          },
          1: {
            y: isMobile ? -viewport.height - 0.8 : -viewport.height - 1,
            x: 0.2,
            z: 0,
            scale: isMobile ? 1.2 : 1.4,

            rotateX: -Math.PI * 0.06,
          },
          2: {
            y: isMobile
              ? section * -viewport.height - 1.3
              : section * -viewport.height - 2,
            x: isMobile ? -0.85 : -1.5,
            z: -2,
            rotateY: Math.PI * 0.5,
          },
          3: {
            y: isMobile
              ? section * -viewport.height + 0.75
              : section * -viewport.height - 0.3,
            x: isMobile ? 0.1 : 0.4,
            z: 3,
            scale: isMobile ? 0.5 : 1,
            rotateY: -Math.PI * 0.2,
          },
        }}
      >
        <Avatar animation={characterAnimation} />
      </motion.group>
      <Room
        section={section}
        responsiveRatio={responsiveRatio}
        roomScaleRatio={roomScaleRatio}
        position={[
          isMobile ? 0 : 1.4 * roomScaleRatio,
          isMobile ? -viewport.height / 4 : -0.1,
          -0.14,
        ]}
      />
      <group position={[0, isMobile ? -0.8 : 0, 0]} scale={isMobile ? 0.7 : 1}>
        <Float
          speed={3}
          rotationIntensity={0.5}
          floatIntensity={0.3}
          floatingRange={[-0.1, 0.1]}
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
          speed={3}
          rotationIntensity={0.5}
          floatIntensity={0.3}
          floatingRange={[-0.1, 0.1]}
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
          speed={3}
          rotationIntensity={0.5}
          floatIntensity={0.2}
          floatingRange={[-0.1, 0.1]}
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
      </group>
      <Projects section={section} isMobile={isMobile} />
    </>
  );
};
