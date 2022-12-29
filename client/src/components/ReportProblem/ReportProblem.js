import { memo, useState } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import app from "../../utils/AxiosConfig.js";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
function ReportProblem(props) {
  const [type, setType] = useState("");
  const [problem, setProblem] = useState("");

  const [show, setShow] = useState(false);
  function onClickHide() {
    setShow(false);
    setType("");
    setProblem("");
  }

  function reportProblem() {
    app
      .post(
        localStorage.getItem("type") === "corporate" ||
          localStorage.getItem("type") === "individual"
          ? "/trainee/report-problem/"
          : "/" + localStorage.getItem("type") + "/report-problem/",
        {
          courseName: props.courseName,
          problemType: type,
          problem: problem,
        }
      )
      .then((res) => {
        alert("Problem reported successfully");
        onClickHide();
      });
  }
  return (
    <div>
      <button
        className="btn btn-outline-secondary"
        onClick={() => {
          setShow(true);
        }}
        style={{ height: props.height }}
      >
        Report a Problem
      </button>
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
                Report a Problem
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  width: "100%",
                }}
              >
                {" "}
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  onChange={(event) => setType(event.value)}
                  isClearable={false}
                  isSearchable={false}
                  name="color"
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: "#A6D6B5",
                      primary: "#96cea8",
                    },
                  })}
                  options={[
                    {
                      value: "technical",
                      label: "Technical",
                    },
                    { value: "financial", label: "Financial" },
                    { value: "other", label: "Other" },
                  ]}
                  placeholder="Select Problem Type"
                />
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Write your problem here"
                  onChange={(event) => setProblem(event.target.value)}
                />
                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                  <button
                    className="btn btn-outline-success"
                    disabled={type === "" || problem === ""}
                    onClick={reportProblem}
                  >
                    Submit
                  </button>{" "}
                </div>
              </div>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default memo(ReportProblem);
