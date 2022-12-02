import axios from "axios";
import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import proxy from "../../utils/proxy.json";
import { useUpdateEffect } from "react-use";
import Subtitles from "../../components/TakeCourse/Subtitles";
import Content from "../../components/TakeCourse/Content";
import "./TraineeTakeCourse.css";

function TraineeTakeCourse() {
  const [course, setCourse] = useState();
  const [trainee, setTrainee] = useState();
  const [traineeCourse, setTraineeCourse] = useState();
  const location = useLocation();
  const navigate = useNavigate();

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
          .get(proxy.URL + "/get-user", {
            // TODO : use token instead of id
            headers: {
              id: location.state?.traineeId,
              type: localStorage.getItem("type"),
            },
          })
          .then((response) => {
            setTrainee(response.data);
            axios
              .get(proxy.URL + "/get-trainee-course", {
                // TODO : use token instead of id
                headers: {
                  traineeId: location.state?.traineeId,
                  courseId: location.state?.courseId,
                },
              })
              .then((response) => {
                console.log(response);
                setTraineeCourse(response.data);
              });
          });
      });
  }, []);

  useUpdateEffect(() => {
    if (traineeCourse) console.log(traineeCourse);
    axios
      .put(proxy.URL + "/edit-trainee-course", {
        // TODO : use token instead of id------------------ bta3tna
        lastSection: traineeCourse.lastSection,
        traineeId: location.state?.traineeId,
        courseId: location.state?.courseId,
        progress: traineeCourse.progress,
        answers: traineeCourse.answers,
        notes: traineeCourse.notes,
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 409) {
          navigate(0);
        }
      });
  }, [traineeCourse]);

  return (
    <div className="take-course-wrapper">
      <div className="content-notes-wrapper">
        <div className="content">
          <Content
            course={course}
            traineeCourse={traineeCourse}
            setTraineeCourse={setTraineeCourse}
          ></Content>
        </div>
        <div className="notes"></div>
      </div>
      <div className="subtitles">
        <Subtitles
          course={course}
          setTraineeCourse={setTraineeCourse}
          traineeCourse={traineeCourse}
        ></Subtitles>
      </div>
    </div>
  );
}
export default memo(TraineeTakeCourse);
