import { useState } from "react";
//import { Navigate, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import { InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import app from "../../utils/AxiosConfig.js";

function ChangePassword(props) {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const onSubmit = async (obj) => {
    if (password === repeatPassword) {
      try {
        app
          .put(`/change-password`, obj, {
            withCredentials: true,
          })
          .then((res) => {
            alert("Password changed successfully");
            props.setShow(false);
          })
          .catch((err) => {
            alert(
              "Password is too weak. Needs to be at least 10 characters long and contain at least one number, one lowercase, one uppercase letter, and one symbol."
            );
          });
      } catch (err) {}
    } else alert("Passwords don't match");
  };

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

          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#96cea8", color: "white" }}
            onClick={(e) => {
              e.preventDefault();
              const obj = {
                password,
              };
              onSubmit(obj);
            }}
          >
            Change Password
          </Button>
        </Box>
      </form>
    </Container>
  );
}
export default ChangePassword;
