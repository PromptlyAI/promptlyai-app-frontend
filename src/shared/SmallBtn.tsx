import React from "react";

interface IProps {
  text: string;
  func: () => void;
}
export default function SmallBtn({ text, func }: IProps) {
  return (
    <button
      className="w-40 h-14 bg-blue-default text-center rounded-md text-white  "
      onClick={func}
    >
      {text}
    </button>
  );
}
