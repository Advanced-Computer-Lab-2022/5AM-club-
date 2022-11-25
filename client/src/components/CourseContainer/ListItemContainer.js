import { useState, memo } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import "./ListItemContainer.css";
import TableContainer from "./TableContainer";
import formatTime from "../../utils/TimeConverter";

function ListItem(props) {
  const [open, setOpen] = useState(false);
  const switchOpen = () => {
    setOpen(!open);
  };
  return (
    <ListGroup.Item key={props.index}>
      {" "}
      {props.element.title} ( {formatTime(props.element.minutes)} )
      {props.subelements && (
        <Button
          className="right"
          variant="outline-success"
          onClick={switchOpen}
        >
          {open ? "🡡" : "🡣"}
        </Button>
      )}
      {open && (
        <TableContainer
          title={props.subelementsTitle}
          elements={props.subelements}
        />
      )}
    </ListGroup.Item>
  );
}

export default memo(ListItem);
