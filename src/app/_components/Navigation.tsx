"use client";

import React, { useState } from "react";
import PickCircle from "../_assets/pick-circle.svg";
import Image from "next/image";

type TabsType = "graph" | "myself";

const Navigation = () => {
  const [activeTab, setActiveTab] = useState<TabsType>("graph");

  // Function to handle tab changes
  const handleTabChange = (newTab: TabsType) => {
    setActiveTab(newTab);
  };

  // Function to determine if a tab is active
  const isTabActive = (tab: TabsType) => activeTab === tab;

  return (
    <div className="flex gap-5">
      <div
        className={`flex items-center gap-2 cursor-pointer ${
          isTabActive("graph") ? "font-zillah" : ""
        }`}
        onClick={() => handleTabChange("graph")}
      >
        <Image alt="pick-circle" src={PickCircle} />
        Graph
      </div>

      <div
        className={`flex items-center gap-2 cursor-pointer ${
          isTabActive("myself") ? "font-zillah" : ""
        }`}
        onClick={() => handleTabChange("myself")}
      >
        <Image alt="pick-circle" src={PickCircle} />
        Myself
      </div>
    </div>
  );
};

export default Navigation;
