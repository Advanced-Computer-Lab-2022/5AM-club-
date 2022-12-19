import app from "../../utils/AxiosConfig.js";
import "./ViewMyCourses.css";
import { useEffect, useState, memo } from "react";
import MyCoursesContainer from "../../components/ViewMyCourses/MyCoursesContainer.js";

function ViewMyCourses() {
  const [courses, setCourses] = useState([]);
  const [noCourses, setNoCourses] = useState(false);

  useEffect(() => {
    setCourses([]);
    app
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
          params: { filter: {} },
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
    //eslint-disable-next-line
  }, []);

  return (
    <div className="view-courses-wrapper">
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
