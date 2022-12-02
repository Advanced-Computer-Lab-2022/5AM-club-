import { useState, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import proxy from "../../utils/proxy";
import axios from "axios";
import Card from "react-bootstrap/Card";
import MuiCard from "@mui/material/Card";
import Button from "react-bootstrap/Button";
import TableContainer from "./TableContainer";
import "./CourseContainer.css";
import { formatTime } from "../../utils/Helpers";
import countries from "../../utils/Countries.json";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ReviewContainer from "../../components/ReviewContainer/ReviewContainer";

function CourseContainer(props) {
  const navigate = useNavigate();
  console.log(props.course);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [editable, setEditable] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        proxy.URL + "/instructor/edit-personal-info",
        { rating: rating, review: review },
        {
          headers: { id: localStorage.getItem("id") },
        }
      )
      .then((res) => {
        alert("Your review has been saved");
      })
      .catch((err) => {});
  };
  return (
    <Card border="dark" className="card">
      <Card.Body>
        <Card.Title>{props.course.title}</Card.Title>
        <Card.Text>{props.course.summary}</Card.Text>
        <div className="attribute">
          Created By:{" "}
          {props.course.instructor.map(
            (instructor) => instructor.username + " "
          )}
        </div>
        <div className="attribute">
          Total hours: {formatTime(props.course.minutes)}
        </div>
        {localStorage.getItem("type") !== "corporate" && props.owned !== true && (
          <div className="attribute">
            Price:{" "}
            {props.promotion &&
            new Date(props.promotion.deadline) > new Date() ? (
              <>
                <span className="scratched">{props.course.price} </span>
                <span>
                  {(props.course.price * (100 - props.promotion.percentage)) /
                    100 +
                    (" " +
                      countries[
                        Object.keys(countries).find(
                          (e) => e === localStorage.getItem("country")
                        )
                      ])}
                </span>
                <span className="red">
                  (-{props.promotion.percentage}% till{" "}
                  {new Date(props.promotion.deadline).toDateString()})
                </span>
              </>
            ) : (
              <>
                {props.course.price +
                  (" " +
                    countries[
                      Object.keys(countries).find(
                        (e) => e === localStorage.getItem("country")
                      )
                    ])}
              </>
            )}
          </div>
        )}
        {localStorage.getItem("type") === "individual" && !props.owned && (
          <Button variant="outline-success">BUY NOW</Button>
        )}
        {props.owned && (
          <Button
            variant="outline-success"
            onClick={() => {
              navigate("take-course", {
                state: {
                  courseId: props.course._id,
                  traineeId: localStorage.getItem("id"),
                },
              });
            }}
          >
            Go to course
          </Button>
        )}
        {props.owned === true && <div className="attribute">Progress: 0%</div>}
        <div className="attribute"> Content: </div>
        <TableContainer title={"Subtitles"} elements={props.subtitles} />
        <Card className="reviewCard">
          <Button
            variant="outline-success"
            className="topRight"
            onClick={() => {}}
          >
            View all reviews
          </Button>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center" }}
          >
            Average Course Rating:{" "}
            {props.course.courseRating && (
              <Rating
                name="read-only"
                defaultValue={parseFloat(props.course.courseRating)}
                size="meduim"
                sx={{
                  color: "success.main",
                }}
                precision={0.1}
                readOnly
              />
            )}
            {" (" + props.course.courseRating + ") "}
          </Typography>
          <Typography variant="h6">Reviews: </Typography>
          {props.course.userReviews.length <= 2 ? (
            props.course.userReviews.map((userReview, i) => (
              <ReviewContainer key={i} userReview={userReview} />
            ))
          ) : (
            <>
              <ReviewContainer
                key={props.course.userReviews[0]}
                userReview={props.course.userReviews[0]}
              />
              <ReviewContainer
                key={props.course.userReviews[1]}
                userReview={props.course.userReviews[1]}
              />
            </>
          )}
          <MuiCard sx={{ m: 2, p: 2 }}>
            <h4> Your Review</h4>
            <Box
              component="form"
              fullWidth
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <h5>Rating: </h5>
              <Rating
                name="read-only"
                defaultValue={rating}
                size="meduim"
                sx={{
                  color: "success.main",
                }}
                precision={0.5}
              />
              <h5>Review:</h5>
              <TextField
                size="small"
                fullWidth
                multiline
                id="email"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </Box>
          </MuiCard>
          <Button
            variant="outline-success"
            className="bottomRight"
            onClick={() => {
              navigate("view-course-reviews", {
                state: { course: props.course },
              });
            }}
          >
            Add review
          </Button>
        </Card>
      </Card.Body>
    </Card>
  );
}

export default memo(CourseContainer);
