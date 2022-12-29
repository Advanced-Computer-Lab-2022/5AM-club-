const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  problemType: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true
  },
  status:{ 
    type: String,
    default: "unseen",
    required: true    
},
comments:{
    type:[String],
    required: true,
    default: []
}
});
const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;