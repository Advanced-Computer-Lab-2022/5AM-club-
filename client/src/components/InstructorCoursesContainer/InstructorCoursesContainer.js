import proxy from "../../utils/proxy.json";
import axios from "axios";
import { useEffect, memo } from "react";
import CountryToCurrency from "country-to-currency";
import countries from "../../utils/Countries.json";
function InstructorCoursesContainer(props) {
  useEffect(() => {
    props.setCourses([]);
    props.setMainText("");
    axios
      .get(proxy.URL + "/instructor/my-courses", {
        headers: {
          id: "", // TODO : Fill empty string with id from token
          country: "", // TODO : Fill empty string with country from token
        },
      })
      .then((response) => {
        if (response.data.length === 0)
          props.setMainText("You don't have any courses yet");
        else props.setMainText("");
        props.setCourses(response.data);
      });
  }, [props]);
  return (
    <div>
      <div>{props.mainText}</div>
      {props.courses.map((course) => (
        <div key={course.id}>
          {course.title +
            " price: " +
            course.price +
            " " +
            CountryToCurrency[
              countries.values.find((e) => e.name === props.country).code
            ]}
        </div>
      ))}
    </div>
  );
}
export default memo(InstructorCoursesContainer);
