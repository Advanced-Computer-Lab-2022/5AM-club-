import { memo } from "react";
import AdminPagination from "../../layouts/AdminPagination/AdminPagination";

function ReportsPage() {
  // Get all the reports from the backend
  return (
    <AdminPagination
      items={"The Reports"}
      itemsPerPage={12}
      type="report"
    ></AdminPagination>
  );
}
export default memo(ReportsPage);
