import axios from "axios";
import { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import proxy from "../../utils/proxy.json";
import { useUpdateEffect } from "react-use";
import Subtitles from "../../components/TakeCourse/Subtitles";
function TraineeTakeCourse() {
  const [course, setCourse] = useState();
  const [trainee, setTrainee] = useState();
  const [traineeCourse, setTraineeCourse] = useState();
  const location = useLocation();

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
                traineeId: location.state?.traineeId,
                courseId: location.state?.courseId,
              })
              .then((response) => {
                setTraineeCourse(response.data);
              });
          });
      });
  }, []);

  useUpdateEffect(() => {
    axios
      .put(proxy.URL + "/edit-trainee-course", {
        // TODO : use token instead of id
        lastSection: traineeCourse.lastSection,
        traineeId: location.state?.traineeId,
        courseId: location.state?.courseId,
        progress: traineeCourse.progress,
        answers: traineeCourse.answers,
        notes: traineeCourse.notes,
      })
      .then((response) => {
        setTraineeCourse(response.data);
      });
  }, [traineeCourse]);

  return (
    <div className="take-course-wrapper">
      <div className="content-notes-wrapper">
        <div className="content"></div>
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
