import axios from "axios";
import { UNSAFE_NavigationContext } from "react-router-dom";
import proxy from "./proxy.json";
const baseURL = proxy.URL;
const app = axios.create({
    baseURL,
    withCredentials: true,
});
app.interceptors.response.use(
    function (response) {
        console.log(response.status === 401);
        if (response.status === 401) {
            localStorage.clear();
            localStorage.setItem("country", "United States");
        }
        return response;
    },
    function (error) {
        console.log(error.response.status === 401);
        if (error.response.status === 401) {
            localStorage.clear();
            localStorage.setItem("country", "United States");
            window.location.href = "http://localhost:3000";
        }
        return error;
    }
);

export default app;
