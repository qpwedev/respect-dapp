"use client";

import React, { useState } from "react";
import PickCircle from "../_assets/pick-circle.svg";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

type TabsType = "graph" | "profile";

const Navigation = ({
  className = "",
  address,
}: {
  className?: string;
  address: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentRoute = pathname.split("/")[1];
  const currentPage = currentRoute === "graph" ? "graph" : "profile";
  const [activeTab, setActiveTab] = useState<TabsType>(currentPage as TabsType);

  const handleTabChange = (newTab: TabsType) => {
    setActiveTab(newTab);
    if (newTab === "graph") {
      router.push(`/graph/${address}`);
    }

    if (newTab === "profile") {
      router.push(`/profile/${address}`);
    }
  };

  const isTabActive = (tab: TabsType) => activeTab === tab;

  return (
    <div className={`flex gap-5 ${className}`}>
      <div
        className={`flex cursor-pointer items-center gap-2 ${
          isTabActive("profile") ? "font-zillah" : ""
        }`}
        onClick={() => handleTabChange("profile")}
      >
        <Image alt="pick-circle" src={PickCircle} />
        Profile
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
