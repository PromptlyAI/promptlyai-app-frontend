import React, { useState } from "react";
import "./UserCard.css";
import StyledInput from "../../shared/input-styles/StyledInput";
interface IProps {
  click?: () => void;
  name: string;
  email: string;
  id: string;
  role: string;
  totalTokenBalance: number;
  isBanned: boolean;
}

export default function UserCard({
  click,
  name,
  email,
  id,
  role,
  totalTokenBalance,
  isBanned,
}: IProps) {
  return (
    <div
      onClick={() => click !== undefined && click()}
      className="user-card-container"
    >
      <h2>{name}</h2>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "0",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {isBanned ? <span>banned: true</span> : <span>banned: false</span>}
          <span>role: {role}</span>
        </div>
      </div>
    </div>
  );
}
