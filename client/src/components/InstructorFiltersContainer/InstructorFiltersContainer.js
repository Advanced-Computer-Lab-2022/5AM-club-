import { useRef, memo } from "react";
import proxy from "../../utils/proxy.json";
import axios from "axios";
import { useSelector } from "react-redux";

function InstructorFiltersContainer(props) {
  const token = useSelector((state) => state.token.value);

  const searchRef = useRef();
  const subjectRef = useRef();
  const maxRef = useRef();
  const minRef = useRef();

  function handleFilter() {
    props.setCourses([]);
    props.setMainText("");
    axios
      .get(proxy.URL + "/instructor/my-courses/", {
        headers: {
          id: token.id,
          country: token.country,
        },
        params: {
          min: minRef.current.value,
          max: maxRef.current.value,
          subject: subjectRef,
          searchitem: searchRef.current.value,
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
  }

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

        <button onClick={handleFilter}>Go</button>
      </div>
    </div>
  );
}
export default memo(InstructorFiltersContainer);
