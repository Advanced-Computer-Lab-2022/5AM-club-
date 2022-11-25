import axios from "axios";
import "./ViewDetailedCourse.css";
import { useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom";
import CourseContainer from "../../components/CourseContainer/CourseContainer";
import proxy from "../../utils/proxy.json";
import { useSelector } from "react-redux";
function ViewDetailedCourse() {
  const token = useSelector((state) => state.token.value);

  const location = useLocation();

  const [course, setCourse] = useState({});
  const [subtitles, setSubtitles] = useState([]);
  const [promotion, setPromotion] = useState({});

  useEffect(() => {
    axios
      .get(proxy.URL + "/courses/" + location.state.id, {
        headers: {
          country: token ? token.country : localStorage.getItem("country"),
        },
      })
      .then((response) => {
        setCourse(response.data);
        setSubtitles(response.data.subtitles);
        setPromotion(response.data.promotion);
      })
      .catch(() => {});
  }, [location.state.id, token]);

  return (
    <CourseContainer
      course={course}
      subtitles={subtitles}
      promotion={promotion}
    />
  );
}

export default memo(ViewDetailedCourse);
