import { useState, useEffect } from "react";
import app from "../../utils/AxiosConfig";
function useRequestCourse(course) {
  console.log(
    course.pending.some(
      (request) => request.trainee.username === localStorage.getItem("username")
    )
  );
  const [requested, setRequested] = useState(
    course.pending.some(
      (request) => request.trainee.username === localStorage.getItem("username")
    )
  );

  const requestCourse = () => {
    app
      .put("/trainee/courses/" + course._id + "/course-request")
      .then((res) => {
        alert(
          "Course requested successfully. Please wait for an admin to accept your request."
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
