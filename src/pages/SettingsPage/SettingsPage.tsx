import React, { useState, useEffect, useContext } from "react";
import Api from "../../api/Api";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import "./SettingsPage.css";
import { useNavigate } from "react-router";
import Logo from "../../images/PromptlyLogo.png";
import { AppContext } from "../../context/AppContext";

interface UserProps {
  name: string;
  email: string;
  role: string;
  id: string;
  createdAt: string;
}

export default function SettingsPage() {
  const [userInfo, setUserInfo] = useState<UserProps>();
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const { showSettings, setShowSettings } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await Api({
        path: "user/get-user-info",
        method: "GET",
        token: localStorage.getItem("token") as string,
      });
      console.log(await response);
      const data = await response;
      const user: UserProps = {
        name: data.name,
        email: data.email,
        role: data.role,
        id: data.id,
        createdAt: data.createdAt,
      };
      setUserInfo(user);
    };
    getUserInfo();
  }, []);

  function deleteAccount() {
    const deleteUser = async () => {
      const response = await Api({
        path: "user/",
        method: "DELETE",
        token: localStorage.getItem("token") as string,
      });
      console.log(await response);
      localStorage.removeItem("token");

      alert("account deleted");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    };
    deleteUser();
  }

  async function changePassword() {
    const response = await Api({
      path: "user/resetPassword",
      method: "PATCH",
      token: localStorage.getItem("token") as string,
      bodyParams: {
        newPassword: newPassword,
      },
    });
    console.log(await response);
  }

  function logout() {
    localStorage.removeItem("token");
    setShowSettings(false);
  }

  return (
    <div className="setting-page-container">
      <div className="setting-container">
        <div style={{ display: "flex" }}>
          <div className="settings-topbar">
            <img src={Logo} alt="" />
          </div>
          <StyledButton
            click={() => setShowSettings(false)}
            title="Back"
            btnWidth={240}
            btnHeight={50}
            btnStyle={3}
          />
        </div>

        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            <h1>Profile Settings</h1>
            <h2>Settings are automatically saved!</h2>
          </div>
        </div>

        <div
          style={{
            height: "",
            display: "flex",
            padding: "50px",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div className="settings-info">
            <h1 style={{ textAlign: "left", fontSize: "35px" }}>
              User Settings
            </h1>
            <div
              style={{
                display: "flex",
                width: "800px",
                gap: "20px",
              }}
            >
              <div style={{ minWidth: "180px" }}>
                <label style={{ fontSize: "35px" }} htmlFor="">
                  Username
                </label>
              </div>

              <input
                type="text"
                className="settings-input"
                value={userInfo ? userInfo.name : ""}
              />
              <StyledButton
                click={() => setShowSettings(false)}
                title="Change"
                btnWidth={140}
                btnHeight={40}
                btnStyle={3}
              />
            </div>

            <div
              style={{
                display: "flex",
                width: "500px",
                gap: "20px",
              }}
            >
              <div style={{ minWidth: "180px" }}>
                <label style={{ fontSize: "35px" }} htmlFor="">
                  Email
                </label>
              </div>
              <input
                type="text"
                className="settings-input"
                value={userInfo ? userInfo.email : ""}
              />
              <StyledButton
                click={() => setShowSettings(false)}
                title="Update"
                btnWidth={140}
                btnHeight={40}
                btnStyle={3}
              />
            </div>
          </div>
          <div>
            <StyledButton
              click={() => setShowChangePassword(true)}
              btnHeight={50}
              btnWidth={100}
              btnStyle={3}
              title="Change password"
            />
          </div>
          <div className="setting-bottom-buttons">
            <StyledButton
              click={() => logout()}
              btnWidth={250}
              btnStyle={4}
              title="Logout"
            />
            <StyledButton
              click={() => setShowWarning(true)}
              btnStyle={4}
              btnWidth={250}
              title="Delete Account"
            />
            {userInfo?.role === "ADMIN" && (
              <StyledButton
                btnStyle={4}
                btnWidth={250}
                title="Admin tools"
                click={() => {
                  navigate("/admin");
                }}
              />
            )}
          </div>
        </div>

        {/* {showChangePassword && (
          <div className="delete-warning-container">
            <div className="delete-warning">
              <h2>Change Password</h2>
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
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "20px" }} htmlFor="">
                      New password
                    </label>
                    <StyledInput
                      title={newPassword}
                      change={(ev) => setNewPassword(ev.target.value)}
                      inpHeight={20}
                      inpWidht={200}
                      inpStyle={1}
                    />
                  </div>

                  <StyledButton
                    click={() => changePassword()}
                    btnHeight={50}
                    btnStyle={3}
                    title="Change password"
                  />
                  <StyledButton
                    click={() => setShowChangePassword(false)}
                    btnStyle={5}
                    title="Back"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

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
        )} */}
      </div>
    </div>
  );
}
