import React, { useState } from "react";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import "./LoginPage.css";
import StyledInput from "../../shared/input-styles/StyledInput";
import Api from "../../api/Api";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function login() {
    const response = await Api({
      path: "user/login",
      method: "POST",
      bodyParams: { email, password },
    });
    // const data = await response.json();
    localStorage.setItem("token", await response.token);
    console.log(localStorage.getItem("token"));
  }

  return (
    <div className="login-page-container">
      <div>
        <img src="" alt="" />
        <h1>Login</h1>
        <div className="login-inputs">
          <label htmlFor="">Enter email</label>
          <StyledInput
            inpStyle={1}
            title={email}
            change={(ev) => setEmail(ev.target.value)}
            inpHeight={75}
            inpWidht={150}
          />
          <label htmlFor="">Enter password</label>
          <StyledInput
            inpStyle={1}
            title={password}
            change={(ev) => setPassword(ev.target.value)}
            inpHeight={75}
            inpWidht={150}
          />
          <StyledButton click={() => login()} btnStyle={2} title="Login" />
        </div>
      </div>
    </div>
  );
}
