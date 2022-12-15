import { useRef, memo } from "react";
import app from "../../utils/AxiosConfig.js";

function TraineeFilterContainer(props) {
  const searchRef = useRef();
  const subjectRef = useRef();
  const maxRef = useRef();
  const minRef = useRef();

  function handleFilter() {
    props.setCourses([]);
    props.setMainText("");
    app
      .get("/trainee/my-courses/", {
        headers: {
          country: localStorage.getItem("country"),
          type: localStorage.getItem("type"),
        },
        params: {
          min: minRef.current.value,
          max: maxRef.current.value,
          subject: subjectRef.current.value,
          searchItem: searchRef.current.value,
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
export default memo(TraineeFilterContainer);
