import app from "../../utils/AxiosConfigs.js";
import { memo, useRef, useState } from "react";
import "./CourseVideo.css";
import edit from "../../assets/EditCourse/edit.png";
import convert from "../../utils/CurrencyConverter";
import axios from "axios";
function CourseVideo(props) {
  const [validURL, setValidURL] = useState(true);
  const [editingURL, setEditingURL] = useState(false);
  const [videoURL, setVideoURL] = useState(props.url);

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
      const newPrice = await convert(
        props.course.price,
        localStorage.getItem("country"),
        "United States"
      );
      axios
        .get(
          "https://www.youtube.com/oembed?format=json&url=/watch?v=" +
            value.substring(value.lastIndexOf("=") + 1)
        )
        .then(() => {
          setValidURL(true);
          app
            .put(
              "/instructor/my-courses/edit-course/" + props.course._id,
              {
                ...props.course,
                preview_video: value,
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
          width="420"
          height="315"
          src={
            videoURL
              ? videoURL.replace("watch?v=", "embed/")
              : props.url?.replace("watch?v=", "embed/")
          }
          allowFullScreen
        ></iframe>
      ) : (
        <></>
      )}
      {editingURL ? (
        <>
          <input
            style={{ borderRadius: "10px", margin: "10px" }}
            ref={videoRef}
            defaultValue={videoURL ? videoURL : props.url}
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
          style={{ margin: "10px" }}
        ></img>
      )}
    </div>
  );
}
export default memo(CourseVideo);
