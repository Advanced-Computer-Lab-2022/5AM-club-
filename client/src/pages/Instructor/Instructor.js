import { useState } from "react";
import InstructorCoursesContainer from "../../components/InstructorCoursesContainer/InstructorCoursesContainer";
import InstructorFiltersContainer from "../../components/InstructorFiltersContainer/InstructorFiltersContainer";

function Instructor() {
  const [courses, setCourses] = useState([]);
  const [mainText, setMainText] = useState("You don't have any courses yet");
  return (
    <div>
      <InstructorFiltersContainer
        instructorId={"6352fd68aaa8fae419b3a654"}
        setCourses={setCourses}
        setMainText={setMainText}
      ></InstructorFiltersContainer>
      <InstructorCoursesContainer
        instructorId={"6352fd68aaa8fae419b3a654"}
        courses={courses}
        setCourses={setCourses}
        setMainText={setMainText}
        mainText={mainText}
      ></InstructorCoursesContainer>
    </div>
  );
}
export default Instructor;
