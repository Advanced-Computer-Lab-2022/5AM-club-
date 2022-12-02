import { useEffect, useState, memo } from "react";
import axios from "axios";
import proxy from "../../utils/proxy";
import ReviewsPage from "../../components/ReviewContainer/ReviewsPage";
import "./TraineeViewCourseReviews.css";
import { useLocation } from "react-router-dom";
function TraineeViewCourseReviews() {
  const [course, setCourse] = useState();
  const location = useLocation();
  useEffect(() => {
    axios
      .get(proxy.URL + "/courses/" + location.state.id)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return course && <ReviewsPage item={course} type='course' />;
}
export default memo(TraineeViewCourseReviews);
