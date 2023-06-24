import { Sphere, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function Background() {
  const material = useRef();
  const color = useRef({
    color: "#3d3d3d",
  });
  const data = useScroll();

  const tl = useRef();

  useFrame(() => {
    tl.current.progress(data.scroll.current);
    material.current.color.set(color.current.color);
  });

  useEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(color.current, {
      color: "#476072",
    });
    tl.current.to(color.current, {
      color: "#548CA8",
    });
    tl.current.to(color.current, {
      color: "#EEEEEE",
    });
  }, []);

  return (
    <group>
      <Sphere scale={[30, 30, 30]}>
        <meshBasicMaterial
          ref={material}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>
    </group>
  );
}
export default Background;
