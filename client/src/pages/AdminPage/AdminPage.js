import { memo } from "react";
import CourseRequestsCard from "../../components/AdminHomePage/CourseRequestsCard";
import CourseRefundCard from "../../components/AdminHomePage/CourseRefundCard";
import ReportsCard from "../../components/AdminHomePage/ReportsCard";
import AddUser from "../../components/AdminHomePage/AddUserCard";
import CoursePromoCard from "../../components/AdminHomePage/CoursePromoCard";

function AdminPage() {
  //const user = window.localStorage.getItem("user");
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        gap: "40px",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",

          justifyContent: "center",
          gap: "40px",
        }}
      >
        <ReportsCard />
        <CourseRequestsCard />
        <CourseRefundCard />
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "40px" }}>
        <AddUser />
        <CoursePromoCard />
      </div>
    </div>
  );
}
export default memo(AdminPage);
