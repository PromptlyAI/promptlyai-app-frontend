import React, { CSSProperties } from "react";
import "./popup.css";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
interface PopupProps {
  displayPopup: boolean;
}
import { useNavigate } from "react-router";
export default function Popup(props: PopupProps) {
  const { displayPopup } = props;
  const navigate = useNavigate();

  const popupStyle: CSSProperties = {
    display: displayPopup ? "flex" : "none",
    position: "absolute",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
    backgroundColor: "#515B72",
  };

  return (
    <div style={popupStyle}>
      <div className="popupContentStyle">
        <h1>Welcome to PromptlyLabs</h1>
        <h2 style={{ cursor: "auto" }}>
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
