export default function runTextAnimation(
  finalString: string,
  setState: React.Dispatch<React.SetStateAction<string>>,
  textSpeed: number
) {
  let i = 0;
  return new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      if (i >= finalString.length) {
        clearInterval(interval);
        setState(finalString);
        resolve();
        return;
      }

      const newString = finalString.slice(0, i + 1) + "|";
      setState(newString);
      i++;
    }, textSpeed);
  });
}
