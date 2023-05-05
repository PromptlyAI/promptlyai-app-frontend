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
        <label>You need to verify your email to use PromptlyLabs</label>
        <p style={{ color: "white" }}>{email}</p>
        <StyledButton
          click={() => {
            verify;
          }}
          btnStyle={3}
          unclickable={false}
          btnWidth={screenDimensions.w > 1800 ? 200 : 120}
          btnHeight={screenDimensions.w > 1800 ? 50 : 35}
          title="Verify"
          loading={false}
          textSize={screenDimensions.w > 1800 ? 25 : 15}
        />
      </div>
    </div>
  );
}
