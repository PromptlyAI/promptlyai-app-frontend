import React from "react";

interface IProps {
  text: string;
  func: () => void;
}
export default function SmallBtn({ text, func }: IProps) {
  return (
    <button
      className="w-[300px] p-10 h-[10px] bg-blue-default flex items-center"
      onClick={func}
    >
      {text}
    </button>
  );
}
