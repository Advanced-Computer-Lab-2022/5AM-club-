import { useRef, memo } from "react";
import logo from "../../assets/Header/logo.svg";
import signin from "../../assets/Header/signin.svg";
import login from "../../assets/Header/login.svg";
import logout from "../../assets/Header/logout.svg";
import profile from "../../assets/Header/profile.svg";
import search from "../../assets/Header/search.svg";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const searchRef = useRef();
  function handleSignin() {}
  function handleLogin() {}
  function handleLogout() {}
  function handleProfile() {}
  function handleSearch() {
    navigate("/" + "" + "/courses", {
      // TODO: Replace empty string with type from token, if no token then leave empty
      state: { searchItem: searchRef.current.value },
    });
  }
  return (
    <div className="header-container">
      <img
        src={logo}
        alt="Logo"
        className="logo"
        onClick={() => {
          navigate("/");
        }}
      ></img>
      <div className="searchbar">
        <input
          ref={searchRef}
          type={"text"}
          className="search-input"
          onKeyUp={handleSearch}
        ></input>
        <img
          src={search}
          alt="search"
          onClick={handleSearch}
          className="search"
        ></img>
      </div>
      {!"" && ( // Check token doesn't exist
        <div className="signup-login">
          <img src={signin} alt="signin" onClick={handleSignin}></img>
          <img src={login} alt="login" onClick={handleLogin}></img>
        </div>
      )}

      {"" && ( // Check token exists
        <div className="logout-profile">
          <img src={logout} alt="logout" onClick={handleLogout}></img>
          <img src={profile} alt="profile" onClick={handleProfile}></img>
        </div>
      )}
    </div>
  );
}
export default memo(Header);
