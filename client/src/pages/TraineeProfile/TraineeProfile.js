import { memo, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import MyCourseCard from "../../components/ViewMyCourses/MyCourseCard";
import countries from "../../utils/Countries.json";

import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import "./TraineeProfile.css";
import profile from "../../assets/TraineeProfile/profile.png";
import app from "../../utils/AxiosConfig";

function TraineeProfile() {
  const [user, setUser] = useState({});
  const [courses, setCourses] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    app
      .get("trainee/get-user", {
        headers: {
          type: localStorage.getItem("type"),
        },
      })
      .then((response) => {
        setUser(response.data);
        app.get("trainee/my-populated-courses").then((response) => {
          response.data.reverse();

          if (response.data.length > 3) {
            response.data = response.data.slice(0, 3);
          }
          console.log(response.data);
          setCourses(response.data);
        });
      });
  }, []);

  function onClickHide() {
    setShow(false);
  }
  return (
    <div className="gradient-custom-2" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="py-5 h-100" style={{}}>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: "#484848", height: "200px" }}
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column profile-picture"
                  style={{ width: "150px" }}
                >
                  <MDBCardImage
                    src={profile}
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{ width: "150px", zIndex: "1" }}
                  />
                </div>
                <div className="ms-3" style={{ marginTop: "90px" }}>
                  <MDBTypography
                    tag="h5"
                    style={{ fontSize: "30px", marginBottom: "10px" }}
                  >
                    {user.username}
                  </MDBTypography>
                  <MDBCardText>{localStorage.getItem("country")}</MDBCardText>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#96cea8" }}
              >
                <div className="d-flex justify-content text-center gap-4 py-1">
                  <div>
                    {" "}
                    <MDBCardText className=" mb-0">Owned Courses</MDBCardText>
                    <MDBCardText className="mb-1 h5">
                      {user.courses?.length}
                    </MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className=" mb-0">Gender</MDBCardText>
                    <MDBCardText className="mb-1 h5">{user.gender}</MDBCardText>
                  </div>
                  <div></div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <div
                    className="p-4"
                    style={{
                      backgroundColor: "#96cea8",
                      borderRadius: "5px",
                      fontSize: "25px",
                    }}
                  >
                    <MDBCardText className="font-italic mb-1">
                      First Name : {user.firstName}
                    </MDBCardText>
                    <MDBCardText className="font-italic mb-1">
                      Last Name : {user.lastName}
                    </MDBCardText>
                    <MDBCardText className="font-italic mb-1">
                      Email : {user.email}
                    </MDBCardText>
                    <MDBCardText className="font-italic mb-1">
                      {"Wallet : " +
                        (user.walletMoney !== 0
                          ? Math.floor(user.walletMoney + 0.5) - 0.01
                          : 0) +
                        " " +
                        (" " +
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
                            : "USD"))}
                    </MDBCardText>
                  </div>
                </div>
                <div
                  className="btn btn-outline-success"
                  style={{
                    display: "flex",
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
                {courses.length > 0 && (
                  <>
                    <p
                      style={{
                        fontSize: "30px",
                        fontWeight: "700",
                        color: "#484848",
                        marginTop: "20px",
                      }}
                    >
                      Recently Bought Courses:
                    </p>
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        marginBottom: "20px",
                        gap: "25px",
                      }}
                    >
                      {courses.map((course) => (
                        <div key={course._id} onClick={() => {}}>
                          <MyCourseCard course={course}></MyCourseCard>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
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
                Change Password
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
              <ChangePassword setShow={setShow}></ChangePassword>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default memo(TraineeProfile);
