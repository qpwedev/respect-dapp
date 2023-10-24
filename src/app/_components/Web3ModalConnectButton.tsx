"use client";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Arrow from "../_assets/arrow.svg";
import Image from "next/image";

export default function Web3ModalConnectButton({
  className = "",
}: {
  className?: string;
}) {
  const { open } = useWeb3Modal();

  return (
    <>
      <button
        className={`border-white-400 flex items-center justify-between gap-2 rounded-[13px] border-[1px] px-2 py-1 ${className}`}
        onClick={() => open()}
      >
        <div>Connect</div>
        <div>
          <Image alt="arrow" src={Arrow} />
        </div>
      </button>
    </>
  );
}
