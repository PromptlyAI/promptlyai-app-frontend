import React from "react";
import "../button-styles/StyledButton.css";
import Book_open from "./Book_open.png";
import Trash from "./Trash.png";
interface IProps {
  btnStyle?: number;
  title?: string;
  btnWidth?: number;
  btnHeight?: number;
  color?: string;
  click?: () => void;
  pressed?: boolean;
  textColor?: string;
  bookIcon?: boolean;
  trashIcon?: boolean;
}

export default function StyledButton({
  btnStyle = 0,
  title = "",
  btnWidth = 100,
  btnHeight = 35,
  color,
  click,
  pressed,
  textColor,
  bookIcon,
  trashIcon,
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
        minWidth: btnWidth,
        minHeight: btnHeight,
        background: color,
        color: textColor,
      }}
    >
      {bookIcon && <img className="left-icon" src={Book_open} alt="" />}
      {title}
      {trashIcon && pressed && (
        <img className="right-icon" src={Trash} alt="" />
      )}
    </button>
  );
}
