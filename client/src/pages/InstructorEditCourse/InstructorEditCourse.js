import axios from "axios";
import { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import proxy from "../../utils/proxy.json";
import EditCourse from "../../components/EditCourse/EditCourse";
function InstructorEditCourse() {
  const [course, setCourse] = useState();
  const [instructor, setInstructor] = useState();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(proxy.URL + "/courses/" + location.state?.id, {
        headers: {
          country: localStorage.getItem("country"),
        },
      })
      .then((response) => {
        setCourse(response.data);
        axios
          .get(proxy.URL + "/get-course-instructor", {
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
