import { useRef, memo } from "react";
import logo from "../../assets/Header/logo.svg";
import logo2 from "../../assets/Header/logo2.svg";
import search from "../../assets/Header/search.svg";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import app from "../../utils/AxiosConfigs";
function Header() {
  const navigate = useNavigate();

  const searchRef = useRef();

  function handleSignup() {
    navigate("/signup");
  }
  function handleLogin() {
    navigate("/login");
  }
  function handleLogout() {
    localStorage.clear();
    localStorage.setItem("country", "United States");
    app.get("/logout");
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
        style={{ cursor: "pointer", marginLeft: "10px" }}
      ></img>
      <img
        src={logo2}
        alt="Logo"
        className="logo"
        onClick={() => {
          navigate("/");
        }}
        style={{ cursor: "pointer" }}
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          padding: "5px",
          marginRight: "2px",
          marginLeft: "auto",
        }}
      >
        <button
          className="button1"
          onClick={!localStorage.getItem("type") ? handleLogin : handleLogout}
        >
          {!localStorage.getItem("type") ? "Login" : "Logout"}
        </button>
        <button
          className="button1"
          onClick={!localStorage.getItem("type") ? handleSignup : handleProfile}
        >
          {!localStorage.getItem("type") ? "Signup" : "Profile"}
        </button>
      </div>
    </div>
  );
}
export default memo(Header);
