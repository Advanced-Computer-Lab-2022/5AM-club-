import { memo } from "react";
import { useNavigate } from "react-router-dom";
import app from "../../utils/AxiosConfig";
import countries from "../../utils/Countries.json";
import arrow from "../../assets/ViewCourses/arrow.svg";
import { formatTime, getSectionCount } from "../../utils/Helpers";
import "./CourseCard.css";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import Rating from "@mui/material/Rating";

function Card(props) {
  return (
    <MDBCard className="course-card" style={{ width: "300px" }}>
      <div className="d-flex justify-content-between p-3">
        <h5 className="mb-0" style={{ fontSize: "30px" }}>
          {props.course.title}
        </h5>
      </div>
      <MDBCardBody>
        {props.course.subject.map((subject, idx) => (
          <div className="course-card-subject" key={subject + idx}>
            {subject}
          </div>
        ))}
        <div className="course-description-fade">{props.course.summary}</div>
        <div className="d-flex flex-column justify-content-between">
          {" "}
          <p className="text-muted" style={{ marginTop: "5px" }}>
            {"Taught by : " + props.course.instructor[0].username}
          </p>
          <div
            className="d-flex justify-content-between mb-3 text-dark mb-0"
            style={{ fontWeight: "700", fontSize: "25px" }}
          >
            {props.course.promotion &&
            new Date(props.course.promotion.endDate) > new Date() &&
            new Date(props.course.promotion.startDate) < new Date() ? (
              <>
                <div>
                  <span className="scratched">
                    {Math.floor(props.course.price + 0.5) - 0.01}{" "}
                  </span>
                  <span>
                    {Math.floor(
                      (props.course.price *
                        (100 - props.course.promotion.percentage)) /
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
                </div>
                <span className="red">
                  (-{props.course.promotion.percentage}% till{" "}
                  {new Date(props.course.promotion.endDate).toDateString()})
                </span>
              </>
            ) : (
              <div>
                {Math.floor(props.course.price + 0.5) -
                  0.01 +
                  (" " +
                    countries[
                      Object.keys(countries).find(
                        (e) => e === localStorage.getItem("country")
                      )
                    ])}
              </div>
            )}
          </div>
        </div>

        <div className="d-flex flex-column justify-content-between mb-2">
          <div
            className="d-flex align-items-center"
            style={{ fontSize: "15px" }}
          >
            <Rating
              name="read-only"
              value={parseFloat(props.course.courseRating) || 0}
              size="meduim"
              sx={{
                color: "success.main",
              }}
              precision={0.1}
              readOnly
            />
            <p>{"(" + props.course.userReviews.length + ")"}</p>
          </div>
          <div style={{ display: "flex" }}>
            <p className="text-muted" style={{ marginTop: "5px" }}>
              {getSectionCount(props.course.subtitles) +
                (getSectionCount(props.course.subtitles) === 1
                  ? " Section"
                  : " Sections") +
                " • " +
                "Total Length : " +
                formatTime(props.course.minutes)}
            </p>
          </div>
        </div>
      </MDBCardBody>{" "}
      <img
        src={arrow}
        alt="arrow"
        style={{
          position: "absolute",
          left: "220px",
          bottom: "20px",
          width: "70px",
          height: "70px",
        }}
      />
    </MDBCard>
  );
}

function CourseCard(props) {
  const navigate = useNavigate();

  function handleClick() {
    app
      .put(
        (localStorage.getItem("type")
          ? localStorage.getItem("type") === "corporate" ||
            localStorage.getItem("type") === "individual"
            ? "/trainee/courses/increment-views/"
            : "/" + localStorage.getItem("type") + "/courses/increment-views/"
          : "/courses/increment-views/") + props.course._id
      )
      .then(() => {
        navigate("view-course", {
          state: { id: props.course._id },
        });
      });
  }

  return (
    <div className="course-item" onClick={handleClick}>
      <Card course={props.course}></Card>
    </div>
  );
}
export default memo(CourseCard);
