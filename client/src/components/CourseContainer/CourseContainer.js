import { useEffect, useState, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import proxy from "../../utils/proxy";
import axios from "axios";
import Card from "react-bootstrap/Card";
import MuiCard from "@mui/material/Card";
import Button from "react-bootstrap/Button";
import TableContainer from "./TableContainer";
import "./CourseContainer.css";
import { formatTime, getProgress } from "../../utils/Helpers";
import countries from "../../utils/Countries.json";
import EmbeddedReviewPage from "../../components/ReviewContainer/EmbeddedReviewPage";

function CourseContainer(props) {
  const navigate = useNavigate();
  console.log(props.course);
  const [myReviews, setMyReviews] = useState({
    courseReview: {},
    instructorReview: [],
  });
  const [traineeCourse, setTraineeCourse] = useState();

  useEffect(() => {
    if (props.owned === true) {
      axios
        .get(
          proxy.URL +
            "/trainee/my-courses/" +
            props.course.id +
            "/get-my-reviews",
          { headers: { id: localStorage.getItem("id") } }
        )
        .then((res) => {
          setMyReviews(res.data);
          axios
            .get(proxy.URL + "/get-trainee-course", {
              // TODO : use token instead of id
              headers: {
                traineeId: localStorage.getItem("id"),
                courseId: props.course.id,
              },
            })
            .then((response) => {
              setTraineeCourse(response.data);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

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
        {localStorage.getItem("type") !== "corporate" &&
          props.owned !== true && (
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
        {props.owned === true && (
          <div className="attribute">
            Progress: {getProgress(traineeCourse?.progress) * 100}%
          </div>
        )}
        <div className="attribute"> Content: </div>
        <TableContainer title={"Subtitles"} elements={props.subtitles} />
        <EmbeddedReviewPage
          myReviews={myReviews}
          myReview={myReviews.courseReview}
          setMyReviews={setMyReviews}
          course={props.course}
        />
        {myReviews.instructorReview?.map(
          (instructorReview, index) =>
            Object.keys(instructorReview) !== 0 && (
              <EmbeddedReviewPage
                myReviews={myReviews}
                myReview={instructorReview}
                setMyReviews={setMyReviews}
                index={index}
                instructor={props.course.instructor[index]}
                course={props.course}
              />
            )
        )}
      </Card.Body>
    </Card>
  );
}

export default memo(CourseContainer);
