import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function CSSIcon(props) {
  const { nodes, materials } = useGLTF("/models/css.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Curve.geometry}
        material={materials["Material.001"]}
        position={[-0.03, 0.05, -0.02]}
        rotation={[Math.PI / 2, 0.19, -Math.PI / 2]}
      />
      <mesh
        geometry={nodes.Curve002.geometry}
        material={materials["SVGMat.002"]}
        position={[-0.02, 0.06, -0.02]}
        rotation={[Math.PI / 2, 0.18, -Math.PI / 2]}
        scale={0.74}
      />
    </group>
  );
}

useGLTF.preload("/models/css.glb");
