import { useRef, useState } from "react";
import logo from "../../assets/Header/logo.svg";
import signin from "../../assets/Header/signin.svg";
import login from "../../assets/Header/login.svg";
import logout from "../../assets/Header/logout.svg";
import profile from "../../assets/Header/profile.svg";
import search from "../../assets/Header/search.svg";
import "./Header.css";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const searchRef = useRef();
  function handleSignin() {}
  function handleLogin() {}
  function handleLogout() {}
  function handleProfile() {}
  function handleSearch() {
    console.log(location.pathname);
    if (location.pathname.includes("individual")) {
      navigate("/individual-trainee/courses", {
        state: { searchItem: searchRef.current.value },
      });
    } else if (location.pathname.includes("corporate")) {
      console.log("ASf");
      navigate("/corporate-trainee/courses", {
        state: { searchItem: searchRef.current.value },
      });
    } else if (location.pathname.includes("admin")) {
      navigate("/admin/courses", {
        state: { searchItem: searchRef.current.value },
      });
    } else if (location.pathname.includes("instructor")) {
      navigate("/instructor/courses", {
        state: { searchItem: searchRef.current.value },
      });
    } else {
      navigate("/courses", {
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
          onSubmit={handleSearch}
        ></input>
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
