import { memo } from "react";
import "./InstructorCompleteProfile.css";
import { TextField } from "@mui/material";
import Button from "react-bootstrap/Button";
import { Box, Container } from "@mui/system";

import Checkbox from "@mui/material/Checkbox";

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
    <div className="instructor-complete-container">
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
              password="true"
              id="password"
              type="password"
              placeholder="password"
              variant="outlined"
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onBlur={(e) => {
                checkMatching();
              }}
            />
            <TextField
              hiddenLabel
              password="true"
              type="password"
              id="repeat-password"
              placeholder="repeat password"
              variant="outlined"
              label="Repeat Password"
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
                color="success"
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);
                }}
              />
              <span>I accept the</span>
              <button
                type="button"
                class="btn btn-link"
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
                color="success"
                onChange={(e) => {
                  setAcceptedContract(e.target.checked);
                }}
              />
              <span>I accept the</span>
              <button
                type="button"
                class="btn btn-link"
                onClick={() => setShowContract(!showContract)}
                style={{ position: "relative", right: "10px" }}
              >
                Contract
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
              type="submit"
              variant="outline-success"
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
