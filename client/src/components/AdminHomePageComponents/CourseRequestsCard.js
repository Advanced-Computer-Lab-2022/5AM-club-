import { memo, Fragment } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import request from "../../assets/AdminHomePage/request.png";

function CourseRequestsCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='200'
          image={request}
          alt='course request'
        />
        <CardContent>
          <Typography gutterBottom variant='h4' component='div'>
            Course Requests
          </Typography>
          <Typography variant='h6' color='text.secondary'>
            There are n requests from corporate trainees to access courses
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default memo(CourseRequestsCard);
