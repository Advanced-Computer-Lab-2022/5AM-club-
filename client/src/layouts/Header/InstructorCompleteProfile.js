<<<<<<< HEAD
import { memo, useState } from "react";
=======
import { useState, memo } from "react";
>>>>>>> 78a3be8 (complete profile modals done)
import "./InstructorCompleteProfile.css";
import { TextField } from "@mui/material";
import Button from "react-bootstrap/Button";
import { Box, Container } from "@mui/system";
<<<<<<< HEAD
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
=======
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Modal from "react-bootstrap/Modal";
import useModalData from "./useModalData.js";
import app from "../../utils/AxiosConfig.js";
import useInstructorCompleteProfile from "./useInstructorCompleteProfile.js";

function InstructorCompleteProfile(props) {
  const {
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
>>>>>>> 78a3be8 (complete profile modals done)
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
<<<<<<< HEAD
  } = useInstructorCompleteProfile(props.Done);

  return (
    <div className="instructor-complete-container">
=======
    checkMatching,
  } = useInstructorCompleteProfile();

  return (
    <div className='instructor-complete-container'>
>>>>>>> 78a3be8 (complete profile modals done)
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
<<<<<<< HEAD
              id="email"
              variant="outlined"
              label="Email"
=======
              id='email'
              variant='outlined'
              label='email'
>>>>>>> 78a3be8 (complete profile modals done)
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
<<<<<<< HEAD
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
=======
              hiddenLabel
              password='true'
              id='password'
              type='password'
              placeholder='password'
              variant='outlined'
              label='password'
>>>>>>> 78a3be8 (complete profile modals done)
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
<<<<<<< HEAD

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
=======
            <TextField
              hiddenLabel
              password='true'
              type='password'
              id='repeat-password'
              placeholder='repeat password'
              variant='outlined'
              label='repeat password'
>>>>>>> 78a3be8 (complete profile modals done)
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
<<<<<<< HEAD
            />

=======
              onBlur={(e) => {
                checkMatching();
              }}
            />
>>>>>>> 78a3be8 (complete profile modals done)
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
<<<<<<< HEAD
                color="success"
=======
                color='success'
>>>>>>> 78a3be8 (complete profile modals done)
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);
                }}
              />
              <span>I accept the</span>
              <button
<<<<<<< HEAD
                type="button"
                class="btn btn-link"
                onClick={() => setShowTos(!showTos)}
                style={{ position: "relative", right: "10px" }}
=======
                type='button'
                class='btn btn-link'
                onClick={() => setShowTos(!showTos)}
                style={{ right: "20px", position: "relative", right: "10px" }}
>>>>>>> 78a3be8 (complete profile modals done)
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
<<<<<<< HEAD
                color="success"
=======
                color='success'
>>>>>>> 78a3be8 (complete profile modals done)
                onChange={(e) => {
                  setAcceptedContract(e.target.checked);
                }}
              />
              <span>I accept the</span>
              <button
<<<<<<< HEAD
                type="button"
                class="btn btn-link"
                onClick={() => setShowContract(!showContract)}
                style={{ position: "relative", right: "10px" }}
              >
                Contract
=======
                type='button'
                class='btn btn-link'
                onClick={() => setShowContract(!showContract)}
                style={{ right: "20px", position: "relative", right: "10px" }}
              >
                contract
>>>>>>> 78a3be8 (complete profile modals done)
              </button>
            </div>
            {showTos && (
              <>
<<<<<<< HEAD
                <h5>Terms of Service :</h5>
=======
                <h5>Terms Of Service :</h5>
>>>>>>> 78a3be8 (complete profile modals done)
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
<<<<<<< HEAD
              type="submit"
              variant="outline-success"
=======
              type='submit'
              variant='outline-success'
>>>>>>> 78a3be8 (complete profile modals done)
              disabled={
                !acceptedTerms ||
                !acceptedContract ||
                password === "" ||
<<<<<<< HEAD
                email === "" ||
                !match
=======
                email === ""
>>>>>>> 78a3be8 (complete profile modals done)
              }
              onClick={(e) => {
                e.preventDefault();
                const obj = {
                  password,
                  email,
                };
<<<<<<< HEAD
                if (repeatPassword !== password) {
                  alert("Passwords do not match");
                  return;
                }
                updateProfile(obj);
=======
                updateProfile(obj);
                props.Done();
>>>>>>> 78a3be8 (complete profile modals done)
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
