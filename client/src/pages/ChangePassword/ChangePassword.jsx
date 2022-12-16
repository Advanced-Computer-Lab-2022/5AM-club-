import { useState } from "react";
//import { Navigate, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { Box, Container } from "@mui/system";

import app from "../../utils/AxiosConfig.js";

function ChangePassword() {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    //   useEffect(() => {
    //     console.log(name);
    //   }, [name]);

    const onSubmit = async (obj) => {
        if (password === repeatPassword) {
            // console.log(`Bearer ${token}`);
            try {
                app.put(`/change-password`, obj, {
                    withCredentials: true,
                }).then((res) => {
                    console.log(res);
                });
                // console.log("changed password");
            } catch (err) {
                console.log(err);
            }
        } else console.log("passwords don't match");
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
                        type="password"
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
                        type="password"
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
