import { memo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./GeneralFiltersContainer.css";
import "./styles.less";
import "./styles.css";
import Rating from "@mui/material/Rating";
import { RangeSlider, InputGroup, InputNumber } from "rsuite";
import app from "../../utils/AxiosConfig.js";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getSubjectValues } from "../../utils/Helpers.js";

function GeneralFiltersContainer(props) {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [price, setPrice] = useState([null, null]);
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [rating, setRating] = useState();

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
        app
          .get(
            localStorage.getItem("type")
              ? localStorage.getItem("type") === "corporate" ||
                localStorage.getItem("type") === "individual"
                ? "/trainee/courses/course-subjects"
                : "/" +
                  localStorage.getItem("type") +
                  "/courses/course-subjects"
              : "/courses/course-subjects",
            {
              headers: {
                country: localStorage.getItem("country"),
              },
            }
          )
          .then((response) => {
            console.log(response);
            setSubjects(response.data);
          });
      });
  }, []);

  const location = useLocation();

  useEffect(() => {
    handleFilter();
  }, [location.state?.searchItem]);

  function handleFilter() {
    props.setNoCourses(false);
    props.setFilter({
      min: price[0],
      max: price[1],
      subject: getSubjectValues(selectedSubjects),
      rating: rating,
      searchItem:
        location.state?.searchItem !== null &&
        location.state?.searchItem !== undefined
          ? location.state?.searchItem
          : null,
    });
  }

  function handleClear() {
    props.setNoCourses(false);
    setSelectedSubjects([]);
    setRating();
    setPrice([min, max]);
    props.setFilter({
      min: min,
      max: max,
      subject: null,
      courseRating: null,
      searchItem:
        location.state?.searchItem !== null &&
        location.state?.searchItem !== undefined
          ? location.state?.searchItem
          : null,
    });
  }
  const animatedComponents = makeAnimated();

  return (
    <div className="general-filters-wrapper">
      <p>Filter by subject:</p>

      <Select
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "#A6D6B5",
            primary: "#96cea8",
          },
        })}
        value={selectedSubjects}
        onChange={(e) => {
          setSelectedSubjects(e);
        }}
        styles={{ zIndex: 9999, position: "relative" }}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={subjects}
      />

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
          <div>
            <div
              style={{
                height: "4px",
                backgroundColor: "#484848",
                position: "absolute",
                width: "240px",
                left: "200px",
                right: "0",
                marginTop: "5px",
              }}
            ></div>
          </div>
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
          <InputGroup styles={{ zIndex: -1, position: "relative" }}>
            <InputNumber
              styles={{ zIndex: -1, position: "relative" }}
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
              styles={{ zIndex: -1, position: "relative" }}
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
      <div>
        <div
          style={{
            height: "4px",
            backgroundColor: "#484848",
            position: "absolute",
            width: "240px",
            left: "200px",
            right: "0",
            marginTop: "5px",
          }}
        ></div>
      </div>
      <p style={{ marginTop: "7px" }}>Filter by rating:</p>
      <Rating
        name="read-only"
        size="medium"
        sx={{
          color: "success.main",
        }}
        precision={0.5}
        value={rating || 0}
        onChange={(e) => {
          setRating(e.target.value);
        }}
      />
      <div>
        <div
          style={{
            height: "4px",
            backgroundColor: "#484848",
            position: "absolute",
            width: "240px",
            left: "200px",
            right: "0",
            marginTop: "5px",
          }}
        ></div>
      </div>
      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
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
