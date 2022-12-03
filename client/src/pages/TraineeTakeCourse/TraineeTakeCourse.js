import axios from "axios";
import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import proxy from "../../utils/proxy.json";
import Subtitles from "../../components/TakeCourse/Subtitles";
import Content from "../../components/TakeCourse/Content";
import "./TraineeTakeCourse.css";

function TraineeTakeCourse() {
  const [course, setCourse] = useState();
  const [traineeCourse, setTraineeCourse] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    axios
      .get(proxy.URL + "/courses/" + location.state?.courseId, {
        headers: {
          country: localStorage.getItem("country"),
        },
      })
      .then((response) => {
        setCourse(response.data);

        axios
          .get(proxy.URL + "/get-trainee-course", {
            // TODO : use token instead of id
            headers: {
              traineeId: location.state?.traineeId,
              courseId: location.state?.courseId,
            },
          })
          .then((response) => {
            setTraineeCourse(response.data);
          });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps;

    setFlag(true);
  }, []);

  function updateTraineeCourse(traineeCourse) {
    console.log(traineeCourse);
    axios
      .put(proxy.URL + "/edit-trainee-course", {
        // TODO : use token instead of id------------------ bta3tna
        lastSection: traineeCourse.lastSection,
        traineeId: location.state?.traineeId,
        courseId: location.state?.courseId,
        progress: traineeCourse.progress,
        answers: traineeCourse.answers,
        grades: traineeCourse.grades,
        notes: traineeCourse.notes,
      })
      .then((response) => {
        setTraineeCourse(response.data);
      })
      .catch((error) => {
        if (error.response.status === 409) {
          navigate(0);
        }
      });
  }

  return (
    <div className="take-course-wrapper">
      <div className="content-notes-wrapper">
        <div className="content">
          <Content
            course={course}
            traineeCourse={traineeCourse}
            updateTraineeCourse={updateTraineeCourse}
          ></Content>
        </div>
        <div className="notes"></div>
      </div>
      <div className="subtitles">
        <Subtitles
          setFlag={setFlag}
          flag={flag}
          course={course}
          updateTraineeCourse={updateTraineeCourse}
          traineeCourse={traineeCourse}
        ></Subtitles>
      </div>
    </div>
  );
}
export default memo(TraineeTakeCourse);
