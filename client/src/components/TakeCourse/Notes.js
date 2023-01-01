import { memo, useState, useRef, useEffect } from "react";
import { useUpdateEffect } from "react-use";
function Notes(props) {
  const [traineeNotes, setTraineeNotes] = useState();
  const [addingNote, setAddingNote] = useState(false);
  const [note, setNote] = useState("");

  const noteRef = useRef(null);

  useEffect(() => {
    if (noteRef && noteRef.current) {
      noteRef.current.innerText = note;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addingNote]);

  useUpdateEffect(() => {
    setTraineeNotes(
      props.traineeCourse?.notes[props.traineeCourse?.lastSection]
    );
  }, [props.traineeCourse?.lastSection]);
  return (
    <div>
      <div></div>
      <div>
        {addingNote ? (
          <div style={{ display: "flex" }}>
            <div
              ref={noteRef}
              className="course-attribute-input"
              value={note}
              onInput={(e) => {
                setNote(e.target.innerText);
              }}
              style={{
                fontSize: "60px",
                width: "auto",

                display: "inline-block",
                flexGrow: "1",
              }}
              contentEditable
              role="textbox"
            ></div>

            <button
              className="btn btn-outline-success"
              style={{ flexshrink: "0" }}
              onClick={() => {
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
