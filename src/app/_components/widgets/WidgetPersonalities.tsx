"use client";
import React, { useState, useRef, useEffect } from "react";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";
import Image from "next/image";
import PersonalityEmpty from "../../_assets/personality-empty.png";
import Arrow from "../../_assets/arrow.svg";

const WidgetPersonalities = ({ className = "" }: { className?: string }) => {
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

  return (
    <div
      onClick={toggleContent}
      style={{ minHeight, height: minHeight }}
      className={`transition-all duration-700 ease-in-out ${className}`}
      ref={containerRef}
    >
      <WidgetContainer className="overflow-hidden relative p-4 gap-2 h-full">
        <div
          className={`transition-opacity duration-300 ${
            showSecondContent ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex gap-6 flex-col items-center">
            <WidgetTitle className="max-w-[15rem] text-center">
              Your personalities collection will be here
            </WidgetTitle>
            <Image alt="personality empty" src={PersonalityEmpty} width={350} />
          </div>
        </div>
        <div
          className={`absolute p-4 transition-opacity duration-300 ${
            !showSecondContent ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="h-full flex flex-col gap-6">
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
          </div>
        </div>
      </WidgetContainer>
    </div>
  );
};

export default WidgetPersonalities;
