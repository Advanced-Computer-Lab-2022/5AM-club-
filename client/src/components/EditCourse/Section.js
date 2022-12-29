import { memo, useState } from "react";
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
  const [editingTitle, setEditingTitle] = useState(false);
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
  function toggleEditing2() {
    setEditingTitle(!editingTitle);
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
      <div className="section-header">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            flexWrap: "wrap",
            wordBreak: "break-all",
          }}
        >
          {!editingTitle ? (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                flexGrow: "1",
              }}
            >
              <div
                className="title-text"
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                }}
              >
                {props.section?.title}
                {!props.course?.published && (
                  <>
                    <img
                      src={edit}
                      alt="edit"
                      onClick={toggleEditing2}
                      style={{
                        display: "flex",

                        margin: "10px",
                        width: "50px",
                        cursor: "pointer",
                        alignSelf: "flex-start",
                      }}
                    ></img>
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              {" "}
              <div
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  flexGrow: "1",
                  alignItems: "center",
                }}
              >
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  defaultValue={props.section?.title}
                ></input>
                <button
                  className="btn btn-outline-success"
                  onClick={() => {
                    finishEdit();
                    toggleEditing2();
                  }}
                  style={{ margin: "10px" }}
                  disabled={title === ""}
                >
                  Done
                </button>
              </div>
            </>
          )}
          {!props.course?.published && (
            <>
              <img
                src={trash}
                alt="trash"
                onClick={deleteSection}
                style={{
                  width: "50px",
                  height: "50px",
                  alignSelf: "flex-end",
                  marginBottom: "15px",
                  cursor: "pointer",
                }}
              ></img>
            </>
          )}
        </div>
      </div>

      <div>
        <div>
          <button
            className="btn btn-outline-secondary"
            onClick={toggleDescription}
          >
            {showDescription ? "Hide Description" : "Show Description"}
          </button>
          {showDescription && (
            <>
              <p>Description:</p>
              {!editing ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <TextareaAutosize
                      defaultValue={props.section?.description}
                      className="description-wrapper"
                      readOnly={true}
                    ></TextareaAutosize>
                    {!props.course?.published && (
                      <>
                        <img
                          src={edit}
                          alt="edit"
                          onClick={toggleEditing}
                          style={{
                            margin: "10px",
                            width: "50px",
                            cursor: "pointer",
                          }}
                        ></img>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <TextareaAutosize
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      className="description-wrapper"
                      defaultValue={props.section?.description}
                    ></TextareaAutosize>
                    <button
                      className="btn btn-outline-success"
                      onClick={(e) => {
                        finishEdit();
                        toggleEditing();
                        toggleDescription(e);
                      }}
                      style={{ margin: "10px" }}
                      disabled={description === ""}
                    >
                      Done
                    </button>
                  </div>
                </>
              )}
            </>
          )}
          <div>
            {props.section.content.exercise &&
              (!editingLength ? (
                <div className="length-wrapper">
                  <div style={{ display: "inline" }}>
                    {"Length :" + formatTime(props.section.minutes)}
                  </div>
                  {!props.course?.published && (
                    <>
                      {!props.course?.published && (
                        <>
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
                        </>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <div style={{ display: "inline" }}>Length :</div>
                  <input
                    type="number"
                    defaultValue={props.section.minutes}
                    onChange={(e) => {
                      setLength(e.target.value);
                    }}
                  ></input>
                  <button
                    className="btn btn-outline-success"
                    onClick={finishEdit}
                    disabled={!(length > 0)}
                  >
                    Done
                  </button>
                </div>
              ))}
          </div>
        </div>

        <button
          className="btn btn-outline-secondary"
          onClick={toggleExpandContent}
        >
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
                course={props.course}
              ></Video>
            ) : expandContent ? (
              <Exercise
                course={props.course}
                setCourse={props.setCourse}
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
    </div>
  );
}
export default memo(Section);
