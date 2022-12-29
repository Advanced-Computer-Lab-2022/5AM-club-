import { useEffect, useState, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReportProblem from "../../components/ReportProblem/ReportProblem";
import app from "../../utils/AxiosConfig.js";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import TableContainer from "./TableContainer";
import "./CourseContainer.css";
import { formatTime, getProgress } from "../../utils/Helpers";
import countries from "../../utils/Countries.json";
import EmbeddedReviewPage from "./EmbeddedReviewPage";
import useRequestCourse from "./useRequestCourse";
function CourseContainer(props) {
  console.log(props.course);
  const navigate = useNavigate();
  const location = useLocation();
  const [myReviews, setMyReviews] = useState({
    courseReview: {},
    instructorReview: [],
  });
  const [course, setCourse] = useState(props.course);
  const [traineeCourse, setTraineeCourse] = useState();

  console.log(course);
  const { requested, setRequested, requestCourse } = useRequestCourse(
    props.course
  );
  const handleBuy = () => {
    console.log("buy pressed", props.course);
    try {
      app
        .post(`/pay`, {
          courseId: props.course.id,
          coursePrice: props.course.price,
          courseName: props.course.title,
        })
        .then((res) => {
          //console.log("paid succ", res.data.url);
          //navigate(`/${res.data.url}`);
          window.open(res.data.url, "_self");
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    app
      .get(
        (localStorage.getItem("type")
          ? localStorage.getItem("type") === "corporate" ||
            localStorage.getItem("type") === "individual"
            ? "/trainee/populated-courses/"
            : "/" + localStorage.getItem("type") + "/populated-courses/"
          : "/populated-courses/") + props.course.id
      )
      .then((res) => {
        setCourse(res.data);
        console.log(res.data);
        setRequested(
          res.data.pending.some(
            (trainee) => trainee.username === localStorage.getItem("username")
          )
        );
      });
    //eslint-disable-next-line
  }, [myReviews]);

  useEffect(() => {
    setCourse(props.course);
    if (
      localStorage.getItem("type") === "corporate" ||
      localStorage.getItem("type") === "individual"
    ) {
      app
        .get("/trainee/my-courses/" + course.id + "/get-my-reviews")
        .then((res) => {
          setMyReviews(res.data);
          app
            .get("/trainee/get-trainee-course", {
              headers: {
                courseId: course.id,
                country: localStorage.getItem("country"),
              },
            })
            .then((response) => {
              console.log(response.data);
              setTraineeCourse(response.data);
            });
        });
    }
    //eslint-disable-next-line
  }, []);
  return (
    course && (
      <Card
        className="card course-details-border-success"
        style={{
          margin: "250px",
          marginTop: "50px",
          marginBottom: "50px",
          minWidth: "550px",
        }}
      >
        <Card.Body
          className="course-details-card-body"
          style={{ minWidth: "400px" }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <p className="course-title-text" style={{ flexGrow: "1" }}>
              {" "}
              {props.course?.title}
            </p>
            {props.owned && localStorage.getItem("type") === "individual" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  gap: "10px",
                }}
              >
                <button
                  className="btn btn-outline-danger"
                  style={{
                    height: "50px",
                  }}
                  onClick={() => {
                    const progress = getProgress(traineeCourse?.progress) * 100;
                    if (
                      progress < 50 &&
                      window.confirm(
                        "You will not have access to this course any more. You will be refunded " +
                          (Math.floor(
                            traineeCourse.purchasingCost + 0.5 - 0.01
                          ) +
                            (" " +
                              (countries[
                                Object.keys(countries).find(
                                  (e) => e === localStorage.getItem("country")
                                )
                              ]
                                ? countries[
                                    Object.keys(countries).find(
                                      (e) =>
                                        e === localStorage.getItem("country")
                                    )
                                  ]
                                : "USD"))) +
                          " Are you sure you want to refund? "
                      ) == true
                    ) {
                      // refund the course
                    } else if (progress > 50) {
                      alert(
                        "Sorry, you can't refund a course if you've viewed more than 50% of it's content."
                      );
                    }
                  }}
                >
                  Refund Course
                </button>
                <ReportProblem height="50px"></ReportProblem>
              </div>
            )}
          </div>
          <div
            className="properties-wrapper"
            style={{
              alignItems: "center",
              fontSize: "20px",
              color: "black",
            }}
          >
            Subjects:
            {props.course?.subject.map((subject, idx) => (
              <div className="course-attribute" key={subject + idx}>
                <p>{subject}</p>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              overflow: "hidden",
            }}
          >
            <iframe
              className="preview_video"
              key={course.preview_video?.replace("watch?v=", "embed/")}
              title="course-video"
              src={course.preview_video?.replace("watch?v=", "embed/")}
              allowFullScreen
              style={{ flexShrink: "0", borderRadius: "10px" }}
            ></iframe>
            <div style={{ flexGrow: "1" }}>
              <div
                className="editable-container"
                style={{
                  minWidth: "245px",
                  overflow: "hidden",
                  flexGrow: "1",
                }}
              >
                <div
                  className="attribute"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                    flexDirection: "column",
                  }}
                >
                  Created By:{" "}
                  {course.instructor.map(
                    (instructor) => instructor.username + " "
                  )}
                </div>
                <div
                  className="attribute"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                    flexDirection: "column",
                  }}
                >
                  Total Length: {formatTime(course.minutes)}
                </div>
                {localStorage.getItem("type") !== "corporate" &&
                  props.owned !== true && (
                    <div
                      className="attribute"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        width: "100%",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                        flexDirection: "column",
                      }}
                    >
                      Price:{" "}
                      {props.promotion &&
                      new Date(props.promotion.endDate) > new Date() &&
                      new Date(props.promotion.startDate) < new Date() ? (
                        <>
                          <div>
                            <span className="scratched">
                              {Math.floor(course.price + 0.5) - 0.01}{" "}
                            </span>
                            <span>
                              {Math.floor(
                                (course.price *
                                  (100 - props.promotion.percentage)) /
                                  100 +
                                  0.5
                              ) -
                                0.01 +
                                (" " +
                                  (countries[
                                    Object.keys(countries).find(
                                      (e) =>
                                        e === localStorage.getItem("country")
                                    )
                                  ]
                                    ? countries[
                                        Object.keys(countries).find(
                                          (e) =>
                                            e ===
                                            localStorage.getItem("country")
                                        )
                                      ]
                                    : "USD"))}
                            </span>
                          </div>
                          <span className="red">
                            (-
                            {props.promotion.percentage}% till{" "}
                            {new Date(props.promotion.endDate).toDateString()})
                          </span>
                        </>
                      ) : (
                        <div>
                          {Math.floor(course.price + 0.5) -
                            0.01 +
                            (" " +
                              (countries[
                                Object.keys(countries).find(
                                  (e) => e === localStorage.getItem("country")
                                )
                              ]
                                ? countries[
                                    Object.keys(countries).find(
                                      (e) =>
                                        e === localStorage.getItem("country")
                                    )
                                  ]
                                : "USD"))}
                        </div>
                      )}
                    </div>
                  )}
                {localStorage.getItem("type") === "individual" &&
                  !props.owned && (
                    <Button variant="outline-success" onClick={handleBuy}>
                      BUY NOW
                    </Button>
                  )}
                {localStorage.getItem("type") === "corporate" &&
                  !props.owned &&
                  (requested ? (
                    "Pending"
                  ) : (
                    <Button
                      variant="outline-success"
                      style={{
                        height: "50px",
                      }}
                      onClick={requestCourse}
                    >
                      REQUEST ACCESS
                    </Button>
                  ))}
                {props.owned && location.state.displayAddReview && (
                  <>
                    <div className="attribute">
                      Progress: {getProgress(traineeCourse?.progress) * 100}%
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        borderRadius: "5px",
                        backgroundColor: "white",
                      }}
                    >
                      <Button
                        variant="outline-success"
                        onClick={() => {
                          navigate("take-course", {
                            state: {
                              courseId: course._id,
                            },
                          });
                        }}
                        style={{
                          width: "150px",
                          height: "50px",
                        }}
                      >
                        Go to course
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>{" "}
          </div>

          <Card.Text className="editable-container">
            <div style={{ fontWeight: "700", fontSize: "30px" }}>
              Description :{" "}
            </div>
            {course.summary}
          </Card.Text>
          <div className="attribute" style={{ fontSize: "30px" }}>
            {" "}
            Content:{" "}
          </div>
          <TableContainer title={"Subtitles"} elements={props.subtitles} />
          <EmbeddedReviewPage
            myReviews={myReviews}
            myReview={myReviews.courseReview}
            setMyReviews={setMyReviews}
            course={course}
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
                    instructor={course.instructor[index]}
                    course={course}
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
