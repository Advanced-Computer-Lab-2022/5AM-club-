import { memo } from "react";
import ReviewsPage from "../../components/ReviewContainer/ReviewsPage";
import "./ViewCourseReviews.css";
import { useLocation } from "react-router-dom";
function ViewCourseReviews() {
  const location = useLocation();
  return <ReviewsPage item={location.state.course} type='course' />;
}
export default memo(ViewCourseReviews);
