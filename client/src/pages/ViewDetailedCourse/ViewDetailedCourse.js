import React from "react";
import axios from "axios";
import "./ViewDetailedCourse.css";
import { useNavigate, useLocation } from "react-router-dom";
import CourseContainer from "../../components/CourseContainer/CourseContainer";

function ViewDetailedCourse(props) {
  const location = useLocation();
  const [course, setCourse] = React.useState({});
  const [subtitles, setSubtitles] = React.useState([]);
  //const [country, setCountry] = React.useState(props.country);
  const navigate = useNavigate();
  React.useEffect(() => {
    const id = location.state.id;
    axios
      .get("http://localhost:4000/courses/" + id) //uselocation front amr
      .then((response) => {
        setCourse(response.data);
        setSubtitles(response.data.subtitles);
      })
      .catch(() => {
        navigate("/error");
      });
  }, []);

  return <CourseContainer course={course} subtitles={subtitles} />;
}

export default ViewDetailedCourse;
