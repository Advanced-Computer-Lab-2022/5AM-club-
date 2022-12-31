import { memo } from "react";
import AdminPagination from "../../layouts/AdminPagination/AdminPagination";
import useRequests from "./useRequests";
import Card from "react-bootstrap/Card";
import Select from "react-select";
import noCourses from "../../assets/ViewCourses/noCourses.svg";
import "./RequestsPage.css";

function RequestsPage() {
  const { requests, type, changeRequests, accept, reject } = useRequests();

  return (
    <Card
      className="card course-details-border-success"
      style={{
        margin: "250px",
        marginTop: "50px",
        marginBottom: "50px",
        minWidth: "550px",
        minHeight: "700px",
      }}
    >
      <Card.Header style={{ display: "flex" }}>
        <h3>Course Requests</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            flexGrow: "1",
            margin: "5px",
            marginRight: "0px",
          }}
        >
          <Select
            className="basic-single-type"
            classNamePrefix="select"
            onChange={(event) => changeRequests(event.value)}
            isClearable={false}
            isSearchable={false}
            name="color"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "#A6D6B5",
                primary: "#96cea8",
              },
            })}
            options={[
              {
                value: "pending",
                label: "Pending",
              },
              { value: "accepted", label: "Accepted" },
              { value: "rejected", label: "Rejected" },
            ]}
            placeholder="Pending"
          />
        </div>
      </Card.Header>
      <Card.Body
        className="course-details-card-body"
        style={{ minWidth: "400px", display: "flex", flexDirection: "column" }}
      >
        {requests &&
          (requests.length > 0 ? (
            <AdminPagination
              accept={accept}
              reject={reject}
              items={requests}
              itemsPerPage={5}
              type="request"
              requestType={type}
            ></AdminPagination>
          ) : (
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
                marginTop: "120px",
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
                No {type} requests
              </p>
            </div>
          ))}
      </Card.Body>
    </Card>
  );
}
export default memo(RequestsPage);
