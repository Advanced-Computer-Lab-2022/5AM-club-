import { useEffect } from "react";
import axios from "axios";
function InstructorCoursesContainer(props) {
  useEffect(() => {
    props.setCourses([]);
    props.setMainText("");
    axios
      .get("http://localhost:4000/instructor/mycourses?", {
        ID: props.instructorId,
      })
      .then((response) => {
        if (response.data.length === 0)
          props.setMainText("You don't have any courses yet");
        else props.setMainText("");

        props.setCourses(response.data);
      });
  }, []);
  return (
    <div>
      <div>{props.mainText}</div>
      {props.courses.map((course) => (
        <div key={course.title} style={{ color: "red" }}>
          {course.title}
        </div>
      ))}
    </div>
  );
}
export default InstructorCoursesContainer;
