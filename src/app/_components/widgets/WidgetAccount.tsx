"use client";

import React, { useEffect, useState } from "react";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";
import { useAccount } from "wagmi";
import WidgetLinks from "./WidgetLinks";
import ShareButton from "../ShareButton";

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
      <WidgetContainer className="bg-spink !border-spink text-black min-h-[200px] !justify-around p-5 flex-1">
        <WidgetTitle className="!font-bold !text-[2.5rem] self-start flex justify-center gap-3">
          <div>{handle}</div>
          <ShareButton
            title="Share your account"
            url={`https://wagmi.app/${handle}`}
            text="Share your account link"
          />
        </WidgetTitle>

        <div className="font-light self-start">
          {isMounted ? address : "Loading..."}
        </div>

        <WidgetLinks />
      </WidgetContainer>

      <WidgetContainer className="!border-spink font-light text-[24px] p-3 cursor-pointer hover:bg-spink hover:text-black">
        GIVE RESPECT
      </WidgetContainer>
    </div>
  );
};

export default WidgetAccount;
