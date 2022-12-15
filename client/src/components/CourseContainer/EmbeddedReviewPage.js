import { useEffect, useState, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import app from "../../utils/AxiosConfig.js";
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
  const location = useLocation();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(-1);
  const [editable, setEditable] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      props.myReview !== undefined &&
      Object.keys(props.myReview).length !== 0
    ) {
      let url = "/trainee/my-courses/" + props.course._id + "/edit-review";
      if (props.instructor)
        url =
          "/trainee/my-courses/" +
          props.course._id +
          "/instructors/" +
          props.instructor.id +
          "/edit-review";
      app
        .put(url, { rating: rating, review: review })
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
          setEditable(false);
        })
        .catch((err) => {});
    } else {
      let url = "/trainee/my-courses/" + props.course._id + "/add-review";
      if (props.instructor)
        url =
          "/trainee/my-courses/" +
          props.course._id +
          "/instructors/" +
          props.instructor.id +
          "/add-review";

      app
        .post(
          url,

          { rating: rating, review: review }
        )
        .then((res) => {
          alert("Your review has been saved");
          //
          let myNewReviews = { ...props.myReviews };
          if (!props.instructor) {
            myNewReviews.courseReview = {
              rating: rating,
              review: review,
            };
            props.setMyReviews(myNewReviews);
          } else {
            myNewReviews.instructorReview[props.index] = {
              rating: rating,
              review: review,
            };
            props.setMyReviews(myNewReviews);
          }
          setEditable(false);
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {
    if (
      props.myReview !== undefined &&
      Object.keys(props.myReview).length !== 0
    ) {
      setReview(props.myReview.review);
      setRating(props.myReview.rating);
    } else {
      setReview("");
      setRating(-1);
    }
  }, [props.myReview]);
  return (
    <Card className="reviewCard">
      <div style={{ display: "flex" }}>
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            flexGrow: "1",
            alignSelf: "flex-start",
            flexWrap: "wrap",
            width: "100%",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            wordBreak: "break-word",
            flexDirection: "column",
          }}
        >
          {props.instructor && "Instructor (" + props.instructor.username + ")"}

          {(props.course?.courseRating || props.instructor?.instructorRating) &&
            (props.course?.courseRating === -1 ||
            props.instructor?.instructorRating === -1 ? (
              <p>
                {"Average" +
                  (!props.instructor ? " Course " : " ") +
                  "Rating: No ratings yet"}
              </p>
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                {props.instructor
                  ? "Average rating:"
                  : "Average Course Rating:"}
                <Rating
                  name="read-only"
                  value={parseFloat(
                    props.instructor
                      ? props.instructor.instructorRating || 0
                      : props.course.courseRating || 0
                  )}
                  size="meduim"
                  sx={{
                    color: "success.main",
                  }}
                  precision={0.1}
                  readOnly
                />
                {props.instructor
                  ? props.instructor.instructorRating
                  : props.course.courseRating}
              </div>
            ))}
        </Typography>

        <Button
          style={{
            width: "200px",
            height: "65px",
            flexShrink: "0",
            fontSize: "25px",
          }}
          variant="outline-success"
          onClick={() => {
            if (!props.instructor)
              navigate("view-course-reviews", {
                state: { course: props.course },
              });
            else
              navigate("view-instructor-reviews", {
                state: { id: props.instructor.id },
              });
          }}
        >
          View all reviews
        </Button>
      </div>
      <Typography variant="h6">Reviews: </Typography>
      {!props.instructor ? (
        <>
          {props.course?.userReviews.length <= 2 ? (
            props.course.userReviews.map((userReview, i) => (
              <div key={i}>
                <ReviewContainer userReview={userReview} />
              </div>
            ))
          ) : (
            <>
              <ReviewContainer userReview={props.course.userReviews[0]} />
              <ReviewContainer userReview={props.course.userReviews[1]} />
            </>
          )}
        </>
      ) : (
        <>
          {props.instructor?.userReviews.length <= 2 ? (
            props.instructor.userReviews.map((userReview, i) => (
              <div key={i}>
                <ReviewContainer userReview={userReview} />
              </div>
            ))
          ) : (
            <>
              <ReviewContainer userReview={props.instructor.userReviews[0]} />
              <ReviewContainer userReview={props.instructor.userReviews[1]} />
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
            instructor={props.instructor}
            setMyReviews={props.setMyReviews}
            index={props.index}
            myReviews={props.myReviews}
          />
          {location.state.displayAddReview && (
            <Button
              variant="outline-success"
              className="bottomRight"
              onClick={() => {
                setEditable(true);
              }}
            >
              Edit my review
            </Button>
          )}
        </>
      )}
      {editable === true && (
        <MuiCard sx={{ m: 2, p: 2 }}>
          <h4> Your Review</h4>
          <Box component="form" onSubmit={handleSubmit} autoComplete="off">
            <h5>Rating: </h5>
            <Rating
              name="read-only"
              value={parseFloat(rating)}
              size="meduim"
              sx={{
                color: "success.main",
              }}
              precision={0.5}
              onChange={(e) => {
                setRating(e.target.value);
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
        editable === false &&
        location.state.displayAddReview && (
          <>
            {" "}
            <Button
              variant="outline-success"
              className="bottomRight"
              onClick={() => {
                setEditable(true);
              }}
            >
              Add review
            </Button>
          </>
        )}
    </Card>
  );
}
export default memo(EmbeddedReviewPage);
