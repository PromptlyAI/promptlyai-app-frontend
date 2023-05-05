import React, { useContext, useEffect, useState } from "react";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import { AppContext } from "../../context/AppContext";
import { useSearchParams } from "react-router-dom";

export default function VerifyEmail() {
  const { screenDimensions } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [verifyToken, setVerifyToken] = useState<string>();
  const [emailHasBeenVerified, setEmailHasBeenVerified] =
    useState<boolean>(false);
  useEffect(() => {
    setVerifyToken(searchParams.get("verifyToken") || "");
    verify();
  }, []);

  const verify = async () => {
    console.log("Illa: " + verifyToken);

    if (verifyToken != "") {
      setEmailHasBeenVerified(true);
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
        {
          //Check if message failed
          emailHasBeenVerified === false ? (
            <label>Email is beeing verified...</label>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <label>Your email has been verified</label>
              <p style={{ color: "white" }}>{emailHasBeenVerified}</p>
              <StyledButton
                click={() => {
                  //login
                }}
                btnStyle={3}
                unclickable={false}
                btnWidth={screenDimensions.w > 1800 ? 200 : 120}
                btnHeight={screenDimensions.w > 1800 ? 50 : 35}
                title="Login"
                loading={false}
                textSize={screenDimensions.w > 1800 ? 25 : 15}
              />
            </div>
          )
        }
      </div>
    </div>
  );
}
