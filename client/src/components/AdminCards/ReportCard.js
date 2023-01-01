import { memo } from "react";
import Typography from "@mui/material/Typography";
import Button from "react-bootstrap/Button";
import { MDBCard } from "mdb-react-ui-kit";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PendingIcon from "@mui/icons-material/Pending";
import CheckIcon from "@mui/icons-material/Check";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import "./ReportCard.css";

function ReportCard(props) {
  return (
    <MDBCard className="request-card">
      <div style={{ display: "flex" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            mt: 2,
            ml: 2,
          }}
        >
          <div style={{ fontSize: "35px" }}>
            <div>
              <span style={{ fontStyle: "italic", fontWeight: "700" }}>
                {props.report.username}
              </span>
              {" reported a problem with the course "}{" "}
              <span style={{ fontStyle: "italic", fontWeight: "700" }}>
                {" "}
                {props.report.courseName}{" "}
              </span>
              <div style={{ fontSize: "13px", color: "#999999" }}>
                {new Date(props.report.createdAt).toLocaleString()}
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                right: "20px",
                top: "10px",
                fontSize: "23px",
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
          </div>{" "}
          <p>{props.report.problem}</p>
          <div>
            <Timeline>
              {props.report.comments.map((comment, idx) => (
                <TimelineItem>
                  {idx !== props.report.comments.length - 1 && (
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                  )}
                  {idx === props.report.comments.length - 1 && <TimelineDot />}
                  <TimelineContent>
                    {"The user added a follow up : "}
                    <span style={{ fontStyle: "bold", fontWeight: "700" }}>
                      {comment.description}
                    </span>
                    <div style={{ fontSize: "13px", color: "#999999" }}>
                      {new Date(comment.createdAt).toLocaleString()}
                    </div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </Typography>
      </div>
      {props.requestType === "unseen" && (
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="btn btn-outline-danger"
            style={{ marginLeft: "auto" }}
            onClick={() => {
              props.pend(props.report);
            }}
          >
            Mark as pending
          </button>
          <Button
            variant="outline-success"
            style={{ marginRight: "10px" }}
            onClick={() => {
              props.resolve(props.report);
            }}
          >
            Mark as resolved
          </Button>
        </div>
      )}
      {props.requestType === "pending" && (
        <div
          style={{ display: "flex", gap: "10px", flexDirection: "row-reverse" }}
        >
          <Button
            variant="outline-success"
            style={{ marginRight: "10px" }}
            onClick={() => {
              props.resolve(props.report);
            }}
          >
            Mark as resolved
          </Button>
        </div>
      )}
    </MDBCard>
  );
}
export default memo(ReportCard);
