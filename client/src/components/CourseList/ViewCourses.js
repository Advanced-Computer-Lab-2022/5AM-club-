import axios from "axios";
import { useState } from "react";
function ViewCourses() {
  const [courses, setCourses] = useState([]);

  return (
    <div>
      View Courses <br />
      <button
        onClick={() => {
          setCourses([]);
          axios.get("http://localhost:4000/courses").then((response) => {
            setCourses(response.data);
          });
        }}
      >
        Button
      </button>
      {courses.map((c) => (
        <div key={c.title}>{c.title + " " + c.price + " " + c.rating}</div>
      ))}
    </div>
  );
}
export default ViewCourses;
