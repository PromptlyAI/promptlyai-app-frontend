import React from "react";
import "./StyledInput.css";

interface IProps {
  inpStyle: number;
  title: string;
  change?: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inpWidht?: number;
  inpHeight?: number;
}

export default function StyledInput({
  inpStyle,
  title = "",
  change,
  inpWidht,
  inpHeight,
}: IProps) {
  return (
    <textarea
      onChange={(ev) => change !== undefined && change(ev)}
      className={`input-style-${inpStyle}`}
      value={title}
      style={{ width: inpWidht, height: inpHeight }}
    />
  );
}
