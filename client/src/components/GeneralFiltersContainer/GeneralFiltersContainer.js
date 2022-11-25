import { useRef, memo } from "react";
import proxy from "../../utils/proxy.json";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useOnChange from "@utilityjs/use-on-change";

import axios from "axios";
function GeneralFiltersContainer(props) {
  const ratingRef = useRef();
  const subjectRef = useRef();
  const maxRef = useRef();
  const minRef = useRef();

  const location = useLocation();

  const token = useSelector((state) => state.token.value);

  useOnChange(location.state?.searchItem, handleFilter);

  function handleFilter() {
    props.setCourses([]);
    props.setMainText("");
    axios
      .get(proxy.URL + "/trainee/courses", {
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
          country: token ? token.country : localStorage.getItem("country"),
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

      {token?.type !== "corporate" && (
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
