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
        View My Courses
      </button>
    </div>
  );
}
export default memo(InstructorProfile);
