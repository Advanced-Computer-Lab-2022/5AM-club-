import { useEffect, useState, memo } from "react";
import app from "../../utils/AxiosConfig.js";
import ReviewsPage from "../../components/CourseContainer/ReviewsPage";
import "./ViewCourseReviews.css";
import { useLocation } from "react-router-dom";
function ViewCourseReviews() {
  const [course, setCourse] = useState();
  const location = useLocation();
  useEffect(() => {
    app
      .get(
        (localStorage.getItem("type")
          ? localStorage.getItem("type") === "corporate" ||
            localStorage.getItem("type") === "individual"
            ? "/trainee/populated-courses/"
            : "/" + localStorage.getItem("type") + "/populated-courses/"
          : "/populated-courses/") + location.state.course._id
      )
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {});

    //eslint-disable-next-line
  }, []);
  return course && <ReviewsPage item={course} type="course" />;
}
export default memo(ViewCourseReviews);
