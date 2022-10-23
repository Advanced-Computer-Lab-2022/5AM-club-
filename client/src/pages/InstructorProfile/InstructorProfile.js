import { useNavigate } from "react-router-dom";
function InstructorProfile() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("courses");
        }}
      >
        View my Courses
      </button>
    </div>
  );
}
export default InstructorProfile;
