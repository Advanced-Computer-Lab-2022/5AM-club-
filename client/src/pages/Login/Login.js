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
    await app.put(
      "/change-password-email",
      {},
      {
        headers: { email: forgotPasswordEmail },
      }
    );
  }
  const navigate = useNavigate();
  async function onSubmit(obj) {
<<<<<<< HEAD
    app
      .post(`/login`, obj)
      .then((res) => {
        console.log(res);
=======
    try {
      app.post(`/login`, obj).then((res) => {
        console.log(res.data);
>>>>>>> 78a3be8 (complete profile modals done)
        localStorage.setItem("type", res.data.type);
        localStorage.setItem("country", res.data.country);
        localStorage.setItem("username", res.data.username);
        localStorage.removeItem("refresh");
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
      <Container sx={{ display: "grid", placeItems: "center" }}>
        <form style={{ width: "max(22rem,50%)" }}>
          <Box
            sx={{
              marginTop: "15px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              alignItems: "center",
              width: "100%",
<<<<<<< HEAD
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
=======
            },
          }}
        >
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            variant='outlined'
            label='user name'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            placeholder='password'
            variant='outlined'
            label='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            type='submit'
            variant='contained'
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
                id='filled-hidden-label-small'
                placeholder='email'
                variant='outlined'
                label='email'
                value={forgotPasswordEmail}
                onChange={(e) => {
                  setForgotPasswordEmail(e.target.value);
                }}
              />
              <Button onClick={handleForgotPassword}>Send Email</Button>
            </>
          )}
          <Button
            onClick={() => {
              navigate("/signup");
            }}
          >
            Don't have an Account?
          </Button>
        </Box>
      </form>
    </Container>
>>>>>>> 78a3be8 (complete profile modals done)
  );
}
export default Login;
