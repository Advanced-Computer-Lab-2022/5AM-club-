import { memo, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import proxy from "../../utils/proxy.json";
import Section from "./Section";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import axios from "axios";
import { useState } from "react";
function Subtitle(props) {
  const [showDescription, setShowDescription] = useState(false);
  const [editing, setEditing] = useState(false);
  const [subtitle, setSubtitle] = useState(props.subtitle);
  const [addingSection, setAddingSection] = useState(false);
  const [type, setType] = useState("exercise");

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
          "/my-courses/edit-course/" +
          props.courseid +
          "/edit-subtitle/" +
          subtitle._id,
        {
          ...subtitle,
          title: titleRef.current.value,
          description: descriptionRef.current.value,
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
          "/my-courses/edit-course/" +
          props.courseid +
          "/delete-subtitle/" +
          subtitle._id
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
          "/my-courses/edit-course/" +
          props.courseid +
          "/" +
          subtitle._id,
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
      });
  }

  return (
    <div>
      {!editing && (
        <div>
          <p>{subtitle.title}</p>
          <link onClick={toggleDescription}>
            {showDescription ? "Hide Description" : "Show Description"}
          </link>
          {showDescription && (
            <div>
              <p>Description:</p>
              {subtitle.description}
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
            defaultValue={subtitle.title}
          ></input>
          <TextareaAutosize
            ref={descriptionRef}
            defaultValue={subtitle.description}
          ></TextareaAutosize>
          <button onClick={finishEdit}>Done</button>
        </div>
      )}
      <button onClick={toggleAddingSection}>Add Section</button>
      {addingSection && (
        <>
          <RadioGroup
            onChange={(e) => {
              setType(e.target.value);
            }}
            horizontal
          >
            <RadioButton value="exercise">Exercise</RadioButton>
            <RadioButton value="video">Video</RadioButton>
          </RadioGroup>
          <p>Enter section title:</p> <input ref={sectionTitleRef}></input>
          <p>Enter section minutes:</p> <input ref={sectionMinutesRef}></input>
          <p>Enter section description:</p>
          <TextareaAutosize ref={sectionDescriptionRef}></TextareaAutosize>
          {type === "video" && (
            <>
              <p>Enter Video URL:</p>
              <input ref={videoRef} type="text"></input>
            </>
          )}
          {type === "exercise" && (
            <>
              <p>Enter the number of questions in the exercise:</p>
              <input ref={exerciseRef} type="text" inputmode="numeric"></input>
            </>
          )}
          {(videoRef.current.value && type === "video") ||
          (exerciseRef.current.value && type === "exercise") ? (
            <button onClick={addSection}>Done</button>
          ) : (
            <button disabled>Done</button>
          )}
        </>
      )}
      <div>
        {subtitle.sections.map((section) => (
          <Section
            section={section}
            courseid={props.courseid}
            subtitleid={subtitle._id}
            setCourse={props.setCourse}
          ></Section>
        ))}
      </div>
    </div>
  );
}

export default memo(Subtitle);
