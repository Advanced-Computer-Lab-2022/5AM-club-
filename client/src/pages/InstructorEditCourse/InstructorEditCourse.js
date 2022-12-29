import app from "../../utils/AxiosConfig.js";
import { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EditCourse from "../../components/EditCourse/EditCourse";
function InstructorEditCourse() {
  const [course, setCourse] = useState();
  const [instructor, setInstructor] = useState();
  const location = useLocation();

  useEffect(() => {
    app
      .get("/instructor/courses/" + location.state?.id, {
        headers: {
          country: localStorage.getItem("country"),
        },
      })
      .then((response) => {
        location.state = {
          ...location.state,
          closed: response.data.closed,
          published: response.data.published,
        };
        setCourse(response.data);

        app
          .get("/instructor/get-course-instructor", {
            params: { courseid: response.data._id },
          })
          .then((response) => {
            setInstructor(response.data);
          });
      });
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <EditCourse
        course={course}
        instructor={instructor}
        setCourse={setCourse}
      ></EditCourse>
    </div>
  );
}
export default memo(InstructorEditCourse);
