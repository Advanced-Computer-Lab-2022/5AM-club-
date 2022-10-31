import React from "react";
import axios from "axios";
import "./ViewDetailedCourse.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useUpdateEffect } from "react-use";
import CourseContainer from "../../components/CourseContainer/CourseContainer";
import proxy from "../../utils/proxy.json";
function ViewDetailedCourse(props) {
  const location = useLocation();
  const [course, setCourse] = React.useState({});
  const [subtitles, setSubtitles] = React.useState([]);
  const [promotion, setPromotion] = React.useState({});
  const [country, setCountry] = React.useState("");
  const navigate = useNavigate();
  React.useEffect(() => {
    if (
      location.pathname.includes("trainee") ||
      location.pathname.includes("instructor") ||
      location.pathname.includes("admin")
    ) {
      axios
        .get(proxy.URL + "/get-user", {
          headers: location.pathname.includes("individual-trainee")
            ? { id: "635e992a99ecb836d834f7fd", type: "trainee" }
            : location.pathname.includes("corporate-trainee")
            ? { id: "635f05a51832d2cde2c26d88", type: "trainee" }
            : location.pathname.includes("instructor")
            ? { id: "6355091ab4c387ca835c6bfc", type: "instructor" }
            : { id: "635e98ca99ecb836d834f7fc", type: "admin" },
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
  useUpdateEffect(() => {
    const id = location.state.id;
    axios
      .get(proxy.URL + "/courses/" + id, { headers: { country: country } })
      .then((response) => {
        setCourse(response.data);
        setSubtitles(response.data.subtitles);
        setPromotion(response.data.promotion);
      })
      .catch(() => {
        navigate("/error");
      });
  }, [country]);

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
