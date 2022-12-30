import { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import countries from "../../utils/Countries.json";
import axios from "axios";
import "./InstructorCreateCourse.css";
import { Box, Container } from "@mui/system";
import app from "../../utils/AxiosConfig.js";
import Card from "react-bootstrap/Card";
import convert from "../../utils/CurrencyConverter";

function InstructorCreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [subjects, setSubjects] = useState("");
  const [video_preview, setVideo_preview] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (obj) => {
    try {
      app.post("/instructor/create-course", { ...obj }).then((response) => {
        navigate("/instructor/my-courses/edit-course", {
          state: { id: response.data._id },
        });
      });
    } catch (error) {}
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        className="card course-details-border-success"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "60px",
          marginBottom: "50px",
          width: "650px",
        }}
      >
        <Card.Body
          className="course-details-card-body"
          style={{ paddingTop: "0px" }}
        >
          <Container sx={{ display: "grid", placeItems: "center" }}>
            <form style={{ width: "100%" }}>
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <h1>Create Course</h1>
                </div>
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
                  placeholder="Subject 1,Subject 2,Subject 3...etc"
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
                  placeholder="Preview Video URL"
                  variant="outlined"
                  label="Course Preview Video"
                  value={video_preview}
                  onChange={(e) => {
                    setVideo_preview(e.target.value);
                  }}
                />

                <TextField
                  id="outlined-adornment-amount"
                  value={amount}
                  type="number"
                  placeholder={
                    "Price in " +
                    (countries[
                      Object.keys(countries).find(
                        (e) => e === localStorage.getItem("country")
                      )
                    ]
                      ? countries[
                          Object.keys(countries).find(
                            (e) => e === localStorage.getItem("country")
                          )
                        ]
                      : "USD")
                  }
                  sx={{ borderColor: "green" }}
                  onChange={(e) => {
                    if (e.target.value < 0) {
                      e.target.value = 0;
                    }
                    setAmount(e.target.value);
                  }}
                  label="Course Price"
                />
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

                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "#96cea8",
                    color: "white",
                    width: "100%",
                  }}
                  onClick={async (e) => {
                    e.preventDefault();
                    if (
                      video_preview?.match(
                        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
                      )
                    ) {
                      const newPrice = await convert(
                        amount,
                        localStorage.getItem("country"),
                        "United States"
                      );
                      axios
                        .get(
                          "https://www.youtube.com/oembed?format=json&url=/watch?v=" +
                            video_preview.substring(
                              video_preview.lastIndexOf("=") + 1
                            )
                        )
                        .then(() => {
                          const obj = {
                            title,
                            summary: description,
                            price: newPrice,
                            subject: subjects.split(","),
                            preview_video: video_preview,
                            rating: 5,
                            views: 0,
                          };
                          onSubmit(obj);
                        })
                        .catch(() => {
                          alert("Please enter a valid youtube video url.");
                        });
                    } else alert("Please enter a valid youtube video url.");
                  }}
                  disabled={
                    title === "" ||
                    description === "" ||
                    amount === "" ||
                    subjects === "" ||
                    video_preview === ""
                  }
                >
                  Create Course
                </Button>
              </Box>
            </form>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
}
export default memo(InstructorCreateCourse);
