import React, { useEffect } from "react";
import Logo from "../../images/PromptlyLogo.png";
import "./IntroPage.css";
import { useNavigate } from "react-router";
export default function IntroPage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/promptly/");
    }, 3000);
  }, []);
  return (
    <div className="intro-container">
      <img className="logo-intro" src={Logo} alt="" />
    </div>
  );
}
