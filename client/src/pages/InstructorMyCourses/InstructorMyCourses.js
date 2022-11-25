import { useState, memo } from "react";
import InstructorCoursesContainer from "../../components/InstructorCoursesContainer/InstructorCoursesContainer";
import InstructorFiltersContainer from "../../components/InstructorFiltersContainer/InstructorFiltersContainer";

function InstructorMyCourses() {
  const [courses, setCourses] = useState([]);
  const [mainText, setMainText] = useState("Loading Courses...");

  return (
    <div>
      <InstructorFiltersContainer
        setCourses={setCourses}
        setMainText={setMainText}
      ></InstructorFiltersContainer>
      <InstructorCoursesContainer
        courses={courses}
        setCourses={setCourses}
        setMainText={setMainText}
        mainText={mainText}
      ></InstructorCoursesContainer>
    </div>
  );
}
export default memo(InstructorMyCourses);
