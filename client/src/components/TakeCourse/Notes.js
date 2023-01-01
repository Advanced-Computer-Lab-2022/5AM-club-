import { TextareaAutosize } from "@mui/material";
import { memo, useState } from "react";
import { useUpdateEffect } from "react-use";
import { jsPDF } from "jspdf";

import "./Notes.css";
function Notes(props) {
  const [traineeNotes, setTraineeNotes] = useState();
  const [addingNote, setAddingNote] = useState(false);
  const [note, setNote] = useState("");

  const notesPDF = new jsPDF();

  useUpdateEffect(() => {
    setTraineeNotes(
      props.traineeCourse?.notes[props.traineeCourse?.lastSection]
    );
  }, [props.traineeCourse?.lastSection]);
  return (
    <div
      style={{
        border: "5px solid rgb(150, 206, 168)",
        display: "flex",
        flexDirection: "column",

        borderRadius: "20px",
        padding: "20px",
        margin: "30px",
        overflow: "auto",
        wordWrap: "break-word",
        overflowWrap: "break-word",
        wordBreak: "break-word",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {" "}
      <div
        style={{ display: "flex", marginBottom: "5px", alignItems: "center" }}
      >
        <h5>Notes</h5>{" "}
        <button
          className="btn btn-outline-success"
          style={{ marginLeft: "auto" }}
          onClick={() => {
            let text = "";
            traineeNotes.map((note) => {
              text +=
                note.note +
                ". Created at " +
                new Date(note.createdAt).toLocaleString() +
                "\n\n";
            });
            notesPDF.text(10, 30, text, { maxWidth: 180 });
            notesPDF.save(
              props.course.title + "-" + props.currentSectionName + "-Notes.pdf"
            );
          }}
        >
          {" "}
          Download Notes
        </button>
      </div>
      <div
        style={{
          backgroundColor: "#CCCCCC",
          height: "2px",
          width: "100%",
          flexShrink: "0",
          marginBottom: "3px",
        }}
      ></div>
      <div
        className="notes-wrapper-scroll"
        style={{
          flexGrow: "1",
          fontSize: "20px",
          overflow: "auto",
          maxHeight: "546px",
          minHeight: "300px",
        }}
      >
        {props.traineeCourse?.notes[props.traineeCourse?.lastSection].map(
          (note, idx) => (
            <div class="message-blue" key={note + idx}>
              <div>
                <p class="message-content" style={{ color: "black" }}>
                  {note.note}
                </p>
                <p style={{ fontSize: "15px", color: "#777777" }}>
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          )
        )}
      </div>
      <div
        style={{
          backgroundColor: "#CCCCCC",
          height: "2px",
          width: "100%",
          flexShrink: "0",
          marginBottom: "10px",
        }}
      ></div>
      <div>
        {addingNote ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextareaAutosize
              value={note}
              placeholder="Add a note"
              onInput={(e) => {
                setNote(e.target.value);
              }}
              style={{
                border: "0",
                outline: "0",
                marginTop: "3px",
                fontSize: "20px",
                maxWidth: "1050px",
                flexGrow: "1",
              }}
              type="text"
            ></TextareaAutosize>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <button
                className="btn btn-outline-success"
                style={{ flexshrink: "0" }}
                onClick={() => {
                  if (note.length === 0) {
                    alert("You can't add an empty note.");
                    return;
                  }
                  console.log(traineeNotes, "asgdlkm");
                  setAddingNote(false);
                  setTraineeNotes([
                    ...traineeNotes,
                    { note, createdAt: new Date() },
                  ]);
                  const newNotes = props.traineeCourse.notes;
                  newNotes[props.traineeCourse.lastSection] = [
                    ...newNotes[props.traineeCourse.lastSection],
                    { note, createdAt: new Date() },
                  ];
                  props.updateTraineeCourse({
                    ...props.traineeCourse,
                    notes: newNotes,
                  });
                  setNote("");
                }}
              >
                Add
              </button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <button
                className="btn btn-outline-success"
                onClick={() => {
                  setAddingNote(true);
                }}
              >
                Add Note
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default memo(Notes);
