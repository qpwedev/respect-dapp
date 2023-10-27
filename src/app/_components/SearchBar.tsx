"use client";

import { motion, useAnimation } from "framer-motion";
import { useRef, useState } from "react";
import { matchEthAddress } from "../utils";
import { useRouter } from "next/navigation";
import AntDesignSearchOutlined from "../_assets/Search";

const sidebar = {
  open: {
    width: "480px",
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

const SearchBar = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const router = useRouter();
  const controls = useAnimation();

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

    router.push(`/graph/${searchInput}`);
  };

  const containerRef = useRef(null);

  return (
    <motion.form
      className="absolute bottom-5 left-5 w-[35px] h-[35px] bg-white z-50 rounded-full flex justify-center items-center"
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
          className={`w-full text-black outline-none h-[40px] min-w-full rounded-[22px] pl-5 pr-5 ${
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

  const handleClick = (e) => {
    if (mouseUpTime - mouseDownTime < 200) {
      handleButtonClick();
    }
  };

  return (
    <button
      className="z-50 p-2 rounded-full"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      <AntDesignSearchOutlined />
    </button>
  );
};

export default SearchBar;
