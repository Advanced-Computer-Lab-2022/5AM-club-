import { memo } from "react";
import CoursePromotionContainer from "../../components/CoursePromotionContainer/CoursePromotionContainer";
import "./SetCoursePromotion.css";
import { useLocation } from "react-router-dom";
function SetCoursePromotion() {
  const location = useLocation();
  return <CoursePromotionContainer course={location.state.course} />;
}
export default memo(SetCoursePromotion);
