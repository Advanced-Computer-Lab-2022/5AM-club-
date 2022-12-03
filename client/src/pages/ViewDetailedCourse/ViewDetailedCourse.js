import axios from "axios";
import "./ViewDetailedCourse.css";
import { useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom";
import CourseContainer from "../../components/CourseContainer/CourseContainer";
import proxy from "../../utils/proxy.json";
function ViewDetailedCourse() {
  const location = useLocation();

  const [course, setCourse] = useState({});
  const [subtitles, setSubtitles] = useState([]);
  const [promotion, setPromotion] = useState({});

  useEffect(() => {
    console.log(location.state.id, "Asdffd");
    axios
      .get(proxy.URL + "/courses/" + location.state.id, {
        headers: {
          country: localStorage.getItem("country"),
        },
      })
      .then((response) => {
        console.log(response.data, "ASDf");
        setCourse(response.data);
        setSubtitles(response.data.subtitles);
        setPromotion(response.data.promotion);
      })
      .catch(() => {
        console.log("alsdfnm");
      });
  }, [location.state?.id]);

  return (
    <CourseContainer
      course={course}
      subtitles={subtitles}
      promotion={promotion}
    />
  );
}

export default memo(ViewDetailedCourse);
