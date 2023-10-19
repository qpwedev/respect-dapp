import React from "react";
import Image from "next/image";
import LogoSvg from "../_assets/logo.svg";

const Logo = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-3">
        <Image className="mb-[-2px]" alt="logo" width={42} height={40} src={LogoSvg} />

        <div className="text-4xl mt-[-8px]">respect</div>
      </div>
    </>
  );
};

export default Logo;
