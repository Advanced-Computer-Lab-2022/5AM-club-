import app from "../../utils/AxiosConfig.js";
import { memo, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Subtitle from "./Subtitle";
import TextareaAutosize from "react-textarea-autosize";
import { formatTime } from "../../utils/Helpers";
import Card from "react-bootstrap/Card";
import { Box, Rating } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import countries from "../../utils/Countries.json";
import CourseVideo from "./CourseVideo";
import CheckIcon from "@mui/icons-material/Check";
import "./EditCourse.css";
import plus from "../../assets/EditCourse/plusblack.png";
import cancel from "../../assets/EditCourse/cancelblack.png";
import edit from "../../assets/EditCourse/edit.png";
import convert from "../../utils/CurrencyConverter";

function EditCourse(props) {
  const [addingSubtitle, setAddingSubtitle] = useState(false);
  const [subtitleTitle, setSubtitleTitle] = useState("");
  const [subtitleDescription, setSubtitleDescription] = useState("");
  const [editingDescripton, setEditingDescription] = useState(false);
  const [description, setDescription] = useState(props.course?.summary);
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(props.course?.title);
  const [price, setPrice] = useState(
    Math.floor(props.course?.price + 0.5) - 0.01
  );
  const [editingPrice, setEditingPrice] = useState(false);
  const [addingSubject, setAddingSubject] = useState(false);
  const [subject, setSubject] = useState("");

  const location = useLocation();

  const titleRef = useRef();
  const subtitleTitleRef = useRef();
  const subtitleDescriptionRef = useRef();
  const subjectRef = useRef();

  useEffect(() => {
    setDescription(props.course?.summary);
    setPrice(Math.floor(props.course?.price + 0.5) - 0.01);
    setTitle(props.course?.title);
  }, [props.course]);

  useEffect(() => {
    if (titleRef && titleRef.current) {
      titleRef.current.innerText = title;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingTitle]);

  function addSubtitle() {
    app
      .put(
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
    app
      .put(
        "/instructor/my-courses/edit-course/" + props.course._id,
        {
          ...props.course,
          title: title,
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
        location.state = {
          ...location.state,
          closed: response.data.closed,
          published: response.data.published,
        };
        props.setCourse(response.data);
        setEditingDescription(false);
        setEditingPrice(false);
        setEditingTitle(false);
        setAddingSubject(false);
      });
  }
  function toggleEditingDescription() {
    setEditingDescription(!editingDescripton);
  }
  function toggleEditingTitle() {
    setEditingTitle(!editingTitle);
  }

  async function closeCourse() {
    const newPrice = await convert(
      price,
      localStorage.getItem("country"),
      "United States"
    );
    app
      .put(
        "/instructor/my-courses/edit-course/" + props.course._id,
        {
          ...props.course,
          closed: true,
          price: newPrice,
        },
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

  async function publishCourse() {
    const newPrice = await convert(
      price,
      localStorage.getItem("country"),
      "United States"
    );
    app
      .put(
        "/instructor/my-courses/edit-course/" + props.course._id,
        {
          ...props.course,
          published: true,
          price: newPrice,
        },
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

  return (
    <Card
      className="edit-course-card edit-course-border-success"
      style={{
        margin: "250px",
        marginTop: "50px",
        marginBottom: "50px",
      }}
    >
      <Card.Body className="edit-course-card-body">
        <div className="header-wrapper">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flexGrow: "1" }}>
              {!editingTitle ? (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p className="course-title-text"> {props.course?.title}</p>
                    {!props.course?.published && (
                      <>
                        <img
                          src={edit}
                          alt="edit"
                          onClick={toggleEditingTitle}
                          style={{
                            margin: "10px",
                            width: "40px",
                            height: "40px",
                            cursor: "pointer",
                          }}
                        ></img>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p>
                    {" "}
                    <div
                      ref={titleRef}
                      className="course-attribute-input"
                      value={title}
                      onInput={(e) => {
                        console.log(e.target.innerText);
                        setTitle(e.target.innerText);
                      }}
                      style={{
                        fontSize: "60px",
                        width: "auto",
                        display: "inline-block",
                      }}
                      contentEditable
                      role="textbox"
                    ></div>
                  </p>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => {
                      editCourse();
                    }}
                    style={{ margin: "10px" }}
                    disabled={title === ""}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {!props.course?.closed && props.course?.published ? (
                <button
                  className="btn btn-outline-danger"
                  onClick={closeCourse}
                >
                  Close Course
                </button>
              ) : (
                <>
                  {" "}
                  {props.course?.closed && (
                    <div
                      style={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                        color: "red",
                      }}
                    >
                      Closed
                      <CheckIcon></CheckIcon>
                    </div>
                  )}
                </>
              )}
              {!props.course?.published ? (
                <button
                  className="btn btn-outline-success"
                  onClick={publishCourse}
                  disabled={!props.course?.valid}
                >
                  Publish Course
                </button>
              ) : (
                <>
                  {!props.course?.closed && (
                    <div
                      style={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Published
                      <CheckIcon></CheckIcon>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="properties-wrapper">
            {props.course?.subject.map((subject, idx) => (
              <div className="course-attribute" key={subject + idx}>
                <p>{subject}</p>
                {!props.course?.published && (
                  <>
                    <ClearIcon
                      onClick={() => {
                        const newSubjects = props.course.subject.filter(
                          (s) => s !== subject
                        );
                        editCourse(newSubjects);
                      }}
                      style={{
                        color: "#303030",
                        cursor: "pointer",
                      }}
                    ></ClearIcon>
                  </>
                )}
              </div>
            ))}
            {!props.course?.published && (
              <>
                <div
                  className="course-attribute"
                  style={{
                    cursor: !addingSubject ? "pointer" : null,
                  }}
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
                      <AddIcon style={{ color: "#303030" }}></AddIcon>
                      <p>Add Subject</p>
                    </>
                  ) : (
                    <>
                      <input
                        style={{ color: "#484848" }}
                        className="course-attribute-input"
                        ref={subjectRef}
                        onChange={(e) => {
                          setSubject(e.target.value);
                        }}
                      ></input>
                      <button
                        className="btn btn-outline-success"
                        style={{
                          borderRadius: "9px",
                          marginRight: "6px",
                        }}
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
              </>
            )}
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
                      (Math.floor(props.course?.price + 0.5) - 0.01) +
                      " " +
                      (" " +
                        (countries[
                          Object.keys(countries).find(
                            (e) => e === localStorage.getItem("country")
                          )
                        ]
                          ? countries[
                              Object.keys(countries).find(
                                (e) => e === localStorage.getItem("country")
                              )
                            ]
                          : "USD"))}
                  </p>
                  {!props.course?.published && (
                    <>
                      <img
                        src={edit}
                        alt="edit"
                        onClick={toggleEditingPrice}
                        style={{ margin: "10px" }}
                      ></img>
                    </>
                  )}
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
                      className="btn btn-outline-success"
                      style={{
                        borderRadius: "9px",
                        margin: "6px 6px",
                      }}
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
                    sx={{ color: "success.main" }}
                    emptyIcon={
                      <StarBorderIcon
                        style={{ color: "#484848" }}
                        fontSize="inherit"
                        className="empty-star"
                      />
                    }
                  />
                </Box>
              </div>
            </div>
            <div className="course-attribute">
              <p>{"Views : " + props.course?.views}</p>
            </div>
            <div className="course-attribute">
              <p>
                {"Number of Enrolled Students : " + props.course?.owners.length}
              </p>
            </div>
          </div>
        </div>

        <div
          className="editable-container"
          style={{
            display: "flex",
            gap: "30px",
            overflow: "hidden",
            justifyContent: "space-evenly",
          }}
        >
          <CourseVideo
            course={props.course}
            setCourse={props.setCourse}
            url={props.course?.preview_video}
          ></CourseVideo>
          <div
            style={{
              borderLeft: "3px solid #484848",
            }}
          ></div>
          <div>
            Course Description :
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "15px",
              }}
            >
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
                  className="btn btn-outline-success"
                  onClick={() => {
                    toggleEditingDescription();
                    editCourse();
                  }}
                  style={{ margin: "10px" }}
                >
                  Done
                </button>
              ) : (
                <>
                  {!props.course?.published && (
                    <>
                      <img
                        className="edit-button"
                        src={edit}
                        alt="edit"
                        onClick={toggleEditingDescription}
                        style={{ margin: "10px" }}
                      ></img>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <hr
          style={{
            height: "3px",
            border: "none",
            backgroundColor: "#484848",
          }}
        ></hr>
        <p className="subtitles-text">Subtitles:</p>
        {props.course
          ? props.course.subtitles.map((subtitle) => (
              <div
                key={subtitle._id}
                className="editable-container subtitle-container"
              >
                <Subtitle
                  course={props.course}
                  subtitle={subtitle}
                  courseid={props.course._id}
                  setCourse={props.setCourse}
                ></Subtitle>
              </div>
            ))
          : null}
        {!props.course?.published && (
          <>
            <div onClick={toggleAddingSubtitle} className="add-subtitle-button">
              <img src={addingSubtitle ? cancel : plus} alt="plus"></img>
              {addingSubtitle ? "Cancel" : "Add Subtitle"}
            </div>
          </>
        )}
        {addingSubtitle && (
          <div className="add-subtitle">
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
                  className="btn btn-outline-success"
                  onClick={addSubtitle}
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="done-button-wrapper">
                <button
                  type="button"
                  className="btn btn-outline-success"
                  disabled
                >
                  Done
                </button>
              </div>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
export default memo(EditCourse);
