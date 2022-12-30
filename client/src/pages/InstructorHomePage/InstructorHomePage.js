import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "../../utils/AxiosConfig";
import MyCourseCard from "../../components/ViewMyCourses/MyCourseCard";
import noCourses from "../../assets/ViewCourses/noCourses.svg";
import { TextField, Button } from "@mui/material";
import countries from "../../utils/Countries.json";
import axios from "axios";
import makeAnimated from "react-select/animated";
import { Box, Container } from "@mui/system";
import Card from "react-bootstrap/Card";
import convert from "../../utils/CurrencyConverter";
import CreatableSelect from "react-select/creatable";
import "./InstructorHomePage.css";
import Modal from "react-bootstrap/Modal";

const animatedComponents = makeAnimated();

function InstructorHomePage() {
  const [popularCourses, setPopularCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [subjects, setSubjects] = useState("");
  const [video_preview, setVideo_preview] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  function onClickHide() {
    setShow(false);
    setTitle("");
    setDescription("");
    setAmount("");
    setSubjects("");
    setVideo_preview("");
  }

  const onSubmit = async (obj) => {
    app
      .post("/instructor/create-course", { ...obj })
      .then((response) => {
        navigate("/instructor/my-courses/edit-course", {
          state: { id: response.data._id },
        });
      })
      .catch((err) => {
        alert("A course with this title already exists.");
      });
  };

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
          style={{
            zIndex: "9999",
          }}
        >
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <button
                className="btn btn-outline-success"
                onClick={() => setShow(true)}
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
        <section
          id="popular-courses"
          className="services"
          style={{ marginBottom: "-200px", marginTop: "-70px" }}
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
        <div style={{ height: "220px" }}></div>
      </main>
      <Modal
        size="lg"
        centered
        show={show}
        onHide={onClickHide}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <div className="tos-wrapper" style={{ width: "100%" }}>
          <div className="tos-border-success" style={{ width: "100%" }}>
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Create Course
              </Modal.Title>
            </Modal.Header>

            <Modal.Body
              className="tos"
              style={{
                height: "fit-content",
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Card.Body
                  className="course-details-card-body"
                  style={{ paddingTop: "0px" }}
                >
                  <Container sx={{ display: "grid", placeItems: "center" }}>
                    <form style={{ width: "100%" }}>
                      <Box
                        sx={{
                          marginTop: "15px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "15px",
                          alignItems: "center",
                          width: "100%",
                          "& > *": {
                            width: "100%",
                          },
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                          }}
                        ></div>
                        <TextField
                          hiddenLabel
                          id="filled-hidden-label-small"
                          variant="outlined"
                          label="Course Title"
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />

                        <CreatableSelect
                          isMulti
                          components={animatedComponents}
                          name="colors"
                          className="basic-multi-select"
                          classNamePrefix="select"
                          placeholder="Add Subjects"
                          onChange={(e) => {
                            let subjects = "";
                            for (let i = 0; i < e.length; i++) {
                              if (i === e.length - 1) subjects += e[i].value;
                              else subjects += e[i].value + ",";
                            }
                            setSubjects(subjects);
                          }}
                        />

                        <TextField
                          hiddenLabel
                          id="filled-hidden-label-small"
                          placeholder="Preview Video URL"
                          variant="outlined"
                          label="Course Preview Video"
                          value={video_preview}
                          onChange={(e) => {
                            setVideo_preview(e.target.value);
                          }}
                        />

                        <TextField
                          id="outlined-adornment-amount"
                          value={amount}
                          type="number"
                          placeholder={
                            "Price in " +
                            (countries[
                              Object.keys(countries).find(
                                (e) => e === localStorage.getItem("country")
                              )
                            ]
                              ? countries[
                                  Object.keys(countries).find(
                                    (e) => e === localStorage.getItem("country")
                                  )
                                ]
                              : "USD")
                          }
                          sx={{ borderColor: "green" }}
                          onChange={(e) => {
                            if (e.target.value < 0) {
                              e.target.value = 0;
                            }
                            setAmount(e.target.value);
                          }}
                          label="Course Price"
                        />
                        <TextField
                          id="filled-hidden-label-small"
                          variant="outlined"
                          label="Course Description"
                          value={description}
                          multiline
                          minRows="4"
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />

                        <Button
                          type="submit"
                          variant="contained"
                          style={{
                            backgroundColor: "#96cea8",
                            color: "white",
                            width: "100%",
                          }}
                          onClick={async (e) => {
                            e.preventDefault();
                            if (
                              video_preview?.match(
                                /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
                              )
                            ) {
                              const newPrice = await convert(
                                amount,
                                localStorage.getItem("country"),
                                "United States"
                              );
                              axios
                                .get(
                                  "https://www.youtube.com/oembed?format=json&url=/watch?v=" +
                                    video_preview.substring(
                                      video_preview.lastIndexOf("=") + 1
                                    )
                                )
                                .then(() => {
                                  const obj = {
                                    title,
                                    summary: description,
                                    price: newPrice,
                                    subject: subjects.split(","),
                                    preview_video: video_preview,
                                    rating: 5,
                                    views: 0,
                                  };
                                  onSubmit(obj);
                                })
                                .catch(() => {
                                  alert(
                                    "Please enter a valid youtube video url."
                                  );
                                });
                            } else
                              alert("Please enter a valid youtube video url.");
                          }}
                          disabled={
                            title === "" ||
                            description === "" ||
                            amount === "" ||
                            subjects === "" ||
                            video_preview === ""
                          }
                        >
                          Create Course
                        </Button>
                      </Box>
                    </form>
                  </Container>
                </Card.Body>
              </div>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default memo(InstructorHomePage);
