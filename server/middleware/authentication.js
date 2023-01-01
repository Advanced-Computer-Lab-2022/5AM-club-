const jwt = require("jsonwebtoken");
const { login } = require("../controllers/UserDataController");
const authenticateToken = (req, res, next) => {
  if (req.cookies?.jwt && req.cookies?.accessToken) {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.jwt;
    let validAccess = false,
      validRefresh = false;
    let data;
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        // Wrong or expired access token
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        validAccess = true;
        data = decoded;
      }
    });
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
        }
      }
    );

    if (validAccess && validRefresh) {
      req.user = data;
      const now = Math.floor(new Date().getTime() / 1000);
      const newAccessToken = jwt.sign(
        { ...data, exp: now + 60 * 30 * 4 },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.cookie("accessToken", `${newAccessToken}`);
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
