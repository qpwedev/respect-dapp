"use client";

import React, { useEffect, useState } from "react";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";
import { useAccount } from "wagmi";
import WidgetLinks from "./WidgetLinks";

const WidgetAccount = () => {
  const [isMounted, setIsMounted] = useState(false); // State to track if the component has mounted
  const { address } = useAccount();

  // useEffect with an empty dependency array is similar to componentDidMount,
  // it runs after the first render and after the main hydration process.
  useEffect(() => {
    setIsMounted(true); // set isMounted to true when the component has mounted
  }, []);

  // We're rendering the address only after the component has mounted, i.e., on the client side.
  // Before mounting, a loading message or null can be returned.
  return (
    <WidgetContainer className="bg-spink !border-spink text-black">
      <WidgetTitle className="!font-bold !text-[2.5rem]">
        Pes Storojivoi
      </WidgetTitle>

      <div className="font-light">{isMounted ? address : "Loading..."}</div>

      <WidgetLinks />
    </WidgetContainer>
  );
};

export default WidgetAccount;
