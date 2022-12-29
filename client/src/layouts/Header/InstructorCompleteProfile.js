import { memo, useState } from "react";
import "./InstructorCompleteProfile.css";
import { TextField } from "@mui/material";
import Button from "react-bootstrap/Button";
import { Box, Container } from "@mui/system";
import { InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Checkbox from "@mui/material/Checkbox";
import useInstructorCompleteProfile from "./useInstructorCompleteProfile.js";

function InstructorCompleteProfile(props) {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const {
    email,
    setEmail,
    acceptedTerms,
    setAcceptedTerms,
    acceptedContract,
    setAcceptedContract,
    updateProfile,
    tos,
    showTos,
    setShowTos,
    contract,
    showContract,
    setShowContract,
    match,
  } = useInstructorCompleteProfile(props.Done);

  return (
    <div className='instructor-complete-container'>
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
              id='email'
              variant='outlined'
              label='Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              type={showPassword ? "text" : "password"}
              id='filled-hidden-label-small'
              variant='outlined'
              label='Password'
              autoComplete='no'
              InputProps={{
                autoComplete: showPassword ? "off" : "new-password",
                endAdornment: (
                  <InputAdornment
                    position='end'
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
              id='filled-hidden-label-small'
              variant='outlined'
              label='Repeat Password'
              autoComplete='no'
              InputProps={{
                autoComplete: showRepeatPassword ? "off" : "new-password",
                endAdornment: (
                  <InputAdornment
                    position='end'
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "25px",
              }}
            >
              <Checkbox
                color='success'
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);
                }}
              />
              <span>I accept the</span>
              <button
                type='button'
                class='btn btn-link'
                onClick={() => setShowTos(!showTos)}
                style={{ position: "relative", right: "10px" }}
              >
                Terms Of Service
              </button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "25px",
              }}
            >
              <Checkbox
                color='success'
                onChange={(e) => {
                  setAcceptedContract(e.target.checked);
                }}
              />
              <span>I accept the</span>
              <button
                type='button'
                class='btn btn-link'
                onClick={() => setShowContract(!showContract)}
                style={{ position: "relative", right: "10px" }}
              >
                Contract
              </button>
            </div>
            {showTos && (
              <>
                <h5>Terms of Service :</h5>
                <div style={{ height: "300px", overflowY: "scroll" }}>
                  {tos}
                </div>
              </>
            )}

            {showContract && (
              <>
                <h5> Contract :</h5>
                <div style={{ height: "300px", overflowY: "scroll" }}>
                  {contract}
                </div>
              </>
            )}
            <Button
              type='submit'
              variant='outline-success'
              disabled={
                !acceptedTerms ||
                !acceptedContract ||
                password === "" ||
                email === "" ||
                !match
              }
              onClick={(e) => {
                e.preventDefault();
                const obj = {
                  password,
                  email,
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
export default memo(InstructorCompleteProfile);
