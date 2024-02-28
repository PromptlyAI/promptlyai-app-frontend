import React from "react";
import PromptlyApp from "../promptlyV1/PromptlyApp";
import { useNavigate } from "react-router";
import SmallBtn from "../shared/ui/SmallBtn";
import useLetterAnimation from "../shared/functions/useLetterAnimation";
import titleDescription from "./titleDescription";
import TextBox from "../shared/ui/TextBox";
import BarBtn from "../shared/ui/BarBtn";
import BottomBar from "./components/BottomBar";

export default function Home() {
  const navigate = useNavigate();
  const desciption = useLetterAnimation(titleDescription(), 12);

  return (
    <div className="flex justify-center h-[100vh] relative">
      <div className="flex justify-center p-10 w-[500px]">
        <div className="flex flex-col w-[100%] ">
          <h1 className="text-4xl text-black w-[100%] font-title slide-in-left ">
            Promptly Labs
          </h1>
          <h1 className="text-1xl text-black w-[100%] font-title pb-3 slide-in-left">
            Promptly modululus
          </h1>

          <span className="flex h-52 mt-5 mb-5 text-black">{desciption}</span>
          {/* <h2 className="text-xl text-black">Our Services:</h2> */}
          <div className="flex flex-col gap-5 justify-around pt-2">
            <BarBtn title="Prompt Grad" />
            <BarBtn title="Promptly" />
            {/* <TextBox
              func={() => navigate("/prompt-grad")}
              title="Prompt Gradient"
              description="modululus lulus modululus lulus modululus lulus modululus lulus modululus lulus modululus lulus"
            />
            <TextBox
              func={() => navigate("/promptly")}
              title="Promptly"
              description="modululus lulus modululus lulus modululus lulus modululus lulus modululus lulus modululus lulus"
            /> */}

            {/* <SmallBtn
              text="PromptGradient"
              func={() => navigate("/prompt-grad")}
            />
            <SmallBtn text="Promptly" func={() => navigate("/promptly")} /> */}
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
