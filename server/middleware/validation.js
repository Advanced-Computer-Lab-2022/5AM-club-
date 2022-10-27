function checkID(req, res, next) {
  if (req.headers.id === undefined) {
    console.log(req.headers);
    res.status(400).send("No ID was given");
    return;
  }
  if (!req.headers.id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).send("Invalid ID");
    return;
  } else next();
}
module.exports = { checkID: checkID };
