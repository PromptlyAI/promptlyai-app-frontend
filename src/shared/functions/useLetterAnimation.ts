import React, { useEffect, useState } from "react";

export default function useLetterAnimation(text: string, ms: number) {
  const [titleDescription, setTitleDescription] = useState<string>("");
  const timeoutIdRef = React.useRef<number | undefined>(undefined);

  useEffect(() => {
    let i = 0;

    const revealNext = () => {
      if (i < text.length - 1 && titleDescription.length < 2) {
        const newText = text.slice(0, i) + "|";
        setTitleDescription(newText);
        i++;

        timeoutIdRef.current = setTimeout(revealNext, ms);
      } else {
        setTitleDescription(text);
      }
    };

    timeoutIdRef.current = setTimeout(revealNext, 1000);

    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, [text, ms]);

  return titleDescription;
}