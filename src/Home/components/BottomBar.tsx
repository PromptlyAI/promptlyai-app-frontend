import React from "react";

export default function BottomBar() {
  return (
    <div className="h-[50px] w-[100%] bg-background-original  shadow-xl absolute bottom-0 flex justify-between items-center pl-5 pr-5 text-sm text-description">
      <span className=" cursor-pointer">Promptly Labs</span>

      <div className="flex gap-5">
        <span className=" cursor-pointer">Contact us</span>
        <span className=" cursor-pointer">About us</span>
      </div>
    </div>
  );
}
