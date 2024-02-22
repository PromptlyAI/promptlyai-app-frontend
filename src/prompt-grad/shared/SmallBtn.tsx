import React from "react";

interface IProps {
  text: string;
  func: () => void;
}
export default function SmallBtn({ text, func }: IProps) {
  return (
    <button className="w-[100px] p-10 h-[30px] bg-blue-default" onClick={func}>
      {text}
    </button>
  );
}
