import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { framerMotionConfig } from "../config";

export function Room(props) {
  const { section } = props;

  const { nodes } = useGLTF("models/newRoom.glb");
  const bakedTexture = useTexture("models/baked.jpg");
  bakedTexture.flipY = false;

  return (
    <motion.group
      {...props}
      dispose={null}
      position={[1.5, -0.1, -0.14]}
      rotation={[-Math.PI * 0.04, -Math.PI * 0.7, 0]}
      initial={{
        scale: 0,
      }}
      animate={{
        scale: section === 0 ? 1 : 0,
        transition: {
          ...framerMotionConfig,
          delay: 1.2,
        },
      }}
    >
      <mesh geometry={nodes.baked.geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </motion.group>
  );
}

useGLTF.preload("models/newRoom.glb");
useTexture.preload("models/baked.jpg");
