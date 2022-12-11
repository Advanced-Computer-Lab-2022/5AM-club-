import { useEffect, useState, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import app from "../../utils/AxiosConfig.js";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import TableContainer from "./TableContainer";
import "./CourseContainer.css";
import { formatTime, getProgress } from "../../utils/Helpers";
import countries from "../../utils/Countries.json";
import EmbeddedReviewPage from "../../components/ReviewContainer/EmbeddedReviewPage";

function CourseContainer(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [myReviews, setMyReviews] = useState({
    courseReview: {},
    instructorReview: [],
  });
  const [traineeCourse, setTraineeCourse] = useState();

  useEffect(() => {
    app
      .get("/trainee/my-courses/" + props.course.id + "/get-my-reviews")
      .then((res) => {
        setMyReviews(res.data);
        app
          .get("/get-trainee-course", {
            headers: {
              courseId: props.course.id,
            },
          })
          .then((response) => {
            setTraineeCourse(response.data);
          });
      })
      .catch((err) => {});

    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <Card
        border={undefined}
        className="card"
        style={{
          margin: "250px",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <Card.Body>
          <Card.Title className="course-title">{props.course.title}</Card.Title>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              overflow: "hidden",
              width: "90%",
            }}
          >
            <div style={{ display: "inline" }}>
              <iframe
                className="preview_video"
                key={props.course.preview_video?.replace("watch?v=", "embed/")}
                title="course-video"
                src={props.course.preview_video?.replace("watch?v=", "embed/")}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <div>
              <div className="attribute">
                Created By:{" "}
                {props.course.instructor.map(
                  (instructor) => instructor.username + " "
                )}
              </div>
              <div className="attribute">
                Total Length: {formatTime(props.course.minutes)}
              </div>
              {localStorage.getItem("type") !== "corporate" &&
                props.owned !== true && (
                  <div className="attribute">
                    Price:{" "}
                    {props.promotion &&
                    new Date(props.promotion.deadline) > new Date() ? (
                      <>
                        <span className="scratched">
                          {Math.floor(props.course.price + 0.5) - 0.01}
                        </span>
                        <span>
                          {(Math.floor(props.course.price + 0.5) *
                            (100 - props.promotion.percentage)) /
                            100 -
                            0.01 +
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
                        {Math.floor(props.course.price + 0.5) -
                          0.01 +
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
              {localStorage.getItem("type") === "individual" &&
                !props.owned && (
                  <Button variant="outline-success">BUY NOW</Button>
                )}
              {props.owned && location.state.displayAddReview && (
                <>
                  <Button
                    variant="outline-success"
                    onClick={() => {
                      navigate("take-course", {
                        state: {
                          courseId: props.course._id,
                        },
                      });
                    }}
                  >
                    Go to course
                  </Button>

                  <div className="attribute">
                    Progress: {getProgress(traineeCourse?.progress) * 100}%
                  </div>
                </>
              )}
            </div>
          </div>
          <Card.Text>{props.course.summary}</Card.Text>
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
                <div key={index}>
                  <EmbeddedReviewPage
                    myReviews={myReviews}
                    myReview={instructorReview}
                    setMyReviews={setMyReviews}
                    index={index}
                    instructor={props.course.instructor[index]}
                    course={props.course}
                  />
                </div>
              )
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default memo(CourseContainer);
