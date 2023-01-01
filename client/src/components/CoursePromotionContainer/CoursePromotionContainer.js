import { useState, memo } from "react";
import app from "../../utils/AxiosConfig.js";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

function CoursePromotionContainer(props) {
  const [percentage, setPercentage] = useState(1);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (endDate < startDate) {
      alert("Promotion end date must be after its start date");
    } else {
      app
        .put("/instructor/my-courses/" + props.course._id + "/set-promotion", {
          percentage: percentage,
          startDate: startDate,
          endDate: endDate,
          type: "instructor",
        })
        .then((res) => {
          alert("Course promotion has been set successfully!");
        })
        .catch((err) => {
          if (err.response.status === 407) alert(err.response.data);
          else alert("Dates are not valid!");
        });
    }
  };
  return (
    <Card sx={{ m: 2, p: 2 }}>
      <Typography gutterBottom variant="h5" component="div">
        {props.course.title}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} autoComplete="off">
        <Typography variant="h6" sx={{ m: 1 }}>
          Percentage
        </Typography>
        <TextField
          sx={{ m: 1 }}
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
        <Typography variant="h6" sx={{ m: 1 }}>
          Start date
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="start"
            value={startDate}
            onChange={(e) => setStartDate(e)}
            disablePast={true}
            components={{ OpenPickerIcon: CalendarMonthIcon }}
            InputProps={{ sx: { "& .MuiSvgIcon-root": { color: "#96CEA8" } } }}
            PopperProps={{ sx: popperSx }}
            renderInput={(params) => <TextField {...params} />}
          />
          <Typography variant="h6" sx={{ m: 1 }}>
            End date
          </Typography>
          <DateTimePicker
            label="end"
            value={endDate}
            onChange={(e) => setEndDate(e)}
            minDateTime={startDate}
            disablePast={true}
            components={{ OpenPickerIcon: CalendarMonthIcon }}
            InputProps={{ sx: { "& .MuiSvgIcon-root": { color: "#96CEA8" } } }}
            PopperProps={{ sx: popperSx }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Button variant="outlined" color="success" sx={{ m: 1 }} type="submit">
          Set promotion
        </Button>
      </Box>
    </Card>
  );
}
export default memo(CoursePromotionContainer);
