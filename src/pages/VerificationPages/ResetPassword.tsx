import React, { useContext, useEffect, useState } from "react";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import { useSearchParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function ResetPassword() {
  const { screenDimensions } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [verifyToken, setVerifyToken] = useState<string>();
  const [passwordHasBeenReset, setPasswordHasBeenReset] =
    useState<boolean>(false);
  useEffect(() => {
    const token = searchParams.get("token") || "empty";
    setVerifyToken(token);
    if (token !== "empty") {
      verify();
    }
  }, []);

  const verify = async () => {
    //verifyToken
    setPasswordHasBeenReset(true);
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
          passwordHasBeenReset === false ? (
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
              <label>Your password has been reset</label>
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
