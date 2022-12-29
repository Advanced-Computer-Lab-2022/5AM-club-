import { memo } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import request from "../../assets/AdminHomePage/request.png";
import "./CourseRequestsCard.css";

function CourseRequestsCard() {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => {
        navigate("requests");
      }}
      sx={{ maxWidth: 345, height: "400px" }}
      className="card-hover-green"
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={request}
          alt="course request"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Course Requests
          </Typography>
          <Typography variant="h6" color="text.secondary">
            View and manage course access requests.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default memo(CourseRequestsCard);
