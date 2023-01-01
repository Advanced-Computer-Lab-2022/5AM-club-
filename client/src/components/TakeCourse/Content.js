import { memo, useEffect, useState } from "react";
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

  props.setCurrentSectionName(
    props.course?.subtitles[subtitleNumber].sections[sectionNumber]?.title
  );

  return (
    <>
      {props.traineeCourse &&
        (content.video ? (
          <div className="exercise" style={{ height: "644px" }}>
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
          </div>
        ) : (
          <div
            className="exercise"
            style={{
              border: "5px solid rgb(150, 206, 168)",
              maxHeight: "644px",
              overflow: "auto",
            }}
          >
            {" "}
            <p className="questions-header">Questions</p>
            {content.exercise.questions.map((question, index) => {
              return (
                <div className="question" key={question + index}>
                  <p className="question-title">
                    {index + 1 + ". " + question}
                  </p>
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
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                        }}
                      >
                        <div style={{ display: "flex", gap: "25px" }}>
                          <div
                            style={{
                              minWidth: "300px",
                              borderRadius: "10px",
                              paddingLeft: "10px",
                              backgroundColor: done
                                ? content.exercise.answers[index] === 1
                                  ? "#96cea8"
                                  : "#f74040"
                                : undefined,
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
                          </div>{" "}
                          <div
                            style={{
                              minWidth: "300px",
                              borderRadius: "10px",
                              paddingLeft: "10px",
                              backgroundColor: done
                                ? content.exercise.answers[index] === 2
                                  ? "#96cea8"
                                  : "#f74040"
                                : undefined,
                            }}
                          >
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
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "25px" }}>
                          {" "}
                          <div
                            style={{
                              minWidth: "300px",
                              borderRadius: "10px",
                              paddingLeft: "10px",
                              backgroundColor: done
                                ? content.exercise.answers[index] === 3
                                  ? "#96cea8"
                                  : "#f74040"
                                : undefined,
                            }}
                          >
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
                          </div>{" "}
                          <div
                            style={{
                              minWidth: "300px",
                              borderRadius: "10px",
                              paddingLeft: "10px",
                              backgroundColor: done
                                ? content.exercise.answers[index] === 4
                                  ? "#96cea8"
                                  : "#f74040"
                                : undefined,
                            }}
                          >
                            {" "}
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
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  {done && (
                    <div>
                      {" "}
                      <h4 style={{ color: "#96cea8", marginTop: "10px" }}>
                        {" "}
                        {"The correct answer is : " +
                          content.exercise.choices[index][
                            "c" + content.exercise.answers[index]
                          ]}
                      </h4>
                    </div>
                  )}
                </div>
              );
            })}
            {done && (
              <div>
                {" "}
                <h4 style={{ marginTop: "10px", marginBottom: "15px" }}>
                  {" "}
                  {"Your grade is : " +
                    props.traineeCourse.grades[
                      props.traineeCourse.lastSection
                    ] +
                    "/" +
                    content.exercise.questions.length +
                    " (" +
                    Math.floor(
                      (props.traineeCourse.grades[
                        props.traineeCourse.lastSection
                      ] /
                        content.exercise.questions.length) *
                        100
                    ) +
                    "%)"}
                </h4>
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

      <div
        className="section-desc"
        style={{
          border: "5px solid rgb(150, 206, 168)",
          maxHeight: "446px",
          borderRadius: "20px",
          padding: "20px",
          marginTop: "20px",
          maxWidth: "700px",
          overflow: "auto",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          wordBreak: "break-word",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <h6>
          About this section :
          {" " +
            props.course?.subtitles[subtitleNumber]?.sections[sectionNumber]
              ?.description}
        </h6>
      </div>
    </>
  );
}

export default memo(Content);
