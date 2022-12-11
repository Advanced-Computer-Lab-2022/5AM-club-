import proxy from "../../utils/proxy";
import app from "../../utils/axiosConfig.js";
import { useState, useEffect, memo } from "react";
import { useLocation } from "react-router-dom";
import ReviewsPage from "../../components/ReviewContainer/ReviewsPage";
import "./InstructorReviews.css";

function InstructorReviews() {
    const [instructor, setInstructor] = useState({});
    const location = useLocation();
    useEffect(() => {
        app.get("/get-user", {
            headers: {
                id:
                    window.localStorage.getItem("type") === "instructor"
                        ? window.localStorage.getItem("id")
                        : location.state.instructorId,
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
