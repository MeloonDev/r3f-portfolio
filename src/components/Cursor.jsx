import { useEffect, useRef, useState } from "react";

const CURSOR_SPEED = 0.12;

let mouseX = -10;
let mouseY = -10;
let outlineX = 0;
let outlineY = 0;

function Cursor() {
  const cursorOutline = useRef();
  const [hoverButton, setHoverButton] = useState(false);

  const animate = () => {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;

    outlineX = outlineX + distX * CURSOR_SPEED;
    outlineY = outlineY + distY * CURSOR_SPEED;

    cursorOutline.current.style.left = `${outlineX}px`;
    cursorOutline.current.style.top = `${outlineY}px`;
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const mouseEventsListener = document.addEventListener("mousemove", (e) => {
      mouseX = e.pageX;
      mouseY = e.pageY;
    });

    const animateElement = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", mouseEventsListener);
      cancelAnimationFrame(animateElement);
    };
  }, []);

  useEffect(() => {
    const mouseEventListener = document.addEventListener("mousemove", (e) => {
      if (
        e.target.tagName.toLowerCase() === "button" ||
        e.target.parentElement.tagName.toLowerCase() === "button" ||
        e.target.tagName.toLowerCase() === "input" ||
        e.target.tagName.toLowerCase() === "textarea" ||
        e.target.tagName.toLowerCase() === "path" ||
        e.target.tagName.toLowerCase() === "svg"
      ) {
        setHoverButton(true);
      } else {
        setHoverButton(false);
      }
    });

    return () => {
      document.removeEventListener("mousemove", mouseEventListener);
    };
  }, []);

  return (
    <div
      className={hoverButton ? "cursor active" : "cursor"}
      ref={cursorOutline}
    />
  );
}
export default Cursor;
