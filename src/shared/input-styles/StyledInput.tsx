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
  placeHolder?: string; 
}

export default function StyledInput({
  inpStyle,
  title = "",
  inpType,
  change,
  inpWidht,
  inpHeight,
  scroll = true,
  placeHolder = ""
}: IProps) {
  return (
    <textarea
      onChange={(ev) => change !== undefined && change(ev)}
      className={`input-style-${inpStyle}`}
      placeholder={placeHolder}
      value={title}
      style={{
        width: inpWidht,
        height: inpHeight,
        overflow: scroll ? "auto" : "hidden",
        borderRadius: 0,
        borderColor: "transparent",
      }}
    />
  );
}
