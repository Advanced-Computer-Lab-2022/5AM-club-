import { memo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import request from "../../assets/AdminHomePage/request.png";
import "./CoursePromoCard.css";

function CoursePromoCard() {
  return (
    <Card sx={{ maxWidth: 345, height: "500px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={request}
          alt="course request"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Course Promos
          </Typography>
          <Typography variant="h6" color="text.secondary">
            You can apply promotions for specific courses or all courses.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default memo(CoursePromoCard);
