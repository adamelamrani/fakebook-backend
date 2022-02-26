const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
  },
  image: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: [Schema.Types.ObjectId],
    },
  ],
  enemies: [
    {
      type: [Schema.Types.ObjectId],
    },
  ],
});

const User = model("User", UserSchema, "users");

module.exports = User;
