import React from "react";
import axios from "axios";
import "./ViewDetailedCourse.css";
import { useNavigate, useLocation } from "react-router-dom";
import CourseContainer from "../../components/CourseContainer/CourseContainer";
import proxy from "../../utils/proxy.json";
function ViewDetailedCourse(props) {
  const location = useLocation();
  const [course, setCourse] = React.useState({});
  const [subtitles, setSubtitles] = React.useState([]);
  const [promotion, setPromotion] = React.useState({});
  const [country, setCountry] = React.useState(props.country);
  const navigate = useNavigate();
  React.useEffect(() => {
    const id = location.state.id;
    axios
      .get(proxy.URL + "/courses/" + id)
      .then((response) => {
        setCourse(response.data);
        setSubtitles(response.data.subtitles);
        setPromotion(response.data.promotion);
      })
      .catch(() => {
        navigate("/error");
      });

    if (
      location.pathname.includes("trainee") ||
      location.pathname.includes("instructor") ||
      location.pathname.includes("admin")
    ) {
      axios
        .get(proxy.URL + "/get-user", {
          headers: location.pathname.includes("individual-trainee")
            ? { id: "635ad854b2ad88bd8358a5af", type: "trainee" }
            : location.pathname.includes("corporate-trainee")
            ? { id: "635ad854b2ad88bd8358a5af", type: "trainee" }
            : location.pathname.includes("instructor")
            ? { id: "635ad854b2ad88bd8358a5af", type: "instructor" }
            : { id: "635ad854b2ad88bd8358a5af", type: "admin" },
        })
        .then((response) => {
          setCountry(response.data.country);
        })
        .catch(() => {
          setCountry("United States");
        });
    } else {
      setCountry(localStorage.getItem("country"));
    }
  }, []);

  return (
    <CourseContainer
      course={course}
      country={country}
      subtitles={subtitles}
      promotion={promotion}
    />
  );
}

export default ViewDetailedCourse;
