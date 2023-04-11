import React from "react";
import "./UserCard.css";
interface IProps {
  name: string;
  email: string;
  id: string;
  role: string;
  totalTokenBalance: number;
  isBanned: boolean;
}

export default function UserCard({
  name,
  email,
  id,
  role,
  totalTokenBalance,
  isBanned,
}: IProps) {
  return (
    <div className="user-card-container">
      <span>name: {name}</span>
      <span>email: {email}</span>
      <span>user id: {id}</span>
      <span>role: {role}</span>
      <span>balance: {totalTokenBalance}</span>
      {isBanned ? <span>banned: true</span> : <span>banned: false</span>}
    </div>
  );
}
