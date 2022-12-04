import { useNavigate } from "react-router-dom";
import { useState } from "react";
import proxy from "../../utils/proxy.json";
import { TextField, Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (obj) => {
    try {
      axios.post(proxy.URL + "/signUp", obj).then((res) => {
        window.localStorage.setItem("token", res.data.accessToken);
        navigate("../individual-trainee");
      });
    } catch (err) {}
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
              onSubmit(obj);
            }}
          >
            Create Account
          </Button>
        </Box>
      </form>
    </Container>
  );
}
export default SignUp;
