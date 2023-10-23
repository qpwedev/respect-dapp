import React from "react";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";

const WidgetJar = ({ className = "" }: { className?: string }) => {
  return (
    <WidgetContainer className={`min-h-[500px] ${className}`}>
      <WidgetTitle>On-chain respects</WidgetTitle>
    </WidgetContainer>
  );
};

export default WidgetJar;
