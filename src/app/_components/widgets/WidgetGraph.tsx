"use client";

import WidgetContainer from "./WidgetContainer";
import { GraphWrapper } from "../Graph";

const WidgetGraph = ({
  className = "",
  initialGraphData,
}: {
  className?: string;
  initialGraphData: any;
}) => {
  return (
    <WidgetContainer className={`min-h-[500px] ${className}`}>
      <GraphWrapper initialGraphData={initialGraphData} />
    </WidgetContainer>
  );
};

export default WidgetGraph;
