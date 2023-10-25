"use client";

import React, { useEffect, useState } from "react";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";
import { useAccount } from "wagmi";
import WidgetLinks from "./WidgetLinks";
import ShareButton from "../ShareButton";
import { WidgetRespectButton } from "./WidgetRespectButton";
const WidgetAccount = ({
  handle,
  className = "",
}: {
  handle: string;
  className?: string;
}) => {
  const [isMounted, setIsMounted] = useState(false); // State to track if the component has mounted
  const { address } = useAccount();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      <WidgetContainer className="min-h-[200px] flex-1 !justify-around !border-spink bg-spink p-5 text-black">
        <div className="flex flex-col gap-3 self-start">
          <WidgetTitle className="flex justify-center gap-3 self-start !text-[2.5rem] !font-bold">
            <div>{handle}</div>
            <ShareButton
              title="Share your account"
              url={`https://wagmi.app/${handle}`}
              text="Share your account link"
            />
          </WidgetTitle>

          <div className="self-start font-light">
            {isMounted ? address : "Loading..."}
          </div>
        </div>

        <WidgetLinks />
      </WidgetContainer>

      <WidgetRespectButton subject="0xBB60ADaFB45ebbf4CE60799950a39f3dfb3AD2DC" />
    </div>
  );
};

export default WidgetAccount;
