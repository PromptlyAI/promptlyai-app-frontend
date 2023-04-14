import React from "react";
import "./StyledInput.css";

interface IProps {
  inpStyle: number;
  title: string;
  inpType?: string;
  change?: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inpWidht?: number;
  inpHeight?: number;
  scroll?: boolean;
}

export default function StyledInput({
  inpStyle,
  title = "",
  inpType,
  change,
  inpWidht,
  inpHeight,
  scroll = true,
}: IProps) {
  return (
    <textarea
      onChange={(ev) => change !== undefined && change(ev)}
      className={`input-style-${inpStyle}`}
      value={title}
      style={{
        width: inpWidht,
        height: inpHeight,
        overflow: scroll ? "auto" : "hidden",
      }}
    />
  );
}
