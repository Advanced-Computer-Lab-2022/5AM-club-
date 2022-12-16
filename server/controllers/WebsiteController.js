const Document = require("../models/Document");

getContract = async (req, res) => {
  try {
    const contract = await Document.findOne({ type: "contract" });
    console.log(contract);
    res.send(contract);
  } catch (err) {
    res.status(500);
  }
};
getTOS = async (req, res) => {
  try {
    const tos = await Document.findOne({ type: "tos" });
    res.send(tos);
  } catch (err) {
    res.status(500);
  }
};

module.exports = {
  getContract,
  getTOS,
};
