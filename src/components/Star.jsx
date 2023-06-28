import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { framerMotionConfig } from "../config";

export default function Star(props) {
  const { section } = props;
  const { nodes, materials } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/star/model.gltf"
  );

  return (
    <motion.group
      {...props}
      dispose={null}
      rotation={[-Math.PI * 0.05, 0, 0]}
      initial={{
        scale: 0,
      }}
      animate={{
        scale: section === 1 ? 0.3 : 0,
      }}
    >
      <motion.mesh
        whileTap={{ scale: 0.8, rotateZ: Math.PI }}
        geometry={nodes.star.geometry}
        material={materials["Yellow.030"]}
        rotation={[Math.PI / 2, 0, 0]}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
      />
    </motion.group>
  );
}

useGLTF.preload(
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/star/model.gltf"
);
