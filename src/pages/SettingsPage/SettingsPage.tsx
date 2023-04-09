import React, { useState, useEffect } from "react";
import Api from "../../api/Api";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import "./SettingsPage.css";
import HomeButton from "../../shared/HomeButton/HomeButton";
interface User {
  name: string;
  password: string;
}

export default function SettingsPage() {
  const [userInfo, setUserInfo] = useState<User>();
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    console.log(localStorage.getItem("token"));
    setToken(localStorage.getItem("token") as string);
    // const getUserInfo = async () => {
    //     const response = await Api({
    //         path: "user/get-user-info",
    //         method: "GET"
    //       });
    // }
  }, []);

  function deleteAccount() {
    const deleteUser = async () => {
      const response = await Api({
        path: "user/",
        method: "DELETE",
        token: token,
      });
      console.log(await response);
      localStorage.removeItem("token");
    };
    deleteUser();
  }

  return (
    <div className="setting-page-container">
      <div style={{ position: "absolute", left: "100px", top: "20px" }}>
        <HomeButton />
      </div>
      <div
        style={{
          height: "200px",
          display: "flex",
          padding: "50px",
          flexDirection: "column",
          gap: "100px",
        }}
      >
        <h2>[name]</h2>
        <StyledButton
          click={() => setShowWarning(true)}
          btnStyle={4}
          title="Delete Account"
        />
      </div>

      {showWarning && (
        <div className="delete-warning-container">
          <div className="delete-warning">
            <h2>Are you sure</h2>
            <h3>Do you really want to delete your account?</h3>
            <div className="center">
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  gap: "20px",
                  width: "90%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <StyledButton
                  click={() => setShowWarning(false)}
                  btnStyle={5}
                  title="Do not delete"
                />
                <StyledButton
                  click={() => deleteAccount()}
                  btnStyle={4}
                  title="Delete Account"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
