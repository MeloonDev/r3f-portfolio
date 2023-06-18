import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function JSIcon(props) {
  const { nodes, materials } = useGLTF("/models/js.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials["Material.001"]}
        position={[-0.23, 0.07, 0.04]}
        rotation={[0, 0, 0.11]}
        scale={[0.84, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        material={materials["Material.002"]}
        position={[-0.2, 0.02, 0.06]}
        rotation={[Math.PI / 2, 0.11, -Math.PI / 2]}
        scale={0.1}
      />
    </group>
  );
}

useGLTF.preload("/models/js.glb");
