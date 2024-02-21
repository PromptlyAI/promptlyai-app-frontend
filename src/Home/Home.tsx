import React from "react";
import PromptlyApp from "../promptlyV1/PromptlyApp";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center p-10">
        <div className="flex flex-col">
          <h1 className="text-[50px] text-black">Promply Labs</h1>
          <h2>Our sörvices:</h2>

          <button>PromptGradient</button>
          <button>Promptly V1</button>
        </div>
      </div>
    </div>
  );
}
