import { useState, useRef } from "react";
import { useUpdateEffect } from "react-use";
import axios from "axios";
function InstructorFiltersContainer(props) {
  const [filter, setFilter] = useState("");
  const [max, setMax] = useState("");
  const [min, setMin] = useState("");
  const [subject, setSubject] = useState("");

  const filterRef = useRef();
  const maxRef = useRef();
  const minRef = useRef();

  useUpdateEffect(() => {
    props.setCourses([]);
    props.setMainText("");
    if (filter === "") {
      axios
        .get(
          "http://localhost:4000/instructor/viewcourses/?ID=" +
            props.instructorId
        )
        .then((response) => {
          if (response.data.length === 0)
            props.setMainText("You don't have any courses yet");
          else props.setMainText("");

          props.setCourses(response.data);
        });
    } else {
      axios
        .get(
          "http://localhost:4000/instructor/viewcourses/filter",

          {
            params: {
              ID: props.instructorId,
              filter: filter ? filter : null,
              min: min ? min : null,
              max: max ? max : null,
              subject: subject ? subject : null,
            },
          }
        )
        .then((response) => {
          if (response.data.length === 0)
            props.setMainText("No courses matched your filters");
          props.setCourses(response.data);
        });
    }
  }, [filter, max, min, subject]);
  return (
    <div>
      <p>Filter by subject:</p>
      <input ref={filterRef} type={"text"}></input>
      <button
        onClick={() => {
          setSubject(filterRef.current.value);
          setFilter(
            filter === "price"
              ? filterRef.current.value
                ? "subject-price"
                : "price"
              : filterRef.current.value
              ? "subject"
              : ""
          );
        }}
      >
        Go
      </button>
      <div>
        <p>Filter by price:</p>
        <input ref={minRef} type={"text"}></input>
        <p> to </p>
        <input ref={maxRef} type={"text"}></input>
        <button
          onClick={() => {
            setMax(maxRef.current.value);
            setMin(minRef.current.value);
            setFilter(
              filter === "subject"
                ? minRef.current.value && maxRef.current.value
                  ? "subject-price"
                  : "subject"
                : minRef.current.value && maxRef.current.value
                ? "price"
                : ""
            );
          }}
        >
          Go
        </button>
      </div>
    </div>
  );
}
export default InstructorFiltersContainer;
