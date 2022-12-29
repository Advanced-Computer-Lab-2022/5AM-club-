import { memo } from "react";
import AdminPagination from "../../layouts/AdminPagination/AdminPagination";

function RequestsPage() {
  // Get all the requests from the backend
  return (
    <AdminPagination
      items={"The requests"}
      itemsPerPage={12}
      type="request"
    ></AdminPagination>
  );
}
export default memo(RequestsPage);
