import { useState, memo } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Button,
} from "@mui/material";
import "./InstructorCreateCourse.css";
import { Box, Container } from "@mui/system";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import proxy from "../../utils/proxy.json";
function InstructorCreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [subjects, setSubjects] = useState("");
  const [instructor, setInstructor] = useState("");
  const [video_preview, setVideo_preview] = useState("");
  const [subtitles, SetSubtitles] = useState([]);

  const onSubmit = async (obj) => {
    try {
      axios.post(proxy.URL + "/instructor/create-course", obj, {
        headers: {
          id: localStorage.getItem("id"),
        },
      });
    } catch (error) {}
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
            <InputLabel htmlFor="outlined-adornment">Course Price</InputLabel>
            <OutlinedInput
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
            }}
          />
          {subtitles.map((element, idx) => (
            <div
              key={"div" + idx}
              style={{
                backgroundColor: "lightgray",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "15px",
              }}
            >
              <Button
                key={"btn" + { idx }}
                style={{ maxWidth: "20px" }}
                variant="outlined"
                startIcon={<Delete style={{ color: "red", width: "20px" }} />}
                onClick={() => {
                  SetSubtitles((subtitles) => {
                    const newSubtitles = [];
                    subtitles.map((subtitle, index) => {
                      if (!(idx === index)) {
                        newSubtitles.push(subtitle);
                      }
                    });
                    return newSubtitles;
                  });
                }}
              ></Button>
              <TextField
                key={element.title + idx + 1}
                hiddenLabel
                id={element.title + idx + 1}
                variant="outlined"
                label={"Course Subtitle " + (idx + 1)}
                style={{ backgroundColor: "white" }}
                onChange={(e) => {
                  subtitles[idx].title = e.target.value;
                }}
                defaultValue={element.title}
              />
              <TextField
                hiddenLabel
                key={idx + element.description}
                id={idx + element.description}
                variant="outlined"
                label={"Course Subtitle Description " + (idx + 1)}
                style={{ backgroundColor: "white" }}
                multiline
                minRows={3}
                onChange={(e) => {
                  subtitles[idx].description = e.target.value;
                }}
                defaultValue={element.description}
              />
            </div>
          ))}
          <div id="btns" style={{ display: "flex" }}>
            <Button
              id="addSub"
              style={{
                marginRight: "auto",
                backgroundColor: "green",
                color: "white",
              }}
              onClick={() =>
                SetSubtitles([...subtitles, { title: "", description: "" }])
              }
            >
              Add Subtitle{" "}
            </Button>
            <Button
              id="removeSub"
              style={{
                marginLeft: "auto",
                backgroundColor: "red",
                color: "white",
              }}
              onClick={() => SetSubtitles(subtitles.slice(0, -1))}
            >
              remove Subtitle{" "}
            </Button>
          </div>

          <Button
            type="submit"
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              const subs = subtitles.map((sub) => sub.title);
              const subsdesc = subtitles.map((sub) => sub.description);
              const obj = {
                title,
                summary: description,
                price: amount,
                instructor: instructor.split(","),
                subject: subjects.split(","),
                video_preview,
                subtitles: subs,
                subDescriptions: subsdesc,
              };
              onSubmit(obj);
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
}
export default memo(InstructorCreateCourse);
