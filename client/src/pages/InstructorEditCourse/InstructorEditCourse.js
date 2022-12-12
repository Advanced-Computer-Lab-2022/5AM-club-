import app from "../../utils/AxiosConfigs.js";
import { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EditCourse from "../../components/EditCourse/EditCourse";
function InstructorEditCourse() {
  const [course, setCourse] = useState();
  const [instructor, setInstructor] = useState();
  const location = useLocation();

  useEffect(() => {
    app
      .get("/courses/" + location.state?.id, {
        headers: {
          country: localStorage.getItem("country"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setCourse(response.data);
        app
          .get("/get-course-instructor", {
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
