import { Button, TextField } from "@mui/material";
import { display } from "@mui/system";
import { useState } from "react";
import { Delete, WidthNormal } from "@mui/icons-material";

const AddSubtitle = () => {
  const [subtitles, SetSubtitles] = useState([]);
  // const [subtitleDescriptions, SetSubtitleDescriptions] = useState([]);
  return (
    <>
      {subtitles.map((element, idx) => (
        <div
          style={{
            backgroundColor: "lightgray",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "15px",
          }}
        >
          <Button
            key={"btn" + { idx }}
            style={{ maxWidth: "20px" }}
            variant="outlined"
            startIcon={<Delete style={{ color: "red", width: "20px" }} />}
            onClick={() => {
              console.log(subtitles);
              SetSubtitles([
                ...subtitles.slice(0, idx),
                ...subtitles.slice(idx + 1),
              ]);
              console.log(subtitles);
            }}
          ></Button>
          <TextField
            key={"subtitle" + { idx }}
            hiddenLabel
            id={"subtitle" + { idx }}
            variant="outlined"
            label={"Course Subtitle " + (idx + 1)}
            style={{ backgroundColor: "white" }}
            // value={element.title}
            onChange={(e) => {
              subtitles[idx].title = e.target.value;
            }}
          />
          <TextField
            hiddenLabel
            key={"subtitle" + { idx }}
            id={"subtitleDesc" + { idx }}
            variant="outlined"
            label={"Course Subtitle Description " + (idx + 1)}
            style={{ backgroundColor: "white" }}
            multiline
            minRows={3}
            //value={element.subtitleDescription}
            onChange={(e) => {
              subtitles[idx].description = e.target.value;
            }}
          />
        </div>
      ))}
      <div id="btns" style={{ display: "flex" }}>
        <Button
          id="addSub"
          style={{
            marginRight: "auto",
            backgroundColor: "green",
            color: "white",
          }}
          onClick={() =>
            SetSubtitles([...subtitles, { title: "", description: "" }])
          }
        >
          Add Subtitle{" "}
        </Button>
        <Button
          id="removeSub"
          style={{
            marginLeft: "auto",
            backgroundColor: "red",
            color: "white",
          }}
          onClick={() => SetSubtitles(subtitles.slice(0, -1))}
        >
          remove Subtitle{" "}
        </Button>
      </div>
    </>
  );
};

export default AddSubtitle;
//module.exports = subtitles;
