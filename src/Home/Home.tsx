import React from "react";
import PromptlyApp from "../promptlyV1/PromptlyApp";
import { useNavigate } from "react-router";
import SmallBtn from "../prompt-grad/shared/smallBtn";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-center p-10">
        <div className="flex flex-col">
          <h1 className="text-[50px] text-black text-center w-[100%]">
            Promply Labs
          </h1>
          <span className="w-[500px] p-10">
            De prompts som skapas ska huvudsakligen användas i produktionsappar
            som basprompt. Första möjliga kund är skolans egna gpt. Bas-prompten
            som genereras ska säkerställa att gpt:n blir skolvänlig och inte gör
            arbeten åt elever utan istället hjälper de i sitt arbete med tips
            och coaching.
          </span>
          <h2 className="text-[25px] text-center">Our sörvices:</h2>
          <div className="p-10 flex w-[100%] justify-around">
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
