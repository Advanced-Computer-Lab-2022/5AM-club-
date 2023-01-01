import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/ViewCourses/arrow.svg";
import { formatTime, getSectionCount } from "../../utils/Helpers";
import "./MyCourseCard.css";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import app from "../../utils/AxiosConfig";
import CornerRibbon from "react-corner-ribbon";

function Card(props) {
  const [hovering, setHovering] = useState(false);

  const navigate = useNavigate();

  const toggleHovering = () => setHovering(!hovering);

  function deleteCourse(e) {
    e.stopPropagation();
    if (props.course.published) {
      alert("You cannot delete a published course.");
      return;
    }
    if (
      window.confirm(
        "Are you sure you want to delete this course? This action cannot be undone."
      ) === true
    ) {
      app.delete("/my-courses/" + props.course._id + "/delete-course", {
        params: { id: props.course._id },
      });
      navigate(0);
    }
  }

  return (
    <MDBCard className="course-card" style={{ width: "300px" }}>
      {props.course.published &&
        localStorage.getItem("type") === "instructor" && (
          <CornerRibbon
            position="top-right"
            fontColor="white"
            style={{ fontSize: "10px" }}
            backgroundColor={props.course.closed ? "#dc3545" : "#96cea8"}
          >
            {props.course.closed ? "Closed" : "Published"}
          </CornerRibbon>
        )}
      {!props.course.published && (
        <CornerRibbon
          position="top-right"
          fontColor="white"
          style={{ fontSize: "10px" }}
          backgroundColor={"black"}
        >
          Private
        </CornerRibbon>
      )}
      <div
        className="d-flex justify-content-between p-3 pb-0"
        style={{ alignItems: "center" }}
      >
        <h5 className="mb-0" style={{ fontSize: "30px" }}>
          {props.course.title}
        </h5>
        {localStorage.getItem("type") === "instructor" && (
          <>
            <IconButton
              aria-label="delete"
              size="large"
              className="red-hover"
              onMouseEnter={toggleHovering}
              onMouseLeave={toggleHovering}
              sx={{ color: hovering ? "red" : "black" }}
              style={{ zIndex: "9999" }}
              onClick={deleteCourse}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </>
        )}
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
