import { useState } from "react";
import logo from "../../assets/Header/logo.svg";
import signin from "../../assets/Header/signin.svg";
import login from "../../assets/Header/login.svg";
import logout from "../../assets/Header/logout.svg";
import profile from "../../assets/Header/profile.svg";
import search from "../../assets/Header/search.svg";
import "./Header.css";
function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  function handleSignin() {}
  function handleLogin() {}
  function handleLogout() {}
  function handleProfile() {}
  function handleSearch() {}
  return (
    <div className="header-container">
      <img src={logo} alt="Logo" className="logo"></img>
      <div className="searchbar">
        <input type={"text"} className="search-input"></input>
        <img
          src={search}
          alt="search"
          onClick={handleSearch}
          className="search"
        ></img>
      </div>
      {!isAuthenticated && (
        <div className="signup-login">
          <img src={signin} alt="signin" onClick={handleSignin}></img>
          <img src={login} alt="login" onClick={handleLogin}></img>
        </div>
      )}

      {isAuthenticated && (
        <div className="logout-profile">
          <img src={logout} alt="logout" onClick={handleLogout}></img>
          <img src={profile} alt="profile" onClick={handleProfile}></img>
        </div>
      )}
    </div>
  );
}
export default Header;
