"use client";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Arrow from "../_assets/arrow.svg";
import Image from "next/image";

export default function Web3ModalConnectButton() {
  const { open } = useWeb3Modal();

  return (
    <>
      <button
        className="border-[1px] border-white-400 rounded-[13px] px-2 py-1 flex items-center justify-between gap-2"
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
