import { memo } from "react";
import Subtitle from "./Subtitle";
function EditCourse(props) {
  console.log(props.course?.subtitles);
  return (
    <div>
      <div>Subtitles:</div>
      {props.course
        ? props.course.subtitles.map((subtitle) => (
            <div>
              <Subtitle
                subtitle={subtitle}
                courseid={props.course._id}
                setCourse={props.setCourse}
              ></Subtitle>
            </div>
          ))
        : null}
    </div>
  );
}
export default memo(EditCourse);
