import { useEffect, useState, memo } from "react";
import Rating from "@mui/material/Rating";
import "./ReviewContainer.css";
function ReviewContainer() {
  return (
    <div>
      <div>
        <Rating
          name='read-only'
          defaultValue={props.userReview.rating}
          size='meduim '
          sx={{
            color: "success.main",
          }}
          readOnly
        />
        {" " + props.userReview.rating + " by " + props.userReview.user.name}
      </div>
      <div>{props.userReview.review}</div>
    </div>
  );
}
export default memo(ReviewContainer);
