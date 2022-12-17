import { memo } from "react";
import { useNavigate } from "react-router-dom";
import app from "../../utils/AxiosConfig";
import countries from "../../utils/Countries.json";
import { formatTime } from "../../utils/Helpers";
import "./CourseCard.css";

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
      <div>
        {props.course.title +
          (localStorage.getItem("type") !== "corporate"
            ? " price: " +
              (Math.floor(props.course.price + 0.5) - 0.01) +
              " " +
              countries[
                Object.keys(countries).find(
                  (e) => e === localStorage.getItem("country")
                )
              ] +
              " Total Length: " +
              formatTime(props.course.minutes) +
              " "
            : "") +
          " rating: " +
          props.course.rating}
      </div>
    </div>
  );
}
export default memo(CourseCard);
