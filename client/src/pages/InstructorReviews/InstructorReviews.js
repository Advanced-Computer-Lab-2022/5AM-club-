import app from "../../utils/AxiosConfig.js";
import { useState, useEffect, memo } from "react";
import ReviewsPage from "../../components/ReviewContainer/ReviewsPage";
import "./InstructorReviews.css";

function InstructorReviews() {
  const [instructor, setInstructor] = useState({});
  useEffect(() => {
    app
      .get("/instructor/get-user", {
        headers: {
          type: "instructor",
        },
      })
      .then((res) => {
        setInstructor(res.data);
      })
      .catch((err) => {});
    //eslint-disable-next-line
  }, []);
  return <ReviewsPage item={instructor} type="instructor" />;
}
export default memo(InstructorReviews);
