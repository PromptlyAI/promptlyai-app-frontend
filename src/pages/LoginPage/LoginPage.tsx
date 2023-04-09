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

  async function login() {
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

  return (
    <div className="login-page-container">
      <div className="login-page">
        <div>
          <div className="center">
            <img className="logo" src={Logo} alt="" />
          </div>
          <div className="login-inputs">
            <h1>Login</h1>
            <div style={{ height: "25px" }}>
              {loginFailed && (
                <span style={{ color: "red" }}>Invalid email or password</span>
              )}
            </div>

            <div style={{ display: "flex", width: "200px" }}>
              <label className="login-label" htmlFor="">
                Enter email
              </label>
            </div>
            <StyledInput
              inpStyle={1}
              title={email}
              change={(ev) => setEmail(ev.target.value)}
              inpHeight={30}
              inpWidht={200}
            />
            <div style={{ display: "flex", width: "200px" }}>
              <label className="login-label" htmlFor="">
                Enter password
              </label>
            </div>
            <StyledInput
              inpStyle={1}
              title={password}
              change={(ev) => setPassword(ev.target.value)}
              inpHeight={30}
              inpWidht={200}
            />
            <div></div>
            <StyledButton
              btnWidth={175}
              btnHeight={40}
              click={() => login()}
              btnStyle={3}
              title="Login"
              loading={loading}
            />
            <Link className="register-button" to="/register">
              Don't have have an account? <br /> Sign up for PromptlyAI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
