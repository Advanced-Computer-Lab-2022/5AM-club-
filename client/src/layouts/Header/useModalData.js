import { useState, useEffect } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import app from "../../utils/AxiosConfig";

const useModalData = () => {
=======
import { useLocation, useNavigate } from "react-router-dom";
import app from "../../utils/AxiosConfig";

const useModalData = () => {
  const location = useLocation();
>>>>>>> 78a3be8 (complete profile modals done)
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("type") === "corporate") {
      app
        .get("/trainee/complete-profile")
        .then((res) => {
<<<<<<< HEAD
          console.log(res);

          if (res.data === "false") {
=======
          if (res.data == "false") {
>>>>>>> 78a3be8 (complete profile modals done)
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
<<<<<<< HEAD
          console.log(res);
          if (res.data === "false") {
=======
          if (res.data == "false") {
>>>>>>> 78a3be8 (complete profile modals done)
            setShow(true);
            if (window.location.pathname !== "/instructor")
              navigate("../instructor");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
<<<<<<< HEAD
    // eslint-disable-next-line react-hooks/exhaustive-deps
=======
>>>>>>> 78a3be8 (complete profile modals done)
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

<<<<<<< HEAD
  const unDone = () => {
    setDone(false);
  };

=======
>>>>>>> 78a3be8 (complete profile modals done)
  return {
    show,
    onClickShow,
    onClickHide,
    done,
    Done,
<<<<<<< HEAD
    unDone,
=======
>>>>>>> 78a3be8 (complete profile modals done)
  };
};

export default useModalData;
