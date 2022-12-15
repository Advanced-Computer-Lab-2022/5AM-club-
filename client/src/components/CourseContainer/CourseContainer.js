import { useEffect, useState, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import app from "../../utils/AxiosConfig.js";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import TableContainer from "./TableContainer";
import "./CourseContainer.css";
import { formatTime, getProgress } from "../../utils/Helpers";
import countries from "../../utils/Countries.json";
import EmbeddedReviewPage from "./EmbeddedReviewPage";

function CourseContainer(props) {
  console.log(props.course);
  const navigate = useNavigate();
  const location = useLocation();
  const [myReviews, setMyReviews] = useState({
    courseReview: {},
    instructorReview: [],
  });
  const [traineeCourse, setTraineeCourse] = useState(props.course);
  console.log(traineeCourse);

  useEffect(() => {
    app.get("/trainee/populated-courses/" + props.course.id).then((res) => {
      setTraineeCourse(res.data);
    });
  }, [myReviews]);

  useEffect(() => {
    setTraineeCourse(props.course);
    app
      .get("/trainee/my-courses/" + traineeCourse.id + "/get-my-reviews")
      .then((res) => {
        setMyReviews(res.data);
        app
          .get("/get-trainee-course", {
            headers: {
              courseId: traineeCourse.id,
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
    traineeCourse && (
      <Card
        className='card course-details-border-success'
        style={{
          margin: "250px",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <Card.Body className='course-details-card-body'>
          <Card.Title className='course-title'>
            {traineeCourse.title}
          </Card.Title>
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
                className='preview_video'
                key={traineeCourse.preview_video?.replace("watch?v=", "embed/")}
                title='course-video'
                src={traineeCourse.preview_video?.replace("watch?v=", "embed/")}
                frameBorder='0'
                allowFullScreen
              ></iframe>
            </div>
            <div>
              <div className='attribute'>
                Created By:{" "}
                {traineeCourse.instructor.map(
                  (instructor) => instructor.username + " "
                )}
              </div>
              <div className='attribute'>
                Total Length: {formatTime(traineeCourse.minutes)}
              </div>
              {localStorage.getItem("type") !== "corporate" &&
                props.owned !== true && (
                  <div className='attribute'>
                    Price:{" "}
                    {props.promotion &&
                      (new Date(props.promotion.endDate) > new Date() &&
                      new Date(props.promotion.startDate) < new Date() ? (
                        <>
                          <span className='scratched'>
                            {Math.floor(traineeCourse.price + 0.5) - 0.01}{" "}
                          </span>
                          <span>
                            {Math.floor(
                              (traineeCourse.price *
                                (100 - props.promotion.percentage)) /
                                100 +
                                0.5
                            ) -
                              0.01 +
                              (" " +
                                countries[
                                  Object.keys(countries).find(
                                    (e) => e === localStorage.getItem("country")
                                  )
                                ])}
                          </span>
                          <span className='red'>
                            (-{props.promotion.percentage}% till{" "}
                            {new Date(props.promotion.endDate).toDateString()})
                          </span>
                        </>
                      ) : (
                        <>
                          {Math.floor(traineeCourse.price + 0.5) -
                            0.01 +
                            (" " +
                              countries[
                                Object.keys(countries).find(
                                  (e) => e === localStorage.getItem("country")
                                )
                              ])}
                        </>
                      ))}
                  </div>
                )}
              {localStorage.getItem("type") === "individual" &&
                !props.owned && (
                  <Button variant='outline-success'>BUY NOW</Button>
                )}
              {props.owned && location.state.displayAddReview && (
                <>
                  <Button
                    variant='outline-success'
                    onClick={() => {
                      navigate("take-course", {
                        state: {
                          courseId: traineeCourse._id,
                        },
                      });
                    }}
                  >
                    Go to course
                  </Button>

                  <div className='attribute'>
                    Progress: {getProgress(traineeCourse?.progress) * 100}%
                  </div>
                </>
              )}
            </div>
          </div>
          <Card.Text>{traineeCourse.summary}</Card.Text>
          <div className='attribute'> Content: </div>
          <TableContainer title={"Subtitles"} elements={props.subtitles} />
          <EmbeddedReviewPage
            myReviews={myReviews}
            myReview={myReviews.courseReview}
            setMyReviews={setMyReviews}
            course={traineeCourse}
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
                    instructor={traineeCourse.instructor[index]}
                    course={traineeCourse}
                  />
                </div>
              )
          )}
        </Card.Body>
      </Card>
    )
  );
}

export default memo(CourseContainer);
