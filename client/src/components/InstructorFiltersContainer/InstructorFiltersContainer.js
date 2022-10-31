import { useState, useRef, useEffect } from "react";
import proxy from "../../utils/proxy.json";
import { useUpdateEffect } from "react-use";
import axios from "axios";
function InstructorFiltersContainer(props) {
  const [max, setMax] = useState();
  const [min, setMin] = useState();
  const [subject, setSubject] = useState("");
  const [searchItem, setSearchItem] = useState("");

  const searchRef = useRef();
  const subjectRef = useRef();

  const maxRef = useRef();
  const minRef = useRef();

  useUpdateEffect(() => {
    props.setCourses([]);
    props.setMainText("");
    axios
      .get(proxy.URL + "/instructor/my-courses/", {
        headers: {
          id: props.instructorId,
          country: props.country,
        },
        params: {
          min: min,
          max: max,
          subject: subject,
          searchitem: searchItem,
        },
      })
      .then((response) => {
        if (response.data.length === 0)
          props.setMainText("No courses matched your filters");
        props.setCourses(response.data);
      })
      .catch(() => {
        props.setMainText("No courses matched your filters");
      });
  }, [max, min, subject]);

  return (
    <div>
      <p>Search:</p>
      <input ref={searchRef} type={"text"}></input>

      <p>Filter by subject:</p>
      <input ref={subjectRef} type={"text"}></input>

      <div>
        <p>Filter by price:</p>
        <input ref={minRef} type={"number"}></input>
        <p> to </p>
        <input ref={maxRef} type={"number"}></input>

        <button
          onClick={() => {
            setMax(maxRef.current.value);
            setMin(minRef.current.value);
            setSubject(subjectRef.current.value);
            setSearchItem(searchRef.current.value);
            props.setMainText(null);
          }}
        >
          Go
        </button>
      </div>
    </div>
  );
}
export default InstructorFiltersContainer;
