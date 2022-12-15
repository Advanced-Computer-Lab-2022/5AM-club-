import app from "../../utils/AxiosConfig.js";
import { useLocation } from "react-router-dom";
import { useState, useEffect, memo } from "react";
import ReviewsPage from "../../components/CourseContainer/ReviewsPage";
import "./InstructorReviews.css";

function InstructorReviews() {
  const location = useLocation();
  console.log(location.state && location.state.id);
  const [instructor, setInstructor] = useState();
  useEffect(() => {
    app
      .get("/instructor/get-user", {
        headers: {
          id: location.state && location.state.id,
          type: "instructor",
        },
      })
      .then((res) => {
        console.log(res.data);
        setInstructor(res.data);
      })
      .catch((err) => {});
    //eslint-disable-next-line
  }, []);
  return instructor && <ReviewsPage item={instructor} type='instructor' />;
}
export default memo(InstructorReviews);
