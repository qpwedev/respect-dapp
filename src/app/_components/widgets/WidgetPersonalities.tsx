"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";
import Image from "next/image";
import PersonalityEmpty from "../../_assets/personality-empty.png";
import Arrow from "../../_assets/arrow.svg";

const WidgetPersonalities = () => {
  const [showSecondContent, setShowSecondContent] = useState(false);
  const containerRef = useRef(null);
  const [minHeight, setMinHeight] = useState("auto");

  useEffect(() => {
    if (containerRef.current) {
      setMinHeight(`${containerRef.current.offsetHeight}px`); // memorize the initial height
    }
  }, []);

  const toggleContent = () => {
    setShowSecondContent(!showSecondContent);
  };

  // Variants for framer motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }, // Shortened duration
    exit: { opacity: 0, transition: { duration: 0.3 } }, // Shortened duration
  };

  return (
    <div
      onClick={toggleContent}
      style={{ minHeight, height: minHeight }}
      className="transition-all duration-700 ease-in-out"
      ref={containerRef}
    >
      <WidgetContainer className="p-4 gap-2 h-full justify-between">
        <AnimatePresence mode="wait">
          {!showSecondContent ? (
            <motion.div
              key="content"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="h-full"
            >
              <div className="flex gap-6 flex-col items-center">
                <WidgetTitle className="max-w-[15rem] text-center">
                  Your personalities collection will be here
                </WidgetTitle>
                <Image
                  alt="personality empty"
                  src={PersonalityEmpty}
                  width={350}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="other-content"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="h-full flex flex-col gap-6"
            >
              <WidgetTitle className="text-center">
                What are Personalities?
              </WidgetTitle>

              <div>
                Personalities are the <span>collectibles</span> you can get for
                the specific <span>activity</span> on Linea blockchain. Every
                personality is tied to an <span>on-chain evidence</span> about
                your identity.
              </div>
              <div className="flex gap-2 self-start">
                <span className="underline">Read more here</span>{" "}
                <Image alt="arrow" src={Arrow} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </WidgetContainer>
    </div>
  );
};

export default WidgetPersonalities;
