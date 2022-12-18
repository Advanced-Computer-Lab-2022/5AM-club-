import app from "../../utils/AxiosConfig.js";
import React, { memo, useRef, useState } from "react";
import "./CourseVideo.css";
import edit from "../../assets/EditCourse/edit.png";
import axios from "axios";
import { convertISO8601ToMs } from "../../utils/Helpers";
import { useLocation } from "react-router-dom";

function Video(props) {
  const [validURL, setValidURL] = useState(true);
  const [editingURL, setEditingURL] = useState(false);
  const [videoURL, setVideoURL] = useState(props.content?.link);

  const location = useLocation();

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
            .get(
              "https://www.googleapis.com/youtube/v3/videos?id=" +
                value?.substring(value?.lastIndexOf("=") + 1) +
                "&part=contentDetails&key=AIzaSyDA-c7NayerkKbh5S_74nibw_yp2r4OnAA"
            )
            .then((response) => {
              console.log(
                convertISO8601ToMs(
                  response.data.items[0].contentDetails.duration
                )
              );
              app
                .put(
                  "/instructor/my-courses/edit-course/" +
                    props.courseid +
                    "/" +
                    props.subtitleid +
                    "/edit-section/" +
                    props.sectionid,
                  {
                    ...props.section,
                    minutes: Math.floor(
                      convertISO8601ToMs(
                        response.data.items[0].contentDetails.duration
                      ) / 60
                    ),
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
            });
        })
        .catch((e) => {
          setValidURL(false);
          alert("Invalid Youtube Link!");
        });
    } else {
      setValidURL(false);
      alert("Invalid Youtube Link!");
    }
    setEditingURL(false);
  }
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
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
          allowFullScreen
        ></iframe>
      ) : (
        <></>
      )}
      {editingURL ? (
        <>
          <input
            ref={videoRef}
            defaultValue={videoURL ? videoURL : props.content?.link}
            type=""
          ></input>
          <button
            className="btn btn-outline-success"
            onClick={() => {
              handleURLChange(videoRef.current.value);
              setVideoURL(videoRef.current.value);
            }}
          >
            Done
          </button>
        </>
      ) : (
        <>
          {!props.course?.published && (
            <>
              <img
                className="edit-button"
                src={edit}
                alt="edit"
                onClick={toggleEditingURL}
                style={{ cursor: "pointer", margin: "10px" }}
              ></img>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default memo(Video);
