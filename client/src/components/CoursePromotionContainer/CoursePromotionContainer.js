import { useState, memo } from "react";
import proxy from "../../utils/proxy";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
function CoursePromotionContainer(props) {
  const [percentage, setPercentage] = useState(0);
  const [deadline, setDeadline] = useState(
    moment(new Date()).format("YYYY-MM-DDTHH:mm")
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    axios
      .put(
        proxy.URL +
          "/instructor/my-courses/" +
          props.course._id +
          "/set-promotion",
        { percentage: percentage, deadline: deadline },
        {
          headers: { id: window.localStorage.getItem("id") },
        }
      )
      .then((res) => {
        alert("Course promotion has been set successfully");
      })
      .catch((err) => {
        alert("The deadline is not valid");
      });
  };
  return (
    <Card sx={{ m: 2, p: 2 }}>
      <Typography gutterBottom variant='h5' component='div'>
        {props.course.title}
      </Typography>
      <Box component='form' onSubmit={handleSubmit} autoComplete='off'>
        <Typography variant='h6' sx={{ m: 1 }}>
          percentage
        </Typography>
        <TextField
          sx={{ m: 1 }}
          variant='outlined'
          size='small'
          fullWidth
          type='number'
          InputProps={{ inputProps: { min: 0, max: 100 } }}
          id='percentage'
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />
        <Typography variant='h6' sx={{ m: 1 }}>
          deadline
        </Typography>
        <TextField
          sx={{ m: 1 }}
          type='datetime-local'
          rows={4}
          fullWidth
          id='deadline'
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <Button variant='outlined' color='success' sx={{ m: 1 }} type='submit'>
          Set promotion
        </Button>
      </Box>
    </Card>
  );
}
export default memo(CoursePromotionContainer);
