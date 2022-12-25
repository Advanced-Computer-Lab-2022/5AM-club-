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
import Modal from "react-bootstrap/Modal";
import useModalData from "./useModalData.js";
import app from "../../utils/AxiosConfig.js";
import useCorporateCompleteProfile from "./useCorporateCompleteProfile.js";

function CorporateCompleteProfile(props) {
  const {
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
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
    checkMatching,
  } = useCorporateCompleteProfile();

  return (
    <div className='corporate-complete-container'>
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
              id='firstname'
              variant='outlined'
              label='first name'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <TextField
              hiddenLabel
              id='lastname'
              variant='outlined'
              label='last name'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <TextField
              hiddenLabel
              password='true'
              id='password'
              placeholder='password'
              variant='outlined'
              label='password'
              value={password}
              type='password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <TextField
              hiddenLabel
              password='true'
              id='repeatPassword'
              placeholder='repeat password'
              variant='outlined'
              label='repeat password'
              type='password'
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
            <FormControl>
              <FormLabel color='success'>Gender</FormLabel>
              <RadioGroup
                row
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <FormControlLabel
                  value='female'
                  control={<Radio color='success' />}
                  label='Female'
                />
                <FormControlLabel
                  value='male'
                  control={<Radio color='success' />}
                  label='Male'
                />
                <FormControlLabel
                  value='other'
                  control={<Radio color='success' />}
                  label='Other'
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
                color='success'
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);
                }}
              />
              <span>I accept the</span>
              <button
                type='button'
                className='btn btn-link'
                onClick={() => setShowTos(!showTos)}
                style={{ right: "20px", position: "relative", right: "10px" }}
              >
                Terms Of Service
              </button>
            </div>

            {showTos && (
              <>
                <h5> Terms Of Service :</h5>
                <div style={{ height: "300px", overflowY: "scroll" }}>
                  {tos}
                </div>
              </>
            )}

            <Button
              type='submit'
              variant='outline-success'
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
export default memo(CorporateCompleteProfile);
