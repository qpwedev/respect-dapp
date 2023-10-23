import Image from "next/image";
import React from "react";
import WidgetContainer from "./widgets/WidgetContainer";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex justify-between items-center gap-10 mt-[36px]">
      <div className="flex basis-1/5 gap-6">
        <div className="filter invert">
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
      <WidgetContainer className="!border-spink font-light text-[24px] p-3 cursor-pointer hover:bg-spink bg-spink hover:text-black text-black flex-1 basis-3/5 ">
        EXPLORE
      </WidgetContainer>
      <div className="basis-1/5 text-right">establish, explore, connect</div>
    </div>
  );
};

export default Footer;
