import React from "react";
import "../ButtonStyles/StyledButton.css";
import BookClicked from "../../images/BookClicked.png";
import Book from "../../images/Book.png";

import Trash from "../../images/Trash.png";
import { FaBeer } from "react-icons/fa";

interface IProps {
  btnStyle?: number;
  title?: string;
  btnWidth?: number;
  btnHeight?: number;
  color?: string;
  click?: () => void;
  deleteIconClick?: () => void;
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
  deleteIconClick,
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
      {bookIcon &&
        (pressed ? (
          <img className="left-icon" src={BookClicked} alt="" />
        ) : (
          <img className="left-icon" src={Book} alt="" />
        ))}
      {title}
      {trashIcon && pressed && (
        <img
          // onClick={() => deleteIconClick()}
          className="right-icon"
          src={Trash}
          alt=""
        />
      )}
    </button>
  );
}
