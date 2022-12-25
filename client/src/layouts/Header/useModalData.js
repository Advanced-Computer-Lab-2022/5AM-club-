import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import app from "../../utils/AxiosConfig";

const useModalData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("type") === "corporate") {
      app
        .get("/trainee/complete-profile")
        .then((res) => {
          if (res.data == "false") {
            setShow(true);
            if (window.location.pathname !== "/corporate-trainee")
              navigate("../corporate-trainee");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (localStorage.getItem("type") === "instructor") {
      app
        .get("/instructor/complete-profile")
        .then((res) => {
          if (res.data == "false") {
            setShow(true);
            if (window.location.pathname !== "/instructor")
              navigate("../instructor");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  return {
    show,
    onClickShow,
    onClickHide,
    done,
    Done,
  };
};

export default useModalData;
