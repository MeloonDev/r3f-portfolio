import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Experience } from "./components/Experience";
import Interface from "./components/Interface";

function App() {
  const [pages, setPages] = useState(0);

  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 30 }}>
      <color attach="background" args={["#a11e1e"]} />
      <ScrollControls pages={4} damping={0.1}>
        {/* <ScrollManager/> */}
        <Experience />
        <Scroll html>
          <Interface />
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}

export default App;
