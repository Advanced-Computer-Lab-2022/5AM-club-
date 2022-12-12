import app from "../../utils/AxiosConfigs.js";
import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
    app
      .get("/courses/" + location.state?.courseId, {
        headers: {
          country: localStorage.getItem("country"),
        },
      })
      .then((response) => {
        setCourse(response.data);

        app
          .get("/get-trainee-course", {
            headers: {
              courseId: location.state?.courseId,
            },
          })
          .then((response) => {
            setTraineeCourse(response.data);
          });
      });

    setFlag(true);
    // eslint-disable-next-line
  }, []);

  function updateTraineeCourse(traineeCourse) {
    app
      .put("/edit-trainee-course", {
        lastSection: traineeCourse.lastSection,

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
