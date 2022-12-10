import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
//import { Navigate, useNavigate } from "react-router-dom";
import {
    TextField,
    FormControl,
    InputLabel,
    FilledInput,
    InputAdornment,
    OutlinedInput,
    Button,
} from "@mui/material";
//import "./InstructorCreateCourse.css";
//import PageWrapper from "../../layouts/PageWrapper/PageWrapper";
import { Box, Container } from "@mui/system";
//import AddSubtitle from "../../components/AddSubtitle";
//import { Delete } from "@mui/icons-material";
import axios from "axios";
import updateToken from "../../utils/updateToken";

function ChangePassword() {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    //   useEffect(() => {
    //     console.log(name);
    //   }, [name]);

    const onSubmit = async (obj) => {
        if (password === repeatPassword) {
            const token = JSON.parse(
                window.localStorage.getItem("user")
            ).accessToken;
            console.log(`Bearer ${token}`);
            try {
                axios
                    .put("http://localhost:4000/change-password", obj, {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        updateToken(res);
                        console.log(res);
                    });
                // console.log("changed password");
            } catch (err) {
                console.log(err);
            }
        } else console.log("passwords don't match");
    };

    const navigate = useNavigate();
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
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        variant="outlined"
                        label="repeat password"
                        value={repeatPassword}
                        onChange={(e) => {
                            setRepeatPassword(e.target.value);
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
                            console.log(obj);
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
