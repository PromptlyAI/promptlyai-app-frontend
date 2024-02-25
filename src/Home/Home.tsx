import React from "react";
import PromptlyApp from "../promptlyV1/PromptlyApp";
import { useNavigate } from "react-router";
import SmallBtn from "../shared/SmallBtn";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="flex justify-center p-10 w-[500px]">
        <div className="flex flex-col w-[100%] ">
          <h1 className="text-4xl text-black text-center w-[100%]">
            Promply Labs
          </h1>
          <span className="p-10">
            De prompts som skapas ska huvudsakligen användas i produktionsappar
            som basprompt. Första möjliga kund är skolans egna gpt. Bas-prompten
            som genereras ska säkerställa att gpt:n blir skolvänlig och inte gör
            arbeten åt elever utan istället hjälper de i sitt arbete med tips
            och coaching.
          </span>
          <h2 className="text-2xl text-center">Our sörvices:</h2>
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
