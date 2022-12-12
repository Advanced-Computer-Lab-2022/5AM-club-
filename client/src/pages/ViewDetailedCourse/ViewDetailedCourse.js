import app from "../../utils/AxiosConfigs.js";
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
      .get("/courses/" + location.state.id, {
        headers: {
          country: localStorage.getItem("country"),
        },
      })
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
        owned={course.owners.includes(localStorage.getItem("id"))}
      />
    )
  );
}

export default memo(ViewDetailedCourse);
