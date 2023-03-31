import React, { useEffect, useState } from "react";
import StyledButton from "./StyledButton";

interface IProps {
  buttonsTitles: string[];
}

interface IButton {
  title: string;
  pressed: boolean;
  id: number;
}

export default function ButtonCollection({ buttonsTitles }: IProps) {
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
          btnStyle={2}
          title={btn.title}
          pressed={btn.pressed}
        />
      ))}
    </div>
  );
}
