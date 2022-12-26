import { useState, memo } from "react";
import "./CorporateCompleteProfile.css";
import { TextField } from "@mui/material";
import Button from "react-bootstrap/Button";
import { Box, Container } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import { InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useCorporateCompleteProfile from "./useCorporateCompleteProfile.js";

function CorporateCompleteProfile(props) {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const {
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    gender,
    setGender,
    acceptedTerms,
    setAcceptedTerms,
    updateProfile,
    tos,
    showTos,
    setShowTos,
    match,
  } = useCorporateCompleteProfile(props.Done);

  return (
    <div className="corporate-complete-container">
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
              id="email"
              variant="outlined"
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              hiddenLabel
              id="firstname"
              variant="outlined"
              label="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <TextField
              hiddenLabel
              id="lastname"
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

            {!match && (
              <span style={{ color: "red" }}>Passwords do not match</span>
            )}
            <FormControl>
              <FormLabel color="success">Gender</FormLabel>
              <RadioGroup
                row
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio color="success" />}
                  label="Male"
                />{" "}
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
                onClick={() => setShowTos(!showTos)}
                style={{ position: "relative", right: "10px" }}
              >
                Terms of Service
              </button>
            </div>

            {showTos && (
              <>
                <h5> Terms of Service :</h5>
                <div style={{ height: "300px", overflowY: "scroll" }}>
                  {tos}
                </div>
              </>
            )}

            <Button
              type="submit"
              variant="outline-success"
              disabled={
                !acceptedTerms ||
                gender === "" ||
                password === "" ||
                email === "" ||
                firstName === "" ||
                lastName === "" ||
                !match
              }
              onClick={(e) => {
                e.preventDefault();
                const obj = {
                  password,
                  email,
                  gender,
                  firstName,
                  lastName,
                };
                if (repeatPassword !== password) {
                  alert("Passwords do not match");
                  return;
                }
                updateProfile(obj);
              }}
            >
              Update profile
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
}
export default memo(CorporateCompleteProfile);
