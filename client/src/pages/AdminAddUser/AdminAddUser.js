import Button from "react-bootstrap/Button";
import "./AdminAddUser.css";
import { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import proxy from "../../utils/proxy.json";
import updateToken from "../../utils/updateToken";

function AdminAddUser() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("");
    const navigate = useNavigate();

    const addUser = (event) => {
        event.preventDefault();
        if (type) {
            axios
                .post(proxy.URL + "/admin/add-" + type, {
                    username: userName,
                    password: password,
                })
                .then((response) => {
                    updateToken(response);
                    alert(response.data);
                    navigate("/admin");
                })
                .catch((err) => {
                    alert(err.response.data);
                });
        } else {
            alert("please select the type");
        }
    };
    // const user = window.localStorage.getItem("user");
    return (
        <form onSubmit={addUser}>
            <div className="margin">
                <label>User type</label>
                <select
                    id="type"
                    name="type"
                    className="form-control"
                    onChange={(event) => setType(event.target.value)}
                >
                    <option value="">Select user type </option>
                    <option value="admin">Admin</option>
                    <option value="instructor">Instructor</option>
                    <option value="corporate-trainee">Corporate Trainee</option>
                </select>
            </div>
            <div className="form-group margin">
                <label>Username</label>
                <input
                    type="String"
                    className="form-control"
                    id="userName"
                    placeholder="Enter username"
                    onChange={(event) => setUserName(event.target.value)}
                />
            </div>
            <div className="form-group margin">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>

            <Button variant="outline-success" type="submit" className="margin">
                Submit
            </Button>
        </form>
    );
}

export default memo(AdminAddUser);
