"use client";

import WidgetContainer from "./WidgetContainer";
import { GraphWrapper } from "../Graph";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { trpc } from "@/app/_trpc/client";

const WidgetGraph = ({
  address,
  className = "",
  initialGraphData,
}: {
  address: string;
  className?: string;
  initialGraphData: any;
}) => {
  // const router = useRouter();
  // const handleClick = () => {
  //   router.push(`/graph/${address}`);
  // };

  const graphData = trpc.getAttestations.useQuery(address, {
    initialData: initialGraphData,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return (
    <WidgetContainer
      // onClick={handleClick}
      className={`min-h-[500px] ${className}`}
    >
      <GraphWrapper address={address} graphData={graphData.data} />
    </WidgetContainer>
  );
};

export default WidgetGraph;
