import Image from "next/image";
import React from "react";
import WidgetContainer from "./widgets/WidgetContainer";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-[36px] flex items-center justify-between gap-10">
      <div className="flex basis-1/5 gap-6">
        <div className="invert filter">
          <Image
            className=""
            src={"/x.svg"}
            alt="x link"
            width={30}
            height={30}
          />
        </div>
        <div>
          <Image
            src={"/telegram.svg"}
            alt="telegram link"
            width={35}
            height={35}
          />
        </div>
      </div>
      <WidgetContainer className="flex-1  basis-3/5 cursor-pointer !border-spink bg-spink p-3 text-[24px] font-light text-black hover:bg-spink hover:text-black ">
        EXPLORE
      </WidgetContainer>
      <div className="basis-1/5 text-right">establish, explore, connect</div>
    </div>
  );
};

export default Footer;
