import { useState, useRef, useEffect } from "react";
import proxy from "../../utils/proxy.json";
import { useUpdateEffect } from "react-use";
import { useLocation } from "react-router-dom";

import axios from "axios";
function GeneralFiltersContainer(props) {
  const [max, setMax] = useState();
  const [min, setMin] = useState();
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState();
  const ratingRef = useRef();
  const subjectRef = useRef();
  const maxRef = useRef();
  const minRef = useRef();
  const [searchItem, setSearchItem] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state?.searchItem !== null) {
      setSearchItem(location.state?.searchItem);
    }
  }, [location.state?.searchItem]);

  useUpdateEffect(() => {
    props.setCourses([]);
    props.setMainText("");
    if (props.country) {
      axios
        .get(proxy.URL + "/trainee/courses", {
          params: {
            min: min,
            max: max,
            subject: subject,
            rating: rating,
            searchitem: searchItem,
          },
          headers: { country: props.country },
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
  }, [max, min, subject, rating, searchItem, props.country]);

  return (
    <div>
      <p>Filter by subject:</p>
      <input ref={subjectRef} type={"text"}></input>

      {!location.pathname.includes("corporate-trainee") && (
        <div>
          <p>Filter by price:</p>
          <input ref={minRef} type={"number"}></input>
          <p> to </p>
          <input ref={maxRef} type={"number"}></input>
        </div>
      )}

      <p>Filter by rating:</p>
      <input ref={ratingRef} type={"number"}></input>

      <button
        onClick={() => {
          setMax(maxRef.current?.value);
          setMin(minRef.current?.value);
          setSubject(subjectRef.current.value);
          setRating(ratingRef.current.value);
          props.setMainText(null);
        }}
      >
        Go
      </button>
    </div>
  );
}
export default GeneralFiltersContainer;
