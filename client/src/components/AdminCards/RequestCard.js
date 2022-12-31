import { memo } from "react";
import Typography from "@mui/material/Typography";
import Button from "react-bootstrap/Button";
import { MDBCard } from "mdb-react-ui-kit";
import "./RequestCard.css";

function RequestCard(props) {
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
          {props.requestType === "pending" ? (
            <div>
              Trainee
              <span style={{ fontStyle: "italic", fontWeight: "700" }}>
                {" " + props.request.trainee}
              </span>
              {" requested to enroll in course "}{" "}
              <span style={{ fontStyle: "italic", fontWeight: "700" }}>
                {" "}
                {props.request.course}{" "}
              </span>
            </div>
          ) : (
            <div>
              You {props.requestType} the request of trainee{" "}
              <span style={{ fontStyle: "italic", fontWeight: "700" }}>
                {props.request.trainee}
              </span>
              {"  to enroll in course "}{" "}
              <span style={{ fontStyle: "italic", fontWeight: "700" }}>
                {" "}
                {props.request.course}{" "}
              </span>
            </div>
          )}
        </Typography>
      </div>
      {props.requestType === "pending" && (
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="btn btn-outline-danger"
            style={{ marginLeft: "auto" }}
            onClick={() => {
              props.reject(props.request);
            }}
          >
            Reject
          </button>
          <Button
            variant="outline-success"
            style={{ marginRight: "10px" }}
            onClick={() => {
              props.accept(props.request);
            }}
          >
            Accept
          </Button>
        </div>
      )}
    </MDBCard>
  );
}
export default memo(RequestCard);
