import React, { CSSProperties } from "react";
import "./popup.css";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import Logo from "../../images/PromptlyLogo.png";
interface PopupProps {
  displayPopup: boolean;
}
import { useNavigate } from "react-router";
export default function Popup(props: PopupProps) {
  const { displayPopup } = props;
  const navigate = useNavigate();

  const popupStyle: CSSProperties = {
    display: displayPopup ? "flex" : "none",
    position: "fixed",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
    backgroundColor: "rgba(81, 91, 114, 0.5)",
    
  };

  return (
    <div style={popupStyle}>
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
