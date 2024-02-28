import React from "react";

export default function BottomBar() {
  return (
    <div className="h-[50px] w-[100%] bg-white border shadow-2xl absolute bottom-0 flex justify-between items-center pl-5 pr-5 text-sm">
      <span className=" cursor-pointer">Promptly Labs</span>
      <div>
        <span className=" cursor-pointer">About us</span>
      </div>
    </div>
  );
}
