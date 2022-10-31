import { useState, useEffect } from "react";
import InstructorCoursesContainer from "../../components/InstructorCoursesContainer/InstructorCoursesContainer";
import InstructorFiltersContainer from "../../components/InstructorFiltersContainer/InstructorFiltersContainer";
import proxy from "../../utils/proxy.json";
import axios from "axios";
function InstructorMyCourses() {
  const [courses, setCourses] = useState([]);
  const [mainText, setMainText] = useState("You don't have any courses yet");
  const [country, setCountry] = useState("");
  useEffect(() => {
    {
      axios
        .get(proxy.URL + "/get-user", {
          headers: { id: "6355091ab4c387ca835c6bfc", type: "instructor" },
        })
        .then((response) => {
          setCountry(response.data.country);
        })
        .catch(() => {
          setCountry("United States");
        });
    }
  }, []);
  return (
    <div>
      <InstructorFiltersContainer
        instructorId={"6355091ab4c387ca835c6bfc"}
        setCourses={setCourses}
        setMainText={setMainText}
        country={country}
      ></InstructorFiltersContainer>
      <InstructorCoursesContainer
        instructorId={"6355091ab4c387ca835c6bfc"}
        courses={courses}
        setCourses={setCourses}
        setMainText={setMainText}
        mainText={mainText}
        country={country}
      ></InstructorCoursesContainer>
    </div>
  );
}
export default InstructorMyCourses;
