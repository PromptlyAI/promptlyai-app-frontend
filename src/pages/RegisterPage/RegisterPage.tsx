import React, { useState } from "react";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import "./RegisterPage.css";
import StyledInput from "../../shared/input-styles/StyledInput";
import Api from "../../api/Api";

export default function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function register() {
    const response = await Api({
      path: "user/register",
      method: "POST",
      params: { name, email, password },
    });
    console.log(response);
  }

  return (
    <div className="register-page-container">
      <div>
        <h1>Register</h1>
        <div className="register-inputs">
          <label htmlFor="">Enter username</label>
          <StyledInput
            inpStyle={1}
            title={name}
            change={(ev) => setName(ev.target.value)}
            inpHeight={75}
            inpWidht={150}
          />
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
          <StyledButton
            click={() => register()}
            btnStyle={2}
            title="Register"
          />
        </div>
      </div>
    </div>
  );
}
