const User = require("../../db/models/User");

const peopleController = async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.json({ users });
};

module.exports = peopleController;
