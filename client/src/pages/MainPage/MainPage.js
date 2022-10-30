import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import proxy from "../../utils/proxy.json";

function MainPage() {
  const [trainees, setTrainees] = useState();
  const [instructors, setInstructors] = useState();
  const [admin, setAdmin] = useState();

  useEffect(() => {
    axios.get(proxy.URL + "/search");
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("instructor");
        }}
      >
        Instructor Page
      </button>
      <button
        onClick={() => {
          navigate("trainee");
        }}
      >
        Trainee Page
      </button>
      <button>Admin Page</button>
    </div>
  );
}
export default MainPage;
