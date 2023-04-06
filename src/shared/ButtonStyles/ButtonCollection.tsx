import React, { useEffect, useState } from "react";
import StyledButton from "./StyledButton";

interface styleProps {
  display: string;
  flexDirection: string;
  gap: string;
}

interface IProps {
  buttonsTitles: string[];
  _styles?: styleProps;
}

interface IButton {
  title: string;
  pressed: boolean;
  id: number;
}

export default function ButtonCollection({ buttonsTitles, _styles }: IProps) {
  const [buttons, setButtons] = useState<IButton[]>([]);

  useEffect(() => {
    setButtons(
      buttonsTitles.map((btn) => ({
        title: btn,
        pressed: false,
        id: Math.random(),
      }))
    );
  }, []);

  useEffect(() => {
    console.log(buttons);
  }, [buttons]);
  function pressBtn(_id: number) {
    let arr = [...buttons];
    arr.map((btn) =>
      btn.id === _id ? (btn.pressed = !btn.pressed) : (btn.pressed = false)
    );
    setButtons(arr);
  }

  return (
    <div>
      {buttons.map((btn) => (
        <StyledButton
          click={() => {
            pressBtn(btn.id);
          }}
          btnWidth={383}
          btnHeight={63}
          btnStyle={2}
          title={btn.title}
          pressed={btn.pressed}
        />
      ))}
    </div>
  );
}
