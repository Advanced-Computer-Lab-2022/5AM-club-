import { memo } from "react";
import CourseCard from "./CourseCard";
import { Spinner } from "loading-animations-react";
import noCourses from "../../assets/ViewCourses/noCourses.svg";

function CoursesContainer(props) {
  return (
    <div
      style={{
        flexGrow: "1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {props.noCourses ? (
        <>
          <img
            src={noCourses}
            alt="noCourses"
            style={{ width: "200px", height: "200px" }}
          ></img>
        </>
      ) : props.courses.length === 0 ? (
        <div
          style={{
            marginBottom: "300px",
            display: "inline-block",
            width: "200px",
            height: "200px",
          }}
        >
          <Spinner
            color1="#96cea8"
            color2="#96cea8"
            textColor="rgba(0,0,0, 0.5)"
          />
        </div>
      ) : (
        <>
          {props.courses.map((c) => (
            <div key={c._id}>
              <CourseCard course={c}></CourseCard>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
export default memo(CoursesContainer);
