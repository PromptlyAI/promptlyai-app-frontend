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
  return (
    <div>
      {buttons.map((btn) => (
        <StyledButton title={btn.title} pressed={btn.pressed} />
      ))}
    </div>
  );
}
