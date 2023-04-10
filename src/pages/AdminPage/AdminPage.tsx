import React, { useState } from "react";
import "./AdminPage.css";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import StyledInput from "../../shared/input-styles/StyledInput";

export default function AdminPage() {
  const [search, setSearch] = useState<string>("");
  return (
    <div className="admin-container">
      <div>
        <h1>Admin</h1>
        <div className="admin-tools-container">
          <h2>Admin Tools:</h2>
          <div className="search-container">
            <div>
              <label>Search Users</label>
              <StyledInput
                change={(ev) => setSearch(ev.target.value)}
                title={search}
                inpStyle={1}
                inpHeight={15}
                inpWidht={200}
                scroll={false}
              />
            </div>
            <StyledButton
              btnStyle={3}
              title="search"
              btnHeight={40}
              btnWidth={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
