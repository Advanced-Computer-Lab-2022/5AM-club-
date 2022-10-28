import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import "./InstructorCreateCourse.css";
import PageWrapper from "../../layouts/PageWrapper/PageWrapper";
function InstructorCreateCourse() {
  const [name, setName] = useState("");
  useEffect(() => {
    console.log(name);
  }, [name]);
  return (
    // <form class="mui-form">
    //   <legend>Title</legend>
    //   <TextField
    //     id="title"
    //     select
    //     label=" Course Title"
    //     //value={currency}
    //     //onChange={handleChange}
    //     helperText="Please select your category "
    //   ></TextField>
    //   <button type="submit" class="mui-btn mui-btn--raised">
    //     Submit
    //   </button>
    // </form>
    <PageWrapper>
      <div className="create">
        <input className="inp" type={"text"} placeholder="course title"></input>
        <br />
        <br />
        <input className="inp" type={"text"} placeholder="subjects "></input>
        <br />
        <br />
        <input className="inp" type={"text"} placeholder="price"></input>
        <br />
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          placeholder="Small"
          variant="outlined"
          label="name"
          size="small"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            // name = e.target.value;
          }}
        />
      </div>
    </PageWrapper>
  );
}
export default InstructorCreateCourse;
