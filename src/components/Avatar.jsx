import React, { useEffect, useRef } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Avatar(props) {
  const { animation } = props;

  const group = useRef();
  const { nodes, materials } = useGLTF("models/avatar.glb");

  const { animations: wavingAnimation } = useFBX("animations/Waving.fbx");
  const { animations: idleAnimation } = useFBX("animations/StandingIdle.fbx");
  const { animations: fallingAnimation } = useFBX("animations/FallingIdle.fbx");
  const { animations: callingAnimation } = useFBX(
    "animations/TalkingOnPhone.fbx"
  );
  const { animations: sittingAnimation } = useFBX("animations/SittingIdle.fbx");

  wavingAnimation[0].name = "Waving";
  idleAnimation[0].name = "Idle";
  fallingAnimation[0].name = "Falling";
  callingAnimation[0].name = "Calling";
  sittingAnimation[0].name = "Sitting";

  const { actions } = useAnimations(
    [
      wavingAnimation[0],
      idleAnimation[0],
      fallingAnimation[0],
      callingAnimation[0],
      sittingAnimation[0],
    ],
    group
  );

  // useFrame((state) => {
  //   if (cameraFollow) {
  //     group.current.getObjectByName("Head").lookAt(state.camera.position);
  //   }
  //   if (cursorFollow) {
  //     const target = new THREE.Vector3(state.mouse.x, state.mouse.y, 1);
  //     group.current.getObjectByName("Neck").lookAt(target);
  //   }
  // });

  useEffect(() => {
    actions[animation].reset().fadeIn(0.3).play();

    return () => {
      actions[animation].reset().fadeOut(0.3);
    };
  }, [animation]);

  return (
    <group {...props} ref={group} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        frustumCulled={false}
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        frustumCulled={false}
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        frustumCulled={false}
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload("models/avatar.glb");
useFBX.preload("animations/Waving.fbx");
useFBX.preload("animations/StandingIdle.fbx");
useFBX.preload("animations/FallingIdle.fbx");
useFBX.preload("animations/TalkingOnPhone.fbx");
useFBX.preload("animations/SittingIdle.fbx");
