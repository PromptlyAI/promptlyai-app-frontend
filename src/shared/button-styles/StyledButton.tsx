import React from "react";
import "../button-styles/StyledButton.css";
interface IProps {
  btnStyle?: number;
  title?: string;
  btnWidth?: number;
  btnHeight?: number;
  color?: string;
  click?: () => void;
  pressed?: boolean;
}

export default function StyledButton({
  btnStyle = 0,
  title = "",
  btnWidth = 100,
  btnHeight = 35,
  color,
  click,
  pressed,
}: IProps) {
  return (
    <button
      onClick={() => click !== undefined && click()}
      className={
        pressed !== undefined
          ? pressed
            ? `btn-style-3 btn`
            : `btn-style-2 btn`
          : `btn-style-${btnStyle} btn`
      }
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
