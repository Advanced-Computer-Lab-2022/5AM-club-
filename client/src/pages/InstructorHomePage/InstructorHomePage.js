import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "../../utils/AxiosConfig";
import MyCourseCard from "../../components/ViewMyCourses/MyCourseCard";
import noCourses from "../../assets/ViewCourses/noCourses.svg";

function InstructorHomePage() {
  const navigate = useNavigate();
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    app
      .get("/instructor/my-populated-courses", {
        headers: { type: "instructor" },
      })
      .then((res) => {
        res.data.sort((a, b) => b.owners.length - a.owners.length);
        res.data = res.data.slice(0, 4);
        setPopularCourses(res.data);
        if (localStorage.getItem("refresh")) {
          console.log("asdbjkn");
          localStorage.removeItem("refresh");
          navigate(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
                    Create courses for a global audience and get paid for your
                    work.
                  </h3>
                </div>
                <div className="accordion-list">
                  <ul>
                    <li>
                      {/*eslint-disable-next-line*/}
                      <a
                        data-bs-toggle="collapse"
                        className="collapse"
                        data-bs-target="#accordion-list-1"
                        style={{ color: "#96cea8" }}
                      >
                        <span style={{ color: "#96Bea8" }}>01</span> Create a
                        course
                        <i className="bx bx-chevron-down icon-show"></i>
                        <i className="bx bx-chevron-up icon-close"></i>
                      </a>
                      <div
                        id="accordion-list-1"
                        className="collapse show"
                        data-bs-parent=".accordion-list"
                      >
                        <p>
                          Create a course by clicking down below. You can use
                          the search bar above to take a look at some of our
                          courses to get an idea on how to structure your
                          content.
                        </p>
                      </div>
                    </li>
                    <li>
                      {" "}
                      {/*eslint-disable-next-line*/}
                      <a
                        data-bs-toggle="collapse"
                        data-bs-target="#accordion-list-2"
                        className="collapsed"
                        style={{ color: "#96cea8" }}
                      >
                        <span style={{ color: "#96bea8" }}>02</span> Publish
                        your course{" "}
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
                          Once you're done creating and editing your course, you
                          can publish it for all the students on our platform to
                          view and purchase.{" "}
                        </p>
                      </div>
                    </li>
                    <li>
                      {" "}
                      {/*eslint-disable-next-line*/}
                      <a
                        data-bs-toggle="collapse"
                        data-bs-target="#accordion-list-3"
                        className="collapsed"
                        style={{ color: "#96cea8" }}
                      >
                        <span style={{ color: "#96Bea8" }}>03</span> Get paid{" "}
                        <i className="bx bx-chevron-down icon-show"></i>
                        <i className="bx bx-chevron-up icon-close"></i>
                      </a>
                      <div
                        id="accordion-list-3"
                        className="collapse"
                        data-bs-parent=".accordion-list"
                      >
                        <p>
                          That's it! You've successfully created a course and
                          for each student that purchases your course, you'll
                          get paid for the percentage agreed upon in the
                          contract.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="col-lg-5 align-items-stretch order-1 order-lg-2 img"
                style={{ backgroundImage: 'url("assets/img/why-us2.png")' }}
                data-aos="zoom-in"
                data-aos-delay="150"
              >
                {" "}
              </div>
            </div>
          </div>
        </section>
        <section
          id="popular-courses"
          className="services"
          style={{ marginBottom: "-200px" }}
        >
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2 style={{ color: "#96cea8" }}>Popular Courses</h2>
              <p>These are your most popular courses.</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                minWidth: "100%",
              }}
            >
              {popularCourses.length > 0 ? (
                <>
                  {popularCourses.map((course) => (
                    <div key={course._id}>
                      <MyCourseCard course={course}></MyCourseCard>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <>
                    <div
                      style={{
                        marginBottom: "200px",
                        width: "100%",
                        height: "100%",
                        flexGrow: "1",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={noCourses}
                        alt="noCourses"
                        style={{ width: "200px", height: "200px" }}
                      ></img>
                      <p
                        style={{
                          fontSize: "25px",
                          fontWeight: "700",
                          marginTop: "50px",
                        }}
                      >
                        You have no courses yet. Click the button below to get
                        started on creating your first course.
                      </p>
                    </div>
                  </>
                </>
              )}
            </div>
          </div>
        </section>
        <section>
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <button
                className="btn btn-outline-success"
                onClick={() => navigate("create-course")}
                style={{
                  cursor: "pointer",
                  width: "800px",
                  height: "100px",
                  marginTop: "-50px",
                  fontSize: "50px",
                }}
              >
                Create Course{" "}
              </button>
            </div>
          </div>{" "}
        </section>
      </main>
    </div>
  );
}

export default memo(InstructorHomePage);
