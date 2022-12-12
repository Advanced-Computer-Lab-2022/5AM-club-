import { memo, useState } from "react";
import Question from "./Question";
import plus from "../../assets/EditCourse/plusblack.png";
import cancel from "../../assets/EditCourse/cancelblack.png";
import "./Exercise.css";
import app from "../../utils/AxiosConfig.js";
import { hasEmptyString } from "../../utils/Helpers";

function Exercise(props) {
  const [addingQuestion, setAddingQuestion] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionChoices, setQuestionChoices] = useState({
    c1: "",
    c2: "",
    c3: "",
    c4: "",
  });
  const [questionAnswer, setQuestionAnswer] = useState(0);
  const [choiceColors, setChoiceColors] = useState([
    "#383838",
    "#383838",
    "#383838",
    "#383838",
  ]);

  function toggleAddingQuestion() {
    setAddingQuestion(!addingQuestion);
    setQuestionTitle("");
    setQuestionChoices({
      c1: "",
      c2: "",
      c3: "",
      c4: "",
    });
    setQuestionAnswer(-1);
    setChoiceColors(["#383838", "#383838", "#383838", "#383838"]);
  }

  function editExercise() {
    props.content.questions.push(questionTitle);
    props.content.choices.push(questionChoices);
    props.content.answers.push(questionAnswer);
    app
      .put(
        "/my-courses/edit-course/" +
          props.courseid +
          "/" +
          props.subtitleid +
          "/edit-section/" +
          props.sectionid,
        {
          ...props.section,
          content: {
            exercise: {
              ...props.content,
              questions: props.content.questions,
              choices: props.content.choices,
              answers: props.content.answers,
            },
          },
        },
        {
          headers: {
            country: localStorage.getItem("country"),
          },
        }
      )
      .then((response) => {
        props.setCourse(response.data);
        toggleAddingQuestion();
      })
      .catch(() => {
        toggleAddingQuestion();
      });
  }
  return (
    <div>
      {props.content?.questions.map((question, idx) => (
        <div key={question + idx}>
          {"Question " + (idx + 1) + " : "}
          <div className="question-wrapper">
            <Question
              idx={idx}
              courseid={props.courseid}
              subtitleid={props.subtitleid}
              sectionid={props.sectionid}
              section={props.section}
              content={props.content}
              question={question}
              choices={props.content.choices[idx]}
              answer={props.content.answers[idx]}
              setCourse={props.setCourse}
            ></Question>
          </div>
        </div>
      ))}
      <div onClick={toggleAddingQuestion} className="add-question-button">
        <img src={addingQuestion ? cancel : plus} alt="plus"></img>
        {addingQuestion ? "Cancel" : "Add Question"}
      </div>
      {addingQuestion && (
        <>
          <div className="question-container">
            <p>Enter Question : </p>
            <input onChange={(e) => setQuestionTitle(e.target.value)}></input>
          </div>
          Choices :
          <div className="choices-container">
            <div>
              A.
              <input
                style={{ backgroundColor: choiceColors[0] }}
                onChange={(e) => {
                  let newChoices = { ...questionChoices };
                  newChoices.c1 = e.target.value;
                  setQuestionChoices(newChoices);
                }}
              ></input>
              <button
                onClick={() => {
                  setQuestionAnswer(1);
                  const newColors = [
                    "#2bcc73",
                    "#e84343",
                    "#e84343",
                    "#e84343",
                  ];
                  setChoiceColors(newColors);
                }}
              >
                Mark As Correct
              </button>
              B.
              <input
                style={{ backgroundColor: choiceColors[1] }}
                onChange={(e) => {
                  let newChoices = { ...questionChoices };
                  newChoices.c2 = e.target.value;
                  setQuestionChoices(newChoices);
                }}
              ></input>
              <button
                onClick={() => {
                  setQuestionAnswer(2);
                  const newColors = [
                    "#e84343",
                    "#2bcc73",
                    "#e84343",
                    "#e84343",
                  ];
                  setChoiceColors(newColors);
                }}
              >
                Mark As Correct
              </button>
            </div>
            <div>
              C.
              <input
                style={{ backgroundColor: choiceColors[2] }}
                onChange={(e) => {
                  let newChoices = { ...questionChoices };
                  newChoices.c3 = e.target.value;
                  setQuestionChoices(newChoices);
                }}
              ></input>
              <button
                onClick={() => {
                  setQuestionAnswer(3);
                  const newColors = [
                    "#e84343",
                    "#e84343",
                    "#2bcc73",
                    "#e84343",
                  ];
                  setChoiceColors(newColors);
                }}
              >
                Mark As Correct
              </button>
              D.
              <input
                style={{ backgroundColor: choiceColors[3] }}
                onChange={(e) => {
                  let newChoices = { ...questionChoices };
                  newChoices.c4 = e.target.value;
                  setQuestionChoices(newChoices);
                }}
              ></input>
              <button
                onClick={() => {
                  setQuestionAnswer(4);
                  const newColors = [
                    "#e84343",
                    "#e84343",
                    "#e84343",
                    "#2bcc73",
                  ];
                  setChoiceColors(newColors);
                }}
              >
                Mark As Correct
              </button>
            </div>
          </div>
          <button
            className="btn btn-success"
            onClick={editExercise}
            disabled={
              !(
                !hasEmptyString(questionChoices) &&
                questionTitle &&
                questionAnswer !== -1
              )
            }
          >
            Done
          </button>
        </>
      )}
    </div>
  );
}

export default memo(Exercise);
