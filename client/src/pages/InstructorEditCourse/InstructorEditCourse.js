import axios from "axios";
import { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import proxy from "../../utils/proxy.json";
import EditCourse from "../../components/EditCourse/EditCourse";
function InstructorEditCourse() {
  const [course, setCourse] = useState();

  const location = useLocation();

  useEffect(() => {
    axios.get(proxy.URL + "/courses/" + location.state?.id).then((response) => {
      setCourse(response.data);
    });
  }, []);

  console.log(course);

  return (
    <div>
      <EditCourse course={course} setCourse={setCourse}></EditCourse>
    </div>
  );
}
export default memo(InstructorEditCourse);
