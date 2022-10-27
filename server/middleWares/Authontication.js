const jwt = require("jsonwebtoken");

module.exports = () => {
  return (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).send("Access denied!!");
    }
  };
};
