import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListItem from "./ListItemContainer";
import "./TableContainer.css";
import formatTime from "../../utils/TimeConverter";

function TableContainer(props) {
  return (
    <Card>
      <Card.Header>{props.title}</Card.Header>
      <Card.Body>
        <ListGroup variant='flush'>
          {props.elements.map((element, index) => (
            <ListItem
              element={element}
              subelements={element.sections}
              subelementsTitle={"Sections"}
              key={index}
            />
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default TableContainer;
