import React from "react";
import "../button-styles/StyledButton.css";
interface IProps {
  btnStyle?: number;
  title?: string;
  btnWidth?: number;
  btnHeight?: number;
  color?: string;
}

export default function StyledButton({
  btnStyle = 0,
  title = "",
  btnWidth = 100,
  btnHeight = 35,
  color,
}: IProps) {
  return (
    <button
      className={`btn-style-${btnStyle} btn`}
      style={{
        width: btnWidth,
        height: btnHeight,
        background: color,
      }}
    >
      {title}
    </button>
  );
}
