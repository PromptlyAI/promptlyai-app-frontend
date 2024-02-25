import React from "react";

interface IProps {
  text: string;
  func: () => void;
}
export default function SmallBtn({ text, func }: IProps) {
  return (
    <button
      className="w-36 h-12 text-center rounded-md text-black hover:bg-transparent transition-colors bg-grayscale-lgray"
      onClick={func}
    >
      {text}
    </button>
  );
}
