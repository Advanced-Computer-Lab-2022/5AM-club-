import { memo, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import addUser from "../../assets/AdminHomePage/addUser.png";
import "./AddUserCard.css";
import { TextField } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import { InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import app from "../../utils/AxiosConfig.js";
import Select from "react-select";

function AddUser() {
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  const addNewUser = (event) => {
    event.preventDefault();
    console.log(type);
    if (type) {
      app
        .post("/admin/add-" + type, {
          username: userName,
          password: password,
        })
        .then((response) => {
          setShow(false);
          setType("");
          setUserName("");
          setPassword("");
          setShowPassword(false);
          alert(response.data);
        })
        .catch((err) => {
          if (err.response.status === 402) {
            alert(
              "Password is too weak. Needs to be at least 10 characters long and contain at least one number, one lowercase, one uppercase letter, and one symbol."
            );
            return;
          }
          if (err.response.status === 400) {
            alert("Username already exists.");
            return;
          }
        });
    } else {
      alert("please select the type");
    }
  };
  // const user = window.localStorage.getItem("user");

  function onClickHide() {
    setShow(false);
    setType("");
    setUserName("");
    setPassword("");
    setShowPassword(false);
  }

  return (
    <>
      <Card
        onClick={() => setShow(true)}
        sx={{
          height: "100px",
          width: "537px",
        }}
        className="card-hover-green"
      >
        <CardActionArea
          style={{
            display: "flex",
            WebkitJustifyContent: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "row",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <img height="100" width="150" src={addUser} alt="add user" />

          <Typography gutterBottom variant="h4" component="div">
            Add New User
          </Typography>
        </CardActionArea>
      </Card>
      <Modal
        size="lg"
        centered
        show={show}
        onHide={onClickHide}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <div className="tos-wrapper" style={{ width: "100%" }}>
          <div className="tos-border-success" style={{ width: "100%" }}>
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Add New User
              </Modal.Title>
            </Modal.Header>

            <Modal.Body
              className="tos"
              style={{
                height: "fit-content",
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <form
                onSubmit={addNewUser}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    className="margin"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <label style={{ fontSize: "25px" }}>User type : </label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      onChange={(event) => setType(event.value)}
                      isClearable={false}
                      isSearchable={false}
                      name="color"
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: "#A6D6B5",
                          primary: "#96cea8",
                        },
                      })}
                      options={[
                        {
                          value: "corporate-trainee",
                          label: "Corporate Trainee",
                        },
                        { value: "instructor", label: "Instuctor" },
                        { value: "admin", label: "Admin" },
                      ]}
                      placeholder="Select User Type"
                    />
                  </div>
                  <div
                    className="form-group margin"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <label style={{ fontSize: "25px" }}>Username : </label>
                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-small"
                      style={{ height: "50px" }}
                      variant="outlined"
                      label="Username"
                      onChange={(event) => setUserName(event.target.value)}
                    />
                  </div>
                  <div
                    className="form-group margin "
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <label style={{ fontSize: "25px" }}>Password</label>
                    <TextField
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
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      marginTop: "20px",
                    }}
                  >
                    <button
                      className="btn btn-outline-success !important"
                      disabled={!(userName && password && type)}
                      style={{ display: "block" }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </form>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default memo(AddUser);
