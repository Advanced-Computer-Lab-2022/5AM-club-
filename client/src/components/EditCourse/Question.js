import { memo, useState } from "react";
import edit from "../../assets/EditCourse/edit.png";
import trash from "../../assets/EditCourse/delete.png";
import "./Exercise.css";
import app from "../../utils/AxiosConfig.js";
import "./Question.css";
import { hasEmptyString } from "../../utils/Helpers";

function Question(props) {
  const [questionTitle, setQuestionTitle] = useState(props.question);
  const [questionChoices, setQuestionChoices] = useState(props.choices);
  const [questionAnswer, setQuestionAnswer] = useState(props.answer);
  const initialChoiceColors = ["#e84343", "#e84343", "#e84343", "#e84343"];
  initialChoiceColors[props.answer - 1] = "#2bcc73";
  const [choiceColors, setChoiceColors] = useState(initialChoiceColors);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingChoices, setEditingChoices] = useState(false);

  function toggleEditingTitle() {
    setEditingTitle(!editingTitle);
  }
  function toggleEditingChoices() {
    setEditingChoices(!editingChoices);
  }
  function editExercise(title) {
    if (title) props.content.questions[props.idx] = questionTitle;
    else {
      props.content.choices[props.idx] = questionChoices;
      props.content.answers[props.idx] = questionAnswer;
    }
    app
      .put(
        "/instructor/my-courses/edit-course/" +
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
      })
      .catch(() => {});
  }
  function deleteQuestion() {
    props.content.questions.splice(props.idx, 1);
    props.content.choices.splice(props.idx, 1);
    props.content.answers.splice(props.idx, 1);
    app
      .put(
        "/instructor/my-courses/edit-course/" +
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
      })
      .catch(() => {});
  }

  return (
    <div className="section-question-container">
      <div>
        <div className="edit-question-container">
          <div style={{ flexGrow: "1", display: "flex", gap: "10px" }}>
            {!editingTitle ? (
              <>
                {" "}
                <p>{questionTitle}</p>
                {!props.course?.published && (
                  <>
                    <img
                      src={edit}
                      alt="edit"
                      onClick={toggleEditingTitle}
                      style={{
                        width: "50px",
                        height: "50px",
                        cursor: "pointer",
                      }}
                    ></img>
                  </>
                )}
              </>
            ) : (
              <>
                <input
                  defaultValue={questionTitle}
                  onChange={(e) => setQuestionTitle(e.target.value)}
                ></input>
                <button
                  disabled={questionTitle === ""}
                  className="btn btn-outline-success"
                  onClick={() => {
                    editExercise(true);
                    toggleEditingTitle();
                  }}
                >
                  Done
                </button>
              </>
            )}
          </div>
          {!props.course?.published && (
            <>
              <img
                src={trash}
                alt="trash"
                className="choices-button trash"
                onClick={deleteQuestion}
                style={{ width: "50px", height: "50px" }}
              ></img>
            </>
          )}
        </div>
        Choices :
        {!editingChoices && (
          <>
            {!props.course?.published && (
              <>
                <img
                  src={edit}
                  alt="edit"
                  className="choices-button"
                  onClick={toggleEditingChoices}
                ></img>
              </>
            )}
          </>
        )}
        <div className="choices-edit-container">
          <div className="choices-container">
            <div>
              A.
              <input
                style={{ backgroundColor: choiceColors[0] }}
                defaultValue={questionChoices.c1}
                onChange={(e) => {
                  let newChoices = { ...questionChoices };
                  newChoices.c1 = e.target.value;
                  setQuestionChoices(newChoices);
                }}
                readOnly={!editingChoices}
              ></input>
              {editingChoices && (
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
                  style={{
                    width: "30px",
                    height: "30px",
                    margin: "10px",
                    backgroundColor:
                      questionAnswer === 1 ? "#2bcc73" : "transparent",
                    border: "1px solid #000000",
                    outline: "1px solid #000000",
                    borderRadius: "100%",
                  }}
                ></button>
              )}
              B.
              <input
                style={{ backgroundColor: choiceColors[1] }}
                defaultValue={questionChoices.c2}
                onChange={(e) => {
                  let newChoices = { ...questionChoices };
                  newChoices.c2 = e.target.value;
                  setQuestionChoices(newChoices);
                }}
                readOnly={!editingChoices}
              ></input>
              {editingChoices && (
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
                  style={{
                    width: "30px",
                    height: "30px",
                    margin: "10px",
                    backgroundColor:
                      questionAnswer === 2 ? "#2bcc73" : "transparent",
                    border: "1px solid #000000",
                    outline: "1px solid #000000",
                    borderRadius: "100%",
                  }}
                ></button>
              )}
            </div>
            <div>
              C.
              <input
                style={{ backgroundColor: choiceColors[2] }}
                defaultValue={questionChoices.c3}
                onChange={(e) => {
                  let newChoices = { ...questionChoices };
                  newChoices.c3 = e.target.value;
                  setQuestionChoices(newChoices);
                }}
                readOnly={!editingChoices}
              ></input>
              {editingChoices && (
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
                  style={{
                    width: "30px",
                    height: "30px",
                    margin: "10px",
                    backgroundColor:
                      questionAnswer === 3 ? "#2bcc73" : "transparent",
                    border: "1px solid #000000",
                    outline: "1px solid #000000",
                    borderRadius: "100%",
                  }}
                ></button>
              )}
              D.
              <input
                style={{ backgroundColor: choiceColors[3] }}
                defaultValue={questionChoices.c4}
                onChange={(e) => {
                  let newChoices = { ...questionChoices };
                  newChoices.c4 = e.target.value;
                  setQuestionChoices(newChoices);
                }}
                readOnly={!editingChoices}
              ></input>
              {editingChoices && (
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
                  style={{
                    width: "30px",
                    height: "30px",
                    margin: "10px",
                    backgroundColor:
                      questionAnswer === 4 ? "#2bcc73" : "transparent",
                    border: "1px solid #000000",
                    outline: "1px solid #000000",
                    borderRadius: "100%",
                  }}
                ></button>
              )}
            </div>
          </div>
        </div>
        {editingChoices && (
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <button
              className="btn btn-outline-success"
              onClick={() => {
                editExercise(false);
                toggleEditingChoices();
              }}
              disabled={
                !(!hasEmptyString(questionChoices) && questionAnswer !== -1)
              }
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(Question);
