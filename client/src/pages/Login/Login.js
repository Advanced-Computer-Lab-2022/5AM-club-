import { useNavigate } from "react-router-dom";
import { useState } from "react";
import proxy from "../../utils/proxy.json";
import { TextField, Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (obj) => {
    try {
      axios.post(proxy.URL + "/login", obj).then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("type", res.data.type);
        localStorage.setItem("country", res.data.country);
        if (res.data.type === "admin") navigate("../admin");
        if (res.data.type === "instructor") navigate("../instructor");
        if (res.data.type === "individual") navigate("../individual-trainee");
        if (res.data.type === "corporate") navigate("../corporate-trainee");
      });
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();
  return (
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
            "& > *": {
              width: "100%",
            },
          }}
        >
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            variant="outlined"
            label="user name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            placeholder="password"
            variant="outlined"
            label="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            type="submit"
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              const obj = {
                username,
                password,
              };
              console.log(obj);
              onSubmit(obj);
            }}
          >
            login
          </Button>
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
  );
}
export default Login;
