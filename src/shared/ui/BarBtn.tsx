import React from "react";
import { FaCog } from "react-icons/fa";

interface IProps {
  title: string;
}
export default function BarBtn({ title }: IProps) {
  return (
    <div className="w-[100%] h-[40px] rounded-2xl bg-white flex items-center pl-5 relative shadow-xl select-none">
      <div className="flex items-center gap-5">
        <FaCog />
        {title}
      </div>
      <div className="absolute right-10 cursor-pointer">
        <u>Learn more</u>
      </div>
    </div>
  );
}
