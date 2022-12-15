import { useNavigate } from "react-router-dom";
import { memo } from "react";

function InstructorProfile() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("courses");
        }}
      >
        View Courses
      </button>
      <button
        onClick={() => {
          navigate("my-courses");
        }}
      >
        View my Courses
      </button>
      <button
        onClick={() => {
          navigate("create-course");
        }}
      >
        create new course
      </button>
      <button
        onClick={() => {
          navigate("my-reviews");
        }}
      >
        view my reviews
      </button>
      <button
        onClick={() => {
          navigate("my-personal-information");
        }}
      >
        view my personal information
      </button>
      <button
        onClick={() => {
          navigate("view-contract");
        }}
      >
        View Contract
      </button>
    </div>
  );
}
export default memo(InstructorProfile);
