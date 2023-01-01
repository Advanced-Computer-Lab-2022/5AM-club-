import { memo, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PendingIcon from "@mui/icons-material/Pending";
import CheckIcon from "@mui/icons-material/Check";
import { MDBCard } from "mdb-react-ui-kit";
import app from "../../utils/AxiosConfig";
import { TextareaAutosize } from "@mui/material";
function MyReportCard(props) {
  const [show, setShow] = useState(false);
  const [followUp, setFollowUp] = useState("");

  function addFollowUp() {
    app
      .put(
        localStorage.getItem("type") === "corporate" ||
          localStorage.getItem("type") === "individual"
          ? "/trainee/follow-up"
          : "/" + localStorage.getItem("type") + "/follow-up",
        {
          description: followUp,
          createdAt: new Date(),
        },
        { headers: { id: props.report._id } }
      )
      .then((response) => {
        alert("Follow up sent successfully. An admin will look into it.");
        setShow(false);
        setFollowUp("");
      });
  }
  return (
    <MDBCard
      className="my-report-card"
      style={{
        width: "100%",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <div>
        <div style={{ display: "flex" }}>
          <h4 style={{ flexGrow: "1" }}>
            {"Course : " + props.report.courseName}
          </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              fontSize: "17px",
              color:
                props.report.status === "unseen"
                  ? "#1a7fb0"
                  : props.report.status === "pending"
                  ? "#b32d0f"
                  : "#96cea8",
            }}
          >
            {props.report.status.charAt(0).toUpperCase() +
              props.report.status.slice(1)}
            {props.report.status === "unseen" ? (
              <VisibilityOffIcon style={{ color: "#1a7fb0" }} />
            ) : props.report.status === "pending" ? (
              <PendingIcon style={{ color: "##b32d0f" }} />
            ) : (
              <CheckIcon style={{ color: "#96cea8" }} />
            )}
          </div>
        </div>
        <p style={{ color: "#999999" }}>
          {new Date(props.report.createdAt).toDateString()}
        </p>
      </div>
      <p style={{ fontSize: "20px", marginTop: "20px" }}>
        {props.report.problem}
      </p>{" "}
      {props.report.status !== "resolved" && (
        <>
          {!show ? (
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <button
                className="btn btn-outline-success"
                onClick={() => {
                  setShow(true);
                }}
              >
                Add Follow Up
              </button>
            </div>
          ) : (
            <>
              <div className="form-outline mb-4">
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Write your follow up here"
                  value={followUp}
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setFollowUp(e.target.value);
                  }}
                ></TextareaAutosize>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  gap: "10px",
                }}
              >
                <button
                  className="btn btn-outline-success"
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    addFollowUp();
                  }}
                  disabled={followUp.length === 0}
                >
                  Submit
                </button>{" "}
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    setShow(false);
                    setFollowUp("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </>
      )}
    </MDBCard>
  );
}
export default memo(MyReportCard);
