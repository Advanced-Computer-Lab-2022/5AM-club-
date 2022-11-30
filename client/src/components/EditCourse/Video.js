import axios from "axios";
import React, { memo, useRef, useState } from "react";
import proxy from "../../utils/proxy.json";
import "./CourseVideo.css";
import edit from "../../assets/EditCourse/edit.png";

function Video(props) {
  const [validURL, setValidURL] = useState(true);
  const [editingURL, setEditingURL] = useState(false);
  const [videoURL, setVideoURL] = useState(props.content?.link);

  const videoRef = useRef();

  function toggleEditingURL() {
    setEditingURL(!editingURL);
  }
  async function handleURLChange(value) {
    if (
      value?.match(
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
      )
    ) {
      axios
        .get(
          "https://www.youtube.com/oembed?format=json&url=/watch?v=" +
            value.substring(value.lastIndexOf("=") + 1)
        )
        .then(() => {
          setValidURL(true);
          axios
            .put(
              proxy.URL +
                "/my-courses/edit-course/" +
                props.courseid +
                "/" +
                props.subtitleid +
                "/edit-section/" +
                props.sectionid,
              {
                ...props.section,
                content: { video: { link: value } },
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
        })
        .catch((e) => {
          setValidURL(false);
        });
    } else {
      setValidURL(false);
    }
    setEditingURL(false);
  }
  return (
    <div>
      {validURL ? (
        <iframe
          title="course-video"
          className="course-video"
          width="300"
          height="200"
          src={
            videoURL
              ? videoURL.replace("watch?v=", "embed/")
              : props.content?.link.replace("watch?v=", "embed/")
          }
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p style={{ color: "red" }}>
          The link you entered is not a valid youtube link.
        </p>
      )}
      {editingURL ? (
        <>
          <input
            ref={videoRef}
            defaultValue={videoURL ? videoURL : props.content?.link}
            type=""
          ></input>
          <button
            className="btn btn-success"
            onClick={() => {
              handleURLChange(videoRef.current.value);
              setVideoURL(videoRef.current.value);
            }}
          >
            Done
          </button>
        </>
      ) : (
        <img
          className="edit-button"
          src={edit}
          alt="edit"
          onClick={toggleEditingURL}
        ></img>
      )}
    </div>
  );
}

export default memo(Video);
