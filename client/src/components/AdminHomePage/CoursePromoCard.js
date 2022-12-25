import { memo, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import addUser from "../../assets/AdminHomePage/promo.png";
import "./AddUserCard.css";
import Modal from "react-bootstrap/Modal";
import makeAnimated from "react-select/animated";
import app from "../../utils/AxiosConfig.js";
import Select from "react-select";
import { getCourseNames, getCourseTitles } from "../../utils/Helpers";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function CoursePromoCard() {
  const [percentage, setPercentage] = useState(1);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const animatedComponents = makeAnimated();

  const popperSx = {
    "& .MuiPaper-root": {
      backgroundColor: "#484848",
      color: "white",
      border: "4px solid #96CEA8",
      padding: 2,
      borderRadius: 3,
    },

    "& .MuiButtonBase-root": {
      backgroundColor: "#484848",
      color: "white",
    },
    "& .Mui-disabled": {
      color: "#777777",
    },
    "& .Mui-selected": {
      backgroundColor: "#96CEA8",
    },
    "& .MuiClockPointer-root": {
      backgroundColor: "#96CEA8",
    },
    "& .MuiClockPointer-thumb": {
      border: "14px solid #96CEA8",
    },
    "& .MuiPickersClock-clock": {
      backgroundColor: "#484848",
    },

    "& .MuiPickersClockPointer-pointer": {
      backgroundColor: "#96CEA8",
    },
    "& .MuiClock-pin": {
      backgroundColor: "#96CEA8",
    },
    "& .MuiClockNumber-root": {
      color: "white",
    },
    "& .PrivatePickersYear-button.Mui-selected": {
      backgroundColor: "#96CEA8",
    },

    "& .css-3eghsz-PrivatePickersYear-button.Mui-selected:hover": {
      backgroundColor: "#96FFA8",
    },
    "& .css-195y93z-MuiButtonBase-root-MuiPickersDay-root.Mui-selected:hover": {
      backgroundColor: "#96FFA8",
    },
    "& .css-195y93z-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
      backgroundColor: "#96CEA8",
    },
    "& .css-1x0z7xg-MuiButtonBase-root-MuiPickersDay-daySelected": {
      backgroundColor: "#96CEA8",
    },
    "& .css-3eghsz-PrivatePickersYear-button.Mui-selected": {
      backgroundColor: "#96CEA8",
    },
    "& .css-bkrceb-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
      backgroundColor: "#96CEA8",
    },
    "& .css-bkrceb-MuiButtonBase-root-MuiPickersDay-root:hover": {
      backgroundColor: "#999999",
    },
  };
  const [show, setShow] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    app
      .get("/admin/courses", {
        headers: { type: "admin", country: localStorage.getItem("country") },
      })
      .then((response) => {
        console.log(response.data);
        setCourses(response.data);
      });
  }, []);

  const addPromotions = (event) => {
    event.preventDefault();
    if (selectedCourses.length === 0) {
      alert("Please select at least one course");
    } else {
      if (endDate < startDate) {
        alert("Promotion end date must be after its start date");
      } else {
        app
          .put("/set-multiple-promotions", {
            percentage: percentage,
            startDate: startDate,
            endDate: endDate,
            type: "admin",
            courses:
              selectedCourses.filter((e) => e.value === "all courses").length >
              0
                ? getCourseTitles(courses)
                : getCourseTitles(selectedCourses),
          })
          .then((res) => {
            console.log(res);
            setShow(false);
            setSelectedCourses([]);
            setPercentage(1);
            setStartDate();
            setEndDate();

            alert("Course promotion has been set successfully!");
          })
          .catch((err) => {
            if (err.response?.status === 407) alert(err.response?.data);
            else alert("Dates are not valid!");
          });
      }
    }
  };
  // const user = window.localStorage.getItem("user");

  function onClickHide() {
    setShow(false);
    setSelectedCourses([]);
    setPercentage(1);
    setStartDate();
    setEndDate();
  }

  return (
    <>
      <Card
        onClick={() => setShow(true)}
        sx={{
          height: "100px",
          width: "537px",
        }}
        className="card-hover-green"
      >
        <CardActionArea
          style={{
            display: "flex",
            WebkitJustifyContent: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "row",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <img height="100" width="150" src={addUser} alt="add user" />

          <Typography gutterBottom variant="h4" component="div">
            Add Course Promotion{" "}
          </Typography>
        </CardActionArea>
      </Card>
      <Modal
        size="lg"
        centered
        show={show}
        onHide={onClickHide}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <div className="tos-wrapper" style={{ width: "100%" }}>
          <div className="tos-border-success" style={{ width: "100%" }}>
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Add Course Promotion
              </Modal.Title>
            </Modal.Header>

            <Modal.Body
              className="tos"
              style={{
                height: "fit-content",
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  className="margin"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <label style={{ fontSize: "25px" }}>Courses : </label>
                  <Select
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary25: "#A6D6B5",
                        primary: "#96cea8",
                      },
                    })}
                    value={selectedCourses}
                    onChange={(e) => {
                      // check if array contains object with value "all courses"
                      if (
                        e &&
                        e.some((el) => el.value === "all courses") &&
                        e.length > 1
                      ) {
                        // if it does, filter all other values
                        e = e.filter((el) => el.value === "all courses");
                      }
                      setSelectedCourses(e);
                    }}
                    styles={{ zIndex: 9999, position: "relative" }}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={[
                      { label: "All Courses", value: "all courses" },
                      ...getCourseNames(courses),
                    ]}
                  />
                </div>
                <div
                  className="form-group margin"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Box component="form" autoComplete="off">
                    <Typography variant="h6">Percentage</Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      type="number"
                      InputProps={{ inputProps: { min: 1, max: 100 } }}
                      id="percentage"
                      value={percentage}
                      onChange={(e) => {
                        if (e.target.value < 1) setPercentage(1);
                        else if (e.target.value > 100) setPercentage(100);
                        else setPercentage(e.target.value);
                      }}
                    />
                    <Typography variant="h6">Start date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        label="start"
                        value={startDate}
                        onChange={(e) => setStartDate(e)}
                        disablePast={true}
                        components={{ OpenPickerIcon: CalendarMonthIcon }}
                        InputProps={{
                          sx: { "& .MuiSvgIcon-root": { color: "#96CEA8" } },
                        }}
                        PopperProps={{ sx: popperSx }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <Typography variant="h6">End date</Typography>
                      <DateTimePicker
                        label="end"
                        value={endDate}
                        onChange={(e) => setEndDate(e)}
                        minDateTime={startDate}
                        components={{ OpenPickerIcon: CalendarMonthIcon }}
                        InputProps={{
                          sx: { "& .MuiSvgIcon-root": { color: "#96CEA8" } },
                        }}
                        PopperProps={{ sx: popperSx }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
                  <div
                    style={{ display: "flex", flexDirection: "row-reverse" }}
                  >
                    <button
                      className="btn btn-outline-success"
                      onClick={(e) => {
                        addPromotions(e);
                      }}
                    >
                      Set promotion
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default memo(CoursePromoCard);
