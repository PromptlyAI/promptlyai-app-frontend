import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import { useSearchParams } from "react-router-dom";
import StyledInput from "../../shared/input-styles/StyledInput";
import "../LoginPage/LoginPage.css";

export default function ForgotPassword() {
  const { screenDimensions } = useContext(AppContext);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();


  const verify = async () => {
    if (email != "") {
      //send email
    }
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          padding: "50px",
          width: "663px",
          height: "511px",
          background: "#43434e",
          borderRadius: "28px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <label>Enter email</label>

        <input
          className="login-input"
          type="email"
          onChange={(ev) => setEmail(ev.target.value)}
        />

        <label>Enter new password</label>

        <input
          className="login-input"
          type="password"
          onChange={(ev) => setPassword(ev.target.value)}
        />

        <StyledButton
          click={() => {
            verify;
          }}
          btnStyle={3}
          unclickable={false}
          btnWidth={screenDimensions.w > 1800 ? 200 : 120}
          btnHeight={screenDimensions.w > 1800 ? 50 : 35}
          title="Reset"
          loading={false}
          textSize={screenDimensions.w > 1800 ? 25 : 15}
        />
      </div>
    </div>
  );
}
