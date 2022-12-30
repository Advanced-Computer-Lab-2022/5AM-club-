import app from "../../utils/AxiosConfig.js";
import "./ViewMyCourses.css";
import { useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom";
import MyFiltersContainer from "../../components/ViewMyCourses/MyFiltersContainer";
import MyCoursesContainer from "../../components/ViewMyCourses/MyCoursesContainer";
import { useSearchParams } from "react-router-dom";

function ViewMyCourses() {
  const location = useLocation();

  const [courses, setCourses] = useState([]);
  const [noCourses, setNoCourses] = useState(false);
  const [filter, setFilter] = useState({
    searchItem:
      location.state?.searchItem !== null &&
      location.state?.searchItem !== undefined
        ? location.state?.searchItem
        : null,
  });
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("added");
  useEffect(() => {
    async function insideEffect() {
      //handle somethingggg
      console.log("welcome to ypur courses");
      if (token != null) {
        console.log(token);
        console.log(">>>>>>>>>>>>>>>>>>>>");
        await app.post("add-course-to-individual", { token }).then((res) => {
          console.log("<<<<<<<<<<<<<<<<<<<<<");
          console.log("added course to ind");
          console.log(res);
        });
      }
      setCourses([]);
      console.log(filter);
      await app
        .get(
          localStorage.getItem("type")
            ? localStorage.getItem("type") === "corporate" ||
              localStorage.getItem("type") === "individual"
              ? "/trainee/my-populated-courses"
              : "/" + localStorage.getItem("type") + "/my-populated-courses"
            : "/my-populated-courses",
          {
            headers: {
              type: localStorage.getItem("type"),
              country: localStorage.getItem("country"),
            },
            params: { ...filter },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.length === 0) setNoCourses(true);
          else {
            setNoCourses(false);
            setCourses(response.data);
          }
        });
    }
    insideEffect();
    //eslint-disable-next-line
  }, [filter]);

  return (
    <div className="view-courses-wrapper">
      {localStorage.getItem("type") === "instructor" && (
        <MyFiltersContainer
          setFilter={setFilter}
          setNoCourses={setNoCourses}
        ></MyFiltersContainer>
      )}
      <div className="main-content">
        <MyCoursesContainer
          courses={courses}
          noCourses={noCourses}
        ></MyCoursesContainer>
      </div>
    </div>
  );
}

export default memo(ViewMyCourses);
