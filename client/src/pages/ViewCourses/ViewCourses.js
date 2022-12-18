import app from "../../utils/AxiosConfig.js";
import "./ViewCourses.css";
import { useEffect, useState, memo } from "react";
import GeneralFiltersContainer from "../../components/ViewCourses/GeneralFiltersContainer";
import SortContainer from "../../components/ViewCourses/SortContainer";
import CoursesContainer from "../../components/ViewCourses/CoursesContainer";

function ViewCourses() {
  const [courses, setCourses] = useState([]);
  const [sort, setSort] = useState("Most Popular");
  const [filter, setFilter] = useState({});
  const [noCourses, setNoCourses] = useState(false);

  useEffect(() => {
    setCourses([]);
    console.log("filter", filter);
    app
      .get(
        localStorage.getItem("type")
          ? localStorage.getItem("type") === "corporate" ||
            localStorage.getItem("type") === "individual"
            ? "/trainee/populated-courses"
            : "/" + localStorage.getItem("type") + "/populated-courses"
          : "/populated-courses",
        {
          headers: {
            country: localStorage.getItem("country"),
          },
          params: { ...filter },
        }
      )
      .then((response) => {
        switch (sort) {
          case "Most Popular":
            response.data.sort(function (a, b) {
              return b.owners.length - a.owners.length;
            });
            setCourses([...response.data]);
            break;
          case "Least Popular":
            response.data.sort(function (a, b) {
              return a.owners.length - b.owners.length;
            });
            setCourses([...response.data]);
            break;
          case "Price High to Low":
            response.data.sort(function (a, b) {
              return b.price - a.price;
            });
            setCourses([...response.data]);
            break;
          case "Price Low to High":
            response.data.sort(function (a, b) {
              return a.price - b.price;
            });
            setCourses([...response.data]);
            break;
          case "Rating High to Low":
            response.data.sort(function (a, b) {
              return b.courseRating - a.courseRating;
            });
            setCourses([...response.data]);
            break;
          case "Rating Low to High":
            response.data.sort(function (a, b) {
              return a.courseRating - b.courseRating;
            });
            setCourses([...response.data]);
            break;
          case "Most Viewed":
            response.data.sort(function (a, b) {
              return b.views - a.views;
            });
            setCourses([...response.data]);
            break;
          case "Least Viewed":
            response.data.sort(function (a, b) {
              return a.views - b.views;
            });
            setCourses([...response.data]);
            break;
          case "Newest":
            response.data.sort(function (a, b) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setCourses([...response.data]);
            break;
          case "Oldest":
            response.data.sort(function (a, b) {
              return new Date(a.createdAt) - new Date(b.createdAt);
            });
            setCourses([...response.data]);
            break;
          default:
            break;
        }
        if (response.data.length === 0) setNoCourses(true);
        else setNoCourses(false);
      });
    //eslint-disable-next-line
  }, [sort, filter]);

  return (
    <div className="view-courses-wrapper">
      <GeneralFiltersContainer
        setFilter={setFilter}
        setNoCourses={setNoCourses}
      ></GeneralFiltersContainer>
      <div className="main-content">
        <SortContainer
          courses={courses}
          setCourses={setCourses}
          setSort={setSort}
          sort={sort}
        ></SortContainer>
        <hr
          style={{
            minHeight: "3px",
            backgroundColor: "black",
            border: "none",
            flexShrink: "0",
          }}
        ></hr>
        <CoursesContainer
          courses={courses}
          noCourses={noCourses}
        ></CoursesContainer>
      </div>
    </div>
  );
}

export default memo(ViewCourses);
