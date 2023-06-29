import { useGLTF, useTexture, useVideoTexture } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { framerMotionConfig } from "../config";

export function Room(props) {
  const { section, responsiveRatio, roomScaleRatio } = props;

  const { nodes } = useGLTF("models/newRoom.glb");
  const bakedTexture = useTexture("models/baked.jpg");
  bakedTexture.flipY = false;
  const videoTexture = useVideoTexture("images/video.mp4");

  return (
    <motion.group
      {...props}
      dispose={null}
      rotation={[-Math.PI * 0.04, -Math.PI * 0.7, 0]}
      initial={{
        scale: 0,
      }}
      animate={{
        scale: section === 0 ? roomScaleRatio : 0,
        transition: {
          ...framerMotionConfig,
          delay: 1.2,
        },
      }}
    >
      <mesh geometry={nodes.baked.geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh position={[-0.29, 0.425, -0.005]} rotation={[0, Math.PI * 0.5, 0]}>
        <planeGeometry args={[0.79, 0.49]} />
        <meshBasicMaterial map={videoTexture} toneMapped={false} />
      </mesh>
    </motion.group>
  );
}

useGLTF.preload("models/newRoom.glb");
useTexture.preload("models/baked.jpg");
