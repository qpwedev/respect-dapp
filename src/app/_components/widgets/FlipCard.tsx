"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const FlipCard = ({ frontComponent, backComponent }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const variants = {
    front: {
      rotateY: 0,
      transition: { duration: 0.5 },
    },
    back: {
      rotateY: 180,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      style={{
        width: "100%", // Use 100% to allow the wrapper to expand to the parent container's size
        height: "100%",
        perspective: 1000,
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
        variants={variants}
        animate={isFlipped ? "back" : "front"}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Component */}
        <motion.div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
          }}
        >
          {frontComponent}
        </motion.div>

        {/* Back Component */}
        <motion.div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            rotateY: 180,
          }}
        >
          {backComponent}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FlipCard;
