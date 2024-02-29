import React from "react";
import { FaCog } from "react-icons/fa";

interface IProps {
  title: string;
  func: () => void;
}
export default function BarBtn({ title, func }: IProps) {
  return (
    <div
      onClick={func}
      className="w-[100%] h-[40px] rounded-2xl bg-description flex items-center pl-5 relative shadow-xl select-none hover:bg-white cursor-pointer hover:translate-x-1 transition-transform transition-colors"
    >
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
