import { memo, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import Typography from "@mui/material/Typography";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Rating } from "@mui/material";
import noCourses from "../../assets/ViewCourses/noCourses.svg";
import MyReportCard from "../../components/MyReportCard/MyReportCard";
import countries from "../../utils/Countries.json";
import EmbeddedReviewPage from "../../components/CourseContainer/EmbeddedReviewPage";
import Button from "react-bootstrap/Button";
import ReviewsPage from "../../components/CourseContainer/ReviewsPage";
import ReviewContainer from "../../components/CourseContainer/ReviewContainer";
import Card from "react-bootstrap/Card";
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./InstructorProfile.css";
import profile from "../../assets/TraineeProfile/profile.png";
import app from "../../utils/AxiosConfig";
import InstructorPersonalInformation from "../InstructorPersonalInformation/InstructorPersonalInformation";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function InstructorProfile() {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [reports, setReports] = useState([]);
  const [show3, setShow3] = useState(false);
  const onClickHide3 = () => {
    setShow3(false);
  };
  const onClickShow3 = () => {
    setShow3(true);
  };
  function getReports() {
    app.get("instructor/view-problems").then((response) => {
      response.data.reverse();
      setReports(response.data);
    });
  }

  useEffect(() => {
    app
      .get("instructor/get-user", {
        headers: {
          type: localStorage.getItem("type"),
          country: localStorage.getItem("country"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        app.get("instructor/my-populated-courses").then((response) => {
          response.data.reverse();

          if (response.data.length > 3) {
            response.data = response.data.slice(0, 3);
          }
        });
      });
  }, []);

  function onClickHide() {
    setShow(false);
  }
  function onClickHide2() {
    setShow2(false);
  }
  return (
    <div className='gradient-custom-2' style={{ backgroundColor: "#FFFFFF" }}>
      <div className='py-5 h-100' style={{}}>
        <MDBRow className='justify-content-center align-items-center h-100'>
          <MDBCol lg='9' xl='7'>
            <MDBCard>
              <div
                className='rounded-top text-white d-flex flex-row'
                style={{ backgroundColor: "#484848", height: "200px" }}
              >
                <div
                  className='ms-4 mt-5 d-flex flex-column profile-picture'
                  style={{ width: "150px" }}
                >
                  <MDBCardImage
                    src={profile}
                    alt='Generic placeholder image'
                    className='mt-4 mb-2 img-thumbnail'
                    fluid
                    style={{ width: "150px", zIndex: "1" }}
                  />
                </div>
                <div className='ms-3' style={{ marginTop: "90px" }}>
                  <MDBTypography
                    tag='h5'
                    style={{ fontSize: "30px", marginBottom: "10px" }}
                  >
                    {user.username}
                  </MDBTypography>
                  <MDBCardText>{localStorage.getItem("country")}</MDBCardText>
                </div>
              </div>
              <div
                className='p-4 text-black'
                style={{ backgroundColor: "#96cea8" }}
              >
                <div
                  style={{ marginLeft: "35px" }}
                  className='d-flex justify-content text-center gap-4 py-1'
                >
                  <div>
                    {" "}
                    <MDBCardText className=' mb-0'>Total Courses</MDBCardText>
                    <MDBCardText className='mb-1 h5'>
                      {user.courses?.length}
                    </MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className='text-black p-4'>
                <InstructorPersonalInformation
                  user={user}
                ></InstructorPersonalInformation>
                <div
                  className='btn btn-outline-success'
                  style={{
                    display: "flex",
                    marginTop: "45px",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                    width: "150px",
                    padding: "0px",
                    height: "40px",
                    fontSize: "15px",
                  }}
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  <p>Change Password</p>
                </div>
                <div
                  className='btn btn-outline-success'
                  style={{
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                    width: "fit-content",
                    padding: "0px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    height: "40px",
                    fontSize: "15px",
                    marginTop: "20px",
                  }}
                  onClick={() => {
                    setShow2(true);
                    getReports();
                  }}
                >
                  <p>My Reports </p>
                </div>{" "}
                <h3 style={{ marginTop: "20px" }}>Money Owed :</h3>{" "}
                <MDBCard
                  className='course-card'
                  style={{
                    display: "inline-block",
                    borderRadius: "20px",
                    width: "180px",
                    padding: "0px",
                    marginTop: "15px",
                    height: "145px",
                  }}
                >
                  <Carousel
                    showThumbs={false}
                    width='180px'
                    autoPlay={false}
                    style={{
                      backgroundColor: "#96cea8",
                      height: "145px",
                    }}
                    showArrows={true}
                    infiniteLoop={true}
                    showStatus={false}
                  >
                    {user.money_owed?.map((money, idx) => (
                      <div style={{ width: "180px" }} key={idx}>
                        {" "}
                        <div
                          style={{
                            marginTop: "10px",
                          }}
                        >
                          Amount :
                          <h6
                            style={{
                              color: money.amount >= 0 ? "green" : "red",
                            }}
                          >
                            {(money.amount > 0
                              ? Math.floor(money.amount + 0.5) - 0.01
                              : money.amount === 0
                              ? 0
                              : Math.floor(money.amount + 0.5) + 0.01) +
                              " " +
                              (" " +
                                (countries[
                                  Object.keys(countries).find(
                                    (e) => e === localStorage.getItem("country")
                                  )
                                ]
                                  ? countries[
                                      Object.keys(countries).find(
                                        (e) =>
                                          e === localStorage.getItem("country")
                                      )
                                    ]
                                  : "USD"))}
                          </h6>
                        </div>
                        <h3>{money.year}</h3>
                        <p>{months[money.month - 1]}</p>
                        <div style={{ height: "30px" }}></div>
                      </div>
                    ))}
                  </Carousel>{" "}
                </MDBCard>
                {user !== {} && (
                  <>
                    <Card className='reviewCard'>
                      <div style={{ display: "flex" }}>
                        <Typography
                          variant='h6'
                          sx={{
                            display: "flex",
                            flexGrow: "1",
                            alignSelf: "flex-start",
                            flexWrap: "wrap",
                            width: "100%",
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                            wordBreak: "break-word",
                            flexDirection: "column",
                          }}
                        >
                          {user.instructorRating === -1 ? (
                            <p>{"Average Rating: No ratings yet"}</p>
                          ) : (
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              Average rating:
                              <Rating
                                name='read-only'
                                value={parseFloat(user.instructorRating || 0)}
                                size='meduim'
                                sx={{
                                  color: "success.main",
                                }}
                                precision={0.1}
                                readOnly
                              />
                              {user.instructorRating}
                            </div>
                          )}
                        </Typography>

                        <Button
                          style={{
                            width: "200px",
                            height: "65px",
                            flexShrink: "0",
                            fontSize: "25px",
                          }}
                          variant='outline-success'
                          onClick={onClickShow3}
                        >
                          View all reviews
                        </Button>
                      </div>
                      <Typography variant='h6'>Reviews: </Typography>

                      <>
                        {user.userReviews?.length <= 2
                          ? user.userReviews.map((userReview, i) => (
                              <div key={i}>
                                <ReviewContainer userReview={userReview} />
                              </div>
                            ))
                          : user.userReviews && (
                              <>
                                <ReviewContainer
                                  userReview={user.userReviews[0]}
                                />
                                <ReviewContainer
                                  userReview={user.userReviews[1]}
                                />
                              </>
                            )}{" "}
                      </>
                    </Card>
                    <Modal
                      size='lg'
                      centered
                      show={show3}
                      onHide={onClickHide3}
                      aria-labelledby='example-modal-sizes-title-lg'
                    >
                      <div className='tos-wrapper'>
                        <div className='tos-border-success'>
                          <Modal.Header closeButton>
                            <Modal.Title>My Reviews</Modal.Title>
                          </Modal.Header>
                          <Modal.Body
                            className='tos'
                            style={{ maxHeight: "700px", overFlowY: "auto" }}
                          >
                            <ReviewsPage item={user} type='instructor' />
                          </Modal.Body>
                        </div>
                      </div>
                    </Modal>
                  </>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
      <Modal
        size='lg'
        centered
        show={show}
        onHide={onClickHide}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <div className='tos-wrapper' style={{ width: "100%" }}>
          <div className='tos-border-success' style={{ width: "100%" }}>
            <Modal.Header closeButton>
              <Modal.Title id='example-modal-sizes-title-lg'>
                Change Password
              </Modal.Title>
            </Modal.Header>

            <Modal.Body
              className='tos'
              style={{
                height: "fit-content",
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <ChangePassword setShow={setShow}></ChangePassword>
            </Modal.Body>
          </div>
        </div>
      </Modal>
      <Modal
        size='lg'
        centered
        show={show2}
        onHide={onClickHide2}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <div className='tos-wrapper' style={{ width: "100%" }}>
          <div className='tos-border-success' style={{ width: "100%" }}>
            <Modal.Header closeButton>
              <Modal.Title id='example-modal-sizes-title-lg'>
                My Reports
              </Modal.Title>
            </Modal.Header>

            <Modal.Body
              className='tos'
              style={{
                height: "fit-content",
                display: "flex",
                padding: "25px",
                flexDirection: "column",
                gap: "25px",
                width: "100%",
              }}
            >
              {reports.length > 0 ? (
                reports.map((report) => (
                  <div key={report._id} style={{ width: "100%" }}>
                    <MyReportCard report={report}></MyReportCard>
                  </div>
                ))
              ) : (
                <div
                  style={{
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
                    alt='noCourses'
                    style={{ width: "200px", height: "200px" }}
                  ></img>
                  <p
                    style={{
                      fontSize: "25px",
                      fontWeight: "700",
                      marginTop: "50px",
                    }}
                  >
                    You have no reported problems.
                  </p>
                </div>
              )}
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default memo(InstructorProfile);
