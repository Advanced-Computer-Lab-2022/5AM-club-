import { useNavigate } from "react-router-dom";
import { memo } from "react";
import CourseRequestsCard from "../../components/AdminHomePageComponents/CourseRequestsCard";
function AdminPage() {
  const navigate = useNavigate();
  //const user = window.localStorage.getItem("user");
  return (
    <div>
      <button
        onClick={() => {
          navigate("add-user");
        }}
      >
        Add User
      </button>
      <CourseRequestsCard />
    </div>
  );
}
export default memo(AdminPage);
