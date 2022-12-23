const jwt = require("jsonwebtoken");
const { login } = require("../controllers/UserDataController");
const authenticateToken = (req, res, next) => {
    if (req.cookies?.jwt && req.cookies?.accessToken) {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.jwt;
        let validAccess = false,
            validRefresh = false;
        let data;
        jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    // Wrong or expired access token
                    return res.status(401).json({ message: "Unauthorized" });
                } else {
                    validAccess = true;
                    data = decoded;
                }
            }
        );
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    // Wrong or expired refresh token
                    return res
                        .status(401)
                        .json({ message: "Unauthorized,expired refresh" });
                } else {
                    validRefresh = true;
                    console.log("ok refresh");
                }
            }
        );
        console.log("from auth token after verfy", validAccess, validRefresh);

        if (validAccess && validRefresh) {
            console.log("from auth token in if2");
            req.user = data;
            const now = Math.floor(new Date().getTime() / 1000);
            console.log(now);
            const newAccessToken = jwt.sign(
                { ...data, exp: now + 60 * 10 },
                process.env.ACCESS_TOKEN_SECRET
            );

            console.log("from auth token", data, newAccessToken);
            res.cookie("accessToken", `${newAccessToken}`);
            console.log("bnew cookieee", req.cookies.accessToken);
            return next();
        } else {
            return res
                .status(401)
                .json({ message: "Unauthorized, some cookies are expired" });
        }
    } else {
        return res
            .status(401)
            .json({ message: "Unauthorized, some cookies are missing" });
    }
};
module.exports = authenticateToken;
