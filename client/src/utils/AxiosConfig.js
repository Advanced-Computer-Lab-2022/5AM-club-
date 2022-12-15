import axios from "axios";
import proxy from "./Proxy.json";
const baseURL = proxy.URL;
const app = axios.create({
  baseURL,
  withCredentials: true,
});
app.interceptors.response.use(
  function (response) {
    console.log(response);
    console.log(response.status === 401);
    if (response.status === 401) {
      localStorage.clear();
      localStorage.setItem("country", "United States");
    }
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response?.status === 401) {
      localStorage.clear();
      localStorage.setItem("country", "United States");
      if (window.location.href !== "http://localhost:3000/login")
        window.location.href = "http://localhost:3000";
    }
    return Promise.reject(error);
  }
);

export default app;
