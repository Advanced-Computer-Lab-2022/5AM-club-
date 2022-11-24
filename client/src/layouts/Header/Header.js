import { useRef, memo } from "react";
import logo from "../../assets/Header/logo.svg";
import signup from "../../assets/Header/signup.svg";
import login from "../../assets/Header/login.svg";
import logout from "../../assets/Header/logout.svg";
import profile from "../../assets/Header/profile.svg";
import search from "../../assets/Header/search.svg";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Header() {
  const token = useSelector((state) => state.token.value);

  const navigate = useNavigate();

  const searchRef = useRef();

  function handleSignup() {
    // TODO: set token in redux store
    // TODO: save token in local storage
  }
  function handleLogin() {
    // TODO: set token in redux store
    // TODO: save token in local storage
  }
  function handleLogout() {
    // TODO: remove token from redux store
    // TODO: remove token from local storage
  }
  function handleProfile() {}
  function handleSearch() {
    navigate((token ? "/" + token.type : "") + "/courses", {
      state: { searchItem: searchRef.current.value },
    });
  }
  function handleEnter(e) {
    if (e.key === "Enter") {
      navigate((token ? "/" + token.type : "") + "/courses", {
        state: { searchItem: searchRef.current.value },
      });
    }
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
          onKeyUp={handleEnter}
        ></input>
        <img
          src={search}
          alt="search"
          onClick={handleSearch}
          className="search"
        ></img>
      </div>
      {!token && (
        <div className="signup-login">
          <img src={signup} alt="signup" onClick={handleSignup}></img>
          <img src={login} alt="login" onClick={handleLogin}></img>
        </div>
      )}

      {token && (
        <div className="logout-profile">
          <img src={logout} alt="logout" onClick={handleLogout}></img>
          <img src={profile} alt="profile" onClick={handleProfile}></img>
        </div>
      )}
    </div>
  );
}
export default memo(Header);
