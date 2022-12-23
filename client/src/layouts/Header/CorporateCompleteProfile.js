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
<<<<<<< HEAD
import { InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useCorporateCompleteProfile from "./useCorporateCompleteProfile.js";

function CorporateCompleteProfile(props) {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const {
=======
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
>>>>>>> 78a3be8 (complete profile modals done)
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
<<<<<<< HEAD
  } = useCorporateCompleteProfile(props.Done);

  return (
    <div className="corporate-complete-container">
=======
    checkMatching,
  } = useCorporateCompleteProfile();

  return (
    <div className='corporate-complete-container'>
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
              hiddenLabel
<<<<<<< HEAD
              id="firstname"
              variant="outlined"
              label="First Name"
=======
              id='firstname'
              variant='outlined'
              label='first name'
>>>>>>> 78a3be8 (complete profile modals done)
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <TextField
              hiddenLabel
<<<<<<< HEAD
              id="lastname"
              variant="outlined"
              label="Last Name"
=======
              id='lastname'
              variant='outlined'
              label='last name'
>>>>>>> 78a3be8 (complete profile modals done)
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
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
              value={password}
=======
              hiddenLabel
              password='true'
              id='password'
              placeholder='password'
              variant='outlined'
              label='password'
              value={password}
              type='password'
>>>>>>> 78a3be8 (complete profile modals done)
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
              id='repeatPassword'
              placeholder='repeat password'
              variant='outlined'
              label='repeat password'
              type='password'
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
            <FormControl>
<<<<<<< HEAD
              <FormLabel color="success">Gender</FormLabel>
=======
              <FormLabel color='success'>Gender</FormLabel>
>>>>>>> 78a3be8 (complete profile modals done)
              <RadioGroup
                row
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <FormControlLabel
<<<<<<< HEAD
                  value="male"
                  control={<Radio color="success" />}
                  label="Male"
                />{" "}
                <FormControlLabel
                  value="female"
                  control={<Radio color="success" />}
                  label="Female"
=======
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
>>>>>>> 78a3be8 (complete profile modals done)
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
                className="btn btn-link"
                onClick={() => setShowTos(!showTos)}
                style={{ position: "relative", right: "10px" }}
              >
                Terms of Service
=======
                type='button'
                className='btn btn-link'
                onClick={() => setShowTos(!showTos)}
                style={{ right: "20px", position: "relative", right: "10px" }}
              >
                Terms Of Service
>>>>>>> 78a3be8 (complete profile modals done)
              </button>
            </div>

            {showTos && (
              <>
<<<<<<< HEAD
                <h5> Terms of Service :</h5>
=======
                <h5> Terms Of Service :</h5>
>>>>>>> 78a3be8 (complete profile modals done)
                <div style={{ height: "300px", overflowY: "scroll" }}>
                  {tos}
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
export default memo(CorporateCompleteProfile);
