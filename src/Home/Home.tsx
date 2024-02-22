import React from "react";
import PromptlyApp from "../promptlyV1/PromptlyApp";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-center p-10">
        <div className="flex flex-col">
          <h1 className="text-[50px] text-black">Promply Labs</h1>
          <h2>Our sörvices:</h2>
          <button onClick={() => navigate("/prompt-grad")}>
            PromptGradient
          </button>
          <button onClick={() => navigate("/promptly")}>Promptly V1</button>
        </div>
      </div>
    </div>
  );
}
