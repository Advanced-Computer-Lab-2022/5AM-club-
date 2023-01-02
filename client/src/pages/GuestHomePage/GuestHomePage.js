import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "../../utils/AxiosConfig";
import CourseCard from "../../components/ViewCourses/CourseCard";
import "./GuestHomePage.css";
function GuestHomePage() {
  const navigate = useNavigate();
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    app
      .get("/populated-courses")
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
      <section
        id="hero"
        className="d-flex align-items-center"
        style={{ backgroundColor: "#484848" }}
      >
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h1>
                An online learning platform available for anyone, anytime,
                anywhere
              </h1>
              <h2>
                We are hosting an online platform with many courses in diverse
                subjects. You are sure to find something beneficial.
              </h2>
              <div className="d-flex justify-content-center justify-content-lg-start">
                {" "}
                <button
                  className="btn-get-started"
                  style={{ backgroundColor: "#96cea8" }}
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Get Started
                </button>{" "}
              </div>
            </div>
            <div
              className="col-lg-6 order-1 order-lg-2 hero-img hover-grow"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              {/*Floating Graphic*/}

              <img
                src="assets/img/hero-img.png"
                className="img-fluid animated"
                alt=""
                style={{
                  marginBottom: "80px",
                  width: "500px",
                  height: "500px",
                  marginLeft: "170px",
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <main id="main">
        <section id="clients" className="clients section-bg">
          <div className="container"></div>
        </section>

        <section id="services" className="services section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2 style={{ color: "#96cea8" }}>Services</h2>
              <p>
                Join our platform and get access to all the learning material
                you'll need.{" "}
              </p>
            </div>
            <div className="row">
              <div
                className="col-xl-3 col-md-6 d-flex align-items-stretch grow-hover"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                {" "}
                <div className="icon-box green-grow-hover">
                  <div
                    className="icon"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(94%) sepia(3%) saturate(4000%) hue-rotate(76deg) brightness(86%) contrast(85%)",
                    }}
                  >
                    <i className="bx bxl-dribbble"></i>
                  </div>
                  <h4>Our Platform is Global</h4>
                  <p>
                    Our platform supports multiple countries allowing you to buy
                    courses with your local currency.
                  </p>
                </div>
              </div>
              <div
                className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 grow-hover"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="icon-box green-grow-hover">
                  <div
                    className="icon"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(94%) sepia(3%) saturate(4000%) hue-rotate(76deg) brightness(86%) contrast(85%)",
                    }}
                  >
                    <i className="bx bx-file"></i>
                  </div>
                  <h4>Learning Features</h4>
                  <p>
                    Our strong platform allows for useful features such as note
                    taking and progress tracking to aid you in learning.
                  </p>
                </div>
              </div>

              <div
                className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0 grow-hover"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <div className="icon-box green-grow-hover">
                  <div
                    className="icon"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(94%) sepia(3%) saturate(4000%) hue-rotate(76deg) brightness(86%) contrast(85%)",
                    }}
                  >
                    <i className="bx bx-layer"></i>
                  </div>
                  <h4>Diversity</h4>
                  <p>
                    Our platform has a wide variety of courses to choose from
                    across multiple instuctors and subjects.
                  </p>
                </div>
              </div>
              <div
                className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0 grow-hover"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <div className="icon-box green-grow-hover">
                  <div
                    className="icon"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(94%) sepia(3%) saturate(4000%) hue-rotate(76deg) brightness(86%) contrast(85%)",
                    }}
                  >
                    <i className="bx bx-tachometer"></i>
                  </div>
                  <h4>Usability</h4>
                  <p>
                    Our engineers are constantly working behind the scenes to
                    improve your learning experience.{" "}
                  </p>
                </div>
              </div>
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
        <section id="team" className="team section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2 style={{ color: "#96cea8" }}>Team</h2>
              <p>This is our development team. </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <div
                className="member d-flex align-items-start green-grow-hover grow-hover"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className="pic">
                  <img
                    style={{ height: "185px", width: "185px" }}
                    src="assets/img/team/team-5.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="member-info">
                  <h4>Abdelraheman Khaled Ali</h4>
                  <span>Scrum Master</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div
                  className="member d-flex align-items-start green-grow-hover grow-hover"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                >
                  <div className="pic">
                    <img
                      style={{
                        height: "185px",
                        width: "185px",
                        objectFit: "fill",
                      }}
                      src="assets/img/team/team-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="member-info">
                    <h4>Amr Mohamed Abdelmonem</h4>
                    <span>Developer</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mt-4 mt-lg-0">
                <div
                  className="member d-flex align-items-start green-grow-hover grow-hover"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  <div className="pic">
                    <img
                      style={{ height: "185px", width: "185px" }}
                      src="assets/img/team/team-2.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="member-info">
                    <h4>Amr Esmaeel El-Said</h4>
                    <span>Developer</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mt-4">
                <div
                  className="member d-flex align-items-start green-grow-hover grow-hover"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                >
                  <div className="pic">
                    <img
                      style={{ height: "185px", width: "185px" }}
                      src="assets/img/team/team-3.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="member-info">
                    <h4>Mahmoud Bakheet Kased</h4>
                    <span>Developer</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mt-4">
                <div
                  className="member d-flex align-items-start green-grow-hover grow-hover"
                  data-aos="zoom-in"
                  data-aos-delay="400"
                >
                  <div className="pic">
                    <img
                      style={{ height: "185px", width: "185px" }}
                      src="assets/img/team/team-4.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="member-info">
                    <h4>Mahmoud Khaled</h4>
                    <span>Developer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default memo(GuestHomePage);
