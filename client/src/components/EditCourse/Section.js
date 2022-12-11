import { memo, useRef, useState } from "react";
import app from "../../utils/AxiosConfig.js";
import TextareaAutosize from "react-textarea-autosize";
import "./Section.css";
import edit from "../../assets/EditCourse/edit.png";
import trash from "../../assets/EditCourse/delete.png";
import { formatTime } from "../../utils/Helpers";
import Video from "./Video";
import Exercise from "./Exercise";

function Section(props) {
  const [showDescription, setShowDescription] = useState(false);
  const [editing, setEditing] = useState(false);
  const [expandContent, setExpandContent] = useState(false);
  const [editingLength, setEditingLength] = useState(false);
  const [length, setLength] = useState(props.section.minutes);

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

  function toggleEditing() {
    setEditing(!editing);
  }

  function deleteSection() {
    app
      .put(
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
    app
      .put(
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

  return (
    <div>
      {!editing && (
        <div className="section-header">
          <div>
            <p className="section-title-text">{props.section?.title}</p>
            <p>{"Length : " + formatTime(props.section.minutes)}</p>

            {props.section.content.exercise &&
              (!editingLength ? (
                <div className="length-wrapper">
                  <img
                    style={{
                      cursor: "pointer",
                      width: "20px",
                      height: "20px",
                    }}
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
            <button className="btn btn-secondary" onClick={toggleDescription}>
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
      {expandContent && (
        <div style={{ marginTop: "20px" }}>
          {props.section.content.video ? (
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
      )}
    </div>
  );
}
export default memo(Section);
