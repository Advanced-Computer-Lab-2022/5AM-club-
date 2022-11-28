import axios from "axios";
import proxy from "../../utils/proxy.json";
import { memo, useRef, useState } from "react";
import Subtitle from "./Subtitle";
import TextareaAutosize from "react-textarea-autosize";
import { formatTime, displayNames, displayValues } from "../../utils/Helpers";
import { Box, Rating } from "@mui/material";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import countries from "../../utils/Countries.json";
import CourseVideo from "./CourseVideo";
import "./EditCourse.css";
import plus from "../../assets/EditCourse/plus.png";
function EditCourse(props) {
  const [addingSubtitle, setAddingSubtitle] = useState(false);
  const [subtitleTitle, setSubtitleTitle] = useState("");
  const [subtitleDescription, setSubtitleDescription] = useState("");
  const [editingDescripton, setEditingDescription] = useState(false);
  const [description, setDescription] = useState(props.course?.description);
  function addSubtitle() {
    axios
      .put(
        proxy.URL + "/instructor/my-courses/edit-course/" + props.course._id,
        { title: subtitleTitle, description: subtitleDescription, sections: [] }
      )
      .then((response) => {
        props.setCourse(response.data);
        setAddingSubtitle(false);
        setSubtitleDescription("");
        setSubtitleTitle("");
      });
  }
  function toggleAddingSubtitle() {
    setAddingSubtitle(!addingSubtitle);
  }
  function editCourse() {
    axios
      .put(
        proxy.URL + "/instructor/my-courses/edit-course/" + props.course._id,
        {
          ...props.course,
          summary: description,
        }
      )
      .then((response) => {
        props.setCourse(response.data);
        setEditingDescription(false);
      });
  }
  function toggleEditingDescription() {
    setEditingDescription(!editingDescripton);
  }
  const subtitleTitleRef = useRef();
  const subtitleDescriptionRef = useRef();
  return (
    <div className="edit-course-wrapper">
      <div className="header-wrapper">
        <div>
          <p className="title-text"> {props.course?.title}</p>
        </div>
        <div className="properties-wrapper">
          <div className="course-attribute">
            <p>{displayValues(props.course?.subject)}</p>
          </div>
          <div className="course-attribute">
            <p>
              {"Price : " +
                props.course?.price +
                " " +
                countries[
                  Object.keys(countries).find(
                    (e) => e === localStorage.getItem("country")
                  )
                ]}
            </p>
          </div>
          <div className="course-attribute">
            <p>
              {"Total length : " +
                (props.course?.minutes
                  ? formatTime(props.course?.minutes)
                  : "You don't have any course sections yet.")}
            </p>
          </div>
          <div className="rating">
            {" "}
            <p>Rating :</p>
            <div className="rating-box">
              <Box
                sx={{
                  "& > legend": { mt: 2 },
                }}
              >
                <Rating
                  name="read-only"
                  value={props.course?.rating || 0}
                  readOnly
                  emptyIcon={
                    <StarBorderIcon fontSize="inherit" className="empty-star" />
                  }
                />
              </Box>
            </div>
          </div>
          <div className="course-attribute">
            <p>{"Views : " + props.course?.views}</p>
          </div>
        </div>
      </div>
      <div className="editable-container">
        Course Description :
        <div>
          <TextareaAutosize
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="description-textarea"
            defaultValue={props.course?.summary}
            readOnly={!editingDescripton}
          ></TextareaAutosize>
          {editingDescripton ? (
            <button
              onClick={() => {
                toggleEditingDescription();
                editCourse();
              }}
            >
              Done
            </button>
          ) : (
            <button onClick={toggleEditingDescription}>Edit Description</button>
          )}
        </div>
      </div>
      <div className="editable-container">
        <CourseVideo></CourseVideo>
      </div>
      <div>Subtitles:</div>
      {props.course
        ? props.course.subtitles.map((subtitle) => (
            <div key={subtitle._id} className="editable-container">
              <Subtitle
                subtitle={subtitle}
                courseid={props.course._id}
                setCourse={props.setCourse}
              ></Subtitle>
            </div>
          ))
        : null}
      <div onClick={toggleAddingSubtitle} className="add-subtitle-button">
        <img src={plus} alt="plus"></img>Add Subtitle
      </div>
      {addingSubtitle && (
        <>
          <p>Enter Subtitle title:</p>{" "}
          <input
            type="text"
            ref={subtitleTitleRef}
            onChange={(e) => {
              setSubtitleTitle(e.target.value);
            }}
          ></input>
          <p>Enter Subtitle description:</p>
          <TextareaAutosize
            ref={subtitleDescriptionRef}
            onChange={(e) => {
              setSubtitleDescription(e.target.value);
            }}
          ></TextareaAutosize>
          {subtitleTitle && subtitleDescription ? (
            <button onClick={addSubtitle}>Done</button>
          ) : (
            <button disabled>Done</button>
          )}
        </>
      )}
    </div>
  );
}
export default memo(EditCourse);
