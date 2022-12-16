const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Document = mongoose.model("Document", DocumentSchema);

module.exports = Document;
