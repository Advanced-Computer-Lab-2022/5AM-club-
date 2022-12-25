import { memo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import report from "../../assets/AdminHomePage/report.png";
import "./ReportsCard.css";
import { useNavigate } from "react-router-dom";

function AddReportsCard() {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ maxWidth: 345, height: "400px" }}
      className="card-hover-green"
      onClick={() => {}}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={report}
          alt="course request"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            User Reports
          </Typography>
          <Typography variant="h6" color="text.secondary">
            View and change user report statuses.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default memo(AddReportsCard);
