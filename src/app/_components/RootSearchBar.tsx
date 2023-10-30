"use client";

import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import { matchEthAddress } from "../_utils/matchEthAddress";

const RootSearchBar = () => {
  return (
    <div className="bg-transparent z-50 absolute backdrop-blur w-full h-full">
      <SearchBar />
    </div>
  );
};

const SearchBar = () => {
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!matchEthAddress(searchInput)) {
      setInvalidInput(true);

      controls.start({
        x: ["0%", "2%", "-2%", "2%", "0%"],
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

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute ml-auto mr-auto left-0 right-0 top-1/3 w-[480px] z-50 rounded-full flex justify-center items-center"
    >
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
      />
    </form>
  );
};

export default RootSearchBar;
