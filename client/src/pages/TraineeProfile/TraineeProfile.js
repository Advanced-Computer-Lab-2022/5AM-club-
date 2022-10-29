import { useNavigate } from "react-router-dom";
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
      <SelectCountry
        type="trainee"
        id="635ad854b2ad88bd8358a5af"
      ></SelectCountry>
    </div>
  );
}
export default TraineeProfile;
