import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
//import { Navigate, useNavigate } from "react-router-dom";
import {
  TextField,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  OutlinedInput,
  Button,
} from "@mui/material";
//import "./InstructorCreateCourse.css";
//import PageWrapper from "../../layouts/PageWrapper/PageWrapper";
import { Box, Container } from "@mui/system";
//import AddSubtitle from "../../components/AddSubtitle";
//import { Delete } from "@mui/icons-material";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //   useEffect(() => {
  //     console.log(name);
  //   }, [name]);

  const onSubmit = async (obj) => {
    try {
      axios.post("http://localhost:4000/login", obj).then((res) => {
        console.log(res);
        window.localStorage.setItem("accessToken", res.data.accessToken);
        console.log(window.localStorage.getItem("accessToken"));
        if (res.data.type === "admin") navigate("../admin");
        if (res.data.type === "instructor") navigate("../instructor");
        if (res.data.type === "individual") navigate("../individual-trainee");
        if (res.data.type === "corporate") navigate("../corporate-trainee");
        //window.location.href = `/admin`; //to where
      });
      console.log("loging in");
      //return res;
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
              console.log(obj);
              onSubmit(obj);
            }}
          >
            login
          </Button>
          <Button href="http://localhost:4000/signup">
            Don't have an Account?
          </Button>
        </Box>
      </form>
    </Container>
  );
}
export default Login;
