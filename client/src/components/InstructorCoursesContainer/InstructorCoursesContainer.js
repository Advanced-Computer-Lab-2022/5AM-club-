import { useEffect } from "react";
import proxy from "../../utils/proxy.json";
import axios from "axios";
function InstructorCoursesContainer(props) {
  useEffect(() => {
    props.setCourses([]);
    props.setMainText("");
    axios
      .get(proxy.URL + "/instructor/my-courses", {
        headers: {
          id: props.instructorId,
          "content-type": "text/json",
        },
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
