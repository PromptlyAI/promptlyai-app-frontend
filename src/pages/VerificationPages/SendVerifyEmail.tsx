import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import { useSearchParams } from "react-router-dom";
import Api from "../../api/Api";

export default function SendVerifyEmail() {
  const { screenDimensions } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState<string>();
  useEffect(() => {
    setEmail(searchParams.get("email") || "");
  }, []);

  const verify = async () => {
    if (email != "") {
      try {
        const response = await Api({
          path: `user/send-verify-email?email=${email}`,
          method: "put",
        });
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
            marginBottom: "20px",
          }}
        >
          Welcome to PromptlyLabs!
        </h1>

        <label
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          To get started, please verify your email address.
        </label>

        <label
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#fff",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          We have sent a verification email to:{" "}
          <span style={{ textDecoration: "underline" }}>{email}</span>
        </label>

        <label
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#fff",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Please check your inbox and click the link in the email to activate
          your account. If you did not receive the email, check your spam folder
          or click the button below to resend the verification email.
        </label>

        <button
          style={{
            background: "#6f6fb3",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "600",
            padding: "10px 20px",
            cursor: "pointer",
            border: "none",
            marginTop: "20px",
          }}
          onClick={verify}
        >
          Resend Verification Email
        </button>
      </div>
    </div>
  );
}
