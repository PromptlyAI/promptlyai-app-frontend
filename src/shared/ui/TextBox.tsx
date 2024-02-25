import React from "react";

interface IProps {
  title: string;
  description: string;
  func: () => void;
}

export default function TextBox({ title, description, func }: IProps) {
  return (
    <div
      className="w-[100%] p-3 h-32 bg-transparent hover:bg-description transition-colors hover:text-black text-description border rounded-md cursor-pointer"
      onClick={func}
    >
      <h2>
        {" "}
        <u>{title}</u>
      </h2>
      <span className="text-sm ">{description}</span>
    </div>
  );
}
