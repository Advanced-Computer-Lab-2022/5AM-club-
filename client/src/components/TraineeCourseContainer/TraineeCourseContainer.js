import app from "../../utils/AxiosConfig.js";
import { useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import countries from "../../utils/Countries.json";

function TraineeCourseContainer(props) {
  console.log(props.courses);
  const navigate = useNavigate();
  useEffect(() => {
    app
      .get("/trainee/my-populated-courses", {
        headers: {
          country: localStorage.getItem("country"),
          type: localStorage.getItem("type"),
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
        <div key={course._id}>
          {course.valid && (
            <>
              <div key={course._id}>
                {course.title +
                  " price: " +
                  (Math.floor(course.price + 0.5) - 0.01) +
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
                onClick={() => {
                  navigate("view-course-details", {
                    state: { course: course, displayAddReview: true },
                  });
                }}
              >
                {" "}
                Show Details
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
export default memo(TraineeCourseContainer);
