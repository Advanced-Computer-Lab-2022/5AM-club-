import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  OutlinedInput,
  Button,
} from "@mui/material";
import "./InstructorCreateCourse.css";
import PageWrapper from "../../layouts/PageWrapper/PageWrapper";
import { Box, Container } from "@mui/system";
import AddSubtitle from "../../components/AddSubtitle";

const axios = require('axios')
const onSubmit=(async(e)=>{
  const res= await axios.post('localhost:3000/create-course', {
    Name: 'Fred',
    Age: '23'
  })
  return res;
}

)

  

function InstructorCreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [subjects, setSubjects] = useState("");
  const [instructor, setInstructor] = useState("");
  const [video_preview, setVideo_preview] = useState("");
  const [subtNum,setSubtNum]=useState([]);
  //   useEffect(() => {
  //     console.log(name);
  //   }, [name]);


  return (

    <PageWrapper>
      <Container sx={{display:"grid", placeItems:"center"}}>
        <form style={{width:"max(22rem,50%)" }}>
          <Box
            sx={{
              marginTop:"15px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
             // justifyContent: "space-evenly",
              alignItems: "center",
             // minHeight: "50rem",
              width: "100%",
              "& > *":{
                width: '100%'
              }
            }}
          >
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              variant="outlined"
              label="Course Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="sub1,sub2,sub3...etc"
              variant="outlined"
              label="Course Subjects"
              value={subjects}
              onChange={(e) => {
                setSubjects(e.target.value);
              }}
            />
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="Instructor1,Instructor2...etc"
              variant="outlined"
              label="Course Instructors"
              value={instructor}
              onChange={(e) => {
                setInstructor(e.target.value);
              }}
            />
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="preview video URL"
              variant="outlined"
              label="Course Preview Video"
              value={video_preview}
              onChange={(e) => {
                setVideo_preview(e.target.value);
              }}
            />

            <FormControl>
              <InputLabel htmlFor="outlined-adornment">
                Course Price
              </InputLabel>
              {/* Course Price */}
              <OutlinedInput
             // label="Course Price"
                id="outlined-adornment-amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Course Price"
              />
            </FormControl>
            <TextField
              id="filled-hidden-label-small"
              variant="outlined"
              label="Course Description"
              value={description}
              multiline
              minRows="4"
              onChange={(e) => {
                setDescription(e.target.value);
                // name = e.target.value;
              }}
            />
            <AddSubtitle />
           
            <Button type="submit" variant="contained" onClick={(e)=>{
              e.preventDefault();
              const obj={
                title, description, amount, instructor, subjects, video_preview
              }
              console.log(obj);
            }
            }>
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </PageWrapper>
  );
}
export default InstructorCreateCourse;
