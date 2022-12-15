import app from "../../utils/AxiosConfig.js";
import "./ViewContract.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, memo } from "react";
import { TextareaAutosize } from "@mui/material";
function ViewContract() {
  const [instructor, setInstructor] = useState({});

  useEffect(() => {
    app
      .get("/instructor/get-user", {
        headers: {
          type: "instructor",
        },
      })
      .then((res) => {
        setInstructor(res.data);
      });
  }, []);
  const navigate = useNavigate();
  const [mainText, setMainText] = useState("Loading Contract...");
  const [contract, setContract] = useState([]);
  function acceptContract() {
    app.get("/instructor/accept-contract").then(() => {
      navigate("/instructor");
    });
  }
  useEffect(() => {
    setContract([]);
    app.get("/instructor/view-contract", {}).then((response) => {
      if (response.data.length === 0)
        setMainText("No contract is available yet");
      else setMainText("");

      setContract(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {mainText}
      <div>
        Contract:{" "}
        <TextareaAutosize
          className="contract-text"
          defaultValue={contract}
          readOnly={true}
        ></TextareaAutosize>
        {!instructor.accepted && (
          <button className="btn btn-success" onClick={acceptContract}>
            Accept
          </button>
        )}
      </div>
    </>
  );
}

export default memo(ViewContract);
