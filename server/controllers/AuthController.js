const Trainee = require("../models/Trainee");
const login = async (req, res) => {
  const user = { name: req.body.username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken });
};

const signUp = async (req, res) => {
  const newTrainee = new Trainee({
    username: req.body.username,
    password: req.body.password,
    type: "individual",
  });
  await Trainee.find("name");
  newTrainee.save();
};
