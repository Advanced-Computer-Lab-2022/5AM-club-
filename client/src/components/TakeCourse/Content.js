import { height } from "@mui/system";
import { memo } from "react";
import "./Content.css";
function Content(props) {
  let subtitleNumber = 0;
  let counter = props.traineeCourse?.lastSection;
  let sectionNumber = -1;

  for (let i = 0; i < props.course?.subtitles.length; i++) {
    for (let j = 0; j < props.course?.subtitles[i].sections.length; j++) {
      console.log(
        props.traineeCourse,
        "Iteation: " +
          i +
          " // " +
          j +
          " Counter: " +
          counter +
          " Section Number: " +
          sectionNumber
      );
      counter--;
      sectionNumber -= -1;

      if (counter === -1) {
        subtitleNumber = i;
        break;
      }
    }
    if (counter === -1) {
      break;
    }
    sectionNumber = -1;
  }

  console.log(sectionNumber, subtitleNumber);

  return (
    <>
      {props.traineeCourse &&
        (props.course?.subtitles[subtitleNumber].sections[sectionNumber].content
          .video ? (
          <iframe
            title="course-video"
            className="iframe"
            width="inherit"
            src={props.course?.subtitles[subtitleNumber].sections[
              sectionNumber
            ].content.video.link.replace("watch?v=", "embed/")}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <div> Exercise</div>
        ))}
    </>
  );
}

export default memo(Content);
