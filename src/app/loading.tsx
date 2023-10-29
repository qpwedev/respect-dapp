import React from "react";

export default function Loading() {
  return (
    <div className=" w-screen h-screen flex justify-center items-center flex-col gap-5">
      <div className="circle-style w-[150px] h-[150px] animate-pulse rounded-full bg-[#FDF5FF]"></div>
      <div className="text-2xl">Loading...</div>
    </div>
  );
}
