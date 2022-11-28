import { useEffect, useState, memo } from "react";
import Rating from "@mui/material/Rating";
import "./ViewCourseReviews.css";
import { useNavigate, useLocation } from "react-router-dom";
function ViewCourseReviews() {
  const location = useLocation();
  return (
    <div>
      <h2 className='center'>{location.state.course.title}</h2>
      Rating:{" "}
      <Rating
        name='read-only'
        defaultValue={location.state.course.rating}
        size='meduim '
        sx={{
          color: "success.main",
        }}
        readOnly
      />
      {" " + location.state.course.rating}
    </div>
  );
}
export default memo(ViewCourseReviews);
