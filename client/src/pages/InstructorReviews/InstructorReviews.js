import proxy from "../../utils/proxy";
import axios from "axios";
import { useState, useEffect, memo } from "react";
import ReviewsPage from "../../components/ReviewContainer/ReviewsPage";
import "./InstructorReviews.css";

function InstructorReviews() {
  const [instructor, setInstructor] = useState({});

  useEffect(() => {
    axios
      .get(proxy.URL + "/get-user", {
        headers: {
          id: window.localStorage.getItem("id"),
          type: "instructor",
        },
      })
      .then((res) => {
        setInstructor(res.data);
      })
      .catch((err) => {});
  }, []);
  return <ReviewsPage item={instructor} type='instructor' />;
}
export default memo(InstructorReviews);
