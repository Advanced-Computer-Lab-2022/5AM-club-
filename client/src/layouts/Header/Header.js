import { useRef, useState, memo, useEffect } from "react";
import logo from "../../assets/Header/logo.svg";
import logo2 from "../../assets/Header/logo2.svg";
import search from "../../assets/Header/search.svg";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import app from "../../utils/AxiosConfig";
import { SelectCountry } from "../../components/SelectCountry/SelectCountry.tsx";
import { COUNTRIES } from "../../components/SelectCountry/countries.ts";
import Modal from "react-bootstrap/Modal";
import useModalData from "./useModalData";
import CorporateCompleteProfile from "./CorporateCompleteProfile";
import InstructorCompleteProfile from "./InstructorCompleteProfile";
import UpdatedSuccessfully from "./UpdatedSuccessfully";

function Header() {
  const location = useLocation();
  const { show, onClickHide, done, Done, unDone } = useModalData();
  const myRef = useRef();
  const [hovering, setHovering] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState(
    COUNTRIES.find((option) => option.title === localStorage.getItem("country"))
      .value
  );

  useEffect(() => {
    setCountry(
      COUNTRIES.find(
        (option) => option.title === localStorage.getItem("country")
      ).value
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("country")]);

  function changeCountry(val) {
    const selectedCountry = COUNTRIES.find(
      (option) => option.value === val
    ).title;
    if (localStorage.getItem("type")) {
      app.put(
        "/" +
          (localStorage.getItem("type") === "corporate" ||
          localStorage.getItem("type") === "individual"
            ? "trainee"
            : localStorage.getItem("type")) +
          "/set-country",
        {
          country: selectedCountry,
        },
        {
          headers: {
            type: localStorage.getItem("type"),
          },
        }
      );
    }
    localStorage.setItem("country", selectedCountry);
    const path = location.pathname;
    if (!show) {
      navigate(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

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
    localStorage.setItem("refresh", "true");
    navigate("/");
  }
  function handleProfile() {
    navigate(
      (localStorage.getItem("type") === "individual" ||
      localStorage.getItem("type") === "corporate"
        ? localStorage.getItem("type") + "-trainee"
        : localStorage.getItem("type")
        ? localStorage.getItem("type")
        : "") + "/my-profile"
    );
  }
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
      <div
        style={{
          display: "flex",
          width: "170px",
          WebkitFilter: hovering ? "invert(100%)" : null,
          filter: hovering ? "invert(100%)" : null,
          transition: "all 0.2s",
        }}
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}
      >
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
      </div>
      {localStorage.getItem("type") !== "admin" && (
        <div className="searchbar" tabIndex={-1}>
          <input
            ref={searchRef}
            type={"text"}
            placeholder={"Search for courses"}
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
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "auto",
          gap: "5px",
          padding: "5px",
          marginRight: "2px",
          flexShrink: 1,
          overflow: "hidden",
        }}
      >
        <SelectCountry
          id={"countries"}
          ref={myRef}
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          onChange={(val) => {
            changeCountry(val);
          }}
          selectedValue={COUNTRIES.find((option) => option.value === country)}
        />{" "}
        {localStorage.getItem("type") !== "admin" &&
          localStorage.getItem("type") && (
            <button
              className="button1"
              onClick={() => {
                navigate(
                  "/" +
                    (localStorage.getItem("type") === "individual" ||
                    localStorage.getItem("type") === "corporate"
                      ? localStorage.getItem("type") + "-trainee"
                      : localStorage.getItem("type")) +
                    "/my-courses"
                );
              }}
            >
              My Courses
            </button>
          )}
        <button
          className="button1"
          onClick={!localStorage.getItem("type") ? handleLogin : handleLogout}
        >
          {!localStorage.getItem("type") ? "Login" : "Logout"}
        </button>
        {localStorage.getItem("type") !== "admin" && (
          <button
            className="button1"
            onClick={
              !localStorage.getItem("type") ? handleSignup : handleProfile
            }
          >
            {!localStorage.getItem("type") ? "Signup" : "Profile"}
          </button>
        )}
      </div>
      <Modal
        size="lg"
        centered
        show={show}
        style={{
          backgroundColor: "#484848",
        }}
      >
        <div className="tos-wrapper">
          <div className="tos-border-success">
            <Modal.Header>
              <Modal.Title>Complete your profile</Modal.Title>
            </Modal.Header>
            <Modal.Body
              className="tos"
              style={{ maxHeight: "700px", overFlowY: "auto" }}
            >
              {done ? (
                <UpdatedSuccessfully
                  onClickHide={onClickHide}
                  unDone={unDone}
                />
              ) : localStorage.getItem("type") === "corporate" ? (
                <CorporateCompleteProfile Done={Done} />
              ) : (
                <InstructorCompleteProfile Done={Done} />
              )}
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default memo(Header);
