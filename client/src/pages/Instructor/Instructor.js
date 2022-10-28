import { useState } from "react";
import InstructorCoursesContainer from "../../components/InstructorCoursesContainer/InstructorCoursesContainer";
import InstructorFiltersContainer from "../../components/InstructorFiltersContainer/InstructorFiltersContainer";

function Instructor() {
  const [courses, setCourses] = useState([]);
  const [mainText, setMainText] = useState("You don't have any courses yet");
  return (
    <div>
      <InstructorFiltersContainer
        instructorId={"635a980afaca5dbffb8da03f"}
        setCourses={setCourses}
        setMainText={setMainText}
      ></InstructorFiltersContainer>
      <InstructorCoursesContainer
        instructorId={"635a980afaca5dbffb8da03f"}
        courses={courses}
        setCourses={setCourses}
        setMainText={setMainText}
        mainText={mainText}
      ></InstructorCoursesContainer>
    </div>
  );
}
export default Instructor;
