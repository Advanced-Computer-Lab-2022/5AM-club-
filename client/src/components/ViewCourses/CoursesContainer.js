import { memo } from "react";
import CourseCard from "./CourseCard";
import { Spinner } from "loading-animations-react";
import noCourses from "../../assets/ViewCourses/noCourses.svg";

function CoursesContainer(props) {
  return (
    <>
      {props.noCourses ? (
        <>
          <div
            style={{
              marginBottom: "200px",
              width: "100%",
              height: "100%",
              flexGrow: "1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={noCourses}
              alt="noCourses"
              style={{ width: "200px", height: "200px" }}
            ></img>
            <p
              style={{ fontSize: "25px", fontWeight: "700", marginTop: "50px" }}
            >
              No courses matched your filters. Try broadening you filters to
              find more courses.
            </p>
          </div>
        </>
      ) : props.courses.length === 0 ? (
        <div
          style={{
            marginBottom: "300px",
            width: "100%",
            height: "100%",
            flexGrow: "1",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "200px", height: "200px" }}>
            <Spinner
              color1="#96cea8"
              color2="#96cea8"
              textColor="rgba(0,0,0, 0.5)"
            />
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "50px",
            }}
          >
            {props.courses.map((c) => (
              <div key={c._id} style={{ flexGrow: "1" }}>
                <CourseCard course={c}></CourseCard>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
export default memo(CoursesContainer);
