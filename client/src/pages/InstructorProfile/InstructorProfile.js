import { useNavigate } from "react-router-dom";
import { memo } from "react";

import SelectCountry from "../../components/SelectCountry/SelectCountry";
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
      <SelectCountry></SelectCountry>
    </div>
  );
}
export default memo(InstructorProfile);
