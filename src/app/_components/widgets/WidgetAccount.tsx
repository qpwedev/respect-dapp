"use client";

import React from "react";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";
import { useAccount } from "wagmi";
import WidgetLinks from "./WidgetLinks";
import ShareButton from "../ShareButton";
import { WidgetRespectButton } from "./WidgetRespectButton";
import { trpc } from "@/app/_trpc/client";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const WidgetAccount = ({
  handle,
  address,
  initialUserLinks,
  className = "",
}: {
  handle: string;
  address: string;
  initialUserLinks: any;
  className?: string;
}) => {
  const { address: currentUserAddress } = useAccount();
  const myself = currentUserAddress?.toLowerCase() === address.toLowerCase();
  const linkData = trpc.getAddressLinks.useQuery(address, {
    initialData: initialUserLinks,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

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

          <div className="self-start font-light">{address}</div>
        </div>

        <WidgetLinks userLinks={linkData.data} myself={myself} />
      </WidgetContainer>

      {!myself && <WidgetRespectButton subject={address} />}
    </div>
  );
};

export default WidgetAccount;
