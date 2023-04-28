import React from "react";
import "../ButtonStyles/StyledButton.css";
import BookClicked from "../../images/BookClicked.png";
import Book from "../../images/Book.png";

import ImgBoxBlack from "../../images/ImgBoxBlack.png";
import ImgBoxBlue from "../../images/ImgBoxBlue.png";

import Trash from "../../images/Trash.png";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";

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
  customIcon?: string;
  animationPopup?: boolean;
  arrowIcon?: boolean;
  loading?: boolean;
  textSize?: number;
  btnType?: string;
  imgIcon?: boolean;
  unclickable?: boolean;
  hover?: boolean;
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
  customIcon = "",
  animationPopup = false,
  arrowIcon,
  loading = false,
  textSize,
  btnType = "",
  imgIcon,
  unclickable,
  hover = true,
}: IProps) {
  return (
    <button
      type="submit"
      onClick={() => click !== undefined && click()}
      className={
        pressed !== undefined
          ? pressed
            ? animationPopup
              ? `btn-style-3 btn animation-popup`
              : `btn-style-3 btn`
            : animationPopup
            ? `btn-style-2 btn animation-popup`
            : `btn-style-2 btn`
          : animationPopup
          ? `btn-style-${btnStyle} btn animation-popup`
          : `btn-style-${btnStyle} btn`
      }
      style={{
        cursor: unclickable ? "not-allowed" : "pointer",
        minWidth: btnWidth,
        minHeight: btnHeight,
        background: color,
        color: textColor,
        fontSize: textSize,
        border: "none",
      }}
    >
      {imgIcon ? (
        <>
          {pressed ? (
            <img
              style={{ width: "35px", height: "35px" }}
              className="left-icon"
              src={ImgBoxBlue}
              alt=""
            />
          ) : (
            <img
              style={{ width: "35px", height: "35px" }}
              className="left-icon"
              src={ImgBoxBlack}
              alt=""
            />
          )}
        </>
      ) : (
        <>
          {bookIcon &&
            (pressed ? (
              <img className="left-icon" src={BookClicked} alt="" />
            ) : (
              <img className="left-icon" src={Book} alt="" />
            ))}
        </>
      )}

      {customIcon && (
        <>
          {customIcon === "search" ? (
            <AiOutlineSearch className="left-icon" />
          ) : (
            <AiOutlineSearch className="left-icon" />
          )}
        </>
      )}
      {loading ? (
        <div className="center">
          <div className="loader"></div>
        </div>
      ) : (
        <>{title}</>
      )}

      {arrowIcon ? (
        <IoIosArrowForward style={{ color: "white" }} className="right-icon" />
      ) : (
        <>
          {trashIcon && pressed && (
            <img
              onClick={() => deleteIconClick && deleteIconClick()}
              className="right-icon"
              src={Trash}
              alt=""
            />
          )}
        </>
      )}
    </button>
  );
}
