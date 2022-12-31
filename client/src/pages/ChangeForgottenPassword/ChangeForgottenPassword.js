import { useLocation, useNavigate } from "react-router-dom";
import { useState, memo } from "react";
import { Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import app from "../../utils/AxiosConfig.js";
import PasswordBox from "../../components/PasswordBox/PasswordBox.js";
import logo from "../../assets/Header/logo.svg";
import logo2 from "../../assets/Header/logo2.svg";

function ChangeForgottenPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  const userId = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const onSubmit = async (obj) => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    app.get("/get-user-type", { headers: { id: userId } }).then((response) => {
      app
        .put("/change-forgotten-password", obj, {
          headers: { type: response.data, id: userId },
        })
        .then(() => {
          alert("Password changed successfully.");
          navigate("/login");
        })
        .catch((err) => {
          alert(
            "Password is too weak. Needs to be at least 10 characters long and contain at least one number, one lowercase, one uppercase letter, and one symbol."
          );
        });
    });
  };

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
                <PasswordBox setPassword={setPassword}></PasswordBox>
                <PasswordBox
                  setPassword={setConfirmPassword}
                  repeat={true}
                ></PasswordBox>

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
                      password,
                    };
                    onSubmit(obj);
                  }}
                >
                  Change Password{" "}
                </Button>
              </Box>
            </form>
          </Container>
        </div>
      </div>
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
export default memo(ChangeForgottenPassword);
