import React from "react";
import axios from "axios";
import "./ViewDetailedCourse.css";
import { useEffect, memo } from "react";
import { useLocation } from "react-router-dom";
import CourseContainer from "../../components/CourseContainer/CourseContainer";
import proxy from "../../utils/proxy.json";
function ViewDetailedCourse(props) {
  const location = useLocation();
  const [course, setCourse] = React.useState({});
  const [subtitles, setSubtitles] = React.useState([]);
  const [promotion, setPromotion] = React.useState({});

  useEffect(() => {
    axios
      .get(proxy.URL + "/courses/" + location.state.id, {
        headers: {
          country: "", // TODO : Replace with user's country from token, or from localstorage } })
        },
      })
      .then((response) => {
        setCourse(response.data);
        setSubtitles(response.data.subtitles);
        setPromotion(response.data.promotion);
      })
      .catch(() => {});
  }, [location.state.id]);

  return (
    <CourseContainer
      course={course}
      subtitles={subtitles}
      promotion={promotion}
    />
  );
}

export default memo(ViewDetailedCourse);
