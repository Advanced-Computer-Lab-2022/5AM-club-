import { memo } from "react";
import ReviewsPage from "../../components/ReviewContainer/ReviewsPage";
import "./TraineeViewCourseReviews.css";
import { useLocation } from "react-router-dom";
function TraineeViewCourseReviews() {
  const location = useLocation();
  return <ReviewsPage item={location.state.course} type='course' />;
}
export default memo(TraineeViewCourseReviews);
