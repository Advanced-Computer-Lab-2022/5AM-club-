import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "../../utils/AxiosConfig";
import CourseCard from "../../components/ViewCourses/CourseCard";
import "./TraineeHomePage.css";

function TraineeHomePage() {
  const navigate = useNavigate();
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    app
      .get("/trainee/populated-courses")
      .then((res) => {
        res.data.sort((a, b) => b.owners.length - a.owners.length);
        res.data = res.data.slice(0, 4);
        setPopularCourses(res.data);
        if (localStorage.getItem("refresh")) {
          localStorage.removeItem("refresh");
          navigate(0);
        }
      })
      .catch((err) => {});
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <main id="main">
        <section id="why-us" className="why-us section-bg">
          <div className="container-fluid" data-aos="fade-up">
            <div className="row">
              <div className="col-lg-7 d-flex flex-column justify-content-center align-items-stretch order-2 order-lg-1">
                <div className="content">
                  <h3 style={{ color: "#484848" }}>
                    Browse our courses and get access to all the learning
                    material you'll need.
                  </h3>
                </div>
                <div className="accordion-list">
                  <ul>
                    <hr></hr>
                    <li>
                      {" "}
                      {/*eslint-disable-next-line*/}
                      <a
                        data-bs-toggle="collapse"
                        className="collapse"
                        data-bs-target="#accordion-list-1"
                        style={{ color: "#96cea8", fontWeight: "700" }}
                      >
                        <span style={{ color: "#96Bea8" }}>1</span> Search for a
                        course
                        <i className="bx bx-chevron-down icon-show"></i>
                        <i className="bx bx-chevron-up icon-close"></i>
                      </a>
                      <div
                        id="accordion-list-1"
                        className="collapse show"
                        data-bs-parent=".accordion-list"
                      >
                        <p>Use the search bar above to browse our courses</p>
                      </div>
                    </li>
                    <hr></hr>
                    <li>
                      {" "}
                      {/*eslint-disable-next-line*/}
                      <a
                        data-bs-toggle="collapse"
                        data-bs-target="#accordion-list-2"
                        className="collapsed"
                        style={{ color: "#96cea8", fontWeight: "700" }}
                      >
                        <span style={{ color: "#96bea8" }}>2</span> Buy a course{" "}
                        <i className="bx bx-chevron-down icon-show"></i>
                        <i className="bx bx-chevron-up icon-close"></i>
                      </a>
                      <div
                        id="accordion-list-2"
                        className="collapse"
                        data-bs-parent=".accordion-list"
                      >
                        <p>
                          {" "}
                          Choose a course that suits your needs and interests
                          then proceed to purchasing using your credit card.
                        </p>
                      </div>
                    </li>
                    <hr></hr>
                    <li>
                      {" "}
                      {/*eslint-disable-next-line*/}
                      <a
                        data-bs-toggle="collapse"
                        data-bs-target="#accordion-list-3"
                        className="collapsed"
                        style={{ color: "#96cea8", fontWeight: "700" }}
                      >
                        <span style={{ color: "#96Bea8" }}>3</span> Take your
                        course <i className="bx bx-chevron-down icon-show"></i>
                        <i className="bx bx-chevron-up icon-close"></i>
                      </a>
                      <div
                        id="accordion-list-3"
                        className="collapse"
                        data-bs-parent=".accordion-list"
                      >
                        <p>
                          You can view your course at anytime. You can refund
                          your course if you viewed less than 50% of it's
                          content. Along with the content, there are a bunch of
                          helpful features that are sure to enhance your
                          learning experience. Happy Learning!{" "}
                        </p>
                      </div>
                    </li>
                    <hr></hr>
                  </ul>
                </div>
              </div>
              <div
                className="col-lg-5 align-items-stretch order-1 order-lg-2 img hover-grow"
                style={{
                  backgroundImage: 'url("assets/img/why-us.png")',
                  width: "550px",
                  marginLeft: "40px",
                }}
                data-aos="zoom-in"
                data-aos-delay="150"
              ></div>
            </div>
          </div>
        </section>
        <section id="popular-courses" className="services">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2
                style={{ color: "#96cea8", cursor: "pointer" }}
                onClick={() => {
                  navigate("courses");
                }}
              >
                Popular Courses
              </h2>
              <p>Check out our most popular courses.</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                minWidth: "100%",
              }}
            >
              {popularCourses.map((course) => (
                <div key={course._id}>
                  <CourseCard course={course}></CourseCard>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default memo(TraineeHomePage);
