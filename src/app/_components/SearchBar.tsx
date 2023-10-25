"use client";

import { motion } from "framer-motion";
import { SVGProps, useRef, useState } from "react";

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
  const handleSearchInputChange = (e: any) => {
    setSearchInput(e.target.value);
  };

  const handleButtonClick = () => {
    setIsOpened(!isOpened);
  };

  const containerRef = useRef(null);

  return (
    <motion.div
      className="absolute bottom-5 left-5 w-[35px] h-[35px] z-50 rounded-full bg-white flex justify-center items-center"
      initial={false}
      animate={isOpened ? "open" : "closed"}
      variants={sidebar}
      ref={containerRef}
    >
      {isOpened ? (
        <motion.input
          className="w-full text-black outline-none h-12 min-w-full rounded-[22px] pl-5 pr-5"
          placeholder="Address"
          onChange={handleSearchInputChange}
          value={searchInput}
          autoFocus
          onBlur={() => setIsOpened(false)}
        />
      ) : (
        <SearchButton handleButtonClick={handleButtonClick} />
      )}
    </motion.div>
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
      className="z-50 p-2"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      <AntDesignSearchOutlined />
    </button>
  );
};

function AntDesignSearchOutlined(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <path
        fill="#000000"
        d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1c-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
      ></path>
    </svg>
  );
}

export default SearchBar;
