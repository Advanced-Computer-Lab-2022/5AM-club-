import { useState, memo } from "react";
import "./InstructorCompleteProfile.css";
import { TextField } from "@mui/material";
import Button from "react-bootstrap/Button";
import { Box, Container } from "@mui/system";
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
    checkMatching,
  } = useInstructorCompleteProfile();

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
              label='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              hiddenLabel
              password='true'
              id='password'
              type='password'
              placeholder='password'
              variant='outlined'
              label='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <TextField
              hiddenLabel
              password='true'
              type='password'
              id='repeat-password'
              placeholder='repeat password'
              variant='outlined'
              label='repeat password'
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
              onBlur={(e) => {
                checkMatching();
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
                style={{ right: "20px", position: "relative", right: "10px" }}
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
                style={{ right: "20px", position: "relative", right: "10px" }}
              >
                contract
              </button>
            </div>
            {showTos && (
              <>
                <h5>Terms Of Service :</h5>
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
                email === ""
              }
              onClick={(e) => {
                e.preventDefault();
                const obj = {
                  password,
                  email,
                };
                updateProfile(obj);
                props.Done();
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
