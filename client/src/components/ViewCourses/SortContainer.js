import { memo } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./SortContainer.css";

function SortContainer(props) {
  return (
    <div style={{ color: "black" }}>
      <DropdownButton
        key={1}
        id={`dropdown-button-drop-end}`}
        drop={"end"}
        variant="outline-success"
        title={`Sort by: ` + props.sort}
      >
        <Dropdown.Item
          eventKey="1"
          onClick={() => {
            props.setSort("Most Popular");
          }}
        >
          Most Popular
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="2"
          onClick={() => {
            props.setSort("Least Popular");
          }}
        >
          Least Popular
        </Dropdown.Item>
        <Dropdown.Divider color="white"></Dropdown.Divider>
        <Dropdown.Item
          eventKey="3"
          onClick={() => {
            props.setSort("Newest");
          }}
        >
          Newest
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="4"
          onClick={() => {
            props.setSort("Oldest");
          }}
        >
          Oldest
        </Dropdown.Item>
        <Dropdown.Divider color="white"></Dropdown.Divider>
        {localStorage.getItem("type") !== "corporate" && (
          <>
            <Dropdown.Item
              eventKey="5"
              onClick={() => {
                props.setSort("Price High to Low");
              }}
            >
              {" "}
              Price High to Low
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="6"
              onClick={() => {
                props.setSort("Price Low to High");
              }}
            >
              Price Low to High
            </Dropdown.Item>{" "}
            <Dropdown.Divider color="white"></Dropdown.Divider>
          </>
        )}
        <Dropdown.Item
          eventKey="7"
          onClick={() => {
            props.setSort("Rating High to Low");
          }}
        >
          Rating High to Low
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="8"
          onClick={() => {
            props.setSort("Rating Low to High");
          }}
        >
          Rating Low to How
        </Dropdown.Item>
        <Dropdown.Divider color="white"></Dropdown.Divider>
        <Dropdown.Item
          eventKey="9"
          onClick={() => {
            props.setSort("Most Viewed");
          }}
        >
          Most Viewed
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="10"
          onClick={() => {
            props.setSort("Least Viewed");
          }}
        >
          Least Viewed
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
}
export default memo(SortContainer);
