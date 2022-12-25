import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import arrow from "../../assets/ViewCourses/arrow.svg";
import { formatTime, getSectionCount } from "../../utils/Helpers";
import "./MyCourseCard.css";
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
            {"Taught by : " +
              (localStorage.getItem("type") === "instructor"
                ? "You"
                : props.course.instructor[0].username)}
          </p>
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

function MyCourseCard(props) {
  const navigate = useNavigate();

  function handleClick() {
    if (localStorage.getItem("type") === "instructor")
      navigate("/instructor/my-courses/edit-course", {
        state: { id: props.course._id },
      });
    else {
      navigate(
        "/" +
          localStorage.getItem("type") +
          "-trainee/my-courses/view-course-details",
        {
          state: { course: props.course, displayAddReview: true },
        }
      );
    }
  }

  return (
    <div className="course-item" onClick={handleClick}>
      <Card course={props.course}></Card>
    </div>
  );
}
export default memo(MyCourseCard);
