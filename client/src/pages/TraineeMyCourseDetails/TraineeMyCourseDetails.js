import "./TraineeMyCourseDetails.css";
import { memo } from "react";
import { useLocation } from "react-router-dom";
import CourseContainer from "../../components/CourseContainer/CourseContainer";

function TraineeMyCourseDetails() {
  const location = useLocation();
  return (
    <CourseContainer
      course={location.state.course}
      subtitles={location.state.course.subtitles}
      promotion={location.state.course.promotion}
      owned={true}
    />
  );
}

export default memo(TraineeMyCourseDetails);
