import { useEffect, useState, memo } from "react";
import axios from "axios";
import proxy from "../../utils/proxy";
import ReviewsPage from "../../components/ReviewContainer/ReviewsPage";
import "./ViewCourseReviews.css";
import { useLocation } from "react-router-dom";
function ViewCourseReviews() {
  const [course, setCourse] = useState();
  const location = useLocation();
  useEffect(() => {
    axios
      .get(proxy.URL + "/courses/" + location.state.id)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {});

    //eslint-disable-next-line
  }, []);
  return course && <ReviewsPage item={course} type='course' />;
}
export default memo(ViewCourseReviews);
