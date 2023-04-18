import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import StyledInput from "../../shared/input-styles/StyledInput";
import Api from "../../api/Api";
import UserCard from "../../components/UserCard/UserCard";
import HomeButton from "../../shared/HomeButton/HomeButton";

interface UserProps {
  name: string;
  email: string;
  id: string;
  role: string;
  totalTokenBalance: number;
  isBanned: boolean;
}

export default function AdminPage() {
  const [newBalance, setNewBalance] = useState<number>();

  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<UserProps[]>();
  const [selectedUser, setSelectedUser] = useState<UserProps>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isChangingBalance, setIsChangingBalance] = useState<boolean>(false);

  async function searchUsers() {
    setIsSearching(true);
    const response = await Api({
      path: `admin/searchUsers?search=${search}`,
      method: "GET",
      token: localStorage.getItem("token") as string,
    });
    console.log(await response);
    const arr: UserProps[] = await response.map((item: any) => ({
      name: item.name,
      email: item.email,
      id: item.id,
      role: item.role,
      totalTokenBalance: item.totalTokenBalance,
      isBanned: item.isBanned,
    }));
    setUsers(arr);
    setIsSearching(false);
  }

  async function changeRole(ev: React.ChangeEvent<HTMLSelectElement>) {
    if (!selectedUser) {
      return;
    }

    console.log(ev.target.value);
    console.log(selectedUser.id);
    const response = await Api({
      path: `admin/user`,
      method: "PATCH",
      token: localStorage.getItem("token") as string,
      bodyParams: {
        id: selectedUser.id,
        role: ev.target.value,
      },
    });
    console.log(await response);
  }

  async function changeBalance() {
    if (!selectedUser) {
      return;
    }
    setIsChangingBalance(true);
    const response = await Api({
      path: `admin/changeTokenBalance`,
      method: "PATCH",
      token: localStorage.getItem("token") as string,
      bodyParams: {
        userId: selectedUser.id,
        balance: newBalance,
      },
    });
    console.log(await response);
    setIsChangingBalance(false);
  }

  async function banUser() {
    if (!selectedUser) {
      return;
    }

    const response = await Api({
      path: `admin/banUser`,
      method: "PATCH",
      token: localStorage.getItem("token") as string,
      bodyParams: {
        userId: selectedUser.id,
        banExpartionDate: new Date(2024, 3, 13),
      },
    });
    console.log(await response);
  }

  return (
    <div className="admin-container">
      <div>
        <div className="admin-tools-container">
          <div style={{ position: "absolute" }}>
            <HomeButton />
          </div>
          <h2>Admin Tools:</h2>
          <div className="search-container">
            <label>Search Users</label>
            <StyledInput
              change={(ev) => setSearch(ev.target.value)}
              title={search}
              inpStyle={1}
              inpHeight={15}
              inpWidht={200}
              scroll={false}
            />
            {/* </div> */}
            <StyledButton
              click={() => searchUsers()}
              btnStyle={3}
              title="search"
              btnHeight={40}
              btnWidth={200}
              loading={isSearching}
            />
          </div>
          <div className="center">
            <div className="user-main-container">
              {users && (
                <div className="user-container">
                  {users?.map((user) => (
                    <UserCard
                      click={() => {
                        setSelectedUser(user);
                        setNewBalance(user.totalTokenBalance);
                      }}
                      key={user.id}
                      name={user.name}
                      email={user.email}
                      id={user.id}
                      role={user.role}
                      totalTokenBalance={user.totalTokenBalance}
                      isBanned={user.isBanned}
                    />
                  ))}
                </div>
              )}
              {users && (
                <>
                  {users.length > 9 && (
                    <div className="bottom-gradient-admin"></div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedUser !== undefined && (
        <div className="info-container">
          <div className="info-elements">
            <div
              style={{ gap: "20px", display: "flex", flexDirection: "column" }}
            >
              <h1>{selectedUser.name}</h1>
              <h4>{selectedUser.email}</h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <label htmlFor="">balance</label>
                <StyledInput
                  change={(ev) => setNewBalance(parseInt(ev.target.value))}
                  title={`${newBalance}`}
                  inpStyle={1}
                  inpHeight={50}
                  inpWidht={200}
                />
                <StyledButton
                  click={() => changeBalance()}
                  btnStyle={3}
                  btnWidth={200}
                  btnHeight={40}
                  textSize={15}
                  title="CHANGE BALANCE"
                  loading={isChangingBalance}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="">Role</label>
                <select style={{ width: "100%" }} onChange={changeRole}>
                  <option value="USER">USER</option>
                  <option value="PREMIUMUSER">PREMIUM USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              {selectedUser.isBanned ? (
                <StyledButton btnStyle={3} title="UNBAN USER" />
              ) : (
                <StyledButton
                  click={() => banUser()}
                  btnStyle={4}
                  title="BAN USER"
                />
              )}
              <StyledButton
                click={() => setSelectedUser(undefined)}
                textSize={15}
                btnStyle={5}
                title="BACK"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
