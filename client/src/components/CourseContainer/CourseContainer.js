import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import TableContainer from "../TableContainer/TableContainer";
import "./CourseContainer.css";
import formatTime from "../../utils/TimeConverter";

function CourseContainer(props) {
  return (
    <Card border='dark' className='card'>
      <Card.Body>
        <Card.Title>{props.course.title}</Card.Title>
        <Card.Text>
          <div>{props.course.summary}</div>
          <div className='attribute'>
            Total hours: {formatTime(props.course.minutes)}
          </div>
          <div className='attribute'>Price: {props.course.price} </div>
        </Card.Text>

        <Button variant='outline-success'>BUY NOW</Button>
        <div className='attribute'> Content: </div>
        <TableContainer title={"Subtitles"} elements={props.subtitles} />
      </Card.Body>
    </Card>
  );
}

export default CourseContainer;
