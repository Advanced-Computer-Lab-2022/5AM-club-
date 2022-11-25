import { memo, useState } from "react";
import Subtitle from "./Subtitle";
function EditCourse(props) {
  const [course, setCourse] = useState(props.course);
  return (
    <div>
      <div>Subtitles:</div>
      {course.subtitles.map((subtitle) => (
        <Subtitle
          subtitle={subtitle}
          courseid={course.courseid}
          setCourse={setCourse}
        ></Subtitle>
      ))}
    </div>
  );
}
export default memo(EditCourse);
