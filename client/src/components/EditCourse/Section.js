import { memo, useRef, useState } from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import proxy from "../../utils/proxy.json";
import "./Section.css";
import edit from "../../assets/EditCourse/edit.png";
import trash from "../../assets/EditCourse/delete.png";
import { formatTime } from "../../utils/Helpers";

function Section(props) {
  const [showDescription, setShowDescription] = useState(false);
  const [editing, setEditing] = useState(false);
  const [expandContent, setExpandContent] = useState(false);
  const [editingLength, setEditingLength] = useState(false);
  const [length, setLength] = useState(props.section.minutes);
  const [description, setDescription] = useState(props.section.description);
  const [title, setTitle] = useState(props.section.title);

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
    console.log(
      {
        ...props.section,
        description: description,
        title: title,
        minutes: parseInt(length),
      },
      "Adsf"
    );
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

  console.log(props.section);
  const titleRef = useRef();
  const descriptionRef = useRef();
  return (
    <div>
      {!editing && (
        <div className="section-header">
          <div>
            <p>{props.section?.title}</p>
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
        <div>Video</div>
      ) : expandContent ? (
        <div>exercise</div>
      ) : null}
    </div>
  );
}
export default memo(Section);
