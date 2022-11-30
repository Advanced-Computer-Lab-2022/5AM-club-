import { useState, memo } from "react";
import TraineeCourseContainer from "../../components/TraineeCourseContainer/TraineeCourseContainer";
import TraineeFilterContainer from "../../components/TraineeFilterContainer/TraineeFilterContainer";

function TraineeMyCourses() {
  const [courses, setCourses] = useState([]);
  const [mainText, setMainText] = useState("Loading Courses...");

  return (
    <div>
      <TraineeFilterContainer
        setCourses={setCourses}
        setMainText={setMainText}
      />
      <TraineeCourseContainer
        courses={courses}
        setCourses={setCourses}
        setMainText={setMainText}
        mainText={mainText}
      />
    </div>
  );
}
export default memo(TraineeMyCourses);
