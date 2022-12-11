const updateToken = (res) => {
    if (!res.data.token) return;
    window.localStorage.setItem("accessToken", JSON.stringify(res.token));
};

export default updateToken;
