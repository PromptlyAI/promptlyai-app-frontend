import React from "react";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router";
import "./HomeButton.css";
export default function HomeButton() {
  const navigate = useNavigate();
  return <AiFillHome className="home-btn" onClick={() => navigate("/")} />;
}
