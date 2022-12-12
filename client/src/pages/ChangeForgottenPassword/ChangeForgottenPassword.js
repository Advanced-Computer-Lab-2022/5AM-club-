import { useLocation, useNavigate } from "react-router-dom";
import { useState, memo } from "react";
import { TextField, Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import app from "../../utils/AxiosConfigs.js";

function ChangeForgottenPassword() {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  const userId = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const onSubmit = async (obj) => {
    app.get("/get-user-type", { headers: { id: userId } }).then((response) => {
      app
        .put("/change-password", obj, {
          headers: { type: response.data, id: userId },
        })
        .then(() => {
          navigate("/login");
        });
    });
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
                password,
              };
              onSubmit(obj);
            }}
          >
            Submit{" "}
          </Button>
        </Box>
      </form>
    </Container>
  );
}
export default memo(ChangeForgottenPassword);
