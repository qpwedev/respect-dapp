"use client";

import React, { useEffect, useState } from "react";
import Web3ModalConnectButton from "./Web3ModalConnectButton";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { Squash as Hamburger } from "hamburger-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("noscroll");
    } else {
      document.body.classList.remove("noscroll");
    }

    // Cleanup function to remove the class when the component unmounts while the menu is still open
    return () => {
      document.body.classList.remove("noscroll");
    };
  }, [isMenuOpen]);

  return (
    <div className="border-[1px] border-spink rounded-[22px] py-[1rem] px-[2rem] flex items-center justify-between">
      <Logo />

      <div className="lg:flex lg:gap-10 lg:block hidden">
        <Navigation />
        <Web3ModalConnectButton />
      </div>

      <div className="z-[100] lg:hidden block">
        <Hamburger
          toggled={isMenuOpen}
          toggle={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {/* Fullscreen menu that shows when burger is clicked */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black z-50 p-5 flex flex-col justify-between">
          <Navigation className="flex-col text-3xl mt-[1.4rem] ml-[2.5rem]" />
          <Web3ModalConnectButton className="py-5 mb-20 text-3xl" />
        </div>
      )}
    </div>
  );
};

export default Header;
