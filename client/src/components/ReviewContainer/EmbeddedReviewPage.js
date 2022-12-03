import { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import proxy from "../../utils/proxy";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import ReviewContainer from "./ReviewContainer";
import MuiCard from "@mui/material/Card";
import Button from "react-bootstrap/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
function EmbeddedReviewPage(props) {
  console.log(props);
  const navigate = useNavigate();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(-1);
  const [editable, setEditable] = useState(false);
  const handleSubmit = (event) => {
    console.log("asdfsaf");

    event.preventDefault();
    console.log(props.myReview);
    if (
      props.myReview !== undefined &&
      Object.keys(props.myReview).length !== 0
    ) {
      let url =
        proxy.URL + "/trainee/my-courses/" + props.course._id + "/edit-review";
      if (props.instructor)
        url =
          proxy.URL +
          "/trainee/my-courses/" +
          props.course._id +
          "/instructors/" +
          props.instructor.id +
          "/edit-review";
      axios
        .put(
          url,
          { rating: rating, review: review },
          {
            headers: { id: localStorage.getItem("id") },
          }
        )
        .then((res) => {
          alert("Your review has been saved");
          let myNewReviews = { ...props.myReviews };
          if (!props.instructor)
            props.setMyReviews({
              ...props.myReviews,
              courseReview: { rating: rating, review: review },
            });
          else {
            myNewReviews.instructorReview[props.index] = {
              rating: rating,
              review: review,
            };
            props.setMyReviews(myNewReviews);
          }
          console.log(props.myReviews);
          setEditable(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(props.course);
      console.log(props.instructor);
      let url =
        proxy.URL + "/trainee/my-courses/" + props.course._id + "/add-review";
      if (props.instructor)
        url =
          proxy.URL +
          "/trainee/my-courses/" +
          props.course._id +
          "/instructors/" +
          props.instructor.id +
          "/add-review";

      console.log({ rating: rating, review: review });
      axios
        .post(
          url,

          { rating: rating, review: review },
          {
            headers: { id: localStorage.getItem("id") },
          }
        )
        .then((res) => {
          alert("Your review has been saved");
          //
          let myNewReviews = { ...props.myReviews };
          if (!props.instructor) {
            myNewReviews.courseReview = { rating: rating, review: review };
            props.setMyReviews(myNewReviews);
          } else {
            myNewReviews.instructorReview[props.index] = {
              rating: rating,
              review: review,
            };
            props.setMyReviews(myNewReviews);
          }
          console.log(props.myReviews);
          setEditable(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (
      props.myReview !== undefined &&
      Object.keys(props.myReview).length !== 0
    ) {
      console.log(props.myReview);
      setReview(props.myReview.review);
      setRating(props.myReview.rating);
    }
  }, [props.myReview]);
  return (
    <Card className="reviewCard">
      <Button
        variant="outline-success"
        className="topRight"
        onClick={() => {
          if (!props.instructor)
            navigate("view-course-reviews", {
              state: { id: props.course.id },
            });
          else
            navigate("view-instructor-reviews", {
              state: { instructorId: props.instructor.id },
            });
        }}
      >
        View all reviews
      </Button>
      <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
        {props.instructor
          ? "Instructor (" + props.instructor.username + ") average Rating: "
          : "Average Course Rating:"}{" "}
        {(props.course?.courseRating || props.instructor?.instructorRating) && (
          <Rating
            name="read-only"
            defaultValue={parseFloat(
              props.instructor
                ? props.instructor.instructorRating
                : props.course.courseRating
            )}
            size="meduim"
            sx={{
              color: "success.main",
            }}
            precision={0.1}
            readOnly
          />
        )}
        (
        {props.instructor
          ? props.instructor.instructorRating
          : props.course.courseRating}
        )
      </Typography>
      {!props.instructor ? (
        <>
          <Typography variant="h6">Reviews: </Typography>
          {props.course?.userReviews.length <= 2 ? (
            props.course.userReviews.map((userReview, i) => (
              <ReviewContainer key={i} userReview={userReview} />
            ))
          ) : (
            <>
              <ReviewContainer
                key={props.course.userReviews[0]}
                userReview={props.course.userReviews[0]}
              />
              <ReviewContainer
                key={props.course.userReviews[1]}
                userReview={props.course.userReviews[1]}
              />
            </>
          )}
        </>
      ) : (
        <>
          {props.instructor?.userReviews.length <= 2 ? (
            props.instructor.userReviews.map((userReview, i) => (
              <ReviewContainer key={i} userReview={userReview} />
            ))
          ) : (
            <>
              <ReviewContainer
                key={props.instructor.userReviews[0]}
                userReview={props.instructor.userReviews[0]}
              />
              <ReviewContainer
                key={props.instructor.userReviews[1]}
                userReview={props.instructor.userReviews[1]}
              />
            </>
          )}{" "}
        </>
      )}
      {rating >= 0 && editable === false && (
        <>
          <ReviewContainer
            key={props.myReview}
            userReview={props.myReview}
            myReview={true}
          />
          <Button
            variant="outline-success"
            className="bottomRight"
            onClick={() => {
              setEditable(true);
            }}
          >
            Edit my review
          </Button>
        </>
      )}
      {editable === true && (
        <MuiCard sx={{ m: 2, p: 2 }}>
          <h4> Your Review</h4>
          <Box component="form" onSubmit={handleSubmit} autoComplete="off">
            <h5>Rating: </h5>
            <Rating
              name="read-only"
              value={rating}
              size="meduim"
              sx={{
                color: "success.main",
              }}
              precision={0.5}
              onChange={(e) => {
                setRating(e.target.value);
                console.log(rating);
              }}
            />
            <h5>Review:</h5>
            <TextField
              size="small"
              fullWidth
              multiline
              id="email"
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
                console.log(review);
              }}
            />
            <Button
              variant="outline-success"
              type="submit"
              className="marginedTop"
              disabled={rating < 0}
            >
              Post
            </Button>
          </Box>
        </MuiCard>
      )}
      {(props.myReview === undefined ||
        Object.keys(props.myReview).length === 0) &&
        editable === false && (
          <Button
            variant="outline-success"
            className="bottomRight"
            onClick={() => {
              setEditable(true);
            }}
          >
            Add review
          </Button>
        )}
    </Card>
  );
}
export default memo(EmbeddedReviewPage);
