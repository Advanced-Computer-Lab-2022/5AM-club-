import { useNavigate } from "react-router-dom";
import SelectCountry from "../../components/SelectCountry/SelectCountry";
function InstructorProfile() {
  const navigate = useNavigate();
  return (
    <div>
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
      <SelectCountry
        type="instructor"
        id="635ad854b2ad88bd8358a5af" // bayz
      ></SelectCountry>
    </div>
  );
}
export default InstructorProfile;
