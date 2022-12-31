import React, { memo, useState } from "react";
import ReactPaginate from "react-paginate";
import ReportCard from "../../components/AdminCards/ReportCard";
import RequestCard from "../../components/AdminCards/RequestCard";
import RefundCard from "../../components/AdminCards/RefundCard";
import "./AdminPagination.css";

export default memo(function AdminPagination({
  itemsPerPage,
  items,
  type,
  accept,
  reject,
  requestType,
}) {
  const [currentPage, setCurrentPage] = useState(0);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * itemsPerPage;

  const currentPageData = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        gap: "30px",
      }}
    >
      {items.slice(offset, offset + itemsPerPage).map((item, idx) => (
        <div key={item._id + idx}>
          {type === "report" ? (
            <ReportCard
              report={item}
              pend={accept}
              resolve={reject}
              requestType={requestType}
            ></ReportCard>
          ) : type === "request" ? (
            <div style={{ flexGrow: "1" }}>
              <RequestCard
                request={item}
                accept={accept}
                reject={reject}
                requestType={requestType}
              ></RequestCard>
            </div>
          ) : (
            <RefundCard refund={item}></RefundCard>
          )}
        </div>
      ))}
    </div>
  );

  const pageCount = Math.ceil(items.length / itemsPerPage);

  return (
    <div
      className="paginator"
      style={{ height: "100%", flexGrow: "1", display: "flex" }}
    >
      <div style={{ marginTop: "auto" }}>
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
      </div>
      {currentPageData}
    </div>
  );
});
