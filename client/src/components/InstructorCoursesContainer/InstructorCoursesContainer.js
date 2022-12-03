import proxy from "../../utils/proxy.json";
import axios from "axios";
import { useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import countries from "../../utils/Countries.json";

function InstructorCoursesContainer(props) {
  const navigate = useNavigate();

  function editCourse(_id) {
    navigate("edit-course", { state: { id: _id } });
  }

  useEffect(() => {
    props.setCourses([]);
    props.setMainText("");
    axios
      .get(proxy.URL + "/instructor/my-courses", {
        headers: {
          id: localStorage.getItem("id"),
          country: localStorage.getItem("country"),
          type: "instructor",
        },
      })
      .then((response) => {
        if (response.data.length === 0)
          props.setMainText("You don't have any courses yet");
        else props.setMainText("");
        props.setCourses(response.data);
      });
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <div>{props.mainText}</div>
      {props.courses.map((course) => (
        <>
          <div key={course._id}>
            <div>
              {course.title +
                " price: " +
                course.price +
                " " +
                countries[
                  Object.keys(countries).find(
                    (e) => e === localStorage.getItem("country")
                  )
                ] +
                " rating: " +
                course.courseRating}
            </div>
            <button
              key="Edit Course"
              onClick={() => {
                editCourse(course._id);
              }}
            >
              Edit Course
            </button>
            <button
              key="reviews"
              onClick={() => {
                navigate("view-course-reviews", {
                  state: { course: course },
                });
              }}
            >
              {" "}
              reviews
            </button>
            <button
              key="set promotion"
              onClick={() => {
                navigate("set-course-promotion", {
                  state: { course: course },
                });
              }}
            >
              {" "}
              set promotion
            </button>
          </div>
        </>
      ))}
    </div>
  );
}
export default memo(InstructorCoursesContainer);
