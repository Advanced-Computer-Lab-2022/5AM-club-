import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const ProtectedIndividual = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const token = JSON.parse(window.localStorage.getItem("user"))?.accessToken;
    const getUser = async () => {
        try {
            console.log("just before");
            console.log(token);
            const res = await axios.get("http://localhost:4000/decode-token", {
                headers: { authorization: `Bearer ${token}` },
            });
            console.log("just after, user=", res);
            setUser(res.data);
            setLoading(false);

            console.log("before check", user);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };
    useEffect(() => {
        getUser();
    }, []);

    if (loading) return <div>loading...</div>;
    console.log(user);
    if (!(user?.type === "individual")) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
};

export default ProtectedIndividual;
