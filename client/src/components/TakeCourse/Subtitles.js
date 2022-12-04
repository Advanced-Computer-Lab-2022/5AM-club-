import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { memo, useEffect, useState } from "react";
import "./Subtitles.css";
import CheckIcon from "@mui/icons-material/Check";
import { replaceAt, formatTime } from "../../utils/Helpers";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import QuizIcon from "@mui/icons-material/Quiz";

function Subtitles(props) {
  const [chosenSubtitles, setChosenSubtitles] = useState([]);
  const [completedSubtitles, setCompletedSubtitles] = useState([]);
  const [chosenSection, setChosenSection] = useState(
    props.traineeCourse?.lastSection
  );
  const [hovering, setHovering] = useState(
    new Array(props.course?.subtitles.length).fill(false)
  );

  const progress = JSON.stringify(props.traineeCourse?.progress);

  let sectionPosition = new Array(props.course?.subtitles.length + 1 || 0).fill(
    0
  );
  sectionPosition[1] = props.course?.subtitles[0].sections.length;
  for (let i = 2; i < sectionPosition.length; i++) {
    sectionPosition[i] =
      sectionPosition[i - 1] + props.course?.subtitles[i - 1].sections.length;
  }

  useEffect(() => {
    if (props.flag) {
      console.log(props.course, props.traineeCourse);
      let chosen = props.traineeCourse?.lastSection;

      let chosenSubtitlenum = 0;
      if (props.course) {
        for (let subtitle of props.course?.subtitles) {
          for (let j = 0; j < subtitle.sections.length; j++) {
            chosen--;
            if (chosen === -1) {
              break;
            }
          }
          if (chosen === -1) {
            break;
          }
          chosenSubtitlenum++;
        }
      }

      let temp = new Array(props.course?.subtitles.length).fill(false);
      temp[chosenSubtitlenum] = true;

      setChosenSubtitles(temp);
      if (props.course && props.traineeCourse) {
        props.setFlag(false);
      }
    }
    //eslint-disable-next-line
  }, [props.course, props.traineeCourse]);

  useEffect(() => {
    let completedSub = new Array(props.course?.subtitles.length).fill(false);
    if (props.course) {
      let k = 0;
      for (let i = 0; i < props.course?.subtitles.length; i++) {
        let complete = true;
        for (let j = 0; j < props.course?.subtitles[i].sections.length; j++) {
          if (!props.traineeCourse?.progress[k]) {
            complete = false;
            break;
          }
          k++;
        }

        if (complete) {
          completedSub[i] = true;
        }
      }
    }
    console.log(completedSub);
    setCompletedSubtitles(completedSub);

    setChosenSection(props.traineeCourse?.lastSection);
    //eslint-disable-next-line
  }, [props.traineeCourse?.lastSection, props.course?.subtitles, progress]);

  console.log(chosenSection, chosenSubtitles);

  return (
    <div>
      {props.course?.subtitles.map((subtitle, index) => {
        return (
          <Accordion
            sx={{
              "&:hover": {
                bgcolor: "#d0d0d0",
              },
            }}
            disableGutters
            TransitionProps={{ unmountOnExit: true }}
            key={subtitle._id}
            expanded={chosenSubtitles[index] || false}
            onChange={(e, expanded) => {
              let temp = [...chosenSubtitles];
              temp[index] = expanded;
              setChosenSubtitles(temp);
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className="subtitle-header">
                {completedSubtitles[index] && (
                  <CheckIcon fontSize="large" style={{ marginBottom: "12px" }}>
                    {" "}
                  </CheckIcon>
                )}

                <p className="subtitle-header">{subtitle.title}</p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {subtitle.sections.map((section, index2) => {
                return (
                  <div
                    key={sectionPosition[index] + index2}
                    className={
                      "subtitle-section-text " +
                      (chosenSection === sectionPosition[index] + index2
                        ? "chosen"
                        : "")
                    }
                    style={{
                      backgroundColor: (
                        chosenSection === sectionPosition[index] + index2
                          ? "chosen"
                          : ""
                      )
                        ? ""
                        : hovering[sectionPosition[index] + index2]
                        ? "#aaaaaa"
                        : "",
                      marginTop: index2 === 0 ? "0px" : "20px",
                    }}
                    onMouseEnter={() => {
                      let temp = new Array(props.course?.subtitles.length).fill(
                        false
                      );
                      temp[sectionPosition[index] + index2] = true;
                      setHovering(temp);
                    }}
                    onMouseLeave={() => {
                      setHovering(
                        new Array(props.course?.subtitles.length).fill(false)
                      );
                    }}
                    onClick={() => {
                      props.updateTraineeCourse({
                        ...props.traineeCourse,
                        progress: section.content.video
                          ? replaceAt(
                              props.traineeCourse.progress,
                              sectionPosition[index] + index2,
                              true
                            )
                          : props.traineeCourse.progress,
                        lastSection: sectionPosition[index] + index2,
                      });
                    }}
                  >
                    {props.traineeCourse?.progress[
                      sectionPosition[index] + index2
                    ] && <CheckIcon></CheckIcon>}

                    {index2 + 1 + ". " + section.title}
                    {section.content.video && (
                      <SlowMotionVideoIcon></SlowMotionVideoIcon>
                    )}
                    {section.content.exercise && <QuizIcon></QuizIcon>}
                    {formatTime(section.minutes)}
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

export default memo(Subtitles);
