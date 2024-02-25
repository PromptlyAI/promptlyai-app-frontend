import React from "react";

interface IProps {
  text: string;
  func: () => void;
}
export default function SmallBtn({ text, func }: IProps) {
  return (
    <button
      className="w-36 h-12 bg-blue-default text-center rounded-md text-white hover:bg-blue-hover transition-colors"
      onClick={func}
    >
      {text}
    </button>
  );
}
