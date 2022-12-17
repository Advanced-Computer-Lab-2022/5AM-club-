import { useRef, memo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./GeneralFiltersContainer.css";
import "./styles.less";
import "./styles.css";
import Rating from "@mui/material/Rating";
import { RangeSlider, InputGroup, InputNumber } from "rsuite";
import app from "../../utils/AxiosConfig.js";

function GeneralFiltersContainer(props) {
  const subjectRef = useRef();

  const [price, setPrice] = useState([null, null]);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  useEffect(() => {
    app
      .get(
        localStorage.getItem("type")
          ? localStorage.getItem("type") === "corporate" ||
            localStorage.getItem("type") === "individual"
            ? "/trainee/courses/course-max-min"
            : "/" + localStorage.getItem("type") + "/courses/course-max-min"
          : "/courses/course-max-min",
        {
          headers: {
            country: localStorage.getItem("country"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        setPrice([
          Math.floor(response.data.min - 1),
          Math.floor(response.data.max + 1),
        ]);
        setMin(Math.floor(response.data.min - 1));
        setMax(Math.floor(response.data.max + 1));
      });
  }, []);

  let rating = null;

  const location = useLocation();

  useEffect(() => {
    handleFilter();
  }, [location.state?.searchItem]);

  function handleFilter() {
    props.setNoCourses(false);
    console.log({
      min: price[0],
      max: price[1],
      subject: subjectRef.current.value ? subjectRef.current.value : null,
      rating: rating,
      searchItem:
        location.state?.searchItem !== null &&
        location.state?.searchItem !== undefined
          ? location.state?.searchItem
          : null,
    });
    props.setFilter({
      min: price[0],
      max: price[1],
      subject: subjectRef.current.value ? subjectRef.current.value : null,
      rating: rating,
      searchItem:
        location.state?.searchItem !== null &&
        location.state?.searchItem !== undefined
          ? location.state?.searchItem
          : null,
    });
  }

  function handleClear() {}

  return (
    <div className="general-filters-wrapper">
      <p>Filter by subject:</p>
      <input ref={subjectRef} type={"text"}></input>

      {localStorage.getItem("type") !== "corporate" && (
        <div
          style={{
            width: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {" "}
          <div>Filter by Price:</div>
          <RangeSlider
            min={min || 0}
            max={max || 0}
            progress
            style={{ borderColor: "black", color: "black" }}
            value={price[0] ? price : [0, 0]}
            onChange={(value) => {
              setPrice(value);
            }}
          />
          <InputGroup>
            <InputNumber
              min={min || 0}
              max={max || 0}
              value={price[0] || 0}
              onChange={(nextValue) => {
                const [start, end] = price;
                if (parseInt(nextValue) > end) {
                  return;
                }
                setPrice([parseInt(nextValue), end]);
              }}
            />
            <InputGroup.Addon>to</InputGroup.Addon>
            <InputNumber
              min={min || 0}
              max={max || 0}
              value={price[1] || 0}
              onChange={(nextValue) => {
                const [start, end] = price;
                if (start > parseInt(nextValue)) {
                  return;
                }
                setPrice([start, parseInt(nextValue)]);
              }}
            />
          </InputGroup>
        </div>
      )}
      <p>Filter by rating:</p>
      <Rating
        name="read-only"
        size="medium"
        sx={{
          color: "success.main",
        }}
        precision={0.5}
        onChange={(e) => {
          rating = e.target.value;
        }}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        {" "}
        <button
          onClick={handleClear}
          className="btn btn-outline-danger"
          style={{ fontSize: "13px" }}
        >
          Clear Filters
        </button>
        <button
          onClick={handleFilter}
          className="btn btn-outline-success"
          style={{ fontSize: "13px" }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
export default memo(GeneralFiltersContainer);
