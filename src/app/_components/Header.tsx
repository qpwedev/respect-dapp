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

      {isMenuOpen && (
        <div className="absolute left-[-20px] top-[-20px] z-[54] flex h-screen w-screen flex-col justify-between bg-black p-5">
          <Navigation
            address={address}
            className="ml-[2rem] mt-[1.2rem] flex-col text-3xl items-start gap-12"
          />
          <Web3ModalConnectButton className="mb-16 pl-6 pr-6 w-full h-16 min-w-[200px] py-5 text-3xl" />
        </div>
      )}
    </div>
  );
};

export default Header;
