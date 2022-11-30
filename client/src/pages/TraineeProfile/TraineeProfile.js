import { useNavigate } from "react-router-dom";
import { memo } from "react";
import SelectCountry from "../../components/SelectCountry/SelectCountry";
function TraineeProfile() {
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
      <SelectCountry></SelectCountry>
    </div>
  );
}
export default memo(TraineeProfile);
