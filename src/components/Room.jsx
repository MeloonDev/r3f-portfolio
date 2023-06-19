import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export function Room(props) {
  const { nodes } = useGLTF("models/newRoom.glb");
  const bakedTexture = useTexture("models/baked.jpg");
  bakedTexture.flipY = false;

  return (
    <group {...props} dispose={null} position={[1.5, -0.1, -0.14]}>
      <mesh geometry={nodes.baked.geometry} rotation-y={-Math.PI * 0.7}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  );
}

useGLTF.preload("models/newRoom.glb");
