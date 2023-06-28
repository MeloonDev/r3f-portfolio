import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { framerMotionConfig } from "../config";

export const projects = [
  {
    tittle: "Project 1",
    url: "https://finance-dashboard-pi.vercel.app/",
    image: "/images/proj1.png",
    description: "SCSS, React, Typescript",
  },
  {
    tittle: "Project 1",
    url: "https://finance-dashboard-pi.vercel.app/",
    image: "/images/proj1.png",
    description: "SCSS, React, Typescript",
  },
  {
    tittle: "Project 1",
    url: "https://finance-dashboard-pi.vercel.app/",
    image: "/images/proj1.png",
    description: "SCSS, React, Typescript",
  },
  {
    tittle: "Project 1",
    url: "https://finance-dashboard-pi.vercel.app/",
    image: "/images/proj1.png",
    description: "SCSS, React, Typescript",
  },
  {
    tittle: "Project 1",
    url: "https://finance-dashboard-pi.vercel.app/",
    image: "/images/proj1.png",
    description: "SCSS, React, Typescript",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.tittle}
      </Text>
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

function Projects(props) {
  const { section } = props;

  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <motion.group
      position-y={-viewport.height * 2.3}
      position-z={-viewport.height * 0.7}
      initial={{
        scale: 0,
      }}
      animate={{
        scale: section === 2 ? 1 : 0,
        transition: {
          ...framerMotionConfig,
          delay: 0.5,
        },
      }}
    >
      {projects.map((project, index) => (
        <motion.group
          scale={0.6}
          key={"project" + index}
          transition={{
            type: "spring",
            mass: 2,
            swiftness: 1500,
            damping: 20,
            restDelta: 0.0001,
          }}
          animate={{
            x: 0 + (index - currentProject) * 1.7,
            y: currentProject === index ? -0.2 : 0,
            z: currentProject === index ? -1 : -2.1,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : 0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </motion.group>
  );
}
export default Projects;
