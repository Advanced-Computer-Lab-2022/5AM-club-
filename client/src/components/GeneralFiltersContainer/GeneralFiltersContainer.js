import { useRef, memo } from "react";
import { useLocation } from "react-router-dom";
import useOnChange from "@utilityjs/use-on-change";

import app from "../../utils/AxiosConfig.js";
function GeneralFiltersContainer(props) {
  const ratingRef = useRef();
  const subjectRef = useRef();
  const maxRef = useRef();
  const minRef = useRef();

  const location = useLocation();

  useOnChange(location.state?.searchItem, handleFilter);

  function handleFilter() {
    props.setCourses([]);
    props.setMainText("");
    app
      .get("/trainee/courses", {
        params: {
          min: minRef.current.value,
          max: maxRef.current.value,
          subject: subjectRef.current.value,
          rating: ratingRef.current.value,
          searchItem:
            location.state?.searchItem !== null
              ? location.state?.searchItem
              : null,
        },
        headers: {
          authorization: localStorage.getItem("token"),
          country: localStorage.getItem("country"),
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
      <p>Filter by subject:</p>
      <input ref={subjectRef} type={"text"}></input>

      {localStorage.getItem("type") !== "corporate" && (
        <div>
          <p>Filter by price:</p>
          <input ref={minRef} type={"number"}></input>
          <p> to </p>
          <input ref={maxRef} type={"number"}></input>
        </div>
      )}

      <p>Filter by rating:</p>
      <input ref={ratingRef} type={"number"}></input>

      <button onClick={handleFilter}>Go</button>
    </div>
  );
}
export default memo(GeneralFiltersContainer);
