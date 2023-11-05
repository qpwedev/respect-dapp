"use client";

import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
import ArrowSVG from "../_assets/Arrow";
import ConnectedSVG from "../_assets/Connected";
import { useAccount } from "wagmi";
import { useRef, useState } from "react";

export default function Web3ModalConnectButton({
  className = "",
}: {
  className?: string;
}) {
  const { open } = useWeb3Modal();
  const { open: isModalOpened } = useWeb3ModalState();
  const { address, isConnecting, connector } = useAccount();

  const [hoveredColor, setHoveredColor] = useState<string>("#FFF");

  const btnRef = useRef<HTMLButtonElement | null>(null);

  const removeButtonFocus = () => {
    btnRef.current?.blur();
  };

  const handleClick = () => {
    open();
    removeButtonFocus();
  };

  return (
    <button
      ref={btnRef}
      className={`border-white-400 flex w-[140px] select-none items-center justify-between gap-2 rounded-[13px] border-[1px] px-2 py-1 focus:border-[#818181] focus:bg-transparent focus:text-[#818181] ${className} hover:border-[#FDC5F5] hover:bg-[#FDC5F5] hover:text-[#121212]`}
      onClick={handleClick}
      onMouseEnter={() => setHoveredColor("#121212")}
      onMouseLeave={() => setHoveredColor("#FFF")}
      onFocus={() => setHoveredColor("#818181")}
      onBlur={() => setHoveredColor("#FFF")}
    >
      {!address && (isModalOpened || isConnecting) ? (
        <div>Connecting...</div>
      ) : address ? (
        <>
          <div>Connected</div>
          <ConnectedSVG fill={hoveredColor} />
        </>
      ) : (
        <>
          <div>Connect</div>
          <ArrowSVG fill={hoveredColor} />
        </>
      )}
    </button>
  );
}
