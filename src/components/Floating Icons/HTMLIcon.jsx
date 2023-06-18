import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function HTMLIcon(props) {
  const { nodes, materials } = useGLTF("/models/html.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Curve.geometry}
        material={materials["Material.001"]}
        position={[-0.03, 0.05, -0.02]}
        rotation={[Math.PI / 2, 0.19, -Math.PI / 2]}
      />
      <mesh
        geometry={nodes.Curve001.geometry}
        material={materials["SVGMat.001"]}
        position={[-0.02, 0.06, -0.02]}
        rotation={[Math.PI / 2, 0.19, -Math.PI / 2]}
        scale={1.16}
      />
    </group>
  );
}

useGLTF.preload("/models/html.glb");
