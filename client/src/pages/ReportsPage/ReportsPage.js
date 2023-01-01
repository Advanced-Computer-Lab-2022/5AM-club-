import { memo } from "react";
import AdminPagination from "../../layouts/AdminPagination/AdminPagination";
import useReports from "./useReports";
import Card from "react-bootstrap/Card";
import Select from "react-select";
import noCourses from "../../assets/ViewCourses/noCourses.svg";
import "./ReportsPage.css";

function ReportsPage() {
  const { reports, type, changeReports, pend, resolve } = useReports();

  return (
    <Card
      className='card course-details-border-success'
      style={{
        margin: "250px",
        marginTop: "50px",
        marginBottom: "50px",
        minWidth: "550px",
        minHeight: "675px",
      }}
    >
      <Card.Header style={{ display: "flex" }}>
        <h3>User Reports</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            flexGrow: "1",
            margin: "5px",
            marginRight: "0px",
          }}
        >
          <div>
            <Select
              className='basic-single-type'
              classNamePrefix='select'
              onChange={(event) => changeReports(event.value)}
              isClearable={false}
              isSearchable={false}
              name='color'
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
                  value: "unseen",
                  label: "Unseen",
                },
                { value: "pending", label: "Pending" },
                { value: "resolved", label: "Resolved" },
              ]}
              styles={{
                control: (base) => ({
                  ...base,
                  border: "1px solid #96cea8",
                  boxShadow: "none",
                }),
                option: (
                  styles,
                  { data, isDisabled, isFocused, isSelected }
                ) => {
                  return {
                    ...styles,
                    backgroundColor: isDisabled
                      ? null
                      : isSelected
                      ? "#96cea8"
                      : isFocused
                      ? "#A6D6B5"
                      : null,
                    color: isDisabled
                      ? "#ccc"
                      : isSelected
                      ? "white"
                      : isFocused
                      ? "black"
                      : "black",
                    cursor: isDisabled ? "not-allowed" : "default",
                  };
                },
              }}
              placeholder='Unseen'
            />
          </div>
        </div>
      </Card.Header>
      <Card.Body
        className='course-details-card-body'
        style={{ minWidth: "400px", display: "flex", flexDirection: "column" }}
      >
        {reports &&
          (reports.length > 0 ? (
            <AdminPagination
              accept={pend}
              reject={resolve}
              items={reports}
              itemsPerPage={5}
              type='report'
              requestType={type}
            ></AdminPagination>
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
                No {type} reports
              </p>
            </div>
          ))}
      </Card.Body>
    </Card>
  );
}
export default memo(ReportsPage);
