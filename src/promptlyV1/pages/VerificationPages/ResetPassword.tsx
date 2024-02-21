import React, { useContext, useEffect, useState } from "react";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Api from "../../api/Api";

export default function ResetPassword() {
  const { screenDimensions } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const [verifyToken, setVerifyToken] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>("");
  const [passwordHasBeenReset, setPasswordHasBeenReset] =
    useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token") || "empty";
    setVerifyToken(token);
  }, [searchParams]);

  const resetPassword = async () => {
    if (verifyToken !== "empty" && newPassword !== "") {
      try {
        const response = await Api({
          path: `user/reset-password`,
          method: "PATCH",
          bodyParams: { token: verifyToken, newPassword: newPassword },
        });
        console.log(response);
        setPasswordHasBeenReset(true);
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
        {passwordHasBeenReset === false ? (
          <>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                marginBottom: "30px",
              }}
            >
              Reset Your Password
            </h1>
            <label
              style={{
                fontSize: "20px",
                fontWeight: "500",
                color: "#fff",
              }}
            >
              Enter your new password
            </label>
            <input
              style={{
                width: "100%",
                padding: "12px 20px",
                margin: "8px 0",
                boxSizing: "border-box",
                fontSize: "18px",
                color: "#fff",
                background: "#5d5d6a",
                border: "none",
                borderRadius: "6px",
              }}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <StyledButton
              click={resetPassword}
              btnStyle={3}
              unclickable={false}
              btnWidth={screenDimensions.w > 1800 ? 200 : 120}
              btnHeight={screenDimensions.w > 1800 ? 50 : 35}
              title="Reset Password"
              loading={false}
              textSize={screenDimensions.w > 1800 ? 25 : 15}
            />
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
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
              Password Reset Successful
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
              Your password has been successfully reset. You can now log in with
              your new password.
            </p>
            <StyledButton
              click={() => {
                navigate("/promptlyv1/login");
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
        )}
      </div>
    </div>
  );
}
