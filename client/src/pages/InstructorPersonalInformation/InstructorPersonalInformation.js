import app from "../../utils/AxiosConfig.js";
import { useState, useEffect, memo } from "react";
import PersonalInformationContainer from "../../components/PersonalInformationContainer/PersonalInformationContainer";
import "./InstructorPersonalInformation.css";

function InstructorPersonalInformation() {
  const [instructor, setInstructor] = useState();

  useEffect(() => {
    app
      .get("/instructor/get-user", {
        headers: {
          type: "instructor",
        },
      })
      .then((res) => {
        setInstructor(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return instructor && <PersonalInformationContainer instructor={instructor} />;
}
export default memo(InstructorPersonalInformation);
