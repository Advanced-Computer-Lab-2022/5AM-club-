import { useState, memo } from "react";
import app from "../../utils/AxiosConfig.js";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import moment from "moment";
function CoursePromotionContainer(props) {
  const [percentage, setPercentage] = useState(1);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

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
        })
        .then((res) => {
          console.log(res);
          alert("Course promotion has been set successfully!");
        })
        .catch((err) => {
          alert("Dates are not valid!");
        });
    }
  };
  return (
    <Card sx={{ m: 2, p: 2 }}>
      <Typography gutterBottom variant='h5' component='div'>
        {props.course.title}
      </Typography>
      <Box component='form' onSubmit={handleSubmit} autoComplete='off'>
        <Typography variant='h6' sx={{ m: 1 }}>
          Percentage
        </Typography>
        <TextField
          sx={{ m: 1 }}
          variant='outlined'
          size='small'
          fullWidth
          type='number'
          InputProps={{ inputProps: { min: 1, max: 100 } }}
          id='percentage'
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />
        <Typography variant='h6' sx={{ m: 1 }}>
          Start date
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label='start'
            value={startDate}
            onChange={(e) => setStartDate(e)}
            disablePast={true}
            renderInput={(params) => <TextField {...params} />}
          />
          <Typography variant='h6' sx={{ m: 1 }}>
            End date
          </Typography>
          <DateTimePicker
            label='end'
            value={endDate}
            onChange={(e) => setEndDate(e)}
            minDateTime={startDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Button variant='outlined' color='success' sx={{ m: 1 }} type='submit'>
          Set promotion
        </Button>
      </Box>
    </Card>
  );
}
export default memo(CoursePromotionContainer);
