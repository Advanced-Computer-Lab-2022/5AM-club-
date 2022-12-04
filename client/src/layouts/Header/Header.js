import { useRef, memo } from "react";
import logo from "../../assets/Header/logo.svg";
import signup from "../../assets/Header/signup.svg";
import login from "../../assets/Header/login.svg";
import logout from "../../assets/Header/logout.svg";
import profile from "../../assets/Header/profile.svg";
import search from "../../assets/Header/search.svg";
import "./Header.css";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();

  const searchRef = useRef();

  function handleSignup() {
    navigate("signup");
  }
  function handleLogin() {
    navigate("login");
  }
  function handleLogout() {
    localStorage.clear();
    localStorage.setItem("country", "United States");
    navigate("/");
  }
  function handleProfile() {}
  function handleSearch() {
    navigate(
      (localStorage.getItem("type") === "individual" ||
      localStorage.getItem("type") === "corporate"
        ? localStorage.getItem("type") + "-trainee"
        : localStorage.getItem("type")
        ? localStorage.getItem("type")
        : "") + "/courses",
      {
        state: { searchItem: searchRef.current.value },
      }
    );
  }
  function handleEnter(e) {
    if (e.key === "Enter") {
      navigate(
        (localStorage.getItem("type") === "individual" ||
        localStorage.getItem("type") === "corporate"
          ? localStorage.getItem("type") + "-trainee"
          : localStorage.getItem("type")
          ? localStorage.getItem("type")
          : "") + "/courses",
        {
          state: { searchItem: searchRef.current.value },
        }
      );
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
      {!localStorage.getItem("type") && (
        <div className="signup-login">
          <img src={signup} alt="signup" onClick={handleSignup}></img>
          <img src={login} alt="login" onClick={handleLogin}></img>
        </div>
      )}

      {localStorage.getItem("type") && (
        <div className="logout-profile">
          <img src={logout} alt="logout" onClick={handleLogout}></img>
          <img src={profile} alt="profile" onClick={handleProfile}></img>
        </div>
      )}
    </div>
  );
}
export default memo(Header);
