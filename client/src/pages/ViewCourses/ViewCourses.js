import axios from "axios";
import "./ViewCourses.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ViewCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    setCourses([]);
    axios.get("http://localhost:4000/courses").then((response) => {
      setCourses(response.data);
    });
  }, []);
  return (
    <div>
      View Courses <br />
      {courses.map((c) => (
        <div className="course-item" key={c.title}>
          <div>{c.title + " " + c.price + " " + c.rating}</div>
          <button
            onClick={() => {
              console.log(c);
              navigate("view-course", { state: { id: c._id } });
            }}
          >
            {" "}
            Show details
          </button>
        </div>
      ))}
    </div>
  );
}
export default ViewCourses;
