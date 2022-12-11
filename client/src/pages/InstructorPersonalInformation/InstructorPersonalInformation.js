import proxy from "../../utils/proxy";
import app from "../../utils/axiosConfig.js";
import { useState, useEffect, memo } from "react";
import PersonalInformationContainer from "../../components/PersonalInformationContainer/PersonalInformationContainer";
import "./InstructorPersonalInformation.css";

function InstructorPersonalInformation() {
    const [instructor, setInstructor] = useState();

    useEffect(() => {
        app.get("/get-user", {
            headers: {
                // TODO : replace id with token
                id: window.localStorage.getItem("id"),
                type: "instructor",
            },
        })
            .then((res) => {
                setInstructor(res.data);
            })
            .catch((err) => {});
    }, []);
    return (
        instructor && <PersonalInformationContainer instructor={instructor} />
    );
}
export default memo(InstructorPersonalInformation);
