import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import app from "../../utils/AxiosConfig.js";
import PasswordBox from "../../components/PasswordBox/PasswordBox.js";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

    async function handleForgotPassword() {
        await app.put(
            "/change-password-email",

            {
                headers: { email: forgotPasswordEmail },
            }
        );
    }

    async function onSubmit(obj) {
        try {
            app.post(`/login`, obj).then((res) => {
                console.log(res);
                localStorage.setItem("type", res.data.type);
                localStorage.setItem("country", res.data.country);
                localStorage.setItem("username", res.data.username);

                if (res.data.type === "admin") navigate("../admin");
                if (res.data.type === "instructor") navigate("../instructor");
                if (res.data.type === "individual")
                    navigate("../individual-trainee");
                if (res.data.type === "corporate")
                    navigate("../corporate-trainee");
            });
        } catch (err) {}
    }
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
                        alignItems: "center",
                        width: "100%",
                        "& > *": {
                            width: "100%",
                        },
                    }}
                >
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        variant="outlined"
                        label="user name"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                    <PasswordBox setPassword={setPassword}></PasswordBox>

                    <Button
                        type="submit"
                        variant="contained"
                        onClick={(e) => {
                            e.preventDefault();
                            const obj = {
                                username,
                                password,
                            };
                            onSubmit(obj);
                        }}
                    >
                        login
                    </Button>
                    <Button
                        onClick={() => {
                            setForgotPassword(true);
                        }}
                    >
                        Forgot your password?
                    </Button>
                    {forgotPassword && (
                        <>
                            <TextField
                                hiddenLabel
                                id="filled-hidden-label-small"
                                placeholder="email"
                                variant="outlined"
                                label="email"
                                value={forgotPasswordEmail}
                                onChange={(e) => {
                                    setForgotPasswordEmail(e.target.value);
                                }}
                            />
                            <Button onClick={handleForgotPassword}>
                                Send Email
                            </Button>
                        </>
                    )}
                    <Button
                        onClick={() => {
                            navigate("/signup");
                        }}
                    >
                        Don't have an Account?
                    </Button>
                </Box>
            </form>
        </Container>
    );
}
export default Login;
