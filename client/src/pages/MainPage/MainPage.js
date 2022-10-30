import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import proxy from "../../utils/proxy.json";

function MainPage() {
  const [trainees, setTrainees] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios
      .get(proxy.URL + "/get-users", { headers: { type: "trainee" } })
      .then((response) => {
        setTrainees(response.data);
      })
      .catch(() => {});
    axios
      .get(proxy.URL + "/get-users", { headers: { type: "instructor" } })
      .then((response) => {
        setInstructors(response.data);
      })
      .catch(() => {});
    axios
      .get(proxy.URL + "/get-users", { headers: { type: "admin" } })
      .then((response) => {
        setAdmins(response.data);
      })
      .catch(() => {});
  }, []);

  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          onClick={() => {
            navigate("instructor");
          }}
        >
          Instructor Page
        </button>
        {instructors.map((instructor, idx) => {
          idx !== 0 && <p key={instructor.username}> {instructor.username}</p>;
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          onClick={() => {
            navigate("trainee");
          }}
        >
          Trainee Page
        </button>
        {trainees.map((trainee, idx) => {
          idx !== 0 && <p key={trainee.username}> {trainee.username}</p>;
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          onClick={() => {
            navigate("admin");
          }}
        >
          Admin Page
        </button>
        {admins.map((admin, idx) => {
          idx !== 0 && <p key={admin.username}> {admin.username}</p>;
        })}
      </div>
    </div>
  );
}
export default MainPage;
