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
  const [showDescription, setShowDescription] = useState(false);
  const [editing, setEditing] = useState(false);
  const [addingSection, setAddingSection] = useState(false);
  const [sectionTitle, setSectionTitle] = useState();
  const [sectionDescription, setSectionDescription] = useState();
  const [sectionMinutes, setSectionMinutes] = useState();
  const [type, setType] = useState("exercise");
  const [video, setVideo] = useState();
  const [exercise, setExercise] = useState("quiz");
  const [invalidURL, setInvalidURL] = useState(false);
  const [expandSections, setExpandSections] = useState(false);

  const sectionTitleRef = useRef();
  const sectionDescriptionRef = useRef();
  const sectionMinutesRef = useRef();
  const videoRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();

  function toggleDescription(e) {
    setVideo();
    setExercise("quiz");
    setInvalidURL(false);
    setShowDescription(!showDescription);
  }
  function toggleEditing() {
    setEditing(!editing);
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
          title: titleRef.current.value,
          description: descriptionRef.current.value,
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
      })
      .catch(() => {
        setEditing(false);
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
    setInvalidURL(false);
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
          setInvalidURL(false);
        })
        .catch(() => {
          setInvalidURL(true);
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
              setInvalidURL(false);
            })
            .catch(() => {
              setInvalidURL(true);
            });
        });
    } else setInvalidURL(true);
  }
  function toggleExpandSections() {
    setExpandSections(!expandSections);
  }

  return (
    <div>
      {!editing && (
        <div className="subtitle-header">
          <div>
            <p className="title-text">{props.subtitle.title}</p>

            <p>
              {"Length : " +
                (props.subtitle.minutes
                  ? formatTime(props.subtitle.minutes)
                  : "0m")}
            </p>
          </div>
          {showDescription && (
            <>
              <p style={{ marginLeft: "20px" }}>Description:</p>

              <TextareaAutosize
                defaultValue={props.subtitle.description}
                className="description-wrapper"
                readOnly={true}
              ></TextareaAutosize>
            </>
          )}
          <div className="edit-subtitle">
            <button className="btn btn-info" onClick={toggleDescription}>
              {showDescription ? "Hide Description" : "Show Description"}
            </button>
            <img src={edit} alt="edit" onClick={toggleEditing}></img>
            <img src={trash} alt="trash" onClick={deleteSubtitle}></img>
          </div>
        </div>
      )}
      {editing && (
        <div>
          <input
            type="text"
            ref={titleRef}
            defaultValue={props.subtitle.title}
          ></input>
          <TextareaAutosize
            ref={descriptionRef}
            defaultValue={props.subtitle.description}
          ></TextareaAutosize>
          <button class="btn btn-success" onClick={finishEdit}>
            Done
          </button>
        </div>
      )}
      <div>
        <div>
          <button className="btn btn-secondary" onClick={toggleExpandSections}>
            {expandSections ? "Hide Sections" : "Show Sections"}
          </button>
        </div>
        {expandSections ? <p className="sections-text">Sections:</p> : ""}
        {expandSections &&
          props.subtitle.sections.map((section) => (
            <div key={section._id} className="editable-container">
              <Section
                section={section}
                courseid={props.courseid}
                subtitleid={props.subtitle._id}
                setCourse={props.setCourse}
              ></Section>
            </div>
          ))}
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
                    setInvalidURL(false);
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

          {invalidURL && (
            <p style={{ color: "red" }}>Invalid youtube video link. </p>
          )}

          {type === "exercise" && (
            <div>
              <FormControl>
                <FormLabel id="exercise-radio-buttons-group">Type</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="exercise-radio-buttons-group"
                  name="exercise-radio-buttons-group"
                  value={exercise}
                  onChange={(e) => {
                    setExercise(e.target.value);
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
            </div>
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
