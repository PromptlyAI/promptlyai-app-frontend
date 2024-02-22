import React from "react";

interface IProps {
  text: string;
  func: () => void;
}
export default function SmallBtn({ text, func }: IProps) {
  return (
    <button className="w-[100px] h-[20px] bg-[#0c98c7]" onClick={func}>
      {text}
    </button>
  );
}
