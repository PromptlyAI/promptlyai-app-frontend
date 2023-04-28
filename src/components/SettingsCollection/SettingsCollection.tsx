import React, { useEffect, useState } from "react";
import "./SettingsCollection.css";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import UpgradeButton from "../UpgradeSection/UpgradeSection";

interface UserProps {
  name: string;
  email: string;
  role: string;
  id: string;
  createdAt: string;
}

interface IProps {
  userInfo?: UserProps;
  page?: string;
}

export default function SettingsCollection({ page, userInfo }: IProps) {
  const [date, setDate] = useState<string>("");
  const [plan, setPlan] = useState<string>("");

  useEffect(() => {
    if (userInfo !== undefined) {
      getTimeAgo();
      if (userInfo.role === "USER") {
        setPlan("Free");
      } else {
        setPlan("Premium");
      }
    }
  }, [userInfo]);

  function getTimeAgo() {
    if (userInfo?.createdAt !== undefined) {
      const futureDate = new Date(Date.parse(userInfo?.createdAt));
      const currentDate = new Date();
      const diffInMs = futureDate.getTime() - currentDate.getTime();
      const diffInDays = Math.floor((diffInMs * -1) / (1000 * 60 * 60 * 24));
      setDate(diffInDays.toString());
    }
  }

  return (
    <div className="main-settings-collection">
      {page === "PROFILE" && (
        <>
          <div>
            <h1 className="settings-title">Profile Settings</h1>
            <div className="profile-settings-collection">
              <label>Username</label>
              <input
                className="settings-input"
                type="text"
                value={userInfo?.name}
              />
              <StyledButton
                click={() => {}}
                btnStyle={2}
                btnWidth={200}
                btnHeight={40}
                unclickable={true}
                title="Change"
              />
            </div>
          </div>
          <div className="joined-date">
            <span> You joined PromptlyLabs {date} days ago</span>
          </div>
        </>
      )}
      {page === "PRIVACY" && (
        <>
          <div>
            <h1 className="settings-title">Privacy Settings</h1>
            <div></div>

            <div className="profile-privacy-collection">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                }}
              >
                <div className="settings-input-row">
                  <label className="profile-label">Password</label>
                  <input className="settings-input" type="text" />
                  <StyledButton
                    click={() => {}}
                    btnStyle={2}
                    btnWidth={200}
                    btnHeight={40}
                    unclickable={true}
                    title="Change"
                  />
                </div>
                <div className="settings-input-row">
                  <label className="profile-label">Email</label>
                  <input
                    className="settings-input"
                    type="text"
                    value={userInfo?.email}
                  />
                  <StyledButton
                    click={() => {}}
                    btnStyle={2}
                    btnWidth={200}
                    btnHeight={40}
                    unclickable={true}
                    title="Change"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="joined-date">
            <span> You joined PromptlyLabs {date} days ago</span>
          </div>
        </>
      )}
      {page === "PROMPT" && (
        <div style={{ height: "100%" }}>
          <h1 className="settings-title">Prompt Settings</h1>
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 className="big-settings-title">COMING SOON</h1>
          </div>
        </div>
      )}
      {page === "BILLING" && (
        <>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          >
            <h1 className="settings-title">Billing Settings</h1>
            <h2 className="settings-title">Current Plan: {plan} </h2>
            <UpgradeButton />
          </div>
        </>
      )}
    </div>
  );
}
