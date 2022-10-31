import proxy from "../../utils/proxy.json";
import axios from "axios";
import { useUpdateEffect } from "react-use";
import CountryToCurrency from "country-to-currency";
import countries from "../../utils/Countries.json";
function InstructorCoursesContainer(props) {
  useUpdateEffect(() => {
    props.setCourses([]);
    props.setMainText("");
    axios
      .get(proxy.URL + "/instructor/my-courses", {
        headers: {
          id: props.instructorId,
          country: props.country,
          "content-type": "text/json",
        },
      })
      .then((response) => {
        if (response.data.length === 0)
          props.setMainText("You don't have any courses yet");
        else props.setMainText("");
        props.setCourses(response.data);
      });
  }, [props.country]);
  return (
    <div>
      <div>{props.mainText}</div>
      {props.courses.map((course) => (
        <div key={course.title}>
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
export default InstructorCoursesContainer;
