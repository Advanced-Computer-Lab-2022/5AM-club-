import { memo, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import proxy from "../../utils/proxy.json";
import Section from "./Section";
import axios from "axios";
import "./Subtitle.css";
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
import { formatTime } from "../../utils/Helpers";

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

  const sectionTitleRef = useRef();
  const sectionDescriptionRef = useRef();
  const sectionMinutesRef = useRef();
  const videoRef = useRef();

  function toggleDescription(e) {
    setVideo();
    setExercise("quiz");
    setShowDescription(!showDescription);
  }
  function toggleEditing() {
    setEditingDesc(!editingDesc);
  }
  function toggleEditing2() {
    setEditingTitle(!editingTitle);
  }

  function finishEdit() {
    axios
      .put(
        proxy.URL +
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
    axios
      .put(
        proxy.URL +
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
      axios
        .put(
          proxy.URL +
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
            .put(
              proxy.URL +
                "/instructor/my-courses/edit-course/" +
                props.courseid +
                "/" +
                props.subtitle._id +
                "/add-section",
              {
                title: sectionTitleRef.current.value,
                description: sectionDescriptionRef.current.value,
                minutes: sectionMinutesRef.current.value,
                content: { video: { link: videoRef.current.value } },
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
              <p
                className="title-text"
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                }}
              >
                {props.subtitle.title}
              </p>
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
                  class="btn btn-success"
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
        </div>
      </div>

      <div>
        <div>
          <button className="btn btn-secondary" onClick={toggleDescription}>
            {showDescription ? "Hide Description" : "Show Description"}
          </button>
          {showDescription && (
            <>
              <p>Description:</p>
              {!editingDesc ? (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextareaAutosize
                      defaultValue={props.subtitle.description}
                      className="description-wrapper"
                      readOnly={true}
                    ></TextareaAutosize>
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
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextareaAutosize
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                      className="description-wrapper"
                      defaultValue={props.subtitle.description}
                    ></TextareaAutosize>
                    <button
                      class="btn btn-success"
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
          <button className="btn btn-secondary" onClick={toggleExpandSections}>
            {expandSections ? "Hide Sections" : "Show Sections"}
          </button>
        </div>
        {expandSections ? <p className="sections-text">Sections:</p> : ""}
        {expandSections && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {props.subtitle.sections.map((section) => (
              <div key={section._id} className="editable-container">
                <Section
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
      <div onClick={toggleAddingSection} className="add-section-button">
        <img src={addingSection ? cancel : plus} alt="plus"></img>
        {addingSection ? "Cancel" : "Add Section"}
      </div>
      {addingSection && (
        <>
          <div>
            <div style={{ display: "inline-block" }}>
              <FormControl>
                <FormLabel id="controlled-radio-buttons-group">Type</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setVideo();
                    setExercise("quiz");
                  }}
                >
                  <FormControlLabel
                    value="exercise"
                    control={<Radio />}
                    label="Exercise"
                  />
                  <FormControlLabel
                    value="video"
                    control={<Radio />}
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
          <p>Enter section minutes:</p>
          <input
            type="number"
            ref={sectionMinutesRef}
            onChange={(e) => {
              setSectionMinutes(e.target.value);
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

          {type &&
          sectionDescription &&
          sectionMinutes > 0 &&
          sectionTitle &&
          ((video && type === "video") || (exercise && type === "exercise")) ? (
            <button onClick={addSection} className="btn btn-success">
              Done
            </button>
          ) : (
            <button disabled className="btn btn-success">
              Done
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default memo(Subtitle);
