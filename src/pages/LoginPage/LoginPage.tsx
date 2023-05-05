import React, { useState } from "react";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import "./LoginPage.css";
import StyledInput from "../../shared/input-styles/StyledInput";
import Api from "../../api/Api";
import Logo from "../../images/PromptlyLogo.png";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  async function login(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    ev.preventDefault();
    setLoading(true);
    const response = await Api({
      path: "user/login",
      method: "POST",
      bodyParams: { email, password },
    });
    // const data = await response.json();

    if (response.token === undefined) {
      setLoginFailed(true);
    } else {
      setLoginFailed(false);
      localStorage.setItem("token", await response.token);
      console.log(localStorage.getItem("token"));

      setTimeout(() => {
        navigate("/loading");
      }, 1000);
    }

    setLoading(false);
  }

  async function forgotPassword() {}
  return (
    <div className="login-page-container">
      <div className="login-page">
        <div>
          <img style={{ width: "260px" }} className="logo" src={Logo} alt="" />
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <h1>Login</h1>
              {loginFailed && (
                <div style={{ height: "25px" }}>
                  <span style={{ color: "red" }}>
                    Invalid email or password
                  </span>
                </div>
              )}

              <div style={{ display: "flex", width: "200px" }}>
                <label className="login-label" htmlFor="">
                  Enter email
                </label>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <input
                  className="login-input"
                  type="text"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
              </div>

              <div style={{ display: "flex", width: "200px" }}>
                <label className="login-label" htmlFor="">
                  Enter password
                </label>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <input
                  className="login-input"
                  type="password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
              </div>
              <div>
                <label className="login-label" htmlFor="">
                  Don’t have an account?{" "}
                  <Link className="register-button" to="/register">
                    Sign up
                  </Link>
                </label>
              </div>

              <button
                style={{
                  width: "175px",
                  height: "40px",
                }}
                className="loggin-btn"
                onClick={(ev) => login(ev)}
              >
                {loading ? (
                  <div className="center">
                    <div className="loader"></div>
                  </div>
                ) : (
                  <>Login</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
