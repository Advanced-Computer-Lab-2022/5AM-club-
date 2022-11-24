import proxy from "../../utils/proxy.json";
import axios from "axios";
import { useEffect, memo } from "react";
import { useSelector } from "react-redux";
import countries from "../../utils/Countries.json";
function InstructorCoursesContainer(props) {
  const token = useSelector((state) => state.token.value);

  useEffect(() => {
    props.setCourses([]);
    props.setMainText("");
    axios
      .get(proxy.URL + "/instructor/my-courses", {
        headers: {
          id: token.id,
          country: token.country,
        },
      })
      .then((response) => {
        if (response.data.length === 0)
          props.setMainText("You don't have any courses yet");
        else props.setMainText("");
        props.setCourses(response.data);
      });
  }, [props, token.id, token.country]);
  return (
    <div>
      <div>{props.mainText}</div>
      {props.courses.map((course) => (
        <div key={course.id}>
          {course.title +
            " price: " +
            course.price +
            " " +
            countries[Object.keys(countries).find((e) => e === token.country)]}
        </div>
      ))}
    </div>
  );
}
export default memo(InstructorCoursesContainer);
