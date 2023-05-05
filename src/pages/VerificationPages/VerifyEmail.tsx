import React, { useContext, useEffect, useState } from "react";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import { AppContext } from "../../context/AppContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import Api from "../../api/Api";

export default function VerifyEmail() {
  const { screenDimensions } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [verifyToken, setVerifyToken] = useState<string>();
  const [emailHasBeenVerified, setEmailHasBeenVerified] =
    useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token") || "empty";
    setVerifyToken(token);

    if (token !== "empty") {
      verify();
    }
  }, []);

  const verify = async () => {
    const response = await Api({
      path: "user/verify",
      method: "put",
      bodyParams: { token: verifyToken },
    });

    if (!response.error) {
      setEmailHasBeenVerified(true);
    } else {
      alert(response.error);
    }

    setEmailHasBeenVerified(true);
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
        {
          //Check if message failed
          emailHasBeenVerified === false ? (
            <label
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#fff",
                textAlign: "center",
              }}
            >
              Verifying your email...
            </label>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <label
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Your email has been successfully verified!
              </label>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#fff",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                You can now log in and enjoy our
                services.
              </p>
              <StyledButton
                click={() => {
                  navigate("/login");
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
