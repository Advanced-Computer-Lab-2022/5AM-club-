import { useState, memo } from "react";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import app from "../../utils/AxiosConfig.js";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import "./ReviewContainer.css";
function ReviewContainer(props) {
  console.log(props);
  const location = useLocation();
  const [hovering, setHovering] = useState(false);
  const toggleHovering = () => setHovering(!hovering);
  const deleteReview = () => {
    app
      .delete(
        "/trainee/my-courses/" +
          location.state.course._id +
          (props.instructor ? "/instructors/" + props.instructor._id : "") +
          "/delete-review"
      )
      .then((res) => {
        let myNewReviews = { ...props.myReviews };
        if (!props.instructor) {
          myNewReviews.courseReview = {};
          props.setMyReviews(myNewReviews);
        } else {
          myNewReviews.instructorReview[props.index] = {};
          props.setMyReviews(myNewReviews);
        }
      });
  };
  if (
    !props.myReview &&
    props.userReview.user.username === localStorage.getItem("username")
  )
    return <></>;
  return (
    <div>
      <Card
        sx={{ m: 2, p: 2 }}
        style={{
          height: "fit-content",
        }}
      >
        <div style={{ display: "flex" }}>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: "1",
              flexWrap: "wrap",
              width: "100%",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            <Rating
              name='read-only'
              value={parseFloat(props.userReview.rating)}
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
              (props.myReview === true
                ? "You"
                : props.userReview.user.username)}
          </Typography>
          {props.myReview === true && location.state.displayAddReview && (
            <IconButton
              aria-label='delete'
              size='large'
              className='red-hover'
              onMouseEnter={toggleHovering}
              onMouseLeave={toggleHovering}
              sx={{ color: hovering ? "red" : "black" }}
              onClick={deleteReview}
            >
              <DeleteIcon fontSize='inherit' />
            </IconButton>
          )}
        </div>
        <Typography variant='h6'>{props.userReview.review} </Typography>
      </Card>
    </div>
  );
}
export default memo(ReviewContainer);
