import React, { CSSProperties } from "react";
import "./popup.css";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import Logo from "../../images/PromptlyLogo.png";

import { useNavigate } from "react-router";
export default function Popup() {
  const navigate = useNavigate();

  return (
    <div className="popupStyle">
      <div className="popupContentStyle">
        <img src={Logo}></img>
        <h1>Welcome to PromptlyLabs</h1>
        <h2 style={{ cursor: "auto", color:"#fff" }}>
          Log in with your PromptlyLabs account to continue
        </h2>
        <div className="popupButtonContainer">
          <StyledButton
            btnWidth={175}
            btnHeight={40}
            click={() => {
              navigate("/login");
            }}
            btnStyle={3}
            title="Login"
          />
          <StyledButton
            btnWidth={175}
            btnHeight={40}
            click={() => {
              navigate("/register");
            }}
            btnStyle={3}
            title="Register"
          />
        </div>
      </div>
    </div>
  );
}
