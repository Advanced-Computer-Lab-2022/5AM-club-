import app from "../../utils/axiosConfig.js";
export const axiosInstance = axios.create({
    baseURL: proxy.URL,
});

axiosInstance.interceptors.response.use(
    function (response) {
        if (response.status === 403) {
            localStorage.removeItem("token");
            localStorage.setItem("country", "United States");
            localStorage.setItem("type", "");
            localStorage.removeItem("id");
            navigate("login");
        }
        return;
    },
    function (error) {
        if (error.response.status === 403) {
            localStorage.removeItem("token");
            localStorage.setItem("country", "United States");
            localStorage.setItem("type", "");
            localStorage.removeItem("id");
            navigate("login");
        }
        return;
    }
);
