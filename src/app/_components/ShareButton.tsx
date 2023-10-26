import React, { useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, text, url }) => {
  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title,
          text,
          url,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      // If Web Share API is not supported, copy the link to clipboard and notify the user
      navigator.clipboard.writeText(url).catch((err) => {
        console.error("Could not copy text to clipboard", err);
      });
    }
  }, [title, text, url]);

  // Variants define the different states of the animation
  const buttonVariants = {
    tap: {
      scale: 1.1, // scales the button up to 110% of its original size
    },
  };

  return (
    <>
      {/* The 'motion.div' component is a special Framer Motion component that can be animated */}
      <motion.button
        onClick={handleShare}
        variants={buttonVariants}
        whileTap="tap" // this defines the state of the button when it's being pressed (tapped)
        className="focus:outline-none" // you might want to customize focus styles as per your application's styling guidelines
      >
        <Image
          width={20}
          height={20}
          alt="share-arrow"
          src={"share-arrow.svg"}
          className="mb-[-2px]"
        />
      </motion.button>
    </>
  );
};

export default ShareButton;
