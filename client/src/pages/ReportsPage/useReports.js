import { useState, useEffect } from "react";
import app from "../../utils/AxiosConfig";
function useReportCourse() {
  const [reportsContainer, setReportsContainer] = useState();
  const [reports, setReports] = useState();
  const [type, setType] = useState("unseen");
  console.log(reports);
  useEffect(() => {
    app.get("/admin/reports").then((res) => {
      setReportsContainer(res.data);
      setReports(res.data.filter((r) => r.status === "unseen"));
      console.log(res.data);
    });
  }, []);
  const changeReports = (type) => {
    setType(type);
    setReports(reportsContainer.filter((r) => r.status === type));
  };
  const pend = (report) => {
    app
      .put(
        "/admin/set-problem-status/",
        {
          status: "pending",
        },
        {
          headers: {
            id: report._id,
          },
        }
      )
      .then((res) => {
        setReportsContainer(res.data);
        setReports(res.data.filter((r) => r.status === type));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const resolve = (report) => {
    app
      .put(
        "/admin/set-problem-status/",
        {
          status: "resolved",
        },
        {
          headers: {
            id: report._id,
          },
        }
      )
      .then((res) => {
        setReportsContainer(res.data);
        setReports(res.data.filter((r) => r.status === type));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { reports, type, changeReports, pend, resolve };
}
export default useReportCourse;
