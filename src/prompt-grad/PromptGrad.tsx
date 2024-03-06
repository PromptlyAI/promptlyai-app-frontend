import React from "react";
import "./PromptGrad.css";
import Toolbar from "./components/Toolbar";
import GradInput from "./components/GradInput";

export default function PromptGrad() {
  //älgarna protesterar. älgarna har fått nog. älgarna är arga. älgarna är trötta. älgarna är hungriga. älgarna är ledsna. älgarna är glada. älgarna är förvirrade. älgarna är rädda
  return (
    <div className="bg-white h-screen">
      <Toolbar />
      <GradInput />
    </div>
  );
}
