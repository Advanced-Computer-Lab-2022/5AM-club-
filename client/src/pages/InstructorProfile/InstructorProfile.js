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
        id="6355091ab4c387ca835c6bfc"
      ></SelectCountry>
    </div>
  );
}
export default InstructorProfile;
