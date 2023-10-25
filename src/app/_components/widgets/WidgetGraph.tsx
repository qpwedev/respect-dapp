"use client";

import WidgetContainer from "./WidgetContainer";
import { trpc } from "../../_trpc/client";
import { Graph } from "../Graph";

const WidgetGraph = ({
  className = "",
  initialGraphData,
}: {
  className?: string;
  initialGraphData: any;
}) => {
  const data = trpc.getAttestations.useQuery(undefined, {
    initialData: initialGraphData,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  data.types = ["arrow"];

  const customColors = ["#FDF5FF"];
  return (
    <WidgetContainer className={`min-h-[500px] ${className}`}>
      <Graph data={data.data} customColors={customColors} />
    </WidgetContainer>
  );
};

export default WidgetGraph;
