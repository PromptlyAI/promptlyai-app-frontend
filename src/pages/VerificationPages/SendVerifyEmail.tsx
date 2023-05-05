import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import { useSearchParams } from "react-router-dom";

export default function SendVerifyEmail() {
  const { screenDimensions } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState<string>();
  useEffect(() => {
    setEmail(searchParams.get("email") || "");
  }, []);

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
        <label>
          You need to verify your email to use PromptlyLabs. An email has been
          sent to: 
        </label>
        <label>{email}</label>
      </div>
    </div>
  );
}
