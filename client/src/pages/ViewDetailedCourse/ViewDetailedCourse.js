import app from "../../utils/AxiosConfig.js";
import "./ViewDetailedCourse.css";
import { useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom";
import CourseContainer from "../../components/CourseContainer/CourseContainer";
function ViewDetailedCourse() {
  const location = useLocation();

  const [course, setCourse] = useState();
  const [subtitles, setSubtitles] = useState([]);
  const [promotion, setPromotion] = useState({});

  useEffect(() => {
    app
      .get(
        (localStorage.getItem("type")
          ? localStorage.getItem("type") === "corporate" ||
            localStorage.getItem("type") === "individual"
            ? "/trainee/populated-courses/"
            : "/" + localStorage.getItem("type") + "/populated-courses/"
          : "/populated-courses/") + location.state.id,
        {
          headers: {
            country: localStorage.getItem("country"),
          },
        }
      )
      .then((response) => {
        setCourse(response.data);
        setSubtitles(response.data.subtitles);
        setPromotion(response.data.promotion);
      })
      .catch(() => {});
  }, [location.state?.id]);

  return (
    course && (
      <CourseContainer
        course={course}
        subtitles={subtitles}
        promotion={promotion}
        owned={course.owners.some(
          (owner) => owner.username === localStorage.getItem("username")
        )}
      />
    )
  );
}

export default memo(ViewDetailedCourse);
