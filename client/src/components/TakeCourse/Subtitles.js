import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { memo, useEffect, useState, useRef } from "react";
import "./Subtitles.css";
import CheckIcon from "@mui/icons-material/Check";
import { replaceAt } from "../../utils/Helpers";

function Subtitles(props) {
  const [chosenSubtitles, setChosenSubtitles] = useState([]);
  const [completedSubtitles, setCompletedSubtitles] = useState([]);
  const [chosenSection, setChosenSection] = useState(
    props.traineeCourse?.lastSection
  );

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
          for (let section of subtitle.sections) {
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
  }, [props.course, props.traineeCourse]);

  useEffect(() => {
    let completedSub = new Array(props.course?.subtitles.length).fill(false);
    if (props.course) {
      for (let i = 0; i < props.course?.subtitles.length; i++) {
        let complete = true;

        for (let j = 0; j < props.course?.subtitles[i].length; j++) {
          if (props.traineeCourse?.progress[j] === false) {
            complete = false;
            break;
          }
        }
        if (complete) {
          completedSub[i] = true;
        }
      }
    }
    setCompletedSubtitles(completedSub);

    setChosenSection(props.traineeCourse?.lastSection);
  }, [props.traineeCourse?.lastSection, props.course?.subtitles]);

  console.log(chosenSection, chosenSubtitles);

  return (
    <div>
      {props.course?.subtitles.map((subtitle, index) => {
        return (
          <Accordion
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
              <Typography>{subtitle.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {subtitle.sections.map((section, index2) => {
                return (
                  <div
                    key={sectionPosition[index] + index2}
                    className={
                      "subtitle-section " +
                      (chosenSection === sectionPosition[index] + index2
                        ? "chosen"
                        : "")
                    }
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
                    {section.title}
                    {props.traineeCourse?.progress[
                      sectionPosition[index] + index2
                    ] && <CheckIcon></CheckIcon>}
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
