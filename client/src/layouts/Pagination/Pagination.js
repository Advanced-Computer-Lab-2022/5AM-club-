import React, { memo, useState } from "react";
import ReactPaginate from "react-paginate";
import CourseCard from "../../components/ViewCourses/CourseCard";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./Pagination.css";

export default memo(function Pagination({ itemsPerPage, items }) {
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
        gap: "65px",
      }}
    >
      {items.slice(offset, offset + itemsPerPage).map((c) => (
        <div key={c._id}>
          <CourseCard course={c}></CourseCard>
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
