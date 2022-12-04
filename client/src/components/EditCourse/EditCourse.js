import axios from "axios";
import proxy from "../../utils/proxy.json";
import { memo, useEffect, useRef, useState } from "react";
import Subtitle from "./Subtitle";
import TextareaAutosize from "react-textarea-autosize";
import { formatTime } from "../../utils/Helpers";
import { Box, Rating } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import countries from "../../utils/Countries.json";
import CourseVideo from "./CourseVideo";
import "./EditCourse.css";
import plus from "../../assets/EditCourse/plusgrey.png";
import cancel from "../../assets/EditCourse/cancelgrey.png";
import editWhite from "../../assets/EditCourse/editWhite.png";
import edit from "../../assets/EditCourse/edit.png";
import convert from "../../utils/CurrencyConverter";

function EditCourse(props) {
  const [addingSubtitle, setAddingSubtitle] = useState(false);
  const [subtitleTitle, setSubtitleTitle] = useState("");
  const [subtitleDescription, setSubtitleDescription] = useState("");
  const [editingDescripton, setEditingDescription] = useState(false);
  const [description, setDescription] = useState(props.course?.summary);
  const [price, setPrice] = useState(props.course?.price);
  const [editingPrice, setEditingPrice] = useState(false);
  const [addingSubject, setAddingSubject] = useState(false);
  const [subject, setSubject] = useState("");

  const subtitleTitleRef = useRef();
  const subtitleDescriptionRef = useRef();
  const subjectRef = useRef();

  useEffect(() => {
    setDescription(props.course?.summary);
    setPrice(props.course?.price);
  }, [props.course]);

  function addSubtitle() {
    axios
      .put(
        proxy.URL +
          "/instructor/my-courses/edit-course/" +
          props.course._id +
          "/add-subtitle",
        {
          title: subtitleTitle,
          description: subtitleDescription,
          sections: [],
        },
        {
          headers: {
            country: localStorage.getItem("country"),
          },
        }
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
    setSubtitleDescription("");
    setSubtitleTitle("");
  }
  function toggleAddingSubject() {
    setAddingSubject(!addingSubject);
  }
  function toggleEditingPrice() {
    setEditingPrice(!editingPrice);
  }
  async function editCourse(newSub) {
    const newPrice = await convert(
      price,
      localStorage.getItem("country"),
      "United States"
    );

    axios
      .put(
        proxy.URL + "/instructor/my-courses/edit-course/" + props.course._id,
        {
          ...props.course,
          summary: description,
          price: newPrice,
          subject: newSub ? newSub : props.course.subject,
        },
        {
          headers: {
            country: localStorage.getItem("country"),
          },
        }
      )
      .then((response) => {
        props.setCourse(response.data);
        setEditingDescription(false);
        setEditingPrice(false);
        setAddingSubject(false);
      });
  }
  function toggleEditingDescription() {
    setEditingDescription(!editingDescripton);
  }

  return (
    <div className="edit-course-wrapper">
      <div className="header-wrapper">
        <div>
          <p className="title-text"> {props.course?.title}</p>
        </div>
        <div className="properties-wrapper">
          {props.course?.subject.map((subject, idx) => (
            <div className="course-attribute" key={subject + idx}>
              <p>{subject}</p>
              <ClearIcon
                onClick={() => {
                  const newSubjects = props.course.subject.filter(
                    (s) => s !== subject
                  );
                  editCourse(newSubjects);
                }}
                style={{ color: "white", cursor: "pointer" }}
              ></ClearIcon>
            </div>
          ))}
          <div
            className="course-attribute"
            style={{ cursor: !addingSubject ? "pointer" : null }}
            onClick={() => {
              if (!addingSubject) toggleAddingSubject();
            }}
            onBlur={(e) => {
              if (e.relatedTarget !== null) return;

              if (
                e.relatedTarget === null &&
                e.target?.nodeName === "DIV" &&
                !addingSubject
              )
                return;

              if (e.relatedTarget?.nodeName === "BUTTON") return;

              if (
                e.relatedTarget?.nodeName !== "INPUT" &&
                !(
                  e.relatedTarget?.nodeName === "DIV" &&
                  e.target?.nodeName === "INPUT"
                )
              ) {
                toggleAddingSubject();
                setSubject("");
              }
            }}
            tabIndex={-1}
          >
            {!addingSubject ? (
              <>
                <AddIcon style={{ color: "white" }}></AddIcon>
                <p>Add Subject</p>
              </>
            ) : (
              <>
                <input
                  className="course-attribute-input"
                  ref={subjectRef}
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                ></input>
                <button
                  className="btn btn-success"
                  style={{ borderRadius: "9px", marginRight: "6px" }}
                  onClick={() => {
                    props.course.subject.push(subjectRef.current.value);
                    editCourse(props.course.subject);
                  }}
                  disabled={subject === ""}
                >
                  Done
                </button>
              </>
            )}
          </div>
          <div
            className="course-attribute"
            onBlur={(e) => {
              if (e.relatedTarget?.nodeName === "BUTTON") return;

              if (
                e.relatedTarget === null &&
                e.target?.nodeName === "DIV" &&
                !editingPrice
              )
                return;
              if (e.relatedTarget !== null) return;
              if (
                e.relatedTarget?.nodeName !== "INPUT" &&
                !(
                  e.relatedTarget?.nodeName === "DIV" &&
                  e.target?.nodeName === "INPUT"
                )
              )
                toggleEditingPrice();
            }}
            tabIndex={-2}
          >
            {!editingPrice && (
              <>
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

                <img
                  src={editWhite}
                  alt="edit"
                  onClick={toggleEditingPrice}
                  style={{ margin: "10px" }}
                ></img>
              </>
            )}
            {editingPrice && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  <p className="price-text">Price : </p>
                </div>
                <div>
                  <input
                    className="course-attribute-input"
                    value={price || ""}
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <button
                    className="btn btn-success"
                    style={{ borderRadius: "9px", margin: "6px 6px" }}
                    onClick={() => {
                      editCourse();
                    }}
                    disabled={price <= 0}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
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
              className="btn btn-success"
              onClick={() => {
                toggleEditingDescription();
                editCourse();
              }}
            >
              Done
            </button>
          ) : (
            <img
              className="edit-button"
              src={edit}
              alt="edit"
              onClick={toggleEditingDescription}
            ></img>
          )}
        </div>
      </div>
      <div className="editable-container">
        <CourseVideo
          course={props.course}
          setCourse={props.setCourse}
          url={props.course?.preview_video}
        ></CourseVideo>
      </div>
      <p className="subtitles-text">Subtitles:</p>
      {props.course
        ? props.course.subtitles.map((subtitle) => (
            <div
              key={subtitle._id}
              className="editable-container subtitle-container"
            >
              <Subtitle
                subtitle={subtitle}
                courseid={props.course._id}
                setCourse={props.setCourse}
              ></Subtitle>
            </div>
          ))
        : null}
      <div onClick={toggleAddingSubtitle} className="add-subtitle-button">
        <img src={addingSubtitle ? cancel : plus} alt="plus"></img>
        {addingSubtitle ? "Cancel" : "Add Subtitle"}
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
            <div className="done-button-wrapper">
              <button
                type="button"
                className="btn btn-success"
                onClick={addSubtitle}
              >
                Done
              </button>
            </div>
          ) : (
            <div className="done-button-wrapper">
              <button type="button" className="btn btn-success" disabled>
                Done
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default memo(EditCourse);
