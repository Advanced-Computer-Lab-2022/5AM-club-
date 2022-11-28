import { memo } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import TableContainer from "./TableContainer";
import "./CourseContainer.css";
import { formatTime } from "../../utils/Helpers";
import countries from "../../utils/Countries.json";

function CourseContainer(props) {
  return (
    <Card border="dark" className="card">
      <Card.Body>
        <Card.Title>{props.course.title}</Card.Title>

        <Card.Text>{props.course.summary}</Card.Text>
        <div className="attribute">
          Total hours: {formatTime(props.course.minutes)}
        </div>
        {localStorage.getItem("type") !== "corporate" && (
          <div className="attribute">
            Price:{" "}
            {props.promotion &&
            new Date(props.promotion.deadline) > new Date() ? (
              <>
                <span className="scratched">{props.course.price} </span>
                <span>
                  {(props.course.price * (100 - props.promotion.percentage)) /
                    100 +
                    (" " +
                      countries[
                        Object.keys(countries).find(
                          (e) => e === localStorage.getItem("country")
                        )
                      ])}
                </span>
                <span className="red">
                  (-{props.promotion.percentage}% till{" "}
                  {new Date(props.promotion.deadline).toDateString()})
                </span>
              </>
            ) : (
              <>
                {props.course.price +
                  (" " +
                    countries[
                      Object.keys(countries).find(
                        (e) => e === localStorage.getItem("country")
                      )
                    ])}
              </>
            )}
          </div>
        )}

        {localStorage.getItem("type") === "individual" && (
          <Button variant="outline-success">BUY NOW</Button>
        )}
        <div className="attribute"> Content: </div>
        <TableContainer title={"Subtitles"} elements={props.subtitles} />
      </Card.Body>
    </Card>
  );
}

export default memo(CourseContainer);
