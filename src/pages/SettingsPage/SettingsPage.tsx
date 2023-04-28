import React, { useState, useEffect, useContext } from "react";
import Api from "../../api/Api";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import "./SettingsPage.css";
import { useNavigate } from "react-router";
import Logo from "../../images/PromptlyLogo.png";
import { AppContext } from "../../context/AppContext";
import ProfileBar from "../../components/ProfileBar/ProfileBar";

import SettingsCollection from "../../components/SettingsCollection/SettingsCollection";


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

  const [page, setPage] = useState<string>("PROFILE");

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
        <div className="settings-sidebar">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              paddingTop: "30px",
            }}
          >
            <h1 style={{ textAlign: "center" }}>Settings</h1>
            <div className="center">
              <div
                onClick={() => setShowSettings(!showSettings)}
                className="settings-profile-picture"
              >
                {userInfo?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <div
              style={{
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StyledButton
                click={() => setShowSettings(false)}
                btnStyle={3}
                btnWidth={200}
                btnHeight={65}
                title="Back"
              />
            </div>
          </div>
          <div className="center">
            <div className="settings-button-collection">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <StyledButton

                  click={() => setPage("PROFILE")}
                  btnStyle={page === "PROFILE" ? 3 : 2}

                  btnWidth={200}
                  btnHeight={65}
                  title="Profile"
                />
                <StyledButton

                  click={() => setPage("PRIVACY")}
                  btnStyle={page === "PRIVACY" ? 3 : 2}

                  btnWidth={200}
                  btnHeight={65}
                  title="Privacy"
                />
                <StyledButton

                  click={() => setPage("PROMPT")}
                  btnStyle={page === "PROMPT" ? 3 : 2}

                  btnWidth={200}
                  btnHeight={65}
                  title="Prompt"
                />
                <StyledButton

                  click={() => setPage("BILLING")}
                  btnStyle={page === "BILLING" ? 3 : 2}

                  btnWidth={200}
                  btnHeight={65}
                  title="Billing"
                />
              </div>
              <div className="settings-bottom-collection">
                <StyledButton

                  click={() => navigate("/admin")}

                  btnStyle={4}
                  btnWidth={200}
                  btnHeight={60}
                  title="ADMIN TOOLS"
                />
                <StyledButton

                  click={() => logout()}

                  btnStyle={4}
                  btnWidth={200}
                  btnHeight={60}
                  title="Logout"
                />
              </div>
            </div>
          </div>
        </div>
        <SettingsCollection userInfo={userInfo} page={page} />

      </div>
    </div>
  );
}
