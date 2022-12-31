import { memo, useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import "./Content.css";
import { hasNull } from "../../utils/Helpers";
import { useUpdateEffect } from "react-use";

function Content(props) {
  let subtitleNumber = 0;
  let counter = props.traineeCourse?.lastSection;
  let sectionNumber = -1;
  for (let i = 0; i < props.course?.subtitles.length; i++) {
    for (let j = 0; j < props.course?.subtitles[i].sections.length; j++) {
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
  let content = props.traineeCourse
    ? props.course?.subtitles[subtitleNumber].sections[sectionNumber].content
    : undefined;
  const done = props.traineeCourse?.progress[props.traineeCourse?.lastSection];
  const [traineeAnswers, setTraineeAnswers] = useState();
  function handleSubmit() {
    let grade = 0;
    let correctAnswers = content.exercise.answers;

    for (let i = 0; i < correctAnswers.length; i++) {
      if (traineeAnswers[i] === correctAnswers[i]) grade++;
    }

    props.traineeCourse.progress[props.traineeCourse.lastSection] = true;
    props.traineeCourse.answers[props.traineeCourse.lastSection] =
      traineeAnswers;
    props.traineeCourse.grades[props.traineeCourse.lastSection] = grade;
    props.updateTraineeCourse(props.traineeCourse);
  }
  useUpdateEffect(() => {
    setTraineeAnswers(
      props.traineeCourse?.answers[props.traineeCourse?.lastSection]
    );
  }, [props.traineeCourse?.lastSection]);

  return (
    <>
      {props.traineeCourse &&
        (content.video ? (
          <div className="iframe">
            <iframe
              key={content.video.link.replace("watch?v=", "embed/")}
              title="course-video"
              width="inherit"
              className="iframe"
              src={content.video.link.replace("watch?v=", "embed/")}
              style={{ borderRadius: "10px" }}
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="exercise">
            {content.exercise.questions.map((question, index) => {
              return (
                <div className="question" key={question + index}>
                  <p className="questions-header">Questions:</p>
                  <p className="question-title">{question + ": "}</p>
                  <FormControl>
                    <FormLabel id="exercise-radio-buttons-group"></FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="exercise-radio-buttons-group"
                      name="exercise-radio-buttons-group"
                      onChange={(e) => {
                        let temp = [...traineeAnswers];
                        temp[index] = parseInt(e.target.value);
                        setTraineeAnswers(temp);
                      }}
                    >
                      <FormControlLabel
                        checked={
                          done && traineeAnswers
                            ? traineeAnswers[index] === 1
                            : undefined
                        }
                        value={"1"}
                        control={<Radio />}
                        label={content.exercise.choices[index].c1}
                        disabled={done}
                      />
                      <FormControlLabel
                        checked={
                          done && traineeAnswers
                            ? traineeAnswers[index] === 2
                            : undefined
                        }
                        value={"2"}
                        control={<Radio />}
                        label={content.exercise.choices[index].c2}
                        disabled={done}
                      />
                      <FormControlLabel
                        checked={
                          done && traineeAnswers
                            ? traineeAnswers[index] === 3
                            : undefined
                        }
                        value={"3"}
                        control={<Radio />}
                        label={content.exercise.choices[index].c3}
                        disabled={done}
                      />
                      <FormControlLabel
                        checked={
                          done && traineeAnswers
                            ? traineeAnswers[index] === 4
                            : undefined
                        }
                        value={"4"}
                        control={<Radio />}
                        label={content.exercise.choices[index].c4}
                        disabled={done}
                      />
                    </RadioGroup>
                  </FormControl>
                  {done && (
                    <div>
                      {" "}
                      <p>
                        {" "}
                        {"The correct answer is: " +
                          content.exercise.choices[index][
                            "c" + content.exercise.answers[index]
                          ]}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
            {done && (
              <div>
                {" "}
                <p>
                  {" "}
                  {"Your grade is:" +
                    props.traineeCourse.grades[
                      props.traineeCourse.lastSection
                    ] +
                    "/" +
                    content.exercise.questions.length}{" "}
                </p>
              </div>
            )}
            {!props.traineeCourse.progress[props.traineeCourse.lastSection] && (
              <button
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={hasNull(traineeAnswers)}
              >
                Submit
              </button>
            )}
          </div>
        ))}
      <p>
        {
          props.course?.subtitles[subtitleNumber]?.sections[sectionNumber]
            ?.description
        }
      </p>
    </>
  );
}

export default memo(Content);
