"use client";

import React, { useState } from "react";
import PickCircle from "../_assets/pick-circle.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

type TabsType = "graph" | "myself";

const Navigation = ({ className = "" }: { className?: string }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabsType>("myself");

  const handleTabChange = (newTab: TabsType) => {
    setActiveTab(newTab);
    if (newTab === "graph") {
      router.push("/graph");
    }

    if (newTab === "myself") {
      router.push("/");
    }
  };

  // Function to determine if a tab is active
  const isTabActive = (tab: TabsType) => activeTab === tab;

  return (
    <div className={`flex gap-5 ${className}`}>
      <div
        className={`flex cursor-pointer items-center gap-2 ${
          isTabActive("myself") ? "font-zillah" : ""
        }`}
        onClick={() => handleTabChange("myself")}
      >
        <Image alt="pick-circle" src={PickCircle} />
        Myself
      </div>

      <div
        className={`flex items-center gap-2 cursor-pointer ${
          isTabActive("graph") ? "font-zillah" : ""
        }`}
        onClick={() => handleTabChange("graph")}
      >
        <Image alt="pick-circle" src={PickCircle} />
        Graph
      </div>
    </div>
  );
};

export default Navigation;
