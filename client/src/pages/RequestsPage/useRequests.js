import { useState, useEffect } from "react";
import app from "../../utils/AxiosConfig";
function useRequestCourse() {
  const [requestsContainer, setRequestsContainer] = useState();
  const [requests, setRequests] = useState();
  const [type, setType] = useState("pending");
  useEffect(() => {
    app.get("/admin/course-requests").then((res) => {
      setRequestsContainer(res.data);
      setRequests(res.data.pending);
      console.log(res.data);
    });
  }, []);
  const changeRequests = (type) => {
    setType(type);
    if (type === "pending") setRequests(requestsContainer.pending);
    else if (type === "accepted") setRequests(requestsContainer.accepted);
    else if (type === "rejected") setRequests(requestsContainer.rejected);
  };
  const accept = (request) => {
    app
      .put("/admin/courses/" + request.courseId + "/accept-course-request", {
        traineeId: request.traineeId,
      })
      .then((res) => {
        const newRequestsContainer = { ...requestsContainer };
        newRequestsContainer.pending.splice(
          newRequestsContainer.pending.indexOf(request),
          1
        );
        newRequestsContainer.accepted.push(request);
        setRequestsContainer(newRequestsContainer);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const reject = (request) => {
    app
      .put("/admin/courses/" + request.courseId + "/reject-course-request", {
        traineeId: request.traineeId,
      })
      .then((res) => {
        const newRequestsContainer = { ...requestsContainer };
        newRequestsContainer.pending.splice(
          newRequestsContainer.pending.indexOf(request),
          1
        );
        newRequestsContainer.rejected.push(request);
        setRequestsContainer(newRequestsContainer);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { requests, type, changeRequests, accept, reject };
}
export default useRequestCourse;
