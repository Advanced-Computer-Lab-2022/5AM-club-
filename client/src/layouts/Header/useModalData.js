import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import app from "../../utils/AxiosConfig";

const useModalData = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("type") === "corporate") {
      app
        .get("/trainee/complete-profile")
        .then((res) => {
          if (res.data === "false") {
            localStorage.removeItem("refresh");
            setShow(true);
            if (window.location.pathname !== "/corporate-trainee")
              navigate("../corporate-trainee");
          }
        })
        .catch((err) => {});
    } else if (localStorage.getItem("type") === "instructor") {
      app
        .get("/instructor/complete-profile")
        .then((res) => {
          if (res.data === "false") {
            localStorage.removeItem("refresh");
            setShow(true);
            if (window.location.pathname !== "/instructor")
              navigate("../instructor");
          }
        })
        .catch((err) => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("type")]);

  const onClickShow = () => {
    setShow(true);
  };
  const onClickHide = () => {
    setShow(false);
  };
  const Done = () => {
    setDone(true);
  };

  const unDone = () => {
    setDone(false);
  };

  return {
    show,
    onClickShow,
    onClickHide,
    done,
    Done,
    unDone,
  };
};

export default useModalData;
