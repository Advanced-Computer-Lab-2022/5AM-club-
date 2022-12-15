import { memo } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListItem from "./ListItemContainer";
import "./TableContainer.css";

function TableContainer(props) {
  return (
    <Card>
      <Card.Header style={{ backgroundColor: "#96CEA8", color: "#303030" }}>
        {props.title}
      </Card.Header>
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

export default memo(TableContainer);
