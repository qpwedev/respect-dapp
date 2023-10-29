"use client";

import WidgetContainer from "./WidgetContainer";
import { GraphWrapper } from "../Graph";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const WidgetGraph = ({
  address,
  className = "",
  initialGraphData,
}: {
  address: string;
  className?: string;
  initialGraphData: any;
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/graph/${address}`);
  };


  return (
    <WidgetContainer
      onClick={handleClick}
      className={`min-h-[500px] ${className}`}
    >
      <GraphWrapper address={address} initialGraphData={initialGraphData} />
    </WidgetContainer>
  );
};

export default WidgetGraph;
