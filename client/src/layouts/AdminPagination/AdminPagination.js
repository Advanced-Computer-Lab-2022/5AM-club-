import React, { memo, useState } from "react";
import ReactPaginate from "react-paginate";
import ReportCard from "../../components/AdminCards/ReportCard";
import RequestCard from "../../components/AdminCards/RequestCard";
import RefundCard from "../../components/AdminCards/RefundCard";
import "./AdminPagination.css";

export default memo(function AdminPagination({ itemsPerPage, items, type }) {
  const [currentPage, setCurrentPage] = useState(0);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * itemsPerPage;

  const currentPageData = (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "30px",
      }}
    >
      {items.slice(offset, offset + itemsPerPage).map((item, idx) => (
        <div key={item._id + idx}>
          {type === "report" ? (
            <ReportCard report={item}></ReportCard>
          ) : type === "request" ? (
            <RequestCard request={item}></RequestCard>
          ) : (
            <RefundCard refund={item}></RefundCard>
          )}
        </div>
      ))}
    </div>
  );

  const pageCount = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="paginator">
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      {currentPageData}
    </div>
  );
});
