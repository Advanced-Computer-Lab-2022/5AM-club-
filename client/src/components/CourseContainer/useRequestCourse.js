import { useState, useEffect } from "react";
import app from "../../utils/AxiosConfig";
function useRequestCourse(course) {
  const [requested, setRequested] = useState(
    course.pending.some(
      (trainee) => trainee.username === localStorage.getItem("username")
    )
  );
  const requestCourse = () => {
    app
      .put("/trainee/courses/" + course._id + "/course-request")
      .then((res) => {
        alert(
          "Course requested successfully. Please wait for the admin to accept your request."
        );
        setRequested(true);
      })
      .catch((err) => {
        alert("Error requesting course");
      });
  };
  return { requested, setRequested, requestCourse };
}
export default useRequestCourse;
