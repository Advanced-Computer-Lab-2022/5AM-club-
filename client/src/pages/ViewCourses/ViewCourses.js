import axios from "axios";
import "./ViewCourses.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, memo } from "react";
import GeneralFiltersContainer from "../../components/GeneralFiltersContainer/GeneralFiltersContainer";
import CountryToCurrency from "country-to-currency";
import countries from "../../utils/Countries.json";
function ViewCourses() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mainText, setMainText] = useState("");
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    setCourses([]);
    axios
      .get("http://localhost:4000/courses", {
        headers: {
          country: "", // TODO: Replace empty string with country from token
        },
        params: { searchItem: location.state?.searchItem },
      })
      .then((response) => {
        setCourses(response.data);
      });
  }, [location.state?.searchItem]);
  return (
    <>
      <GeneralFiltersContainer
        setCourses={setCourses}
        setMainText={setMainText}
      ></GeneralFiltersContainer>
      <div>
        View Courses: <br />
        {courses.map((c) => (
          <div className="course-item" key={c.title}>
            <div>
              {c.title +
                (!"" // TODO: Check if not corporate
                  ? " price: " +
                    c.price +
                    " " +
                    CountryToCurrency[
                      countries.values.find(
                        (e) =>
                          e.name ===
                          "" /* Replace empty string with country from token, or localstorage*/
                      ).code
                    ]
                  : "") +
                " rating:" +
                c.rating}
            </div>
            <button
              onClick={() => {
                navigate("view-course", { state: { id: c._id } });
              }}
            >
              {" "}
              Show details
            </button>
          </div>
        ))}
      </div>
      <p>{mainText} </p>
    </>
  );
}

export default memo(ViewCourses);
