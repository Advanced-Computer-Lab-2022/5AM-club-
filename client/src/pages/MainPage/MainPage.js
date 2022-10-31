import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import proxy from "../../utils/proxy.json";
import { width } from "@mui/system";
import SelectCountry from "../../components/SelectCountry/SelectCountry";

function MainPage() {
  const [corporateTrainees, setCorporateTrainees] = useState([]);
  const [individualTrainees, setIndividualTrainees] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios
      .get(proxy.URL + "/get-users", { headers: { type: "corporate" } })
      .then((response) => {
        setCorporateTrainees(response.data);
      })
      .catch(() => {});
    axios
      .get(proxy.URL + "/get-users", { headers: { type: "individual" } })
      .then((response) => {
        setIndividualTrainees(response.data);
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
    <>
      {" "}
      <button
        onClick={() => {
          navigate("courses");
        }}
      >
        View Courses
      </button>
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>Instructors</p>{" "}
          <button
            onClick={() => {
              navigate("instructor");
            }}
          >
            {instructors[0]?.username}
          </button>
          {instructors.map((instructor, index) => {
            return index !== 0 ? (
              <p key={instructor.username}> {instructor.username} </p>
            ) : null;
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>Individual Trainees</p>
          <button
            onClick={() => {
              navigate("individual-trainee");
            }}
          >
            {individualTrainees[0]?.username}
          </button>
          {individualTrainees.map((trainee, index) => {
            return index !== 0 ? (
              <div key={trainee.username}> {trainee.username}</div>
            ) : null;
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>Corporate Trainees</p>
          <button
            onClick={() => {
              navigate("corporate-trainee");
            }}
          >
            {corporateTrainees[0]?.username}
          </button>
          {corporateTrainees.map((trainee, index) => {
            return index !== 0 ? (
              <div key={trainee.username}> {trainee.username}</div>
            ) : null;
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>Admins</p>{" "}
          <button
            onClick={() => {
              navigate("admin");
            }}
          >
            {admins[0]?.username}
          </button>
          {admins.map((admin, index) => {
            return index !== 0 ? (
              <p key={admin.username}> {admin.username}</p>
            ) : null;
          })}
        </div>
      </div>
      <SelectCountry></SelectCountry>
    </>
  );
}
export default MainPage;
