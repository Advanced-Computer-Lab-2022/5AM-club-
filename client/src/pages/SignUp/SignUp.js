import { useNavigate } from "react-router-dom";
import { useState, memo } from "react";
import logo from "../../assets/Header/logo.svg";
import logo2 from "../../assets/Header/logo2.svg";
import "./SignUp.css";
import { TextField } from "@mui/material";
import Button from "react-bootstrap/Button";
import { Box, Container } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Modal from "react-bootstrap/Modal";
import useModalData from "./useModalData.js";
import app from "../../utils/AxiosConfig.js";
import { InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { show, onClickShow, onClickHide, content } = useModalData();

  const onSubmit = async (obj) => {
    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    app
      .post("/signUp", obj)
      .then((res) => {
        if (res.status === 200) {
          alert("Account created successfully. Proceed to login.");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 405) {
          alert("Username already exists.");
          return;
        } else if (err.response.status === 402) {
          alert(
            "Password is too weak. Needs to be at least 10 characters long and contain at least one number, one lowercase, one uppercase letter, and one symbol."
          );
          return;
        } else if (err.response.status === 406) {
          alert("Invalid email address.");
          return;
        }
      });
  };
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: "100px",
        height: "100%",
      }}
    >
      <div style={{ marginRight: "50px" }}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: "300px", height: "200px" }}
        ></img>
        <img
          src={logo2}
          alt="Logo"
          style={{ width: "250px", height: "150px" }}
        ></img>
      </div>

      <Container
        sx={{
          display: "flex",

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form style={{ width: "max(22rem,50%)" }}>
          <Box
            sx={{
              marginTop: "15px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              // justifyContent: "space-evenly",
              alignItems: "center",
              // minHeight: "50rem",
              width: "100%",
              "& > *": {
                width: "100%",
              },
            }}
          >
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              variant="outlined"
              label="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              variant="outlined"
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              variant="outlined"
              label="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              variant="outlined"
              label="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />

            <TextField
              type={showPassword ? "text" : "password"}
              id="filled-hidden-label-small"
              variant="outlined"
              label="Password"
              autoComplete="no"
              InputProps={{
                autoComplete: showPassword ? "off" : "new-password",
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    <VisibilityIcon />
                  </InputAdornment>
                ),
              }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <TextField
              type={showRepeatPassword ? "text" : "password"}
              id="filled-hidden-label-small"
              variant="outlined"
              label="Repeat Password"
              autoComplete="no"
              InputProps={{
                autoComplete: showRepeatPassword ? "off" : "new-password",
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowRepeatPassword(!showRepeatPassword);
                    }}
                  >
                    <VisibilityIcon />
                  </InputAdornment>
                ),
              }}
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
            />

            <FormControl>
              <FormLabel color="success">Gender</FormLabel>
              <RadioGroup
                row
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                {" "}
                <FormControlLabel
                  value="male"
                  control={<Radio color="success" />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio color="success" />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "25px",
              }}
            >
              <Checkbox
                color="success"
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);
                }}
              />
              <span>I accept the</span>
              <button
                type="button"
                className="btn btn-link"
                onClick={onClickShow}
                style={{ position: "relative", right: "10px" }}
              >
                Terms of Service
              </button>
            </div>
            <Button
              variant="outline-success"
              disabled={
                !acceptedTerms ||
                gender === "" ||
                username === "" ||
                password === "" ||
                email === "" ||
                firstName === "" ||
                lastName === ""
              }
              onClick={(e) => {
                e.preventDefault();
                const obj = {
                  username,
                  password,
                  email,
                  gender,
                  firstName,
                  lastName,
                };
                onSubmit(obj);
              }}
            >
              Create Account
            </Button>
          </Box>
        </form>
      </Container>

      <Modal
        size="lg"
        centered
        show={show}
        onHide={onClickHide}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <div className="tos-wrapper">
          <div className="tos-border-success">
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Terms 0f Service
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="tos">{content}</Modal.Body>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default memo(SignUp);
