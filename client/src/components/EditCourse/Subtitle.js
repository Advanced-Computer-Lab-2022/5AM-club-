import { memo, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Section from "./Section";
import app from "../../utils/AxiosConfig.js";
import "./Subtitle.css";
import axios from "axios";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@material-ui/core";
import plus from "../../assets/EditCourse/plusblack.png";
import cancel from "../../assets/EditCourse/cancelblack.png";
import edit from "../../assets/EditCourse/edit.png";
import trash from "../../assets/EditCourse/delete.png";
import { formatTime, convertISO8601ToMs } from "../../utils/Helpers";
import { useLocation } from "react-router-dom";

function Subtitle(props) {
  const [title, setTitle] = useState(props.subtitle.title);
  const [desc, setDesc] = useState(props.subtitle.description);
  const [showDescription, setShowDescription] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [addingSection, setAddingSection] = useState(false);
  const [sectionTitle, setSectionTitle] = useState();
  const [sectionDescription, setSectionDescription] = useState();
  const [sectionMinutes, setSectionMinutes] = useState();
  const [type, setType] = useState("exercise");
  const [video, setVideo] = useState();
  const [exercise, setExercise] = useState("quiz");
  const [expandSections, setExpandSections] = useState(false);

  const location = useLocation();

  const sectionTitleRef = useRef();
  const sectionDescriptionRef = useRef();
  const sectionMinutesRef = useRef();
  const videoRef = useRef();

  function toggleDescription(e) {
    setVideo();
    setExercise("quiz");
    setShowDescription(!showDescription);
    setSectionMinutes();
  }
  function toggleEditing() {
    setEditingDesc(!editingDesc);
  }
  function toggleEditing2() {
    setEditingTitle(!editingTitle);
  }

  function finishEdit() {
    app
      .put(
        "/instructor/my-courses/edit-course/" +
          props.courseid +
          "/edit-subtitle/" +
          props.subtitle._id,
        {
          ...props.subtitle,
          ...(title && { title: title }),
          ...(desc && {
            description: desc,
          }),
        },
        {
          headers: {
            country: localStorage.getItem("country"),
          },
        }
      )
      .then((response) => {
        props.setCourse(response.data);
        setEditingDesc(false);
      })
      .catch(() => {
        setEditingDesc(false);
      });
  }

  function deleteSubtitle() {
    app
      .put(
        "/instructor/my-courses/edit-course/" +
          props.courseid +
          "/delete-subtitle/" +
          props.subtitle._id,
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

  function toggleAddingSection() {
    setAddingSection(!addingSection);
  }

  function addSection() {
    if (type === "exercise") {
      app
        .put(
          "/instructor/my-courses/edit-course/" +
            props.courseid +
            "/" +
            props.subtitle._id +
            "/add-section",
          {
            title: sectionTitle,
            description: sectionDescription,
            minutes: sectionMinutes,
            content: {
              exercise: {
                questions: [],
                answers: [],
                choices: [],
                exerciseType: exercise,
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
          setAddingSection(false);
          setSectionTitle("");
          setSectionDescription("");
          setSectionMinutes("");
          setType("exercise");
          setExercise("quiz");
        })
        .catch(() => {
          alert("Invalid Youtube Link!");
        });
      return;
    }
    if (
      type === "video" &&
      video?.match(
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
      )
    ) {
      axios
        .get(
          "https://www.youtube.com/oembed?format=json&url=/watch?v=" +
            video?.substring(video?.lastIndexOf("=") + 1)
        )
        .then(() => {
          axios
            .get(
              "https://www.googleapis.com/youtube/v3/videos?id=" +
                video?.substring(video?.lastIndexOf("=") + 1) +
                "&part=contentDetails&key=AIzaSyDA-c7NayerkKbh5S_74nibw_yp2r4OnAA"
            )
            .then((response) => {
              console.log(response);
              app
                .put(
                  "/instructor/my-courses/edit-course/" +
                    props.courseid +
                    "/" +
                    props.subtitle._id +
                    "/add-section",
                  {
                    title: sectionTitleRef.current.value,
                    description: sectionDescriptionRef.current.value,
                    minutes: Math.floor(
                      convertISO8601ToMs(
                        response.data.items[0].contentDetails.duration
                      ) / 60
                    ),
                    content: {
                      video: { link: videoRef.current.value },
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
                  setAddingSection(false);
                  setSectionTitle("");
                  setSectionDescription("");
                  setSectionMinutes("");
                  setExercise("quiz");
                  setType("exercise");
                })
                .catch(() => {
                  alert("Invalid Youtube Link!");
                });
            });
        });
    } else {
      alert("Invalid Youtube Link!");
    }
  }
  function toggleExpandSections() {
    setExpandSections(!expandSections);
  }

  return (
    <div>
      <div className="subtitle-header">
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
                {props.subtitle.title}
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
                  defaultValue={props.subtitle.title}
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
                onClick={deleteSubtitle}
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
              {!editingDesc ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <TextareaAutosize
                      defaultValue={props.subtitle.description}
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
                        setDesc(e.target.value);
                      }}
                      className="description-wrapper"
                      defaultValue={props.subtitle.description}
                    ></TextareaAutosize>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => {
                        finishEdit();
                        toggleEditing();
                        toggleDescription();
                      }}
                      style={{ margin: "10px" }}
                      disabled={desc === ""}
                    >
                      Done
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          <p style={{ marginTop: "15px" }}>
            {"Length : " +
              (props.subtitle.minutes
                ? formatTime(props.subtitle.minutes)
                : "0m")}
          </p>
        </div>
        <div>
          <button
            className="btn btn-outline-secondary"
            onClick={toggleExpandSections}
          >
            {expandSections ? "Hide Sections" : "Show Sections"}
          </button>
        </div>
        {expandSections ? <p className="sections-text">Sections:</p> : ""}
        {expandSections && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {props.subtitle.sections.map((section) => (
              <div key={section._id} className="editable-container">
                <Section
                  course={props.course}
                  section={section}
                  courseid={props.courseid}
                  subtitleid={props.subtitle._id}
                  setCourse={props.setCourse}
                ></Section>
              </div>
            ))}{" "}
          </div>
        )}
      </div>
      {!props.course?.published && (
        <>
          <div onClick={toggleAddingSection} className="add-section-button">
            <img src={addingSection ? cancel : plus} alt="plus"></img>
            {addingSection ? "Cancel" : "Add Section"}
          </div>
        </>
      )}
      {addingSection && (
        <div className="add-section">
          <div>
            <div style={{ display: "inline-block" }}>
              <FormControl>
                <FormLabel
                  id="controlled-radio-buttons-group"
                  style={{ color: "#000000", fontSize: "20px" }}
                >
                  Type
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setVideo();
                    setSectionMinutes();
                    setExercise("quiz");
                  }}
                >
                  <FormControlLabel
                    value="exercise"
                    control={<Radio color="#00AA00" />}
                    label="Exercise"
                  />
                  <FormControlLabel
                    value="video"
                    control={<Radio color="#00AA00" />}
                    label="Video"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <p>Enter section title:</p>
          <input
            type="text"
            ref={sectionTitleRef}
            onChange={(e) => {
              setSectionTitle(e.target.value);
            }}
          ></input>

          <p>Enter section description:</p>
          <TextareaAutosize
            ref={sectionDescriptionRef}
            onChange={(e) => {
              setSectionDescription(e.target.value);
            }}
          ></TextareaAutosize>
          {type === "video" && (
            <>
              <p>Enter Video URL:</p>
              <input
                ref={videoRef}
                type="text"
                onChange={(e) => {
                  setVideo(e.target.value);
                }}
              ></input>
            </>
          )}
          {type === "exercise" && (
            <>
              <p>Enter section minutes:</p>
              <input
                type="number"
                ref={sectionMinutesRef}
                onChange={(e) => {
                  setSectionMinutes(e.target.value);
                }}
              ></input>
            </>
          )}
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            {type &&
            sectionDescription &&
            sectionTitle &&
            ((video && type === "video") ||
              (exercise && type === "exercise" && sectionMinutes > 0)) ? (
              <button onClick={addSection} className="btn btn-outline-success">
                Done
              </button>
            ) : (
              <button disabled className="btn btn-outline-success">
                Done
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(Subtitle);
