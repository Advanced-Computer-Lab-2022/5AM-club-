import axios from "axios";
import "./ViewCourses.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, memo } from "react";
import GeneralFiltersContainer from "../../components/GeneralFiltersContainer/GeneralFiltersContainer";
import countries from "../../utils/Countries.json";
import proxy from "../../utils/proxy.json";
import formatTime from "../../utils/Helpers";
function ViewCourses() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mainText, setMainText] = useState("Loading Courses...");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses([]);
    axios
      .get(proxy.URL + "/courses", {
        headers: {
          country: localStorage.getItem("country"),
        },
        params: { searchItem: location.state?.searchItem },
      })
      .then((response) => {
        if (response.data.length === 0)
          setMainText("No courses are available yet");
        else setMainText("");

        setCourses(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <GeneralFiltersContainer
        setCourses={setCourses}
        setMainText={setMainText}
      ></GeneralFiltersContainer>
      <div>
        View Courses: <br />
        {courses.map((c) => (
          <div className='course-item' key={c.title}>
            <div>
              {c.title +
                (localStorage.getItem("type") !== "corporate"
                  ? " price: " +
                    c.price +
                    " totalhours: " +
                    formatTime(c.minutes) +
                    " " +
                    countries[
                      Object.keys(countries).find(
                        (e) => e === localStorage.getItem("country")
                      )
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
