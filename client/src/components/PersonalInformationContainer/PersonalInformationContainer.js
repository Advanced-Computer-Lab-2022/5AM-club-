import { useState, memo } from "react";
import app from "../../utils/AxiosConfig.js";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
function PersonalInformationContainer(props) {
  const [email, setEmail] = useState(props.instructor.email);
  const [biography, setBiography] = useState(props.instructor.biography);
  const [editable, setEditable] = useState(false);
  const handleSubmit = (event) => {
    if (!editable) return;
    event.preventDefault();
    app
      .put(
        "/instructor/edit-personal-info",
        { email: email, biography: biography },
        {
          headers: { id: props.instructor._id },
        }
      )
      .then((res) => {
        alert("Your personal information have been edited successfully");
        setEditable(false);
      })
      .catch((err) => {
        alert("Your email address is not in the correct format");
      });
  };
  return (
    <Card sx={{ m: 2, p: 2 }}>
      <Typography gutterBottom variant="h5" component="div">
        Personal Information
      </Typography>
      <Box component="form" onSubmit={handleSubmit} autoComplete="off">
        <Typography variant="h6" sx={{ m: 1 }}>
          Email
        </Typography>
        <TextField
          sx={{ m: 1 }}
          variant="outlined"
          size="small"
          fullWidth
          id="email"
          InputProps={{
            readOnly: !editable,
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Typography variant="h6" sx={{ m: 1 }}>
          Biography
        </Typography>
        <TextField
          sx={{ m: 1 }}
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          id="biography"
          InputProps={{
            readOnly: !editable,
          }}
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
        />
        {editable === true ? (
          <Button
            variant="outlined"
            color="success"
            sx={{ m: 1 }}
            type="submit"
          >
            Save
          </Button>
        ) : (
          <div>
            <Button
              variant="outlined"
              color="success"
              sx={{ m: 1 }}
              onClick={() => {
                setEditable(true);
              }}
            >
              Edit
            </Button>
          </div>
        )}
      </Box>
    </Card>
  );
}
export default memo(PersonalInformationContainer);
