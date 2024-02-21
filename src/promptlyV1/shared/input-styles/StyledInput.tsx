import React from "react";
import "./StyledInput.css";

interface IProps {
  inpStyle: number;
  title: string;
  loadingText?: boolean;
  inpType?: string;
  change?: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inpWidht?: string;
  inpHeight?: string;
  scroll?: boolean;
  placeHolder?: string;
  textSize?: string;
}

export default function StyledInput({
  inpStyle,
  title = "",
  loadingText,
  inpType,
  change,
  inpWidht,
  inpHeight,
  scroll = true,
  placeHolder = "",
  textSize,
}: IProps) {
  return (
    <textarea
      onChange={(ev) => change !== undefined && change(ev)}
      className={
        loadingText
          ? `input-style-${inpStyle} loading-text`
          : `input-style-${inpStyle}`
      }
      placeholder={placeHolder}
      value={
        loadingText
          ? "Can you provide a comprehensive overview of the origins and evolution of the English language throughout history, including its early Germanic roots, the influence of French and Latin in the Middle Ages, and its global spread during the colonial era?"
          : title
      }
      style={{
        width: inpWidht,
        height: inpHeight,
        overflow: scroll ? "auto" : "hidden",
        borderRadius: 0,
        fontSize: textSize,
        borderColor: "transparent",
      }}
    >
      <span style={{ display: "inline" }}>ddfsasdasdasdasdadsa</span>
    </textarea>
  );
}
