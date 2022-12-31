import { useState } from "react";
import app from "../../utils/AxiosConfig.js";

const useModalData = () => {
  const [show, setShow] = useState(false);
  const [content, SetContent] = useState("");

  app.get("/terms-of-service").then((res) => {
    SetContent(res.data.content);
  });

  const onClickShow = () => {
    setShow(true);
  };
  const onClickHide = () => {
    setShow(false);
  };
  return { show, onClickShow, onClickHide, content };
};

export default useModalData;
