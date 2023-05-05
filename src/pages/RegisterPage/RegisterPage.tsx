import React, { useState } from "react";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import "./RegisterPage.css";
import StyledInput from "../../shared/input-styles/StyledInput";
import Api from "../../api/Api";
import Logo from "../../images/PromptlyLogo.png";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState<string>("");

  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  async function register(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    ev.preventDefault();
    setLoading(true);
    const registerResponse = await Api({
      path: "user/register",
      method: "POST",
      bodyParams: { name, email, password },
    });

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
    <div className="register-page-container">
      <div className="register-page">
        <div>
          <img className="logo" src={Logo} alt="" />

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
                gap: "5px",
              }}
            >
              <h1 style={{ marginBottom: "10px" }}>Register</h1>
              {loginFailed && (
                <div style={{ height: "25px" }}>
                  <span style={{ color: "red" }}>Somthing went wrong</span>
                </div>
              )}
              <div style={{ display: "flex", width: "200px" }}>
                <label className="register-label" htmlFor="">
                  Enter name
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
                  className="register-input"
                  type="text"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
              </div>

              <div style={{ display: "flex", width: "200px" }}>
                <label className="register-label" htmlFor="">
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
                  className="register-input"
                  type="text"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
              </div>

              <div style={{ display: "flex", width: "200px" }}>
                <label className="register-label" htmlFor="">
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
                  className="register-input"
                  type="password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
              </div>

              <button
                style={{
                  width: "175px",
                  height: "40px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                className="loggin-btn"
                onClick={(ev) => register(ev)}
              >
                {loading ? (
                  <div className="center">
                    <div className="loader"></div>
                  </div>
                ) : (
                  <>Register</>
                )}
              </button>
              <div>
                <label className="register-label" htmlFor="">
                  Already have an account?{" "}
                  <Link className="login-button" to="/login">
                    Login
                  </Link>
                </label>
              </div>
              <p
                style={{ color: "grey", fontSize: "20px", fontWeight: "bold" }}
              >
                By signing up you agree to our{" "}
                <a
                  className="login-button"
                  href="https://www.promptlylabs.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Privacy policy
                  </span>
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
