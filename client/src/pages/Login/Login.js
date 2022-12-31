import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import app from "../../utils/AxiosConfig.js";
import logo from "../../assets/Header/logo.svg";
import logo2 from "../../assets/Header/logo2.svg";
import PasswordBox from "../../components/PasswordBox/PasswordBox.js";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  async function handleForgotPassword() {
    console.log(forgotPasswordEmail);
    await app
      .put(
        "/change-password-email",
        {},
        {
          headers: { email: forgotPasswordEmail },
        }
      )
      .then((res) => {
        alert("Email sent successfully.");
      })
      .catch((err) => {
        alert("No account with this email exists.");
      });
  }
  const navigate = useNavigate();
  async function onSubmit(obj) {
    app
      .post(`/login`, obj)
      .then((res) => {
        console.log(res);
        localStorage.setItem("type", res.data.type);
        localStorage.setItem("country", res.data.country);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("refresh", true);

        if (res.data.type === "admin") navigate("../admin");
        if (res.data.type === "instructor") navigate("../instructor");
        if (res.data.type === "individual") navigate("../individual-trainee");
        if (res.data.type === "corporate") navigate("../corporate-trainee");
      })
      .catch((err) => {
        alert(err.response.data);
      });
  }

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "80.5px",
          height: "100%",
          flexShrink: "0",
          width: "40%",
          minWidth: "700px",
        }}
      >
        <div style={{ marginRight: "50px" }}></div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Container
            sx={{
              display: "flex",
              marginLeft: "50px",

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
                  alignItems: "center",
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
                  style={{ minWidth: "575px" }}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <PasswordBox setPassword={setPassword}></PasswordBox>

                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#96cea8",
                    color: "white",
                    minWidth: "575px",
                  }}
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    const obj = {
                      username,
                      password,
                    };
                    onSubmit(obj);
                  }}
                >
                  login
                </Button>
                <Button
                  style={{ color: "#96cea8" }}
                  onClick={() => {
                    setForgotPassword(true);
                  }}
                >
                  Forgot your password?
                </Button>
                {forgotPassword && (
                  <>
                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-small"
                      variant="outlined"
                      label="Email"
                      placeholder="Enter your email to receive a password reset link"
                      value={forgotPasswordEmail}
                      style={{ minWidth: "575px" }}
                      onChange={(e) => {
                        setForgotPasswordEmail(e.target.value);
                      }}
                    />
                    <Button
                      onClick={handleForgotPassword}
                      style={{ color: "#96cea8" }}
                    >
                      Send Email
                    </Button>
                  </>
                )}
                <Button
                  style={{ color: "#96cea8", minWidth: "575px" }}
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Don't have an Account?
                </Button>
              </Box>
            </form>
          </Container>
        </div>
      </div>{" "}
      <div className="slanted">
        <div style={{ marginBottom: "50px" }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "300px",
              height: "200px",
              filter: "invert(100%)",
            }}
          ></img>
          <img
            src={logo2}
            alt="Logo"
            style={{
              width: "250px",
              height: "150px",
              filter: "invert(100%)",
            }}
          ></img>
        </div>
      </div>
    </div>
  );
}
export default Login;
