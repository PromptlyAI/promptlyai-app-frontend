import React, { useState } from "react";
import "./AdminPage.css";
import StyledButton from "../../shared/ButtonStyles/StyledButton";
import StyledInput from "../../shared/input-styles/StyledInput";
import Api from "../../api/Api";
import UserCard from "../../components/UserCard/UserCard";

interface UserProps {
  name: string;
  email: string;
  id: string;
  role: string;
  totalTokenBalance: number;
  isBanned: boolean;
}

export default function AdminPage() {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<UserProps[]>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
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
  return (
    <div className="admin-container">
      <div>
        <div className="admin-tools-container">
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
    </div>
  );
}
