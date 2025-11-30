// src/components/SimpleCursor.jsx
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function SimpleCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const cursorXSpring = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const cursorYSpring = useSpring(cursorY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="simple-global-cursor pointer-events-none fixed inset-0 z-[9998]"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    >
      <div className="h-6 w-6 rounded-full bg-white mix-blend-difference" />
    </motion.div>
  );
}