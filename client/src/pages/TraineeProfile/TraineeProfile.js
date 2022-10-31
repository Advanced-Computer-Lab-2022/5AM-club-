import { useLocation, useNavigate } from "react-router-dom";
import SelectCountry from "../../components/SelectCountry/SelectCountry";
function TraineeProfile() {
  const navigate = useNavigate();
  const location = useLocation();
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
        id={
          location.pathname.includes("individual")
            ? "635e992a99ecb836d834f7fd"
            : "635f05a51832d2cde2c26d88"
        }
      ></SelectCountry>
    </div>
  );
}
export default TraineeProfile;
