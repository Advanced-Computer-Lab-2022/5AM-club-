import app from "../../utils/AxiosConfig.js";
import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Subtitles from "../../components/TakeCourse/Subtitles";
import Content from "../../components/TakeCourse/Content";
import "./TraineeTakeCourse.css";
import Modal from "react-bootstrap/Modal";
import success from "../../assets/Header/success.png";
import Notes from "../../components/TakeCourse/Notes";

function TraineeTakeCourse() {
  const [course, setCourse] = useState();
  const [traineeCourse, setTraineeCourse] = useState();
  const [currentSectionName, setCurrentSectionName] = useState("");
  const [flag, setFlag] = useState(false);
  const [show, setShow] = useState(false);

  function onClickHide() {
    setShow(false);
  }

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    app
      .get("/trainee/courses/" + location.state?.courseId, {
        headers: {
          country: localStorage.getItem("country"),
        },
      })
      .then((response) => {
        setCourse(response.data);

        app
          .get("/trainee/get-trainee-course", {
            headers: {
              courseId: location.state?.courseId,
            },
          })
          .then((res) => {
            if (response.data.subtitles[0].sections[0].content.video) {
              res.data.progress[0] = true;
            }
            setTraineeCourse(res.data);
          });
      });

    setFlag(true);
    // eslint-disable-next-line
  }, []);

  function updateTraineeCourse(traineeCourse) {
    app
      .put("/trainee/edit-trainee-course", {
        lastSection: traineeCourse.lastSection,
        courseId: location.state?.courseId,
        progress: traineeCourse.progress,
        answers: traineeCourse.answers,
        grades: traineeCourse.grades,
        notes: traineeCourse.notes,
      })
      .then((response) => {
        if (response.data.complete && response.data.sent !== true) {
          setShow(true);
          app.put("/trainee/send-certificate", {
            courseId: location.state?.courseId,
          });
        }
        setTraineeCourse(response.data);
      })
      .catch((error) => {});
  }

  return (
    <div className="take-course-wrapper">
      <div className="content-notes-wrapper">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="course-content">
            <Content
              course={course}
              setCurrentSectionName={setCurrentSectionName}
              traineeCourse={traineeCourse}
              updateTraineeCourse={updateTraineeCourse}
            ></Content>
          </div>{" "}
          <div className="notes">
            <Notes
              course={course}
              traineeCourse={traineeCourse}
              currentSectionName={currentSectionName}
              updateTraineeCourse={updateTraineeCourse}
            ></Notes>
          </div>
        </div>
      </div>
      <div className="subtitles">
        <Subtitles
          setFlag={setFlag}
          flag={flag}
          course={course}
          updateTraineeCourse={updateTraineeCourse}
          traineeCourse={traineeCourse}
        ></Subtitles>
      </div>
      <Modal
        size="lg"
        centered
        show={show}
        onHide={onClickHide}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <div className="tos-wrapper" style={{ width: "100%" }}>
          <div className="tos-border-success" style={{ width: "100%" }}>
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Congratulations!
              </Modal.Title>
            </Modal.Header>

            <Modal.Body
              className="tos"
              style={{
                height: "fit-content",
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <div className="updated-successfully">
                <div className="updated-successfully-text">
                  <h4>Congratulations!</h4>

                  <p>
                    You have completed this course. You can now download your
                    certificate from the course page. An email with the
                    certificate will also be sent to you.
                  </p>
                </div>
                <div className="updated-successfully-image">
                  <img src={success} alt="Success" className="success" />
                </div>
              </div>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default memo(TraineeTakeCourse);
