import { memo } from "react";
import AdminPagination from "../../layouts/AdminPagination/AdminPagination";

function RefundsPage() {
  // Get all the refunds from the backend
  return (
    <AdminPagination
      items={"The Refunds"}
      itemsPerPage={12}
      type="refund"
    ></AdminPagination>
  );
}
export default memo(RefundsPage);
