import { useState, memo } from "react";
import app from "../../utils/AxiosConfig.js";
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
    <Card sx={{ p: 2, backgroundColor: "#96cea8" }}>
      <Box component="form" onSubmit={handleSubmit} autoComplete="off">
        <div style={{ display: "flex", alignItems: "center" }}></div>
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
        <div
          style={{
            display: "inline-block",
            borderRadius: "5px",
            marginLeft: "8px",
            backgroundColor: "white",
            marginTop: "10px",
          }}
        >
          {editable === true ? (
            <button
              className="btn btn-outline-success"
              sx={{ m: 1, backgroundColor: "white !important" }}
              type="submit"
            >
              Save
            </button>
          ) : (
            <div>
              <button
                className="btn btn-outline-success"
                onClick={() => {
                  setEditable(true);
                }}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </Box>
    </Card>
  );
}
export default memo(PersonalInformationContainer);
