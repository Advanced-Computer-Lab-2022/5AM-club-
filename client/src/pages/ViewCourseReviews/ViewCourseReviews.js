import { useEffect, useState, memo } from "react";
import app from "../../utils/AxiosConfigs.js";
import ReviewsPage from "../../components/ReviewContainer/ReviewsPage";
import "./ViewCourseReviews.css";
import { useLocation } from "react-router-dom";
function ViewCourseReviews() {
  const [course, setCourse] = useState();
  const location = useLocation();
  useEffect(() => {
    app
      .get("/courses/" + location.state.course._id)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {});

    //eslint-disable-next-line
  }, []);
  return course && <ReviewsPage item={course} type="course" />;
}
export default memo(ViewCourseReviews);
