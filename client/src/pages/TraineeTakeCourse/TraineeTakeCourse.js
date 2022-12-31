import app from "../../utils/AxiosConfig.js";
import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Subtitles from "../../components/TakeCourse/Subtitles";
import Content from "../../components/TakeCourse/Content";
import "./TraineeTakeCourse.css";
import Modal from "react-bootstrap/Modal";
import success from "../../assets/Header/success.png";

function TraineeTakeCourse() {
  const [course, setCourse] = useState();
  const [traineeCourse, setTraineeCourse] = useState();

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
          .then((response) => {
            setTraineeCourse(response.data);
          });
      });

    setFlag(true);
    // eslint-disable-next-line
  }, []);

  function updateTraineeCourse(traineeCourse) {
    console.log(traineeCourse);
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
        console.log(response.data);
        if (response.data.complete && response.data.sent !== true) {
          setShow(true);
          app.put("/trainee/send-certificate", {
            courseId: location.state?.courseId,
          });
        }
        console.log(response.data);
        setTraineeCourse(response.data);
      })
      .catch((error) => {
        if (error.response.status === 409) {
          navigate(0);
        }
      });
  }

  return (
    <div className="take-course-wrapper">
      <div className="content-notes-wrapper">
        <div className="content">
          <Content
            course={course}
            traineeCourse={traineeCourse}
            updateTraineeCourse={updateTraineeCourse}
          ></Content>
        </div>
        <div className="notes"></div>
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
