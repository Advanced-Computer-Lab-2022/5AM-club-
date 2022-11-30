import { memo, useRef, useState } from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import proxy from "../../utils/proxy.json";
import "./Section.css";
import edit from "../../assets/EditCourse/edit.png";
import trash from "../../assets/EditCourse/delete.png";
import { formatTime } from "../../utils/Helpers";
import Video from "./Video";
import Exercise from "./Exercise";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@material-ui/core";

function Section(props) {
  const [showDescription, setShowDescription] = useState(false);
  const [editing, setEditing] = useState(false);
  const [expandContent, setExpandContent] = useState(false);
  const [editingLength, setEditingLength] = useState(false);
  const [editingType, setEditingType] = useState(false);
  const [length, setLength] = useState(props.section.minutes);
  const [exerciseType, setExerciseType] = useState(
    props.section.content?.exercise?.exerciseType
  );
  const [description, setDescription] = useState(props.section.description);
  const [title, setTitle] = useState(props.section.title);

  const titleRef = useRef();
  const descriptionRef = useRef();
  function toggleEditingLength() {
    setEditingLength(!editingLength);
  }
  function toggleExpandContent() {
    setExpandContent(!expandContent);
  }
  function toggleDescription(e) {
    e.preventDefault();
    setShowDescription(!showDescription);
  }
  function toggleEditingType() {
    setEditingType(!editingType);
  }
  function toggleEditing() {
    setEditing(!editing);
  }

  function deleteSection() {
    axios
      .put(
        proxy.URL +
          "/instructor/my-courses/edit-course/" +
          props.courseid +
          "/" +
          props.subtitleid +
          "/delete-section/" +
          props.section._id,
        {
          headers: {
            country: localStorage.getItem("country"),
          },
        }
      )
      .then((response) => {
        props.setCourse(response.data);
      });
  }

  async function finishEdit() {
    axios
      .put(
        proxy.URL +
          "/instructor/my-courses/edit-course/" +
          props.courseid +
          "/" +
          props.subtitleid +
          "/edit-section/" +
          props.section._id,
        {
          ...props.section,
          description: description,
          title: title,
          minutes: parseInt(length),
        },
        {
          headers: {
            country: localStorage.getItem("country"),
          },
        }
      )
      .then((response) => {
        props.setCourse(response.data);
        setEditing(false);
        setEditingLength(false);
      })
      .catch(() => {
        setEditing(false);
        setEditingLength(false);
      });
  }
  function editExerciseType() {
    axios
      .put(
        proxy.URL +
          "/instructor/my-courses/edit-course/" +
          props.courseid +
          "/" +
          props.subtitleid +
          "/edit-section/" +
          props.section._id,
        {
          ...props.section,
          content: {
            ...props.section.content,
            exercise: {
              ...props.section.content.exercise,
              exerciseType: exerciseType,
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
        setEditingType(false);
      })
      .catch(() => {
        setEditingType(false);
      });
  }

  return (
    <div>
      {!editing && (
        <div className="section-header">
          <div>
            <p className="section-title-text">{props.section?.title}</p>
            {!editingLength ? (
              <div className="length-wrapper">
                <p>{"Length : " + formatTime(props.section.minutes)}</p>
                <img
                  style={{ cursor: "pointer", width: "20px", height: "20px" }}
                  src={edit}
                  alt="editLength"
                  onClick={toggleEditingLength}
                ></img>
              </div>
            ) : (
              <div>
                <p>Length :</p>
                <input
                  type="number"
                  defaultValue={props.section.minutes}
                  onChange={(e) => {
                    setLength(e.target.value);
                  }}
                ></input>
                <button
                  className="btn btn-success"
                  onClick={finishEdit}
                  disabled={!(length > 0)}
                >
                  Done
                </button>
              </div>
            )}

            {props.section?.content?.exercise &&
              (!editingType ? (
                <div className="length-wrapper">
                  <p>
                    {"Type : " +
                      props.section.content.exercise.exerciseType
                        .charAt(0)
                        .toUpperCase() +
                      props.section.content.exercise.exerciseType.slice(1)}
                  </p>
                  <img
                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                    src={edit}
                    alt="editType"
                    onClick={toggleEditingType}
                  ></img>
                </div>
              ) : (
                <div>
                  <p>Type :</p>
                  <FormControl>
                    <FormLabel id="exercise-radio-buttons-group"></FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="exercise-radio-buttons-group"
                      name="exercise-radio-buttons-group"
                      value={exerciseType}
                      onChange={(e) => {
                        setExerciseType(e.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="quiz"
                        control={<Radio />}
                        label="Quiz"
                      />
                      <FormControlLabel
                        value="exam"
                        control={<Radio />}
                        label="Exam"
                      />
                    </RadioGroup>
                  </FormControl>
                  <button
                    className="btn btn-success"
                    onClick={editExerciseType}
                  >
                    Done
                  </button>
                </div>
              ))}
          </div>
          {showDescription && (
            <>
              <p style={{ marginLeft: "20px" }}>Description:</p>

              <TextareaAutosize
                defaultValue={props.section.description}
                className="description-wrapper"
                readOnly={true}
              ></TextareaAutosize>
            </>
          )}
          <div className="edit-section">
            <button className="btn btn-info" onClick={toggleDescription}>
              {showDescription ? "Hide Description" : "Show Description"}
            </button>
            <img src={edit} alt="edit" onClick={toggleEditing}></img>
            <img src={trash} alt="trash" onClick={deleteSection}></img>
          </div>
        </div>
      )}
      {editing && (
        <div>
          <input
            type="text"
            ref={titleRef}
            defaultValue={props.section.title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <TextareaAutosize
            ref={descriptionRef}
            defaultValue={props.section.description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></TextareaAutosize>
          <button class="btn btn-success" onClick={finishEdit}>
            Done
          </button>
        </div>
      )}
      <button className="btn btn-secondary" onClick={toggleExpandContent}>
        {expandContent ? "Hide Content" : "Show Content"}
      </button>
      {expandContent && props.section.content.video ? (
        <Video
          setCourse={props.setCourse}
          courseid={props.courseid}
          section={props.section}
          content={props.section.content.video}
          subtitleid={props.subtitleid}
          sectionid={props.section._id}
        ></Video>
      ) : expandContent ? (
        <Exercise
          setCourse={props.setCourse}
          course={props.course}
          courseid={props.courseid}
          section={props.section}
          content={props.section.content.exercise}
          subtitleid={props.subtitleid}
          sectionid={props.section._id}
        ></Exercise>
      ) : null}
    </div>
  );
}
export default memo(Section);
