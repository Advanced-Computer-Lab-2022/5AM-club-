import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { memo } from "react";

function Subtitles(props) {
  const [chosenSection, setChosenSection] = useState(
    props.traineeCourse?.lastSection
  );

  let chosen = props.traineeCourse?.lastSection;
  let chosenSubtitlenum = 0;

  for (let subtitle of props.course?.subtitles) {
    for (let section of subtitle) {
      if (chosen === 0) {
        break;
      }
      chosen--;
    }
    if (chosen === 0) {
      break;
    }
    chosenSubtitlenum++;
  }
  const [chosenSubtitle, setChosenSubtitle] = useState(chosenSubtitlenum);

  let chosenSubtitles = new Array(props.course?.subtitles.length).fill(false);
  for (let i = 0; i < props.course?.subtitles.length; i++) {
    let complete = true;

    for (let j = 0; j < props.course?.subtitles[i].length; j++) {
      if (props.traineeCourse?.progress[j] === false) {
        complete = false;
        break;
      }
    }
    if (complete) {
      chosenSubtitles[i] = true;
    }
  }

  const [completedSubtitles, setCompletedSubtitles] = useState(chosenSubtitles);
  // <Accordion TransitionProps={{ unmountOnExit: true }} />
  return (
    <div>
      {props.course?.subtitles.map((subtitle, index) => {
        return (
          <Accordion
            TransitionProps={{ unmountOnExit: true }}
            key={subtitle._id}
            expanded={chosenSubtitle === index}
            onChange={() => {
              setChosenSubtitle(index);
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{subtitle[0].subtitleTitle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {subtitle.sections.map((section, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        "subtitle-section " +
                        (completedSubtitles[index] ? "completed" : "")
                      }
                      onClick={() => {
                        setChosenSection(index);
                        props.setTraineeCourse({
                          ...props.traineeCourse,
                          lastSection: index,
                        });
                      }}
                    >
                      {section.title}
                    </div>
                  );
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

export default memo(Subtitles);
