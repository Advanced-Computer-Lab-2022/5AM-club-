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

function Subtitle(props) {
  const [showDescription, setShowDescription] = useState(false);
  const [editing, setEditing] = useState(false);
  const [addingSection, setAddingSection] = useState(false);
  const [sectionTitle, setSectionTitle] = useState();
  const [sectionDescription, setSectionDescription] = useState();
  const [sectionMinutes, setSectionMinutes] = useState();
  const [type, setType] = useState("exercise");
  const [video, setVideo] = useState();
  const [exercise, setExercise] = useState();

  const sectionTitleRef = useRef();
  const sectionDescriptionRef = useRef();
  const sectionMinutesRef = useRef();
  const exerciseRef = useRef();
  const videoRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();

  function toggleDescription(e) {
    e.preventDefault();
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
            "Content-Type": "application/json",
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
          props.subtitle._id
      )
      .then((response) => {
        props.setCourse(response.data);
      });
  }

  function toggleAddingSection() {
    setAddingSection(!addingSection);
  }

  function addSection() {
    axios
      .put(
        proxy.URL +
          "/instructor/my-courses/edit-course/" +
          props.courseid +
          "/" +
          props.subtitle._id,
        {
          title: sectionTitleRef.current.value,
          description: sectionDescriptionRef.current.value,
          minutes: sectionMinutesRef.current.value,
          content:
            type === "exercise"
              ? {
                  questions: new Array(exerciseRef.current.value).fill(null),
                  answers: new Array(exerciseRef.current.value).fill(null),
                }
              : { link: videoRef.current.value },
        }
      )
      .then((response) => {
        props.setCourse(response.data);
        setAddingSection(false);
        setSectionTitle("");
        setSectionDescription("");
        setSectionMinutes("");
        setType("exercise");
      });
  }

  return (
    <div>
      {!editing && (
        <div>
          <p>{props.subtitle.title}</p>
          <p className="description" onClick={toggleDescription}>
            {showDescription ? "Hide Description" : "Show Description"}
          </p>
          {showDescription && (
            <div>
              <p>Description:</p>
              {props.subtitle.description}
            </div>
          )}
          <button onClick={toggleEditing}>Edit</button>
          <button onClick={deleteSubtitle}>Delete</button>
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
          <button onClick={finishEdit}>Done</button>
        </div>
      )}
      <button onClick={toggleAddingSection}>Add Section</button>
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
                    setExercise();
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
          {type === "exercise" && (
            <>
              <p>Enter the number of questions in the exercise:</p>
              <input
                ref={exerciseRef}
                type="number"
                onChange={(e) => {
                  setExercise(e.target.value);
                }}
              ></input>
            </>
          )}
          {type &&
          sectionDescription &&
          sectionMinutes &&
          sectionTitle &&
          ((exercise && type === "exercise") || (video && type === "video")) ? (
            <button onClick={addSection}>Done</button>
          ) : (
            <button disabled>Done</button>
          )}
        </>
      )}
      <div>
        Sections:
        {props.subtitle.sections.map((section) => (
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
    </div>
  );
}

export default memo(Subtitle);
