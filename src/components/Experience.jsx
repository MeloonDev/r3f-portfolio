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
            x: 0,
            z: 1,
            scaleX: 1.1,
            scaleY: 1.1,
            scaleZ: 1.1,
          },
          1: {
            y: -viewport.height - 1,
            x: 1,
            z: 0,
            scale: 1.4,
            rotateY: -Math.PI * 0.05,
            rotateX: -Math.PI * 0.06,
          },
          2: {
            y: section * -viewport.height - 1,
            x: -2,
            z: 0,
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
      {/* <motion.group
        position={[0.4, -0.5, 0]}
        animate={{
          y: section === 1 ? -viewport.height - 0.5 : -0.5,
        }}
      >
        <Float>
        <mesh position={[2, -0.1, 0]} scale={0.5}>
          <sphereGeometry />
          <MeshDistortMaterial
            opacity={0.8}
            transparent
            distort={0.4}
            speed={4}
            color="red"
          />
        </mesh>
        </Float>
        <Float>
        <mesh position={[1.9, 0.8, -1]} scale={0.7}>
          <sphereGeometry />
          <MeshDistortMaterial
            opacity={0.8}
            transparent
            distort={0.8}
            speed={6}
            color="#D58CC9"
          />
        </mesh>
        </Float>
        <Float>
        <mesh position={[0.9, 0.2, 0]} scale={0.5}>
          <sphereGeometry />
          <MeshDistortMaterial
            opacity={0.8}
            transparent
            distort={0.6}
            speed={5}
            color="yellow"
          />
        </mesh>
        </Float>
      </motion.group> */}
      <Room section={section} />
      {/* <Svg
        src="/images/cloud.svg"
        position={[0, -viewport.height + 1, 0]}
        scale={0.006}
      /> */}
      <Html
        // scale={0.2}
        position={[0.8, -viewport.height - 2.2, 0]}
        zIndexRange={[50, 0]}
      >
        <div className="cloud">
          <img src="/images/cloud.svg" alt="" />
          <div className="about-fact">
            <p>😃</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo,
              excepturi!
            </p>
          </div>
        </div>
      </Html>
      <Projects section={section} />
    </>
  );
};
