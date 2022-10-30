import { useState, useRef, useEffect } from "react";
import proxy from "../../utils/proxy.json";
import { useUpdateEffect } from "react-use";
import { useLocation } from "react-router-dom";
import axios from "axios";
function TraineeFiltersContainer(props) {
  const [max, setMax] = useState();
  const [min, setMin] = useState();
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState();
  const ratingRef = useRef();
  const subjectRef = useRef();
  const maxRef = useRef();
  const minRef = useRef();
  const [country, setCountry] = useState("United States");
  const [searchItem, setSearchItem] = useState("");
  const location = useLocation();

  useEffect(() => {
    setSearchItem(location.state.searchItem);
  }, [location.state.searchItem]);
  useEffect(() => {
    if (
      location.pathname.includes("trainee") ||
      location.pathname.includes("instructor") ||
      location.pathname.includes("admin")
    ) {
      axios
        .get(proxy.URL + "/trainee/get-user", {
          headers: location.pathname.includes("trainee")
            ? { id: "635ad854b2ad88bd8358a5af", type: "trainee" }
            : location.pathname.includes("instructor")
            ? { id: "635ad854b2ad88bd8358a5af", type: "instructor" } //Hard Coded here
            : { id: "635ad854b2ad88bd8358a5af", type: "admin" },
        })
        .then((response) => {
          setCountry(response.data.country);
        })
        .catch(() => {});
    } else {
    }
  }, []);
  useUpdateEffect(() => {
    props.setCourses([]);
    props.setMainText("");
    axios
      .get(proxy.URL + "/trainee/courses", {
        params: {
          min: min,
          max: max,
          subject: subject,
          rating: rating,
          searchitem: searchItem,
        },
        headers: { country: country },
      })
      .then((response) => {
        if (response.data.length === 0)
          props.setMainText("No courses matched your filters");
        props.setCourses(response.data);
      })
      .catch(() => {
        props.setMainText("No courses matched your filters");
      });
  }, [max, min, subject, rating, searchItem]);

  return (
    <div>
      <p>Filter by subject:</p>
      <input ref={subjectRef} type={"text"}></input>

      <div>
        <p>Filter by price:</p>
        <input ref={minRef} type={"number"}></input>
        <p> to </p>
        <input ref={maxRef} type={"number"}></input>
      </div>

      <p>Filter by rating:</p>
      <input ref={ratingRef} type={"number"}></input>

      <button
        onClick={() => {
          setMax(maxRef.current.value);
          setMin(minRef.current.value);
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
export default TraineeFiltersContainer;
