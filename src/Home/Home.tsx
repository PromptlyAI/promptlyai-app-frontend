import React from "react";
import PromptlyApp from "../promptlyV1/PromptlyApp";
import { useNavigate } from "react-router";
import SmallBtn from "../shared/ui/SmallBtn";
import useLetterAnimation from "../shared/functions/useLetterAnimation";
import titleDescription from "./titleDescription";

export default function Home() {
  const navigate = useNavigate();
  const desciption = useLetterAnimation(titleDescription(), 12);

  return (
    <div className="flex justify-center">
      <div className="flex justify-center p-10 w-[500px]">
        <div className="flex flex-col w-[100%] ">
          <h1 className="text-4xl text-white w-[100%] font-title ">
            Promply Labs
          </h1>
          <h1 className="text-1xl text-description w-[100%] font-title pb-3">
            Prompty modululus
          </h1>

          <span className="flex h-52 mt-5 mb-5 text-description">
            {desciption}
          </span>
          <h2 className="text-2xl text-center text-white">Our sörvices:</h2>
          <div className="flex justify-around h-0 pt-5">
            <SmallBtn
              text="PromptGradient"
              func={() => navigate("/prompt-grad")}
            />
            <SmallBtn text="Promptly" func={() => navigate("/promptly")} />
          </div>
        </div>
      </div>
    </div>
  );
}
