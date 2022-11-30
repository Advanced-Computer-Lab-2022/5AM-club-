import proxy from "../../utils/proxy";
import axios from "axios";
import { useState, useEffect, memo } from "react";
import PersonalInformationContainer from "../../components/PersonalInformationContainer/PersonalInformationContainer";
import "./InstructorPersonalInformation.css";

function InstructorPersonalInformation() {
  const [instructor, setInstructor] = useState();

  useEffect(() => {
    axios
      .get(proxy.URL + "/get-user", {
        headers: {
          id: window.localStorage.getItem("id"),
          type: "instructor",
        },
      })
      .then((res) => {
        setInstructor(res.data);
      })
      .catch((err) => {});
  }, []);
  return instructor && <PersonalInformationContainer instructor={instructor} />;
}
export default memo(InstructorPersonalInformation);
