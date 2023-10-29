"use client";

import React, { useEffect, useState } from "react";
import Web3ModalConnectButton from "./Web3ModalConnectButton";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { Squash as Hamburger } from "hamburger-react";

const Header = ({ address }: { address: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("noscroll");
    } else {
      document.body.classList.remove("noscroll");
    }

    return () => {
      document.body.classList.remove("noscroll");
    };
  }, [isMenuOpen]);

  return (
    <div className="flex z-[51] items-center justify-between bg-transparent backdrop-blur rounded-[22px] border-[1px] border-spink px-[2rem] py-[1rem]">
      <Logo />

      <div className="hidden lg:block lg:flex lg:gap-10">
        <Navigation address={address} />
        <Web3ModalConnectButton />
      </div>

      <div className="z-[100] block lg:hidden">
        <Hamburger
          toggled={isMenuOpen}
          toggle={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {/* Fullscreen menu that shows when burger is clicked */}
      {isMenuOpen && (
        <div className="absolute left-[-20px] top-[-20px] z-[54] flex h-screen w-screen flex-col justify-between bg-black p-5">
          <Navigation
            address={address}
            className="ml-[2.5rem] mt-[1.4rem] flex-col text-3xl"
          />
          <Web3ModalConnectButton className="mb-20 ml-5 min-w-[200px] py-5 text-3xl" />
        </div>
      )}
    </div>
  );
};

export default Header;
