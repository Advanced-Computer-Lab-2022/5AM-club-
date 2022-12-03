const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
      },
});

const Contract = mongoose.model("Contract", contractSchema);

module.exports = Contract;
  