"use client";

import { motion, useAnimation } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AntDesignSearchOutlined from "../_assets/Search";
import { matchEthAddress } from "../_utils/matchEthAddress";
import useWindowDimensions from "@/hooks/useWindowDimensions";

const SearchBar = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const router = useRouter();
  const controls = useAnimation();
  const windowDimensions = useWindowDimensions();

  const sidebar = {
    open: {
      width:
        windowDimensions.width > 480
          ? "480px"
          : `${windowDimensions.width - 10}px`,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    closed: {
      width: "35px",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const handleSearchInputChange = (e: any) => {
    setInvalidInput(false);
    controls.start({
      x: "0%",
      backgroundColor: "white",
      transition: {
        duration: 0.25,
        ease: "easeInOut",
      },
    });

    setSearchInput(e.target.value);
  };

  const handleButtonClick = () => {
    setIsOpened(!isOpened);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!matchEthAddress(searchInput)) {
      setInvalidInput(true);

      controls.start({
        x: ["0%", "1%", "-1%", "1%", "0%"],
        backgroundColor: "#ffe0e0",
        transition: {
          duration: 0.25,
          ease: "easeInOut",
        },
      });

      return;
    }

    router.push(`/profile/${searchInput}`);
  };

  const containerRef = useRef(null);

  return (
    <motion.form
      className="absolute top-[150px] left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[35px] h-[35px] bg-white z-[49] rounded-full flex justify-center items-center"
      initial={false}
      onSubmit={handleSubmit}
      animate={isOpened ? "open" : "closed"}
      variants={sidebar}
      ref={containerRef}
    >
      {isOpened ? (
        <motion.input
          initial={{ x: "0%", backgroundColor: "white" }}
          animate={controls}
          className={`h-[40px] w-full min-w-full rounded-[22px] pl-5 pr-5 text-black outline-none ${
            !invalidInput && "bg-white"
          }`}
          placeholder="Address"
          onChange={handleSearchInputChange}
          value={searchInput}
          autoFocus
          onBlur={() => setIsOpened(false)}
        />
      ) : (
        <SearchButton handleButtonClick={handleButtonClick} />
      )}
    </motion.form>
  );
};

const SearchButton = ({
  handleButtonClick,
}: {
  handleButtonClick: () => void;
}) => {
  let mouseDownTime = 0;
  let mouseUpTime = 0;

  const handleMouseDown = () => {
    mouseDownTime = new Date().getTime();
  };

  const handleMouseUp = () => {
    mouseUpTime = new Date().getTime();
  };

  const handleClick = () => {
    if (mouseUpTime - mouseDownTime < 200) {
      handleButtonClick();
    }
  };

  return (
    <button
      className="z-[49] p-2 rounded-full hover:bg-[#FDF5FF]"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      <AntDesignSearchOutlined />
    </button>
  );
};

export default SearchBar;
