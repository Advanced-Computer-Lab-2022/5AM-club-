import { memo } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import ReviewContainer from "./ReviewContainer";
function ReviewsPage(props) {
  return (
    <Card style={{ display: "flex", flexDirection: "column" }}>
      <Typography gutterBottom variant='h5' component='div'>
        {props.type === "course" ? props.item?.title : props.item?.username}
      </Typography>
      <Typography variant='h6' sx={{ display: "flex", alignItems: "center" }}>
        Average Rating:{" "}
        {(props.item.courseRating || props.item.instructorRating) &&
          (props.item.courseRating === -1 ||
          props.item.instructorRating === -1 ? (
            "No ratings yet"
          ) : (
            <Rating
              name='read-only'
              defaultValue={
                props.type === "course"
                  ? parseFloat(props.item.courseRating) || 0
                  : parseFloat(props.item.instructorRating) || 0
              }
              size='medium'
              sx={{
                color: "success.main",
              }}
              precision={0.1}
              readOnly
            />
          ))}
        {" (" +
          (props.type === "course"
            ? props.item.courseRating
            : props.item?.instructorRating) +
          ") "}
      </Typography>
      <Typography variant='h6'>Reviews: </Typography>
      {props.item?.userReviews?.map((userReview) => (
        <ReviewContainer
          key={userReview}
          userReview={userReview}
          myReview={localStorage.getItem("id") === userReview.user._id}
        />
      ))}
    </Card>
  );
}
export default memo(ReviewsPage);
