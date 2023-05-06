import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import { useSearchParams } from "react-router-dom";
import StyledInput from "../../shared/input-styles/StyledInput";
import "../LoginPage/LoginPage.css";
import Api from "../../api/Api";

export default function ForgotPassword() {
  const { screenDimensions } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    setEmail(searchParams.get("email") || "");
  }, []);

  const sendResetLink = async () => {
    if (email != "") {
      try {
        const response = await Api({
          path: `user/forgot-password`,
          method: "put",
          bodyParams:{email}
        });
        console.log("Response: " + response)
        alert("Email sent");
      } catch (error) {
        alert(error);
      }
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
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Forgot Password
        </h1>
        
        <p
          style={{
            fontSize: "18px",
            fontWeight: "500",
            color: "#fff",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Please enter your email address and we'll send you a link to reset your password.
        </p>

        <label
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#fff",
            marginBottom: "10px",
          }}
        >
          Email address
        </label>

        <input
          className="login-input"
          type="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          style={{
            fontSize: "16px",
            fontWeight: "500",
            marginBottom: "30px",
            padding: "10px",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "8px",
          }}
        />

        <StyledButton
          click={() => {
            sendResetLink();
          }}
          btnStyle={3}
          unclickable={false}
          btnWidth={screenDimensions.w > 1800 ? 200 : 120}
          btnHeight={screenDimensions.w > 1800 ? 50 : 35}
          title="Send Reset Link"
          loading={false}
          textSize={screenDimensions.w > 1800 ? 25 : 15}
        />
      </div>
    </div>
  );
}
