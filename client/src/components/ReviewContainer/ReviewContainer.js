import { useEffect, useState, memo } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import "./ReviewContainer.css";
function ReviewContainer(props) {
  console.log(
    props.userReview,
    !props.myReview && props.userReview.user._id === localStorage.getItem("id"),
    "asd"
  );
  if (
    !props.myReview &&
    props.userReview.user._id === localStorage.getItem("id")
  )
    return <></>;
  return (
    <Card
      sx={{ m: 2, p: 2 }}
      style={{
        height: "fit-content",
      }}
    >
      <Typography
        gutterBottom
        variant='h5'
        component='div'
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Rating
          name='read-only'
          defaultValue={props.userReview.rating}
          size='small'
          sx={{
            color: "success.main",
          }}
          precision={0.5}
          readOnly
        />
        {" (" +
          props.userReview.rating +
          ") " +
          " by " +
          (props.myReview === true ? "You" : props.userReview.user.username)}
      </Typography>
      <Typography variant='h6'>{props.userReview.review} </Typography>
    </Card>
  );
}
export default memo(ReviewContainer);
