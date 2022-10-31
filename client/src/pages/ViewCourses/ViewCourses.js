import axios from "axios";
import "./ViewCourses.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUpdateEffect } from "react-use";
import GeneralFiltersContainer from "../../components/GeneralFiltersContainer/GeneralFiltersContainer";
import proxy from "../../utils/proxy.json";
import CountryToCurrency from "country-to-currency";
import countries from "../../utils/Countries.json";
function ViewCourses() {
  const [mainText, setMainText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [country, setCountry] = useState("");
  useEffect(() => {
    if (
      location.pathname.includes("trainee") ||
      location.pathname.includes("instructor") ||
      location.pathname.includes("admin")
    ) {
      axios
        .get(proxy.URL + "/get-user", {
          headers: location.pathname.includes("individual-trainee")
            ? { id: "635e992a99ecb836d834f7fd", type: "trainee" }
            : location.pathname.includes("corporate-trainee")
            ? { id: "635f05a51832d2cde2c26d88", type: "trainee" }
            : location.pathname.includes("instructor")
            ? { id: "6355091ab4c387ca835c6bfc", type: "instructor" }
            : { id: "635e98ca99ecb836d834f7fc", type: "admin" },
        })
        .then((response) => {
          setCountry(response.data.country);
        })
        .catch(() => {
          setCountry("United States");
        });
    } else {
      setCountry(localStorage.getItem("country"));
    }
  }, []);
  useUpdateEffect(() => {
    console.log(country);
    if (!location.state?.searchItem) {
      setCourses([]);
      axios
        .get("http://localhost:4000/courses", {
          headers: { country: country },
        })
        .then((response) => {
          setCourses(response.data);
        });
    }
  }, [country]);
  return (
    <>
      <GeneralFiltersContainer
        setCourses={setCourses}
        setMainText={setMainText}
        country={country}
      ></GeneralFiltersContainer>
      <div>
        View Courses: <br />
        {courses.map((c) => (
          <div className="course-item" key={c.title}>
            <div>
              {c.title +
                (!location.pathname.includes("corporate-trainee")
                  ? " price: " +
                    c.price +
                    " " +
                    CountryToCurrency[
                      countries.values.find((e) => e.name === country).code
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

export default ViewCourses;
