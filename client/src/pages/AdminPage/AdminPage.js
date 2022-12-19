import { memo } from "react";
import CourseRequestsCard from "../../components/AdminHomePageComponents/CourseRequestsCard";
import CoursePromoCard from "../../components/AdminHomePageComponents/CoursePromoCard";
import AddUserCard from "../../components/AdminHomePageComponents/AddUserCard";
function AdminPage() {
  //const user = window.localStorage.getItem("user");
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
        height: "100%",
      }}
    >
      <AddUserCard />
      <CourseRequestsCard />
      <CoursePromoCard />
    </div>
  );
}
export default memo(AdminPage);
