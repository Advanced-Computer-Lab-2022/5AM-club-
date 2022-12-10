import { useRef, memo } from "react";
import logo from "../../assets/Header/logo.svg";
import logo2 from "../../assets/Header/logo2.svg";
import logout from "../../assets/Header/logout.svg";
import profile from "../../assets/Header/profile.svg";
import search from "../../assets/Header/search.svg";
import "./Header.css";
import { useNavigate } from "react-router-dom";
function Header() {
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
            {!token && (
                <div className="signup-login">
                    <img src={signup} alt="signup" onClick={handleSignup}></img>
                    <img src={login} alt="login" onClick={handleLogin}></img>
                </div>
            )}

            {localStorage.getItem("type") && (
                <div className="logout-profile">
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
                            class="button1"
                            role="button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                        <button
                            class="button1"
                            role="button"
                            onClick={handleProfile}
                        >
                            <span class="text">Profile</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
export default memo(Header);
