import React from "react";
import Web3ModalConnectButton from "./Web3ModalConnectButton";
import Logo from "./Logo";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <div className="border-[1px] border-spink rounded-[22px] py-[1rem] px-[2rem] flex items-center justify-between">
      <Logo />

      <div className="flex gap-10">
        <Navigation />
        <Web3ModalConnectButton />
      </div>
    </div>
  );
};

export default Header;
